import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-delete-process-flow',
  templateUrl: './delete-process-flow.component.html',
  styleUrls: ['./delete-process-flow.component.css'],
})
export class DeleteProcessFlowComponent implements OnInit {
  public targetData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteProcessFlowComponent>,
    public dialog: MatDialog,
    private modalService: ModalService,
    private cd: ChangeDetectorRef,
    private reportService: ReportService
  ) {
    this.targetData = data.data.targetData;
  }
  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  delete() {
    this.reportService.deleteProcessFlow(this.targetData.id).subscribe({
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
