import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PushApplicationFormComponent } from 'src/app/application/process-application/push-application-form/push-application-form.component';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';
import { AddProcessFlowFormComponent } from './add-process-flow-form/add-process-flow-form.component';

@Component({
  selector: 'app-application-process-flow-configuration',
  templateUrl: './application-process-flow-configuration.component.html',
  styleUrls: ['./application-process-flow-configuration.component.scss'],
})
export class ApplicationProcessFlowConfigurationComponent implements OnInit {
  public roles: IRole[];
  public sbus: ISBU[];

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
    {
      columnDef: 'role',
      header: 'Role',
    },
    {
      columnDef: 'sbu',
      header: 'Strategic Business Unit (SBU)',
    },
    {
      columnDef: 'sort',
      header: 'Sequence',
    },
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
      this.cdr.markForCheck();
    });
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

  getProcessFlow() {
    this.modalService.logCover('Loading data...', true);
    this.report.getProcessFlow().subscribe({
      next: (res) => {
        this.data = res.processes as any[];
        this.roles = res.roles as IRole[];
        this.sbus = res.sbUs as ISBU[];

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
