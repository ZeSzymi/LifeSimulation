import { ChartXYBase } from "../chartXYBase";
import { ValueAxis, LineSeries } from "@amcharts/amcharts4/charts";
import { BacteriasSubjectModel } from "../../models/bacteria";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as _ from "lodash";

export class PyramidChart extends ChartXYBase<ValueAxis, ValueAxis, LineSeries> {
    public chartDiv: HTMLElement;

    constructor(data: BacteriasSubjectModel) {
        super();
        this.chartDiv = document.getElementById('pyramid-chart')
        this.init('pyramid-chart');
        this.chart.numberFormatter.numberFormat = "#.#s";
        const xAxis = this.initXAxis();
        this.initYAxis();
        this.initSeries(xAxis);
        this.setData(
            _.chain(data.alive.concat(data.dead))
                .groupBy(b => b.DNA.size)
                .map((bacterias, k) =>
                    ({
                        size: k,
                        alive: (bacterias.filter(b => b.isDead === false).length * -1),
                        dead: bacterias.filter(b => b.isDead === true).length 
                    })).value()
        )
    }

    initYAxis() {
        let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "size";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        return categoryAxis;
    }

    initXAxis() {
        let valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.extraMin = 0.1;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.minGridDistance = 40;
        valueAxis.renderer.ticks.template.length = 20;
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            return text == "alive" || text == "dead" ? text : text;
        })
        return valueAxis;
    }

    initSeries(valueAxis) {
        let alive = this.chart.series.push(new am4charts.ColumnSeries());
        alive.dataFields.valueX = "alive";
        alive.dataFields.categoryY = "size";
        alive.clustered = false;

        let aliveLabel = alive.bullets.push(new am4charts.LabelBullet());
        aliveLabel.label.text = "{valueX}%";
        aliveLabel.label.hideOversized = false;
        aliveLabel.label.truncate = false;
        aliveLabel.label.horizontalCenter = "right";
        aliveLabel.label.dx = -20;

        let dead = this.chart.series.push(new am4charts.ColumnSeries());
        dead.dataFields.valueX = "dead";
        dead.dataFields.categoryY = "size";
        dead.clustered = false;

        let deadLabel = dead.bullets.push(new am4charts.LabelBullet());
        deadLabel.label.text = "{valueX}%";
        deadLabel.label.hideOversized = false;
        deadLabel.label.truncate = false;
        deadLabel.label.horizontalCenter = "left";
        deadLabel.label.dx = 20;

        let aliveRange = valueAxis.axisRanges.create();
        aliveRange.value = -20;
        aliveRange.endValue = 0;
        aliveRange.label.text = "alive";
        aliveRange.label.fill = this.chart.colors.list[0];
        aliveRange.label.dy = 20;
        aliveRange.label.fontWeight = '600';
        aliveRange.grid.strokeOpacity = 1;
        aliveRange.grid.stroke = alive.stroke;

        let deadRange = valueAxis.axisRanges.create();
        deadRange.value = 0;
        deadRange.endValue = 20;
        deadRange.label.text = "dead";
        deadRange.label.fill = this.chart.colors.list[1];
        deadRange.label.dy = 20;
        deadRange.label.fontWeight = '600';
        deadRange.grid.strokeOpacity = 1;
        deadRange.grid.stroke = dead.stroke;
    }
}