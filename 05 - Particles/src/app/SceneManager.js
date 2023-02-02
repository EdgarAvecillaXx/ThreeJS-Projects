import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import Particles from './SceneComponents/Particles';

function SceneManager(canvas) {
  //DEBUG
  const gui = new GUI();

  //Clock
  const clock = new Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = buildScene();
  const renderer = buildRenderer(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneComponents = createSceneComponents(scene, gui);
  const defaultControls = new OrbitControls(camera, canvas);
  defaultControls.enableDamping = true;

  function buildScene() {
    const scene = new Scene();

    return scene;
  }

  function buildRenderer({ width, height }) {
    const renderer = new WebGLRenderer({ canvas: canvas });
    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(DPR);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fov = 75;
    const nearPlane = 0.1;
    const farPlane = 100;

    const camera = new PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    camera.position.z = 8;

    return camera;
  }

  function createSceneComponents(scene, gui) {
    const sceneComponents = [new Particles(scene, gui)];

    return sceneComponents;
  }

  this.animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    defaultControls.update();

    // Update scene
    sceneComponents.forEach(sceneComponent => {
      sceneComponent.update && sceneComponent.update(elapsedTime);
    });

    // Render
    renderer.render(scene, camera);
  };

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
