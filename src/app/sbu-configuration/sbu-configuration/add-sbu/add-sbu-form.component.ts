import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { ReportService } from 'src/app/services/report.service';
import { IRole, ISBU } from '../sbu-configuration.component';

@Component({
  selector: 'app-add-sbu-form',
  templateUrl: './add-sbu-form.component.html',
  styleUrls: ['./add-sbu-form.component.css'],
})
export class AddSBUFormComponent implements OnInit {
  public form: FormGroup;
  public targetData: ISBU;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddSBUFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private adminService: AdminService
  ) {
    this.targetData = data.data?.targetData;

    //console.log('test', this.targetData);

    if (this.targetData)
      this.form = this.formBuilder.group({
        id: [this.targetData?.id],
        name: [[this.targetData?.sbU_Name], Validators.required],
        code: [[this.targetData?.sbU_Code], Validators.required],
        tier: [[this.targetData?.tier], Validators.required],
      });
    else
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        code: ['', Validators.required],
        tier: ['', Validators.required],
      });
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  addSBU() {
    const code = this.form.get('code').value;
    const name = this.form.get('name').value;
    const tier = this.form.get('tier').value;

    this.adminService.addSBU(name, code, tier).subscribe({
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

  editSBU() {
    const id = this.form.get('id').value;
    const code = this.form.get('code').value;
    const name = this.form.get('name').value;
    const tier = this.form.get('tier').value;

    this.adminService.editSBU(id, name, code, tier).subscribe({
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
