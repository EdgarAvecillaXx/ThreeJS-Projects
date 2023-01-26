import { LoadingManager, RepeatWrapping, TextureLoader } from 'three';

const loadingManager = new LoadingManager(
  () => console.log('All textures loaded!'),
  (url, loaded, total) => console.log(`Loading file: ${url}\nLoaded ${loaded} of ${total} files.`),
  url => console.log(`Failed loading file: ${url}`)
);

const loader = new TextureLoader(loadingManager);
export const grass = {
  color: loader.load('textures/ground/groundColor.png'),
  ao: loader.load('textures/ground/groundAO.png'),
  normal: loader.load('textures/ground/groundNormal.png'),
  height: loader.load('textures/ground/groundHeight.png'),
  rough: loader.load('textures/ground/groundRough.png'),
};
grass.color.repeat.set(8, 8);
grass.ao.repeat.set(8, 8);
grass.normal.repeat.set(8, 8);
grass.height.repeat.set(8, 8);
grass.rough.repeat.set(8, 8);
grass.color.wrapS = grass.color.wrapT = RepeatWrapping;
grass.ao.wrapS = grass.ao.wrapT = RepeatWrapping;
grass.normal.wrapS = grass.normal.wrapT = RepeatWrapping;
grass.height.wrapS = grass.height.wrapT = RepeatWrapping;
grass.rough.wrapS = grass.rough.wrapT = RepeatWrapping;

export const door = {
  color: loader.load('textures/door/doorColor.jpg'),
  ao: loader.load('textures/door/doorAO.jpg'),
  normal: loader.load('textures/door/doorNormal.jpg'),
  height: loader.load('textures/door/doorHeight.png'),
  rough: loader.load('textures/door/doorRough.jpg'),
};

export const wall = {
  color: loader.load('textures/wall/wallColor.png'),
  ao: loader.load('textures/wall/wallAO.png'),
  normal: loader.load('textures/wall/wallNormal.png'),
  height: loader.load('textures/wall/wallHeight.png'),
  rough: loader.load('textures/wall/wallRough.png'),
};

export const roof = {
  color: loader.load('textures/roof/roofColor.png'),
  ao: loader.load('textures/roof/roofAO.png'),
  normal: loader.load('textures/roof/roofNormal.png'),
  height: loader.load('textures/roof/roofHeight.png'),
  rough: loader.load('textures/roof/roofRough.png'),
};

export const bush = {
  color: loader.load('textures/bush/bushColor.jpg'),
  ao: loader.load('textures/bush/bushAO.jpg'),
  height: loader.load('textures/bush/bushHeight.png'),
  metal: loader.load('textures/bush/bushMetal.jpg'),
  normal: loader.load('textures/bush/bushNormal.jpg'),
};

export const grave1 = {
  color: loader.load('textures/grave1/color.png'),
  ao: loader.load('textures/grave1/ao.png'),
  height: loader.load('textures/grave1/height.png'),
  metal: loader.load('textures/grave1/metal.png'),
  normal: loader.load('textures/grave1/normal.png'),
};

export const grave2 = {
  color: loader.load('textures/grave2/color.jpg'),
  ao: loader.load('textures/grave2/ao.jpg'),
  height: loader.load('textures/grave2/height.png'),
  rough: loader.load('textures/grave2/rough.jpg'),
  normal: loader.load('textures/grave2/normal.jpg'),
};
