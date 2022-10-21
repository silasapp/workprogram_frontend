import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from '../services/report.service';


@Component({
  selector: 'app-ndr-report',
  templateUrl: './ndr-report.component.html',
     styleUrls: ['./ndr-report.component.scss', '../general-report/general-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NdrReportComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService; cdr: ChangeDetectorRef;
title = 'NDR DATA';
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
        "columnDef": "companyname",
        "header": "COMPANY NAME"
    },
    {
        "columnDef": "companyemail",
        "header": "COMPANY EMAIL"
    },
    {

        "columnDef": "has_annual_ndr_subscription_fee_been_paid",
        "header": "HAS ANNUAL NDR SUBSCRIPTION FEE BEEN PAID"

    },
    {
      "columnDef": "are_you_up_to_date_with_your_ndr_data_submission",
      "header": "ARE YOU UP TO DATE WITH YOUR NDR DATA SUBMISSION"
    },
    {
        "columnDef": "when_was_the_date_of_your_last_ndr_submission",
        "header": "WHEN WAS THE DATE OF YOUR LAST NDR SUBMISSION"
    },
    {
        "columnDef": "upload_ndr_payment_receipt",
        "header": "NDR PAYMENT RECEIPT"
    },
    {
        "columnDef": "consession_type",
        "header": "CONSESSION TYPE"
    },
    {
      "columnDef": "year_of_wp",
      "header": "YEAR"
  }
]

repcolumns = [
  {
    "columnDef": "year",
    "header": "CONCESSION (YEAR)"
},
  {
      "columnDef": "companyname",
      "header": "COMPANY NAME"
  },
  {
    "columnDef": "concession_held",
    "header": "CONCESSION HELD"
},

{
  "columnDef": "contract_type",
  "header": "CONTRACT TYPE"
},
{
"columnDef": "terrain",
"header": "TERRAIN"
},
{
"columnDef": "submitted",
"header": "CONCESSION STATUS"
},
{
"columnDef": "flag1",
"header": "COMPANY STATUS"
}];

  constructor(private report: ReportService, 
  private cd: ChangeDetectorRef, 
  private gen: GenericService){
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }
  
  ngOnInit() {
    this.data = [];
    this.yearList();
    this.genk.sizePerPage = this.genk.sizeten;
    //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
    //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
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
   this.report.fetch("ndr", value).subscribe(
      (res) => {
        this.data = this.arrangeDate(res.data as any[]);
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
        }
    )
  }

  yearList() {
    this.report.getYearList("ndryearlist")
        .subscribe((res: any[]) => {
            this.year = res;
            this.cd.markForCheck();
        });
}

  // searchTable(input: HTMLInputElement, table: HTMLTableElement) {
  //   var filter, found, tr, td, i, j;
  //   filter = input.value.toUpperCase();
  //   tr = table.getElementsByTagName("tr")
  //   for (i = 0; i < tr.length; i++) {
  //       td = tr[i].getElementsByTagName("td");
  //       for (j = 0; j < td.length; j++) {
  //           if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
  //               found = true;
  //           }
            
  //       }
  //       if (found) {
  //           tr[i].style.display = "";
  //           found = false;
  //       } else {
  //           tr[i].style.display = "none";
  //       }
  //   }
  // }

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

  arrangeDate(mydata: any[]) {
    let i = 0;
    while (i < mydata.length) {
      let datePipe = new DatePipe("en-US");
      mydata[i].when_was_the_date_of_your_last_ndr_submission = datePipe.transform(mydata[i].when_was_the_date_of_your_last_ndr_submission, 'dd MMM, y');
      i++;
    }
    return mydata;
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
