import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-concessions-information',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcessionsInformationComponent implements OnInit {

  genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'Check Concession Status';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    data: any[];
    year = [];
  
    columns = [
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
      this.report.fetch("concessionsinformation", value).subscribe(
      (res) => {
        this.data = res.data as any[];
        this.assignDataRows();
        this.assignPageNum();
        this.cd.markForCheck();
    }
      )
    }

    yearList() {
      this.report.getYearList("concessionsinformationyearlist")
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
}
