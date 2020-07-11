import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export class ChartXYBase<X extends am4charts.Axis, Y extends am4charts.Axis, S extends am4charts.XYSeries>  {
    protected chart: am4charts.XYChart;

    init(div: string) {
        this.chart = am4core.create(div, am4charts.XYChart);
    }

    setData(data: any) {
        this.chart.data = data;
    }

    addData(data: any) {
        this.chart.addData(data);
    }

    addXAxis(axis: X) {
        return this.chart.xAxes.push(axis);
    }

    addYAxis(axis: Y) {
        return this.chart.yAxes.push(axis);
    }

    addSeries(series: S, serieX: string, serieY: string) {
        const seriesData = this.chart.series.push(series);
        seriesData.dataFields.valueX = serieX;
        seriesData.dataFields.valueY = serieY;
        return seriesData;
    }
    
    dispose() {
        this.chart.dispose();
    }
    


}