import './style.css';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { Group } from 'three';

/**
 * Base
 */
// Debug
const gui = new GUI();

//LoadingManager
const manager = new THREE.LoadingManager(
  () => {
    console.log('Loading Complete!');
  },
  (url, loaded, total) => {
    console.log(`Loading file: ${url}
  Load ${loaded} out of ${total} files!`);
  },
  url => {
    console.log(`There was a problem uploading file: ${url}`);
  }
);
manager.onStart = (url, loaded, total) => {
  `Start loading file: ${url}
  Load ${loaded} out of ${total} files!`;
};

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(manager);
const matcapTexture = textureLoader.load('/textures/matcaps/9.png');

/**
 * Fonts
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const fontLoader = new FontLoader();
fontLoader.load('fonts/SparkyStones_Regular.typeface.json', font => {
  const textGeometry = new TextGeometry(`Edgar Avecilla\nWeb Developer`, {
    font,
    size: 0.5,
    height: 0.5,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.03) * 0.5,
  //     (textGeometry.boundingBox.max.y - 0.03) * 0.25,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );
  textGeometry.center();

  scene.add(new THREE.Mesh(textGeometry, material));
});

/**
 * Object
 */
// donuts
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

for (let i = 0; i < 150; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);
  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = 0.5;
  donut.scale.x = scale;
  donut.scale.y = scale;
  donut.scale.z = scale;

  scene.add(donut);
}
const boxGeometry = new THREE.BoxGeometry(0.6, (1 / 3) * 0.6, 0.3);
const boxGeometry2 = new THREE.BoxGeometry(0.6 * (1 / 3), 0.6, 0.3);

for (let i = 0; i < 150; i++) {
  const box1 = new THREE.Mesh(boxGeometry, material);
  const box2 = new THREE.Mesh(boxGeometry2, material);
  const plus = new THREE.Group();
  plus.add(box1);
  plus.add(box2);

  plus.position.x = (Math.random() - 0.5) * 15;
  plus.position.y = (Math.random() - 0.5) * 15;
  plus.position.z = (Math.random() - 0.5) * 15;

  plus.rotation.x = Math.random() * Math.PI;
  plus.rotation.y = Math.random() * Math.PI;

  const scale = 0.5;
  plus.scale.x = scale;
  plus.scale.y = scale;
  plus.scale.z = scale;

  scene.add(plus);
}

/*
 ** Sizes
 */
const sizes = {
  w: window.innerWidth,
  h: window.innerHeight,
};

window.addEventListener('resize', () => {
  //update sizes
  sizes.w = window.innerWidth;
  sizes.h = window.innerHeight;

  //update camera
  camera.aspect = sizes.w / sizes.h;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.w, sizes.h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen Listener
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h, 0.1, 100);
camera.position.set(0, 0, 8);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.w, sizes.h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elpasedTime = clock.getElapsedTime();

  // Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
