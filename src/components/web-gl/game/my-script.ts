import { Component } from '../../../lib/game/component';
export class MyScript extends Component {
  ySpeed: number = 0;
  zSpeed: number = 0;

  protected update(dt: number): void {
    this.object.rotation[0] += dt;
    this.object.rotation[1] += dt * this.ySpeed;
    this.object.rotation[2] += dt * this.zSpeed;
  }
}
