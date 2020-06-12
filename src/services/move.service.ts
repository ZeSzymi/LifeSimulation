import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Rotation } from '../models/environment/rotation';
import { PickingInfo } from '@babylonjs/core/Collisions/pickingInfo';

export class MoveService {
    private rotation = new Rotation();
    private speed: number;
    private angle: number;

    public constructor() {
        this.setData();
    }

    move(mesh: Mesh, hits: PickingInfo[]) {
        if (hits.length === 0) {
            this.changePosition(mesh, 'x');
            this.changePosition(mesh, 'z');
        } else {
            this.setRotations(Math.floor(Math.random() * 360));
            this.changePosition(mesh, 'x');
            this.changePosition(mesh, 'z');
            this.changePosition(mesh, 'x');
            this.changePosition(mesh, 'z');
            this.changePosition(mesh, 'x');
            this.changePosition(mesh, 'z');
        }
      
    }

    private changePosition(mesh: Mesh, vector: string) {
        mesh.position[vector] += this.rotation[vector];
    }

    private setRotations(angle) {
        this.angle = angle;
        this.getRotation('x', 'cos', this.angle);
        this.getRotation('z', 'sin', this.angle);
    }

    private getRotation(vector: string, math: string, angle: number) {
        this.rotation[vector] = (math === 'cos' ? Math.cos(angle) :  Math.sin(angle)) * this.speed;
    }

    private predictPosition() {

    }

    private getSpeed() {
        this.speed = 0.004;
    }

    private setData() {
        this.getSpeed();
        this.setRotations(Math.floor(Math.random() * 360));
    }
}
