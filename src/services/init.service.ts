import { Scene } from "@babylonjs/core/scene";
import { FreeCamera, Camera } from "@babylonjs/core/Cameras";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { GenerateService } from "./generate.service";
import { Bacteria } from "../models/bacteria";
import { Food } from "../models/food";

export class InitService {
    public initialized = false;
    private generateService: GenerateService;
    constructor() {
        this.generateService = new GenerateService();
    }

    start(scene: Scene, canvas: HTMLCanvasElement): { camera: Camera, bacterias: Bacteria[], deadBacterias: Bacteria[], foods: Food[]} {
        const camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        const {bacterias, deadBacterias} = this.generateService.genereteBacterias(20, scene);
        const foods = this.generateService.generateFood(100, scene);
        this.initialized = true;
        return  { camera, bacterias, deadBacterias, foods }
    }


}
