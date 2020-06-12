import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Space, Vector3, Axis } from '@babylonjs/core/Maths/math';
import { Rotation } from '../models/environment/rotation';

export class MoveService {
    private distance = 0;
    private directions = ['x','y','z'];
    private direction = 'x';
    private from;
    private to;
    private rotation = new Rotation();
    private speed: number;

    public constructor(from, to) {
        this.from = from;
        this.to = to;
        this.setData();
    }

    move(mesh: Mesh) {
        this.changePosition(mesh, 'x');
        this.changePosition(mesh, 'z');
    }

    private changePosition(mesh: Mesh, vector: string) {
        mesh.position[vector] += this.rotation[vector];
    }

    private getDistance() {
        this.distance = Math.floor(Math.random() * this.to) + this.from;
    }

    private getDirection() {
        const directionIndex = Math.floor(Math.random() * this.directions.length);
        this.direction = this.directions[directionIndex];
    }

    private setRotations() {
        const angle = Math.floor(Math.random() * 360);
        this.getRotation('x', 'cos', angle);
        this.getRotation('z', 'sin', angle);
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
        this.getDirection();
        this.getDistance();
        this.getSpeed();
        this.setRotations();
    }
}
