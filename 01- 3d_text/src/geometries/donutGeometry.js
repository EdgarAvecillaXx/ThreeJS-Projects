import { Mesh, TorusGeometry } from 'three';
import { material } from '../materials';

const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
export default () => new Mesh(donutGeometry, material);
