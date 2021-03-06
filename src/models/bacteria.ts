import { MoveService } from './../services/move.service';
import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { RayService } from '../services/ray.service';
import { Food } from './food';
import { Config } from '../helpers/config.helper';
import { PickingInfo } from '@babylonjs/core/Collisions/pickingInfo';
import { Consts } from '../consts/environment';
import { LightEnergy } from './light';

export class Bacteria {

    public mesh: Mesh;
    public DNA: DNA;
    private moveService: MoveService;
    private rayService: RayService;
    private parent: Bacteria[];
    private id: string;
    private energy: number;
    private disposeParent: Bacteria[];
    private stepsSinceFood = 0;
    private config: Config;
    private foodAte = 0;
    private dead: boolean = false;

    constructor(scene: Scene, id: string, parent: Bacteria[], disposeParent: Bacteria[], config: Config) {
        const size = (Math.floor(Math.random() * 3) + 1)
        const speed = 5 - size;
        const strength = (Math.floor(Math.random() * 20) + 10) * 0.01;
        this.config = config;
        this.energy = this.config.energy;
        this.DNA = new DNA(speed, size, strength);
        this.mesh = MeshBuilder.CreateBox(id, { width: this.DNA.size * 0.1, height: 0.1, depth: this.DNA.size * 0.1 }, scene);
        this.animationPropertiesOverride(true, 0.09, 1);
        this.moveService = new MoveService(this.DNA.speed * 0.001);
        this.rayService = new RayService();
        this.rayService.castRay(scene, this.mesh, this.DNA);
        this.parent = parent;
        this.disposeParent = disposeParent;
        this.id = id;
    }

    private animationPropertiesOverride(enableBlending: boolean, blendingSpeed: number, loopMode: number) {
        this.mesh.animationPropertiesOverride = new AnimationPropertiesOverride();
        this.mesh.animationPropertiesOverride.enableBlending = enableBlending;
        this.mesh.animationPropertiesOverride.blendingSpeed = blendingSpeed;
        this.mesh.animationPropertiesOverride.loopMode = loopMode;
    }

    public move(scene: Scene, foods: Food[]) {
        if (this.energy <= 0) {
            this.dispose();
            return;
        }
        const hits = this.rayService.getHits(scene);
        const food = hits.filter(h => h.pickedMesh.name.includes('f'));

        if (food.length > 0) {
            this.stepsSinceFood = 0;
        }
        this.stepsSinceFood++;

        food.forEach(f => foods.find(fd => fd.id === f.pickedMesh.name)?.dispose());

        const bacterie = hits.filter(h => h.pickedMesh.name.includes('b')).map(b => this.parent.find(p => p.id === b.pickedMesh.name));
        this.moveService.move(this.mesh, bacterie, this.stepsSinceFood);
        this.manageEnergy(food);
    }

    private manageEnergy(food: PickingInfo[]) {
        this.energy += (food.length * Consts.FOOD_VALUE)
        this.foodAte += food.length;
        this.energy -= 1;

    }

    public collectLightEnergy(light: number) {
        this.energy += ((this.DNA.size / 8) * light)
    }

    public dispose() {
        this.mesh.dispose();
        this.dead = true;
        this.disposeParent.push(this);
        this.parent.splice(this.parent.findIndex(b => b.id === this.id), 1);
    }

    public toBacteriaData(): BacteriaData {
        const data = new BacteriaData();
        data.positionX = this.mesh.position.x;
        data.positionY = this.mesh.position.y;
        data.positionZ = this.mesh.position.z;
        data.DNA = this.DNA;
        data.energy = this.energy;
        data.id = this.id;
        data.foodAte = this.foodAte;
        data.isDead = this.dead;
        return data;
    }
}

export class BacteriaData {
    public positionX: number;
    public positionY: number;
    public positionZ: number;
    public DNA: DNA;
    public id: string;
    public energy: number;
    public foodAte: number;
    public isDead: boolean;
}

export class BacteriasSubjectModel {
    constructor(alive: BacteriaData[], dead: BacteriaData[], food: Food[], light: LightEnergy) {
        this.alive = alive;
        this.dead = dead;
        this.food = food;
        this.light = light;
    }
    alive: BacteriaData[];
    dead: BacteriaData[];
    food: Food[];
    light: LightEnergy;
}