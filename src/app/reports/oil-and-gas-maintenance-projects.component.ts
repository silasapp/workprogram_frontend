import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-oil-and-gas-maintenance-projects',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OilAndGasMaintenanceProjectsComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'OIL AND GAS MAINTENANCE PROJECTS';
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
        "columnDef": "consession_Type",
        "header": "CONSESSION TYPE"
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
          "columnDef": "major_Projects",
          "header": "MAJOR PROJECTS"
      },
      {
          "columnDef": "name",
          "header": " NAME"
      },
      {
          "columnDef": "objective_Drivers_",
          "header": "OBJECTIVE DRIVERS "
      },
      {
          "columnDef": "approval_License_Permits",
          "header": "APPROVAL LICENSE PERMITS"
      },
      {
          "columnDef": "completion_Status",
          "header": "COMPLETION STATUS"
      },
      {
          "columnDef": "conceptual",
          "header": "CONCEPTUAL"
      },
      {
          "columnDef": "feed",
          "header": "FEED"
      },
      {
          "columnDef": "detailed_Engineering",
          "header": "DETAILED ENGINEERING"
      },
      {
          "columnDef": "construction_Commissioning_",
          "header": "CONSTRUCTION COMMISSIONING "
      },
      {
          "columnDef": "production_Product_Offtakers",
          "header": "PRODUCTION PRODUCT OFFTAKERS"
      },
      {
          "columnDef": "challenges",
          "header": "CHALLENGES"
      },
      {
          "columnDef": "project_Timeline",
          "header": "PROJECT TIMELINE"
      },
      {
          "columnDef": "new_Technology_",
          "header": "NEW TECHNOLOGY "
      },
      {
          "columnDef": "has_it_been_adopted_by_DPR_",
          "header": "HAS IT BEEN ADOPTED BY DPR "
      },
     
      {
          "columnDef": "planned_ongoing_and_routine_maintenance",
          "header": "PLANNED ONGOING AND ROUTINE MAINTENANCE"
      },
      {
          "columnDef": "actual_year",
          "header": "ACTUAL YEAR"
      },
      {
          "columnDef": "proposed_year",
          "header": "PROPOSED YEAR"
      },
      
      {
          "columnDef": "actual_capital_expenditure_Current_year_NGN",
          "header": "ACTUAL CAPITAL EXPENDITURE CURRENT YEAR NGN"
      },
      {
          "columnDef": "actual_capital_expenditure_Current_year_USD",
          "header": "ACTUAL CAPITAL EXPENDITURE CURRENT YEAR USD"
      },
      {
          "columnDef": "proposed_Capital_Expenditure_NGN",
          "header": "PROPOSED CAPITAL EXPENDITURE NGN"
      },
      {
          "columnDef": "proposed_Capital_Expenditure_USD",
          "header": "PROPOSED CAPITAL EXPENDITURE USD"
      },
      {
          "columnDef": "project_Stage",
          "header": "PROJECT STAGE"
      },
      {
          "columnDef": "nigerian_Content_Value",
          "header": "NIGERIAN CONTENT VALUE"
      },
      
      {
          "columnDef": "actual_Proposed",
          "header": "ACTUAL PROPOSED"
      },
       {
          "columnDef": "comment_",
          "header": "COMMENT "
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
     let result =  this.report.fetch("oil_and_gas__maintenance_projects", value).subscribe(
        (res) => {
            this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
        }
      )
    }

    yearList() {
        this.report.getYearList("oil_and_gas__maintenance_projects_yearlist")
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