import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-concession-situation',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcessionSituationComponent implements OnInit {
    data: any[];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'Concessions Situation';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
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
          "columnDef": "concession_held",
          "header": "CONCESSION HELD"
      },
      {
        "columnDef": "year",
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
    "header": "CONSESSION TYPE"
},
      {
          "columnDef": "area",
          "header": "AREA (SQ.KM)"
      },
      {
          "columnDef": "no_of_discovered_field",
          "header": "NO OF DISCOVERED FIELD"
      },
      {
          "columnDef": "no_of_field_producing",
          "header": "NO OF PRODUCING FIELD"
      },
      {
          "columnDef": "equity_distribution",
          "header": "EQUITY DISTRIBUTION"
      },
      
      {
          "columnDef": "geological_location",
          "header": "GEOLOGICAL LOCATION"
      },
      {
          "columnDef": "has_signature_bonus_been_paid",
          "header": "HAS SIGNATURE BONUS BEEN PAID"
      },
      {
          "columnDef": "if_no_why_sig",
          "header": "IF NO GIVE REASON(SIGNATURE BONUS)"
      },
      {
          "columnDef": "has_the_concession_rentals_been_paid",
          "header": "HAS THE CONCESSION RENTALS BEEN PAID"
      },
      {
          "columnDef": "if_no_why_concession",
          "header": "IF NO GIVE REASON (CONCESSION)"
      },
      {
          "columnDef": "is_there_an_application_for_renewal",
          "header": "IS THERE AN APPLICATION FOR RENEWAL"
      },
      {
          "columnDef": "if_no_why_renewal",
          "header": "IF NO GIVE REASON (RENEWAL)"
      },
      {
          "columnDef": "budget_actual_for_license_or_lease",
          "header": "BUDGET ACTUAL FOR LICENSE OR LEASE"
      },
      {
          "columnDef": "proposed_budget_for_each_license_lease",
          "header": "PROPOSED BUDGET FOR EACH LICENSE LEASE"
      },
      {
          "columnDef": "five_year_proposal",
          "header": "FIVE YEAR PROPOSAL"
      },
      {
          "columnDef": "did_you_meet_the_minimum_work_programme",
          "header": "DID YOU MEET THE MINIMUM WORK PROGRAMME"
      },
      {
        "columnDef": "how_much_signature_bonus_have_been_paid_usd",
        "header": "HOW MUCH SIGNATURE BONUS HAVE BEEN PAID (USD)"
      },
      {
        "columnDef": "how_much_concession_rental_have_been_paid_usd",
        "header": "HOW MUCH CONCESSION RENTAL HAVE BEEN PAID (USD)"
      },
      {
        "columnDef": "how_much_renewal_bonus_have_been_paid_usd",
        "header": "HOW MUCH RENEWAL BONUS HAVE BEEN PAID (USD)"
      },
      {
        "columnDef": "relinquishment_retention",
        "header": "RELINQUISHMENT RETENTION"
      },
      {
        "columnDef": "area_in_square_meter_based_on_company_records",
        "header": "AREA (SQUARE METER)"
      },
      {
        "columnDef": "has_assignment_of_interest_fee_been_paid",
        "header": "HAS ASSIGNMENT OF INTEREST FEE BEEN PAID"
      },
      {
          "columnDef": "comment",
          "header": "COMMENT"
      }]
  
    constructor(private report: ReportService, private cd: ChangeDetectorRef, private gen: GenericService){
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
     this.report.fetch("concessionsituation", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
        }
      )
    }

    yearList() {
      this.report.getYearList("concessionsituationyearlist")
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
