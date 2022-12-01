import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  Application,
  ApplicationDetails,
} from 'src/app/models/application-details';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.css'],
})
export class ApproveFormComponent implements OnInit {
  public form: FormGroup;
  public offices: string[] = ['HQ', 'ZO', 'FO'];
  public apps: Application[] = [];
  public appDetails: ApplicationDetails;
  public selectedApps = [];
  public appsDropdownSettings: IDropdownSettings = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: WorkProgramService,
    public dialogRef: MatDialogRef<ApproveFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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

  approveApplication() {
    const selectedapps = [];
    selectedapps.push(this.appDetails.application.id as unknown as string);
    this.appService
      .approveApplication(
        this.appDetails.staff[0].desk_ID,
        this.form.value.comment,
        selectedapps
      )
      .subscribe({
        next: (res) => {
          console.log('ressss', res);
          if (res.success) {
            this.dialogRef.close();
          }
        },
        error: (error) => {},
      });
  }
}
