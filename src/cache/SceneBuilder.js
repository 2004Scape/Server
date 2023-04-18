import fs from 'fs';

import CollisionMap from '#cache/CollisionMap.js';
import Packet from '#util/Packet.js';
import LocationType from '#cache/config/LocationType.js';

class SceneBuilder {
    collision = [];
    renderFlags = [];

    sizeX = 64;
    sizeZ = 64;
    xOffset = 0;
    zOffset = 0;

    init() {
        let maps = fs.readdirSync('data/maps').filter(x => !x.endsWith('35_20'));

        let minX = 1000;
        let minZ = 1000;
        let maxX = 0;
        let maxZ = 0;

        let regions = [];
        for (let i = 0; i < maps.length; i++) {
            let x = Number(maps[i].slice(1).split('_')[0]);
            let z = Number(maps[i].split('_')[1]);

            if (!regions.find(r => r.x == x && r.z == z)) {
                regions.push({ x, z });
            }

            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);

            minZ = Math.min(minZ, z);
            maxZ = Math.max(maxZ, z);
        }

        minX -= 2;
        minZ -= 2;
        maxX += 2;
        maxZ += 2;

        this.sizeX = maxX << 6;
        this.sizeZ = maxZ << 6;
        this.xOffset = minX << 6;
        this.zOffset = minZ << 6;

        for (let plane = 0; plane < 4; plane++) {
            this.collision.push(new CollisionMap(this.sizeX, this.sizeZ));

            this.renderFlags[plane] = [];

            for (let x = 0; x < this.sizeX; x++) {
                this.renderFlags[plane][x] = new Uint8Array(this.sizeZ);
            }
        }

        console.time('Loading regions');
        for (let i = 0; i < regions.length; i++) {
            let x = regions[i].x;
            let z = regions[i].z;

            // read landscape
            if (fs.existsSync(`data/maps/m${x}_${z}`)) {
                let data = new Packet(Packet.fromFile(`data/maps/m${x}_${z}`).bunzip2(false));
                this.readLandMap(data, x << 6, z << 6);
            }

            // read loc
            if (fs.existsSync(`data/maps/l${x}_${z}`)) {
                let data = new Packet(Packet.fromFile(`data/maps/l${x}_${z}`).bunzip2(false));
                this.readLocMap(data, x << 6, z << 6);
            }
        }
        console.timeEnd('Loading regions');

        for (let plane = 0; plane < 4; plane++) {
            for (let x = 0; x < this.sizeX; x++) {
                for (let z = 0; z < this.sizeZ; z++) {
					if ((this.renderFlags[plane][x][z] & 0x1) == 1) {
						let truePlane = plane;

						// bridge
						if ((this.renderFlags[1][x][z] & 0x2) == 2) {
							truePlane = plane - 1;
						}

						if (truePlane >= 0) {
							this.collision[truePlane].setBlocked(x, z);
						}
					}
                }
            }
        }
    }

    getRenderFlag(plane, x, z) {
        return this.renderFlags[plane][x][z];
    }

    readLandMap(data, startX, startZ) {
        for (let plane = 0; plane < 4; plane++) {
            for (let x = 0; x < 64; x++) {
                for (let z = 0; z < 64; z++) {
                    while (true) {
                        let opcode = data.g1();
                        if (opcode == 0) {
                            break;
                        }

                        if (opcode == 1) {
                            data.pos += 1;
                            break;
                        }

                        if (opcode <= 49) {
                            data.pos += 1;
                        } else if (opcode <= 81) {
                            this.renderFlags[plane][x + startX][z + startZ] = (opcode - 49);
                        }
                    }
                }
            }
        }
    }

    readLocMap(data, startX, startZ) {
        let locId = -1;
        while (true) {
            let deltaId = data.gsmart();
            if (deltaId == 0) {
                break;
            }

            locId += deltaId;

            let locData = 0;
            while (true) {
                let deltaData = data.gsmart();
                if (deltaData == 0) {
                    break;
                }

                locData += deltaData - 1;

                let locX = locData >> 6 & 0x3F;
                let locZ = locData & 0x3F;
                let locPlane = locData >> 12;
                let locInfo = data.g1();
                let locType = locInfo >> 2;
                let locOrientation = locInfo & 0x3;
                let x = locX + startX;
                let z = locZ + startZ;

                let collisionLevel = locPlane;
                if ((this.renderFlags[1][x][z] & 2) == 2) {
                    collisionLevel--;
                }

                let collision = null;
                if (collisionLevel >= 0) {
                    collision = this.collision[collisionLevel];
                }

                // add loc
                this.addLoc(locId, x, z, locPlane, locOrientation, locType, collision);
            }
        }
    }

    addLoc(id, x, z, plane, orientation, type, collision = null) {
        let loc = LocationType.get(id);

        if (type == LocationType.GROUNDDECOR) {
            if (loc.blockwalk && loc.interactable) {
                collision.setBlocked(x, z);
            }
        } else if (type == LocationType.CENTREPIECE_STRAIGHT || type == LocationType.CENTREPIECE_DIAGONAL) {
            let width = loc.width;
            let length = loc.length;

            // if (orientation == CollisionMap.NORTH_EAST || orientation == CollisionMap.SOUTH_WEST) {
            //     width = loc.length;
            //     length = loc.width;
            // }

            if (loc.blockwalk && collision != null) {
                collision.setLoc(x, z, orientation, width, length, loc.blockrange);
            }
        } else if (type >= LocationType.ROOF_STRAIGHT) {
            if (loc.blockwalk) {
                collision.setLoc(x, z, orientation, loc.width, loc.length, loc.blockrange);
            }
        } else if (type == LocationType.WALL_STRAIGHT) {
            if (loc.blockwalk && collision != null) {
                collision.setWall(x, z, orientation, type, loc.blockrange);
            }
        } else if (type == LocationType.WALL_DIAGONALCORNER) {
            if (loc.blockwalk && collision != null) {
                collision.setWall(x, z, orientation, type, loc.blockrange);
            }
        } else if (type == LocationType.WALL_L) {
            if (loc.blockwalk && collision != null) {
                collision.setWall(x, z, orientation, type, loc.blockrange);
            }
        } else if (type == LocationType.WALL_SQUARECORNER) {
            if (loc.blockwalk && collision != null) {
                collision.setWall(x, z, orientation, type, loc.blockrange);
            }
        } else if (type == LocationType.WALL_DIAGONAL) {
            if (loc.blockwalk && collision != null) {
                collision.setLoc(x, z, orientation, loc.width, loc.length, loc.blockrange);
            }
        }
    }

    // TODO: check line of walk
    canMoveTo(x0, z0, x1, z1, plane) {
        let map = this.collision[plane];
        let flag1 = map.get(x0, z0);
        let flag2 = map.get(x1, z1);

        return flag1 == 0 && flag2 == 0;
    }

    // TODO: line of sight
}

export default new SceneBuilder();
