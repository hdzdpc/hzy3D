import { GameObject } from '../objects/game-object';

/**
 * 组件基类
 */
export class Component {
  object?: GameObject;
  enabled = true;
  constructor() {}

  public internalUpdate(dt: number) {
    if (this.enabled) {
      this.update?.(dt);
    }
  }
  protected update?(dt: number) {}
}
