import { GameObject } from '../objects/game-object';

export class Scene {
  objects: GameObject[] = [];

  add(obj: GameObject) {
    this.objects.push(obj);
  }
}
