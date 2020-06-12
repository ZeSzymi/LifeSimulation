import "@babylonjs/core/Materials/standardMaterial";
import { SceneService } from "./services/scene.service";

const sceneSerice = new SceneService();
document.getElementById('stop').addEventListener('click', () => {
    sceneSerice.stop = !sceneSerice.stop
})

sceneSerice.run();
