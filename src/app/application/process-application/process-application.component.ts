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
import { ActivatedRoute } from '@angular/router';
import { PushApplicationFormComponent } from './push-application-form/push-application-form.component';
import { SendBackFormComponent } from './send-back-form/send-back-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-process-application',
  templateUrl: './process-application.component.html',
  styleUrls: ['./process-application.component.scss'],
})
export class ProcessApplicationComponent implements OnInit {
  public applications$ = new Subject<Application[]>();
  public applicationDetails$ = new Subject<ApplicationDetails>();
  public staffDetails$ = new Subject<Staff>();
  public applicationHistory$ = new Subject<any>();

  public applications: Application[] = [];
  public year: string;

  genk: GenericService;
  columnHeader_Desk;
  columnValue_Desk;
  isTabVisible = false;
  columnHeader_History = {};
  columnValue_History;
  applicationDetails: ApplicationDetails;
  staffDetails: Staff = {} as Staff;
  isPushModal;
  pushFieldForm: FormGroup;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.genk = gen;
    this.route.params.subscribe((param) => {
      this.year = param['year'];
    });
  }

  ngOnInit(): void {
    this.applicationDetails = this.genk.applicationDetails;
    this.applicationDetails$.next(this.applicationDetails);

    if (!this.applicationDetails) this.getApplicationProcess();
  }

  getApplicationProcess() {
    this.workprogram.getProcessApplication(this.year).subscribe({
      next: (res) => {
        this.applicationDetails = res.data;
        this.applicationDetails$.next(this.applicationDetails);

        this.loadApplication();
      },
      error: (error) => {
        this.modalService.logNotice('Error', error.message, 'error');
      },
    });
  }

  loadApplication() {
    if (this.genk.applicationDetails != null) {
      this.genk.appID = this.genk.applicationDetails.application.id;
      this.applicationDetails = this.genk.applicationDetails;

      // this.loadTable_Desk(this.applicationDetails.staff);
      // this.loadTable_History(this.applicationDetails.application_History);
      this.staffDetails$.next(this.applicationDetails.staff);
      this.applicationHistory$.next(
        this.applicationDetails.application_History
      );
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
          applicationDetails: this.applicationDetails,
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
      this.cd.markForCheck();
    });
  }

  sendBackApplication() {
    const operationsConfiguration = {
      applications: {
        data: {
          applications: this.applications,
          applicationDetails: this.applicationDetails,
        },
        form: SendBackFormComponent,
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
      this.cd.markForCheck();
    });
  }
}
