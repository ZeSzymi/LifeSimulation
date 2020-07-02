export class ViewService {
    public showLiveChartBtn: HTMLButtonElement;

    constructor() {
        this.showLiveChartBtn = <HTMLButtonElement>document.getElementById('showLiveChartbtn');
    }
}