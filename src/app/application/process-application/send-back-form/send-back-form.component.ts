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
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  selector: 'app-send-back-form',
  templateUrl: './send-back-form.component.html',
  styleUrls: ['./send-back-form.component.css'],
})
export class SendBackFormComponent implements OnInit {
  public form: FormGroup;
  public offices: string[] = ['HQ', 'ZO', 'FO'];
  public apps: Application[] = [];
  public appDetails: ApplicationDetails;
  public selectedApps = [];
  public appsDropdownSettings: IDropdownSettings = {};

  constructor(
    public dialogRef: MatDialogRef<SendBackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: WorkProgramService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: ModalService,
    private route: Router,
    private cd: ChangeDetectorRef
  ) {
    this.apps = data.data.applications;
    this.appDetails = data.data.applicationDetails;

    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  rejectApplication() {
    const selectedapps = [];
    selectedapps.push(this.appDetails.application.id as unknown as string);
    this.appService
      .rejectApplication(
        this.appDetails.staff[0].desk_ID,
        this.form.value.comment,
        selectedapps
      )
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.modalService.logNotice(res.message, 'Success', 'success');
          this.route.navigate(['/application/mydesk']);
          this.cd.markForCheck();
        },
        error: (error) => {
          this.dialogRef.close();
          this.modalService.logNotice(error.message, 'Error', 'error');
          this.route.navigate(['/application/mydesk']);
          this.cd.markForCheck();
        },
      });
  }
}
