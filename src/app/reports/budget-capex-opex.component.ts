import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-budget-capex-opex',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetCapexOpexComponent implements OnInit {
  genk: GenericService;
  cdr: ChangeDetectorRef;
  title = 'BUDGET: CAPEX AND OPEX';
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
        "columnDef": "omL_Name",
        "header": "CONCESSION HELD"
      },
      {
          "columnDef": "year_of_WP",
          "header": "YEAR"
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
          "columnDef": "item_Type",
          "header": "ITEM TYPE"
      },
      {
          "columnDef": "item_Description",
          "header": "ITEM DESCRIPTION"
      },
      {
          "columnDef": "naira",
          "header": "NAIRA"
      },
      {
          "columnDef": "dollar",
          "header": "DOLLAR"
      },
      {
          "columnDef": "dollar_equivalent",
          "header": "DOLLAR EQUIVALENT"
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
     this.report.fetch("budget_capex_opex", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }
  
    yearList() {
      this.report.getYearList("budget_capex_opex_yearlist")
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