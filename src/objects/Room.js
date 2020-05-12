import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

import { globals } from '../global';

class Room {
  constructor(roomName, arenaSize, x, z, sides, hexColor) {
    // setting id of room, to be used for pathing algorithm
    this.id = roomName;

    // possibly also used for defining the characteristics of the room
    this.unlocked = false;

    this.minX = x - arenaSize / 2;
    this.maxX = x + arenaSize / 2;
    this.minZ = z - arenaSize / 2;
    this.maxZ = z + arenaSize / 2;

    /** ********************************************************
     * FLOOR
     ******************************************************** */
    const floorGeo = new PlaneGeometry(arenaSize, arenaSize, 10, 10);
    const floorMaterial = new MeshBasicMaterial({
      color: 0xfdf0c4,
      side: DoubleSide,
      reflectivity: 0.01,
      wireframe: true,
      transparent: true,
      opacity: 1,
    });
    const floor = new Mesh(floorGeo, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -30;
    floor.position.x = x;
    floor.position.z = z;
    globals.scene.add(floor);

    /** ********************************************************
     * WALLS
     ******************************************************** */
    const wallMaterial = new MeshBasicMaterial({
      color: hexColor,
      side: DoubleSide,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    let wall;

    const wallGeo = new PlaneGeometry(arenaSize, 75, 75, 10);

    // Adds a wall to the scene depending on which walls are permitted.
    if (sides.up) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.rotation.y = Math.PI / 2;
      wall.position.y = 7.5;
      wall.position.x = x + arenaSize / 2;
      wall.position.z = z;
      globals.scene.add(wall);
    }

    if (sides.down) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.rotation.y = Math.PI / 2;
      wall.position.y = 7.5;
      wall.position.x = x - arenaSize / 2;
      wall.position.z = z;
      globals.scene.add(wall);
    }

    if (sides.left) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.position.y = 7.5;
      wall.position.z = z - arenaSize / 2;
      wall.position.x = x;
      globals.scene.add(wall);
    }

    if (sides.right) {
      wall = new Mesh(wallGeo, wallMaterial);
      wall.position.y = 7.5;
      wall.position.z = z + arenaSize / 2;
      wall.position.x = x;
      globals.scene.add(wall);
    }
  }

  isInside(position) {
    if (
      position.x >= this.minX &&
      position.x <= this.maxX &&
      position.z <= this.maxZ &&
      position.z >= this.minZ
    ) {
      return true;
    }
    return false;
  }
}

export default Room;
