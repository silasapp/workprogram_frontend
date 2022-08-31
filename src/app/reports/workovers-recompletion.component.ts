import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-workovers-recompletion',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoversRecompletionComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'WELL COMPLETION & RECOMPLETION';
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
        "columnDef": "contract_type",
        "header": "CONTRACT TYPE"
    },
    {
        "columnDef": "terrain",
        "header": "TERRAIN"
    },
    {
        "columnDef": "consession_type",
        "header": "CONCESSION TYPE"
    },
      {
          "columnDef": "do_you_have_approval_for_the_workover_recompletion",
          "header": "DO YOU HAVE APPROVAL TO COMPLETE THE WELL"
      },
      {
          "columnDef": "current_year_actual_number_data",
          "header": "ACTUAL NUMBER"
      },
     
      {
          "columnDef": "proposed_year_data",
          "header": "PROPOSED"
      },
      {
          "columnDef": "budeget_allocation_ngn",
          "header": "BUDGET ALLOCATION (NGN)"
      },
      {
          "columnDef": "budeget_allocation_usd",
          "header": "BUDEGET ALLOCATION (USD)"
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
      this.report.fetch("workovers_recompletion", value).subscribe(
        (res) => {
            this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
        }
      )
    }

    yearList() {
        this.report.getYearList("workovers_recompletion_yearlist")
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
