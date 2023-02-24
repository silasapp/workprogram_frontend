import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SBU } from 'src/app/constants/SBU';
import {
  Application,
  ApplicationDetails,
  Staff,
} from 'src/app/models/application-details';
import { AuthenticationService, ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
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
  public sbuTableDetailsList: SBUSelectTableDetails[];
  public sbuList: SBUTypes[] = [];
  public selectedTables: SBUSelectTableDetails[] = null;
  public selectedSBUs: SBUTypes[] = null;
  public staffList: Staff[];
  public checkItems: SBUTypes[] | SBUSelectTableDetails[] = null;
  public isPlanning: boolean = false;
  public isCollapse = true;

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
    this.sbuTableDetailsList = this.appDetails.sbU_TableDetails;
    this.staffList = this.appDetails.staff as unknown as Staff[];
    this.sbuList = this.appDetails.sbu;

    this.isPlanning = this.isPlanninFunc();

    this.checkItems = !this.isPlanning
      ? this.sbuTableDetailsList
      : this.sbuList;

    // console.log('details', this.sbuTableDetailsList);
  }

  ngOnInit(): void {
    if (this.isPlanning) {
      this.form = this.formBuilder.group({
        SBU_IDs: ['', Validators.required],
        comment: ['', Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        selectedTables: ['', Validators.required],
        comment: ['', Validators.required],
      });
    }
  }

  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
  }

  onClose() {
    this.dialogRef.close();
  }

  isPlanninFunc(): boolean {
    const found = this.staffList.findIndex((s) => s.staff_SBU == SBU.PLANNING);

    return found == -1 ? false : true;
  }

  rejectApplication() {
    const selectedapps = [];
    selectedapps.push(this.appDetails.application.id as unknown as string);
    this.appService
      .rejectApplication(
        this.appDetails.staff[0].desk_ID,
        this.form.value.comment,
        selectedapps,
        this.form.value.selectedTables,
        this.form.value.SBU_IDs
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

  onSelect(item: SBUSelectTableDetails) {
    if (!this.isPlanning) this.setSelectedTables(item);
    else this.setSelectedSBUs(item);
  }

  setSelectedTables(item) {
    let selectItems: number[] = [];

    this.selectedTables = this.selectedTables ? this.selectedTables : [];

    const found = this.selectedTables.findIndex((t) => {
      return t.tableId == item.tableId;
    });

    if (found != -1) {
      this.selectedTables = this.selectedTables.filter(
        (t) => t.tableId !== item.tableId
      );
      return;
    }

    this.selectedTables.push(item);

    selectItems = this.selectedTables.map((t) => t.tableId);
    this.form.get('selectedTables').setValue(selectItems);
  }

  setSelectedSBUs(item) {
    let selectItems: number[] = [];

    this.selectedSBUs = this.selectedSBUs ? this.selectedSBUs : [];

    const found = this.selectedSBUs.findIndex((t) => {
      return t.id == item.id;
    });

    if (found != -1) {
      this.selectedSBUs = this.selectedSBUs.filter((t) => t.id !== item.id);
      return;
    }

    this.selectedSBUs.push(item);

    selectItems = this.selectedSBUs.map((t) => t.id);
    this.form.get('SBU_IDs').setValue(selectItems);
  }
}

export class SBUSelectTableDetails {
  sbU_ID: any;
  tableId: number;
  tableName: string;
  tableSchema: string;
}

export class SBUTypes {
  id: number;
  sbU_Code: string;
  sbU_Name: string;
}
