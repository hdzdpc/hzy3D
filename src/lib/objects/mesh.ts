import { Geometry } from "../core/geometry";
import { Object3D } from "./object-3d";

export class Mesh extends Object3D {
    geometry: Geometry;
    /** 是否双面渲染 */
    doubleSided = false;
    constructor(geometry: Geometry) {
        super();
        this.geometry = geometry;
    }
}