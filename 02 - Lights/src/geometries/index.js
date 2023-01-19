import { Mesh, SphereGeometry, BoxGeometry, TorusGeometry, PlaneGeometry } from 'three';
import { material } from '../materials';

export const Sphere = () => new Mesh(new SphereGeometry(0.5, 32, 32), material);

export const Cube = () => new Mesh(new BoxGeometry(0.75, 0.75, 0.75), material);

export const Torus = () => new Mesh(new TorusGeometry(0.3, 0.2, 32, 64), material);

export const Plane = () => new Mesh(new PlaneGeometry(5, 5), material);
