import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-nigeria-content-training',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NigeriaContentTrainingComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'NIGERIA CONTENT TRAINING';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    data: any[];
    year = [];

    columns = [
      {
          "columnDef": "id",
          "header": "ID"
      },
      {
          "columnDef": "omL_ID",
          "header": "OML ID"
      },
      {
          "columnDef": "omL_Name",
          "header": "OML  NAME"
      },
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
        "columnDef": "contract_Type",
        "header": "CONTRACT TYPE"
    },
    {
        "columnDef": "terrain",
        "header": "TERRAIN"
    },
      {
          "columnDef": "training_",
          "header": "TRAINING "
      },
      {
          "columnDef": "local_",
          "header": "LOCAL "
      },
      {
          "columnDef": "foreign_",
          "header": "FOREIGN "
      },
    
      {
          "columnDef": "expatriate_quota_positions",
          "header": "EXPATRIATE QUOTA POSITIONS"
      },
      {
          "columnDef": "utilized_EQ",
          "header": "UTILIZED EQ"
      },
      {
          "columnDef": "nigerian_Understudies",
          "header": "NIGERIAN UNDERSTUDIES"
      },
      {
          "columnDef": "management_Foriegn",
          "header": "MANAGEMENT FORIEGN"
      },
      {
          "columnDef": "management_Local",
          "header": "MANAGEMENT LOCAL"
      },
      {
          "columnDef": "staff_Foriegn",
          "header": "STAFF FORIEGN"
      },
      {
          "columnDef": "staff_Local",
          "header": "STAFF LOCAL"
      },
      {
          "columnDef": "actual_Proposed",
          "header": "ACTUAL PROPOSED"
      },
      {
          "columnDef": "actual_Proposed_Year",
          "header": "ACTUAL PROPOSED YEAR"
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
      this.report.fetch("nigeria_content_training", value).subscribe(
        (res) => {
            this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
          }
      )
    }

    yearList() {
        this.report.getYearList("nigeria_content_training_yearlist")
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
