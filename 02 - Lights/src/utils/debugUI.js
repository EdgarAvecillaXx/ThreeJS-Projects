import GUI from 'lil-gui';

const debugUI = new GUI();
const lights = debugUI.addFolder('Lights');
const ambientLight = lights.addFolder('Ambient Light');

const ambientLightColor = ambientLight.addColor({ color: '#ffffff' }, 'color');
