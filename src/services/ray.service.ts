import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { RayHelper } from "@babylonjs/core/Debug/rayHelper";
import { Ray } from "@babylonjs/core/Culling/ray";

export class RayService {

    castRay(scene: Scene, mesh: Mesh) {
        const origin = mesh.position;
        let forward = new Vector3(1, 0, 0);
        forward = this.vecToLocal(forward, mesh);

        let direction = forward.subtract(origin);
        direction = Vector3.Normalize(direction);

        const length = 50;

        const ray = new Ray(origin, direction, length);
        let rayHelper = new RayHelper(ray);
        rayHelper.show(scene);

        const hits = scene.multiPickWithRay(ray, () => true);
        console.log(hits[1].pickedMesh.name);

    }

    vecToLocal(vector: Vector3, mesh: Mesh) {
        const worldMatrix = mesh.getWorldMatrix();
        const transformCoordinates = Vector3.TransformCoordinates(vector, worldMatrix);
        return transformCoordinates;
    }
}