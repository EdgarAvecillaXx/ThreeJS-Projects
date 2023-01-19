import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('textures/bakedShadow.jpg');
const simpleShadow = textureLoader.load('textures/simpleShadow.jpg');

/**
 * Lights
 */
//! Only Directional , Point and Spotlight lights support shadows
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;

// ! sizes del shadow map, 512 default, si se mejora debe ser en exponencial 2, por los mipmaps
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

//! Directional Light uses a Orthograpic Camera for shadow mapping
// Directional Light Shadow Camera
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 7;

directionalLight.shadow.radius = 8; // can control the shadow blur, general and poop quality blur, don't work with PCFSoft

//Directional Light Debug
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(directionalLight);

//SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 5, Math.PI * 0.3);
spotLight.position.set(0, 2, 2);

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
//spotlight uses perspective camera for the shadow map (fov)
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1.5;
spotLight.shadow.camera.far = 5;
scene.add(spotLight, spotLight.target);

//PointLight
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.set(-1, 1, 0);

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 4;

scene.add(pointLight);

/**
 * Objects
 */

//Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
directionalLightCameraHelper.visible = false;
directionalLightHelper.visible = false;
spotLightCameraHelper.visible = false;
spotLightHelper.visible = false;
pointLightCameraHelper.visible = false;
pointLightHelper.visible = false;

scene.add(
  directionalLightHelper,
  directionalLightCameraHelper,
  spotLightHelper,
  spotLightCameraHelper,
  pointLightHelper,
  pointLightCameraHelper
);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = false; // this properties indicates if the object generate a shadow

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({ map: bakedShadow })
);

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true; // Indicates the object receives the projection of a shadow

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: simpleShadow, transparent: true })
);
sphereShadow.rotateX(-Math.PI * 0.5);
sphereShadow.position.y = plane.position.y + 0.001;

scene.add(plane, sphere, sphere2, sphereShadow);

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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock();
const sphereBouncing = elapsedTime => {
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
};

const shadowAnimation = () => {
  const shift = sphere.position.y;
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = 1 - sphere.position.y * 0.3;
  sphereShadow.scale.set(1 + shift * 0.3, 1 + shift * 0.3, 1 + shift * 0.3);
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Sphere
  sphereBouncing(elapsedTime);
  shadowAnimation(elapsedTime);

  // Render

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
