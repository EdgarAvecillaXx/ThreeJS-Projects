import { Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import { material } from '../materials';

const fontLoader = new FontLoader();
export const title = (scene, animation) => {
  fontLoader.load('fonts/SparkyStones_Regular.typeface.json', font => {
    const textGeometry = new TextGeometry(`Edgar Avecilla\nWeb Developer`, {
      font,
      size: 0.5,
      height: 0.5,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    //   textGeometry.computeBoundingBox();
    //   textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.03) * 0.5,
    //     (textGeometry.boundingBox.max.y - 0.03) * 0.25,
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    //   );
    textGeometry.center();
    const text = new Mesh(textGeometry, material);
    text.name = 'ea';

    scene.add(text);
    animation();
  });
};

export const titleAnimation = (scene, time) => {
  scene.getObjectByName('ea').rotation.y = Math.sin(time * 4) / 10;
  scene.getObjectByName('ea').rotation.z = Math.cos(time * 4) / 10;
};
