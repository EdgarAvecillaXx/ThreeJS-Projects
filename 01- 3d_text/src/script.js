import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

//utils
import randomGeometries from './utils/randomizeGeometries';

//Geometries
import { donut, plus, title, titleAnimation } from './geometries';

/**
 * Base
 */

const sizes = {
  w: window.innerWidth,
  h: window.innerHeight,
};

// Canvas
const canvas = document.querySelector('canvas.webgl');
// Scene
const scene = new THREE.Scene();

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h, 0.1, 100);
camera.position.set(0, 0, 8);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.w, sizes.h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update(); // Update Controls

  titleAnimation(scene, elapsedTime); //title Animation

  renderer.render(scene, camera); // Render

  window.requestAnimationFrame(tick); // Call tick again on the next frame
};

/**
 * Object
 */
randomGeometries(scene, donut, 150); //  Random Donuts

randomGeometries(scene, plus, 150); // Random Plus

title(scene, tick);

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.w = window.innerWidth;
  sizes.h = window.innerHeight;

  //update camera
  camera.aspect = sizes.w / sizes.h;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.w, sizes.h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});