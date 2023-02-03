import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

import Galaxy from './SceneComponents/Galaxy';

function SceneManager(canvas) {
  //debug
  const gui = new GUI({ title: 'Galaxy Generator', width: 360 });

  //Clock
  const clock = new Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.Height,
  };

  const scene = buildScene();
  const renderer = buildRenderer(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneComponents = createSceneComponents(scene, gui);
  const defaultControls = new OrbitControls(camera, canvas);
  defaultControls.enableDamping = true;

  //Scene
  function buildScene() {
    const scene = new Scene();

    return scene;
  }

  //Renderer
  function buildRenderer({ width, height }) {
    const renderer = new WebGLRenderer({ canvas: canvas });
    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(DPR);

    return renderer;
  }

  //Camera
  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fov = 75;
    const near = 0.1;
    const far = 100;
    const camera = new PerspectiveCamera(fov, aspectRatio, near, far);
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;

    return camera;
  }

  //Scene Components
  function createSceneComponents(scene, gui) {
    const sceneComponents = [new Galaxy(scene, gui)];

    return sceneComponents;
  }

  //Animate
  this.animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    defaultControls.update();

    // Update SceneComponents
    sceneComponents.forEach(sceneComponent => {
      sceneComponent.update && sceneComponent.update(elapsedTime);
    });

    // Render
    renderer.render(scene, camera);
  };

  //Listeners
  this.resize = () => {
    // Update sizes
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

  this.fullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      canvas.requestFullscreen();
    }
  };
}

export default SceneManager;
