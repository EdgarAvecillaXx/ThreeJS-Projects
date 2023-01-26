import { DoubleSide, MeshStandardMaterial } from 'three';
import { bush, door, grass, roof, wall, grave1, grave2 } from '../textures';

// Floor
export const grassMaterial = new MeshStandardMaterial({
  map: grass.color,
  aoMap: grass.ao,
  normalMap: grass.normal,
  displacementMap: grass.height,
  roughnessMap: grass.rough,
  displacementScale: 0.5,
});

//House
export const wallMaterial = new MeshStandardMaterial({
  map: wall.color,
  aoMap: wall.ao,
  normalMap: wall.normal,
  displacementMap: wall.height,
  roughnessMap: wall.rough,
  displacementScale: 0.001,
});
export const roofMaterial = new MeshStandardMaterial({
  map: roof.color,
  aoMap: roof.ao,
  normalMap: roof.normal,
  displacementMap: roof.height,
  roughnessMap: roof.rough,
  displacementScale: 0.01,
  side: DoubleSide,
});
export const doorMaterial = new MeshStandardMaterial({
  map: door.color,
  aoMap: door.ao,
  normalMap: door.normal,
  displacementMap: door.height,
  roughnessMap: door.rough,
  displacementScale: 0.1,
});
export const bushMaterial = new MeshStandardMaterial({
  map: bush.color,
  aoMap: bush.ao,
  normalMap: bush.normal,
  displacementMap: bush.height,
  metalnessMap: bush.metal,
  displacementScale: 0.1,
});

//Graveyard
export const graveMaterial1 = new MeshStandardMaterial({
  map: grave1.color,
  aoMap: grave1.ao,
  normalMap: grave1.normal,
  displacementMap: grave1.height,
  metalnessMap: grave1.metal,
  displacementScale: 0.001,
});

export const graveMaterial2 = new MeshStandardMaterial({
  map: grave2.color,
  aoMap: grave2.ao,
  normalMap: grave2.normal,
  displacementMap: grave2.height,
  roughnessMap: grave2.rough,
  displacementScale: 0.001,
});
