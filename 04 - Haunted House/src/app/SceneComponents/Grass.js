import { Float32BufferAttribute, Fog, FogExp2, Mesh, PlaneGeometry } from 'three';
import { grassMaterial } from './materials';

function Grass(scene, gui) {
  const floor = new Mesh(new PlaneGeometry(20, 20, 100, 100), grassMaterial);
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = -0.2;
  floor.geometry.setAttribute('uv2', new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
  floor.receiveShadow = true;

  const fog = new FogExp2('#262837', 0.16);
  scene.fog = fog;
  scene.add(floor);
}

export default Grass;
