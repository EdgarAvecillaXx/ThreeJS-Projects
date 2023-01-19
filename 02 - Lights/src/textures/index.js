import { TextureLoader } from 'three';
import manager from '../utils/loadingManager';

const textureLoader = new TextureLoader(manager);
export const matcapTexture = textureLoader.load('/textures/matcaps/9.png');
