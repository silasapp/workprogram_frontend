import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-strategic-plans-on-company-basis',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategicPlansOnCompanyBasisComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'STRATEGIC PLANS ON COMPANY BASIS';
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
}
