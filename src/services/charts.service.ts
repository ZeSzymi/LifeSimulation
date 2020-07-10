import { PyramidChart } from "../charts/pyramid-chart/pyramid-chart";
import { Bacteria, BacteriasSubjectModel } from "../models/bacteria";
import { Food } from "../models/food";
import { PieChart } from "../charts/pie-chart/pie-chart";

export class ChartService {
    public chartModal: HTMLElement;
    private pyramidChart:  PyramidChart;
    private pieChart: PieChart;
    constructor() {
        this.chartModal = document.getElementById("charts-modal")
    }

    initCharts(aliveBacterias: Bacteria[], deadBacterias: Bacteria[], food: Food[]) {
        const data =  new BacteriasSubjectModel(
            aliveBacterias.map(b => b.toBacteriaData()),
            deadBacterias.map(b => b.toBacteriaData()),
            food
        )
        this.pyramidChart = new PyramidChart(data);
        this.pieChart = new PieChart(data);
    }

    disposeCharts() {
        this.pyramidChart.dispose();
        this.pieChart.dispose();
    }
}