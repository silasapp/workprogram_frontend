import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-asset-register-template-prescription-strategy',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetRegisterTemplatePrescriptionStrategyComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'ASSET REGISTER TEMPLATE (PRESCRIPTION STRATEGY)';
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
        "columnDef": "contract_Type",
        "header": "CONTRACT TYPE"
    },
    {
      "columnDef": "terrain",
      "header": "TERRAIN"
  },
      {
          "columnDef": "facility",
          "header": "FACILITY"
      },
      {
          "columnDef": "equipment_type",
          "header": "EQUIPMENT TYPE"
      },
      {
          "columnDef": "equipment_description",
          "header": "EQUIPMENT DESCRIPTION"
      },
      {
          "columnDef": "equipment_serial_number",
          "header": "EQUIPMENT SERIAL NUMBER"
      },
      {
          "columnDef": "equipment_tag_number",
          "header": "EQUIPMENT TAG NUMBER"
      },
      {
          "columnDef": "equipment_manufacturer",
          "header": "EQUIPMENT MANUFACTURER"
      },
      {
          "columnDef": "equipment_Installation_date",
          "header": "EQUIPMENT INSTALLATION DATE"
      },
      {
          "columnDef": "last_inspection_date",
          "header": "LAST INSPECTION DATE"
      },
      {
          "columnDef": "last_Inspection_Type_Performed",
          "header": "LAST INSPECTION TYPE PERFORMED"
      },
      {
          "columnDef": "next_Inspection_Date",
          "header": "NEXT INSPECTION DATE"
      },
      {
          "columnDef": "proposed_Inspection_Type",
          "header": "PROPOSED INSPECTION TYPE"
      },
      {
          "columnDef": "equipment_Inspected_as_and_when_due",
          "header": "EQUIPMENT INSPECTED AS AND WHEN DUE"
      },
      {
          "columnDef": "state_reason",
          "header": "STATE REASON"
      },
      {
          "columnDef": "condition_of_Equipment",
          "header": "CONDITION OF EQUIPMENT"
      },
      {
          "columnDef": "function_Test_Result",
          "header": "FUNCTION TEST RESULT"
      },
      {
          "columnDef": "inspection_Report_Review",
          "header": "INSPECTION REPORT REVIEW"
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
     this.report.fetch("prescription_stragtegy", value).subscribe(
        (res) => {
            this.data = res.data as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
          }
      )
    }

    yearList() {
        this.report.getYearList("prescription_stragtegy_yearlist")
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
