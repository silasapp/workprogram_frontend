import { CdkAccordion } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService, GenericService, ModalService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  authenticationService: AuthenticationService;
  genk: GenericService;
  noteModal = false;
  modalService: ModalService

  constructor(private auth: AuthenticationService, private gen: GenericService, private modal: ModalService, private cd: ChangeDetectorRef) {
    this.genk = gen;
    this.authenticationService = auth;
    if (this.authenticationService.currentUserValue) {
      this.genk.isAdmin = this.authenticationService.currentUserValue.companyName === 'Admin';
    }

    this.modalService = modal;
    this.modalService.notice.subscribe(res => {
      this.logNoteModal(res);
    });
  }

  Alert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay'
    })
  }

  logNoteModal(res: boolean) {
    this.Alert(this.modalService.body, this.modalService.head, this.modalService.icon);
    this.cd.markForCheck();
  }
}
