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
  selector: 'app-gas-production-activities',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GasProductionActivitiesComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'GAS PRODUCTION ACTIVITIES';
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
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'current_actual_year',
      header: 'CURRENT ACTUAL YEAR',
    },
    {
      columnDef: 'utilized',
      header: 'UTILIZED',
    },
    {
      columnDef: 'flared',
      header: 'FLARED',
    },
    {
      columnDef: 'forecast_',
      header: 'REMARKS ',
    },
    {
      columnDef: 'remarks_',
      header: 'REMARKS ',
    },
    {
      columnDef: 'gas_plant_capacity',
      header: 'GAS PLANT CAPACITY',
    },
    {
      columnDef: 'ongoing_and_planned_gas_plant_projects',
      header: 'ONGOING AND PLANNED GAS PLANT PROJECTS',
    },
    {
      columnDef: 'domestic_gas_obligation',
      header: 'DOMESTIC GAS OBLIGATION',
    },
    {
      columnDef: 'planned_projects_for_domestic_supply',
      header: 'PLANNED PROJECTS FOR DOMESTIC SUPPLY',
    },
    {
      columnDef: 'domestic_gas_supply_dso',
      header: 'DOMESTIC GAS SUPPLY DSO',
    },
    {
      columnDef:
        'projects_planned_for_domestic_supply_gas_to_power_industries_etc',
      header:
        'PROJECTS PLANNED FOR DOMESTIC SUPPLY GAS TO POWER INDUSTRIES ETC',
    },

    {
      columnDef: 'proposed_production',
      header: 'PROPOSED PRODUCTION',
    },
    {
      columnDef: 'proposed_utilization',
      header: 'PROPOSED UTILIZATION',
    },
    {
      columnDef: 'proposed_flaring',
      header: 'PROPOSED FLARING',
    },
    {
      columnDef: 'gas_flare_Royalty_payment',
      header: 'GAS FLARE ROYALTY PAYMENT',
    },
    {
      columnDef: 'gas_Sales_Royalty_Payment',
      header: 'GAS SALES ROYALTY PAYMENT',
    },
    {
      columnDef: 'no_of_gas_well_planned',
      header: 'NO OF GAS WELL PLANNED',
    },
    {
      columnDef: 'no_of_gas_well_drilled',
      header: 'NO OF GAS WELL DRILLED',
    },
    {
      columnDef: 'is_there_a_gas_plant',
      header: 'IS THERE A GAS PLANT',
    },
    {
      columnDef: 'no_of_ongoing_projects',
      header: 'NO OF ONGOING PROJECTS',
    },
    {
      columnDef: 'no_of_plannned_projects',
      header: 'NO OF PLANNNED PROJECTS',
    },
    {
      columnDef: 'is_there_a_license_to_operate_a_gas_plant',
      header: 'IS THERE A LICENSE TO OPERATE A GAS PLANT',
    },
    {
      columnDef: 'domestic_gas_obligation_met',
      header: 'DOMESTIC GAS OBLIGATION MET',
    },
    {
      columnDef: 'number_of_gas_wells_tested',
      header: 'NO. OF GAS WELL TESTED',
    },
    {
      columnDef: 'number_of_gas_wells_completed',
      header: 'NO. OF GAS WELL COMPLETED',
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
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'current_actual_year',
      header: 'CURRENT ACTUAL YEAR',
    },
    {
      columnDef: 'utilized',
      header: 'UTILIZED',
    },
    {
      columnDef: 'flared',
      header: 'FLARED',
    },
    {
      columnDef: 'forecast_',
      header: 'REMARKS ',
    },
    {
      columnDef: 'remarks_',
      header: 'REMARKS ',
    },
    {
      columnDef: 'gas_plant_capacity',
      header: 'GAS PLANT CAPACITY',
    },
    {
      columnDef: 'ongoing_and_planned_gas_plant_projects',
      header: 'ONGOING AND PLANNED GAS PLANT PROJECTS',
    },
    {
      columnDef: 'domestic_gas_obligation',
      header: 'DOMESTIC GAS OBLIGATION',
    },
    {
      columnDef: 'planned_projects_for_domestic_supply',
      header: 'PLANNED PROJECTS FOR DOMESTIC SUPPLY',
    },
    {
      columnDef: 'domestic_gas_supply_dso',
      header: 'DOMESTIC GAS SUPPLY DSO',
    },
    {
      columnDef:
        'projects_planned_for_domestic_supply_gas_to_power_industries_etc',
      header:
        'PROJECTS PLANNED FOR DOMESTIC SUPPLY GAS TO POWER INDUSTRIES ETC',
    },

    {
      columnDef: 'proposed_production',
      header: 'PROPOSED PRODUCTION',
    },
    {
      columnDef: 'proposed_utilization',
      header: 'PROPOSED UTILIZATION',
    },
    {
      columnDef: 'proposed_flaring',
      header: 'PROPOSED FLARING',
    },
    {
      columnDef: 'gas_flare_Royalty_payment',
      header: 'GAS FLARE ROYALTY PAYMENT',
    },
    {
      columnDef: 'gas_Sales_Royalty_Payment',
      header: 'GAS SALES ROYALTY PAYMENT',
    },
    {
      columnDef: 'no_of_gas_well_planned',
      header: 'NO OF GAS WELL PLANNED',
    },
    {
      columnDef: 'no_of_gas_well_drilled',
      header: 'NO OF GAS WELL DRILLED',
    },
    {
      columnDef: 'is_there_a_gas_plant',
      header: 'IS THERE A GAS PLANT',
    },
    {
      columnDef: 'no_of_ongoing_projects',
      header: 'NO OF ONGOING PROJECTS',
    },
    {
      columnDef: 'no_of_plannned_projects',
      header: 'NO OF PLANNNED PROJECTS',
    },
    {
      columnDef: 'is_there_a_license_to_operate_a_gas_plant',
      header: 'IS THERE A LICENSE TO OPERATE A GAS PLANT',
    },
    {
      columnDef: 'domestic_gas_obligation_met',
      header: 'DOMESTIC GAS OBLIGATION MET',
    },
    {
      columnDef: 'number_of_gas_wells_tested',
      header: 'NO. OF GAS WELL TESTED',
    },
    {
      columnDef: 'number_of_gas_wells_completed',
      header: 'NO. OF GAS WELL COMPLETED',
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
    this.report.fetch('gas_production_activities', value).subscribe((res) => {
      this.data = res.data as any[];
      if (this.data.length > 0) this.selectedPage = 1;
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
  }

  yearList() {
    this.report
      .getYearList('gas_production_activities_yearlist')
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
