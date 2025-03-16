import { vec3 } from "gl-matrix";
import { Color } from "./color";

/**
 * 三角形
 */
export class Face4 {
    /** 顶点索引 */
    a: number;
    /** 顶点索引 */
	b: number;
    /** 顶点索引 */
	c: number;
    /** 顶点索引 */
    d: number;

	normal = vec3.create();
	screen = vec3.create();

	color: Color;
    constructor(a: number, b: number, c: number, d: number, normal = vec3.create(), color = new Color( 0x000000 )) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.screen = vec3.create();
        this.normal = normal;
        this.color = color;
    }
}