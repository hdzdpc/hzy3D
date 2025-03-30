import { createProgramInfo, createTexture, m4, primitives } from 'twgl.js';
import { WebGLRenderer } from '../../../lib/renderers/webgl/webgl-renderer';
import { Camera } from '../../../lib/cameras/camera';
import { Geometry } from '../../../lib/core/geometry';
import { Material } from '../../../lib/materials/material';
import { vertexShaderSource, fragmentShaderSource } from '../../../lib/renderers/shaders/cube.glsl';
import { MyObject } from './my-object';
import { World } from '../../../lib/game/world';
let then = 0;
let camera: Camera;
let world: World;
export function gameLogic(canvas: HTMLCanvasElement) {
  world = new World();
  const renderer = new WebGLRenderer(canvas);
  camera = createCamera(canvas);

  const scene = buildScene(renderer.gl);

  const loop = (now: number) => {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    onUpdate(scene, deltaTime, now);

    renderer.render(camera, scene);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}

function createCamera(canvas: HTMLCanvasElement) {
  const cameraObj = world.createObject();
  const camera = cameraObj.addComponent<Camera>(Camera);
  camera.eye = [1, 4, -20];
  camera.target = [0, 0, 0];
  camera.up = [0, 1, 0];
  camera.projection = m4.perspective((30 * Math.PI) / 180, canvas.clientWidth / canvas.clientHeight, 0.5, 100);

  return camera;
}

function onUpdate(drawObjects: MyObject[], deltaTime: number, time: number) {
  drawObjects.forEach(obj => {
    obj.rotation[0] = time;
    obj.rotation[1] = time * obj.ySpeed;
    obj.rotation[2] = time * obj.zSpeed;
  });
}

function buildScene(gl: WebGLRenderingContext) {
  const drawObjects: MyObject[] = [];
  const programInfo = createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
  const shapes = [
    primitives.createCubeBufferInfo(gl, 2),
    primitives.createSphereBufferInfo(gl, 1, 24, 12),
    primitives.createPlaneBufferInfo(gl, 2, 2),
    primitives.createTruncatedConeBufferInfo(gl, 1, 0, 2, 24, 1),
    primitives.createCresentBufferInfo(gl, 1, 1, 0.5, 0.1, 24),
    primitives.createCylinderBufferInfo(gl, 1, 2, 24, 2),
    primitives.createDiscBufferInfo(gl, 1, 24),
    primitives.createTorusBufferInfo(gl, 1, 0.4, 24, 12),
  ];
  const tex = createTexture(gl, {
    min: gl.NEAREST,
    mag: gl.NEAREST,
    src: [255, 255, 255, 255, 192, 192, 192, 255, 192, 192, 192, 255, 255, 255, 255, 255],
  });
  const numObjects = 100;
  const lightWorldPosition = [1, 8, -10];
  const lightColor = [1, 1, 1, 1];
  for (let ii = 0; ii < numObjects; ++ii) {
    const uniforms = {
      u_lightWorldPos: lightWorldPosition,
      u_lightColor: lightColor,
      u_diffuseMult: [0.8, 0.48, 0.7726648771266047, 1],
      u_specular: [1, 1, 1, 1],
      u_shininess: 50,
      u_specularFactor: 1,
      u_diffuse: tex,
      u_viewInverse: m4.identity(),
      u_world: m4.identity(),
      u_worldInverseTranspose: m4.identity(),
      u_worldViewProjection: m4.identity(),
    };
    const obj = new MyObject(new Geometry(shapes[ii % shapes.length]), new Material(programInfo, uniforms));
    obj.position = [rand(-10, 10), rand(-10, 10), rand(-10, 10)];
    obj.ySpeed = rand(0.1, 0.3);
    obj.zSpeed = rand(0.1, 0.3);
    drawObjects.push(obj);
  }
  return drawObjects;
}
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}
