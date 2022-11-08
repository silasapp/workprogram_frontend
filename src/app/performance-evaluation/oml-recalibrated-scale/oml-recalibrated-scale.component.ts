import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-oml-recalibrated-scale',
  templateUrl: './oml-recalibrated-scale.component.html',
  styleUrls: ['./oml-recalibrated-scale.component.scss']
})
export class OMLRecalibratedScaleComponent implements OnInit {

  genk: GenericService;
cdr: ChangeDetectorRef;
title = 'OML PERFORMANCE EVALUATION RECALIBRATED SCALE';
pagenum = 0;
selectedPage = 1;
arrayRows = [];
data: any[];
year = [];
  columns = [
    {
        "columnDef": "companyName",
        "header": "COMPANY NAME"
    },
    {
        "columnDef": "companyemail",
        "header": "COMPANY EMAIL"
    },
    {
        "columnDef": "year_of_WP",
        "header": "YEAR"
    },
    {
        "columnDef": "has_annual_NDR_subscription_fee_been_paid",
        "header": "HAS ANNUAL NDR SUBSCRIPTION FEE BEEN PAID"
    },
    {
        "columnDef": "when_was_the_date_of_your_last_NDR_submission",
        "header": "WHEN WAS THE DATE OF YOUR LAST NDR SUBMISSION"
    },
    {
        "columnDef": "upload_NDR_payment_receipt",
        "header": "NDR PAYMENT RECEIPT"
    },
    {
        "columnDef": "are_you_up_to_date_with_your_NDR_data_submission",
        "header": "ARE YOU UP TO DATE WITH YOUR NDR DATA SUBMISSION"
    },
    {
        "columnDef": "consession_Type",
        "header": "CONSESSION TYPE"
    }
]



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
   this.report.performanceEvaluation("oml_recalibrated_scaled", value).subscribe(
      (res) => {
          this.data = res.data as any[];
            if(this.data.length>0) this.selectedPage=1;
            this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
        }
    )
  }

  yearList() {
    this.report.getYearList("reports_yearlist")
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

}
