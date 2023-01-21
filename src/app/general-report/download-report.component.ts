import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  styleUrls: [
    '../reports/ndr-report.component.scss',
    './general-report.component.scss',
  ],
})
export class DownloadReportComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = '';
  data: any;
  repor: ReportService;

  constructor(
    private report: ReportService,
    private workprogram: WorkProgramService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.repor = report;
    this.modalService.generalReport.subscribe((res) => {
      this.getData();
    });
  }

  ngOnInit(): void {
    this.data = [];
    this.getData();
  }

  getData() {
    //this.cd.markForCheck();
    this.modalService.logCover('Loading data...', true);
    if (this.genk.reportYear !== undefined || this.genk.reportYear != null) {
      this.report.getExecutiveReport(this.genk.reportYear).subscribe((res) => {
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
    let seismicData = this.repor.truncateArray(
      this.repor.seismicApprovedTable.data,
      this.repor.seismicApprovedTable.header
    );
    //let seismicTable = this.repor.truncateArray2(this.repor.seismicApprovedTable.data, this.repor.seismicApprovedTable.header);
    //let seismicHeader = this.repor.truncateHeader(this.repor.seismicApprovedTable.header);
    let seismicActivitiesData = this.repor.truncateArray(
      this.repor.seismicActivitiesTable.data,
      this.repor.seismicActivitiesTable.header
    );
    let rell = this.repor.seismicActivities2yrsTable.data;
    let seismicActivities2yrsData = this.repor.truncateArray(
      this.repor.seismicActivities2yrsTable.data,
      this.repor.seismicActivities2yrsTable.header
    );
    let seismicProcessingData = this.repor.truncateArray(
      this.repor.seismicProcessingTable.data,
      this.repor.seismicProcessingTable.header
    );
    let seismicProcessingPreviousData = this.repor.truncateArray(
      this.repor.seismicProcessingPreviousTable.data,
      this.repor.seismicProcessingPreviousTable.header
    );
    let explorationWellsData = this.repor.truncateArray(
      this.repor.explorationWellsTable.data,
      this.repor.explorationWellsTable.header
    );
    let appraisalWellsData = this.repor.truncateArray(
      this.repor.appraisalWellsTable.data,
      this.repor.appraisalWellsTable.header
    );
    let developmentWellsData = this.repor.truncateArray(
      this.repor.developmentWellsTable.data,
      this.repor.developmentWellsTable.header
    );
    let oilProductionData = this.repor.truncateArray(
      this.repor.oilProductionTable.data,
      this.repor.oilProductionTable.header
    );
    let reservesUpdateData = this.repor.reservesUpdateTable.data;

    let oilProductionHeader = this.repor.truncateHeader(
      this.repor.oilProductionTable.header
    );
    let oilProductionContractData = this.repor.truncateArray(
      this.repor.oilProductionContractTable.data,
      this.repor.oilProductionContractTable.header
    );
    let oilProductionContractHeader = this.repor.truncateHeader(
      this.repor.oilProductionContractTable.header
    );
    let oilProductionMonthlyData = this.repor.truncateArray(
      this.repor.oilProductionMonthlyTable.data,
      this.repor.oilProductionMonthlyTable.header
    );
    let oilProductionMonthlyHeader = this.repor.truncateHeader(
      this.repor.oilProductionMonthlyTable.header
    );
    let oilProductionTerrainData = this.repor.truncateArray(
      this.repor.oilProductionTerrainTable.data,
      this.repor.oilProductionTerrainTable.header
    );
    let oilProductionTerrainHeader = this.repor.truncateHeader(
      this.repor.oilProductionTerrainTable.header
    );

    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   //
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   canvas.style.margin = '20';
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 20;
    //   PDF.addImage(FILEURI, 'PNG', 5, position, fileWidth, fileHeight);

    //PDF.addPage('a4', 'p');
    PDF.setFontSize(12);
    PDF.setFont('helvetica', '500');
    //PDF.internal.pageSize.width = 1200;
    //PDF.text('Centered text', width/2, 20, { align: 'center' })

    /////// EXEUTIVE SUMMARY
    PDF.text('EXEUTIVE SUMMARY', 5, 5);
    PDF.text(this.data, 5, 20, { maxWidth: 190 });
    PDF.html('<p>YOU ARE COOL YOU ARE COOL YOU ARE COOLYOU ARE COOL</p>', {
      x: 20,
      y: 20,
      width: 170,
      windowWidth: 650,
    });

    /////// SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setFont('Trebuchet MS', 'normal', 900);
    PDF.text(
      `SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR ${this.genk.reportYear}`,
      10,
      10
    );

    if (this.repor.seismicApprovedTable.data.length > 0) {
      let seismicFilt = seismicData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          quantum_Approved: obj.quantum_Approved,
          quantum: obj.quantum,
        };
      });

      let seismicFiltHeader = [
        'COMPANY NAME',
        'NO. OF BLOCKS',
        'TOTAL QUANTUM APPROVED (SQ.KM)',
        'TOTAL QUANTUM ACQUIRED (SQ.KM)',
      ];

      let compressedData = this.repor.compressReportDataArray(
        seismicFilt,
        'companyName'
      );
      autoTable(PDF, {
        head: [seismicFiltHeader],
        body: compressedData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 15, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }
    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicData, 'quantum')
        .toFixed(2)}`,
      100,
      290
    );

    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.seismicApprovedIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.seismicApprovedSelectedColumns[1].header +
        ' BY ' +
        this.repor.seismicApprovedSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //
      PDF.addImage(
        this.report.seismicApprovedChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `SEISMIC DATA APPROVED AND ACQUIRED PREVIOUS YEAR ${this.genk.reportYear}`,
        8,
        160
      );
    }

    /////// SEISMIC ACTIVITIES
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `1.1 Seismic Data Acquisition Activities for ${this.genk.reportYear}`,
      5,
      5
    );
    PDF.setFontSize(12);
    PDF.setFont('helvetica', '500');
    PDF.text(this.repor.seismicActivitiesText, 5, 20, { maxWidth: 190 });

    if (this.repor.seismicActivitiesTable.data.length > 0) {
      let seismicActivitiesFilt = seismicActivitiesData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          quantum_Approved: obj.quantum_Approved,
          quantum: obj.quantum,
        };
      });

      let seismicActivitiesFiltHeader = [
        'COMPANY NAME',
        'NO. OF BLOCKS',
        'TOTAL QUANTUM APPROVED (SQ.KM)',
        'TOTAL QUANTUM ACQUIRED (SQ.KM)',
      ];

      let compressedActivitiesData = this.repor.compressReportDataArray(
        seismicActivitiesFilt,
        'companyName'
      );
      autoTable(PDF, {
        head: [seismicActivitiesFiltHeader],
        body: compressedActivitiesData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 40, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }
    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivitiesData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivitiesData, 'quantum')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.seismicActivitiesIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.seismicActivitiesSelectedColumns[1].header +
        ' BY ' +
        this.repor.seismicActivitiesSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.seismicActivitiesChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(`SEISMIC DATA ACTIVITIES ${this.genk.reportYear}`, 8, 160);
    }

    /////// SEISMIC ACTIVITIES 2 YEARS AGO
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `1.2 Seismic Data Approved and 2 Years ago for ${this.genk.reportYear}`,
      5,
      5
    );
    /////// SEISMIC ACTIVITIES 2 YEARS AGO
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `1.2 Seismic Data Approved and 2 Years ago for ${(
        Number(this.genk.reportYear) - 2
      ).toString()}`,
      5,
      5
    );

    if (this.repor.seismicActivities2yrsTable.data.length > 0) {
      let seismicActivities2yrsFilt = seismicActivities2yrsData.map(function (
        obj
      ) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          quantum_Approved: obj.quantum_Approved,
          quantum: obj.quantum,
        };
      });

      let seismicActivities2yrsFiltHeader = [
        'COMPANY NAME',
        'NO. OF BLOCKS',
        'TOTAL QUANTUM APPROVED (SQ.KM)',
        'TOTAL QUANTUM ACQUIRED (SQ.KM)',
      ];

      let compressedActivities2yrsData = this.repor.compressReportDataArray(
        seismicActivities2yrsFilt,
        'companyName'
      );
      autoTable(PDF, {
        head: [seismicActivities2yrsFiltHeader],
        body: compressedActivities2yrsData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }
    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivities2yrsData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivities2yrsData, 'quantum')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });
    // margin: {top: 20, left: 10, right: 10}, headStyles: {textColor: [255, 255, 255], fillColor: [0, 128, 128]}});
    // }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivities2yrsData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicActivities2yrsData, 'quantum')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.seismicActivities2yrsIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.seismicActivities2yrsSelectedColumns[1].header +
        ' BY ' +
        this.repor.seismicActivities2yrsSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.seismicActivities2yrsChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `SEISMIC DATA APPROVED AND ACQUIRED TWO YEAR AGO ${(
          Number(this.genk.reportYear) - 2
        ).toString()}`,
        8,
        160
      );
    }

    /////// SEISMIC CURRENT PROCESSING
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `Table 5 Showing Processing and Reprocessing Activities by Companies. ${this.genk.reportYear}`,
      5,
      5
    );

    if (this.repor.seismicProcessingTable.data.length > 0) {
      let seismicProcessingFilt = seismicProcessingData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          quantum_Approved: obj.quantum_Approved,
          quantum: obj.geo_Quantum_of_Data,
        };
      });

      let seismicProcessingFiltHeader = [
        'COMPANY NAME',
        'NO. OF BLOCKS',
        'TOTAL QUANTUM APPROVED (SQ.KM)',
        'TOTAL QUANTUM PROCESSED (SQ.KM)',
      ];

      let compressedProcessingData = this.repor.compressReportDataArray(
        seismicProcessingFilt,
        'companyName'
      );
      autoTable(PDF, {
        head: [seismicProcessingFiltHeader],
        body: compressedProcessingData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicProcessingData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicProcessingData, 'geo_Quantum_of_Data')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.seismicProcessingIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.seismicProcessingSelectedColumns[1].header +
        ' BY ' +
        this.repor.seismicProcessingSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.seismicProcessingChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `SEISMIC PROCESSING AND REPROCESSING ACTIVITIES ${this.genk.reportYear}`,
        8,
        160
      );
    }

    /////// SEISMIC PROCESSING PREVIOUS
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `Table 5 Showing Processing and Reprocessing Activities by Companies. ${(
        Number(this.genk.reportYear) - 1
      ).toString()}`,
      5,
      5
    );

    if (this.repor.seismicProcessingPreviousTable.data.length > 0) {
      let seismicProcessingPreviousFilt = seismicProcessingPreviousData.map(
        function (obj) {
          return {
            companyName: obj.companyName,
            omL_Name: obj.omL_Name,
            quantum_Approved: obj.quantum_Approved,
            quantum: obj.geo_Quantum_of_Data,
          };
        }
      );

      let seismicProcessingPreviousFiltHeader = [
        'COMPANY NAME',
        'NO. OF BLOCKS',
        'TOTAL QUANTUM APPROVED (SQ.KM)',
        'TOTAL QUANTUM PROCESSED (SQ.KM)',
      ];

      let compressedProcessingPreviousData = this.repor.compressReportDataArray(
        seismicProcessingPreviousFilt,
        'companyName'
      );
      autoTable(PDF, {
        head: [seismicProcessingPreviousFiltHeader],
        body: compressedProcessingPreviousData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(seismicProcessingPreviousData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(seismicProcessingPreviousData, 'geo_Quantum_of_Data')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.seismicProcessingPreviousIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.seismicProcessingPreviousSelectedColumns[1].header +
        ' BY ' +
        this.repor.seismicProcessingPreviousSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.seismicProcessingPreviousChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `SEISMIC PROCESSING AND REPROCESSING ACTIVITIES ${(
          Number(this.genk.reportYear) - 1
        ).toString()}`,
        8,
        160
      );
    }

    /////// EXPLORATION WELLS
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `2.0 EXPLORATION WELLS. ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.explorationWellsTable.data.length > 0) {
      let explorationWellsFilt = explorationWellsData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          terrain: obj.terrain,
          contract_Type: obj.contract_Type,
          category: obj.category,
          spud_date: obj.spud_date,
          number_of_Days_to_Total_Depth: obj.number_of_Days_to_Total_Depth,
          well_cost: obj.well_cost,
        };
      });

      let explorationWellsFiltHeader = [
        'COMPANY NAME',
        'BLOCK',
        'TERRAIN',
        'CONTRACT TYPE',
        'WELL CLASSIFICATION',
        'SPUD DATE',
        'NO. OF DAYS TO TD',
        'WELL COST (USD)',
      ];

      let compressedexplorationWellsData =
        this.repor.convertDataToArray(explorationWellsFilt);
      autoTable(PDF, {
        head: [explorationWellsFiltHeader],
        body: compressedexplorationWellsData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(explorationWellsData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(explorationWellsData, 'geo_Quantum_of_Data')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.explorationWellsIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.explorationWellsSelectedColumns[1].header +
        ' BY ' +
        this.repor.explorationWellsSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.explorationWellsChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `EXPLORATION WELLS ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// APPRAISAL WELLS
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `3.0 APPRAISAL WELLS ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.appraisalWellsTable.data.length > 0) {
      let appraisalWellsFilt = appraisalWellsData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          terrain: obj.terrain,
          contract_Type: obj.contract_Type,
          category: obj.category,
          spud_date: obj.spud_date,
          number_of_Days_to_Total_Depth: obj.number_of_Days_to_Total_Depth,
          well_cost: obj.well_cost,
        };
      });

      let appraisalWellsFiltHeader = [
        'COMPANY NAME',
        'BLOCK',
        'TERRAIN',
        'CONTRACT TYPE',
        'WELL CLASSIFICATION',
        'SPUD DATE',
        'NO. OF DAYS TO TD',
        'WELL COST (USD)',
      ];

      let compressedAppraisalWellsData =
        this.repor.convertDataToArray(appraisalWellsFilt);
      autoTable(PDF, {
        head: [appraisalWellsFiltHeader],
        body: compressedAppraisalWellsData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(appraisalWellsData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(appraisalWellsData, 'geo_Quantum_of_Data')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.appraisalWellsIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.appraisalWellsSelectedColumns[1].header +
        ' BY ' +
        this.repor.appraisalWellsSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.appraisalWellsChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `APPRAISAL WELLS ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// DEVELOPMENT WELLS
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `4.0 DEVELOPMENT WELLS ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.developmentWellsTable.data.length > 0) {
      let developmentWellsFilt = developmentWellsData.map(function (obj) {
        return {
          companyName: obj.companyName,
          omL_Name: obj.omL_Name,
          terrain: obj.terrain,
          contract_Type: obj.contract_Type,
          category: obj.category,
          spud_date: obj.spud_date,
          number_of_Days_to_Total_Depth: obj.number_of_Days_to_Total_Depth,
          well_cost: obj.well_cost,
        };
      });

      let developmentWellsFiltHeader = [
        'COMPANY NAME',
        'BLOCK',
        'TERRAIN',
        'CONTRACT TYPE',
        'WELL CLASSIFICATION',
        'SPUD DATE',
        'NO. OF DAYS TO TD',
        'WELL COST (USD)',
      ];

      let compressedDevelopmentWellsData =
        this.repor.convertDataToArray(developmentWellsFilt);
      autoTable(PDF, {
        head: [developmentWellsFiltHeader],
        body: compressedDevelopmentWellsData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `TOTAL QUANTUM APPROVED (SQ.KM) = ${this.repor
        .totalFromArray(developmentWellsData, 'quantum_Approved')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `TOTAL QUANTUM ACQUIRED (SQ.KM) = ${this.repor
        .totalFromArray(developmentWellsData, 'geo_Quantum_of_Data')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.developmentWellsIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.developmentWellsSelectedColumns[1].header +
        ' BY ' +
        this.repor.developmentWellsSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.developmentWellsChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `EXPLORATION WELLS ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// RESERVE UPDATE
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `5.0 RESERVES UPDATE ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.reservesUpdateTable.data.length > 0) {
      let reservesUpdateFiltHeader = [
        'YEAR',
        'OIL (BBLLS)',
        'CONDENSATE (BBLLS)',
        'OIL + CONDENSATE (TOTAL) (BBLLS',
        'ASSOCIATED GAS (AG) (TCF)',
        'NON-ASSOCIATED GAS (NAG) (TCF)',
        'AG + NAG (TCF)',
      ];

      let compressedReservesUpdateData =
        this.repor.convertDataToArray(reservesUpdateData);
      autoTable(PDF, {
        head: [reservesUpdateFiltHeader],
        body: compressedReservesUpdateData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    /////// OIL PRODUCTION
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `6.0 OIL PRODUCTION ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );
    //PDF.text(`1.1 Seismic Data Acquisition Activities for ${this.genk.reportYear}`, 5, 5);
    PDF.setFontSize(12);
    PDF.setFont('helvetica', '500');

    if (this.repor.oilProductionText) {
      PDF.text(this.repor.oilProductionText, 5, 20, { maxWidth: 190 });
    }

    if (this.repor.oilProductionTable.data.length > 0) {
      // let oilProductionFilt = oilProductionData.map(function(obj) {
      //   return {
      //     companyName: obj.companyName,
      //     omL_Name: obj.omL_Name,
      //     terrain: obj.terrain,
      //     contract_Type: obj.contract_Type,
      //     category: obj.category,
      //     spud_date: obj.spud_date,
      //     number_of_Days_to_Total_Depth: obj.number_of_Days_to_Total_Depth,
      //     well_cost: obj.well_cost
      //   }
      // });

      //let oilProductionFiltHeader = ["COMPANY NAME", "BLOCK", "TERRAIN", "CONTRACT TYPE", "WELL CLASSIFICATION", "SPUD DATE", "NO. OF DAYS TO TD", "WELL COST (USD)"];

      let compressedOilProductionData =
        this.repor.convertDataToArray(oilProductionData);
      autoTable(PDF, {
        head: [oilProductionHeader],
        body: compressedOilProductionData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `ANNUAL TOTAL PRODUCTION BY COMPANY = ${this.repor
        .totalFromArray(oilProductionData, 'annual_Avg_Daily_Production')
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `ANNUAL TOTAL PRODUCTION BY COMPANY = ${this.repor
        .totalFromArray(oilProductionData, 'annual_Total_Production_by_company')
        .toFixed(2)}`,
      100,
      290
    );
    //PDF.table(5, 5, seismicTable, seismicHeader, { autoSize: false, });

    if (this.repor.oilProductionIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.oilProductionSelectedColumns[1].header +
        ' BY ' +
        this.repor.oilProductionSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.oilProductionChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `OIL PRODUCTION ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// OIL PRODUCTION CONTRACT
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `6.0 OIL PRODUCTION CONTRACT ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.oilProductionContractTable.data.length > 0) {
      let compressedOilProductionContractData = this.repor.convertDataToArray(
        oilProductionContractData
      );
      autoTable(PDF, {
        head: [oilProductionContractHeader],
        body: compressedOilProductionContractData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `Production = ${this.repor
        .totalFromArray(oilProductionContractData, 'productionByYear')
        .toFixed(2)}`,
      100,
      285
    );

    if (this.repor.oilProductionContractIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.oilProductionContractSelectedColumns[1].header +
        ' BY ' +
        this.repor.oilProductionContractSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.oilProductionContractChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `OIL PRODUCTION CONTRACT ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// OIL PRODUCTION MONTHLY
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `6.0 OIL PRODUCTION MONTHLY ${Number(this.genk.reportYear).toString()}`,
      5,
      5
    );

    if (this.repor.oilProductionMonthlyTable.data.length > 0) {
      let compressedOilProductionMonthlyData = this.repor.convertDataToArray(
        oilProductionMonthlyData
      );
      autoTable(PDF, {
        head: [oilProductionMonthlyHeader],
        body: compressedOilProductionMonthlyData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `ANNUAL PRODUCTION BY COMPANY = ${this.repor
        .totalFromArray(
          oilProductionMonthlyData,
          'annual_Total_Production_by_company'
        )
        .toFixed(2)}`,
      100,
      285
    );
    PDF.text(
      `ANNUAL AVG DAILY PRODUCTION = ${this.repor
        .totalFromArray(oilProductionMonthlyData, 'annual_Avg_Daily_Production')
        .toFixed(2)}`,
      100,
      290
    );

    if (this.repor.oilProductionMonthlyIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.oilProductionMonthlySelectedColumns[1].header +
        ' BY ' +
        this.repor.oilProductionMonthlySelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.oilProductionMonthlyChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `OIL PRODUCTION MONTHLY ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    /////// OIL PRODUCTION MONTHLY TERRAIN
    PDF.addPage('a4', 'p');
    PDF.setFontSize(14);
    PDF.setTextColor('black');
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.text(
      `6.0 OIL PRODUCTION MONTHLY TERRAIN ${Number(
        this.genk.reportYear
      ).toString()}`,
      5,
      5
    );

    if (this.repor.oilProductionTerrainTable.data.length > 0) {
      let compressedOilProductionTerrainData = this.repor.convertDataToArray(
        oilProductionTerrainData
      );
      autoTable(PDF, {
        head: [oilProductionTerrainHeader],
        body: compressedOilProductionTerrainData,
        styles: {
          fillColor: [220, 220, 220],
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        margin: { top: 20, left: 10, right: 10 },
        headStyles: { textColor: [255, 255, 255], fillColor: [0, 128, 128] },
      });
    }

    PDF.setFontSize(12);
    PDF.setFont('Trebuchet MS', 'normal', '900');
    PDF.setTextColor('brown');
    PDF.text(
      `ANNUAL PRODUCTION BY COMPANY = ${this.repor
        .totalFromArray(
          oilProductionTerrainData,
          'annual_Total_Production_by_company'
        )
        .toFixed(2)}`,
      100,
      285
    );
    //PDF.text(`ANNUAL AVG DAILY PRODUCTION = ${this.repor.totalFromArray(oilProductionTerrainData, "annual_Avg_Daily_Production").toFixed(2)}`, 100, 290);

    if (this.repor.oilProductionTerrainIsChart) {
      PDF.addPage('a4', 'p');
      PDF.setFontSize(12);
      PDF.setFont('Trebuchet MS', 'normal', '900');
      PDF.setTextColor('navy');
      let cap =
        this.repor.oilProductionTerrainSelectedColumns[1].header +
        ' BY ' +
        this.repor.oilProductionTerrainSelectedColumns[0].header;
      PDF.text(cap, 8, 10);
      //debugger;
      PDF.addImage(
        this.report.oilProductionTerrainChart,
        'PNG',
        5,
        position,
        200,
        130
      );

      PDF.setFontSize(14);
      PDF.setTextColor('black');
      PDF.text(
        `OIL PRODUCTION TERRAIN ${Number(this.genk.reportYear).toString()}`,
        8,
        160
      );
    }

    PDF.save('angular-demo.pdf');
  }
}
