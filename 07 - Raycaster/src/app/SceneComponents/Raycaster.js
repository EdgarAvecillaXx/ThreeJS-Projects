import { Color, Raycaster, Vector3 } from 'three';

function raycaster(scene, gui) {
  const raycaster = new Raycaster();

  let currentIntersect = null;

  this.update = (time, scene, camera, mouse) => {
    //   const rayOrigin = new Vector3(-3, 0, 0);
    //   const rayDirection = new Vector3(1, 0, 0).normalize();
    //   raycaster.set(rayOrigin, rayDirection);
    raycaster.setFromCamera(mouse, camera);
    const objectsToTest = [
      scene.getObjectByName('sphere1'),
      scene.getObjectByName('sphere2'),
      scene.getObjectByName('sphere3'),
    ];
    const intersects = raycaster.intersectObjects(objectsToTest);

    if (intersects.length) {
      if (!currentIntersect) {
        console.log('mouse enter!');
      }
      currentIntersect = intersects[0];
    } else {
      if (currentIntersect) {
        console.log('mouse leave!');
      }
      currentIntersect = null;
    }

    for (const object of objectsToTest) {
      object.material.color.set(0xff0000);
    }

    for (const intersect of intersects) {
      intersect.object.material.color.set(0xffffff);
    }
  };
}

export default raycaster;
