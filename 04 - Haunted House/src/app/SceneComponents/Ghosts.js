import { PointLight } from 'three';

function Ghosts(scene, gui) {
  const ghost1 = new PointLight(0xff00ff, 2, 3);
  ghost1.castShadow = true;
  ghost1.shadow.mapSize.width = 256;
  ghost1.shadow.mapSize.height = 256;
  ghost1.shadow.camera.far = 7;

  const ghost2 = new PointLight(0x02c8ec, 2, 3);
  ghost2.castShadow = true;
  ghost2.shadow.mapSize.width = 256;
  ghost2.shadow.mapSize.height = 256;
  ghost2.shadow.camera.far = 7;

  const ghost3 = new PointLight(0x05f69f, 2, 3);
  ghost3.castShadow = true;
  ghost3.shadow.mapSize.width = 256;
  ghost3.shadow.mapSize.height = 256;
  ghost3.shadow.camera.far = 7;

  scene.add(ghost1, ghost2, ghost3);

  this.update = time => {
    const ghost1Angle = time * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(time * 3);

    const ghost2Angle = -time * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(time * 4) + Math.sin(time * 2.5);

    const ghost3Angle = -time * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(time * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(time * 0.5));
    ghost3.position.y = Math.sin(time * 4) + Math.sin(time * 2.5);
  };
}

export default Ghosts;
