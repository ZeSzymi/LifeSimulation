import { Bacteria } from "../models/bacteria";
import { Scene } from "@babylonjs/core/scene";
import { Food } from "../models/food";
import { Config } from "../helpers/config.helper";

export class GenerateService {
    private ticks = 0;
    private area = 5000;
    private area2 = 2500;
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    genereteBacterias(scene: Scene):{ bacterias: Bacteria[], deadBacterias: Bacteria[]} {
        const bacterias = <Bacteria[]>[];
        const deadBacterias = <Bacteria[]>[];
        for (let i = 0; i < this.config.bacterieAmount; i++) {
            let bacteria = new Bacteria(scene, `b${i}`, bacterias, deadBacterias, this.config);
            const a = bacteria.DNA.size
            bacterias.push(bacteria);
        }
        return { bacterias, deadBacterias };
    }

    generateFood(scene: Scene): Food[] {
        const foods = <Food[]>[];
        for (let i = 0; i < this.config.foodAmount; i++) {
            let food = new Food(scene, `f${i}`, foods);
            food.mesh.position.x = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
            food.mesh.position.z = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
            foods.push(food);
        }
        return foods;
    }

    generateFoodOnRun(amount: number, scene: Scene, foods: Food[], lastId: number): Food[] {
        if (this.ticks === 500) {
            for (let i = 0; i < amount; i++) {
                let food = new Food(scene, `f${lastId + i}`, foods);
                food.mesh.position.x = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
                food.mesh.position.z = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
                foods.push(food);
            }
            this.ticks = 0;
            return foods;
        }
        this.ticks++;
    }

    generatePositions(bacterias: Bacteria[]) {
        const [b1, b2, b3, b4] =  bacterias.reduce()
        bacterias.forEach(b => {
            b.mesh.
        })
    }

}