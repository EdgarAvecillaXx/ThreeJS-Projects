import {
  BoxGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  Plane,
  PlaneGeometry,
  PointLight,
  SphereGeometry,
  Vector3,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSG } from 'three-csg-ts';
import { bushMaterial, doorMaterial, roofMaterial, wallMaterial } from './materials';

function House(scene, gui) {
  //House
  const house = new Group();

  //clipping
  const planeR = new Plane(new Vector3(Math.PI * 0.105, -1, 0), 2.35);
  const planeL = new Plane(new Vector3(-Math.PI * 0.105, -1, 0), 2.35);

  //walls
  const walls = new Mesh(new BoxGeometry(4, 2.8, 4, 100, 100, 100), wallMaterial);
  walls.position.y = walls.geometry.parameters.height / 2;
  walls.material.clippingPlanes = [planeR, planeL];
  walls.geometry.setAttribute('uv2', new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));

  //roof
  const roofL = new Mesh(new BoxGeometry(2.6, 0.03, 4.5, 100), roofMaterial);
  roofL.position.y = 2.2 + roofL.geometry.parameters.height / 2;
  roofL.position.x = -roofL.geometry.parameters.width / 2 + 0.07;
  roofL.rotation.z = Math.PI * 0.1;
  const roofR = new Mesh(new BoxGeometry(2.6, 0.03, 4.5, 100), roofMaterial);
  roofR.position.y = 2.2 + roofR.geometry.parameters.height / 2;
  roofR.position.x = roofR.geometry.parameters.width / 2 - 0.07;
  roofR.rotation.z = -Math.PI * 0.1;
  roofL.geometry.setAttribute('uv2', new Float32BufferAttribute(roofL.geometry.attributes.uv.array, 2));
  roofR.geometry.setAttribute('uv2', new Float32BufferAttribute(roofR.geometry.attributes.uv.array, 2));

  //door
  const door = new Mesh(new PlaneGeometry(0.95, 2, 100, 100), doorMaterial);
  door.position.z = walls.geometry.parameters.depth / 2 - 0.05;
  door.position.y = door.geometry.parameters.height / 2;
  door.geometry.setAttribute('uv2', new Float32BufferAttribute(door.geometry.attributes.uv.array, 2));

  const doorPlane = new Mesh(new BoxGeometry(0.95, 2, 0.2), new MeshBasicMaterial({ color: 0xffffff }));
  doorPlane.position.z = walls.geometry.parameters.depth / 2;
  doorPlane.position.y = door.geometry.parameters.height / 2;

  //Bushes
  const bushGeometry = new SphereGeometry(1, 16, 16);
  const bushes = [
    {
      scale: [0.5, 0.5, 0.5],
      position: [1, 0.4, 2.2],
    },
    {
      scale: [0.25, 0.25, 0.25],
      position: [1.6, 0.28, 2.1],
    },
    {
      scale: [0.4, 0.4, 0.4],
      position: [-0.8, 0.28, 2.2],
    },
    {
      scale: [0.15, 0.15, 0.15],
      position: [-1, 0.15, 2.6],
    },
  ].forEach(({ scale, position }) => {
    const bush = new Mesh(bushGeometry, bushMaterial);
    bush.position.set(...position);
    bush.scale.set(...scale);
    bush.geometry.setAttribute('uv2', new Float32BufferAttribute(bush.geometry.attributes.uv.array, 2));
    bush.castShadow = true;

    house.add(bush);
  });

  //House light
  const houseLight = new PointLight(0xff7d46, 1.5, 4);
  houseLight.position.set(0, 2.2, 2.6);

  //shadow
  houseLight.castShadow = true;
  houseLight.shadow.mapSize.width = 256;
  houseLight.shadow.mapSize.height = 256;
  houseLight.shadow.camera.far = 7;

  const loader = new GLTFLoader();
  loader.load('models/lantern/lantern.gltf', gltf => {
    const lamp = gltf.scene;
    lamp.position.set(0, 2, 2.2);
    lamp.scale.set(1, 1, 1);
    house.add(lamp);
  });

  walls.updateMatrix();
  doorPlane.updateMatrix();
  roofL.updateMatrix();
  roofR.updateMatrix();

  const roof = CSG.union(roofR, roofL);
  const house1 = CSG.subtract(walls, doorPlane);
  house1.castShadow = true;

  house.add(house1, door, roof, houseLight);

  scene.add(house);
}

export default House;
