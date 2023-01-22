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
  selector: 'app-geophysical-processing',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeophysicalProcessingComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'GEOPHYSICAL ACTIVITIES (PROCESSING)';
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
      columnDef: 'oml_name',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'year_of_wp',
      header: 'YEAR',
    },
    {
      columnDef: 'contract_type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'quater',
      header: 'QUATER',
    },
    {
      columnDef: 'processed_actual',
      header: 'PROCESSED (ACTUAL)',
    },
    {
      columnDef: 'processed_proposed',
      header: 'PROCESSED (PROPOSED)',
    },

    {
      columnDef: 'reprocessed_actual',
      header: 'REPROCESSED (ACTUAL)',
    },
    {
      columnDef: 'reprocessed_proposed',
      header: 'REPROCESSED (PROPOSED)',
    },

    {
      columnDef: 'interpreted_actual',
      header: 'INTERPRETED (ACTUAL)',
    },
    {
      columnDef: 'interpreted_proposed',
      header: 'INTERPRETED (PROPOSED)',
    },
    {
      columnDef: 'geo_quantum_of_data',
      header: 'QUANTUM PROCESSED (SQ KM)',
    },
    {
      columnDef: 'quantum_approved',
      header: 'QUANTUM APPROVED (SQ KM)',
    },
    {
      columnDef: 'geo_quantum_of_data_carry_over',
      header: 'QUANTUM CARRY FORWARD',
    },
    {
      columnDef: 'geo_any_ongoing_processing_project',
      header: 'ANY ONGOING PROCESSING PROJECT',
    },
    {
      columnDef: 'geo_type_of_data_being_processed',
      header: 'TYPE OF DATA BEING PROCESSED',
    },
    {
      columnDef: 'geo_activity_timeline',
      header: 'TIMELINE',
    },
    {
      columnDef: 'budeget_allocation_ngn',
      header: 'BUDGET ALLOCATION (NGN)',
    },
    {
      columnDef: 'budeget_allocation_usd',
      header: 'BUDGET ALLOCATION (USD)',
    },
    {
      columnDef: 'name_of_contractor',
      header: 'NAME OF CONTRACTOR',
    },
    {
      columnDef: 'remarks',
      header: 'REMARKS',
    },
    {
      columnDef: 'geo_completion_status',
      header: 'COMPLETION STATUS(%)',
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
      columnDef: 'contract_type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'quater',
      header: 'QUATER',
    },
    {
      columnDef: 'processed_actual',
      header: 'PROCESSED (ACTUAL)',
    },
    {
      columnDef: 'processed_proposed',
      header: 'PROCESSED (PROPOSED)',
    },

    {
      columnDef: 'reprocessed_actual',
      header: 'REPROCESSED (ACTUAL)',
    },
    {
      columnDef: 'reprocessed_proposed',
      header: 'REPROCESSED (PROPOSED)',
    },

    {
      columnDef: 'interpreted_actual',
      header: 'INTERPRETED (ACTUAL)',
    },
    {
      columnDef: 'interpreted_proposed',
      header: 'INTERPRETED (PROPOSED)',
    },
    {
      columnDef: 'geo_quantum_of_data',
      header: 'QUANTUM PROCESSED (SQ KM)',
    },
    {
      columnDef: 'quantum_approved',
      header: 'QUANTUM APPROVED (SQ KM)',
    },
    {
      columnDef: 'geo_quantum_of_data_carry_over',
      header: 'QUANTUM CARRY FORWARD',
    },
    {
      columnDef: 'geo_any_ongoing_processing_project',
      header: 'ANY ONGOING PROCESSING PROJECT',
    },
    {
      columnDef: 'geo_type_of_data_being_processed',
      header: 'TYPE OF DATA BEING PROCESSED',
    },
    {
      columnDef: 'geo_activity_timeline',
      header: 'TIMELINE',
    },
    {
      columnDef: 'budeget_allocation_ngn',
      header: 'BUDGET ALLOCATION (NGN)',
    },
    {
      columnDef: 'budeget_allocation_usd',
      header: 'BUDGET ALLOCATION (USD)',
    },
    {
      columnDef: 'name_of_contractor',
      header: 'NAME OF CONTRACTOR',
    },
    {
      columnDef: 'remarks',
      header: 'REMARKS',
    },
    {
      columnDef: 'geo_completion_status',
      header: 'COMPLETION STATUS(%)',
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
    this.cd.markForCheck();
  }

  fetchdata(e) {
    let value = e.target.value;
    this.report.fetch('geophysicalprocessing', value).subscribe((res) => {
      this.data = res.data as any[];
      if (this.data.length > 0) this.selectedPage = 1;
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
  }

  yearList() {
    this.report
      .getYearList('geophysicalprocessingyearlist')
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
