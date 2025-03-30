import { m4 } from 'twgl.js';
import { Component } from '../game/component';
/**
 * 基础相机
 */
export class Camera extends Component {
  eye: number[] = [];
  target: number[] = [];
  up: number[] = [];
  projection: m4.Mat4 = m4.identity();

  viewProjection: m4.Mat4 = m4.identity();

  camera: m4.Mat4 = m4.identity();
  view: m4.Mat4 = m4.identity();
  constructor() {
    super();
  }

  updateMatrix(): void {
    m4.lookAt(this.eye, this.target, this.up, this.camera);
    m4.inverse(this.camera, this.view);
    m4.multiply(this.projection, this.view, this.viewProjection);
  }
}
