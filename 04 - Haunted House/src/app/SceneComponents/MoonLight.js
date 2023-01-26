import { DirectionalLight } from 'three';

function MoonLight(scene, gui) {
  const moonLight = new DirectionalLight('#b9d5ff', 0.12);
  moonLight.position.set(4, 5, -2);

  //shadow
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.width = 256;
  moonLight.shadow.mapSize.height = 256;
  moonLight.shadow.camera.far = 15;

  const folder = gui.addFolder('MoonLight');
  folder.add(moonLight, 'intensity').min(0).max(1).step(0.001);
  folder.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
  folder.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
  folder.add(moonLight.position, 'z').min(-5).max(5).step(0.001);

  scene.add(moonLight);
}

export default MoonLight;
