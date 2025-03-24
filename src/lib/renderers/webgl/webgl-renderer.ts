import { mat4 } from 'gl-matrix';
import { fragmentShaderSource, vertexShaderSource } from '../shaders/cube.glsl';
import { createProgramInfo, createTexture, drawObjectList, m4, primitives, resizeCanvasToDisplaySize } from 'twgl.js';

interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
}

interface Buffers {
  position: WebGLBuffer | null;
  color: WebGLBuffer | null;
  indices: WebGLBuffer | null;
}
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}
export class WebGLRenderer {
  private gl: WebGLRenderingContext;
  private programInfo: ProgramInfo | null = null;
  private buffers: Buffers | null = null;
  private rotation: number = 0.0;
  private then: number = 0;

  lightWorldPosition = [1, 8, -10];
  lightColor = [1, 1, 1, 1];
  camera = m4.identity();
  view = m4.identity();
  viewProjection = m4.identity();

  tex!: WebGLTexture;

  objects = [];
  drawObjects = [];
  numObjects = 100;
  baseHue = rand(0, 360);

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl');
    if (!gl) {
      throw new Error('无法初始化WebGL');
    }
    this.gl = gl;
    this.init();
  }

  private init() {
    const programInfo = createProgramInfo(this.gl, [vertexShaderSource, fragmentShaderSource]);
    const shapes = [
      primitives.createCubeBufferInfo(this.gl, 2),
      primitives.createSphereBufferInfo(this.gl, 1, 24, 12),
      primitives.createPlaneBufferInfo(this.gl, 2, 2),
      primitives.createTruncatedConeBufferInfo(this.gl, 1, 0, 2, 24, 1),
      primitives.createCresentBufferInfo(this.gl, 1, 1, 0.5, 0.1, 24),
      primitives.createCylinderBufferInfo(this.gl, 1, 2, 24, 2),
      primitives.createDiscBufferInfo(this.gl, 1, 24),
      primitives.createTorusBufferInfo(this.gl, 1, 0.4, 24, 12),
    ];
    this.tex = createTexture(this.gl, {
      min: this.gl.NEAREST,
      mag: this.gl.NEAREST,
      src: [255, 255, 255, 255, 192, 192, 192, 255, 192, 192, 192, 255, 255, 255, 255, 255],
    });

    for (let ii = 0; ii < this.numObjects; ++ii) {
      const uniforms = {
        u_lightWorldPos: this.lightWorldPosition,
        u_lightColor: this.lightColor,
        u_diffuseMult: [0.8, 0.48, 0.7726648771266047, 1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
        u_diffuse: this.tex,
        u_viewInverse: this.camera,
        u_world: m4.identity(),
        u_worldInverseTranspose: m4.identity(),
        u_worldViewProjection: m4.identity(),
      };
      this.drawObjects.push({
        programInfo: programInfo,
        bufferInfo: shapes[ii % shapes.length],
        uniforms: uniforms,
      });
      this.objects.push({
        translation: [rand(-10, 10), rand(-10, 10), rand(-10, 10)],
        ySpeed: rand(0.1, 0.3),
        zSpeed: rand(0.1, 0.3),
        uniforms: uniforms,
      });
    }
  }

  private drawScene(deltaTime: number) {
    const gl = this.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    const viewProjection = this.viewProjection;
    resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const projection = m4.perspective((30 * Math.PI) / 180, canvas.clientWidth / canvas.clientHeight, 0.5, 100);
    const eye = [1, 4, -20];
    const target = [0, 0, 0];
    const up = [0, 1, 0];
    m4.lookAt(eye, target, up, this.camera);
    m4.inverse(this.camera, this.view);
    m4.multiply(projection, this.view, viewProjection);

    this.objects.forEach(function (obj) {
      const uni = obj.uniforms;
      const world = uni.u_world;
      m4.identity(world);
      // m4.rotateY(world, time * obj.ySpeed, world);
      // m4.rotateZ(world, time * obj.zSpeed, world);
      m4.translate(world, obj.translation, world);
      // m4.rotateX(world, time, world);
      m4.transpose(m4.inverse(world, uni.u_worldInverseTranspose), uni.u_worldInverseTranspose);
      m4.multiply(viewProjection, uni.u_world, uni.u_worldViewProjection);
    });

    drawObjectList(gl, this.drawObjects);
  }

  public render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - this.then;
    this.then = now;

    this.drawScene(deltaTime);
  };
}
