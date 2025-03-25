import { mat4, vec3 } from 'gl-matrix';
import { Camera } from '../cameras/camera';
import { Mesh } from '../objects/mesh';
import { Scene } from '../scenes/scene';

export class Renderer {
  matrix = mat4.create();
  project(scene: Scene, camera: Camera) {
    if (camera.autoUpdateMatrix) {
      camera.updateMatrix();
    }

    for (let i = 0; i < scene.objects.length; ++i) {
      const object = scene.objects[i];
      if (object.autoUpdateMatrix) {
        object.updateMatrix();
      }
      if (object instanceof Mesh) {
        mat4.multiply(this.matrix, camera.matrix, object.matrix);
        const verticesLength = object.geometry.vertices.length;
        for (let j = 0; j < verticesLength; j++) {
          const vertex = object.geometry.vertices[j];
          vec3.copy(vertex.position, vertex.position);
          mat4.translate(this.matrix, this.matrix, vertex.screen);

          mat4.translate(camera.projection, camera.projection, vertex.screen);

          vertex.__visible = vertex.screen[2] > 0 && vertex.screen[2] < 1;
        }
      }
    }
  }
}
