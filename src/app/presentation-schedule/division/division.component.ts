import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { PresentationScheduleService } from 'src/app/services/presentation-schedule.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  genk: GenericService;
cdr: ChangeDetectorRef;
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
      "columnDef": "datE_TIME_TEXT",
      "header": "DATE"
    },
    // {
    //   "columnDef": "wp_date",
    //   "header": "DATE"
    // },
    {
        "columnDef": "wp_time",
        "header": "TIME"
    },
    {
        "columnDef": "representative",
        "header": "REPRESENTATIVE"
    },
    {
        "columnDef": "representativE_EMAIL",
        "header": "REPRESENTATIVE EMAIL"
    },
    {
        "columnDef": "year",
        "header": "YEAR"
    }
]

  constructor(private presentationScheduleService: PresentationScheduleService, 
  private cd: ChangeDetectorRef, 
  private gen: GenericService){
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
  }
  
  ngOnInit() {
    this.data = [];
    this.fetchAlldata();
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
   this.presentationScheduleService.getDivisionalScheduleByYear(value).subscribe(
      (res) => {
          this.data = res.data as any[];
            if(this.data.length>0) this.selectedPage=1;
            this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
        }
    )
  }

  fetchAlldata(){
   this.presentationScheduleService.getDivisionalScheduleList().subscribe(
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
    this.presentationScheduleService.getDivisionalYearList()
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
