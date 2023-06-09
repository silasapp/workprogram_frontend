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
  selector: 'app-oil-and-gas-maintenance-projects',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OilAndGasMaintenanceProjectsComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'OIL AND GAS MAINTENANCE PROJECTS';
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
      columnDef: 'year_of_wp',
      header: 'YEAR',
    },
    {
      columnDef: 'consession_Type',
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'contract_Type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'major_projects',
      header: 'MAJOR PROJECTS',
    },
    {
      columnDef: 'name',
      header: ' NAME',
    },
    {
      columnDef: 'objective_drivers_',
      header: 'OBJECTIVE DRIVERS ',
    },
    {
      columnDef: 'approval_license_permits',
      header: 'APPROVAL LICENSE PERMITS',
    },
    {
      columnDef: 'completion_status',
      header: 'COMPLETION STATUS',
    },
    {
      columnDef: 'conceptual',
      header: 'CONCEPTUAL',
    },
    {
      columnDef: 'feed',
      header: 'FEED',
    },
    {
      columnDef: 'detailed_engineering',
      header: 'DETAILED ENGINEERING',
    },
    {
      columnDef: 'construction_commissioning_',
      header: 'CONSTRUCTION COMMISSIONING ',
    },
    {
      columnDef: 'production_product_offtakers',
      header: 'PRODUCTION PRODUCT OFFTAKERS',
    },
    {
      columnDef: 'challenges',
      header: 'CHALLENGES',
    },
    {
      columnDef: 'project_timeline',
      header: 'PROJECT TIMELINE',
    },
    {
      columnDef: 'new_technology_',
      header: 'NEW TECHNOLOGY ',
    },
    {
      columnDef: 'has_it_been_adopted_by_dpr_',
      header: 'HAS IT BEEN ADOPTED BY DPR ',
    },

    {
      columnDef: 'planned_ongoing_and_routine_maintenance',
      header: 'PLANNED ONGOING AND ROUTINE MAINTENANCE',
    },
    {
      columnDef: 'actual_year',
      header: 'ACTUAL YEAR',
    },
    {
      columnDef: 'proposed_year',
      header: 'PROPOSED YEAR',
    },

    {
      columnDef: 'actual_capital_expenditure_current_year_ngn',
      header: 'ACTUAL CAPITAL EXPENDITURE CURRENT YEAR NGN',
    },
    {
      columnDef: 'actual_capital_expenditure_current_year_usd',
      header: 'ACTUAL CAPITAL EXPENDITURE CURRENT YEAR USD',
    },
    {
      columnDef: 'proposed_capital_expenditure_ngn',
      header: 'PROPOSED CAPITAL EXPENDITURE NGN',
    },
    {
      columnDef: 'proposed_capital_expenditure_usd',
      header: 'PROPOSED CAPITAL EXPENDITURE USD',
    },
    {
      columnDef: 'project_stage',
      header: 'PROJECT STAGE',
    },
    {
      columnDef: 'nigerian_content_value',
      header: 'NIGERIAN CONTENT VALUE',
    },

    {
      columnDef: 'actual_proposed',
      header: 'ACTUAL PROPOSED',
    },
    {
      columnDef: 'comment_',
      header: 'COMMENT ',
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
      columnDef: 'year_of_wp',
      header: 'YEAR',
    },
    {
      columnDef: 'consession_Type',
      header: 'CONSESSION TYPE',
    },
    {
      columnDef: 'terrain',
      header: 'TERRAIN',
    },
    {
      columnDef: 'contract_Type',
      header: 'CONTRACT TYPE',
    },
    {
      columnDef: 'major_projects',
      header: 'MAJOR PROJECTS',
    },
    {
      columnDef: 'name',
      header: ' NAME',
    },
    {
      columnDef: 'objective_drivers_',
      header: 'OBJECTIVE DRIVERS ',
    },
    {
      columnDef: 'approval_license_permits',
      header: 'APPROVAL LICENSE PERMITS',
    },
    {
      columnDef: 'completion_status',
      header: 'COMPLETION STATUS',
    },
    {
      columnDef: 'conceptual',
      header: 'CONCEPTUAL',
    },
    {
      columnDef: 'feed',
      header: 'FEED',
    },
    {
      columnDef: 'detailed_engineering',
      header: 'DETAILED ENGINEERING',
    },
    {
      columnDef: 'construction_commissioning_',
      header: 'CONSTRUCTION COMMISSIONING ',
    },
    {
      columnDef: 'production_product_offtakers',
      header: 'PRODUCTION PRODUCT OFFTAKERS',
    },
    {
      columnDef: 'challenges',
      header: 'CHALLENGES',
    },
    {
      columnDef: 'project_timeline',
      header: 'PROJECT TIMELINE',
    },
    {
      columnDef: 'new_technology_',
      header: 'NEW TECHNOLOGY ',
    },
    {
      columnDef: 'has_it_been_adopted_by_dpr_',
      header: 'HAS IT BEEN ADOPTED BY DPR ',
    },

    {
      columnDef: 'planned_ongoing_and_routine_maintenance',
      header: 'PLANNED ONGOING AND ROUTINE MAINTENANCE',
    },
    {
      columnDef: 'actual_year',
      header: 'ACTUAL YEAR',
    },
    {
      columnDef: 'proposed_year',
      header: 'PROPOSED YEAR',
    },

    {
      columnDef: 'actual_capital_expenditure_Current_year_NGN',
      header: 'ACTUAL CAPITAL EXPENDITURE CURRENT YEAR NGN',
    },
    {
      columnDef: 'actual_capital_expenditure_current_year_usd',
      header: 'ACTUAL CAPITAL EXPENDITURE CURRENT YEAR USD',
    },
    {
      columnDef: 'proposed_capital_expenditure_ngn',
      header: 'PROPOSED CAPITAL EXPENDITURE NGN',
    },
    {
      columnDef: 'proposed_capital_expenditure_usd',
      header: 'PROPOSED CAPITAL EXPENDITURE USD',
    },
    {
      columnDef: 'project_stage',
      header: 'PROJECT STAGE',
    },
    {
      columnDef: 'nigerian_content_value',
      header: 'NIGERIAN CONTENT VALUE',
    },

    {
      columnDef: 'actual_proposed',
      header: 'ACTUAL PROPOSED',
    },
    {
      columnDef: 'comment_',
      header: 'COMMENT ',
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
      .fetch('oil_and_gas__maintenance_projects', value)
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
      .getYearList('oil_and_gas__maintenance_projects_yearlist')
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
