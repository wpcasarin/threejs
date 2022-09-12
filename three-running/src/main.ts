import './style.css';
import * as THREE from 'three';
import { GameScene } from './classes/GameScene';
import { GameCamera } from './classes/GameCamera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Player } from './classes/Player';
import { handleKeypress } from './keyboardHandler';

// VARIABLES
const screen = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const pressedKeys: Set<string> = new Set();
const clock = new THREE.Clock();
// CAMERA
const camera = new GameCamera(60, screen.width / screen.height, 0.1, 100);
// SCENE
const scene = new GameScene();
// PLAYER
const player = new Player(scene, pressedKeys);
// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// INIT FUNCTION
const init = () => {
  handleKeypress(pressedKeys);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(screen.width, screen.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);
};
// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
// GAME LOOP
const loop = () => {
  window.requestAnimationFrame(loop);
  const delta = clock.getDelta();
  player.update(delta);
  renderer.render(scene, camera);
  controls.update();
};
// EVENTS
document.addEventListener('DOMContentLoaded', () => {
  init();
  window.requestAnimationFrame(loop);
});

window.addEventListener('resize', () => {
  camera.reset();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
