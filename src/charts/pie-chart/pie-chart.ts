import { BacteriasSubjectModel } from "../../models/bacteria";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as _ from "lodash";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export class PieChart {
    public chartDiv: HTMLElement;
    private chart: am4charts.PieChart;

    constructor(data: BacteriasSubjectModel) {
        am4core.useTheme(am4themes_animated);
        this.chartDiv = document.getElementById('column-chart')
        this.chart = am4core.create("column-chart", am4charts.PieChart);
        this.initSeries();
        this.chart.data = _.chain(data.alive.concat(data.dead))
            .groupBy(b => b.DNA.size)
            .map((b, k) => ({
                size: `Size: ${k}`,
                amount: b.length
            })).value()

    }

    initSeries() {
        let pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "amount";
        pieSeries.dataFields.category = "size";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        this.chart.hiddenState.properties.radius = am4core.percent(0);
    }

    dispose() {
        this.chart.dispose();
    }
}