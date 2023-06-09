import { DatePipe } from '@angular/common';
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

@Component({
  selector: 'app-seismic-processing',
  templateUrl: './seismic-activities.component.html',
  styleUrls: [
    '../reports/ndr-report.component.scss',
    './general-report.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeismicProcessingCurrentComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  data: any[];

  selectedColumns: any[] = [];
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = '1.2 Seismic Data Processing and Reprocessing Activities';
  pagenum = 1;
  selectedPage = 1;
  arrayRows = [];
  listyear = [];
  isTableOpt = false;
  isSpecifyColumns = false;
  reporttext: string;
  isChart = false;
  totalone = 0;
  totaltwo = 0;
  barone = 'Total Quantum Approved';
  bartwo = 'Total Quantum Processed';
  isData = true;

  columns = [
    {
      columnDef: 'companyName',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'omL_Name',
      header: 'BLOCK',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'name_of_Contractor',
      header: 'NAME_OF_CONTRACTOR',
    },
    {
      columnDef: 'quantum_Approved',
      header: 'QUANTUM APPROVED (SQ.KM)',
    },
    {
      columnDef: 'geo_Quantum_of_Data',
      header: 'QUANTUM PROCESSED (SQ.KM)',
    },
  ];

  repcolumns = [
    {
      columnDef: 'companyName',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'omL_Name',
      header: 'BLOCK',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'name_of_Contractor',
      header: 'NAME_OF_CONTRACTOR',
    },
    {
      columnDef: 'quantum_Approved',
      header: 'QUANTUM APPROVED (SQ.KM)',
    },
    {
      columnDef: 'geo_Quantum_of_Data',
      header: 'QUANTUM PROCESSED (SQ.KM)',
    },
  ];

  constructor(
    private report: ReportService,
    private workprogram: WorkProgramService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    private modalService: ModalService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
    this.modalService.reportDownload.subscribe((res) => {
      this.transferData();
    });
    this.modalService.generalReport.subscribe((res) => {
      this.getSeismic();
    });
  }

  ngOnInit() {
    this.data = [];
    this.genk.sizePerPage = this.genk.sizeten;
    this.getSeismic();
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
  }

  public get tableTitle(): string {
    return `Table 5 Showing ${Number(
      this.genk.reportYear
    )} Processing and Reprocessing Activities by Companies.`;
  }

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    //if(this.arrayRows.length>1) this.selectedPage=1;
    this.cd.markForCheck();
  }

  goNext() {
    this.selectedPage++;
    this.assignDataRows();
  }

  goPrev() {
    this.selectedPage--;
    this.assignDataRows();
  }

  firstPage() {
    this.selectedPage = 1;
    this.assignDataRows();
  }

  lastPage() {
    this.selectedPage = this.pagenum;
    this.assignDataRows();
  }

  changePage(value: string) {
    this.selectedPage = Number(value);
    this.assignDataRows();
  }

  resize(e) {
    let value = e.target.value;
    if (value === 'all') {
      value = this.pagenum * this.genk.sizePerPage;
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  getSeismic() {
    this.workprogram
      .getSeismicActivities(this.genk.reportYear)
      .subscribe((res) => {
        this.data =
          res.seismic_Data_Processing_and_Reprocessing_Activities_CURRENT as any[];
        if (this.data.length > 1) this.selectedPage = 1;
        this.isData = this.data.length > 0;
        this.reporttext = res.geophysicaL_ACTIVITIES_PROCESSING_DESCRIPTION;
        this.totalone = Math.round(
          this.report.sumColumn(this.data, 'quantum_Approved')
        );
        this.totaltwo = Math.round(
          this.report.sumColumn(this.data, 'geo_Quantum_of_Data')
        );
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
      });
  }

  togOptions() {
    if (!this.isTableOpt) {
      this.isTableOpt = true;
    } else {
      this.isTableOpt = false;
    }
    this.cd.markForCheck();
  }

  togSpecifyColumns() {
    if (!this.isSpecifyColumns) {
      this.isSpecifyColumns = true;
      this.columns = this.repcolumns;
      this.selectedColumns = [];
    } else {
      this.isSpecifyColumns = false;
    }
    this.cd.markForCheck();
  }

  pickColumn(value: string, checked: boolean) {
    if (checked) {
      let val = this.repcolumns.filter((x) => x.columnDef == value)[0];
      this.selectedColumns.push(val);
    } else {
      let remainingArr = this.selectedColumns.filter(
        (x) => x.columnDef != value
      );
      this.selectedColumns = remainingArr;
    }
    this.cd.markForCheck();
  }

  selectColumns() {
    this.columns = this.selectedColumns;
    this.isSpecifyColumns = false;
    this.cd.markForCheck();
  }

  async plotDoublePieChart() {
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    } else {
      debugger;
      this.myChartBox.nativeElement.removeChild(
        this.myChartBox.nativeElement.firstChild
      );
      const node = document.createElement('div');
      node.style.width = '70%';
      node.style.height = '500px';
      this.myChartBox.nativeElement.appendChild(node);
      let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
      let sele1 = this.selectedColumns[0].columnDef;
      let sele2 = this.selectedColumns[1].columnDef;

      this.myChartBox.nativeElement.style.display = 'block';
      if (this.selectedColumns.length === 2) {
        let reportdata = this.data;
        let chartdata = this.report.formatChartData(reportdata, sele1, sele2);
        this.report.seismicProcessingChart =
          await this.report.plotDoublePieChart(
            bechart,
            sele1,
            sele2,
            chartdata
          );
      }
      this.isChart = true;
    }
  }

  async plotDoubleBarChart() {
    let totalString = '';
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    } else {
      this.myChartBox.nativeElement.removeChild(
        this.myChartBox.nativeElement.firstChild
      );
      const node = document.createElement('div');
      node.style.width = '100%';
      node.style.height = '500px';
      this.myChartBox.nativeElement.appendChild(node);
      let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
      let sele1 = this.selectedColumns[0].columnDef;
      let sele2 = this.selectedColumns[1].columnDef;

      this.myChartBox.nativeElement.style.display = 'block';
      if (this.selectedColumns.length === 2) {
        let chartdata = this.report.formatChartData(
          this.data,
          this.selectedColumns[0].columnDef,
          this.selectedColumns[1].columnDef
        );
        for (var i = 0; i < chartdata.length; i++) {
          totalString += chartdata[i].base;
        }
        if (totalString.length > 70) {
          this.report.seismicProcessingChart =
            await this.report.plotDoubleBarChartHorizontal(
              bechart,
              this.selectedColumns[0].columnDef,
              this.selectedColumns[1].columnDef,
              chartdata
            );
        } else {
          this.report.seismicProcessingChart =
            await this.report.plotDoubleBarChart(
              bechart,
              this.selectedColumns[0].columnDef,
              this.selectedColumns[1].columnDef,
              chartdata
            );
        }
      }
      this.isChart = true;
    }
  }

  transferData() {
    this.report.seismicProcessingTable = {
      data: this.data,
      header: this.columns,
    };
    this.report.seismicProcessingIsChart = this.isChart;
    this.report.seismicProcessingSelectedColumns = this.selectedColumns;
  }
}
