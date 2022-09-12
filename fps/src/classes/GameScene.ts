import { Color, Fog, Scene } from 'three';

export class GameScene extends Scene {
  constructor() {
    super();
    this.background = new Color(0xa0a0a0);
    this.fog = new Fog(0xa0a0a0, 10, 50);
  }
}
