import { DirectionalLight, HemisphereLight, Scene } from 'three';
export class GameLight {
  scene: Scene;
  hemiLight: HemisphereLight;
  dirLight: DirectionalLight;

  constructor(scene: Scene) {
    this.scene = scene;
    // Hemisphere
    this.hemiLight = new HemisphereLight(0xffffff, 0x444444);
    this.hemiLight.position.set(0, 20, 0);
    this.scene.add(this.hemiLight);

    this.dirLight = new DirectionalLight(0xffffff);
    this.dirLight.position.set(5, 10, -10);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = 4;
    this.dirLight.shadow.camera.bottom = -4;
    this.dirLight.shadow.camera.left = -4;
    this.dirLight.shadow.camera.right = 4;
    this.dirLight.shadow.camera.near = 0.1;
    this.dirLight.shadow.camera.far = 40;
    this.scene.add(this.dirLight);
  }
}
