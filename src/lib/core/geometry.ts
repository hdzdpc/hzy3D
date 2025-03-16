import { vec3 } from "gl-matrix";
import { Vertex } from "./vertex";
import { Face3 } from "./face3";
import { Face4 } from "./face4";

export class Geometry {
	vertices: Vertex[] = [];
	faces: Face3[] | Face4[] = [];
	uvs = [];

	computeNormals() {

		let  f, vA, vB, vC, cb, ab, normal;

		for( let v = 0; v < this.vertices.length; v++ ) {
			vec3.set(this.vertices[v].normal, 0 ,0 ,0);

		}

		for( f = 0; f < this.faces.length; f++ ) {

			vA = this.vertices[ this.faces[f].a ];
			vB = this.vertices[ this.faces[f].b ];
			vC = this.vertices[ this.faces[f].c ];

			cb = vec3.create();
			ab = vec3.create();
			normal = vec3.create();

			vec3.sub(cb,vC.position,vB.position);
			vec3.sub(ab,vA.position,vB.position);
			vec3.cross(cb, cb, ab);

			if ( vec3.len(cb) > 0 ) {
				vec3.normalize(cb, cb);
			}

			this.faces[f].normal = cb;

			vec3.add( vA.normal, vA.normal, normal );
			vec3.add( vB.normal, vB.normal, normal );
			vec3.add( vC.normal, vC.normal, normal );

			if ( this.faces[f] instanceof Face4 ) {
				const t_normal = this.vertices[ (this.faces[f] as Face4).d ].normal;
				vec3.add(t_normal, t_normal, normal);
			}

		}

	};

};