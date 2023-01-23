import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-oil-spill-reporting',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OilSpillReportingComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'OIL SPILL REPORTING';
  pagenum = 0;
  selectedPage = 0;
  arrayRows = [];
  data: any[];
  year = [];
  selectedColumns: any[] = [];
  isTableOpt = false;
  isSpecifyColumns = false;

  columns = [
    {
      columnDef: 'companyname',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'companyemail',
      header: 'COMPANY EMAIL',
    },
    {
      columnDef: 'omL_Name',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'year_of_wp',
      header: 'YEAR',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'consession_Type',
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'contract_Type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'incident_oil_spill_ref_no',
      header: 'INCIDENT OIL SPILL REF NO',
    },
    {
      columnDef: 'facility_equipment',
      header: 'FACILITY EQUIPMENT',
    },
    {
      columnDef: 'location',
      header: 'LOCATION',
    },
    {
      columnDef: 'lga',
      header: 'LGA',
    },
    {
      columnDef: 'state_',
      header: 'STATE ',
    },
    {
      columnDef: 'date_of_spill',
      header: 'DATE OF SPILL',
    },
    {
      columnDef: 'type_of_operation_at_spill_site',
      header: 'TYPE OF OPERATION AT SPILL SITE',
    },
    {
      columnDef: 'cause_of_spill',
      header: 'CAUSE OF SPILL',
    },
    {
      columnDef: 'volume_of_spill_bbls',
      header: 'VOLUME OF SPILL BBLS',
    },
    {
      columnDef: 'volume_recovered_bbls',
      header: 'VOLUME RECOVERED BBLS',
    },
  ];

  repcolumns = [
    {
      columnDef: 'companyname',
      header: 'COMPANY NAME',
    },
    {
      columnDef: 'companyemail',
      header: 'COMPANY EMAIL',
    },
    {
      columnDef: 'oml_name',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'year_of_wp',
      header: 'YEAR',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'consession_Type',
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'contract_Type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'incident_oil_spill_ref_no',
      header: 'INCIDENT OIL SPILL REF NO',
    },
    {
      columnDef: 'facility_equipment',
      header: 'FACILITY EQUIPMENT',
    },
    {
      columnDef: 'location',
      header: 'LOCATION',
    },
    {
      columnDef: 'lga',
      header: 'LGA',
    },
    {
      columnDef: 'state_',
      header: 'STATE ',
    },
    {
      columnDef: 'date_of_spill',
      header: 'DATE OF SPILL',
    },
    {
      columnDef: 'type_of_operation_at_spill_site',
      header: 'TYPE OF OPERATION AT SPILL SITE',
    },
    {
      columnDef: 'cause_of_spill',
      header: 'CAUSE OF SPILL',
    },
    {
      columnDef: 'volume_of_spill_bbls',
      header: 'VOLUME OF SPILL BBLS',
    },
    {
      columnDef: 'volume_recovered_bbls',
      header: 'VOLUME RECOVERED BBLS',
    },
  ];

  constructor(
    private report: ReportService,
    private cd: ChangeDetectorRef,
    private gen: GenericService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }

  ngOnInit() {
    this.data = [];
    this.yearList();
    this.genk.sizePerPage = this.genk.sizeten;
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
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

  fetchdata(e) {
    let value = e.target.value;
    let result = this.report
      .fetch('oil_spill_reporting', value)
      .subscribe((res) => {
        this.data = res.data as any[];
        if (this.data.length > 0) this.selectedPage = 1;
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
      });
  }

  yearList() {
    this.report
      .getYearList('oil_spill_reporting_yearlist')
      .subscribe((res: any[]) => {
        this.year = res;
        this.cd.markForCheck();
      });
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
    this.cd.markForCheck;
  }

  selectColumns() {
    this.columns = this.selectedColumns;
    this.isSpecifyColumns = false;
    this.cd.markForCheck();
  }

  plotDoublePieChart() {
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
        let reportdata = this.data;
        let chartdata = this.report.formatChartData(reportdata, sele1, sele2);
        this.report.plotDoublePieChart(bechart, sele1, sele2, chartdata);
      }
    }
  }

  plotDoubleBarChart() {
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
          this.report.plotDoubleBarChartHorizontal(
            bechart,
            this.selectedColumns[0].columnDef,
            this.selectedColumns[1].columnDef,
            chartdata
          );
        } else {
          this.report.plotDoubleBarChart(
            bechart,
            this.selectedColumns[0].columnDef,
            this.selectedColumns[1].columnDef,
            chartdata
          );
        }
      }
    }
  }
}
