import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { AuthenticationService, GenericService, ModalService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('cover', { static: false }) myCover: ElementRef<HTMLDivElement>;
  authenticationService: AuthenticationService;
  genk: GenericService;
  eModal = false;
  noteModal = false;
  modalService: ModalService;
  coverModal = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';

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

    this.modalService.emodal.subscribe(res => {
      this.logEmodal(res);
    });

    this.modalService.cover.subscribe(res => {
      if (res) {
        this.logCoverModal(res);
      }
       else {
         this.togCover();
       }
    });

    // this.modalService.cover.subscribe(res => {
    //   this.logCoverModal(res);
    // });
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

  logCoverModal(res: boolean) {
      this.coverModal = res;
      this.showModal();
      this.cd.markForCheck();
  }

  logEmodal(res: boolean) {
    debugger;
    this.closeModal();
    this.eModal = res;
    this.cd.markForCheck();
  }

  togCover() {
    //this.modalService.togCover();
    this.coverModal = false;
    this.closeModal();
    this.cd.markForCheck();
  }
  togYawa() {
    this.eModal = false;
    this.cd.markForCheck();
  }
  endCover() {
    //if (this.modalService.isNonBlocker) {
      this.togCover();
    //}
  }

  showModal() {
    this.myCover.nativeElement.innerHTML = `<div class="covermodal">
    <div class="cvas">
      <div class="coolspin"></div>
    </div>

    <div *ngIf="modalService.body" class="divwidehigh" >
      <div class="covertem" style="display: flex; align-items: center">
      <div class="lds-hourglass">
          </div>
        <div class="dinabody">
          <div class="divmid" style="font-weight: 700; margin-left: 10px; color: rgb(4, 76, 76)">
            Loading data...
          </div>
        </div>
      </div>
    </div>
  </div>`;
  // let dell = this.myCover.nativeElement.firstElementChild as HTMLDivElement;
  //   dell.onclick = function() {this.myCover.nativeElement.innerHTML = "";}
  }

  closeModal() {
    this.myCover.nativeElement.innerHTML = "";
  }
}
