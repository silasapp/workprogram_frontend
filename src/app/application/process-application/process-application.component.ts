import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { BrowserModule } from '@angular/platform-browser';
import {
  Application,
  ApplicationDetails,
  Staff,
  SubmittedDocument,
} from 'src/app/models/application-details';
import { Router } from '@angular/router';
import { PushApplicationFormComponent } from './push-application-form/push-application-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-process-application',
  templateUrl: './process-application.component.html',
  styleUrls: ['./process-application.component.scss'],
})
export class ProcessApplicationComponent implements OnInit {
  public applications$ = new Subject<Application[]>();
  public applications: Application[] = [];

  genk: GenericService;
  columnHeader_Desk;
  columnValue_Desk;
  isTabVisible = false;
  columnHeader_History = {};
  columnValue_History;
  applicationDetails: ApplicationDetails;
  staffDetails: Staff = {} as Staff;
  documentDetails;
  isPushModal;
  pushFieldForm: FormGroup;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.genk = gen;
  }
  ngOnInit(): void {
    this.getApplication();
    console.log('application detail', this.genk.applicationDetails);
  }
  getApplication() {
    this.workprogram.getAppsOnMyDesk().subscribe({
      next: (res) => {
        console.log('resss', res);
        if (res.statusCode === 200) {
          this.applications$.next(res.data);
          this.applications = res.data;
        }
        // this.cd.markForCheck();
      },
    });

    if (this.genk.applicationDetails != null) {
      this.genk.appID = this.genk.applicationDetails.application.id;
      this.applicationDetails = this.genk.applicationDetails;

      console.log('application details', this.applicationDetails);

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
    if (data != null) {
      this.columnValue_History = data;
    }
  }
  loadTable_Document(data) {
    if (data != null) {
      this.documentDetails = data;
    }
  }

  togPushModal() {
    if (!this.isPushModal) {
      this.isPushModal = true;
    } else {
      this.isPushModal = false;
    }
    this.cd.markForCheck();
  }

  pushApplication() {
    const operationsConfiguration = {
      applications: {
        data: {
          applications: this.applications,
        },
        form: PushApplicationFormComponent,
      },
    };

    let dialogRef = this.dialog.open(
      operationsConfiguration['applications'].form,
      {
        data: {
          data: operationsConfiguration['applications'].data,
        },
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      this.getApplication();
      this.cd.markForCheck();
    });
  }
}
