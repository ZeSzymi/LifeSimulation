import { DNA } from './models/dna';
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { ArcRotateCamera } from "@babylonjs/core/Cameras";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Animation, AnimationKeyInterpolation, AnimationPropertiesOverride } from "@babylonjs/core/Animations"
import { GridMaterial } from "@babylonjs/materials/grid";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { Bacteria } from "./models/bacteria";

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    const scene: Scene = new Scene(engine);
    var camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    var ground = MeshBuilder.CreateGround("ground1", { width: 10, height: 10 }, scene);
    const dna = new DNA(0, 0.1, 0);
    let bacteria = new Bacteria(dna, scene);
    scene.onBeforeRenderObservable.add(() => { 
        bacteria.body.position.x += 0.001;
        //bacteria.search(3);
    })


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