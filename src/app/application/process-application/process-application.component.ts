import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import {
  Application,
  ApplicationDetails,
  Staff,
} from 'src/app/models/application-details';
import { ActivatedRoute } from '@angular/router';
import { PushApplicationFormComponent } from './push-application-form/push-application-form.component';
import { SendBackFormComponent } from './send-back-form/send-back-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ApproveFormComponent } from './approve-form/approve-form.component';

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

  applicationDetails: ApplicationDetails;
  staffDetails: Staff = {} as Staff;

  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    public genk: GenericService
  ) {
    this.genk = gen;
    this.route.params.subscribe((param) => {
      this.year = param['year'];
    });
  }

  ngOnInit(): void {
    // this.applicationDetails = this.genk.applicationDetails;
    // this.applicationDetails$.next(this.applicationDetails);

    // if (!this.applicationDetails)
    this.getApplicationProcess();
  }

  getApplicationProcess() {
    this.modalService.logCover('Loading...', true);
    this.workprogram.getProcessApplication(this.year).subscribe({
      next: (res) => {
        this.applicationDetails = res.data;
        this.applicationDetails$.next(this.applicationDetails);
        this.genk.appID = this.genk.applicationDetails?.application.id;
        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.togCover();
        this.modalService.logNotice('Error', error.message, 'error');
        this.cd.markForCheck();
      },
    });
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

  approveApplication() {
    const operationsConfiguration = {
      applications: {
        data: {
          applications: this.applications,
          applicationDetails: this.applicationDetails,
        },
        form: ApproveFormComponent,
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
