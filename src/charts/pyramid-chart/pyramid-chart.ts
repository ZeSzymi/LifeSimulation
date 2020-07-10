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
        let male = this.chart.series.push(new am4charts.ColumnSeries());
        male.dataFields.valueX = "alive";
        male.dataFields.categoryY = "size";
        male.clustered = false;

        let maleLabel = male.bullets.push(new am4charts.LabelBullet());
        maleLabel.label.text = "{valueX}%";
        maleLabel.label.hideOversized = false;
        maleLabel.label.truncate = false;
        maleLabel.label.horizontalCenter = "right";
        maleLabel.label.dx = -20;

        let female = this.chart.series.push(new am4charts.ColumnSeries());
        female.dataFields.valueX = "dead";
        female.dataFields.categoryY = "size";
        female.clustered = false;

        let femaleLabel = female.bullets.push(new am4charts.LabelBullet());
        femaleLabel.label.text = "{valueX}%";
        femaleLabel.label.hideOversized = false;
        femaleLabel.label.truncate = false;
        femaleLabel.label.horizontalCenter = "left";
        femaleLabel.label.dx = 20;

        let maleRange = valueAxis.axisRanges.create();
        maleRange.value = -20;
        maleRange.endValue = 0;
        maleRange.label.text = "alive";
        maleRange.label.fill = this.chart.colors.list[0];
        maleRange.label.dy = 20;
        maleRange.label.fontWeight = '600';
        maleRange.grid.strokeOpacity = 1;
        maleRange.grid.stroke = male.stroke;

        let femaleRange = valueAxis.axisRanges.create();
        femaleRange.value = 0;
        femaleRange.endValue = 20;
        femaleRange.label.text = "dead";
        femaleRange.label.fill = this.chart.colors.list[1];
        femaleRange.label.dy = 20;
        femaleRange.label.fontWeight = '600';
        femaleRange.grid.strokeOpacity = 1;
        femaleRange.grid.stroke = female.stroke;
    }
}