import { BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three';
import { particleTexture } from './textures';

function Particles(scene, gui) {
  //const sphere = new SphereGeometry(1, 32, 32);
  //$material for particles
  const particleMaterial = new PointsMaterial({ size: 0.01, sizeAttenuation: true });

  //$ Generate a buffer Geometry
  const particlesGeometry = new BufferGeometry();
  const count = 50000;
  particleMaterial.size = 0.1;

  //$ Managing alpha particles
  particleMaterial.transparent = true;
  particleMaterial.alphaMap = particleTexture;
  //particleMaterial.alphaTest = 0.001;
  // particleMaterial.depthTest = false;
  particleMaterial.depthWrite = false;

  //$ Create a Float32Array for positions with 1500 coordinates
  const positions = new Float32Array(count * 3);
  //$ Create a Float32Array for colors with 1500 coordinates
  const colors = new Float32Array(count * 3);

  //$ Generate random colors
  //$ Generate random positions
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
  }

  //$ Create position for the particles
  //$ assign 3, because a vertex is composed with 3 coordinates(x,y,z)
  particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
  //$ Create colors for the particles
  particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3));
  particleMaterial.vertexColors = true;

  particlesGeometry.setAttribute('rotation', new BufferAttribute(positions));

  //$ Add the particles to the scene
  const particles = new Points(particlesGeometry, particleMaterial);
  scene.add(particles);
  console.log(particlesGeometry.attributes);

  this.update = time => {
    // particles.rotation.x = time * 0.2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      const x = particlesGeometry.attributes.position.array[ix];
      particlesGeometry.attributes.position.array[iy] = Math.sin(time + x);
    }
    particlesGeometry.attributes.position.needsUpdate = true;
  };
}
export default Particles;
