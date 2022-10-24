import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-strategic-plans-on-company-basis',
  templateUrl: 'ndr-report.component.html',
   styleUrls: ['./ndr-report.component.scss', '../general-report/general-report.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategicPlansOnCompanyBasisComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>; 
      @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>; 
      genk: GenericService;    cdr: ChangeDetectorRef;
    title = 'STRATEGIC PLANS ON COMPANY BASIS';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    data: any[];
    year = [];
    selectedColumns: any[] = [];
    isTableOpt = false;
    isSpecifyColumns = false;
  
      columns = [
      {
          "columnDef":  "companyName",
          "header": "COMPANY NAME"
      },
      {
          "columnDef": "companyemail",
          "header": "COMPANY EMAIL"
      },
      {
          "columnDef": "year_of_WP",
          "header": "YEAR OF WP"
      },
      {
        "columnDef": "contract_Type",
        "header": "CONTRACT TYPE"
    },
    {
        "columnDef": "terrain",
        "header": "TERRAIN"
    },
    {
        "columnDef": "consession_Type",
        "header": "CONSESSION TYPE"
    },
      {
          "columnDef": "activities",
          "header": "ACTIVITIES"
      },
      {
          "columnDef": "n_1_Q1",
          "header": "N 1 Q1"
      },
      {
          "columnDef": "n_1_Q2",
          "header": "N 1 Q2"
      },
      {
          "columnDef": "n_1_Q3",
          "header": "N 1 Q3"
      },
      {
          "columnDef": "n_1_Q4",
          "header": "N 1 Q4"
      },
      {
          "columnDef": "n_2_Q1",
          "header": "N 2 Q1"
      },
      {
          "columnDef": "n_2_Q2",
          "header": "N 2 Q2"
      },
      {
          "columnDef": "n_2_Q3",
          "header": "N 2 Q3"
      },
      {
          "columnDef": "n_2_Q4",
          "header": "N 2 Q4"
      },
      {
          "columnDef": "n_3_Q1",
          "header": "N 3 Q1"
      },
      {
          "columnDef": "n_3_Q2",
          "header": "N 3 Q2"
      },
      {
          "columnDef": "n_3_Q3",
          "header": "N 3 Q3"
      },
      {
          "columnDef": "n_3_Q4",
          "header": "N 3 Q4"
      },
      {
          "columnDef": "n_4_Q1",
          "header": "N 4 Q1"
      },
      {
          "columnDef": "n_4_Q2",
          "header": "N 4 Q2"
      },
      {
          "columnDef": "n_4_Q3",
          "header": "N 4 Q3"
      },
      {
          "columnDef": "n_4_Q4",
          "header": "N 4 Q4"
      },
      {
          "columnDef": "n_5_Q1",
          "header": "N 5 Q1"
      },
      {
          "columnDef": "n_5_Q2",
          "header": "N 5 Q2"
      },
      {
          "columnDef": "n_5_Q3",
          "header": "N 5 Q3"
      },
      {
          "columnDef": "n_5_Q4",
          "header": "N 5 Q4"
      }];

      repcolumns = [
        {
            "columnDef":  "companyName",
            "header": "COMPANY NAME"
        },
        {
            "columnDef": "companyemail",
            "header": "COMPANY EMAIL"
        },
        {
            "columnDef": "year_of_WP",
            "header": "YEAR OF WP"
        },
        {
          "columnDef": "contract_Type",
          "header": "CONTRACT TYPE"
      },
      {
          "columnDef": "terrain",
          "header": "TERRAIN"
      },
      {
          "columnDef": "consession_Type",
          "header": "CONSESSION TYPE"
      },
        {
            "columnDef": "activities",
            "header": "ACTIVITIES"
        },
        {
            "columnDef": "n_1_Q1",
            "header": "N 1 Q1"
        },
        {
            "columnDef": "n_1_Q2",
            "header": "N 1 Q2"
        },
        {
            "columnDef": "n_1_Q3",
            "header": "N 1 Q3"
        },
        {
            "columnDef": "n_1_Q4",
            "header": "N 1 Q4"
        },
        {
            "columnDef": "n_2_Q1",
            "header": "N 2 Q1"
        },
        {
            "columnDef": "n_2_Q2",
            "header": "N 2 Q2"
        },
        {
            "columnDef": "n_2_Q3",
            "header": "N 2 Q3"
        },
        {
            "columnDef": "n_2_Q4",
            "header": "N 2 Q4"
        },
        {
            "columnDef": "n_3_Q1",
            "header": "N 3 Q1"
        },
        {
            "columnDef": "n_3_Q2",
            "header": "N 3 Q2"
        },
        {
            "columnDef": "n_3_Q3",
            "header": "N 3 Q3"
        },
        {
            "columnDef": "n_3_Q4",
            "header": "N 3 Q4"
        },
        {
            "columnDef": "n_4_Q1",
            "header": "N 4 Q1"
        },
        {
            "columnDef": "n_4_Q2",
            "header": "N 4 Q2"
        },
        {
            "columnDef": "n_4_Q3",
            "header": "N 4 Q3"
        },
        {
            "columnDef": "n_4_Q4",
            "header": "N 4 Q4"
        },
        {
            "columnDef": "n_5_Q1",
            "header": "N 5 Q1"
        },
        {
            "columnDef": "n_5_Q2",
            "header": "N 5 Q2"
        },
        {
            "columnDef": "n_5_Q3",
            "header": "N 5 Q3"
        },
        {
            "columnDef": "n_5_Q4",
            "header": "N 5 Q4"
        }];

      constructor(private report: ReportService,
        private cd: ChangeDetectorRef,
        private gen: GenericService) {
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
        this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
        this.cd.markForCheck();
    }
  
    fetchdata(e){
      let value = e.target.value;
     let result =  this.report.fetch("strategic_plans_on_company_basis", value).subscribe(
        (res) => {
            this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
        }
      )
    }

    yearList() {
        this.report.getYearList("strategic_plans_on_company_basis_yearlist")
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
          value = this.pagenum * this.genk.sizePerPage
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
      let val = this.repcolumns.filter(x => x.columnDef == value)[0];
      this.selectedColumns.push(val);
    }
    else {
      let remainingArr = this.selectedColumns.filter(x => x.columnDef != value);
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
    debugger;
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    }
    else {
      debugger;
      this.myChartBox.nativeElement.removeChild(this.myChartBox.nativeElement.firstChild);
      const node = document.createElement("div");
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
        this.report.plotDoublePieChart(bechart, sele1, sele2, chartdata)
      }
    }
  }

  plotDoubleBarChart() {
    debugger;
    let totalString = "";
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    }
    else {

      this.myChartBox.nativeElement.removeChild(this.myChartBox.nativeElement.firstChild);
      const node = document.createElement("div");
      node.style.width = '100%';
      node.style.height = '500px';
      this.myChartBox.nativeElement.appendChild(node);
      let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
      let sele1 = this.selectedColumns[0].columnDef;
      let sele2 = this.selectedColumns[1].columnDef;

      this.myChartBox.nativeElement.style.display = 'block';
      if (this.selectedColumns.length === 2) {
        let chartdata = this.report.formatChartData(this.data, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef);
        for (var i = 0; i < chartdata.length; i++) {
          totalString += chartdata[i].base;
        }
        if (totalString.length > 70) {
          this.report.plotDoubleBarChartHorizontal(bechart, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef, chartdata);
        }
        else {
          this.report.plotDoubleBarChart(bechart, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef, chartdata);
        }
      }
    }
  }


  
}
