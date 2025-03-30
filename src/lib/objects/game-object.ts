import { m4, v3 } from 'twgl.js';
import { World } from '../game/world';
import { Component } from '../game/component';

declare type Constructor<T = unknown> = new (...args: unknown[]) => T;
export class GameObject {
  uuid: number;
  world: World;
  components: Component[] = [];

  position = v3.create();
  rotation = v3.create();
  scale = v3.create(1, 1, 1);
  matrix = m4.create();
  autoUpdateMatrix = true;
  children: GameObject[] = [];

  constructor(uuid: number, world: World) {
    this.world = world;
    this.uuid = uuid;
  }

  tick(dt: number) {
    this.children.forEach(child => {
      child.tick(dt);
    });
    this.components.forEach(component => {
      component.internalUpdate(dt);
    });
  }

  addComponent<T extends Component>(component: Constructor<T>) {
    const comp = new component();
    comp.object = this;
    this.components.push(comp);
    return comp;
  }
  updateMatrix() {
    m4.identity(this.matrix);
    m4.translate(this.matrix, this.position, this.matrix);
    m4.rotateX(this.matrix, this.rotation[0], this.matrix);
    m4.rotateY(this.matrix, this.rotation[1], this.matrix);
    m4.rotateZ(this.matrix, this.rotation[2], this.matrix);
    m4.scale(this.matrix, this.scale, this.matrix);
  }
}
