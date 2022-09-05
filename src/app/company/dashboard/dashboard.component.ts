import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { WorkprogrammeReportService } from '../../services/workprogramme-report.service'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from "@amcharts/amcharts5/percent";
import { isPlatformBrowser } from '@angular/common';
declare var $: any;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private root: am5.Root;
  isBrowser: boolean;
  firstChartData: any;
  secondChartData: any;
  thirdChartData: any;
  fourthChartData: any

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private report: WorkprogrammeReportService,) {
    this.isBrowser = isPlatformBrowser(platformId)
   }

  ngOnInit(): void {
  }
ngAfterViewInit(){
  this.fetchreport()
}
  ngOnDestroy() {
    // Clean up chart when the component is removed
    if (this.isBrowser) {
      if (this.root) {
        this.root.dispose();
      }
    }
  }

  fetchreport() {
    let value = 2021
    this.report.fetch("general_report", value).subscribe(
      (res) => {
        this.firstChartData = res.data.oiL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_By_month_year;
        this.secondChartData = res.data.oiL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_OIL_PRODUCTION_CONTRACT_TYPE
        this.thirdChartData = res.data.oiL_CONDENSATE_PRODUCTION_ACTIVITIES_monthly_Activities_OIL_PRODUCTION_by_Terrain
        this.firstChart()
        this.secondchart()
        this.thirdchart()
      }

    )

  }

  firstChart() {
    if (this.isBrowser) {
      debugger;
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

  thirdchart() {
    if (this.isBrowser) {
      am5.array.each(am5.registry.rootElements, function(root) {
        if (root.dom.id == "thirdchart") {
          root.dispose();
        }
      });
      // Create root and chart
      let root = am5.Root.new("thirdchart");
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.gridLayout
        })
      );

      // Define data
      let data = this.thirdChartData
      data.length > 0 ? $('#thirdchart').show() : $('#thirdchart').hide()



      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "percentage_Production",
          categoryField: "terrain"
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


  onSubmit(){
    return null;
  }

}
