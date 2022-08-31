import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-drilling-operations',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrillingOperationsComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'DRILLING OPERATIONS';
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
        "columnDef": "quater",
        "header": "QUATER"
    },
    {
        "columnDef": "category",
        "header": "CATEGORY"
    },

    {
        "columnDef": "wellname",
        "header": "WELLNAME"
    },
    {
        "columnDef": "actual_proposed",
        "header": "ACTUAL/PROPOSED"
    },
    {
        "columnDef": "processing_fees_paid",
        "header": "PROCESSING FEES PAID"
    },
  
    {
        "columnDef": "cored",
        "header": "CORED"
    },
    {
        "columnDef": "well_type",
        "header": "WELL TYPE"
    },
    {
        "columnDef": "well_trajectory",
        "header": "WELL TRAJECTORY"
    },
    {
        "columnDef": "spud_date",
        "header": "SPUD DATE"
    },
    {
        "columnDef": "well_cost",
        "header": "TOTAL ACTUAL WELL COST (USD)"
    },
    {
        "columnDef": "number_of_days_to_total_depth",
        "header": "NUMBER OF DAYS TO TOTAL DEPTH"
    },
      {
          "columnDef": "water_depth",
          "header": "WATER DEPTH"
      },
      
      {
          "columnDef": "true_vertical_depth",
          "header": "TRUE VERTICAL DEPTH"
      },
      {
          "columnDef": "measured_depth",
          "header": "MEASURED DEPTH"
      },
      {
          "columnDef": "depth_refrence",
          "header": "DEPTH REFRENCE"
      },
      {
          "columnDef": "rig_type",
          "header": "RIG TYPE"
      },
      {
          "columnDef": "rig_name",
          "header": "RIG NAME"
      },
      {
        "columnDef": "target_reservoir",
        "header": "TARGET RESERVOIR"
    },
    {
        "columnDef": "location_name",
        "header": "LOCATION NAME"
    },
    {
        "columnDef": "basin",
        "header": "BASIN"
    },
    {
        "columnDef": "propose_well_names",
        "header": "PROPOSE WELL NAMES"
    },
    {
        "columnDef": "actual_wells_name",
        "header": "ACTUAL WELLS NAME"
    },
    {
        "columnDef": "fielddiscoveryuploadfilepath",
        "header": "FIELD DISCOVERY FILE"
    },
    {
        "columnDef": "hydrocarboncountuploadfilepath",
        "header": "HYDROCARBON FILE"
    },
      {
          "columnDef": "terrain_drill",
          "header": "TERRAIN (DRILL)"
      },
      {
        "columnDef": "comments",
        "header": "COMMENTS"
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
      this.report.fetch("drilling-operations", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }

    yearList() {
        this.report.getYearList("drilling-operations-yearlist")
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
