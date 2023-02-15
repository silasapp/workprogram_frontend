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
  selector: 'app-concession-reserves-for-current-year',
  templateUrl: 'ndr-report.component.html',
  styleUrls: [
    './ndr-report.component.scss',
    '../general-report/general-report.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcessionReservesForCurrentYearComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false })
  myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'Concession Reserves for current year(as at 1st January)';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
  selectedColumns: any[] = [];
  years:any[]=[];
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
      columnDef: 'company_reserves_year',
      header: 'PRECEEDING YEAR',
    },
    {
      columnDef: 'company_reserves_oil',
      header: '2P reserves (MMBBL)-OIL',
    },
    {
      columnDef: 'company_reserves_condensate',
      header: '2P reserves (MMBBL)-CONDENSATE',
    },
    {
      columnDef: 'company_reserves_ag',
      header: '2P reserves (BSCF)-AG',
    },
    {
      columnDef: 'company_reserves_nag',
      header: '2P reserves (BSCF)-NAG',
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
      columnDef: 'company_reserves_year',
      header: 'PRECEEDING YEAR',
    },
    {
      columnDef: 'company_reserves_oil',
      header: '2P reserves (MMBBL)-OIL',
    },
    {
      columnDef: 'company_reserves_condensate',
      header: '2P reserves (MMBBL)-CONDENSATE',
    },
    {
      columnDef: 'company_reserves_ag',
      header: '2P reserves (BSCF)-AG',
    },
    {
      columnDef: 'company_reserves_nag',
      header: '2P reserves (BSCF)-NAG',
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
    this.getYears();
    this.cd.markForCheck();
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
    this.report
      .fetch('concession_reserves_for_current_year', value)
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
      .getYearList('concession_reserves_for_1st_january_yearlist')
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




  getYears(){
    debugger;
    this.years=[];
    debugger;
    let current_year = (Number)(new Date().getFullYear);
      let test:number=current_year-5;;
    debugger;
      do{
       let  _test =test.toString();
      this.years.push(_test)
      test+=1;
      }
      while(test<=current_year)
      debugger;
      
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
