import {PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide} from 'three';

class Doorwall{
    constructor(roomName, arenaSize, x, z, scene) {
        let doorWidth = 70;
        this.id = roomName; // setting id of room, to be used for pathing algorithm
                            // possibly also used for defining the characteristics of the room
        this.unlocked = false;
        this.door;
        
        /**********************************************************
         * WALL COLOR / MATERIALS
         **********************************************************/
        let wallMaterial1 = new MeshBasicMaterial({
            color: 0xf4c0dc, // PINK 244, 192, 220
            side: DoubleSide,
            wireframe: true
        });
        let wallMaterial2 = new MeshBasicMaterial({
            color: 0xdc362f, // RED 220, 54, 47
            side: DoubleSide,
            wireframe: true
        });
        let wallMaterial3 = new MeshBasicMaterial({
            color: 0x75fbd0, // BLUE 117, 251, 224
            side: DoubleSide,
            wireframe: true
        });
        let wallMaterial4 = new MeshBasicMaterial({
            color: 0xf5bf5b, // YELLOW 245, 191, 91
            side: DoubleSide,
            wireframe: true
        });
        
        /**********************************************************
         * Construction of the Walls
         **********************************************************/

        let wallGeo;
        let wall;

        // general shape of each wall piece
        wallGeo = new PlaneGeometry((arenaSize - doorWidth) / 2, 75, 38, 10);
        
        // Doorwalls are a pair of walls that are offset by some distance to allow for a "doorway" into the next room

        // Doorwalls #1 and #2 are parallel to each other.
        // Doorwall #1
        wall = new Mesh(wallGeo, wallMaterial1);
        wall.rotation.y = Math.PI / 2;
        wall.position.y = 7.5;
        wall.position.x = x - arenaSize / 2;
        wall.position.z = z - (arenaSize - doorWidth) / 4 - doorWidth / 2;
        scene.add(wall);
        
        wall = new Mesh(wallGeo, wallMaterial1);
        wall.rotation.y = Math.PI/2;
        wall.position.y = 7.5;
        wall.position.x = x - arenaSize / 2;
        wall.position.z = z + (arenaSize - doorWidth) / 4 + doorWidth / 2;
        scene.add(wall);

        // Doorwall #2        
        wall = new Mesh(wallGeo, wallMaterial2);
        wall.rotation.y = Math.PI / 2;
        wall.position.y = 7.5;
        wall.position.x = x + arenaSize / 2;
        wall.position.z = z - (arenaSize - doorWidth) / 4 - doorWidth / 2;
        scene.add(wall);

        wall = new Mesh(wallGeo, wallMaterial2);
        wall.rotation.y = Math.PI/2;
        wall.position.y = 7.5;
        wall.position.x = x + arenaSize / 2;
        wall.position.z = z + (arenaSize - doorWidth) / 4 + doorWidth / 2;
        scene.add(wall);

        // Doorwalls #3 and #4 are parallel to each other.
        // Doorwall #3
        wall = new Mesh(wallGeo, wallMaterial3);
        wall.position.y = 7.5;
        wall.position.z = z + arenaSize / 2;
        wall.position.x = x - (arenaSize - doorWidth) / 4 - doorWidth / 2;
        scene.add(wall);
        
        wall = new Mesh(wallGeo, wallMaterial3);
        wall.position.y = 7.5;
        wall.position.z = z + arenaSize / 2;
        wall.position.x = x + (arenaSize - doorWidth) / 4 + doorWidth / 2;
        scene.add(wall);

        // Doorwall #4
        wall = new Mesh(wallGeo, wallMaterial4);
        wall.position.y = 7.5;
        wall.position.z = z - arenaSize / 2;
        wall.position.x = x - (arenaSize - doorWidth) / 4 - doorWidth / 2;
        scene.add(wall);
        
        wall = new Mesh(wallGeo, wallMaterial4);
        wall.position.y = 7.5;
        wall.position.z = z - arenaSize / 2;
        wall.position.x = x + (arenaSize - doorWidth) / 4 + doorWidth / 2;
        scene.add(wall);
    }
}

export default Doorwall;