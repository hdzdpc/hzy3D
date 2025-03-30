import { GameObject } from '../objects/game-object';

/**
 * 游戏世界管理
 */
export class World {
  private _objects: GameObject[] = [];
  idCount = 0;

  /**
   * 创建一个对象
   */
  createObject() {
    const obj = new GameObject(this.idCount++, this);
    this._objects.push(obj);
    return obj;
  }

  /**
   * 世界更新
   */
  tick(dt: number) {
    this._objects.forEach(object => {
      object.tick(dt);
    });
  }
}
