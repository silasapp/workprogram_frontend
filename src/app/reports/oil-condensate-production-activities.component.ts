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
  selector: 'app-oil-condensate-production-activities',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OilCondensateProductionActivitiesComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'OIL CONDENSATE PRODUCTION ACTIVITIES';
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
      columnDef: 'consession_type',
      header: 'CONCESSION TYPE',
    },
    {
      columnDef: 'current_year_actual',
      header: 'ACTUAL',
    },
    {
      columnDef: 'deferment',
      header: 'DEFERMENT',
    },
    {
      columnDef: 'forecast',
      header: 'FORECAST',
    },
    {
      columnDef: 'remarks',
      header: 'REMARKS',
    },
    {
      columnDef: 'cost_barrel',
      header: 'COST BARREL',
    },
    {
      columnDef: 'is_any_of_your_field_straddling',
      header: 'IS ANY OF YOUR FIELDS STRADDLING',
    },
    {
      columnDef: 'how_many_fields_straddle',
      header: 'HOW MANY FIELDS STRADDLE',
    },
    {
      columnDef: 'straddling_fields_oc',
      header: 'STRADDLING FIELDS (OPERATING COY)',
    },
    {
      columnDef: 'prod_status_oc',
      header: 'PROD STATUS (OPERATING COY)',
    },
    {
      columnDef: 'straddling_field_op',
      header: 'STRADDLING FIELD (OTHER PARTY)',
    },
    {
      columnDef: 'company_name_op',
      header: 'COMPANY NAME (OTHER PARTY)',
    },
    {
      columnDef: 'has_dpr_been_notified',
      header: 'Has DPR been notified?',
    },
    {
      columnDef: 'has_the_other_party_been_notified',
      header: 'HAS THE OTHER PARTY BEEN NOTIFIED?',
    },
    {
      columnDef: 'has_the_CA_been_signed',
      header: 'HAS THE CONFIDENTIALITY AGREEMENT BEEN SIGNED',
    },
    {
      columnDef: 'committees_been_inaugurated',
      header:
        'HAS TECHNICAL , FINANCE, UNITIZATION AND STEERING COMMITTEES BEEN INAUGURATED',
    },
    {
      columnDef: 'participation_been_determined',
      header: 'HAS THE TRACT PARTICIPATION BEEN DETERMINED',
    },
    {
      columnDef: 'has_the_pua_been_signed',
      header: 'HAS THE PUA BEEN SIGNED',
    },
    {
      columnDef: 'is_there_a_joint_development',
      header: 'IS THERE A JOINT DEVELOPMENT',
    },
    {
      columnDef: 'has_the_uuoa_been_signed',
      header: 'HAS THE UUOA BEEN SIGNED',
    },
    {
      columnDef: 'total_reconciled_national_crude_oil_production',
      header: 'Total Reconciled Crude Oil Production',
    },
    {
      columnDef: 'oil_royalty_payment',
      header: 'Oil Royalty Payment',
    },
    {
      columnDef: 'straddle_field_producing',
      header: 'STRADDLE FIELD PRODUCING',
    },
    {
      columnDef: 'what_concession_field_straddling',
      header: 'WHAT CONCESSION IS THE FIELD STARDDLING',
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
      columnDef: 'consession_type',
      header: 'CONCESSION TYPE',
    },
    {
      columnDef: 'current_year_actual',
      header: 'ACTUAL',
    },
    {
      columnDef: 'deferment',
      header: 'DEFERMENT',
    },
    {
      columnDef: 'forecast',
      header: 'FORECAST',
    },
    {
      columnDef: 'remarks',
      header: 'REMARKS',
    },
    {
      columnDef: 'cost_barrel',
      header: 'COST BARREL',
    },
    {
      columnDef: 'is_any_of_your_field_straddling',
      header: 'IS ANY OF YOUR FIELDS STRADDLING',
    },
    {
      columnDef: 'how_many_fields_straddle',
      header: 'HOW MANY FIELDS STRADDLE',
    },
    {
      columnDef: 'straddling_fields_oc',
      header: 'STRADDLING FIELDS (OPERATING COY)',
    },
    {
      columnDef: 'prod_status_oc',
      header: 'PROD STATUS (OPERATING COY)',
    },
    {
      columnDef: 'straddling_field_op',
      header: 'STRADDLING FIELD (OTHER PARTY)',
    },
    {
      columnDef: 'company_name_op',
      header: 'COMPANY NAME (OTHER PARTY)',
    },
    {
      columnDef: 'has_dpr_been_notified',
      header: 'Has DPR been notified?',
    },
    {
      columnDef: 'has_the_other_party_been_notified',
      header: 'HAS THE OTHER PARTY BEEN NOTIFIED?',
    },
    {
      columnDef: 'has_the_CA_been_signed',
      header: 'HAS THE CONFIDENTIALITY AGREEMENT BEEN SIGNED',
    },
    {
      columnDef: 'committees_been_inaugurated',
      header:
        'HAS TECHNICAL , FINANCE, UNITIZATION AND STEERING COMMITTEES BEEN INAUGURATED',
    },
    {
      columnDef: 'participation_been_determined',
      header: 'HAS THE TRACT PARTICIPATION BEEN DETERMINED',
    },
    {
      columnDef: 'has_the_pua_been_signed',
      header: 'HAS THE PUA BEEN SIGNED',
    },
    {
      columnDef: 'is_there_a_joint_development',
      header: 'IS THERE A JOINT DEVELOPMENT',
    },
    {
      columnDef: 'has_the_uuoa_been_signed',
      header: 'HAS THE UUOA BEEN SIGNED',
    },
    {
      columnDef: 'total_reconciled_national_crude_oil_production',
      header: 'Total Reconciled Crude Oil Production',
    },
    {
      columnDef: 'oil_royalty_payment',
      header: 'Oil Royalty Payment',
    },
    {
      columnDef: 'straddle_field_producing',
      header: 'STRADDLE FIELD PRODUCING',
    },
    {
      columnDef: 'what_concession_field_straddling',
      header: 'WHAT CONCESSION IS THE FIELD STARDDLING',
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
    this.report
      .fetch('oil_condensate_production_activities', value)
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
      .getYearList('oil_condensate_production_activities_yearlist')
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
