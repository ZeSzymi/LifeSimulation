import "@babylonjs/core/Materials/standardMaterial";
import { SceneService } from "./services/scene.service";
import { Subject } from 'rxjs';
import { LiveChart } from "./charts/live-chart/live-chart";
import { BacteriasSubjectModel } from "./models/bacteria";
import { ConfigService } from "./services/config.service";
import { ViewService } from "./services/view.service";

const liveSubject = new Subject<BacteriasSubjectModel>();
const configSerivce = new ConfigService();
const viewService =  new ViewService();

let sceneSerice = null;
let liveChartService: LiveChart = null;
configSerivce.closeConfigBtn.addEventListener('click', () => {
    configSerivce.onStart();
    const subject = configSerivce.onSlidersChange();
    configSerivce.modal.style.display = 'none';
    sceneSerice = new SceneService(liveSubject, subject, configSerivce.config); 
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

document.getElementById('stop').addEventListener('click', () => {
    sceneSerice.stop = !sceneSerice.stop
})


