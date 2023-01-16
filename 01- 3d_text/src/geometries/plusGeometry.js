import { BoxGeometry, Group, Mesh } from 'three';
import { material } from '../materials';
const boxGeometry = new BoxGeometry(0.6, (1 / 3) * 0.6, 0.3);
const boxGeometry2 = new BoxGeometry(0.6 * (1 / 3), 0.6, 0.3);

export default () => {
  return new Group().add(new Mesh(boxGeometry, material), new Mesh(boxGeometry2, material));
};
