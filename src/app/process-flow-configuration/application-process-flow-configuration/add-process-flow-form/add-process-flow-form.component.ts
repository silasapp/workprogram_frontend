import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  Application,
  ApplicationDetails,
} from 'src/app/models/application-details';
import { ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';
import { WorkProgramService } from 'src/app/services/workprogram.service';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: WorkProgramService,
    public dialogRef: MatDialogRef<AddProcessFlowFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private route: Router,
    private reportService: ReportService
  ) {
    this.roles = data.data.roles;
    this.sbus = data.data.sbus;

    console.log('sssss', data, this.roles, this.sbus);

    this.form = this.formBuilder.group({
      roleID: ['', Validators.required],
      sbuID: ['', Validators.required],
      sort: ['', Validators.required],
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
}
