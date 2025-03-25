import { Mesh } from '../../../lib/objects/mesh';

export class MyObject extends Mesh {
  translation: number[] = [0, 0, 0];
  ySpeed: number = 0;
  zSpeed: number = 0;
}
