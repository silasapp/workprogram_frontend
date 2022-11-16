import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './seismic-activities.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppraisalWellsComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  data: any[];

  selectedColumns: any[] = [];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'APPRAISAL WELLS';
    tableTitle = 'TABLE 9: Appraisal wells drilled in 2021';
    pagenum = 0;
    selectedPage = 0;
    arrayRows = [];
    listyear = [];
    isTableOpt = false;
    isSpecifyColumns = false;
    reporttext: string = 'A total of (10) appraisal wells were drilled during the year 2021 --Table 9 below shows the details';
    isChart = false;
    totalone = 0;
    totaltwo = 0;
    barone = 'Total Days to Total Depth';
    bartwo = 'Total Well Cost';
    isData = true;

    columns = [
      {
        "columnDef": "sn",
        "header": "S/N"
      },
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
        "columnDef": "contract_Type",
        "header": "CONTRACT TYPE"
      },
      {
        "columnDef": "category",
        "header": "WELL CLASSIFICATION"
      },
      {
        "columnDef": "spud_date",
        "header": "SPUD DATE"
      },
      {
        "columnDef": "well_name",
        "header": "WELL NAME"
      },
      {
      "columnDef": "well_Status_and_Depth",
      "header": "WELL STATUS $ DEPTH"
      },
      {
          "columnDef": "number_of_Days_to_Total_Depth",
          "header": "NO OF DAYS TO TD"
      },
      {
          "columnDef": "well_cost",
          "header": "WELL COST (USD)"
      }]


      repcolumns = [
        {
          "columnDef": "sn",
          "header": "S/N"
        },
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
          "columnDef": "contract_Type",
          "header": "CONTRACT TYPE"
        },
        {
          "columnDef": "category",
          "header": "WELL CLASSIFICATION"
        },
        {
          "columnDef": "spud_date",
          "header": "SPUD DATE"
        },
        {
          "columnDef": "well_name",
          "header": "WELL NAME"
        },
        {
        "columnDef": "well_Status_and_Depth",
        "header": "WELL STATUS $ DEPTH"
        },
        {
            "columnDef": "number_of_Days_to_Total_Depth",
            "header": "NO OF DAYS TO TD"
        },
        {
            "columnDef": "well_cost",
            "header": "WELL COST (USD)"
        }
      ]

    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        this.cdr = cd;
        this.genk.sizePerPage = this.genk.sizeten;
        this.modalService.generalReport
        .subscribe(res => {
          this.getAppraisalWells();
        });
    }

    ngOnInit() {
      this.data = [];
      this.genk.sizePerPage = this.genk.sizeten;
      this.getAppraisalWells();
    }

    public get pageIndex(): number {
        return (this.selectedPage - 1) * this.genk.sizePerPage;
    }

      assignPageNum() {
        this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
      }

      assignDataRows() {
        this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
      //    if(this.data.length>1) this.selectedPage=1;
        this.cd.markForCheck();
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


  getAppraisalWells() {

    this.workprogram.getAppraisalWells(this.genk.reportYear)
      .subscribe(res => {
        this.data = res as any[];
          if(this.data.length>1) this.selectedPage=1;
        this.isData = this.data.length > 0;
        let count = this.data.length;
          let reptext = this.reporttext.split(' ')[3];
          this.reporttext = this.reporttext.replace(reptext, count.toString());

        this.cd.markForCheck();
        this.data = this.report.addSn(this.data);
        this.totalone = Math.round(this.report.sumColumn(this.data, 'number_of_Days_to_Total_Depth'));
        this.totaltwo = Math.round(this.report.sumColumn(this.data, 'well_cost'));
        this.data = this.report.arrangeDate(this.data, 'spud_date');
        if(this.data.length>0) this.selectedPage=1;
            this.assignDataRows();
            this.assignPageNum();
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
    if (this.selectedColumns.length > 2) {
      alert('Can not plot this chart');
    }
    else {
      debugger;
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
