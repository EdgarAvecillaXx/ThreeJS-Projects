import './src/style.css';
import init from './src/app/sceneManager.js';

const canvas = document.getElementById('webgl');
const sceneManager = new init(canvas);

function bindEventListeners() {
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

bindEventListeners();
render();
