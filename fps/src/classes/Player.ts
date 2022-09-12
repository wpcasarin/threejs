import { Scene, PerspectiveCamera, Group, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export class Player {
  private readonly scene: Scene;
  private readonly camera: PerspectiveCamera;
  private readonly mtlLoader = new MTLLoader();
  private readonly objLoader = new OBJLoader();
  private readonly rotateSpeed: number;
  private readonly moveSpeed: number;
  private blaster?: Group;
  private direction: Vector3;

  constructor(scene: Scene, camera: PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;
    this.rotateSpeed = 0.02;
    this.moveSpeed = 0.1;
    this.direction = new Vector3();
  }

  async init() {
    this.blaster = await this.createBlaster();
    this.scene.add(this.blaster);
    this.blaster.position.z = 3;
    this.blaster.position.y = 1;
    // Fix camera on player
    this.blaster.add(this.camera);
    this.camera.position.z = 1;
    this.camera.position.y = 0.6;
  }

  move(keys: Set<string>) {
    const shiftPressed = keys.has('shift');
    this.camera.getWorldDirection(this.direction);
    if (keys.has('w')) {
      this.blaster?.position.add(
        this.direction.clone().multiplyScalar(this.moveSpeed)
      );
    }
    if (keys.has('s')) {
      this.blaster?.position.add(
        this.direction.clone().multiplyScalar(-this.moveSpeed)
      );
    }
    if (!shiftPressed) {
      if (keys.has('a')) {
        this.blaster?.rotateY(this.rotateSpeed);
      }
      if (keys.has('d')) {
        this.blaster?.rotateY(-this.rotateSpeed);
      }
    }
    if (shiftPressed) {
      const strafeDir = this.direction.clone();
      const upVector = new Vector3(0, 1, 0);
      if (keys.has('a')) {
        this.blaster?.position.add(
          strafeDir
            .applyAxisAngle(upVector, Math.PI * 0.5)
            .multiplyScalar(this.moveSpeed)
        );
      }
      if (keys.has('d')) {
        this.blaster?.position.add(
          strafeDir
            .applyAxisAngle(upVector, Math.PI * -0.5)
            .multiplyScalar(this.moveSpeed)
        );
      }
    }
  }

  private async createBlaster() {
    const mtl = await this.mtlLoader.loadAsync('assets/blasterG.mtl');
    mtl.preload();
    this.objLoader.setMaterials(mtl);
    return await this.objLoader.loadAsync('assets/blasterG.obj');
  }
}
