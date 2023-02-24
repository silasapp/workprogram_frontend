import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Application, Staff } from 'src/app/models/application-details';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { ReportService } from 'src/app/services/report.service';
import { IDeskStaffApps, IRole, ISBU } from '../manage-applications.component';

@Component({
  selector: 'app-move-application-form',
  templateUrl: './move-application-form.component.html',
  styleUrls: [
    '../manage-applications.component.scss',
    './move-application-form.component.css',
  ],
})
export class MoveApplicationFormComponent implements OnInit {
  public form: FormGroup;
  public roles: IRole[];
  public sbus: ISBU[];
  public currentStaffInfo: IDeskStaffApps[];
  public targetStaffs: Staff[] = [];
  public selectedAppsId: number[] = [];

  columns = [
    {
      columnDef: 'yearOfWKP',
      header: 'Year',
    },
    {
      columnDef: 'referenceNo',
      header: 'Reference No.',
    },
    {
      columnDef: 'currentUserEmail',
      header: 'Company Email',
    },
    {
      columnDef: 'submittedAt',
      header: 'Submission Date',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MoveApplicationFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private reportService: ReportService,
    private adminService: AdminService
  ) {
    this.currentStaffInfo = (data.data.data as IDeskStaffApps[]).filter(
      (d) => d.desk.hasWork == true
    );
    // if (this.targetData)
    //   this.form = this.formBuilder.group({
    //     id: [this.targetData?.id],
    //     roleID: [
    //       this.roles.find((r) => r.roleName == this.targetData.role).id,
    //       Validators.required,
    //     ],
    //     sbuID: [
    //       this.sbus.find((s) => s.sbU_Name == this.targetData.sbu).id,
    //       Validators.required,
    //     ],
    //     sort: [this.targetData.sort, Validators.required],
    //   });
    // else
    this.form = this.formBuilder.group({
      sourceStaffID: [
        this.currentStaffInfo[0]?.staff.staffID,
        Validators.required,
      ],
      targetStaffID: ['', Validators.required],
      selectedApps: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getStaffsBySBUAndRole();
  }

  onClose() {
    this.dialogRef.close();
  }

  moveApplication() {
    const sourceStaffID = this.form.get('sourceStaffID').value;
    const targetStaffID = this.form.get('targetStaffID').value;
    const selectedApps = this.form.get('selectedApps').value;

    this.dialogRef.close();

    this.modalService.logCover('Processing...', true);

    this.reportService
      .moveApplication(sourceStaffID, targetStaffID, selectedApps)
      .subscribe({
        next: (res) => {
          // this.dialogRef.close();
          this.modalService.togCover();
          this.modalService.logNotice(res.message, 'Success', 'success');
          this.cd.markForCheck();
        },
        error: (error) => {
          // this.dialogRef.close();
          this.modalService.togCover();
          this.modalService.logNotice(error.message, 'Error', 'error');
          this.cd.markForCheck();
        },
      });
  }

  getStaffsBySBUAndRole() {
    this.modalService.logCover('Fetching data...', true);
    this.adminService
      .getStaffsBySBUAndRole(
        this.currentStaffInfo[0].staff.staff_SBU as any,
        this.currentStaffInfo[0].staff.roleID
      )
      .subscribe({
        next: (res) => {
          this.targetStaffs = res.data;
          this.targetStaffs = this.targetStaffs.filter(
            (t) => t.staffID != this.currentStaffInfo[0].staff.staffID
          );

          console.log('this.ta', this.targetStaffs, res.data);

          this.modalService.togCover();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.modalService.logNotice(error.message, 'Error', 'error');
          this.cd.markForCheck();
        },
      });
  }

  onCheckBox(row: Application) {
    if (this.selectedAppsId.length == 0) this.selectedAppsId.push(row.id);
    else {
      const isFound = this.selectedAppsId.find((a) => a == row.id);

      if (isFound)
        this.selectedAppsId = this.selectedAppsId.filter((a) => a != row.id);
      else this.selectedAppsId.push(row.id);
    }

    this.form.controls['selectedApps'].setValue(this.selectedAppsId);
    this.form.updateValueAndValidity();
    this.cd.markForCheck();
    console.log('Apps...', this.selectedAppsId);
  }

  // editProcessFlow() {
  //   this.reportService.editProcessFlow(this.form.value).subscribe({
  //     next: (res) => {
  //       this.dialogRef.close();
  //       this.modalService.logNotice(res.message, 'Success', 'success');
  //       this.cd.markForCheck();
  //     },
  //     error: (error) => {
  //       this.dialogRef.close();
  //       this.modalService.logNotice(error.message, 'Error', 'error');
  //       this.cd.markForCheck();
  //     },
  //   });
  // }
}
