import { m4, v3 } from 'twgl.js';

export class Object3D {
  position = v3.create();
  rotation = v3.create();
  scale = v3.create(1, 1, 1);
  matrix = m4.create();
  autoUpdateMatrix = true;
  children: Object3D[] = [];
  updateMatrix() {
    m4.identity(this.matrix);
    m4.translate(this.matrix, this.position, this.matrix);
    m4.rotateX(this.matrix, this.rotation[0], this.matrix);
    m4.rotateY(this.matrix, this.rotation[1], this.matrix);
    m4.rotateZ(this.matrix, this.rotation[2], this.matrix);
    m4.scale(this.matrix, this.scale, this.matrix);
  }
}
