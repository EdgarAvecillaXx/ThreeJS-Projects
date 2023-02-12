import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
function Spheres(scene, gui) {
  const sphereGeometry = new SphereGeometry(0.5, 16, 16);
  const material = new MeshBasicMaterial({ color: 0xff0000 });

  const sphere1 = new Mesh(sphereGeometry, material.clone());
  sphere1.position.x = -2;
  sphere1.name = 'sphere1';
  const sphere2 = new Mesh(sphereGeometry, material.clone());
  sphere2.name = 'sphere2';
  const sphere3 = new Mesh(sphereGeometry, material.clone());
  sphere3.position.x = 2;
  sphere3.name = 'sphere3';

  scene.add(sphere1, sphere2, sphere3);

  this.update = time => {
    sphere1.position.y = Math.sin(time * 0.3) * 1.5;
    sphere2.position.y = Math.sin(time * 0.8) * 1.5;
    sphere3.position.y = Math.sin(time * 1.4) * 1.5;
  };
}

export default Spheres;
