import {} from 'three';

function Component(scene, gui) {
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());

  scene.add(cube);

  this.update = () => {};
}

export default Component;
