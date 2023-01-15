import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-concession-situation',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcessionSituationComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;

  data: any[];
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Concessions Situation';
  pagenum = 0;
  selectedPage = 0;
  arrayRows = [];
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
      columnDef: 'concession_held',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'year',
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
      columnDef: 'area',
      header: 'AREA (SQ.KM)',
    },
    {
      columnDef: 'no_of_discovered_field',
      header: 'NO OF DISCOVERED FIELD',
    },
    {
      columnDef: 'no_of_field_producing',
      header: 'NO OF PRODUCING FIELD',
    },
    {
      columnDef: 'equity_distribution',
      header: 'EQUITY DISTRIBUTION',
    },

    {
      columnDef: 'geological_location',
      header: 'GEOLOGICAL LOCATION',
    },
    {
      columnDef: 'has_signature_bonus_been_paid',
      header: 'HAS SIGNATURE BONUS BEEN PAID',
    },
    {
      columnDef: 'if_no_why_sig',
      header: 'IF NO GIVE REASON(SIGNATURE BONUS)',
    },
    {
      columnDef: 'has_the_concession_rentals_been_paid',
      header: 'HAS THE CONCESSION RENTALS BEEN PAID',
    },
    {
      columnDef: 'if_no_why_concession',
      header: 'IF NO GIVE REASON (CONCESSION)',
    },
    {
      columnDef: 'is_there_an_application_for_renewal',
      header: 'IS THERE AN APPLICATION FOR RENEWAL',
    },
    {
      columnDef: 'if_no_why_renewal',
      header: 'IF NO GIVE REASON (RENEWAL)',
    },
    {
      columnDef: 'budget_actual_for_license_or_lease',
      header: 'BUDGET ACTUAL FOR LICENSE OR LEASE',
    },
    {
      columnDef: 'proposed_budget_for_each_license_lease',
      header: 'PROPOSED BUDGET FOR EACH LICENSE LEASE',
    },
    {
      columnDef: 'five_year_proposal',
      header: 'FIVE YEAR PROPOSAL',
    },
    {
      columnDef: 'did_you_meet_the_minimum_work_programme',
      header: 'DID YOU MEET THE MINIMUM WORK PROGRAMME',
    },
    {
      columnDef: 'how_much_signature_bonus_have_been_paid_usd',
      header: 'HOW MUCH SIGNATURE BONUS HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'how_much_concession_rental_have_been_paid_usd',
      header: 'HOW MUCH CONCESSION RENTAL HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'how_much_renewal_bonus_have_been_paid_usd',
      header: 'HOW MUCH RENEWAL BONUS HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'relinquishment_retention',
      header: 'RELINQUISHMENT RETENTION',
    },
    {
      columnDef: 'area_in_square_meter_based_on_company_records',
      header: 'AREA (SQUARE METER)',
    },
    {
      columnDef: 'has_assignment_of_interest_fee_been_paid',
      header: 'HAS ASSIGNMENT OF INTEREST FEE BEEN PAID',
    },
    {
      columnDef: 'comment',
      header: 'COMMENT',
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
      columnDef: 'concession_held',
      header: 'CONCESSION HELD',
    },
    {
      columnDef: 'year',
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
      columnDef: 'area',
      header: 'AREA (SQ.KM)',
    },
    {
      columnDef: 'no_of_discovered_field',
      header: 'NO OF DISCOVERED FIELD',
    },
    {
      columnDef: 'no_of_field_producing',
      header: 'NO OF PRODUCING FIELD',
    },
    {
      columnDef: 'equity_distribution',
      header: 'EQUITY DISTRIBUTION',
    },

    {
      columnDef: 'geological_location',
      header: 'GEOLOGICAL LOCATION',
    },
    {
      columnDef: 'has_signature_bonus_been_paid',
      header: 'HAS SIGNATURE BONUS BEEN PAID',
    },
    {
      columnDef: 'if_no_why_sig',
      header: 'IF NO GIVE REASON(SIGNATURE BONUS)',
    },
    {
      columnDef: 'has_the_concession_rentals_been_paid',
      header: 'HAS THE CONCESSION RENTALS BEEN PAID',
    },
    {
      columnDef: 'if_no_why_concession',
      header: 'IF NO GIVE REASON (CONCESSION)',
    },
    {
      columnDef: 'is_there_an_application_for_renewal',
      header: 'IS THERE AN APPLICATION FOR RENEWAL',
    },
    {
      columnDef: 'if_no_why_renewal',
      header: 'IF NO GIVE REASON (RENEWAL)',
    },
    {
      columnDef: 'budget_actual_for_license_or_lease',
      header: 'BUDGET ACTUAL FOR LICENSE OR LEASE',
    },
    {
      columnDef: 'proposed_budget_for_each_license_lease',
      header: 'PROPOSED BUDGET FOR EACH LICENSE LEASE',
    },
    {
      columnDef: 'five_year_proposal',
      header: 'FIVE YEAR PROPOSAL',
    },
    {
      columnDef: 'did_you_meet_the_minimum_work_programme',
      header: 'DID YOU MEET THE MINIMUM WORK PROGRAMME',
    },
    {
      columnDef: 'how_much_signature_bonus_have_been_paid_usd',
      header: 'HOW MUCH SIGNATURE BONUS HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'how_much_concession_rental_have_been_paid_usd',
      header: 'HOW MUCH CONCESSION RENTAL HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'how_much_renewal_bonus_have_been_paid_usd',
      header: 'HOW MUCH RENEWAL BONUS HAVE BEEN PAID (USD)',
    },
    {
      columnDef: 'relinquishment_retention',
      header: 'RELINQUISHMENT RETENTION',
    },
    {
      columnDef: 'area_in_square_meter_based_on_company_records',
      header: 'AREA (SQUARE METER)',
    },
    {
      columnDef: 'has_assignment_of_interest_fee_been_paid',
      header: 'HAS ASSIGNMENT OF INTEREST FEE BEEN PAID',
    },
    {
      columnDef: 'comment',
      header: 'COMMENT',
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
    //   if(this.data.length>1) this.selectedPage=1;
    this.cd.markForCheck();
  }

  fetchdata(e) {
    let value = e.target.value;
    this.report.fetch('concessionsituation', value).subscribe((res) => {
      this.data = res.data as any[];
      if (this.data.length > 0) this.selectedPage = 1;
      this.assignDataRows();
      this.assignPageNum();
      this.cd.markForCheck();
    });
  }

  yearList() {
    this.report
      .getYearList('concessionsituationyearlist')
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
