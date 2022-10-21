import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService, ModalService } from 'src/app/services';
import { ReportService } from '../services/report.service';
import { WorkProgramService } from '../services/workprogram.service';

@Component({
  selector: 'app-ndr-report',
  templateUrl: './seismic-data-approved-previous.component.html',
  styleUrls: ['../reports/ndr-report.component.scss', './general-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudeProductionContractComponent implements OnInit {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  data: any[];

  selectedColumns: any[] = [];
    genk: GenericService;
    cdr: ChangeDetectorRef;
    title = 'PRODUCTION ON CONTRACT BASIS';
    reporttext: string;
    pagenum = 0;
    selectedPage = 1;
    arrayRows = [];
    listyear = [];
    isTableOpt = false;
    isSpecifyColumns = false;
    isChart = false;
    totalone = 0;
    totaltwo = 0;
    columnsArray: any[];


    constructor(private report: ReportService, private workprogram: WorkProgramService,
      private cd: ChangeDetectorRef, private gen: GenericService, private modalService: ModalService){
        this.genk = gen;
        //this.year = Number(this.genk.reportYear);
        this.cdr = cd;
        this.genk.sizePerPage = this.genk.sizeten;
        this.modalService.generalReport
        .subscribe(res => {
          this.getCrudeOilProduction();
        });
    }

    ngOnInit() {
      this.data = [];
      this.genk.sizePerPage = this.genk.sizeten;
      this.getCrudeOilProduction();
      //////get accessor columns prevents the checkbox clicks
    }

    public get pageIndex(): number {
        return (this.selectedPage - 1) * this.genk.sizePerPage;
    }

    public get tableTitle(): string {
      return `Crude Oil Production in bbls from ${Number(this.genk.reportYear) - 4} to ${this.genk.reportYear} on Contract Type`;
    }

    public get barone(): string {
      return `TOTAL ${this.genk.reportYear}`;
    }

    public get bartwo(): string {
      return `TOTAL ${Number(this.genk.reportYear) - 1}`;
    }

    public get columns(): any[] {
      this.columnsArray = [
        {
          "columnDef": "contract_Type",
          "header": "CONTRACT TYPE"
        },
        {
          "columnDef": `_${this.genk.reportYear}`,
          "header": `${this.genk.reportYear}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 1}`,
          "header": `${Number(this.genk.reportYear) - 1}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 2}`,
          "header": `${Number(this.genk.reportYear) - 2}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 3}`,
          "header": `${Number(this.genk.reportYear) - 3}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 4}`,
          "header": `${Number(this.genk.reportYear) - 4}`
        }
      ];
      return this.columnsArray;
    }

    public get repcolumns(): any[] {
      this.columnsArray= [
        {
          "columnDef": "contract_Type",
          "header": "CONTRACT TYPE"
        },
        {
          "columnDef": `_${this.genk.reportYear}`,
          "header": `${this.genk.reportYear}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 1}`,
          "header": `${Number(this.genk.reportYear) - 1}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 2}`,
          "header": `${Number(this.genk.reportYear) - 2}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 3}`,
          "header": `${Number(this.genk.reportYear) - 3}`
        },
        {
          "columnDef": `_${Number(this.genk.reportYear) - 4}`,
          "header": `${Number(this.genk.reportYear) - 4}`
        }
      ];
      return this.columnsArray;
    }

    public set columns(value) {
      this.columnsArray = value;
    }

    public set repcolumns(value) {
      this.columnsArray = value;
    }


      assignPageNum() {
        this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
      }

      assignDataRows() {
        this.arrayRows = this.data.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
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

  getCrudeOilProduction() {
    this.workprogram.getCrudeOilProduction(this.genk.reportYear)
      .subscribe(res => {
        this.data = res.crude_Oil_Production_By_ContractType_Pivotted as any[];
        this.data = this.data.slice(1, this.data.length);
        this.totalone = Math.round(this.report.sumColumn(this.data, `_${this.genk.reportYear}`));
        this.totaltwo = Math.round(this.report.sumColumn(this.data, `_${Number(this.genk.reportYear) - 1}`));
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
    debugger;
    if (checked) {
      let val = this.columnsArray.filter(x => x.columnDef == value)[0];
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
