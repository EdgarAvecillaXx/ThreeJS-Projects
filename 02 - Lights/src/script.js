import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Cube, Sphere, Torus, Plane } from './geometries';
import GUI from 'lil-gui';

const gui = new GUI();
/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl'); //Canvas
const scene = new THREE.Scene(); //Scene

/**
 * Lights
 */
// ambient Light -> light in ambient, simulates the light bouncing
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;

//Directional Light -> Sun like Effect, as if sun rays were traveling in parallel
const directionalLight = new THREE.DirectionalLight(0x00fffc);
directionalLight.position.set(1, 0.25, 0);

// Hemisphere Light -> Like Ambient different color from sky than ground
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);

// Point Light
const pointLight = new THREE.PointLight(0xff9000, 0.5, 5, 1);
pointLight.position.set(1, -0.5, 1);

// Rect Area Light -> only works with Standard and Physical materials
const rectAreaLight = new THREE.RectAreaLight(0x4e00af, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());

//spotLight
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.getWorldPosition.set(0, 2, 2);
//spotlight need a target to redirection the light

scene.add(ambientLight, directionalLight, hemisphereLight, pointLight, rectAreaLight, spotLight);

/**
 * Objects
 */
const sphere = Sphere();
sphere.position.x = -1.5;

const cube = Cube();

const torus = Torus();
torus.position.x = 1.5;

const plane = Plane();
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;
scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

const folder1 = gui.addFolder('Ambient Light');
folder1.addColor(ambientLight, 'color').name('Color');
folder1.add(ambientLight, 'intensity', 0, 1, 0.0001).name('Intensity');

const folder2 = gui.addFolder('Directional Light');
folder2.addColor(directionalLight, 'color').name('Color');
folder2.add(directionalLight.position, 'x', 0, 100, 0.0001).name('position x');
folder2.add(directionalLight.position, 'y', 0, 100, 0.0001).name('position y');
folder2.add(directionalLight.position, 'z', 0, 100, 0.0001).name('position z');
folder2.add(directionalLight, 'visible');

const folder3 = gui.addFolder('Hemisphere Light');
folder3.addColor(hemisphereLight, 'color').name('Sky color');
folder3.addColor(hemisphereLight, 'groundColor').name('Ground color');
folder3.add(hemisphereLight, 'visible');
