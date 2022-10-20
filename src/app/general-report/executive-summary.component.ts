import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss']
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

    ngOnInit(): void {
      this.data = [];
      this.getData();
    }



    getData() {
      //this.cd.markForCheck();
      this.modalService.logCover("Loading data...", true);
      if (this.genk.reportYear !== undefined || this.genk.reportYear != null) {
        this.report.getExecutiveReport(this.genk.reportYear)
          .subscribe(res => {
              this.data = res.summary_1;
              this.modalService.togCover();
              this.cd.markForCheck();

          });
      }

          //this.modalService.togCover();
    }

}

