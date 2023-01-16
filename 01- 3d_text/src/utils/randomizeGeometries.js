export default (scene, geometry, numElements) => {
  let counter = 0;
  while (counter < numElements) {
    const element = geometry();
    element.position.x = (Math.random() - 0.5) * 10;
    element.position.y = (Math.random() - 0.5) * 10;
    element.position.z = (Math.random() - 0.5) * 10;

    element.rotation.x = Math.random() * Math.PI;
    element.rotation.y = Math.random() * Math.PI;

    const scale = 0.5;
    element.scale.x = scale;
    element.scale.y = scale;
    element.scale.z = scale;

    scene.add(element);
    counter++;
  }
};
