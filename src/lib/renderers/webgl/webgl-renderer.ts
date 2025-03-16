import { mat4 } from 'gl-matrix';

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

export class WebGLRenderer {
  private gl: WebGLRenderingContext;
  private programInfo: ProgramInfo | null = null;
  private buffers: Buffers | null = null;
  private rotation: number = 0.0;
  private then: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl');
    if (!gl) {
      throw new Error('无法初始化WebGL');
    }
    this.gl = gl;
    this.init();
  }

  private init() {
    const shaderProgram = this.initShaderProgram();
    if (!shaderProgram) return;

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    this.buffers = this.initBuffers();
  }

  private initShaderProgram(): WebGLProgram | null {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return null;

    const shaderProgram = this.gl.createProgram();
    if (!shaderProgram) return null;

    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.error('无法初始化着色器程序: ' + this.gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  private loadShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('编译着色器时发生错误: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private initBuffers(): Buffers {
    const positions = [
      // Front face
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      // Back face
      -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
      // Top face
      -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
      // Bottom face
      -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
      // Right face
      1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
      // Left face
      -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    const faceColors = [
      [1.0, 1.0, 1.0, 1.0], // Front face: white
      [1.0, 0.0, 0.0, 1.0], // Back face: red
      [0.0, 1.0, 0.0, 1.0], // Top face: green
      [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
      [1.0, 1.0, 0.0, 1.0], // Right face: yellow
      [1.0, 0.0, 1.0, 1.0], // Left face: purple
    ];

    let colors: number[] = [];
    for (let j = 0; j < faceColors.length; j++) {
      const c = faceColors[j];
      colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

    const indices = [
      0,
      1,
      2,
      0,
      2,
      3, // Front
      4,
      5,
      6,
      4,
      6,
      7, // Back
      8,
      9,
      10,
      8,
      10,
      11, // Top
      12,
      13,
      14,
      12,
      14,
      15, // Bottom
      16,
      17,
      18,
      16,
      18,
      19, // Right
      20,
      21,
      22,
      20,
      22,
      23, // Left
    ];

    const indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
  }

  private drawScene(deltaTime: number) {
    if (!this.programInfo || !this.buffers) return;

    this.rotation += deltaTime;

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const fieldOfView = (45 * Math.PI) / 180;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation, [0, 1, 1]);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
    this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
    this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

    this.gl.useProgram(this.programInfo.program);

    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
  }

  public render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - this.then;
    this.then = now;

    this.drawScene(deltaTime);
  };

  private readonly vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  private readonly fragmentShaderSource = `
    varying lowp vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }
  `;
}
