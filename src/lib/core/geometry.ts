import { BufferInfo } from 'twgl.js';

export class Geometry {
  /**
   * 渲染数据
   */
  bufferInfo: BufferInfo;
  constructor(bufferInfo: BufferInfo) {
    this.bufferInfo = bufferInfo;
  }
}
