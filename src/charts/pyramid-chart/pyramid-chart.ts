import { ChartXYBase } from "../chartXYBase";
import { ValueAxis, LineSeries } from "@amcharts/amcharts4/charts";
import { Subject, Subscription } from "rxjs";
import { BacteriasSubjectModel } from "../../models/bacteria";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as moment from "moment";

export class PyramidChart extends ChartXYBase<ValueAxis, ValueAxis, LineSeries> {
    public modal: HTMLElement;
    public chartDiv: HTMLElement;
    private now: moment.Moment;

    constructor(data: BacteriasSubjectModel) {
        super();
        this.now = moment.utc(Date.now());
        this.modal = document.getElementById('live-chart-modal')
        this.chartDiv = document.getElementById('live-chart')
        am4core.useTheme(am4themes_animated);
        this.init('pyramid-chart');
        this.chart.numberFormatter.numberFormat = "#.#s";
        this.setData(data.alive.ma)
    }

    start() {
        this.initLiveChart();
        const xAxis = this.initXAxis();
        this.initYAxis();
        this.initSeries(xAxis);
    }

    finish() {
        this.chart.dispose();
    }

    initYAxis() {
        let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "age";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        return categoryAxis;
    }

    initXAxis() {
        let valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.extraMin = 0.1;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.minGridDistance = 40;
        valueAxis.renderer.ticks.template.length = 5;
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            return text == "Male" || text == "Female" ? text : text + "%";
        })
        return valueAxis;
    }

    initSeries(valueAxis) {
        let male = this.chart.series.push(new am4charts.ColumnSeries());
        male.dataFields.valueX = "male";
        male.dataFields.categoryY = "age";
        male.clustered = false;

        let maleLabel = male.bullets.push(new am4charts.LabelBullet());
        maleLabel.label.text = "{valueX}%";
        maleLabel.label.hideOversized = false;
        maleLabel.label.truncate = false;
        maleLabel.label.horizontalCenter = "right";
        maleLabel.label.dx = -10;

        let female = this.chart.series.push(new am4charts.ColumnSeries());
        female.dataFields.valueX = "female";
        female.dataFields.categoryY = "age";
        female.clustered = false;

        let femaleLabel = female.bullets.push(new am4charts.LabelBullet());
        femaleLabel.label.text = "{valueX}%";
        femaleLabel.label.hideOversized = false;
        femaleLabel.label.truncate = false;
        femaleLabel.label.horizontalCenter = "left";
        femaleLabel.label.dx = 10;

        let maleRange = valueAxis.axisRanges.create();
        maleRange.value = -10;
        maleRange.endValue = 0;
        maleRange.label.text = "Male";
        maleRange.label.fill =  this.chart.colors.list[0];
        maleRange.label.dy = 20;
        maleRange.label.fontWeight = '600';
        maleRange.grid.strokeOpacity = 1;
        maleRange.grid.stroke = male.stroke;

        let femaleRange = valueAxis.axisRanges.create();
        femaleRange.value = 0;
        femaleRange.endValue = 10;
        femaleRange.label.text = "Female";
        femaleRange.label.fill =  this.chart.colors.list[1];
        femaleRange.label.dy = 20;
        femaleRange.label.fontWeight = '600';
        femaleRange.grid.strokeOpacity = 1;
        femaleRange.grid.stroke = female.stroke;
    }
}