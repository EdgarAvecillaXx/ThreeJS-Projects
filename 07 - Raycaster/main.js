import './src/style.css';
import init from './src/app/SceneManager';

const canvas = document.querySelector('canvas.webgl');
const sceneManager = new init(canvas);

const bindListeners = () => {
  window.onresize = resizeCanvas;
  resizeCanvas();

  window.ondblclick = sceneManager.fullscreen;
  window.onmousemove = sceneManager.mousemove;
};

const resizeCanvas = () => {
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  sceneManager.resize();
};

const render = () => {
  sceneManager.animate();
  requestAnimationFrame(render);
};

bindListeners();
render();
