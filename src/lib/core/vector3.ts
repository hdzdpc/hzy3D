// export class Vector3 {
//   x: number;
//   y: number;
//   z: number;

//   constructor(x = 0, y = 0, z = 0) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }

//   set(x: number, y: number, z: number) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
//   copy(v: Vector3) {
//     this.x = v.x;
//     this.y = v.y;
//     this.z = v.z;
//   }

//   add(v1: Vector3, v2: Vector3) {
//     this.x = v1.x + v2.x;
//     this.y = v1.y + v2.y;
//     this.z = v1.z + v2.z;
//   }

//   addSelf(v: Vector3) {
//     this.x += v.x;
//     this.y += v.y;
//     this.z += v.z;
//   }

//   addScalar(s: number) {
//     this.x += s;
//     this.y += s;
//     this.z += s;
//   }

//   sub(v1: Vector3, v2: Vector3) {
//     this.x = v1.x - v2.x;
//     this.y = v1.y - v2.y;
//     this.z = v1.z - v2.z;
//   }

//   subSelf(v: Vector3) {
//     this.x -= v.x;
//     this.y -= v.y;
//     this.z -= v.z;
//   }

//   cross(v1: Vector3, v2: Vector3) {
//     this.x = v1.y * v2.z - v1.z * v2.y;
//     this.y = v1.z * v2.x - v1.x * v2.z;
//     this.z = v1.x * v2.y - v1.y * v2.x;
//   }
//   crossSelf(v: Vector3) {
//     var tx = this.x,
//       ty = this.y,
//       tz = this.z;

//     this.x = ty * v.z - tz * v.y;
//     this.y = tz * v.x - tx * v.z;
//     this.z = tx * v.y - ty * v.x;
//   }

//   length() {
//     return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
//   }

//   multiplyScalar(s: number) {
//     this.x *= s;
//     this.y *= s;
//     this.z *= s;
//   }

//   normalize() {
//     if (this.length() > 0) {
//       this.multiplyScalar(1 / this.length());
//     } else {
//       this.multiplyScalar(0);
//     }
//   }
// }
