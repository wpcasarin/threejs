import { Scene, AnimationMixer, AnimationAction } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

type State = 'IDLE' | 'RUNNING' | 'JUMP';

export class Player {
  private readonly scene: Scene;
  private state!: State;
  private nextSate!: State;
  private mixer!: AnimationMixer;
  private actions: Map<State, AnimationAction>;
  private readonly keys: Set<string>;
  // private nextAction:
  constructor(scene: Scene, keys: Set<string>) {
    this.scene = scene;
    this.keys = keys;
    this.actions = new Map();
    // this.nextAction;
    this.init();
  }

  private init() {
    this.state = 'IDLE';
    const loader = new FBXLoader();
    loader.load('assets/james.fbx', (fbx) => {
      fbx.scale.setScalar(0.01);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      this.mixer = new AnimationMixer(fbx);
      const anim = new FBXLoader();
      anim.load('assets/animation_idle.fbx', (anim) => {
        const idle = this.mixer.clipAction(anim.animations[0]);
        this.actions.set('IDLE', idle);
        idle.play();
      });
      anim.load('assets/animation_running.fbx', (anim) => {
        const run = this.mixer.clipAction(anim.animations[0]);
        this.actions.set('RUNNING', run);
      });
      anim.load('assets/animation_jump.fbx', (anim) => {
        const run = this.mixer.clipAction(anim.animations[0]);
        this.actions.set('JUMP', run);
      });
      this.scene.add(fbx);
    });
  }

  private changeState() {
    if (this.keys.has('w') && this.keys.has(' ')) {
      this.nextSate = 'JUMP';
      console.log('FOI');
    } else if (this.keys.has('w')) {
      this.nextSate = 'RUNNING';
    } else {
      this.nextSate = 'IDLE';
    }
  }

  public update(delta: number) {
    this.changeState();
    if (this.state !== this.nextSate) {
      const current = this.actions.get(this.state);
      const next = this.actions.get(this.nextSate);
      current?.fadeOut(0.2);
      next?.reset().fadeIn(0.2).play();
      this.state = this.nextSate;
    }

    this.mixer && this.mixer.update(delta);
  }
}
