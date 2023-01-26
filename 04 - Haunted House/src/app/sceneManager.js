import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock, Color, PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { GUI } from 'lil-gui';
import { GeneralLight, MoonLight, Grass, House, Graves, Ghosts } from './SceneComponents';

function SceneManager(canvas) {
  const gui = new GUI();

  const clock = new Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = buildScene();
  scene.background = new Color('#262837');
  const renderer = buildRender(screenDimensions);

  const camera = buildCamera(screenDimensions);
  const sceneComponents = createSceneComponents(scene, gui);
  const controls = buildControls(camera, canvas);

  function buildScene() {
    const scene = new Scene();
    //scene.background = new Color('#000');

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new WebGLRenderer({ canvas: canvas });
    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor('#262837');
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.localClippingEnabled = true;
    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 75;
    const nearPlane = 0.1;
    const farPlane = 100;
    const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.x = 4;
    camera.position.y = 2;
    camera.position.z = 5;

    return camera;
  }

  function createSceneComponents(scene, gui) {
    const sceneComponents = [
      new GeneralLight(scene, gui),
      new MoonLight(scene, gui),
      new Grass(scene, gui),
      new House(scene, gui),
      new Graves(scene, gui),
      new Ghosts(scene, gui),
    ];

    return sceneComponents;
  }

  function buildControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    return controls;
  }

  this.animate = function () {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Animations
    sceneComponents.forEach(component => {
      component.update && component.update(elapsedTime);
    });

    // Render
    renderer.render(scene, camera);
  };

  this.resize = function () {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  this.fullscreen = function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      canvas.requestFullscreen();
    }
  };
}

export default SceneManager;

//const textureLoader = new THREE.TextureLoader();
