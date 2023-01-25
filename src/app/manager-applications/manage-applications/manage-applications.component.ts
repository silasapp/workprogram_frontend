import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';
import { AddProcessFlowFormComponent } from './add-process-flow/add-process-flow-form.component';
import { DeleteProcessFlowComponent } from './delete-process-flow-form/delete-process-flow.component';

@Component({
  selector: 'app-manage-applications',
  templateUrl: './manage-applications.component.html',
  styleUrls: ['./manage-applications.component.scss'],
})
export class ManageApplicationsComponent implements OnInit {
  public roles: IRole[];
  public sbus: ISBU[];
  public rejectedApps: IRejectedApp[] = [];
  public data: IRejectedApp[] = [];
  public pagenum = 0;
  public selectedPage = 1;
  public arrayRows = [];
  public year = [];
  public selectedColumns: any[] = [];
  public isTableOpt = false;
  public isSpecifyColumns = false;

  columns = [
    {
      columnDef: 'yearOfWKP',
      header: 'Year',
    },
    // {
    //   columnDef: 'companyName',
    //   header: 'Company Name',
    // },
    {
      columnDef: 'referenceNo',
      header: 'Reference No.',
    },
    {
      columnDef: 'concessionName',
      header: 'Concession Name',
    },
    {
      columnDef: 'sbU_Comment',
      header: "Processing Officer's Comment",
    },
  ];

  constructor(
    private report: ReportService,
    public cdr: ChangeDetectorRef,
    public genk: GenericService,
    private modalService: ModalService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit() {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;
    this.getRejectedApps();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  editProcessFlow(app: IRejectedApp) {
    this.router.navigate(
      ['/', this.genk.company, this.genk.workprogram, 'step1'],
      { queryParams: { rejectId: app.rejectId, sbU_Tables: app.sbU_Tables } }
    );
  }

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
    console.log('pagenum', this.pagenum, this.data.length);
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cdr.markForCheck();
  }

  getRejectedApps() {
    this.modalService.logCover('Loading data...', true);
    this.report.getRejectedApps().subscribe({
      next: (res) => {
        this.data = res.data as any[];

        if (this.data.length > 0) this.selectedPage = 1;
        this.assignDataRows();
        this.assignPageNum();
        this.modalService.togCover();
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.modalService.togCover();
        this.cdr.markForCheck();
      },
    });
  }

  goNext() {
    this.selectedPage++;
    this.assignDataRows();
  }

  goPrev() {
    this.selectedPage--;
    this.assignDataRows();
  }

  firstPage() {
    this.selectedPage = 1;
    this.assignDataRows();
  }

  lastPage() {
    this.selectedPage = this.pagenum;
    this.assignDataRows();
  }

  changePage(value: string) {
    this.selectedPage = Number(value);
    this.assignDataRows();
  }

  resize(e) {
    let value = e.target.value;
    if (value === 'all') {
      value = this.pagenum * this.genk.sizePerPage;
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cdr.markForCheck();
  }

  selectColumns() {
    this.columns = this.selectedColumns;
    this.isSpecifyColumns = false;
    this.cdr.markForCheck();
  }
}

export interface IRole {
  roleName: string;
  roleId: string;
  id: number;
  funcs: any[];
  description: string;
}

export interface ISBU {
  sbU_Name: string;
  sbU_Code: string;
  id: number;
}

export interface IRejectedApp {
  id: number;
  categoryID: number;
  companyID: number;
  concessionID: number;
  fieldID: string;
  rejectId: string;
  yearOfWKP: string;
  companyName: string;
  concessionName: string;
  createdAt: string;
  currentDesk: string;
  deleteStatus: string;
  deletedAt: string;
  approvalRef: string;
  deletedBy: string;
  fieldName: string;
  last_SBU: string;
  paymentStatus: string;
  referenceNo: string;
  sbU_Comment: string;
  status: string;
  submitted: string;
  submittedAt: string;
  updatedAt: string;
  sbU_Tables: string;
}
