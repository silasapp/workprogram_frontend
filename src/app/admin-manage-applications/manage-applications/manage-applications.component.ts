import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Application, Staff } from 'src/app/models/application-details';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
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
  public data: IDeskStaffApps[][] = [];
  public staffSBUAndRole: { staff: Staff; role: IRole; sbu: ISBU };
  public pagenum = 0;
  public selectedPage = 1;
  public arrayRows = [];
  public year = [];
  public selectedColumns: any[] = [];
  public isTableOpt = false;
  public isSpecifyColumns = false;
  public currentStaffEmailSubject = new Subject<string>();
  public currentStaffEmail$ = this.currentStaffEmailSubject.asObservable();
  public getStaffSBUAndRole$: Observable<{
    staff: Staff;
    role: IRole;
    sbu: ISBU;
  }>;

  public getStaffDesksBySBUAndRole$: Observable<IDeskStaffApps[]>;

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
    private router: Router,
    private adminService: AdminService,
    private auth: AuthenticationService
  ) {
    this.genk.sizePerPage = this.genk.sizeten;

    this.getStaffSBUAndRole$ = this.currentStaffEmail$.pipe(
      filter((email) => email && email.length > 0),
      switchMap((email) =>
        this.adminService.getStaffSBUAndRole(email).pipe(map((res) => res.data))
      )
    );

    this.getStaffDesksBySBUAndRole$ = this.getStaffSBUAndRole$.pipe(
      tap((res) => console.log('tag in ', res)),
      switchMap((data) =>
        this.report
          .getStaffDeskBySBUAndRole(data.sbu.id, data.role.id - 1)
          .pipe(map((res) => res.data))
      ),
      tap((res) => console.log('tag out ', res))
    );
  }

  ngOnInit() {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;
    this.getRoles();

    this.getStaffSBUAndRole$.subscribe((res) => {
      this.staffSBUAndRole = res;
    });

    this.getStaffDeskBySBUAndRole();

    this.currentStaffEmailSubject.next(this.auth.currentUserValue.companyEmail);
  }

  groupDeskInfo(data: IDeskStaffApps[]) {
    const res: { [id: number]: IDeskStaffApps[] } = {};

    data.forEach((d) => {
      if (res[d.staff.staffID]) {
        res[d.staff.staffID].push(d);
      } else {
        res[d.staff.staffID] = [] as IDeskStaffApps[];
        res[d.staff.staffID].push(d);
      }
    });

    return Object.values(res);
  }

  getRoles() {
    this.modalService.logCover('Loading data...', true);
    this.adminService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.roles;
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

  getStaffSBUAndRole() {}

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

  getStaffDeskBySBUAndRole() {
    this.modalService.logCover('Loading data...', true);
    this.getStaffDesksBySBUAndRole$.subscribe({
      next: (res) => {
        this.data = this.groupDeskInfo(res);
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

export interface IDeskStaffApps {
  staff: Staff;
  desk: IDesk;
  application: Application;
}

export interface IDesk {
  appId: number;
  comment: string;
  createdAt: string;
  deskID: number;
  fromRoleId: number;
  fromSBU: number;
  fromStaffID: number;
  hasPushed: boolean;
  hasWork: boolean;
  lastJobDate: string;
  processID: number;
  processStatus: string;
  sort: number;
  staffID: number;
  updatedAt: string;
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
