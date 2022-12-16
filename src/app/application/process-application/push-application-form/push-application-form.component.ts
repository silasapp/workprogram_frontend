import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';
//import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import {
  Application,
  ApplicationDetails,
} from 'src/app/models/application-details';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  selector: 'app-push-application-form',
  templateUrl: './push-application-form.component.html',
  styleUrls: ['./push-application-form.component.css'],
})
export class PushApplicationFormComponent implements OnInit {
  public form: FormGroup;
  public appDetails: ApplicationDetails;
  public selectedApps = [];
  //public appsDropdownSettings: IDropdownSettings = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: WorkProgramService,
    public dialogRef: MatDialogRef<PushApplicationFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.appDetails = data.data.applicationDetails;

    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  pushApplication() {
    const selectedapps = [];
    selectedapps.push(this.appDetails.application.id as unknown as string);
    this.appService
      .pushApplication(
        this.appDetails.staff[0].desk_ID,
        this.form.value.comment,
        selectedapps
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.dialogRef.close();
          }
        },
        error: (error) => {},
      });
  }
}
