import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { WorkProgramService } from 'src/app/services/workprogram.service';
import { Router } from '@angular/router';
import { ApplicationDetails } from 'src/app/models/application-details';

@Component({
  selector: 'app-mydesk',
  templateUrl: './mydesk.component.html',
  styleUrls: ['./mydesk.component.scss'],
})
export class MydeskComponent implements OnInit {
  applicationDetails: ApplicationDetails;
  selectedColumns: any[] = [];
  genk: GenericService;
  columnHeader = [];
  columnValue = [];
  columnHeader_Desk = [];
  columnValue_Desk = [];
  router;
  public data = [];

  columns = [
    {
      columnDef: 'yearOfWKP',
      header: 'YEAR',
    },
    {
      columnDef: 'companyName',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'referenceNo',
      header: 'REFERENCE',
    },
    {
      columnDef: 'concessionName',
      header: 'CONCESSION',
    },
    {
      columnDef: 'fieldName',
      header: 'FIELD',
    },
    {
      columnDef: 'paymentStatus',
      header: 'PAYMENT STATUS',
    },
    // {
    //   columnDef: 'submittedAt',
    //   header: 'SUBMISSION DATE',
    // },
    {
      columnDef: 'status',
      header: 'STATUS',
    },
  ];
  constructor(
    private workprogram: WorkProgramService,
    private gen: GenericService,
    private modal: ModalService,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    public route: Router
  ) {
    this.genk = gen;
    this.router = route;
  }
  ngOnInit(): void {
    this.getAppsOnMyDesk();
  }

  getAppsOnMyDesk() {
    this.modalService.logCover('loading...', true);
    this.workprogram.getAppsOnMyDesk().subscribe((res) => {
      if (res.statusCode == 300) {
        this.modalService.logNotice('Error', res.message, 'error');
      } else {
        this.data = res.data;
      }
      this.modalService.togCover();
      this.cd.markForCheck();
    });
  }

  Process_Application(row) {
    const id = row.id;

    this.workprogram.getProcessApplication(id).subscribe((res) => {
      if (res.statusCode === 200) {
        this.genk.applicationDetails = res.data;
        this.router.navigate(['/application/process-application/' + id]);
      } else this.modalService.logNotice('Error', res.message, 'error');
    });
  }
}
