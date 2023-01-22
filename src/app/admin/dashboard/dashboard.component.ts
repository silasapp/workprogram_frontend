import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { WorkprogrammeReportService } from '../../services/workprogramme-report.service';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { ReportService } from 'src/app/services/report.service';
import {
  AuthenticationService,
  GenericService,
  ModalService,
} from 'src/app/services';
import { CdkAriaLive } from '@angular/cdk/a11y';
import { CompanyService } from 'src/app/services/company.service';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import {
  CompanyDashboardBody,
  CompanyReportModel,
  DashboardGasBudgetAndReserveBody,
} from 'src/app/models/company-details';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin.service';
import { DashboardModel } from 'src/app/models/application-details';
declare var $: any;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../reports/ndr-report.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  genk: GenericService;
  @ViewChild('firstchart', { static: false })
  myfirstchart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox1', { static: false })
  myChartBox1: ElementRef<HTMLDivElement>;

  @ViewChild('secondchart', { static: false })
  mysecondchart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox2', { static: false })
  myChartBox2: ElementRef<HTMLDivElement>;

  @ViewChild('thirdchart', { static: false })
  mythirdchart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox3', { static: false })
  myChartBox3: ElementRef<HTMLDivElement>;

  @ViewChild('fourthchart', { static: false })
  myFourthchart: ElementRef<HTMLDivElement>;
  @ViewChild('mychartbox4', { static: false })
  myChartBox4: ElementRef<HTMLDivElement>;

  private root: am5.Root;
  pagenum = 0;
  selectedPage = 1;
  arrayRows = [];
  isBrowser: boolean;
  firstChartData: any;
  secondChartData: any;
  thirdChartData: any[];
  fourthChartData: any[];
  dashboardStuff: DashboardModel;
  adminservice: AdminService;
  c_ColumnHeader = [];
  c_ColumnValue = [];
  f_ColumnHeader = [];
  f_ColumnValue = [];
  c_isTabVisible: boolean;
  f_isTabVisible: boolean;
  previousYear = new Date().getFullYear() - 1;
  data: any;
  selectedColumns: any[] = [];
  isTableOpt = false;
  isSpecifyColumns = false;
  dashboardBody: CompanyDashboardBody = {} as CompanyDashboardBody;
  dashboardGasBudgetAndReserve: DashboardGasBudgetAndReserveBody =
    {} as DashboardGasBudgetAndReserveBody;
  modalService: ModalService;
  companyService: CompanyService;
  reportService: ReportService;
  auth: AuthenticationService;

  cdr: ChangeDetectorRef;

  columns = [
    {
      columnDef: 'concessionName',
      header: 'CONCESSION NAME',
    },
    {
      columnDef: 'totalNetProduction',
      header: 'TOTAL PRODUCTION',
    },

    {
      columnDef: 'totalReserves',
      header: 'TOTAL RESERVES',
    },
  ];

  repcolumns = [
    {
      columnDef: 'concessionName',
      header: 'CONCESSION NAME',
    },
    {
      columnDef: 'totalNetProduction',
      header: 'TOTAL PRODUCTION',
    },

    {
      columnDef: 'totalReserves',
      header: 'TOTAL RESERVES',
    },
  ];

  constructor(
    private gen: GenericService,
    private company: CompanyService,
    private report: ReportService,
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private genReport: ReportService
  ) {
    this.genk = gen;
    this.cdr = cd;
    this.auth = authenticationService;
    this.companyService = company;
    this.reportService = report;
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.getCompanyDashboardReport();
    this.getDashboardGasBudgetAndReserveDetails();
    // this.getCompanyProduction();
    // this.getCompanyConcessionProd();
    // this.getCompanyConcessionReserveOil();
    // this.getCompanyConcessionReserveGas();
    //
    this.fetchreportI();
    this.cd.markForCheck();
  }

  fetchreportI() {
    let value = this.previousYear - 1;
    // this.modalService.logCover("Loading data...", true);
    // this.companyService.getCompanyProd(value.toString()).subscribe((res) => {
    //     this.firstChartData = res;
    //   this.plotDoubleBarChartHorizontal(['month', 'prodMonth'], this.myChartBox1, this.firstChartData);
    //     this.cd.markForCheck();
    //   }
    // )
    this.reportService
      .getAdminChartData('GET_ADMIN_CHARTDATA', value)
      .subscribe((res) => {
        this.firstChartData = res.prodByMonth;
        this.secondChartData = res.reserveByContract.filter(
          (x) => x.contractType != null
        );
        this.thirdChartData = res.prodByTerrain.filter(
          (x) => x.terrain != null
        );
        this.fourthChartData = res.reserveByContract;

        //this.plotDoubleBarChart();
        //this.plotDoublePieChart();
        this.plotDoublePieChart(
          ['contractType', 'prod'],
          this.myChartBox2,
          this.secondChartData
        );
        this.plotDoubleBarChartHorizontal(
          ['month', 'prodMonth'],
          this.myChartBox1,
          this.firstChartData
        );
        //this.plotDoubleBarChartHorizontal(['terrain', 'reserve'], this.myChartBox3, this.thirdChartData);
        this.plotDoublePieChart(
          ['terrain', 'prodMonth'],
          this.myChartBox3,
          this.thirdChartData
        );

        // this.plotDoubleBarChartHorizontal();
        this.modalService.togCover();
        this.cd.markForCheck();
      });
  }

  // fetchreport() {
  //   let value = 2021;
  //   this.modalService.logCover("Loading data...", true);
  //   this.firstChartData = this.dashboardBody.companyReportModels as CompanyReportModel[];
  //   this.secondChartData = this.dashboardBody.companyReportModels as CompanyReportModel[];
  //   //this.thirdChartData = res.data.oiL_CONDENSATE_PRODUCTION_BY_TERRAIN
  //   // this.plotDoubleBarChart();
  //   // this.plotDoublePieChart();
  //   // this.plotDoubleBarChartHorizontal();
  //   this.modalService.togCover();
  //   this.cd.markForCheck();

  // }
  getDashboardStuff() {
    this.adminservice.getDashboardStuff().subscribe((res) => {
      this.dashboardStuff = res;
    });
  }
  // firstChart() {
  //
  //   if (this.isBrowser) {
  //     am5.array.each(am5.registry.rootElements, function(root) {
  //       if (root.dom.id == "firstchart") {
  //         root.dispose();
  //       }
  //     });
  //     let root = am5.Root.new("firstchart");

  //     root.setThemes([am5themes_Animated.new(root)]);

  //     let chart = root.container.children.push(
  //       am5xy.XYChart.new(root, {
  //         panY: true,
  //         layout: root.verticalLayout
  //       })
  //     );

  //     let data = this.firstChartData;
  //     data.length > 0 ? $('#firstchart').show() : $('#firstchart').hide();
  //     // Create Y-axis
  //     let yAxis = chart.yAxes.push(
  //       am5xy.ValueAxis.new(root, {
  //         renderer: am5xy.AxisRendererY.new(root, {})
  //       })
  //     );

  //     // Create X-Axis
  //     let xAxis = chart.xAxes.push(
  //       am5xy.CategoryAxis.new(root, {
  //         renderer: am5xy.AxisRendererX.new(root, {}),
  //         categoryField: "production_month"
  //       })
  //     );
  //     xAxis.data.setAll(data);

  //     // Create series
  //     let series1 = chart.series.push(
  //       am5xy.ColumnSeries.new(root, {
  //         name: "Series",
  //         xAxis: xAxis,
  //         yAxis: yAxis,
  //         valueYField: "annual_Total_Production_by_company",
  //         categoryXField: "production_month"
  //       })
  //     );
  //     series1.data.setAll(data);
  //     series1.columns.template.setAll({
  //       strokeOpacity: 0,
  //       shadowColor: am5.color(0x000000),
  //       shadowBlur: 10,
  //       shadowOffsetX: 4,
  //       shadowOffsetY: 4
  //     });

  //     // let series2 = chart.series.push(
  //     //   am5xy.ColumnSeries.new(root, {
  //     //     name: "Series",
  //     //     xAxis: xAxis,
  //     //     yAxis: yAxis,
  //     //     valueYField: "value2",
  //     //     categoryXField: "category"
  //     //   })
  //     // );
  //     // series2.data.setAll(data);

  //     // Add legend
  //     let legend = chart.children.push(am5.Legend.new(root, {}));
  //     legend.data.setAll(chart.series.values);

  //     // Add cursor
  //     chart.set("cursor", am5xy.XYCursor.new(root, {}));
  //     this.root = root;
  //   }
  // }

  // secondchart() {
  //   debugger
  //   if (this.isBrowser) {
  //     am5.array.each(am5.registry.rootElements, function(root) {
  //       if (root.dom.id == "secondchart") {
  //         root.dispose();
  //       }
  //     });
  //     // Create root and chart
  //     let root = am5.Root.new("secondchart");
  //     let chart = root.container.children.push(
  //       am5percent.PieChart.new(root, {
  //         layout: root.gridLayout
  //       })
  //     );

  //     // Define data
  //     let data = this.secondChartData
  //     data.length > 0 ? $('#secondchart').show() : $('#secondchart').hide()

  //     // Create series
  //     let series = chart.series.push(
  //       am5percent.PieSeries.new(root, {
  //         name: "Series",
  //         valueField: "percentage_Production",
  //         categoryField: "contract_Type"
  //       })
  //     );
  //     series.data.setAll(data);

  //     // Add legend
  //     let legend = chart.children.push(am5.Legend.new(root, {
  //       centerX: am5.percent(50),
  //       x: am5.percent(50),
  //       layout: root.horizontalLayout
  //     }));

  //     legend.data.setAll(series.dataItems);
  //   }

  // }

  // thirdchart() {
  //   debugger
  //   if (this.isBrowser) {
  //     am5.array.each(am5.registry.rootElements, function(root) {
  //       if (root.dom.id == "thirdchart") {
  //         root.dispose();
  //       }
  //     });
  //     // Create root and chart
  //     let root = am5.Root.new("thirdchart");
  //     let chart = root.container.children.push(
  //       am5percent.PieChart.new(root, {
  //         layout: root.gridLayout
  //       })
  //     );

  //     // Define data
  //     let data = this.thirdChartData
  //     data.length > 0 ? $('#thirdchart').show() : $('#thirdchart').hide()

  //     // Create series
  //     let series = chart.series.push(
  //       am5percent.PieSeries.new(root, {
  //         name: "Series",
  //         valueField: "percentage_Production",
  //         categoryField: "terrain"
  //       })
  //     );
  //     series.data.setAll(data);

  //     // Add legend
  //     let legend = chart.children.push(am5.Legend.new(root, {
  //       centerX: am5.percent(50),
  //       x: am5.percent(50),
  //       layout: root.horizontalLayout
  //     }));

  //     legend.data.setAll(series.dataItems);
  //   }

  // }

  getCompanyDashboardReport() {
    let value = (this.previousYear - 1).toString();
    this.companyService.getdashboardreport(value).subscribe((res) => {
      this.dashboardBody = res as CompanyDashboardBody;
      //let resse = res;
      //this.fetchreport();
      this.cd.markForCheck();
    });
  }

  getCompanyProduction() {
    let value = this.previousYear.toString();
    this.companyService.getCompanyProd(value).subscribe((res) => {
      this.firstChartData = res;
      this.plotDoubleBarChartHorizontal(
        ['month', 'prodMonth'],
        this.myChartBox1,
        this.firstChartData
      );
      this.cd.markForCheck();
    });
  }

  getCompanyConcessionProd() {
    let value = this.previousYear.toString();
    this.companyService.getCompanyConcessionProd(value).subscribe((res) => {
      this.secondChartData = res;

      this.plotDoublePieChart(
        ['omlname', 'prod'],
        this.myChartBox2,
        this.secondChartData
      );
      this.cd.markForCheck();
    });
  }

  getCompanyConcessionReserveOil() {
    let value = this.previousYear.toString();
    this.companyService
      .getCompanyConcessionReserveOil(value)
      .subscribe((res) => {
        this.thirdChartData = res;

        this.plotDoubleBarChartHorizontal(
          ['omlname', 'reserve'],
          this.myChartBox3,
          this.thirdChartData
        );
        this.cd.markForCheck();
      });
  }

  getCompanyConcessionReserveGas() {
    let value = this.previousYear.toString();
    this.companyService
      .getCompanyConcessionReserveGas(value)
      .subscribe((res) => {
        this.fourthChartData = res;

        this.plotDoubleBarChartHorizontal(
          ['omlname', 'reserve'],
          this.myChartBox4,
          this.fourthChartData
        );
        this.cd.markForCheck();
      });
  }

  getDashboardGasBudgetAndReserveDetails() {
    let value = (this.previousYear - 1).toString();
    this.companyService
      .getdashboardgasbudgetandreserve(value)
      .subscribe((res) => {
        this.dashboardGasBudgetAndReserve =
          res as DashboardGasBudgetAndReserveBody;
        this.cd.markForCheck();
      });
  }

  onSubmit() {
    return null;
  }

  plotDoublePieChart(
    selectedColumn: any[],
    chartBox: ElementRef<HTMLDivElement>,
    numData
  ) {
    chartBox.nativeElement.removeChild(chartBox.nativeElement.firstChild);
    const node = document.createElement('div');
    node.style.width = '100%';
    node.style.height = '450px';
    chartBox.nativeElement.appendChild(node);
    let bechart = chartBox.nativeElement.firstChild as HTMLDivElement;
    let sele1 = selectedColumn[0];
    let sele2 = selectedColumn[1];

    chartBox.nativeElement.style.display = 'block';
    let reportdata = numData;
    let chartdata = this.genReport.formatChartData(reportdata, sele1, sele2);
    this.genReport.plotDoublePieChart(bechart, sele1, sele2, chartdata);
  }

  plotDoubleBarChartHorizontal(
    selectedColumn: any[],
    chartBox: ElementRef<HTMLDivElement>,
    numData
  ) {
    let totalString = '';
    // plotDoubleBarChartHorizontal(selectedColumn: any[], chartBox: ElementRef<HTMLDivElement>, numData) {
    // let totalString = "";
    chartBox.nativeElement.removeChild(chartBox.nativeElement.firstChild);
    const node = document.createElement('div');
    node.style.width = '100%';
    node.style.height = '450px';
    chartBox.nativeElement.appendChild(node);
    let bechart = chartBox.nativeElement.firstChild as HTMLDivElement;
    let sele1 = selectedColumn[0];
    let sele2 = selectedColumn[1];

    chartBox.nativeElement.style.display = 'block';
    let reportdata = numData;
    //let chartdata = this.firstChartData;
    let chartdata = this.genReport.formatChartData(
      reportdata,
      selectedColumn[0],
      selectedColumn[1]
    );
    for (var i = 0; i < chartdata.length; i++) {
      totalString += chartdata[i].base;
    }

    if (totalString.length > 50) {
      this.genReport.plotDoubleBarChartHorizontal(
        bechart,
        selectedColumn[0],
        selectedColumn[1],
        chartdata
      );
    } else {
      this.genReport.plotDoubleBarChart(
        bechart,
        selectedColumn[0],
        selectedColumn[1],
        chartdata
      );
    }
  }

  // plotDoubleBarChart() {
  //
  //   let totalString = "";
  //   let selectedColumn = ['terrain', 'percentage_Production'];
  //     // this.myChartBox1.nativeElement.removeChild(this.myChartBox1.nativeElement.firstChild);
  //     // const node = document.createElement("div");
  //     // node.style.width = '100%';
  //     // node.style.height = '500px';
  //     // this.myChartBox1.nativeElement.appendChild(node);
  //     // let bechart = this.myChartBox1.nativeElement.firstChild as HTMLDivElement;
  //     // let sele1 = selectedColumn[0];
  //     // let sele2 = selectedColumn[1];

  //     //this.myChartBox1.nativeElement.style.display = 'block';

  //   //  let chartdata = this.thirdChartData.filter(x => x.terrain != null);
  //       //let chartdata = this.genReport.formatChartData(reportdata, selectedColumn[0], selectedColumn[1]);
  //     //   for (var i = 0; i < chartdata.length; i++) {
  //     //     totalString += chartdata[i].production_month;

  //     //   if (totalString.length > 70) {
  //    // this.designDoubleBarChart(this.mythirdchart.nativeElement, selectedColumn[0], selectedColumn[1], chartdata);
  //     //   }
  //     //   else {
  //     //     this.designDoubleBarChart(this.myChartBox1.nativeElement, selectedColumn[0], selectedColumn[1], chartdata);
  //     //   }
  //     // }

  // }

  designDoublePieChart(
    chartdiv: HTMLDivElement,
    categoryfield: string,
    valuefield: string,
    data: any[]
  ) {
    var root = am5.Root.new(chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'totalReserves',
        categoryField: 'concessionName',
      })
    );

    // series.slices.template.adapters.add("fill", function (fill, target) {
    //     return target.dataItem.dataContext["color"];
    // });

    series.data.setAll(data);

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
  }

  designDoubleBarChartHorizontal(
    chartdiv: HTMLDivElement,
    categoryfield: string,
    valuefield: string,
    data: any[]
  ) {
    //
    var root = am5.Root.new(chartdiv);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30,
    });

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
        categoryField: categoryfield,
        tooltip: am5.Tooltip.new(root, { themeTags: ['axis'] }),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );
    yAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: valuefield,
        categoryYField: categoryfield,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'left',
          labelText: '{valueX}',
        }),
      })
    );
    series1.data.setAll(data);

    series1.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
    });

    // Make each column to be of a different color
    series1.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
    });

    series1.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
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
    // let legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    //this.root = root;
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    // var legend = chart.children.push(am5.Legend.new(root, {
    //   centerX: am5.percent(50),
    //   x: am5.percent(50),
    //   marginTop: 15,
    //   marginBottom: 15
    // }));

    // legend.data.setAll(series1.dataItems);

    //   var root = am5.Root.new(chartdiv);

    //   root.setThemes([
    //     am5themes_Animated.new(root)
    //   ]);

    //   var chart = root.container.children.push(am5percent.PieChart.new(root, {
    //     layout: root.verticalLayout
    //   }));

    //   var series = chart.series.push(am5percent.PieSeries.new(root, {
    //     valueField: "value",
    //     categoryField: 'base'
    //   }));

    // // series.slices.template.adapters.add("fill", function (fill, target) {
    // //     return target.dataItem.dataContext["color"];
    // // });

    //   series.data.setAll(data);

    //   var legend = chart.children.push(am5.Legend.new(root, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     marginTop: 15,
    //     marginBottom: 15
    //   }));

    //   legend.data.setAll(series.dataItems);

    //   series.appear(1000, 100);
    //   let exporting = am5plugins_exporting.Exporting.new(root, {
    //     menu: am5plugins_exporting.ExportingMenu.new(root, {})
    //   });
  }

  designDoubleBarChart(
    chartdiv: HTMLDivElement,
    categoryfield: string,
    valuefield: string,
    data: any[]
  ) {
    var root = am5.Root.new(chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    var xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        renderer: xRenderer,
        categoryField: 'terrain',
        tooltip: am5.Tooltip.new(root, { themeTags: ['axis'] }),
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'percentage_Production',
        categoryXField: 'terrain',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'left',
          labelText: '{valueY}',
        }),
      })
    );
    series1.data.setAll(data);

    series1.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
    });

    // Make each column to be of a different color
    series1.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
    });

    series1.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
    });

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    //this.root = root;
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
  }

  public get pageIndex(): number {
    return (this.selectedPage - 1) * this.genk.sizePerPage;
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

  assignPageNum() {
    this.pagenum = Math.ceil(this.data.length / this.genk.sizePerPage);
  }

  assignDataRows() {
    this.arrayRows = this.data.slice(
      this.pageIndex,
      this.pageIndex + this.genk.sizePerPage
    );
    this.cd.markForCheck();
  }

  resize(e) {
    let value = e.target.value;
    if (value === 'all') {
      value = this.pagenum * this.genk.sizePerPage;
    }
    this.genk.sizePerPage = Number(value);
    this.assignDataRows();
    this.assignPageNum();
    this.cd.markForCheck();
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
      let val = this.repcolumns.filter((x) => x.columnDef == value)[0];
      this.selectedColumns.push(val);
    } else {
      let remainingArr = this.selectedColumns.filter(
        (x) => x.columnDef != value
      );
      this.selectedColumns = remainingArr;
    }
    this.cd.markForCheck;
  }

  selectColumns() {
    this.columns = this.selectedColumns;
    this.isSpecifyColumns = false;
    this.cd.markForCheck();
  }

  Alert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay',
    });
  }

  // plotDoublePieChart() {
  //   if (this.selectedColumns.length > 2) {
  //     alert('Can not plot this chart');
  //   }
  //   else {
  //
  //     this.myChartBox.nativeElement.removeChild(this.myChartBox.nativeElement.firstChild);
  //     const node = document.createElement("div");
  //     node.style.width = '100%';
  //     node.style.height = '500px';
  //     this.myChartBox.nativeElement.appendChild(node);
  //     let bechart = this.myChartBox.nativeElement.firstChild as HTMLDivElement;
  //     let sele1 = this.selectedColumns[0].columnDef;
  //     let sele2 = this.selectedColumns[1].columnDef;

  //     this.myChartBox.nativeElement.style.display = 'block';
  //     if (this.selectedColumns.length === 2) {
  //       let reportdata = this.data;
  //       let chartdata = this.report.formatChartData(reportdata, sele1, sele2);
  //       this.report.plotDoublePieChart(bechart, sele1, sele2, chartdata)
  //     }
  //   }
  //}
}
