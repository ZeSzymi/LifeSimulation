import { DNA } from './models/dna';
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { ArcRotateCamera, Camera } from "@babylonjs/core/Cameras";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Animation, AnimationKeyInterpolation, AnimationPropertiesOverride } from "@babylonjs/core/Animations"
import { GridMaterial } from "@babylonjs/materials/grid";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { Bacteria } from "./models/bacteria";
import { InitService } from './services/init.service';

let stop = false;

document.getElementById('stop').addEventListener('click', () => {
    stop = !stop;
})

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);
let camera: Camera;
let bacterias: Bacteria[];

const initService = new InitService();

function createScene(): Scene {
    const scene: Scene = new Scene(engine);
    if (!initService.initialized) {
        const obj = initService.start(scene, canvas);
        camera = obj.camera;
        bacterias = obj.bacterias;
    }

    scene.registerBeforeRender(() => {
        if (!stop) {
            bacterias.forEach(bacteria => {
                bacteria.move(scene);
            })
        }
    });
    return scene;
}

var sceneFinal: Scene = createScene();

engine.runRenderLoop(() => {

    sceneFinal.render();

});

class AnimationKey {
    frame: number;
    value: any;
    inTangent?: any;
    outTangent?: any;
    interpolation?: AnimationKeyInterpolation;
}