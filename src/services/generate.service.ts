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
            bacterias.push(bacteria);
        }
        this.generatePositions(bacterias);
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
        let b1X = -2;
        let b2Z = 2;
        let b3X = 2;
        let b4Z = -2;
        let index = 0;
        bacterias.forEach((b, i) => {
            if (index === 0) {
                b.mesh.position.z = 2.5;
                b.mesh.position.x = b1X;
                b1X += 1; 
                index++;
            } else if (index === 1) {
                b.mesh.position.z = b2Z;
                b.mesh.position.x = -2.5;
                b2Z -= 1;
                index++;
            } else if (index === 2) {
                b.mesh.position.z = -2.5;
                b.mesh.position.x = b3X;
                b3X -= 1;
                index++;
            } else {
                b.mesh.position.z = b4Z;
                b.mesh.position.x = 2.5;
                b4Z += 1;
                index = 0;
            }
        })
    }

}