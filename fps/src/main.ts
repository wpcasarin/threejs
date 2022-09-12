import './style.css';
import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer, Scene, GridHelper } from 'three';
import { GameScene } from './classes/GameScene';
import { GameLight } from './classes/GameLight';
import { Player } from './classes/Player';
import { handleKeyPress } from './keyboard';

// VARIABLES
const screenSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const pressedKeys: Set<string> = new Set();

// CAMERA
const camera = new PerspectiveCamera(
  60,
  screenSize.width / screenSize.height,
  0.1,
  100
);
// SCENE
const scene = new GameScene();

// LIGHT
const light = new GameLight(scene);

// FLOOR
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshPhongMaterial({ color: 0x0d0d0d, depthWrite: false })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const helper = new GridHelper(200, 100);
helper.rotation.x = -Math.PI / 2;
mesh.add(helper);

// PLAYER
const player = new Player(scene, camera);
player.init();

// RENDERER
const renderer = new WebGLRenderer({
  canvas: document.querySelector('canvas') as HTMLCanvasElement,
  antialias: true,
});
renderer.setSize(screenSize.width, screenSize.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const init = () => {
  handleKeyPress(pressedKeys);
  animate();
};

function animate() {
  requestAnimationFrame(animate);
  player.move(pressedKeys);
  renderer.render(scene, camera);
}

window.addEventListener('load', () => init());
