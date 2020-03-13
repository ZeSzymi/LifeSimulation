import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Space, Vector3, Axis } from '@babylonjs/core/Maths/math';

export class MoveService {
    private distance = 0;
    private directions = ['x','y','z'];
    private direction = 'x';
    private from;
    private to;

    public constructor(from, to) {
        this.from = from;
        this.to = to;
        this.setData();
    }

    move(mesh: Mesh): number {
        console.log(this.distance);
        if (this.distance > 0) {
            this.distance--;
            return mesh.pos += 0.004;;
        } else {
            this.setData();
            this.rotate(mesh);
        }
    }

    rotate(mesh: Mesh) {
        switch (this.direction) {
            case 'x':
                console.log('rotation x');
                mesh.rotation.y += 1;
                break;
            case 'y':
                console.log('rotation y');
                mesh.rotation.y += 1;
                break;
            case 'z':
                console.log('rotation z');
                mesh.rotation.y += 1;
                break;
            default:
                return;
        }
        
    }

    private getDistance() {
        this.distance = Math.floor(Math.random() * this.to) + this.from;
    }

    private getDirection() {
        const directionIndex = Math.floor(Math.random() * this.directions.length);
        this.direction = this.directions[directionIndex];
    }

    private setData() {
        this.getDirection();
        this.getDistance();
    }
}
