import {
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  HemisphereLight,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Scene,
} from 'three';

export class GameScene extends Scene {
  private dirLight!: DirectionalLight;
  private hemiLight!: HemisphereLight;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.background = new Color(0xa0a0a0);
    this.fog = new Fog(0xa0a0a0, 10, 50);
    this.initDirectionalLight();
    this.initHemisphereLight();
    this.initFloor();
  }

  private initDirectionalLight() {
    this.dirLight = new DirectionalLight(0xffffff);
    this.dirLight.position.set(10, 20, -10);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = 4;
    this.dirLight.shadow.camera.bottom = -4;
    this.dirLight.shadow.camera.left = -4;
    this.dirLight.shadow.camera.right = 4;
    this.dirLight.shadow.camera.near = 0.1;
    this.dirLight.shadow.camera.far = 40;
    this.add(this.dirLight);
  }

  private initHemisphereLight() {
    this.hemiLight = new HemisphereLight(0xffffff, 0x444444);
    this.hemiLight.position.set(0, 20, 0);
    this.add(this.hemiLight);
  }

  private initFloor() {
    const mesh = new Mesh(
      new PlaneGeometry(200, 200),
      new MeshPhongMaterial({ color: 0x0d0d0d, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    const helper = new GridHelper(200, 100);
    helper.rotation.x = -Math.PI / 2;
    mesh.add(helper);

    this.add(mesh);
  }
}
