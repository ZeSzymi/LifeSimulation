import "@babylonjs/core/Materials/standardMaterial";
import { SceneService } from "./services/scene.service";
import { Subject } from 'rxjs';
import { LiveChart } from "./charts/live-chart/live-chart";
import { BacteriasSubjectModel } from "./models/bacteria";

const liveSubject = new Subject<BacteriasSubjectModel>();
const sceneSerice = new SceneService(liveSubject);
const liveChart = new LiveChart(liveSubject);

document.getElementById('stop').addEventListener('click', () => {
    sceneSerice.stop = !sceneSerice.stop
})

sceneSerice.run();
