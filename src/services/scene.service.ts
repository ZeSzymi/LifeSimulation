import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { InitService } from "./init.service";
import { Bacteria } from "../models/bacteria";
import { Camera } from "@babylonjs/core/Cameras";
import { GenerateService } from "./generate.service";
import { Food } from "../models/food";
import { LightEnergy } from "../models/light";
import { Config } from "../helpers/config.helper";

export class SceneService {
    private scene: Scene;
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private initService: InitService;
    private food: Food[];
    private camera: Camera;
    private bacterias: Bacteria[] = [];
    private deadBacterias: Bacteria[] = [];
    public light: LightEnergy;
    public stop: boolean = false;
    private generateService: GenerateService;
    private lastFoodId = 0;
    private config: Config;

    constructor() {
        this.config = new Config();
        this.initService = new InitService(this.config);
        this.generateService = new GenerateService(this.config);
        this.light = new LightEnergy(this.config.light, 200, 0);
        this.canvas = <any>document.getElementById("renderCanvas");
        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();
    }

    private createScene(): Scene {
        const scene: Scene = new Scene(this.engine);
        if (!this.initService.initialized) {
            const init = this.initService.start(scene, this.canvas);
            this.camera = init.camera;
            this.bacterias = init.bacterias;
            this.deadBacterias = init.deadBacterias;
            this.food =  init.foods;
            this.lastFoodId = this.food.length;
        }

        scene.registerBeforeRender(() => {
            if (!this.stop) {
                const length = this.generateService.generateFoodOnRun(this.config.foodOnRun, scene, this.food, this.lastFoodId)?.length;
                this.lastFoodId = length != null ? this.lastFoodId + length : this.lastFoodId;
                this.bacterias.forEach(bacteria => {
                    bacteria.collectLightEnergy(this.light.light)
                    bacteria.move(scene, this.food);
                })
                this.light.ticks++;
            }
        });
        return scene;
    }

    public run() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}