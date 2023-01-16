import { MeshMatcapMaterial } from 'three';
import { matcapTexture } from '../textures';
export const material = new MeshMatcapMaterial({ matcap: matcapTexture });
