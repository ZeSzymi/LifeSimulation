import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { RayHelper } from "@babylonjs/core/Debug/rayHelper";
import { Ray } from "@babylonjs/core/Culling/ray";

export class RayService {
    isCasted =  false;
    ray: Ray;
    castRay(scene: Scene, mesh: Mesh) {
        
        if (!this.isCasted) {
            this.ray = this.newRay(mesh, 1 ,0, 0);
            const ray2 = this.newRay(mesh, 0 ,1, 0);
            const ray3 = this.newRay(mesh, 0,0, 1);
            const ray4 = this.newRay(mesh, -1, 0, 0);
            const ray5 = this.newRay(mesh, 1, 0, 1);
    
            let rayHelper = new RayHelper(this.ray);
            rayHelper.show(scene);
    
            let rayHelper2 = new RayHelper(ray2);
            rayHelper2.show(scene);
    
            let rayHelper3= new RayHelper(ray3);
            rayHelper3.show(scene);
    
            let rayHelper4= new RayHelper(ray4);
            rayHelper4.show(scene);
    
            let rayHelper5= new RayHelper(ray4);
            rayHelper5.show(scene);
        }
        
        this.isCasted = true;
        const hits = scene.multiPickWithRay(this.ray, () => true);
        

        return hits;
    }

    newRay(mesh: Mesh, x, y, z) {
        const origin = mesh.position;
        let forward = new Vector3(x, y, z);
        forward = this.vecToLocal(forward, mesh);

        let direction = forward.subtract(origin);
        direction = Vector3.Normalize(direction);

        const length = 0.2;

        return new Ray(origin, direction, length);
    }

    vecToLocal(vector: Vector3, mesh: Mesh) {
        const worldMatrix = mesh.getWorldMatrix();
        const transformCoordinates = Vector3.TransformCoordinates(vector, worldMatrix);
        return transformCoordinates;
    }
}