import { GameObject } from '../objects/game-object';

/**
 * 组件基类
 */
export class Component {
  object!: GameObject;
  enabled = true;

  public internalUpdate(dt: number) {
    if (this.enabled) {
      this.update?.(dt);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected update?(dt: number) {}
}
