import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import 'chart.js';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5percent from "@amcharts/amcharts5/percent";
//import { isPlatformBrowser } from '@angular/common';


@Component({
    templateUrl: 'colum.html',
    styleUrls: ['../app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class Colum {
  @ViewChild('mychart', { static: false }) myChart: ElementRef<HTMLDivElement>;
  private root!: am5.Root;
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,

  };
  public pieChartLabels = [ [ 'Download Sales' ], [ 'In Store Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  //constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  // browserOnly(f: () => void) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.zone.runOutsideAngular(() => {
  //       f();
  //     });
  //   }
  // }

  ngAfterViewInit() {
    // Chart code goes in here
    //this.browserOnly(() => {
      // let root = am5.Root.new("chartdiv");

      // root.setThemes([am5themes_Animated.new(root)]);

      // let chart = root.container.children.push(
      //   am5xy.XYChart.new(root, {
      //     panY: false,
      //     layout: root.verticalLayout
      //   })
      // );

      // // Define data
      // let data = [
      //   {
      //     category: "Research",
      //     value1: 1000,
      //     value2: 588
      //   },
      //   {
      //     category: "Marketing",
      //     value1: 1200,
      //     value2: 1800
      //   },
      //   {
      //     category: "Sales",
      //     value1: 850,
      //     value2: 1230
      //   }
      // ];

      // // Create Y-axis
      // let yAxis = chart.yAxes.push(
      //   am5xy.ValueAxis.new(root, {
      //     renderer: am5xy.AxisRendererY.new(root, {})
      //   })
      // );

      // // Create X-Axis
      // let xAxis = chart.xAxes.push(
      //   am5xy.CategoryAxis.new(root, {
      //     renderer: am5xy.AxisRendererX.new(root, {}),
      //     categoryField: "category"
      //   })
      // );
      // xAxis.data.setAll(data);

      // // Create series
      // let series1 = chart.series.push(
      //   am5xy.ColumnSeries.new(root, {
      //     name: "Series",
      //     xAxis: xAxis,
      //     yAxis: yAxis,
      //     valueYField: "value1",
      //     categoryXField: "category"
      //   })
      // );
      // series1.data.setAll(data);

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

      // // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {}));
      // legend.data.setAll(chart.series.values);

      // // Add cursor
      // chart.set("cursor", am5xy.XYCursor.new(root, {}));

      // this.root = root;
      // let exporting = am5plugins_exporting.Exporting.new(root, {
      //   menu: am5plugins_exporting.ExportingMenu.new(root, {})
      // });


      var root = am5.Root.new(this.myChart.nativeElement);


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "base"
}));

// series.slices.template.adapters.add("fill", function (fill, target) {
//     return target.dataItem.dataContext["color"];
// });


// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  { value: 10, base: "Russsia", color: "#E7907E"},
  { value: 9, base: "USA", color: "green" },
  { value: 6, base: "UK", color: "#36D5EE" },
  { value: 5, base: "France", color: "orange" },
  { value: 4, base: "Finland", color: "#87D52F" },
  { value: 3, base: "Germany", color: "#BCABBE" },
  { value: 1, base: "Spain", color: "silver" },
]);


// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  marginTop: 15,
  marginBottom: 15
}));

legend.data.setAll(series.dataItems);


// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear(1000, 100);
let exporting = am5plugins_exporting.Exporting.new(root, {
menu: am5plugins_exporting.ExportingMenu.new(root, {})
});


    //});
  }

}
