import { Camera } from '../../cameras/camera';
import { Mesh } from '../../objects/mesh';
import { drawObjectList, m4, resizeCanvasToDisplaySize, setDefaults } from 'twgl.js';

export class WebGLRenderer {
  public gl: WebGLRenderingContext;

  view = m4.identity();
  viewProjection = m4.identity();

  tex!: WebGLTexture;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl');
    if (!gl) {
      throw new Error('无法初始化WebGL');
    }
    this.gl = gl;
    this.init();
  }

  private init() {
    setDefaults({ attribPrefix: 'a_' });
  }

  private drawScene(camera: Camera, drawObjects: Mesh[]) {
    const gl = this.gl;
    resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camera.updateMatrix();

    const viewProjection = camera.viewProjection;
    drawObjects.forEach(mesh => {
      mesh.object.updateMatrix();
      const uni = mesh.material.uniforms;
      const world = mesh.object.matrix;
      mesh.material.uniforms.u_world = world;
      m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
      m4.multiply(viewProjection, uni.u_world, uni.u_worldViewProjection);
    });

    drawObjectList(
      gl,
      drawObjects.map(obj => {
        return {
          uniforms: obj.material.uniforms,
          programInfo: obj.material.programInfo,
          bufferInfo: obj.geometry.bufferInfo,
        };
      }),
    );
  }

  public render = (camera: Camera, drawObjects: Mesh[]) => {
    this.drawScene(camera, drawObjects);
  };
}
