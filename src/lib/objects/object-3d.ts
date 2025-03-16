import { mat4, vec3 } from 'gl-matrix';

export class Object3D {
  position = vec3.create();
  rotation = vec3.create();
  scale = vec3.fromValues(1, 1, 1);
  matrix = mat4.create();
  autoUpdateMatrix = true;

  updateMatrix() {
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, this.position);
    mat4.rotateX(this.matrix, this.matrix, this.rotation[0]);
    mat4.rotateY(this.matrix, this.matrix, this.rotation[1]);
    mat4.rotateZ(this.matrix, this.matrix, this.rotation[2]);
    mat4.scale(this.matrix, this.matrix, this.scale);
  }
}
