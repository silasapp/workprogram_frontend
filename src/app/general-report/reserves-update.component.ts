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
export class ReserveUpdateComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  data: any[];

  selectedColumns: any[] = [];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'RESERVES UPDATE';
    pagenum = 0;
    selectedPage = 0;
    arrayRows = [];
    listyear = [];
    isTableOpt = false;
    isSpecifyColumns = false;
    isChart = false;
    totalone = 0;
    totaltwo = 0;
    barone = 'TOTAL OIL (BBLLS)';
    bartwo = 'TOTAL CONDENSATE (BBLLS)';
    isData = true;

    columns = [
      {
        "columnDef": "company_Reserves_Year",
        "header": "YEAR"
      },
      {
        "columnDef": "total_Company_Reserves_Oil",
        "header": "OIL (BBLLS)"
      },
      {
        "columnDef": "total_Company_Reserves_Condensate",
        "header": "CONDENSATE (BBLLS)"
      },
      {
        "columnDef": "total_oil_plus_condensate",
        "header": "OIL + CONDENSATE (TOTAL) (BBLLS)"
      },
      {
          "columnDef": "total_Company_Reserves_AG",
          "header": "ASSOCIATED GAS (AG) (TCF)"
      },
      {
        "columnDef": "total_Company_Reserves_NAG",
        "header": "NON-ASSOCIATED GAS (NAG) (TCF)"
      },
      {
        "columnDef": "total_AG_NAG",
        "header": "AG + NAG (TCF)"
      }
    ]


      repcolumns = [
        {
          "columnDef": "company_Reserves_Year",
          "header": "YEAR"
        },
        {
          "columnDef": "total_Company_Reserves_Oil",
          "header": "OIL (BBLLS)"
        },
        {
          "columnDef": "total_Company_Reserves_Condensate",
          "header": "CONDENSATE (BBLLS)"
        },
        {
          "columnDef": "total_oil_plus_condensate",
          "header": "OIL + CONDENSATE (TOTAL) (BBLLS)"
        },
        {
            "columnDef": "total_Company_Reserves_AG",
            "header": "ASSOCIATED GAS (AG) (TCF)"
        },
        {
          "columnDef": "total_Company_Reserves_NAG",
          "header": "NON-ASSOCIATED GAS (NAG) (TCF)"
        },
        {
          "columnDef": "total_AG_NAG",
          "header": "AG + NAG (TCF)"
        }
      ]

    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        this.cdr = cd;
        this.genk.sizePerPage = this.genk.sizeten;
        this.modalService.generalReport
        .subscribe(res => {
          this.getReservesUpdatestWells();
        });
    }

    ngOnInit() {
      this.data = [];
      this.genk.sizePerPage = this.genk.sizeten;
      this.getReservesUpdatestWells();
    }

    public get pageIndex(): number {
        return (this.selectedPage - 1) * this.genk.sizePerPage;
    }

    public get reporttext(): string {
      return 'The table below shows reserves update as at 1st January ' + this.genk.reportYear;
    }

    public get tableTitle(): string {
      return 'Table 11 Reserves as at 1st January ' + this.genk.reportYear;
    }


      assignPageNum() {
        this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
      }

      assignDataRows() {
          this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
        //if(this.arrayRows.length>1) this.selectedPage=1;
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


  getReservesUpdatestWells() {
    this.workprogram.getReservesUpdatestWells(this.genk.reportYear)
      .subscribe(res => {
        this.data = res as any[];
          if(this.data.length>1) this.selectedPage=1;
        this.isData = this.data.length > 0;
        let count = this.data.length;
        this.totalone = Math.round(this.report.sumColumn(this.data, 'total_Company_Reserves_Oil'));
        this.totaltwo = Math.round(this.report.sumColumn(this.data, 'total_Company_Reserves_Condensate'));
        this.cd.markForCheck();
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
