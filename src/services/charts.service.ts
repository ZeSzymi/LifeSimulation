import { PyramidChart } from "../charts/pyramid-chart/pyramid-chart";
import { Bacteria, BacteriasSubjectModel } from "../models/bacteria";
import { Food } from "../models/food";
import { PieChart } from "../charts/pie-chart/pie-chart";
import { Table } from "../charts/table/table";
import { LightEnergy } from "../models/light";

export class ChartService {
    public chartModal: HTMLElement;
    private pyramidChart:  PyramidChart;
    private pieChart: PieChart;
    private table: Table;
    constructor() {
        this.chartModal = document.getElementById("charts-modal")
    }

    initCharts(aliveBacterias: Bacteria[], deadBacterias: Bacteria[], food: Food[], light: LightEnergy) {
        const data =  new BacteriasSubjectModel(
            aliveBacterias.map(b => b.toBacteriaData()),
            deadBacterias.map(b => b.toBacteriaData()),
            food, light
        )
        this.pyramidChart = new PyramidChart(data);
        this.pieChart = new PieChart(data);
        this.table = new Table(data);
    }

    disposeCharts() {
        this.pyramidChart.dispose();
        this.pieChart.dispose();
    }
}