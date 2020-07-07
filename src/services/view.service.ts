export class ViewService {
    public showLiveChartBtn: HTMLButtonElement;
    public liveChart: HTMLElement;
    public liveChartClose: HTMLButtonElement;

    constructor() {
        this.showLiveChartBtn = <HTMLButtonElement>document.getElementById('showLiveChartbtn');
        this.liveChart = document.getElementById('live-chart-modal');
        this.liveChartClose = <HTMLButtonElement>document.getElementById('live-close');
    }

    liveChartOpened() {
        return this.liveChart.style.display === 'block' ? true : false;
    }

}