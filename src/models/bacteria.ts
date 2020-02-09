import { Scene } from '@babylonjs/core/scene';
import { AnimationPropertiesOverride } from '@babylonjs/core/Animations';
import { DNA } from './dna';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

export class Bacteria {

    public body: Mesh;
    public DNA: DNA;
    public sizeX: number;
    public sizeY: number;
    public sizeZ: number;

    constructor (DNA: DNA, scene: Scene) {
        this.body = MeshBuilder.CreateBox("Box", { width : DNA.size * 2, height: 0.5, depth: DNA.size}, scene);
        this.DNA = DNA;
        this.animationPropertiesOverride(true, 0.09, 1);
    }

    private animationPropertiesOverride(enableBlending: boolean, blendingSpeed: number, loopMode: number) {
        this.body.animationPropertiesOverride = new AnimationPropertiesOverride();
        this.body.animationPropertiesOverride.enableBlending = enableBlending;
        this.body.animationPropertiesOverride.blendingSpeed = blendingSpeed;
        this.body.animationPropertiesOverride.loopMode = loopMode;
    }

    public search(radius: number) {
        for (let r = 0; r <= radius; r++) {
            for (let i = 0; i <= 360; i++) {
                let x = r * Math.cos(i) + this.body.position.x;
                let y = r * Math.sin(i) + this.body.position.x;
                console.log(x, y);
            }
        }
    }
}
