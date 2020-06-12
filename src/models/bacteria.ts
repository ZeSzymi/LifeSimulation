import { MoveService } from './../services/move.service';
import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { RayService } from '../services/ray.service';
import { PickingInfo } from '@babylonjs/core/Collisions/pickingInfo';

export class Bacteria {

    public mesh: Mesh;
    public DNA: DNA;
    public sizeX: number;
    public sizeY: number;
    public sizeZ: number;
    public distance: number;
    public rotation: number;
    private moveService: MoveService;
    private rayService: RayService;

    constructor(DNA: DNA, scene: Scene, id: string) {
        this.mesh = MeshBuilder.CreateBox(id, { width: DNA.size, height: 0.2, depth: DNA.size }, scene);
        this.DNA = DNA;
        this.animationPropertiesOverride(true, 0.09, 1);
        this.moveService = new MoveService();
        this.rayService = new RayService();
        this.rayService.castRay(scene, this.mesh);
    }

    private animationPropertiesOverride(enableBlending: boolean, blendingSpeed: number, loopMode: number) {
        this.mesh.animationPropertiesOverride = new AnimationPropertiesOverride();
        this.mesh.animationPropertiesOverride.enableBlending = enableBlending;
        this.mesh.animationPropertiesOverride.blendingSpeed = blendingSpeed;
        this.mesh.animationPropertiesOverride.loopMode = loopMode;
    }

    public move(scene: Scene) {
        const hits = this.rayService.getHits(scene);
        this.moveService.move(this.mesh, hits);
    }
}
