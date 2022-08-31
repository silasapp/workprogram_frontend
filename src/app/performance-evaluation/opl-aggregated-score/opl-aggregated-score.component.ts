import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-opl-aggregated-score',
  templateUrl: './opl-aggregated-score.component.html',
  styleUrls: ['./opl-aggregated-score.component.scss']
})
export class OPLAggregatedScoreComponent implements OnInit {

  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'OPL AGGREGATED SCORE';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  year = [];
    columns = [
      {
        "columnDef": "companyname",
        "header": "COMPANY NAME"
    },
    {
        "columnDef": "index_type",
        "header": "PERFORMANCE INDEX"
    },
    {
        "columnDef": "recalibrated_scaled_index_sum",
        "header": "RECALIBRATED SCALE INDEX"
    },
    {
        "columnDef": "weight_sum",
        "header": "WEIGHT"
    },
    {
        "columnDef": "weighted_score_sum",
        "header": "WEIGHTED SCORE"
    },
    {
        "columnDef": "opl_aggregated_score",
        "header": "AGGREGATED SCORE"
    },
    {
        "columnDef": "consession_type",
        "header": "CONCESSION TYPE"
    },
    {
        "columnDef": "year_of_wp",
        "header": "YEAR"
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
     this.report.performanceEvaluation("opl_aggregated_score", value).subscribe(
        (res) => {
          this.data = res.data as any[];
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
