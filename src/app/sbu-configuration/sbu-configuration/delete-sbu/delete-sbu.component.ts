import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-delete-sbu',
  templateUrl: './delete-sbu.component.html',
  styleUrls: ['./delete-sbu.component.css'],
})
export class DeleteSBUComponent implements OnInit {
  public targetData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteSBUComponent>,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private adminService: AdminService
  ) {
    this.targetData = data.data.targetData;
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  delete() {
    this.adminService.deleteSBU(this.targetData.id).subscribe({
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
