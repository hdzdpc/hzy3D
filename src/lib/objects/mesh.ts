import { Object3D } from './object-3d';
import { Geometry } from '../core/geometry';

/**
 * mesh
 * 包含渲染信息
 */
export class Mesh extends Object3D {
  geometry: Geometry;
  //   drawInfo: DrawInfo;
  /** 是否双面渲染 */
  doubleSided = false;
  constructor(geometry: Geometry) {
    super();
    this.geometry = geometry;
  }
}
