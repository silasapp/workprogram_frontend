import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './seismic-activities.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss']
})
export class SeismicActivitiesApprovedComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  data: any[];

  selectedColumns: any[] = [];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    pagenum = 0;
    selectedPage = 0;
    arrayRows = [];
    listyear = [];
    isTableOpt = false;
    isSpecifyColumns = false;
    reporttext: string;
    isChart = false;
    totalone = 0;
    totaltwo = 0;
    barone = 'Total Quantum Approved';
    bartwo = 'Total Quantum Acquired';
    isData = true;

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


      repcolumns = [
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

    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        this.cdr = cd;
        this.genk.sizePerPage = this.genk.sizeten;
        this.modalService.generalReport
        .subscribe(res => {
          this.getSeismic();
          this.getSeismicReportText();
        });
    }

    ngOnInit() {
      this.data = [];
      //this.yearList();
      this.genk.sizePerPage = this.genk.sizeten;
      this.getSeismic();
      this.getSeismicReportText();
    }

    public get pageIndex(): number {
        return (this.selectedPage - 1) * this.genk.sizePerPage;
    }

    public get title(): string {
      return `1.1 Seismic Data Acquisition Activities for ${this.genk.reportYear}`;
    }

    public get tableTitle(): string {
      return `Table 3. ${this.genk.reportYear} 3D Seismic Data Approved and Acquired`;
    }

      assignPageNum() {
        this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
      }

      assignDataRows() {
        this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
        if(this.arrayRows.length>1) this.selectedPage=1;
        this.cd.markForCheck();
      }


    fetchdata(e){
      let value = e.target.value;
     this.report.fetch("concessionsituation", value).subscribe(
        (res) => {
           this.data = res.data as any[];
            if(this.data.length>0) this.selectedPage=1;
            this.assignDataRows();
            this.assignPageNum();
            this.cd.markForCheck();
        }
      )
    }

  //   yearList() {
  //     this.report.getYearList("concessionsituationyearlist")
  //         .subscribe((res: any[]) => {
  //             this.listyear = res;
  //             this.cd.markForCheck();
  //         });
  // }


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


  getSeismic() {
    debugger;
    if (this.genk.reportYear !== undefined || this.genk.reportYear != null) {
      this.modalService.logCover("Loading data...", true);
    this.workprogram.getSeismicActivities(this.genk.reportYear)
      .subscribe(res => {
        this.data = res.seismic_Data_Approved_and_Acquired as any[];
        this.isData = this.data.length > 0;
        this.totalone = Math.round(this.report.sumColumn(this.data, 'quantum_Approved'));
        this.totaltwo = Math.round(this.report.sumColumn(this.data, 'quantum'));
            this.assignDataRows();
            this.assignPageNum();
            this.modalService.togCover();
            this.cd.markForCheck();
      },
      err => {this.modalService.togCover();});
    }
  }

  getSeismicReportText() {
    this.workprogram.getSeismicActivitiesReportText(this.genk.reportYear)
      .subscribe(res => {
        this.reporttext = res.data;
            this.cd.markForCheck();
      });
  }



  togOptions() {
    if (!this.isTableOpt) {
      this.isTableOpt = true;
    } else {
      this.isTableOpt = false;
    }
    this.cd.markForCheck();
  }

  togSpecifyColumns() {
    if (!this.isSpecifyColumns) {
      this.isSpecifyColumns = true;
      this.columns = this.repcolumns;
      this.selectedColumns = [];
    } else {
      this.isSpecifyColumns = false;
    }
    this.cd.markForCheck();
  }

  pickColumn(value: string, checked: boolean) {
    if (checked) {
      let val = this.repcolumns.filter(x => x.columnDef == value)[0];
      this.selectedColumns.push(val);
    }
    else {
      let remainingArr = this.selectedColumns.filter(x => x.columnDef != value);
      this.selectedColumns = remainingArr;
    }
    this.cd.markForCheck();
  }

  selectColumns() {
    this.columns = this.selectedColumns;
    this.isSpecifyColumns = false;
    this.cd.markForCheck();
  }

  plotDoublePieChart() {
    debugger;
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    }
    else {
      this.myChartBox.nativeElement.removeChild(this.myChartBox.nativeElement.firstChild);
      const node = document.createElement("div");
      node.style.width = '100%';
      node.style.height = '500px';
      this.myChartBox.nativeElement.appendChild(node);
      let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
      let sele1 = this.selectedColumns[0].columnDef;
      let sele2 = this.selectedColumns[1].columnDef;

      this.myChartBox.nativeElement.style.display = 'block';
      if (this.selectedColumns.length === 2) {
        let reportdata = this.data;
        let chartdata = this.report.formatChartData(reportdata, sele1, sele2);
        this.report.plotDoublePieChart(bechart, sele1, sele2, chartdata)
      }
    }
  }

  plotDoubleBarChart() {
    let totalString = "";
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    }
    else {

      this.myChartBox.nativeElement.removeChild(this.myChartBox.nativeElement.firstChild);
      const node = document.createElement("div");
      node.style.width = '100%';
      node.style.height = '500px';
      this.myChartBox.nativeElement.appendChild(node);
      let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
      let sele1 = this.selectedColumns[0].columnDef;
      let sele2 = this.selectedColumns[1].columnDef;

      this.myChartBox.nativeElement.style.display = 'block';
      if (this.selectedColumns.length === 2) {
        let chartdata = this.report.formatChartData(this.data, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef);
        for (var i = 0; i < chartdata.length; i++) {
          totalString += chartdata[i].base;
        }
        if (totalString.length > 70) {
          this.report.plotDoubleBarChartHorizontal(bechart, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef, chartdata);
        }
        else {
          this.report.plotDoubleBarChart(bechart, this.selectedColumns[0].columnDef, this.selectedColumns[1].columnDef, chartdata);
        }
      }
    }
  }
}
