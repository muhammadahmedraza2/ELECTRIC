import { Injectable, inject } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialog } from '../shared/components/alert-dialog/alert-dialog';
import { AccountLockDialog } from '../shared/components/account-lock-dialog/account-lock-dialog';
import { ConfirmDialog } from '../shared/components/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private modalService: NgbModal = inject(NgbModal);

  public alertBox(message: string): Promise<boolean> {
    const modalRef: NgbModalRef = this.modalService.open(AlertDialog, {
      centered: true,
      keyboard: false,
      animation: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.message = message;

    setTimeout(() => {
      const modalElement: HTMLElement | undefined = modalRef.componentInstance.modalContainer?.nativeElement;
      modalElement?.focus();
    }, 0);

    return (modalRef.result as Promise<unknown>).then(
      (result: unknown) => Boolean(result),
      () => false
    );
  }

  public confirmBox(DispMsg: string, title: string = ''): Promise<boolean> {
    const modalOptions: NgbModalOptions = {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      animation: true,
      centered: true
    };

    const modalRef: NgbModalRef = this.modalService.open(ConfirmDialog, modalOptions);
    modalRef.componentInstance.DispMsg = DispMsg;
    modalRef.componentInstance.title = title === '' ? 'Alert' : title;

    return (modalRef.result as Promise<unknown>).then(
      (result: unknown) => Boolean(result),
      () => false
    );
  }

  public AccountLocked(): void {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      animation: true,
      centered: true
    };

    this.modalService.open(AccountLockDialog, modalOptions);
  }
}