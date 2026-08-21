import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@shared/Services/dialog-service';
import { GetMenuService } from '@shared/Services/get-menu.service';
import { AppSettingsService } from '@shared/Services/app-settings.service';
import { ExecuteAPICall } from '@shared/Services/ExecuteAPI.service';
import { AuthService } from '@shared/Services/auth-service';
@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: []
})
export class SalesComponent {
  public ViewComp = true;
  public CreateComp = true;
  public istrans = true;
  public istranform = true
  private auth = inject(AuthService);
  private callapi = inject(ExecuteAPICall);
  @Output() onTitleChange = new EventEmitter<string>();
  private appSettings = inject(AppSettingsService);
  private fullMenu = signal<any[]>([]);
  menu = signal<any[]>([]);
  private menuState = inject(GetMenuService);
  // openMenu = this.menuState.openMenu;
  // isHelpOpen = this.menuState.isHelpOpen;
  selectedItem = signal<any>(null);
  // selectedFormId = this.menuState.selectedFormId;

  isMenuActive = (id: any) => computed(() => this.openMenu() === id && !this.isHelpOpen());
  constructor(private getMenuService: GetMenuService, private router: Router,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {

    this.loadMenu();
  }

  loadMenu() {
    this.getMenuService.getMenu().subscribe({
      next: (res: any) => {
        if (!res?.data) return;

        const nodes = res.data.Table || [];
        const forms = res.data.Table1 || [];

        const formsByNode: Record<number, any[]> = forms.reduce((acc, f) => {
          if (!acc[f.NODE_ID]) acc[f.NODE_ID] = [];
          acc[f.NODE_ID].push(f);
          return acc;
        }, {} as Record<number, any[]>);

        const menuItems = nodes.map(n => ({
          id: n.NODE_ID,
          Node: n.DESP,
          icon: n.ICON || 'settings.svg',
          Forms: formsByNode[n.NODE_ID] || []
        }));

        this.fullMenu.set(menuItems);
        this.menu.set(menuItems);

      },
      error: (err) => {
        const Message = err?.error?.message;
        this.dialogService.alertBox(Message);
      }
    });
  }
  toggleSubMenu(id: any) {
    this.isHelpOpen.set(false);
    this.openMenu.update(current => (current === id ? -1 : id));
  }

  toggleHelp() {
    this.isHelpOpen.update(open => !open);
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
  // Goto(event: any, link: any, arg: any, selectedItem: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.menuState.selectedFormId.set(selectedItem.FORM_ID); // ← ADD

  //   const formTitle = selectedItem.FORM_TITLE
  //   this.onTitleChange.emit(formTitle);
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   if (link === 'FrmList') {
  //     this.router.navigate(['/app', link, arg], {
  //       queryParams: {
  //         rlink: link,
  //         formTitle: selectedItem.FORM_TITLE
  //       }
  //     }).then(() => {
  //       this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => future.routeConfig === curr.routeConfig;
  //     });
  //   }
  //   else if (link === 'frmUploadTransQueueBase') {
  //     this.router.navigate(['/app', 'frmUploadTransQueueBase'], {
  //       queryParams: {
  //         formTitle: formTitle,
  //         formId: arg
  //       }
  //     });
  //   } 


  //   this.closeMobilemnu();

  //   if (selectedItem?.FORM_TITLE) {
  //     this.onTitleChange.emit(selectedItem.FORM_TITLE);
  //   }
  // }

  // closeMobilemnu() {
  //   try {
  //     let element: HTMLElement = document.getElementsByClassName('nk-nav-toggle nk-quick-nav-icon d-xl-none')[0] as HTMLElement;
  //     element.click();
  //   } catch (e) { }
  // }
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
    this.dialogService.confirmBox('Do you want to Logout?').then(async (confirmed) => {
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

    })
  }

  chngPwd_click() { }
  newTick_click() { }
  viewTick_click() {
    this.router.navigate(['/frmComplainList'])
  }
  RegDev_click() { }
  profile_click() { }
  dashboard_click() { }
  genPIN_click() { }

}