import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly session = inject(DemoSessionService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly theme = inject(ThemeService);
  readonly selectedBusiness = BUSINESS_TYPES.find(type => type.id === this.route.snapshot.queryParamMap.get('business')) ?? null;

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['owner@local.test', [Validators.required, Validators.email]],
    password: ['demo1234', [Validators.required, Validators.minLength(6)]]
  });

  readonly submitted = { value: false };

  signIn(): void {
    this.submitted.value = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.session.login(this.loginForm.controls.email.value, this.selectedBusiness?.id ?? null);
    if (this.selectedBusiness) {
      this.theme.setTenantScope(`demo-${this.selectedBusiness.id}`);
      this.theme.update({
        primaryColor: this.selectedBusiness.defaultTheme.primaryColor,
        surfaceTone: this.selectedBusiness.defaultTheme.surfaceTone
      });
      void this.router.navigate(['/admin/dashboard']);
      return;
    }

    void this.router.navigate(['/setup/business-type']);
  }
}