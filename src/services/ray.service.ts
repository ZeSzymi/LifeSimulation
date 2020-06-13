import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { RayHelper } from "@babylonjs/core/Debug/rayHelper";
import { Ray } from "@babylonjs/core/Culling/ray";
import { PickingInfo } from "@babylonjs/core/Collisions/pickingInfo";
import { DNA } from "../models/dna";

export class RayService {
    private rays: Ray[] = [];
    castRay(scene: Scene, mesh: Mesh, dna: DNA) {
        this.rays.push(this.newRay(mesh, dna, 1, 0, 0));
        this.rays.push(this.newRay(mesh, dna, 0, 0, 1));
        this.rays.push(this.newRay(mesh, dna, 0, 1, 0));
        this.rays.push(this.newRay(mesh, dna, -1, 0, 0));
        this.rays.push(this.newRay(mesh, dna, 0, 0, -1));
        this.rays.push(this.newRay(mesh, dna, 0, -1, 0));
        this.rays.push(this.newRay(mesh, dna, -1, 0, -1));
        this.rays.push(this.newRay(mesh, dna, 1, 0, 1));
        this.rays.push(this.newRay(mesh, dna, -1, 0, 1));
        this.rays.push(this.newRay(mesh, dna, 1, 0, -1));
    }

    private showRays(scene) {
        this.rays.forEach(ray => {
            const rayHelper = new RayHelper(ray);
            rayHelper.show(scene);
        })
    }

    getHits(scene: Scene): PickingInfo[] {
        const hits = this.rays.reduce((hits, currentRay: Ray) => {
            const currentHits = scene.multiPickWithRay(currentRay, () => true);
            currentHits.splice(0, 1);
            return hits.concat(currentHits)
        }, []);
        return hits;
    }

    newRay(mesh: Mesh, dna:DNA, x, y, z) {
        const origin = mesh.position;
        let forward = new Vector3(x, y, z);
        forward = this.vecToLocal(forward, mesh);

        let direction = forward.subtract(origin);
        direction = Vector3.Normalize(direction);
        const length = dna.size - 0.05;

        return new Ray(origin, direction, length);
    }

    vecToLocal(vector: Vector3, mesh: Mesh) {
        const worldMatrix = mesh.getWorldMatrix();
        const transformCoordinates = Vector3.TransformCoordinates(vector, worldMatrix);
        return transformCoordinates;
    }
}