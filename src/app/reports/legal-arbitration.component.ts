import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-legal-arbitration',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalArbitrationComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'LEGAL ARBITRATION';
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
          "columnDef": "terrain",
          "header": "TERRAIN"
      },
      {
          "columnDef": "contract_Type",
          "header": "CONTRACT TYPE"
      },
      {
          "columnDef": "consession_Type",
          "header": "CONSESSION TYPE"
      },
      {
          "columnDef": "anyLitigation",
          "header": "ANYLITIGATION"
      },
      {
          "columnDef": "case_Number",
          "header": "CASE NUMBER"
      },
      {
          "columnDef": "names_of_Parties",
          "header": " NAMES OF PARTIES"
      },
      {
          "columnDef": "jurisdiction",
          "header": "JURISDICTION"
      },
      {
          "columnDef": "name_of_Court",
          "header": " NAME OF COURT"
      },
      {
          "columnDef": "summary_of_the_case",
          "header": "SUMMARY OF THE CASE"
      },
      {
          "columnDef": "any_orders_made_so_far_by_the_court",
          "header": "ANY ORDERS MADE SO FAR BY THE COURT"
      },
      {
          "columnDef": "potential_outcome",
          "header": "POTENTIAL OUTCOME"
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
      this.report.fetch("legal_arbitration", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }

    yearList() {
        this.report.getYearList("legal_arbitration_yearlist")
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
