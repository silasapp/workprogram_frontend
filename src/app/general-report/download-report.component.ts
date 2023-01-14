import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss']
})
export class DownloadReportComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
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

    public openPDF(): void {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        canvas.style.margin = '20';
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        PDF.addImage(FILEURI, 'PNG', 5, position, fileWidth, fileHeight);
        PDF.addPage('a4', 'p');
        PDF.setFontSize(12);
        PDF.setFont("helvetica", "500");
        //PDF.internal.pageSize.width = 1200;
        //PDF.text('Centered text', width/2, 20, { align: 'center' })
        PDF.text('EXEUTIVE SUMMARY', 5, 5);
        PDF.text(this.data, 5, 20, { maxWidth: 190 });
        PDF.html('<p>YOU ARE COOL YOU ARE COOL YOU ARE COOLYOU ARE COOL</p>',  {x: 20, y: 20, width: 170, windowWidth: 650 } )
        PDF.save('angular-demo.pdf');
      });
    }

}

