import { Scene } from "@babylonjs/core/scene";
import { FreeCamera, Camera } from "@babylonjs/core/Cameras";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { GenerateService } from "./generate.service";
import { Bacteria } from "../models/bacteria";
import { Food } from "../models/food";
import { Config } from "../helpers/config.helper";

export class InitService {
    public initialized = false;
    private generateService: GenerateService;
    private config: Config;
    constructor(config: Config) {
        this.config = config;
        this.generateService = new GenerateService(this.config);
    }

    start(scene: Scene, canvas: HTMLCanvasElement): { camera: Camera, bacterias: Bacteria[], deadBacterias: Bacteria[], foods: Food[]} {
        const camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        const { bacterias, deadBacterias } = this.generateService.genereteBacterias(scene);
        const foods = this.generateService.generateFood(scene);
        this.initialized = true;
        return  { camera, bacterias, deadBacterias, foods }
    }


}
