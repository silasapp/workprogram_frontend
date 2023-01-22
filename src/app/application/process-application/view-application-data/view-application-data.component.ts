import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-application-data',
  templateUrl: './view-application-data.component.html',
  styleUrls: ['./view-application-data.component.scss'],
})
export class ViewApplicationDataComponent implements OnInit {
  public sbuReport;
  public appId: number;

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.appId = param['id'];
      this.getSBUReport(this.appId);
    });
  }

  getSBUReport(appId) {
    this.adminService.getSBUReport(appId).subscribe({
      next: (res) => {
        console.log('res', res);
        this.cd.markForCheck();
      },
      error: (error) => {
        this.modalService.logNotice(error.message, 'Error', 'error');
        this.cd.markForCheck();
      },
    });
  }
}
