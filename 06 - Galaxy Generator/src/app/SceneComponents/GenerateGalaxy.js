import { BufferGeometry, BufferAttribute, Points, Color } from 'three';
import { galaxyMaterial } from './Material';

function generateGalaxy(scene, params) {
  //$ If a Galaxy already exists where are going to dispose it
  if (params.galaxy !== null) {
    params.geometry.dispose();
    params.material.dispose();
    scene.remove(params.galaxy);
  }

  //$ Create Geometry and positions Array
  params.geometry = new BufferGeometry();
  const positions = new Float32Array(params.count * 3);

  //$ Color Array & galaxy colors
  const colors = new Float32Array(params.count * 3);
  const insideColor = new Color(params.insideColor);
  const outsideColor = new Color(params.outsideColor);

  //$ Generate random positions & colors
  for (let i = 0; i < params.count; i++) {
    //$ Assign axis values
    const ix = i * 3;
    const iy = ix + 1;
    const iz = ix + 2;

    //$ Position
    const radius = Math.random() * params.radius; // General rule to assign position along the branch;
    const spinAngle = radius * params.spin; // Assign the spin angle of the branch
    const branchesAngle = ((i % params.branches) / params.branches) * (Math.PI * 2); // Assign the position of the branch around the galaxy depending of the numbers of branches

    //? Randomness rule for the star position
    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;

    //? Stablish the star's position
    positions[ix] = radius * Math.cos(branchesAngle + spinAngle) + randomX;
    positions[iy] = randomY;
    positions[iz] = radius * Math.sin(branchesAngle + spinAngle) + randomZ;

    //$ Colors
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / params.radius);

    colors[ix] = mixedColor.r;
    colors[iy] = mixedColor.g;
    colors[iz] = mixedColor.b;
  }

  params.geometry.setAttribute('position', new BufferAttribute(positions, 3));
  params.geometry.setAttribute('color', new BufferAttribute(colors, 3));

  //$ Create Galaxy
  params.material = galaxyMaterial(params.size);
  params.galaxy = new Points(params.geometry, params.material);
  scene.add(params.galaxy);
}

export default generateGalaxy;
