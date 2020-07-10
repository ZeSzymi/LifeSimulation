import "@babylonjs/core/Materials/standardMaterial";
import { SceneService } from "./services/scene.service";
import { Subject } from 'rxjs';
import { LiveChart } from "./charts/live-chart/live-chart";
import { BacteriasSubjectModel } from "./models/bacteria";
import { ConfigService } from "./services/config.service";
import { ViewService } from "./services/view.service";
import { ChartService } from "./services/charts.service";

const liveSubject = new Subject<BacteriasSubjectModel>();
const configSerivce = new ConfigService();
const viewService =  new ViewService();

let aliveBacterias = null;
let deadBacterias = null;
let food = null

let sceneSerice: SceneService = null;
let liveChartService: LiveChart = null;
let chartService: ChartService = null;

configSerivce.closeConfigBtn.addEventListener('click', () => {
    configSerivce.onStart();
    const subject = configSerivce.onSlidersChange();
    configSerivce.modal.style.display = 'none';
    sceneSerice = new SceneService(liveSubject, subject, configSerivce.config); 
    aliveBacterias = sceneSerice.bacterias;
    deadBacterias = sceneSerice.deadBacterias;
    food = sceneSerice.food;
    sceneSerice.run();
})

viewService.liveChartClose.addEventListener('click', () => {
    liveChartService.finish();
    viewService.liveChart.style.display = 'none';
})

viewService.showLiveChartBtn.addEventListener('click', () => {
    liveChartService = new LiveChart(liveSubject);
    viewService.liveChart.style.display = 'block';
    liveChartService.start();
})

viewService.chartsBtn.addEventListener('click', () => {
    chartService = new ChartService();
    chartService.chartModal.style.display = 'block';
    chartService.initCharts(aliveBacterias, deadBacterias, food);
    sceneSerice.stopService();
});

document.getElementById('stop').addEventListener('click', () => {
    sceneSerice.stopService();
})


