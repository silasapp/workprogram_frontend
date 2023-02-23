import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { IElpsUser, Staff } from 'src/app/models/application-details';
import { ISystemUser } from 'src/app/models/user';
import { ISBU } from 'src/app/process-flow-configuration/application-process-flow-configuration/application-process-flow-configuration.component';
import { IRole } from 'src/app/role-configuration/role-configuration/role-configuration.component';
import { GenericService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserFormComponent } from './user-form/user-form.component';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['../admin.component.scss', './add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  public roles: IRole[] = [];
  public sbus: ISBU[] = [];
  public users: ISystemUser[] = [];
  public companies: any[];
  public elpsUsers: IElpsUser[] = [];
  public _isStaffSelected = false;
  public staffs: Staff[] = [];

  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Add Users';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  userForm: FormGroup;

  public columns;

  columns1 = [
    {
      columnDef: 'company_id',
      header: 'COMPANY CODE',
    },
    {
      columnDef: 'company_name',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'email',
      header: 'COMPANY EMAIL',
    },
    {
      columnDef: 'name',
      header: 'NAME',
    },
    {
      columnDef: 'phone_no',
      header: 'PHONE NO',
    },
    {
      columnDef: 'last_login_date',
      header: 'LAST LOGIN DATE',
    },
  ];

  columns2 = [
    {
      columnDef: 'staffID',
      header: 'STAFF ID',
    },
    {
      columnDef: 'lastName',
      header: 'LAST NAME',
    },
    {
      columnDef: 'firstName',
      header: 'FIRST NAME',
    },
    {
      columnDef: 'staffEmail',
      header: 'EMAIL',
    },
    {
      columnDef: 'staff_SBU',
      header: 'SBU',
    },
    {
      columnDef: 'staff_Role',
      header: 'ROLE',
    },
    // {
    //   columnDef: 'activeStatus',
    //   header: 'STATUS',
    // },
  ];

  constructor(
    private adminservice: AdminService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;

    this.columns = this.columns1;
  }

  ngOnInit() {
    this.data = [];
    this.fetchdata();
    this.getWPAStaffs();
    this.genk.sizePerPage = this.genk.sizeten;
    this.initForm();
    this.userForm.reset();
    //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
    //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));

    // this.getRoles();
    // this.getSBUs();
    this.getAll();
  }

  public set isStaffSelected(value) {
    this._isStaffSelected = value;
    this.reAssignData();
  }

  public get isStaffSelected() {
    return this._isStaffSelected;
  }

  initForm() {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      companY_NAME: ['', Validators.required],
      email: ['', Validators.required],
      passwords: ['', Validators.required],
      name: ['', Validators.required],
      phonE_NO: ['', Validators.required],
      designation: ['', Validators.required],
      companY_ID: ['', Validators.required],
      rolE_ID: ['', Validators.required],
      sbU_ID: [''],
    });
  }

  getAll() {
    this.modalService.logCover('Loading...', true);
    forkJoin([
      this.adminservice.getAllStaff(),
      this.adminservice.getStaffFromElps(),
      this.adminservice.getRoles(),
      this.adminservice.getSBU(),
      // this.adminHttpService.getOffices(),
      // this.adminHttpService.getBranches(),
    ]).subscribe({
      next: (res) => {
        if (res[0].responseCode == '00') {
          this.users = res[0].data.staffList;
          this.sbus = res[0].data.sbus;
        }

        if (res[1].statusCode === 0) this.elpsUsers = res[1].data;

        if (res[2]?.roles && res[2].roles.length > 0) this.roles = res[2].roles;

        // if (res[2].success) this.sbus = res[2].data.data;

        // if (res[3].success) this.roles = res[3].data.data;

        // if (res[3].success) this.offices = res[3].data.data;

        // if (res[4].success) this.branches = res[4].data.data;

        // this.progressBar.close();
        this.reAssignData();
        this.modalService.togCover();
      },
      error: (error) => {
        this.snackBar.open(
          'Something went wrong while retrieving data.',
          null,
          {
            panelClass: ['error'],
          }
        );

        // this.progressBar.close();
        this.modalService.togCover();
      },
    });
  }

  onAddData(event: Event, type: string) {
    const operationConfiguration = {
      users: {
        data: {
          users: this.users,
          staffList: this.elpsUsers,
          roles: this.roles,
          sbus: this.sbus,
          // offices: this.offices,
          // branches: this.branches,
        },
        form: UserFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].form, {
      minWidth: '500px',
      data: {
        data: operationConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.modalService.logCover('Loading...', true);

      this.adminservice.getAllStaff().subscribe((res) => {
        this.users = res.data.data;

        this.modalService.togCover();
        this.cd.markForCheck();
      });
      this.cd.markForCheck();
    });
  }

  getRoles() {
    this.modalService.logCover('loading...', true);
    this.adminservice.getRoles().subscribe({
      next: (res) => {
        this.roles = res.roles;
        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.togCover();
        this.cd.markForCheck();
      },
    });
  }

  getWPAStaffs() {
    this.modalService.logCover('loading...', true);
    this.adminservice.fetch('GET_STAFFS').subscribe({
      next: (res) => {
        this.staffs = this.normalizeStaffs(res.data);
        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.togCover();
        this.cd.markForCheck();
      },
    });
  }

  normalizeStaffs(data: { staff: Staff; role: IRole; sbu: ISBU }[]) {
    const staffs = data.map((d) => {
      const staff = d.staff;
      staff.staff_SBU = d.sbu.sbU_Name;
      staff.staff_Role = d.role.roleName;
      staff.status = d.staff.activeStatus;
      staff.status_ =
        d.staff.activeStatus == true ? 'Activated' : 'Deactivated';
      return staff;
    });
    return staffs;
  }

  getSBUs() {
    this.modalService.logCover('loading...', true);

    this.adminservice.getSBU().subscribe({
      next: (res) => {
        this.sbus = res.sbUs;
        this.modalService.togCover();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.togCover();
        this.cd.markForCheck();
      },
    });
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
  }

  reAssignData() {
    if (this.isStaffSelected) {
      this.data = this.staffs;
      this.columns = this.columns2;
    } else {
      this.data = this.companies;
      this.columns = this.columns1;
    }

    this.assignDataRows();
    this.assignPageNum();
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cd.markForCheck();
  }

  fetchdata() {
    this.adminservice.fetch('Get_Companies').subscribe((res) => {
      this.companies = res.data;
      this.reAssignData();
      this.assignPageNum();
      this.cd.markForCheck();
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
    this.cd.markForCheck();
  }
  openDialog(e) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      height: '600px',
      width: '400px',
      data: {
        id: e.target.value,
      },
    });
  }

  onSubmit() {
    this.adminservice.addUser(this.userForm.getRawValue()).subscribe((res) => {
      if (res.statusCode == 200) {
        this.Alert('Success', res.message, 'success');
      } else {
        this.Alert('Error', res.message, 'error');
      }
      // this.fetchdata();

      this.initForm();
    });
  }

  Alert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay',
    });
  }
}
