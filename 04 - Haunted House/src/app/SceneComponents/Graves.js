import { BoxGeometry, Group, MathUtils, Mesh, Float32BufferAttribute } from 'three';
import { graveMaterial1, graveMaterial2 } from './materials';

function Graves(scene, gui) {
  const totalGraves = 50;
  let counter = 0;
  const range = [-8, 8];
  const v3Array = [];

  const graveGeometry = new BoxGeometry(0.6, 1, 0.2);
  const graves = new Group();
  while (counter < totalGraves) {
    let v3 = [MathUtils.randFloat(...range), 0.35, MathUtils.randFloat(...range)];
    if (Math.abs(v3[0]) <= 2.8 && Math.abs(v3[2]) <= 2.8) continue;

    v3 = v3.join(',');
    if (!v3Array.includes(v3)) {
      v3Array.push(v3);
      counter++;
    }
  }

  v3Array.forEach((v3, idx) => {
    const grave = new Mesh(graveGeometry, idx % 2 === 0 ? graveMaterial1 : graveMaterial2);
    grave.position.set(...v3.split(',').map(n => Number(n)));
    grave.rotateY((Math.random() - 0.5) * 0.8);
    grave.rotateZ((Math.random() - 0.5) * 0.5);
    grave.geometry.setAttribute('uv2', new Float32BufferAttribute(grave.geometry.attributes.uv.array, 2));
    grave.castShadow = true;

    graves.add(grave);
  });

  scene.add(graves);
}

export default Graves;
