import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';
import {
  IRole,
  ISBU,
} from '../application-process-flow-configuration.component';

@Component({
  selector: 'app-add-process-flow-form',
  templateUrl: './add-process-flow-form.component.html',
  styleUrls: ['./add-process-flow-form.component.css'],
})
export class AddProcessFlowFormComponent implements OnInit {
  public form: FormGroup;
  public roles: IRole[];
  public sbus: ISBU[];
  public actions: string[] = [];
  public statuses: string[] = [];
  public targetData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProcessFlowFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private reportService: ReportService
  ) {
    this.roles = data.data.roles;
    this.sbus = data.data.sbus;
    this.targetData = data.data?.targetData;
    this.actions = data.data?.actions || ['Submitted'];

    this.statuses = data.data?.statuses || ['Processing'];

    if (this.targetData)
      this.form = this.formBuilder.group({
        id: [this.targetData?.id],
        triggeredBySBU: [
          this.roles.find((r) => r.roleName == this.targetData.role).id,
          Validators.required,
        ],
        triggeredByRole: [
          this.sbus.find((s) => s.sbU_Name == this.targetData.sbu).id,
          Validators.required,
        ],

        targetedToSBU: [
          this.roles.find((r) => r.roleName == this.targetData.role).id,
          Validators.required,
        ],
        targetedToRole: [
          this.sbus.find((s) => s.sbU_Name == this.targetData.sbu).id,
          Validators.required,
        ],

        processAction: [
          this.actions.find((a) => a == this.targetData.processActions),
          Validators.required,
        ],
        processStatus: [
          this.statuses.find((s) => s == this.targetData.processStatus),
          Validators.required,
        ],
      });
    else
      this.form = this.formBuilder.group({
        triggeredBySBU: [Validators.required],
        triggeredByRole: [Validators.required],

        targetedToSBU: [Validators.required],
        targetedToRole: [Validators.required],

        processAction: [Validators.required],
        processStatus: [Validators.required],
      });
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  addProcessFlow() {
    this.reportService.addProcessFlow(this.form.value).subscribe({
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

  editProcessFlow() {
    this.reportService.editProcessFlow(this.form.value).subscribe({
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
