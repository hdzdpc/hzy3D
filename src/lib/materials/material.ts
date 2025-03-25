import { ProgramInfo } from 'twgl.js';
import { Uniforms } from '../types';

export class Material {
  /**
   * 渲染程序
   */
  programInfo: ProgramInfo;
  /**
   * 渲染参数
   */
  uniforms: Uniforms;
  constructor(programInfo: ProgramInfo, uniforms: Uniforms) {
    this.programInfo = programInfo;
    this.uniforms = uniforms;
  }
}
