import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

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
    repor: ReportService;

    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        this.cdr = cd;
        this.repor = report;
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
      debugger;
      this.modalService.logReportDownload();
      let seismicData = this.repor.truncateArray(this.repor.seismicApprovedTable.data, this.repor.seismicApprovedTable.header);
      let seismicTable = this.repor.truncateArray2(this.repor.seismicApprovedTable.data, this.repor.seismicApprovedTable.header);
      let seismicHeader = this.repor.truncateHeader(this.repor.seismicApprovedTable.header);
      let seismicActivitiesData = this.repor.truncateArray(this.repor.seismicActivitiesTable.data, this.repor.seismicActivitiesTable.header);
      let rell = this.repor.seismicActivities2yrsTable.data;
      let seismicActivities2yrsData = this.repor.truncateArray(this.repor.seismicActivities2yrsTable.data, this.repor.seismicActivities2yrsTable.header);

      // let DATA: any = document.getElementById('htmlData');
      // html2canvas(DATA).then((canvas) => {
      //   //debugger;
      //   let fileWidth = 208;
      //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //   const FILEURI = canvas.toDataURL('image/png');
      //   canvas.style.margin = '20';
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 20;
      //   PDF.addImage(FILEURI, 'PNG', 5, position, fileWidth, fileHeight);

        //PDF.addPage('a4', 'p');
        PDF.setFontSize(12);
        PDF.setFont("helvetica", "500");
        //PDF.internal.pageSize.width = 1200;
        //PDF.text('Centered text', width/2, 20, { align: 'center' })

        /////// EXEUTIVE SUMMARY
        PDF.text('EXEUTIVE SUMMARY', 5, 5);
        PDF.text(this.data, 5, 20, { maxWidth: 190 });
        PDF.html('<p>YOU ARE COOL YOU ARE COOL YOU ARE COOLYOU ARE COOL</p>',  {x: 20, y: 20, width: 170, windowWidth: 650 } );

        /////// SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR
        PDF.addPage('a4', 'p');
        PDF.setFontSize(14);
        PDF.setFont("Trebuchet MS", "normal", 900);
        PDF.text(`SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR ${this.genk.reportYear}`, 10, 10);

        if (this.repor.seismicApprovedTable.data.length > 0) {
          let seismicFilt = seismicData.map(function(obj) {
            return {
              companyName: obj.companyName,
              omL_Name: obj.omL_Name,
              quantum_Approved: obj.quantum_Approved,
              quantum: obj.quantum
            }
          });

          let seismicFiltHeader = ["COMPANY NAME", "NO. OF BLOCKS", "TOTAL QUANTUM APPROVED (SQ.KM)", "TOTAL QUANTUM ACQUIRED (SQ.KM)"];

          let compressedData = this.repor.compressReportDataArray(seismicFilt, 'companyName')
          autoTable(PDF, {head: [seismicFiltHeader], body: compressedData, styles: {
            fillColor: [220, 220, 220],
            lineColor: [200, 200, 200],
            lineWidth: 0.5,
          },
          margin: {top: 15, left: 10, right: 10}, headStyles: {textColor: [255, 255, 255], fillColor: [0, 128, 128]}});
        }
        PDF.setFontSize(12);
        PDF.setFont("Trebuchet MS", "normal", "900");
        PDF.setTextColor("brown");
        PDF.text(`TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor.totalFromArray(seismicData, "quantum_Approved").toFixed(2)}`, 100, 285);
        PDF.text(`TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor.totalFromArray(seismicData, "quantum").toFixed(2)}`, 100, 290);

        //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });


      if (this.repor.seismicApprovedIsChart) {
        PDF.addPage('a4', 'p');
        PDF.setFontSize(12);
        PDF.setFont("Trebuchet MS", "normal", "900");
        PDF.setTextColor("navy");
        let cap = this.repor.seismicApprovedSelectedColumns[1].header + " BY " + this.repor.seismicApprovedSelectedColumns[0].header;
        PDF.text(cap, 8, 10);
        //debugger;
        PDF.addImage(this.report.seismicApprovedChart, 'PNG', 5, position, 200, 130);

        PDF.setFontSize(14);
        PDF.setTextColor("black");
        PDF.text(`SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR ${this.genk.reportYear}`, 8, 160);
      }


      /////// SEISMIC ACTIVITIES
      PDF.addPage('a4', 'p');
      PDF.setFontSize(14);
      PDF.setTextColor("black");
      PDF.setFont("Trebuchet MS", "normal", "900");
      PDF.text(`1.1 Seismic Data Acquisition Activities for ${this.genk.reportYear}`, 5, 5);
      PDF.setFontSize(12);
      PDF.setFont("helvetica", "500");
      PDF.text(this.repor.seismicActivitiesText, 5, 20, { maxWidth: 190 });

      if (this.repor.seismicActivitiesTable.data.length > 0) {
        let seismicActivitiesFilt = seismicActivitiesData.map(function(obj) {
          return {
            companyName: obj.companyName,
            omL_Name: obj.omL_Name,
            quantum_Approved: obj.quantum_Approved,
            quantum: obj.quantum
          }
        });

        let seismicActivitiesFiltHeader = ["COMPANY NAME", "NO. OF BLOCKS", "TOTAL QUANTUM APPROVED (SQ.KM)", "TOTAL QUANTUM ACQUIRED (SQ.KM)"];

        let compressedActivitiesData = this.repor.compressReportDataArray(seismicActivitiesFilt, 'companyName')
        autoTable(PDF, {head: [seismicActivitiesFiltHeader], body: compressedActivitiesData, styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: {top: 40, left: 10, right: 10}, headStyles: {textColor: [255, 255, 255], fillColor: [0, 128, 128]}});
      }
      PDF.setFontSize(12);
      PDF.setFont("Trebuchet MS", "normal", "900");
      PDF.setTextColor("brown");
      PDF.text(`TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor.totalFromArray(seismicActivitiesData, "quantum_Approved").toFixed(2)}`, 100, 285);
      PDF.text(`TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor.totalFromArray(seismicActivitiesData, "quantum").toFixed(2)}`, 100, 290);
      //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

      if (this.repor.seismicActivitiesIsChart) {
        PDF.addPage('a4', 'p');
        PDF.setFontSize(12);
        PDF.setFont("Trebuchet MS", "normal", "900");
        PDF.setTextColor("navy");
        let cap = this.repor.seismicActivitiesSelectedColumns[1].header + " BY " + this.repor.seismicActivitiesSelectedColumns[0].header;
        PDF.text(cap, 8, 10);
        //debugger;
        PDF.addImage(this.report.exporting, 'PNG', 5, position, 200, 130);
      }


      /////// SEISMIC ACTIVITIES 2 YEARS AGO
      PDF.addPage('a4', 'p');
      PDF.setFontSize(14);
      PDF.setTextColor("black");
      PDF.setFont("Trebuchet MS", "normal", "900");
      PDF.text(`1.2 Seismic Data Approved and 2 Years ago for ${this.genk.reportYear}`, 5, 5);

      if (this.repor.seismicActivities2yrsTable.data.length > 0) {
        let seismicActivities2yrsFilt = seismicActivities2yrsData.map(function(obj) {
          return {
            companyName: obj.companyName,
            omL_Name: obj.omL_Name,
            quantum_Approved: obj.quantum_Approved,
            quantum: obj.quantum
          }
        });

        let seismicActivities2yrsFiltHeader = ["COMPANY NAME", "NO. OF BLOCKS", "TOTAL QUANTUM APPROVED (SQ.KM)", "TOTAL QUANTUM ACQUIRED (SQ.KM)"];

        let compressedActivities2yrsData = this.repor.compressReportDataArray(seismicActivities2yrsFilt, 'companyName');
        autoTable(PDF, {head: [seismicActivities2yrsFiltHeader], body: compressedActivities2yrsData, styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: {top: 20, left: 10, right: 10}, headStyles: {textColor: [255, 255, 255], fillColor: [0, 128, 128]}});
      }
      PDF.setFontSize(12);
      PDF.setFont("Trebuchet MS", "normal", "900");
      PDF.setTextColor("brown");
      PDF.text(`TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor.totalFromArray(seismicActivities2yrsData, "quantum_Approved").toFixed(2)}`, 100, 285);
      PDF.text(`TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor.totalFromArray(seismicActivities2yrsData, "quantum").toFixed(2)}`, 100, 290);
      //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

      if (this.repor.seismicActivities2yrsIsChart) {
        PDF.addPage('a4', 'p');
        PDF.setFontSize(12);
        PDF.setFont("Trebuchet MS", "normal", "900");
        PDF.setTextColor("navy");
        let cap = this.repor.seismicActivities2yrsSelectedColumns[1].header + " BY " + this.repor.seismicActivities2yrsSelectedColumns[0].header;
        PDF.text(cap, 8, 10);
        //debugger;
        PDF.addImage(this.report.exporting, 'PNG', 5, position, 200, 130);
      }

      PDF.save('angular-demo.pdf');
    }

}

