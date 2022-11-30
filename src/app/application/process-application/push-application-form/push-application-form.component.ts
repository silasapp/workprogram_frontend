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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Application } from 'src/app/models/application-details';
import { WorkProgramService } from 'src/app/services/workprogram.service';

@Component({
  selector: 'app-push-application-form',
  templateUrl: './push-application-form.component.html',
  styleUrls: ['./push-application-form.component.css'],
})
export class PushApplicationFormComponent implements OnInit {
  public form: FormGroup;
  public offices: string[] = ['HQ', 'ZO', 'FO'];
  public apps: Application[] = [];
  public selectedApps = [];
  public appsDropdownSettings: IDropdownSettings = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: WorkProgramService,
    public dialogRef: MatDialogRef<PushApplicationFormComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.apps = data.data.applications;

    this.form = this.formBuilder.group({
      deskID: ['', Validators.required],
      comment: ['', Validators.required],
      selectedApps: formBuilder.array([], Validators.required),
    });
  }
  ngOnInit(): void {
    this.appsDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'companyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  onClose() {
    this.dialogRef.close();
  }

  createOffice() {
    console.log('form', this.form.value);
    this.appService.pushApplication(null, null, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.dialogRef.close();
        }
      },
      error: (error) => {},
    });
  }

  onItemSelect(event: ListItem) {
    (this.form.get('docId') as FormArray).push(new FormControl(event.id));
  }

  onSelectAll(event: ListItem[]) {
    event.forEach((item) => {
      (this.form.get('docId') as FormArray).push(new FormControl(item.id));
    });
  }

  onDeSelect(event: ListItem) {
    const targetIndex = (
      (this.form.get('docId') as FormArray).value as Array<number>
    ).indexOf(event.id as number);
    (this.form.get('docId') as FormArray).removeAt(targetIndex);
  }
}
