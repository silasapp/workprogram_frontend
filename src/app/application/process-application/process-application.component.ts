
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, GenericService, ModalService } from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { BrowserModule } from '@angular/platform-browser'
import { ApplicationDetails, Staff, SubmittedDocument } from 'src/app/models/application-details';
import { Router } from '@angular/router';


@Component({
  selector: 'app-process-application',
  templateUrl: './process-application.component.html',
  styleUrls: ['./process-application.component.scss']
})
export class ProcessApplicationComponent implements OnInit {

  genk: GenericService;
  columnHeader_Desk;
  columnValue_Desk;
  isTabVisible= false;
  columnHeader_History = {};
  columnValue_History;
  applicationDetails : ApplicationDetails;
  staffDetails : Staff = {} as Staff;
  documentDetails ;
  isPushModal;
  pushFieldForm : FormGroup;
  constructor(private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef) {
    this.genk = gen;
   }
  ngOnInit(): void {
  this.getApplication();
  }
  getApplication() {
    
    if (this.genk.applicationDetails != null){
      this.genk.appID = this.genk.applicationDetails.application.id;
      this.applicationDetails = this.genk.applicationDetails;
      this.loadTable_Desk(this.applicationDetails.staff);
      this.loadTable_History(this.applicationDetails.application_History);
      this.loadTable_Document(this.applicationDetails.document);
    }
  
  }

  loadTable_Desk(data) {

    if (data != null) {
      this.columnValue_Desk = data;
    }
  }

  loadTable_History(data) {
    debugger;
    if (data != null) {
      this.columnValue_History = data;
    }
  }
  loadTable_Document(data) {
    debugger;
    if (data != null) {
      this.documentDetails = data;
    }
  }

  togPushModal() {
    debugger;
    if(!this.isPushModal) {
      this.isPushModal = true;
    } else {
      this.isPushModal = false;
    }
    this.cd.markForCheck();
  }
  PushApplication(){

  }
}

