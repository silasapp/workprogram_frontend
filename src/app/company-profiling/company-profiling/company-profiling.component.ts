import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { AddSBUFormComponent } from './add-sbu/add-sbu-form.component';
import { DeleteSBUComponent } from './delete-sbu/delete-sbu.component';

@Component({
  selector: 'app-company-profiling',
  templateUrl: './company-profiling.component.html',
  styleUrls: ['./company-profiling.component.scss'],
})
export class CompanyProfilingComponent implements OnInit {
  public roles: IRole[];
  public sbus: ISBU[];

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
      columnDef: 'sbU_Code',
      header: 'SBU CODE',
    },
    {
      columnDef: 'sbU_Name',
      header: 'SBU NAME',
    },
  ];

  constructor(
    private adminService: AdminService,
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
    this.getSBU();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  addSBU() {
    const operationsConfiguration = {
      process: {
        data: {},
        form: AddSBUFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getSBU();
      this.cdr.markForCheck();
    });
  }

  editSBU(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
        },
        form: AddSBUFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getSBU();
      this.cdr.markForCheck();
    });
  }

  deleteSBU(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
        },
        form: DeleteSBUComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getSBU();
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

  getSBU() {
    this.modalService.logCover('Loading data...', true);
    this.adminService.getSBU().subscribe({
      next: (res) => {
        this.data = res.sbUs as any[];

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
