import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './seismic-activities.component.html',
  styleUrls: ['../reports/ndr-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeismicActivitiesApprovedComponent implements OnInit {
  data: any[];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'SEISMIC ACTIVITIES';
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    listyear = [];

    columns = [
      {
          "columnDef": "companyName",
          "header": "COMPANY NAME"
      },
      {
          "columnDef": "omL_Name",
          "header": "BLOCK"
      },
      {
        "columnDef": "terrain",
        "header": "TERRAIN"
      },
      {
      "columnDef": "name_of_Contractor",
      "header": "NAME_OF_CONTRACTOR"
      },
      {
          "columnDef": "quantum_Approved",
          "header": "QUANTUM APPROVED (SQ.KM)"
      },
      {
          "columnDef": "quantum",
          "header": "QUANTUM ACQUIRED (SQ.KM)"
      }]

    constructor(private report: ReportService, private workprogram: WorkProgramService, private cd: ChangeDetectorRef, private gen: GenericService){
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
              this.listyear = res;
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


  getSeismic(e) {
    let value = e.target.value;
    this.workprogram.getSeismicActivities(value)
      .subscribe(res => {
        this.data = res.seismic_Data_Approved_and_Acquired as any[];
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
        this.cd.markForCheck();
      });
  }
}
