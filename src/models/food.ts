import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export class Food  {

        public mesh: Mesh;
        public sizeX: number;
        public sizeY: number;
        public sizeZ: number;
        public distance: number;
        public rotation: number;
    
        constructor(scene: Scene, id: string) {
            this.mesh = MeshBuilder.CreateBox(id, { width: 0.1, height: 0.1, depth: 0.1 }, scene);
        }
    
}