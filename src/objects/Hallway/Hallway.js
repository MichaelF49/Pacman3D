import {PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide} from 'three';

class Hallway{
    constructor(roomName, hallwayLength, x, z, scene, sides) {
        let doorWidth = 70;
        this.zAxis = false;
        this.id = roomName; // setting id of hallway, to be used for pathing algorithm
                            // possibly also used for defining the characteristics of the hallway
        this.minX;
        this.maxX;
        this.minZ;
        this.maxZ;


        this.unlocked = false;
        this.door;

        if (!sides.up || !sides.down) {
            this.zAxis = true;
        }

        if (this.zAxis) {
            this.minX = x - hallwayLength / 2;
            this.maxX = x + hallwayLength / 2;
            this.minZ = z - doorWidth / 2;
            this.maxZ = z + doorWidth / 2;
        }
        else {
            this.minZ = z - hallwayLength / 2;
            this.maxZ = z + hallwayLength / 2;
            this.minX = x - doorWidth / 2;
            this.maxX = x + doorWidth / 2;
        }
        
        /**********************************************************
         * FLOOR
         **********************************************************/
        let floorGeo;
        if (this.zAxis) {
            floorGeo = new PlaneGeometry(hallwayLength, doorWidth, 10, 10);
        }
        else {
            floorGeo = new PlaneGeometry(doorWidth, hallwayLength, 10, 10);
        }
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
        scene.add(floor);

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
            wireframe: true
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
        
        let longWallGeo;
        let wall;
        let doorWallGeo;



        longWallGeo = new PlaneGeometry(hallwayLength, 75, 75, 10);
        doorWallGeo = new PlaneGeometry(doorWidth, 75, 10, 10);

        if (!this.zAxis) {
            wall = new Mesh(longWallGeo, wallMaterial1);
            wall.rotation.y = Math.PI/2;
            wall.position.y = 7.5;
            wall.position.x = x + doorWidth/2;
            wall.position.z = z;
            scene.add(wall);
            wall = new Mesh(longWallGeo, wallMaterial1);
            wall.rotation.y = Math.PI/2;
            wall.position.y = 7.5;
            wall.position.x = x - doorWidth/2;
            wall.position.z = z;
            scene.add(wall);
            wall = new Mesh(doorWallGeo, wallMaterial2);
            wall.position.y = 7.5;
            wall.position.x = x;
            wall.position.z = z - hallwayLength / 2;
            scene.add(wall);
            wall = new Mesh(doorWallGeo, wallMaterial2);
            wall.position.y = 7.5;
            wall.position.x = x;
            wall.position.z = z + hallwayLength / 2;
            scene.add(wall);
        }

        else {
            wall = new Mesh(doorWallGeo, wallMaterial2);
            wall.rotation.y = Math.PI/2;
            wall.position.y = 7.5;
            wall.position.x = x + hallwayLength/2;
            wall.position.z = z;
            scene.add(wall);
            wall = new Mesh(doorWallGeo, wallMaterial2);
            wall.rotation.y = Math.PI/2;
            wall.position.y = 7.5;
            wall.position.x = x - hallwayLength/2;
            wall.position.z = z;
            scene.add(wall);
            wall = new Mesh(longWallGeo, wallMaterial1);
            wall.position.y = 7.5;
            wall.position.x = x;
            wall.position.z = z - doorWidth / 2;
            scene.add(wall);
            wall = new Mesh(longWallGeo, wallMaterial1);
            wall.position.y = 7.5;
            wall.position.x = x;
            wall.position.z = z + doorWidth / 2;
            scene.add(wall);
        }
        
    }

    isInside(position) {
        if (position.x >= this.minX && position.x <= this.maxX && position.z >= this.maxZ && this.maxZ >= this.minZ) {
            return true;
        }
        return false;
    }
}

export default Hallway;