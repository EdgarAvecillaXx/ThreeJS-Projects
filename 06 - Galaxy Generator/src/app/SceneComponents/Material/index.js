import { AdditiveBlending, PointsMaterial } from 'three';

export const galaxyMaterial = size =>
  new PointsMaterial({
    size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
  });
