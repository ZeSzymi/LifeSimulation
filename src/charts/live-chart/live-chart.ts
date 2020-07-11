import { ChartXYBase } from "../chartXYBase";
import { ValueAxis, LineSeries } from "@amcharts/amcharts4/charts";
import { Subject, Subscription } from "rxjs";
import { BacteriasSubjectModel } from "../../models/bacteria";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as moment from "moment";
import { Axis } from "@babylonjs/core/Maths/math";

export class LiveChart extends ChartXYBase<ValueAxis, ValueAxis, LineSeries> {
    private subject: Subject<BacteriasSubjectModel>;
    public modal: HTMLElement;
    public chartDiv: HTMLElement;
    private now: moment.Moment;
    private onDataChangeSubscription: Subscription;

    constructor(subject: Subject<BacteriasSubjectModel>) {
        super();
        this.now = moment.utc(Date.now());
        this.subject = subject;
        this.modal = document.getElementById('live-chart-modal')
        this.chartDiv = document.getElementById('live-chart')
    }

    start() {
        this.initLiveChart();
        this.initXAxis();
        const ay1 = this.initYAxis(false, 40, 0);
        const ay2 = this.initYAxis(true, 150, 0);
        const ay3 = this.initYAxis(true, 10, 0);
        this.initSeries('bacterias', ay1, 'bacterias');
        this.initSeries('food', ay2, 'food');
        this.initSeries('light', ay3, 'light');
        this.onDataChangeSubscription = this.subject.subscribe(bacterias => this.onDataChange(bacterias))
    }

    finish() {
        this.onDataChangeSubscription.unsubscribe();
        this.chart.dispose();
    }

    onDataChange(data: BacteriasSubjectModel) {
        if (this.chart != null) {
            const date = moment(moment(Date.now()).diff(this.now));
            this.chart.addData({ date: date.toDate(), bacterias: data.alive.length, food: data.food.length, light: data.light.light })
        }
    }

    initLiveChart() {
        am4core.useTheme(am4themes_animated);
        this.init('live-chart');
        this.chart.hiddenState.properties.opacity = 0;
        this.chart.zoomOutButton.disabled = true;
        this.chart.padding(60, 10, 60, 10);
        const date = moment(moment(Date.now()).diff(this.now));
        this.setData([{ date: date.toDate(), bacterias: 0, food: 0, light: 0 }])
        this.chart.colors.step = 2;
        this.chart.legend = new am4charts.Legend();
        this.chart.legend.position = 'top';
    }

    initYAxis(opposite: boolean, max: number, min: number) {
        let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        if(this.chart.yAxes.indexOf(valueAxis) != 0){
            valueAxis.syncWithAxis = <any>this.chart.yAxes.getIndex(0);
        }
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = false;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.opposite = opposite;
        valueAxis.max = max;
        valueAxis.min = min;
        return valueAxis;
    }

    initXAxis() {
        let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.inside = true;
        dateAxis.renderer.labels.template.rotation = 90;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        this.chart.events.on("datavalidated", function () {
            dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });
        
        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;
    }

    initSeries(valueY: string, axisY, name: string) {
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = valueY;
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;
        series.yAxis = axisY;
        series.name = name;
        let bullet = series.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = this.chart.colors.getIndex(0);
        bullet.isMeasured = false;

        series.events.on("validated", function () {
            if (series.dataItems.last != null) {
                bullet.moveTo(series.dataItems.last.point);
                bullet.validatePosition();
            }
        });
    }
}