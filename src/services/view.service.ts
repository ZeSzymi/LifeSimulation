export class ViewService {
    public showLiveChartBtn: HTMLButtonElement;
    public liveChart: HTMLElement;
    public liveChartClose: HTMLButtonElement;
    public chartsBtn: HTMLButtonElement;
    public closeChartsBtn: HTMLButtonElement;

    constructor() {
        this.showLiveChartBtn = <HTMLButtonElement>document.getElementById('showLiveChartbtn');
        this.liveChart = document.getElementById('live-chart-modal');
        this.liveChartClose = <HTMLButtonElement>document.getElementById('live-close');
        this.chartsBtn = <HTMLButtonElement>document.getElementById('chartsBtn');
        this.closeChartsBtn =  <HTMLButtonElement>document.getElementById('close-charts-modal');
    }

    liveChartOpened() {
        return this.liveChart.style.display === 'block' ? true : false;
    }

}