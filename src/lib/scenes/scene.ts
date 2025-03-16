import { Object3D } from '../objects/object-3d';

export class Scene {
  objects: Object3D[] = [];

  add(obj: Object3D) {
    this.objects.push(obj);
  }
}
