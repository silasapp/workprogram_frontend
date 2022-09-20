import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutiveSummaryComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = '';
    data: any;

    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        this.cdr = cd;
        this.modalService.generalReport
        .subscribe(res => {
          this.getData();
        });
    }

    ngOnInit() {
      this.data = [];
      this.getData();
    }



    getData() {
      this.report.getExecutiveReport(this.genk.reportYear)
          .subscribe(res => {
              this.data = res.summary_1;
              this.cd.markForCheck();
          });
    }

}
