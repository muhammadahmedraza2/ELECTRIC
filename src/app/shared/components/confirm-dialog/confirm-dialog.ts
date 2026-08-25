import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conf-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['../alert-dialog/alert-dialog.css']
})
export class ConfirmDialog implements OnInit {
  @Input() title: string = '';
  @Input() DispMsg: string = '';
  @Output() IsConfrm = new EventEmitter<boolean>();

  // Explicit type + inject() instead of constructor injection.
  private activeModal: NgbActiveModal = inject(NgbActiveModal);

  ngOnInit(): void { }

  public decline(): void {
    this.IsConfrm.emit(false);
    this.activeModal.close(false);
  }

  public accept(): void {
    this.IsConfrm.emit(true);
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }
}