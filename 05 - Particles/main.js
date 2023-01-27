import './src/style.css';
import init from './src/app/SceneManager.js';

const canvas = document.querySelector('canvas.webgl');
const sceneManager = new init(canvas);

function bindListeners() {
  window.onresize = resizeCanvas;
  resizeCanvas();

  window.ondblclick = sceneManager.fullscreen;
}

function resizeCanvas() {
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  sceneManager.resize();
}

function render() {
  sceneManager.animate();
  requestAnimationFrame(render);
}

bindListeners();
render();
