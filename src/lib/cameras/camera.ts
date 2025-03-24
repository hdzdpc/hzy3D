import { Object3D } from '../objects/object-3d';
/**
 * 基础相机
 */
export class Camera extends Object3D {
  // target: Object3D;
  // projectionMatrix: mat4 = mat4.create();
  // up: vec3;
  // autoUpdateMatrix = true;
  // constructor(fov: number, aspect: number, near: number, far: number) {
  //   super();
  //   this.position = vec3.create();
  //   this.target = new Object3D();
  //   mat4.perspective(this.projectionMatrix, fov, aspect, near, far);
  //   this.up = vec3.fromValues(0, 1, 0);
  //   this.matrix = mat4.create();
  // }
  // updateMatrix(): void {
  //   mat4.lookAt(this.matrix, this.position, this.target.position, this.up);
  // }
}
