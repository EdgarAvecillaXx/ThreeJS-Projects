import { AmbientLight } from 'three';

function GeneralLight(scene, gui) {
  const ambientLight = new AmbientLight('#b9d5ff', 0.12);

  //debug
  const folder = gui.addFolder('Ambient Light');
  folder.add(ambientLight, 'intensity').min(0).max(1).step(0.001);

  scene.add(ambientLight);
}

export default GeneralLight;
