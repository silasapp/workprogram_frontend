import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { GenericService } from '../services';

@Component({
  selector: 'app-reserves-decline',
  templateUrl: 'ndr-report.component.html',
  styleUrls: ['ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservesDeclineComponent implements OnInit {
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'RESERVES DECLINE';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    data: any[];
    year = [];

    columns = [
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
        "columnDef": "terrain",
        "header": "TERRAIN"
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
          "columnDef": "reserves_Decline_Was_there_a_decline_in_reserve",
          "header": "RESERVES DECLINE WAS THERE A DECLINE IN RESERVE"
      },
      {
          "columnDef": "reserves_Decline_Reason_for_Decline",
          "header": "RESERVES DECLINE REASON FOR DECLINE"
      },
      {
          "columnDef": "reserves_Decline_Oil",
          "header": "RESERVES DECLINE OIL"
      },
      {
          "columnDef": "reserves_Decline_Condensate",
          "header": "RESERVES DECLINE CONDENSATE"
      },
      {
          "columnDef": "reserves_Decline_AG",
          "header": "RESERVES DECLINE AG"
      },
      {
          "columnDef": "reserves_Decline_NAG",
          "header": "RESERVES DECLINE NAG"
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
        this.report.fetch("reserves_decline", value).subscribe(
            (res) => {
                this.data = res.data as any[];
                this.assignDataRows();
                this.assignPageNum();
                this.cd.markForCheck();
            }
      )
    }

    yearList() {
        this.report.getYearList("reserves_decline_yearlist")
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
