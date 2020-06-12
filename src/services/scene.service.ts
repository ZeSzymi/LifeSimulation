import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { InitService } from "./init.service";
import { Bacteria } from "../models/bacteria";
import { Camera } from "@babylonjs/core/Cameras";

export class SceneService {
    private scene: Scene;
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private initService: InitService;
    private camera: Camera;
    private bacterias: Bacteria[] = [];
    public stop: boolean = false;

    constructor() {
        this.initService = new InitService();
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
        }

        scene.registerBeforeRender(() => {
            if (!this.stop) {
                this.bacterias.forEach(bacteria => {
                    bacteria.move(scene);
                })
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