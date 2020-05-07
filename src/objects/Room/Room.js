import {DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry} from 'three';

import globals from '../../globals';

class Room {
  constructor(roomName, arenaSize, x, z, sides) {
    this.id = roomName; // setting id of room, to be used for pathing algorithm

    // possibly also used for defining the characteristics of the room
    this.unlocked = false;
    this.door;

    this.minX = x - arenaSize/2;
    this.maxX = x + arenaSize/2;
    this.minZ = z - arenaSize/2;
    this.maxZ = z + arenaSize/2;

    /**********************************************************
     * FLOOR
     **********************************************************/
    let floorGeo = new PlaneGeometry(arenaSize, arenaSize, 10, 10);
    let floorMaterial = new MeshBasicMaterial({
      color: 0x1974d2,
      side: DoubleSide,
      transparent:true,
      opacity: 0.6,
    });
    let floor = new Mesh(floorGeo, floorMaterial);
    floor.rotation.x = Math.PI/2;
    floor.position.y = -30;
    floor.position.x = x;
    floor.position.z = z;
    globals.scene.add(floor);

    /**********************************************************
     * WALLS
     **********************************************************/
    let wallMaterial1 = new MeshBasicMaterial({
      color: 0xf4c0dc, // PINK 244, 192, 220
      side: DoubleSide,
      wireframe: false
    });
    let wallMaterial2 = new MeshBasicMaterial({
      color: 0xdc362f, // RED 220, 54, 47
      side: DoubleSide,
      wireframe: false
    });
    let wallMaterial3 = new MeshBasicMaterial({
      color: 0x75fbd0, // BLUE 117, 251, 224
      side: DoubleSide,
      wireframe: false
    });
    let wallMaterial4 = new MeshBasicMaterial({
      color: 0xf5bf5b, // YELLOW 245, 191, 91
      side: DoubleSide,
      wireframe: false
    });

    let wallGeo;
    let wall;

    // let wallGeo = new THREE.PlaneGeometry((arenaSize - doorWidth)/ 2, 75, 38, 10);
    // let wall = new THREE.Mesh(wallGeo, wallMaterial1);
    // wall.rotation.y = Math.PI/2;
    // wall.position.y = 7.5;
    // wall.position.x = x-arenaSize/2;
    // wall.position.z = z - (arenaSize - doorWidth)/4 - doorWidth / 2;
    // scene.add(wall);

    // wall = new THREE.Mesh(wallGeo, wallMaterial1);
    // wall.rotation.y = Math.PI/2;
    // wall.position.y = 7.5;
    // wall.position.x = x-arenaSize/2;
    // wall.position.z = z + (arenaSize - doorWidth)/4 + doorWidth / 2;
    // scene.add(wall);

    wallGeo = new PlaneGeometry(arenaSize, 75, 75, 10);

    // Adds a wall to the scene depending on which walls are permitted.
    if (sides.up) {
      wall = new Mesh(wallGeo, wallMaterial1);
      wall.rotation.y = Math.PI/2;
      wall.position.y = 7.5;
      wall.position.x = x + arenaSize/2;
      wall.position.z = z;
      globals.scene.add(wall);
    }

    if (sides.down) {
      wall = new Mesh(wallGeo, wallMaterial2);
      wall.rotation.y = Math.PI/2;
      wall.position.y = 7.5;
      wall.position.x = x - arenaSize/2;
      wall.position.z = z;
      globals.scene.add(wall);
    }

    if (sides.left) {
      wall = new Mesh(wallGeo, wallMaterial3);
      wall.position.y = 7.5;
      wall.position.z = z - arenaSize/2;
      wall.position.x = x;
      globals.scene.add(wall);
    }

    if (sides.right) {
      wall = new Mesh(wallGeo, wallMaterial4);
      wall.position.y = 7.5;
      wall.position.z = z + arenaSize/2;
      wall.position.x = x;
      globals.scene.add(wall);
    }
  }

  isInside(position) {
    if (position.x >= this.minX && position.x <= this.maxX
        && position.z <= this.maxZ && position.z >= this.minZ) {
      return true;
    }
    return false;
  }
}

export default Room;