import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { AddRoleFormComponent } from './add-role/add-role-form.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';

@Component({
  selector: 'app-role-configuration',
  templateUrl: './role-configuration.component.html',
  styleUrls: ['./role-configuration.component.scss'],
})
export class RoleConfigurationComponent implements OnInit {
  public roles: IRole[];

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
      columnDef: 'roleId',
      header: 'ROLE ID',
    },
    {
      columnDef: 'roleName',
      header: 'ROLE NAME',
    },
    {
      columnDef: 'description',
      header: 'DESCRIPTION',
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
    this.getRoles();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  addSBU() {
    const operationsConfiguration = {
      process: {
        data: {},
        form: AddRoleFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getRoles();
      this.cdr.markForCheck();
    });
  }

  editSBU(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
        },
        form: AddRoleFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getRoles();
      this.cdr.markForCheck();
    });
  }

  deleteSBU(row) {
    const operationsConfiguration = {
      process: {
        data: {
          targetData: row,
        },
        form: DeleteRoleComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration['process'].form, {
      data: {
        data: operationsConfiguration['process'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getRoles();
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

  getRoles() {
    this.modalService.logCover('Loading data...', true);
    this.adminService.getRoles().subscribe({
      next: (res) => {
        this.data = res.roles as any[];

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
