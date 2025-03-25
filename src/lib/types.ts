import { ProgramInfo, BufferInfo, m4 } from 'twgl.js';
export interface Uniforms {
  u_lightWorldPos: number[];
  u_lightColor: number[];
  u_diffuseMult: number[];
  u_specular: number[];
  u_shininess: number;
  u_specularFactor: number;
  u_diffuse: WebGLTexture;
  u_viewInverse?: m4.Mat4;
  u_world: m4.Mat4;
  u_worldInverseTranspose: m4.Mat4;
  u_worldViewProjection: m4.Mat4;
}

export interface DrawInfo {
  /**
   * 渲染程序
   */
  programInfo: ProgramInfo;
  /**
   * 渲染数据
   */
  bufferInfo: BufferInfo;
  /**
   * 渲染参数
   */
  uniforms: Uniforms;
}
