import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { GenericService } from 'src/app/services';
import { WorkprogrammeReportService } from '../../services/workprogramme-report.service'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from "@amcharts/amcharts5/percent";
import { isPlatformBrowser } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-work-program-report',
  templateUrl: './work-program-report.component.html',
  styleUrls: ['./work-program-report.component.scss']
})
export class WorkProgramReportComponent implements OnInit {
  private root: am5.Root;
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox', { static: false }) myChartBox: ElementRef<HTMLDivElement>;
  genk: GenericService; cdr: ChangeDetectorRef;
  title = 'General Report';
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  data: any[];
  reportData: any[]
  currentSelectedYear: any = "";
  year = [];
  isBrowser: boolean;
  firstChartData: any;
  secondChartData: any;

  executiveSummary: string;
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
      "columnDef": "year_of_wp",
      "header": "YEAR"
    },
    {
      "columnDef": "has_annual_ndr_subscription_fee_been_paid",
      "header": "HAS ANNUAL NDR SUBSCRIPTION FEE BEEN PAID"
    },
    {
      "columnDef": "when_was_the_date_of_your_last_ndr_submission",
      "header": "WHEN WAS THE DATE OF YOUR LAST NDR SUBMISSION"
    },
    {
      "columnDef": "upload_ndr_payment_receipt",
      "header": "NDR PAYMENT RECEIPT"
    },
    {
      "columnDef": "are_you_up_to_date_with_your_ndr_data_submission",
      "header": "ARE YOU UP TO DATE WITH YOUR NDR DATA SUBMISSION"
    },
    {
      "columnDef": "consession_type",
      "header": "CONSESSION TYPE"
    }
  ]

  constructor(private report: WorkprogrammeReportService,
    private cd: ChangeDetectorRef,
    private gen: GenericService,
    @Inject(PLATFORM_ID) private platformId, private zone: NgZone
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.genk.sizePerPage = this.genk.sizeten;
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit() {
    $('#report').hide();
    $('#firstchart').hide();
    $('#secondchart').hide();
    this.data = [];
    this.yearList();
    this.genk.sizePerPage = this.genk.sizeten;
    //this.pagenum = Math.ceil(this.arrayOfObjects.length / this.genk.sizePerPage);
    //this.arrayRows = this.arrayOfObjects.slice(this.pageIndex, (this.pageIndex + this.genk.sizePerPage));
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

  fetchsummary(e) {
    let value = e.target.value;
    this.currentSelectedYear = value;
    this.report.fetch("general_summaryreport", value).subscribe(
      (res) => {
        this.data = res.data as any[];
        res.data.admiN_WORK_PROGRAM_REPORT_Model !== null ? this.executiveSummary = res.data.admiN_WORK_PROGRAM_REPORT_Model[0].report_Content : this.executiveSummary = ""
        this.cd.markForCheck();
        //this.resize('all')
      }
    );
    this.fetchreport(value)
    $('#report').show();
  }



  fetchreport(e) {
    let value = e
    this.currentSelectedYear = value;
    this.report.fetch("general_report", value).subscribe(
      (res) => {
        this.reportData = res.data as any[];
        this.firstChartData = res.data.oiL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_By_month_year;
        this.secondChartData = res.data.oiL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_OIL_PRODUCTION_CONTRACT_TYPE
        //this.sumOilProduction(this.firstChartData)
        this.firstChart();
        this.secondchart()
        this.cd.markForCheck();

      }
    )
  }

  yearList() {
    this.report.getYearList("reports_yearlist")
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
    let value = e
    if (value === 'all') {
      value = this.pagenum * this.genk.sizePerPage
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    if (this.isBrowser) {
      if (this.root) {
        this.root.dispose();
      }
    }
  }

  firstChart() {
    if (this.isBrowser) {
      am5.array.each(am5.registry.rootElements, function(root) {
        if (root.dom.id == "firstchart") {
          root.dispose();
        }
      });
      let root = am5.Root.new("firstchart");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: true,
          layout: root.verticalLayout
        })
      );

      let data = this.firstChartData
      data.length > 0 ? $('#firstchart').show() : $('#firstchart').hide()
      this.cd.markForCheck();
      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "production_month"
        })
      );
      xAxis.data.setAll(data);

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "annual_Total_Production_by_company",
          categoryXField: "production_month"
        })
      );
      series1.data.setAll(data);
      series1.columns.template.setAll({
        strokeOpacity: 0,
        shadowColor: am5.color(0x000000),
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4
      });

      // let series2 = chart.series.push(
      //   am5xy.ColumnSeries.new(root, {
      //     name: "Series",
      //     xAxis: xAxis,
      //     yAxis: yAxis,
      //     valueYField: "value2",
      //     categoryXField: "category"
      //   })
      // );
      // series2.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));
  

      this.root = root;
    }
  }

  secondchart() {
    if (this.isBrowser) {

      am5.array.each(am5.registry.rootElements, function(root) {
        if (root.dom.id == "secondchart") {
          root.dispose();
        }
      });
      // Create root and chart
      let root = am5.Root.new("secondchart");
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.gridLayout
        })
      );

      // Define data
      let data = this.secondChartData
      data.length > 0 ? $('#secondchart').show() : $('#secondchart').hide()

      // [{
      //   country: "France",
      //   sales: 100000
      // }, {
      //   country: "Spain",
      //   sales: 160000
      // }, {
      //   country: "United Kingdom",
      //   sales: 80000
      // }];

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "percentage_Production",
          categoryField: "contract_Type"
        })
      );
      series.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
      }));

      legend.data.setAll(series.dataItems);
    }
    
  }


//   sumOilProduction(data :any[]) {

// var dat  = [
//   {
//     category: "January",
//     value: 0
//   },
//   {
//     category: "February",
//     value: 0
//   },
//   {
//     category: "March",
//     value: 0
//   },
//   {
//     category: "April",
//     value: 0
//   },
//   {
//     category: "May",
//     value: 0
//   },
//   {
//     category: "June",
//     value: 0
//   },
//   {
//     category: "July",
//     value: 0
//   },
//   {
//     category: "August",
//     value: 0
//   },
//   {
//     category: "September",
//     value: 0
//   },
//   {
//     category: "October",
//     value: 0
//   },
//   {
//     category: "November",
//     value: 0
//   },
//   {
//     category: "December",
//     value: 0
//   }
  
// //   {
// //   "january":0,
// //   "february": 0,
// //   "march": 0,
// //   "april": 0,
// //   "may": 0,
// //   "june": 0,
// //   "july": 0,
// //   "august": 0,
// //   "september": 0,
// //   "october": 0,
// //   "november": 0,
// //   "december": 0
// // }
// ]

//     const length:number = data.length
//     for (let i = 0; i < length; i++) {
//       dat[0].value += data[i].january
//       dat[1].value += data[i].february
//       dat[2].value += data[i].march
//       dat[3].value += data[i].april
//       dat[4].value += data[i].may
//       dat[5].value += data[i].june
//       dat[6].value += data[i].july
//       dat[7].value += data[i].august
//       dat[8].value += data[0].september
//       dat[9].value += data[i].october
//       dat[10].value += data[i].november
//       dat[11].value += data[i].december
//     }
//     this.firstChartData = dat
//     this.cd.markForCheck()
//     $('#firstchart').show();
//   }
}
