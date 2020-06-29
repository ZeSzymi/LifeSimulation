import "@babylonjs/core/Materials/standardMaterial";
import { SceneService } from "./services/scene.service";
import { Subject } from 'rxjs';
import { LiveChart } from "./charts/live-chart/live-chart";
import { Bacteria } from "./models/bacteria";

const liveSubject = new Subject<Bacteria[]>();
const sceneSerice = new SceneService(liveSubject);
const liveChart = new LiveChart(liveSubject);

document.getElementById('stop').addEventListener('click', () => {
    sceneSerice.stop = !sceneSerice.stop
})


sceneSerice.run();
