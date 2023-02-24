import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRole } from 'src/app/role-configuration/role-configuration/role-configuration.component';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';
import { AddProcessFlowFormComponent } from './add-process-flow/add-process-flow-form.component';
import { DeleteProcessFlowComponent } from './delete-process-flow-form/delete-process-flow.component';

@Component({
  selector: 'app-application-process-flow-configuration',
  templateUrl: './application-process-flow-configuration.component.html',
  styleUrls: ['./application-process-flow-configuration.component.scss'],
})
export class ApplicationProcessFlowConfigurationComponent implements OnInit {
  public roles: IRole[];
  public sbus: ISBU[];
  public actions: string[] = [];
  public statuses: string[] = [];

  title = 'Concession Reserves for current year(as at 1st January)';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  selectedColumns: any[] = [];
  isTableOpt = false;
  isSpecifyColumns = false;

  columns = [
    // {
    //   columnDef: 'role',
    //   header: 'Role',
    // },
    // {
    //   columnDef: 'sbu',
    //   header: 'Strategic Business Unit (SBU)',
    // },
    {
      columnDef: 'triggeredBySBU',
      header: 'Triggered By (SBU)',
    },
    {
      columnDef: 'triggeredByRole',
      header: 'Triggered By (Role)',
    },
    {
      columnDef: 'targetedToSBU',
      header: 'Target (SBU)',
    },
    {
      columnDef: 'targetedToRole',
      header: 'Target (Role)',
    },
    {
      columnDef: 'processAction',
      header: 'Action',
    },
    {
      columnDef: 'processStatus',
      header: 'Status',
    },
    {
      columnDef: 'tier',
      header: 'Tier',
    },
    // {
    //   columnDef: 'sort',
    //   header: 'Sequence',
    // },
  ];

  constructor(
    private report: ReportService,
    public cdr: ChangeDetectorRef,
    public genk: GenericService,
    private modalService: ModalService,
    public dialog: MatDialog
  ) {
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit() {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;
    this.getProcessFlow();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  addProcessFlow() {
    const operationsConfiguration = {
      process: {
        data: {
          roles: this.roles,
          sbus: this.sbus,
          actions: this.actions,
          statuses: this.statuses,
        },
        form: AddProcessFlowFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getProcessFlow();
      this.cdr.markForCheck();
    });
  }

  editProcessFlow(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
          roles: this.roles,
          sbus: this.sbus,
          actions: this.actions,
          statuses: this.statuses,
        },
        form: AddProcessFlowFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getProcessFlow();
      this.cdr.markForCheck();
    });
  }

  deleteProcessFlow(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
        },
        form: DeleteProcessFlowComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getProcessFlow();
      this.cdr.markForCheck();
    });
  }

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
    //console.log('pagenum', this.pagenum, this.data.length);
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cdr.markForCheck();
  }

  getProcessFlow() {
    this.modalService.logCover('Loading data...', true);
    this.report.getProcessFlow().subscribe({
      next: (res) => {
        this.data = res.processes as any[];
        this.roles = res.roles as IRole[];
        this.sbus = res.sbUs as ISBU[];
        this.actions = res.processActions as string[];
        this.statuses = res.processStatuses as string[];

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

// export interface IRole {
//   roleName: string;
//   roleId: string;
//   id: number;
//   funcs: any[];
//   description: string;
// }

export interface ISBU {
  sbU_Name: string;
  sbU_Code: string;
  id: number;
}
