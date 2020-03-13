import { MoveService } from './../services/move.service';
import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { Ray } from '@babylonjs/core/Culling/ray';
import { RayHelper } from '@babylonjs/core/Debug/rayHelper';

export class Bacteria {

    public mesh: Mesh;
    public DNA: DNA;
    public sizeX: number;
    public sizeY: number;
    public sizeZ: number;
    public distance: number;
    public rotation: number;
    private moveService: MoveService;

    constructor (DNA: DNA, scene: Scene, id: string) {
        this.mesh = MeshBuilder.CreateBox(id, { width : DNA.size, height: 0.2, depth: DNA.size}, scene);
        this.DNA = DNA;
        this.animationPropertiesOverride(true, 0.09, 1);
        this.moveService = new MoveService(10, 100);
    }

    private animationPropertiesOverride(enableBlending: boolean, blendingSpeed: number, loopMode: number) {
        this.mesh.animationPropertiesOverride = new AnimationPropertiesOverride();
        this.mesh.animationPropertiesOverride.enableBlending = enableBlending;
        this.mesh.animationPropertiesOverride.blendingSpeed = blendingSpeed;
        this.mesh.animationPropertiesOverride.loopMode = loopMode;
    }

    public search(radius: number) {
        for (let r = 0; r <= radius; r++) {
            for (let i = 0; i <= 360; i++) {
                let x = r * Math.cos(i) + this.mesh.position.x;
                let y = r * Math.sin(i) + this.mesh.position.x;
            }
        }
    }

   public move() {
       this.moveService.move(this.mesh);
   }
   
   public go() {
       if (this.distance > 20) {
           this.distance = 0;
           this.rotation = Math.floor(Math.random() * 2);
       }
   }
}
