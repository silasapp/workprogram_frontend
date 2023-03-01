import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { IRole } from '../role-configuration.component';

@Component({
  selector: 'app-add-role-form',
  templateUrl: './add-role-form.component.html',
  styleUrls: ['./add-role-form.component.css'],
})
export class AddRoleFormComponent implements OnInit {
  public form: FormGroup;
  public targetData: IRole;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddRoleFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private adminService: AdminService
  ) {
    this.targetData = data.data?.targetData;

    if (this.targetData)
      this.form = this.formBuilder.group({
        id: [this.targetData?.id],
        name: [[this.targetData?.roleName], Validators.required],
        description: [[this.targetData?.description], Validators.required],
        rank: [[this.targetData?.rank], Validators.required],
      });
    else
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        rank: ['', Validators.required],
      });
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  addRole() {
    const description = this.form.get('description').value as string;
    const name = this.form.get('name').value as string;
    const rank = this.form.get('rank').value as number;

    this.adminService.addRole(name, description, rank).subscribe({
      next: (res) => {
        this.dialogRef.close();
        this.modalService.logNotice(res.message, 'Success', 'success');
        this.cd.markForCheck();
      },
      error: (error) => {
        this.dialogRef.close();
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.cd.markForCheck();
      },
    });
  }

  editRole() {
    const id = this.form.get('id').value as number;
    const description = this.form.get('description').value as string;
    const name = this.form.get('name').value as string;
    const rank = this.form.get('rank').value as number;

    this.adminService.editRole(id, name, description, rank).subscribe({
      next: (res) => {
        this.dialogRef.close();
        this.modalService.logNotice(res.message, 'Success', 'success');
        this.cd.markForCheck();
      },
      error: (error) => {
        this.dialogRef.close();
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.cd.markForCheck();
      },
    });
  }
}
