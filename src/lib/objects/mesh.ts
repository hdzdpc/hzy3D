import { GameObject } from './game-object';
import { Geometry } from '../core/geometry';
import { Material } from '../materials/material';

/**
 * mesh
 * 包含渲染信息
 */
export class Mesh extends GameObject {
  geometry: Geometry;
  material: Material;
  //   drawInfo: DrawInfo;
  /** 是否双面渲染 */
  doubleSided = false;
  constructor(geometry: Geometry, material: Material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }
}
