import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-fdp-to-submit',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FDPToSubmitComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'FIELD DEVELOPMENT PLAN';
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
          "columnDef": "how_many_fields_in_concession",
          "header": "HOW MANY FIELDS ARE IN THE CONCESSION"
      },
      {
          "columnDef": "how_many_fields_have_approved_fdp",
          "header": "HOW MANY FIELDS HAVE APPROVED FDP"
      },
      {
          "columnDef": "which_fields_do_you_plan_to_submit_an_fdp",
          "header": "WHICH FIELD DO YOU PLAN TO SUBMIT AN FDP"
      },
      {
          "columnDef": "proposed_number_of_wells_from_approved_fdp",
          "header": "PROPOSED NO OF WELL FROM APPROVED FDP"
      },
      {
          "columnDef": "no_of_wells_drilled_in_current_year",
          "header": "NO OF WELLS DRILLED"
      },
      {
          "columnDef": "noof_producing_fields",
          "header": "NO OF PRODUCING FIELD(S)"
      },
      {
          "columnDef": "are_they_oil_or_gas_wells",
          "header": "GAS / WELL"
      },
      {
          "columnDef": "uploaded_approved_fdp_document",
          "header": "APPROVED FDP DOCUMENT"
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
       this.report.fetch("fdp_tosubmit", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }

    yearList() {
        this.report.getYearList("fdp_tosubmit_yearlist")
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
