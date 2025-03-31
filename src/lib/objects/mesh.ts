import { Geometry } from '../core/geometry';
import { Material } from '../materials/material';
import { Component } from '../game/component';

/**
 * mesh
 * 包含渲染信息
 */
export class Mesh extends Component {
  geometry!: Geometry;
  material!: Material;
  //   drawInfo: DrawInfo;
  /** 是否双面渲染 */
  doubleSided = false;
  constructor() {
    super();
  }
  // constructor(geometry: Geometry, material: Material) {
  //   super();
  //   this.geometry = geometry;
  //   this.material = material;
  // }
}
