import generateGalaxy from './GenerateGalaxy';

function Galaxy(scene, gui) {
  //$ Parameters
  const parameters = {
    count: 100000,
    size: 0.01,
    geometry: null,
    material: null,
    galaxy: null,
  };

  //$ tweaks params
  parameters.radius = 5; // branch size
  parameters.branches = 6; // number of branches
  parameters.spin = 4; // the branch spin
  parameters.randomness = 0.65; // the random position of the stars;
  parameters.randomnessPower = 3.8; // magnifies the randomness of the stars;
  parameters.insideColor = 0xff5588; // galaxy inner color
  parameters.outsideColor = 0x37c6ed; // galaxy outer color

  //$ Generate new galaxy and dispose the previous
  generateGalaxy(scene, parameters);

  //$ Tweaks
  gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(() => generateGalaxy(scene, parameters));
  gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(() => generateGalaxy(scene, parameters));
  gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(() => generateGalaxy(scene, parameters));
  gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(() => generateGalaxy(scene, parameters));
  gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(() => generateGalaxy(scene, parameters));
  gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(() => generateGalaxy(scene, parameters));
  gui
    .add(parameters, 'randomnessPower', 1, 10, 0.001)
    .onFinishChange(() => generateGalaxy(scene, parameters));
  gui.addColor(parameters, 'insideColor').onFinishChange(() => generateGalaxy);
  gui.addColor(parameters, 'outsideColor').onFinishChange(() => generateGalaxy);
}

export default Galaxy;
