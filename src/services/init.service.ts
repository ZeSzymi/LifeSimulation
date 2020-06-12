import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { FreeCamera, Camera } from "@babylonjs/core/Cameras";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GenerateService } from "./generate.service";
import { Bacteria } from "../models/bacteria";

export class InitService {
    public initialized = false;
    private generateService: GenerateService;
    constructor() {
        this.generateService = new GenerateService();
    }

    start(scene: Scene, canvas: HTMLCanvasElement): { camera: Camera, bacterias: Bacteria[]} {
        const camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        //const ground = MeshBuilder.CreateGround("ground1", { width: 10, height: 10 }, scene);
        //ground.position.y = -0.2;
        const bacterias = this.generateService.genereteBacterias(100, scene);
        this.initialized = true;
        return  { camera, bacterias }
    }


}
