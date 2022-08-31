import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-unitization',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitizationComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'UNITIZATION';
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
    //     {
    //       "columnDef": "oml_name",
    //       "header": "CONCESSION HELD"
    //     },
    //     {
    //         "columnDef": "year_of_wp",
    //         "header": "YEAR"
    //     },
    //     {
    //       "columnDef": "contract_type",
    //       "header": "CONTRACT TYPE"
    //   },
    //   {
    //       "columnDef": "terrain",
    //       "header": "TERRAIN"
    //   },
    //   {
    //       "columnDef": "consession_type",
    //       "header": "CONSESSION TYPE"
    //   },
    //   {
    //       "columnDef": "current_year_Actual",
    //       "header": "CURRENT YEAR ACTUAL"
    //   },
      {
          "columnDef": "deferment",
          "header": "DEFERMENT"
      },
      {
          "columnDef": "forecast",
          "header": "FORECAST"
      },
      {
          "columnDef": "remarks",
          "header": "REMARKS"
      },
      {
          "columnDef": "is_any_of_your_field_straddling",
          "header": "IS ANY OF YOUR FIELD STRADDLING"
      },
      {
          "columnDef": "how_many_fields_straddle",
          "header": "HOW MANY FIELDS STRADDLE"
      },
      {
          "columnDef": "straddling_fields_oc",
          "header": "STRADDLING FIELDS (OPERATING COY)"
      },
      {
          "columnDef": "prod_status_oc",
          "header": "PROD STATUS (OPERATING COY)"
      },
      {
          "columnDef": "straddling_field_op",
          "header": "STRADDLING FIELD (OTHER PARTY)"
      },
      {
          "columnDef": "company_name_op",
          "header": "COMPANY  NAME (OTHER PARTY)"
      },
      {
          "columnDef": "prod_status_op",
          "header": "PROD STATUS (OTHER PARTY)"
      },
      {
          "columnDef": "has_dpr_been_notified",
          "header": "HAS DPR BEEN NOTIFIED"
      },
      {
          "columnDef": "has_the_other_party_been_notified",
          "header": "HAS THE OTHER PARTY BEEN NOTIFIED"
      },
      {
          "columnDef": "has_the_ca_been_signed",
          "header": "HAS THE CONFIDENTIALITY AGREEMENT BEEN SIGNED"
      },
      {
          "columnDef": "committees_been_inaugurated",
          "header": "HAS TECHNICAL , FINANCE, UNITIZATION AND STEERING COMMITTEES BEEN INAUGURATED"
      },
      {
          "columnDef": "participation_been_determined",
          "header": "HAS THE TRACT PARTICIPATION BEEN DETERMINED"
      },
      {
          "columnDef": "has_the_pua_been_signed",
          "header": "HAS THE PUA BEEN SIGNED"
      },
      {
          "columnDef": "is_there_a_joint_development",
          "header": "IS THERE A JOINT DEVELOPMENT"
      },
      {
          "columnDef": "has_the_uuoa_been_signed",
          "header": "HAS THE UUOA BEEN SIGNED"
      },
      {
        "columnDef": "what_concession_field_straddling",
        "header": "WHAT CONCESSION FIELD STRADDLING"
      },
      {
          "columnDef": "total_reconciled_national_crude_oil_production",
          "header": "TOTAL RECONCILED NATIONAL CRUDE OIL PRODUCTION"
      },
     
      {
          "columnDef": "oil_royalty_payment",
          "header": "OIL ROYALTY PAYMENT"
      },
      {
          "columnDef": "straddle_field_producing",
          "header": "STRADDLE FIELD PRODUCING"
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
      this.report.fetch("unitization", value).subscribe(
        (res) => {
                this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
        }
      )
    }

    yearList() {
        this.report.getYearList("unitization_yearlist")
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
