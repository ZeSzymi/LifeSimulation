import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Rotation } from '../models/environment/rotation';
import { PickingInfo } from '@babylonjs/core/Collisions/pickingInfo';
import { Collision } from '../models/environment/collision';
import { Bacteria } from '../models/bacteria';

export class MoveService {
    private rotation = new Rotation();
    public speed: number;
    private angle: number;
    private collision = new Collision();
    private area = 2.6;

    public constructor(speed) {
        this.speed = speed;
        this.setData();
    }

    move(mesh: Mesh, hits: Bacteria[], steps: number) {

        if (mesh.position.x > this.area || mesh.position.x < -this.area) {
            this.collision.is = true;
            this.collision.attempts++;
        } else if (mesh.position.z > this.area || mesh.position.z < -this.area) {
            this.collision.is = true;
            this.collision.attempts++;
            
        } else if (hits.length > 0) {
            this.collision.is = true;
            this.collision.attempts++;
        }

        if (this.collision.is && this.collision.attempts > this.collision.attemptsMax) {
            this.rotation.x = -this.rotation.x
            this.rotation.z = -this.rotation.z
            this.collision.attempts = 0;
            this.collision.is = false;
            this.changePosition(mesh, 'x');
            this.changePosition(mesh, 'z');
        }

        if (steps === 250) { 
            this.setRotations(Math.floor(Math.random() * 360));
            steps = 0;
        }
        this.changePosition(mesh, 'x');
        this.changePosition(mesh, 'z');
        this.rotation.steps++;
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

    private setData() {
        this.setRotations(Math.floor(Math.random() * 360));
    }
}
