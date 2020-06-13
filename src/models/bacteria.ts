import { MoveService } from './../services/move.service';
import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { RayService } from '../services/ray.service';
import { Food } from './food';

export class Bacteria {

    public mesh: Mesh;
    public DNA: DNA;
    private moveService: MoveService;
    private rayService: RayService;
    private parent: Bacteria[];
    private id: string;
    private energy = 1000;
    private disposeParent: Bacteria[];
    private stepsSinceFood = 0;

    constructor(scene: Scene, id: string, parent: Bacteria[], disposeParent: Bacteria[]) {
        const size = (Math.floor(Math.random() * 20) + 10) * 0.01;
        const speed = (1 - size) * 0.008;
        const strength = (Math.floor(Math.random() * 20) + 10) * 0.01;;
        this.DNA = new DNA(speed, size, strength);
        this.mesh = MeshBuilder.CreateBox(id, { width:  this.DNA.size, height: this.DNA.size, depth: this.DNA.size}, scene);
        this.animationPropertiesOverride(true, 0.09, 1);
        this.moveService = new MoveService(this.DNA.speed);
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
        this.energy += (food.length * 500)
        if (food.length > 0) {
            this.stepsSinceFood = 0;
        } 
        this.stepsSinceFood++;

        food.forEach(f => foods.find(fd => fd.id === f.pickedMesh.name)?.dispose());
        const bacterie = hits.filter(h => h.pickedMesh.name.includes('b')).map(b => this.parent.find(p => p.id === b.pickedMesh.name));
        this.moveService.move(this.mesh, bacterie, this.stepsSinceFood);
        this.energy--;
    }

    public collectLightEnergy(light: number) {
        this.energy += (this.DNA.size * light ) * 100
    }

    public dispose() {
        this.mesh.dispose();
        this.disposeParent.push(this);
        this.parent.splice(this.parent.findIndex(b => b.id === this.id), 1);
    }


}
