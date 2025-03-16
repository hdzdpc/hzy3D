import { vec3 } from "gl-matrix";

export class Vertex {
    position: vec3;
    normal: vec3;
    screen: vec3;
    __visible = true;
    constructor(position: vec3, normal: vec3) {
        this.position = position || vec3.create();
        this.normal = normal || vec3.create();
        this.screen = vec3.create();
    }
}