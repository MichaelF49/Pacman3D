import * as THREE from 'three';

class Room{
    constructor(roomName, arenaSize, x, z, scene) {
        this.roomName = roomName;
        /**********************************************************
         * FLOOR
         **********************************************************/
        let floorGeo = new THREE.PlaneGeometry(arenaSize, arenaSize, 10, 10);
        let floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x1974d2,
        side: THREE.DoubleSide,
        transparent:true,
        opacity: 0.6,
        });
        let floor = new THREE.Mesh(floorGeo, floorMaterial);
        floor.rotation.x = Math.PI/2;
        floor.position.y = -30;
        floor.position.x = x;
        floor.position.z = z;
        scene.add(floor);

        /**********************************************************
         * WALLS
         **********************************************************/
        let wallMaterial1 = new THREE.MeshBasicMaterial({
        color: 0x8b0000,
        side: THREE.DoubleSide,
        wireframe: true
        });
        let wallMaterial2 = new THREE.MeshBasicMaterial({
        color: 0xcfb53b,
        side: THREE.DoubleSide,
        wireframe: true
        });
        let wallGeo = new THREE.PlaneGeometry(arenaSize, 75, 75, 10);
        let wall = new THREE.Mesh(wallGeo, wallMaterial1);
        wall.rotation.y = Math.PI/2;
        wall.position.y = 7.5;
        wall.position.x = x-arenaSize/2;
        wall.position.z = z;
        scene.add(wall);
        wall = new THREE.Mesh(wallGeo, wallMaterial1);
        wall.rotation.y = Math.PI/2;
        wall.position.y = 7.5;
        wall.position.x = x + arenaSize/2;
        wall.position.z = z;
        scene.add(wall);
        wall = new THREE.Mesh(wallGeo, wallMaterial2);
        wall.position.y = 7.5;
        wall.position.z = z-arenaSize/2;
        wall.position.x = x;
        scene.add(wall);
        wall = new THREE.Mesh(wallGeo, wallMaterial2);
        wall.position.y = 7.5;
        wall.position.z = z + arenaSize/2;
        wall.position.x = x;
        scene.add(wall);

    }
}

export default Room;