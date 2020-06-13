import { Bacteria } from "../models/bacteria";
import { Scene } from "@babylonjs/core/scene";
import { DNA } from "../models/dna";
import { Food } from "../models/food";

export class GenerateService {
    private ticks = 0;
    private area = 5000;
    private area2 = 2500;
    genereteBacterias(amount: number, scene: Scene):{ bacterias: Bacteria[], deadBacterias: Bacteria[]} {
        const bacterias = <Bacteria[]>[];
        const deadBacterias = <Bacteria[]>[];
        const dna = new DNA(0, 0.2, 0);
        for (let i = 0; i < amount; i++) {
            let bacteria = new Bacteria(scene, `b${i}`, bacterias, deadBacterias);
            bacteria.mesh.position.x = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
            bacteria.mesh.position.z = (Math.floor(Math.random() * this.area) - this.area2) * 0.001;
            bacterias.push(bacteria);
        }
        return { bacterias, deadBacterias };
    }

    generateFood(amount: number, scene: Scene): Food[] {
        const foods = <Food[]>[];
        for (let i = 0; i < amount; i++) {
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

}