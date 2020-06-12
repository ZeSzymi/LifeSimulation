import { MoveService } from './../services/move.service';
import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { RayService } from '../services/ray.service';

export class Bacteria {

    public mesh: Mesh;
    public DNA: DNA;
    public sizeX: number;
    public sizeY: number;
    public sizeZ: number;
    private moveService: MoveService;
    private rayService: RayService;
    private parent: Bacteria[];
    private id: string;
    private energy = 1000;

    constructor(DNA: DNA, scene: Scene, id: string, parent: Bacteria[]) {
        this.mesh = MeshBuilder.CreateBox(id, { width: DNA.size, height: 0.2, depth: DNA.size }, scene);
        this.DNA = DNA;
        this.animationPropertiesOverride(true, 0.09, 1);
        this.moveService = new MoveService();
        this.rayService = new RayService();
        this.rayService.castRay(scene, this.mesh);
        this.parent = parent;
        this.id = id;
    }

    private animationPropertiesOverride(enableBlending: boolean, blendingSpeed: number, loopMode: number) {
        this.mesh.animationPropertiesOverride = new AnimationPropertiesOverride();
        this.mesh.animationPropertiesOverride.enableBlending = enableBlending;
        this.mesh.animationPropertiesOverride.blendingSpeed = blendingSpeed;
        this.mesh.animationPropertiesOverride.loopMode = loopMode;
    }

    public move(scene: Scene) {
        if (this.energy <= 0) {
            this.dispose();
            return;
        }
        const hits = this.rayService.getHits(scene);
        const food = hits.filter(h => h.pickedMesh.name.includes('f'));
        this.energy += (food.length * 500)
        food.forEach(f => f.pickedMesh.dispose());
        
        this.moveService.move(this.mesh, hits.filter(h => h.pickedMesh.name.includes('b')));
        this.energy--;
    }

    public dispose() {
        this.mesh.dispose();
        this.parent.splice(this.parent.findIndex(b => b.id === this.id), 1);
    }


}
