import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

import { Staff } from 'src/app/models/application-details';
import { AuthenticationService, ModalService } from 'src/app/services';
import {
  IRole,
  ISBU,
} from 'src/app/process-flow-configuration/application-process-flow-configuration/application-process-flow-configuration.component';
import { AdminService } from 'src/app/services/admin.service';
import { ISystemUser } from 'src/app/models/user';

// import { Staff } from 'src/app/admin/settings/all-staff/all-staff.component';
// import { FieldOffice } from 'src/app/admin/settings/field-zonal-office/field-zonal-office.component';
// import { IBranch } from '../../interfaces/IBranch';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public usersFromWKP: StaffWithName[];
  public userTypes = [''];
  // public offices: FieldOffice[];
  // public branches: IBranch[];
  public roles: IRole[] = [];
  public sbus: ISBU[] = [];
  public currentValue: ISystemUser | null;
  public usersFromElps: StaffWithName[];
  public file: File | null = null;
  public selectedUserFromElps: StaffWithName;
  public usersDropdownSettings: IDropdownSettings = {};
  public closeDropdownSelection = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private modalService: ModalService,
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) {
    // this.offices = data.data.offices;
    // this.branches = data.data.branches;
    this.usersFromWKP = data.data.users;
    this.roles = data.data.roles;
    this.sbus = data.data.sbus;
    this.usersFromElps = data.data.staffList;
    this.currentValue = data.data?.currentValue;

    console.log(data.data);

    let currentUserId: string;

    //Appending an additional name field to allow interfacing with the ngmultiple-select textField
    this.usersFromElps = this.usersFromElps?.map((user) => {
      user.name = `${user?.lastName}, ${user?.firstName} (${user?.email})`;

      if (this.currentValue && user.email === this.currentValue.email)
        currentUserId = user.id.toString();
      return user;
    });

    this.selectedUserFromElps = this.usersFromElps[0];

    // email: e.email,
    //   companY_NAME: e.companY_NAME,
    //   passwords: e.passwords,
    //   name: e.name,
    //   designation: e.designation,
    //   phonE_NO: e.phonE_NO,
    //   companY_ID: e.companY_ID,
    //   rolE_ID: e.rolE_ID,
    //   sbU_ID: e.sbU_ID,

    this.form = this.formBuilder.group({
      elpsId: [this.currentValue ? currentUserId : '', Validators.required],
      id: [this.currentValue ? this.currentValue.id : ''],
      // firstName: [this.currentValue ? this.currentValue.firstName : ''],
      // lastName: [this.currentValue ? this.currentValue.lastName : ''],
      companY_NAME: ['Admin'],
      companY_ID: ['companY_ID'],
      name: [this.currentValue ? this.currentValue.name : ''],
      email: [
        this.currentValue ? this.currentValue.email : '',
        Validators.required,
      ],
      phonE_NO: [this.currentValue ? this.currentValue.phonE_NO : ''],
      password: ['password'],
      designation: [this.currentValue ? this.currentValue.phonE_NO : ''],
      // userType: [this.currentValue ? this.currentValue.userType : ''],
      // role: [
      //   this.currentValue ? this.currentValue.role : '',
      //   Validators.required,
      // ],
      rolE_ID: [0, Validators.required],
      // sbu: [
      //   this.currentValue ? this.currentValue.role : '',
      //   Validators.required,
      // ],
      sbU_ID: [0],
      // officeId: [this.currentValue ? this.currentValue.officeId : ''],
      // branchId: [this.currentValue ? this.currentValue.branchId : ''],
      status: [
        this.currentValue ? this.currentValue.statuS_ : '',
        // Validators.required,
      ],
      // signatureImage: [
      //   this.currentValue ? this.currentValue.signatureImage : '',
      // ],
    });
  }

  ngOnInit(): void {
    this.usersDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection,
    };
  }

  createUser() {
    this.modalService.logCover('Loading...', true);

    // this.form.controls['elpsId'].setValue(this.selectedUserFromElps.id);
    // this.form.controls['elpsId'].setValue(0);
    this.form.controls['id'].setValue(null);

    // const formDataToSubmit = new FormData();

    // formDataToSubmit.append('elpsId', this.form.get('elpsId').value);
    // formDataToSubmit.append('firstName', this.form.get('firstName').value);
    // formDataToSubmit.append('lastName', this.form.get('lastName').value);
    // formDataToSubmit.append('email', this.form.get('email').value);
    // formDataToSubmit.append('phoneNo', this.form.get('phoneNo').value);
    // formDataToSubmit.append('userType', this.form.get('userType').value);
    // formDataToSubmit.append('userRole', this.form.get('role').value);
    // formDataToSubmit.append('sbu', this.form.get('sbu').value);
    // // formDataToSubmit.append('officeId', this.form.get('officeId').value);
    // // formDataToSubmit.append('branchId', this.form.get('branchId').value);
    // formDataToSubmit.append('status', this.form.get('status').value);
    // // formDataToSubmit.append('signatureImage', this.file);

    this.adminService.addUser(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Staff was created successfully!', null, {
            panelClass: ['success'],
          });

          this.dialogRef.close();
        }

        this.modalService.togCover();
      },
      error: (error) => {
        this.snackBar.open(
          'Operation failed! Could not create the Staff account.',
          null,
          {
            panelClass: ['error'],
          }
        );
        this.modalService.togCover();
      },
    });
  }

  updateUser() {
    this.modalService.logCover();

    // this.form.controls['elpsId'].setValue(this.selectedUserFromElps.id);

    // const formDataToSubmit = new FormData();

    // // formDataToSubmit.append('elpsId', this.form.get('elpsId').value);
    // formDataToSubmit.append('id', this.form.get('id').value);
    // formDataToSubmit.append('firstName', this.form.get('firstName').value);
    // formDataToSubmit.append('lastName', this.form.get('lastName').value);
    // formDataToSubmit.append('email', this.form.get('email').value);
    // formDataToSubmit.append('phoneNo', this.form.get('phoneNo').value);
    // formDataToSubmit.append('userType', this.form.get('userType').value);
    // formDataToSubmit.append('userRole', this.form.get('role').value);
    // formDataToSubmit.append('sbu', this.form.get('sbu').value);
    // // formDataToSubmit.append('officeId', this.form.get('officeId').value);
    // // formDataToSubmit.append('branchId', this.form.get('branchId').value);
    // formDataToSubmit.append('status', this.form.get('status').value);
    // // formDataToSubmit.append('signatureImage', this.file);

    this.auth.updateStaff(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Staff was updated successfully!', null, {
            panelClass: ['success'],
          });

          this.dialogRef.close();
        }
        this.modalService.togCover();
      },
      error: (error) => {
        this.snackBar.open(
          'Operation failed! Could not update the Staff account.',
          null,
          {
            panelClass: ['error'],
          }
        );
        this.dialogRef.close();

        this.modalService.togCover();
      },
    });
  }

  onClose() {
    console.log(this.form, this.form.getRawValue());
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onItemSelect(event: ListItem) {
    this.selectedUserFromElps = this.usersFromElps.find(
      (u) => u.id === event.id
    );

    this.setFormValues(this.selectedUserFromElps);
  }

  onSelectAll(event: ListItem[]) {
    event.forEach((item) => {
      (this.form.get('docId') as FormArray).push(new FormControl(item.id));
    });
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.usersDropdownSettings = Object.assign({}, this.usersDropdownSettings, {
      closeDropDownOnSelection: this.closeDropdownSelection,
    });
  }

  onDeSelect(event: ListItem) {
    const targetIndex = (
      (this.form.get('docId') as FormArray).value as Array<number>
    ).indexOf(event.id as number);
    (this.form.get('docId') as FormArray).removeAt(targetIndex);
  }

  setFormValues(user: StaffWithName) {
    console.log('user....', user.firstName, user.lastName, user.email, user);
    this.form.controls['elpsId'].setValue(user.id);
    // this.form.controls['firstName'].setValue(user.firstName);
    // this.form.controls['lastName'].setValue(user.lastName);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['name'].setValue(user.lastName + ', ' + user.firstName);
    this.form.controls['phonE_NO'].setValue(user.phoneNo);
    // this.form.controls['userType'].setValue('Staff');

    this.cd;
  }
}

interface StaffWithName extends Staff {
  name: string;
}
