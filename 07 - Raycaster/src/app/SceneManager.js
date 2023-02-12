import { Clock, PerspectiveCamera, Scene, WebGLRenderer, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

import Spheres from './SceneComponents/Spheres';
import Raycaster from './SceneComponents/Raycaster';

function SceneManager(canvas) {
  // Debug
  const gui = new GUI();

  // CLock
  const clock = new Clock();

  // Screen
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  // Scene

  const buildScene = () => new Scene();

  const buildRenderer = ({ width, height }) => {
    const renderer = new WebGLRenderer({ canvas: canvas });
    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(DPR);

    return renderer;
  };

  const buildCamera = ({ width, height }) => {
    const aspect = width / height;
    const fov = 75;
    const near = 0.1;
    const far = 100;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;

    return camera;
  };

  const createSceneComponents = (scene, gui) => {
    const sceneComponents = [new Spheres(scene, gui), new Raycaster(scene, gui)];

    return sceneComponents;
  };

  const scene = buildScene();
  const renderer = buildRenderer(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneComponents = createSceneComponents(scene, gui);
  const defaultControls = new OrbitControls(camera, canvas);
  defaultControls.enableDamping = true;
  const mouse = new Vector2();

  // Animate function
  this.animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update Controls
    defaultControls.update();

    // Update SceneComponents
    sceneComponents.forEach(component => {
      component?.update && component.update(elapsedTime, scene, camera, mouse);
    });

    // Render
    renderer.render(scene, camera);
  };

  // Listeners
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

  this.mousemove = _event => {
    mouse.x = (_event.clientX / screenDimensions.width) * 2 - 1;
    mouse.y = -(_event.clientY / screenDimensions.height) * 2 + 1;
  };
}

export default SceneManager;
