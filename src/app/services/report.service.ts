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
  exporting: any;
  seismicApprovedTable: any;
  seismicApprovedChart: string;
  seismicApprovedIsChart = false;
  seismicApprovedSelectedColumns = [];

  seismicActivitiesTable: any;
  seismicActivitiesChart: any;
  seismicActivitiesIsChart = false;
  seismicActivitiesSelectedColumns = [];
  seismicActivitiesText: string;

  seismicActivities2yrsTable: any;
  seismicActivities2yrsChart: any;
  seismicActivities2yrsIsChart = false;
  seismicActivities2yrsSelectedColumns = [];

  seismicProcessingTable: any;
  seismicProcessingChart: any;
  seismicProcessingIsChart = false;
  seismicProcessingSelectedColumns = [];

  seismicProcessingPreviousTable: any;
  seismicProcessingPreviousChart: any;
  seismicProcessingPreviousIsChart = false;
  seismicProcessingPreviousSelectedColumns = [];

  explorationWellsTable: any;
  explorationWellsChart: any;
  explorationWellsIsChart = false;
  explorationWellsSelectedColumns = [];


  constructor( private http: HttpClient, private gen: GenericService) { }

fetch(url, year){
  return this.http.get<any>(`${environment.apiUrl}/report/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
   //response.data = this.gen.lowerArray(response.data);
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

getAdminChartData(url, year){
  return this.http.get<any>(`${environment.apiUrl}/dashboard/${url}`,{params:{year: year}})
  .pipe(retry(this.num),
  map((response) => {
    //response.data = this.gen.lowerArray(response.data);
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

async plotDoublePieChart(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]) {
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

  return this.chartTimeout(exporting);
}

async plotDoubleBarChartHorizontal(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]): Promise<string>  {
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

      return await exporting.export('png');

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

async plotDoubleBarChart(chartdiv: HTMLDivElement, categoryfield: string, valuefield: string, data: any[]): Promise<string> {
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

      return await exporting.export('png');
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
  this.baselist = [];
  this.valuelist = [];
  let arr = this.chartArray;
  this.chartArray = [];
  return arr;
}

compressReportData(data: any[], baseval: string) {

  let valist: any[] = [];
  let keyArray = Object.keys(data[0]);
  let objData: any;

  for (var list of data) {
    this.baselist.push(list[baseval]);
  }
  debugger;
  this.baselist = Array.from(new Set(this.baselist));
  let obj = new Object();

  for (var i = 0; i < this.baselist.length; i++) {
    //obj[this.baselist[i]] = this.baselist[i];
    let valarray = data.filter(x => x[baseval] == this.baselist[i]);

    for (var c = 0; c < keyArray.length; c++) {
      if (keyArray[c] != baseval) {
        for (var item of valarray) {
          valist.push(item[keyArray[c]]);
        }

        let isNumber = valist.every(x => {
          return typeof x === 'number';
        });

        if (isNumber) {
          objData = this.sumArray(valist);
          //this.valuelist.push(this.sumArray(valist))
        } else {
          objData = valist.length;
        }
        obj[keyArray[c]] = objData;
        valist = [];
      }
    }
    debugger;
    obj[baseval] = this.baselist[i];
    this.chartArray.push(obj);

    //debugger;
    valist = [];
    obj = new Object();
  }
  debugger;
  this.baselist = [];
  this.valuelist = [];
  let arr = this.chartArray;
  this.chartArray = [];
  return arr;
}

compressReportDataArray(data: any[], baseval: string) {

  let valist: any[] = [];
  let keyArray = Object.keys(data[0]);
  let objData: any;

  for (var list of data) {
    this.baselist.push(list[baseval]);
  }

  this.baselist = Array.from(new Set(this.baselist));
  let obj = [];

  for (var i = 0; i < this.baselist.length; i++) {
    //obj[this.baselist[i]] = this.baselist[i];
    let valarray = data.filter(x => x[baseval] == this.baselist[i]);

    for (var c = 0; c < keyArray.length; c++) {
      //if (keyArray[c] != baseval) {
        for (var item of valarray) {
          valist.push(item[keyArray[c]]);
        }

        let isNumber = valist.every(x => {
          return typeof x === 'number';
        });

        if (isNumber) {
          objData = this.sumArray(valist);
          //this.valuelist.push(this.sumArray(valist))
        } else {
          objData = valist.length;
        }
        obj.push(objData);
        valist = [];
      //}
    }

    obj[0] = this.baselist[i];
    this.chartArray.push(obj);

    //debugger;
    valist = [];
    obj = [];
  }
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

truncateArray(data: any[], columns: any[]) {
  let obj = new Object();
  let arr = [];
  for (var a = 0; a < data.length; a++) {
    for (var i = 0; i < columns.length; i++) {
      obj[columns[i].columnDef] = data[a][columns[i].columnDef];
      //let two = data[i][columns[i].columnDef];
      //obj[i][columns[i].columnDef] = data[i][columns[i].columnDef];
      //let obj = { columns[i].columnDef: data[i][columns[i].columnDef]}
    }
    arr.push(obj);
    obj = {};
  }
  arr = arr.filter(x => !x.companyName.toLocaleLowerCase().startsWith('test'))
  return arr;
}

truncateArray2(data: any[], columns: any[]) {
  data = data.filter(x => !x.companyName.toLocaleLowerCase().startsWith('test'))
  let obj = [];
  let arr = [];
  for (var a = 0; a < data.length; a++) {
    for (var i = 0; i < columns.length; i++) {
      obj.push(data[a][columns[i].columnDef]);
      //let two = data[i][columns[i].columnDef];
      //obj[i][columns[i].columnDef] = data[i][columns[i].columnDef];
      //let obj = { columns[i].columnDef: data[i][columns[i].columnDef]}
    }
    arr.push(obj);
    obj = [];
  }

  return arr;
}

truncateHeader(data: any[]) {
  let new_list = data.map(function(obj) {return obj.header});
  return new_list;
  // return {
  //   id: obj.id,
  //   order_number: obj.order_number,
  //   weight: obj.weight
  // }
}

totalFromArray(data: any[], baseval: string) {
 let baseArr = [];
  for (var list of data) {
    baseArr.push(Number(list[baseval]));
  }
  return this.sumArray(baseArr)
}

async chartTimeout(exporting: any): Promise<string> {

  return new Promise(async function(res, err){
    let myExport;
    let p = new Promise(function(res, err){
        setTimeout( async function(){
            myExport = await exporting.export('png');
            res(myExport);
        }, 400)
    })
    p.then(function(x){
        console.log(x);
        res(myExport);
    })


});

}

}
