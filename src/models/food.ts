import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export class Food  {

        public mesh: Mesh;
        public id: string;
        private parent: Food[];
    
        constructor(scene: Scene, id: string, parent: Food[]) {
            this.mesh = MeshBuilder.CreateBox(id, { width: 0.07, height: 0.07, depth: 0.07 }, scene);
            this.parent = parent;
            this.id = id;
        }

        dispose() {
            this.mesh.dispose();
            this.parent.splice(this.parent.findIndex(f => f.id === this.id), 1);
        }
    
}