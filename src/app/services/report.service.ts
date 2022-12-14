import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators'
import { GenericService } from './generic.services';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am5percent from "@amcharts/amcharts5/percent";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private num  = 2;
  baselist: any[] = [];
  valuelist: any[] = [];
  chartArray: any[] = [];

  constructor( private http: HttpClient, private gen: GenericService) { }

fetch(url, year){
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
   response.data = this.gen.lowerArray(response.data);
    return response
  })
  )
}


performanceEvaluation(url, year){
  return this.http.get<any>(`${environment.apiUrl}/workprogramme/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
    response.data = this.gen.lowerArray(response.data);
    return response
  })
  )
}


getYearList(url){
  url = 'reports_yearlist';
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`)
  .pipe(retry(this.num)
  )
}

getExecutiveReport(year: string){
  return this.http.get<any>(`${environment.apiUrl}/report/Get_General_SummaryReport`, {params: {year: year}})
  .pipe(retry(this.num)
  )
}

plotDoublePieChart(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]) {
  var root = am5.Root.new(chartdiv);

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }));

  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: 'base'
  }));

// series.slices.template.adapters.add("fill", function (fill, target) {
//     return target.dataItem.dataContext["color"];
// });

  series.data.setAll(data);

  // var legend = chart.children.push(am5.Legend.new(root, {
  //   centerX: am5.percent(50),
  //   x: am5.percent(50),
  //   marginTop: 15,
  //   marginBottom: 15
  // }));

  // if (data.length < 21) {
  //   legend.data.setAll(series.dataItems);
  // }



  series.appear(1000, 100);
  let exporting = am5plugins_exporting.Exporting.new(root, {
    menu: am5plugins_exporting.ExportingMenu.new(root, {})
  });
}

plotDoubleBarChartHorizontal(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]) {
  var root = am5.Root.new(chartdiv);

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      var yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 30
      })

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          renderer: yRenderer,
          categoryField: "base",
          tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
        })

      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {})
        })
      );
      yAxis.data.setAll(data);


      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          categoryYField: "base",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueX}"
          })
        })
      );
      series1.data.setAll(data);

      series1.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5
      });

      // Make each column to be of a different color
      series1.columns.template.adapters.add("fill", function(fill, target) {
        return chart.get("colors").getIndex(series1.columns.indexOf(target));
      });

      series1.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series1.columns.indexOf(target));
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
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      //this.root = root;
      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {})
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

plotDoubleBarChart(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]) {
  var root = am5.Root.new(chartdiv);

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30
      })

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          renderer: xRenderer,
          categoryField: "base",
          tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
        })
      );
      xAxis.data.setAll(data);


      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "base",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueY}"
          })
        })
      );
      series1.data.setAll(data);

      series1.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5
      });

      // Make each column to be of a different color
      series1.columns.template.adapters.add("fill", function(fill, target) {
        return chart.get("colors").getIndex(series1.columns.indexOf(target));
      });

      series1.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series1.columns.indexOf(target));
      });

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      //this.root = root;
      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {})
      });
}

formatChartData(data: any[], baseval: string, valtype: string) {

  let valist: any[] = [];

  for (var list of data) {
    this.baselist.push(list[baseval]);
  }
  this.baselist = Array.from(new Set(this.baselist));

  for (var i = 0; i < this.baselist.length; i++) {
    let valarray = data.filter(x => x[baseval] == this.baselist[i]);

    for (var item of valarray) {
      valist.push(item[valtype]);
    }

    let isNumber = valist.every(x => {
      return typeof x === 'number';
    });

    if (isNumber) {
      let mee = this.sumArray(valist);
      this.valuelist.push(this.sumArray(valist))
    } else {
      this.valuelist.push(valist.length)
    }


    this.chartArray.push({ base: this.baselist[i], value: this.valuelist[i] });
    //debugger;
    valist = [];
  }
  debugger;
  this.baselist = [];
  this.valuelist = [];
  let arr = this.chartArray;
  this.chartArray = [];
  return arr;
}

sumArray(arr: any[]) {
  var total = 0;
  for (var i in arr) {
    total += arr[i];
  }
  return total;
}

sumColumn(items: any[], columnName: string) {
  //debugger;
  var total = 0;
  for (var item in items) {
    if (!isNaN(items[item][columnName] && parseFloat(items[item][columnName])) ) {
      total += Number(items[item][columnName]);
    }
  }
  return total;
}

arrangeDate(mydata: any[], columnName: string) {
  let i = 0;
  while (i < mydata.length) {
    let datePipe = new DatePipe("en-US");
    mydata[i][columnName] = datePipe.transform(mydata[i][columnName], 'dd MMM, y');
    i++;
  }
  return mydata;
}

addSn(data: any[]) {
  for (var i = 0; i < data.length; i++) {
    data[i].sn = i + 1;
  }
  return data;
}

}
