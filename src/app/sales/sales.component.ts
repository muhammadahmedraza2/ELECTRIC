import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';
import { ExecuteAPICall } from '../services/executeapi.service';
import { AppSettingsService } from '../services/appsetting.service';
import { GetMenuService } from '../services/sidemenu.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  public ViewComp = true;
  public CreateComp = true;
  public istrans = true;
  public istranform = true;

  @Output() onTitleChange = new EventEmitter<string>();
  private auth: AuthService = inject(AuthService);
  private callapi: ExecuteAPICall = inject(ExecuteAPICall);
  private appSettings: AppSettingsService = inject(AppSettingsService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private menuState: GetMenuService = inject(GetMenuService);

private fullMenu = signal<any[]>([]);
menu = signal<any[]>([]);
selectedItem = signal<any>(null);

// Declared BEFORE isMenuActive, since isMenuActive references them.
openMenu = this.menuState.openMenu;
isHelpOpen = this.menuState.isHelpOpen;
selectedFormId = this.menuState.selectedFormId;

isMenuActive = (id: any) => computed(() => this.openMenu() === id && !this.isHelpOpen());

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.menuState.getMenu().subscribe({
      next: (res: any) => {
        if (!res?.data) return;

        const nodes = res.data.Table || [];
        const forms = res.data.Table1 || [];

        const formsByNode: Record<number, any[]> = forms.reduce((acc: Record<number, any[]>, f: any) => {
          if (!acc[f.NODE_ID]) acc[f.NODE_ID] = [];
          acc[f.NODE_ID].push(f);
          return acc;
        }, {} as Record<number, any[]>);

        const menuItems = nodes.map((n: any) => ({
          id: n.NODE_ID,
          Node: n.DESP,
          icon: n.ICON || 'settings.svg',
          Forms: formsByNode[n.NODE_ID] || []
        }));

        this.fullMenu.set(menuItems);
        this.menu.set(menuItems);
      },
      error: (err: any) => {
        const Message = err?.error?.message;
        this.dialogService.alertBox(Message);
      }
    });
  }

  toggleSubMenu(id: any) {
    this.isHelpOpen.set(false);
    this.openMenu.update((current: any) => (current === id ? -1 : id));
  }

  toggleHelp() {
    this.isHelpOpen.update((open: any) => !open);
    if (this.isHelpOpen()) {
      this.openMenu.set(-1);
    }
  }

  toggleTransaction() {
    this.isHelpOpen.update(open => !open);
    if (this.isHelpOpen()) {
      this.openMenu.set(-1);
    }
  }

  Goto(event: any, link: any, arg: any, selectedItem: any) {
    event.preventDefault();
    event.stopPropagation();
    this.menuState.selectedFormId.set(selectedItem.FORM_ID);

    const formTitle = selectedItem.FORM_TITLE;
    this.onTitleChange.emit(formTitle);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    let routePath: any[] = ['/app', link];
    if (link === 'FrmList') {
      routePath = ['/app', link, arg];
    }

    this.router.navigate(routePath, {
      queryParams: {
        formTitle: formTitle,
        formId: arg
      }
    }).then(() => {
      this.router.routeReuseStrategy.shouldReuseRoute =
        (future, curr) => future.routeConfig === curr.routeConfig;
    });

    this.closeMobilemnu();
  }

  closeMobilemnu() {
    try {
      const element = document.getElementsByClassName('nk-nav-toggle nk-quick-nav-icon d-xl-none')[0] as HTMLElement;
      if (element && element.offsetWidth > 0 && element.offsetHeight > 0) {
        element.click();
      }
    } catch (e) {
      // console.error("Mobile menu close error:", e);
    }
  }

  onSearch(searchText: string): void {
    if (!searchText) {
      this.menu.set([...this.fullMenu()]);
      return;
    }
    const lower = searchText.toLowerCase();
    const filtered = this.fullMenu()
      .map(item => {
        const matchingForms = item.Forms.filter((form: any) =>
          form.FORM_TITLE.toLowerCase().includes(lower)
        );
        const isNodeMatch = item.Node.toLowerCase().includes(lower);
        if (isNodeMatch || matchingForms.length > 0) {
          return { ...item, Forms: isNodeMatch ? item.Forms : matchingForms };
        }
        return null;
      })
      .filter(Boolean);
    this.menu.set(filtered);
  }

  btn_home() {
    this.router.navigate(['app/dashboard']);
  }

  onLogout() {
    this.dialogService.confirmBox('Do you want to Logout?').then(async (confirmed: boolean) => {
      if (!confirmed) return;
      const APIURL = `${this.appSettings.getValue('adminModuleUrl')}` + "Auth/Logout";
      const res = await this.callapi.GetAPIResult(APIURL, null);
      if (res.responseCode == '0') {
        this.menuState.openMenu.set(-1);
        this.menuState.selectedFormId.set(null);
        this.menuState.isHelpOpen.set(false);
        this.auth.logout();
        this.router.navigate(['account']);
      }
    });
  }

  chngPwd_click() { }
  newTick_click() { }
  viewTick_click() {
    this.router.navigate(['/frmComplainList']);
  }
  RegDev_click() { }
  profile_click() { }
  dashboard_click() { }
  genPIN_click() { }
}