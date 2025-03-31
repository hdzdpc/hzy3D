import { Camera } from '../cameras/camera';
import { GameObject } from '../objects/game-object';
import { Mesh } from '../objects/mesh';
import { WebGLRenderer } from '../renderers/webgl/webgl-renderer';

/**
 * 游戏世界管理
 */
export class World {
  private _objects: GameObject[] = [];
  idCount = 0;
  renderer: WebGLRenderer;
  _camera?: Camera;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer(canvas);
  }

  /**
   * 创建一个对象
   */
  createObject() {
    const obj = new GameObject(this.idCount++, this);
    this._objects.push(obj);
    return obj;
  }

  addCamera(camera: Camera) {
    this._camera = camera;
  }

  /**
   * 世界更新
   */
  tick(dt: number) {
    if (!this._camera) {
      return;
    }
    this._objects.forEach(object => {
      object.tick(dt);
    });
    const meshArr = [];
    for (let i = 0; i < this._objects.length; i++) {
      const obj = this._objects[i];
      const mesh = obj.getComponent<Mesh>(Mesh);
      if (mesh) {
        meshArr.push(mesh);
      }
    }

    this.renderer.render(this._camera, meshArr);
  }
}
