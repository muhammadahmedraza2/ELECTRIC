import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css'
})
export class AlertDialog implements AfterViewInit {
  @Input() message?: string;
  @Input() size?: string;
  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLElement>;

  // Explicit types + inject() instead of constructor injection.
  public router: Router = inject(Router);
  public activeModal: NgbActiveModal = inject(NgbActiveModal);

  ngAfterViewInit(): void {
    this.focusModal();
  }

  closeDialog(): void {
    this.activeModal.close(true);
  }

  onEnterPress(CloseBtn: HTMLButtonElement): void {
    CloseBtn.click();
    CloseBtn.focus();
  }

  focusModal(): void {
    if (this.modalContainer) {
      this.modalContainer.nativeElement.focus();
    }
  }
}