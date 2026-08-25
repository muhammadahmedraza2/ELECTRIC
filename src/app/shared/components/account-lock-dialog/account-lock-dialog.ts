import { Component, inject, Input, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';
import { ExecuteAPICall } from '../../../services/executeapi.service';
import { AppSettingsService } from '../../../services/appsetting.service';

@Component({
  selector: 'app-account-lock-dialog',
  imports: [],
  templateUrl: './account-lock-dialog.html',
  styleUrl: './account-lock-dialog.css',
})
export class AccountLockDialog implements OnInit {
  @Input() DispMsg!: string;
  @Input() DispIco!: string;
  // private modal = inject(NgbModal);
  // private EncrDecr = inject(EncrDecrService);
  private dialogService = inject(DialogService);
  private callapi = inject(ExecuteAPICall);
  private appSettings = inject(AppSettingsService);

  constructor() { }

  ngOnInit(): void { }

  closeDialog(): void {
    // this.modal.dismissAll();
  }

  click_SendEmail(): void {
    const APIURL = `${this.appSettings.getValue('adminModuleUrl')}` + "SendAccountLockAlert";
    // let usrname = this.EncrDecr.Decrypt_val(sessionStorage.getItem('usrname'));
    const body = JSON.stringify({
      // "UserID": usrname,
      "AccessToken": "0000",
      "FormID": "0000",
      "RoleCode": "0000",
      "UserMenu": "0000",
      "RequestPage": "0000",
      "QueryParams": "0000"
    });
    let Obj_Req = JSON.parse(body);
    this.callapi.CallMicroService(APIURL, Obj_Req).subscribe(res => {
      if (res.Data.Code == "00") {
        // this.modal.dismissAll();
        this.dialogService.alertBox(res.Data.Description);
      } else {
        this.dialogService.alertBox(res.Data.Description);
      }
    }, error => console.error(error));
  }
}

