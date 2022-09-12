import { PerspectiveCamera } from 'three';

export class GameCamera extends PerspectiveCamera {
  constructor(
    fov: number | undefined,
    aspect: number | undefined,
    near: number | undefined,
    far: number | undefined
  ) {
    super(fov, aspect, near, far);
    this.init();
  }
  private init() {
    this.position.y = 3;
    this.position.z = -5;
  }
  reset() {
    this.aspect = window.innerWidth / window.innerHeight;
  }
}
