/* eslint-disable no-restricted-syntax */
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Vector3,
  PointsMaterial,
  Points,
} from 'three';
import { consts } from '../global';

const randPosition = (center, radius) => {
  const randVec = new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  )
    .normalize()
    .multiplyScalar(radius);

  return center.add(randVec);
};

const randColor = (color) => {
  const randVec = new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  )
    .normalize()
    .multiplyScalar(0.4);

  const r = Math.max(0, Math.min(1, color.r + randVec.x));
  const g = Math.max(0, Math.min(1, color.g + randVec.y));
  const b = Math.max(0, Math.min(1, color.b + randVec.z));

  color.setRGB(r, g, b);
  return color;
};

class Explosion extends Group {
  constructor(center, fruit) {
    super();

    this.center = center;
    this.fruit = fruit;

    let maxDist = 35;
    let color = 0x8b0000; // red
    if (fruit === 'orange') {
      maxDist = 50;
      color = 0xffa500; // orange
    } else if (fruit === 'melon') {
      maxDist = 90;
      color = 0x32cd32; // green
    }
    this.maxDist = maxDist;
    color = new Color(color);

    const positions = [];
    this.endPositions = [];
    const colors = [];

    for (let i = 0; i < consts.EXPLOSION_NUM_PARTICLES; i += 1) {
      const temp = randPosition(center.clone(), maxDist);
      this.endPositions.push(temp.x, temp.y, temp.z);
      positions.push(center.x, center.y, center.z);
    }
    for (let i = 0; i < consts.EXPLOSION_NUM_PARTICLES; i += 1) {
      const temp = randColor(color.clone());
      colors.push(temp.r, temp.g, temp.b);
    }

    let particleSize = 9;
    if (fruit === 'orange') {
      particleSize = 12;
    } else if (fruit === 'melon') {
      particleSize = 15;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    const material = new PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });
    this.points = new Points(geometry, material);
  }
}

export default Explosion;
