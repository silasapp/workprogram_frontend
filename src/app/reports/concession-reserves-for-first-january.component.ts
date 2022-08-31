import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-concession-reserves-for-first-january',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcessionReservesForFirstJanuaryComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'CONCESSION RESERVES FOR PRECEDING YEAR(AS AT 1ST JANUARY)';
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
          "columnDef": "companyemail",
          "header": "COMPANY EMAIL"
      },
      {
        "columnDef": "oml_name",
        "header": "CONCESSION HELD"
      },
      {
          "columnDef": "year_of_wp",
          "header": "YEAR"
      },
      {
          "columnDef": "company_reserves_year",
          "header": "PRECEEDING YEAR"
      },
      {
          "columnDef": "company_reserves_oil",
          "header": "2P reserves (MMBBL)-OIL"
      },
      {
          "columnDef": "company_reserves_condensate",
          "header": "2P reserves (MMBBL)-CONDENSATE"
      },
      {
          "columnDef": "company_reserves_ag",
          "header": "2P reserves (BSCF)-AG"
      },
      {
          "columnDef": "company_reserves_nag",
          "header": "2P reserves (BSCF)-NAG"
      },
      {
          "columnDef": "company_reserves_annualoilproduction",
          "header": "ANNUAL OIL PRODUCTION (MMBBL)"
      },
      {
        "columnDef": "company_reserves_annualcondensateproduction",
        "header": "ANNUAL CONDENSATE PRODUCTION (MMBBL)"
    },
    {
        "columnDef": "company_reserves_annualgasagproduction",
        "header": "ANNUAL AG PRODUCTION (BSCF)"
    },
    {
        "columnDef": "company_reserves_annualgasnagproduction",
        "header": "ANNUAL NAG PRODUCTION (BSCF)"
    }
  ];

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
     this.report.fetch("concession_reserves_for_1st_january", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }

    yearList() {
      this.report.getYearList("concession_reserves_for_1st_january_yearlist")
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
