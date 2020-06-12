import { Bacteria } from "../models/bacteria";
import { Scene } from "@babylonjs/core/scene";
import { DNA } from "../models/dna";
import { Food } from "../models/food";

export class GenerateService {

    genereteBacterias(amount: number, scene: Scene): Bacteria[] {
        const bacterias = <Bacteria[]>[];
        const dna = new DNA(0, 0.2, 0);
        for (let i = 0; i < amount; i++) {
            let bacteria = new Bacteria(dna, scene, `b${i}`, bacterias);
            bacteria.mesh.position.x = (Math.floor(Math.random() * 5000) - 5000) * 0.001;
            bacteria.mesh.position.z = (Math.floor(Math.random() * 5000) - 5000) * 0.001;
            bacterias.push(bacteria);
        }
        return bacterias;
    }

    generateFood(amount: number, scene: Scene): Food[] {
        const foods = <Food[]>[];
        for (let i = 0; i < amount; i++) {
            let food = new Food(scene, `f${i}`);
            food.mesh.position.x = (Math.floor(Math.random() * 5000) - 5000) * 0.001;
            food.mesh.position.z = (Math.floor(Math.random() * 5000) - 5000) * 0.001;
            foods.push(food);
        }
        return foods;
    }

}