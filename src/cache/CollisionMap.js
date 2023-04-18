import LocationType from '#cache/config/LocationType.js';

const OPEN = 0x0;
const CLOSED = 0xFFFFFF;

const WALL_NORTHWEST = 0x1;
const WALL_NORTH = 0x2;
const WALL_NORTHEAST = 0x4;
const WALL_EAST = 0x8;
const WALL_SOUTHEAST = 0x10;
const WALL_SOUTH = 0x20;
const WALL_SOUTHWEST = 0x40;
const WALL_WEST = 0x80;

const OCCUPIED_TILE = 0x100;

const BLOCKED_NORTHWEST = 0x200;
const BLOCKED_NORTH = 0x400;
const BLOCKED_NORTHEAST = 0x800;
const BLOCKED_EAST = 0x1000;
const BLOCKED_SOUTHEAST = 0x2000;
const BLOCKED_SOUTH = 0x4000;
const BLOCKED_SOUTHWEST = 0x8000;
const BLOCKED_WEST = 0x10000;

const SOLID = 0x20000;
const FLAG_UNUSED1 = 0x80000;
const BLOCKED_TILE = 0x200000;

const NORTH_WEST = 0;
const NORTH_EAST = 1;
const SOUTH_EAST = 2;
const SOUTH_WEST = 3;

export default class CollisionMap {
	static NORTH_WEST = 0;
	static NORTH_EAST = 1;
	static SOUTH_EAST = 2;
	static SOUTH_WEST = 3;

	flags = [];

	sizeX = 64;
	sizeZ = 64;

	constructor(sizeX = 64, sizeZ = 64) {
		this.sizeX = sizeX;
		this.sizeZ = sizeZ;

		for (let x = 0; x < this.sizeX; x++) {
			this.flags[x] = new Uint32Array(this.sizeZ);

			for (let z = 0; z < this.sizeZ; z++) {
				this.flags[x][z] = OPEN;
			}
		}
	}

	reset(startX, startZ) {
		for (let x = startX; x < startX + 64; x++) {
			for (let z = startZ; z < startZ + 64; z++) {
				this.flags[x][z] = OPEN;
			}
		}
	}

	add(x, z, flag) {
		this.flags[x][z] |= flag;
	}

	remove(x, z, flag) {
		this.flags[x][z] &= ~flag;
	}

	get(x, z) {
		return this.flags[x][z];
	}

	setBlocked(x, z) {
		this.flags[x][z] |= BLOCKED_TILE;
	}

	removeBlocked(x, z) {
		this.flags[x][z] &= ~BLOCKED_TILE;
	}

	isBlocked(x, z) {
		return (this.flags[x][z] & BLOCKED_TILE) != 0;
	}

	setWall(x, z, orientation, type, blocks) {
		if (type == LocationType.WALL_STRAIGHT) {
			if (orientation == NORTH_WEST) {
				this.add(x, z, WALL_WEST);
				this.add(x - 1, z, WALL_EAST);
			} else if (orientation == NORTH_EAST) {
				this.add(x, z, WALL_NORTH);
				this.add(x, z + 1, WALL_SOUTH);
			} else if (orientation == SOUTH_EAST) {
				this.add(x, z, WALL_EAST);
				this.add(x + 1, z, WALL_WEST);
			} else if (orientation == SOUTH_WEST) {
				this.add(x, z, WALL_SOUTH);
				this.add(x, z - 1, WALL_NORTH);
			}
		} else if (type == LocationType.WALL_DIAGONALCORNER || type == LocationType.WALL_SQUARECORNER) {
			if (orientation == NORTH_WEST) {
				this.add(x, z, WALL_NORTHWEST);
				this.add(x - 1, z + 1, WALL_SOUTHEAST);
			} else if (orientation == NORTH_EAST) {
				this.add(x, z, WALL_NORTHEAST);
				this.add(x + 1, z + 1, WALL_SOUTHWEST);
			} else if (orientation == SOUTH_EAST) {
				this.add(x, z, WALL_SOUTHEAST);
				this.add(x + 1, z - 1, WALL_NORTHWEST);
			} else if (orientation == SOUTH_WEST) {
				this.add(x, z, WALL_SOUTHWEST);
				this.add(x - 1, z - 1, WALL_NORTHEAST);
			}
		} else if (type == LocationType.WALL_L) {
			if (orientation == NORTH_WEST) {
				this.add(x, z, WALL_WEST | WALL_NORTH);
				this.add(x - 1, z, WALL_EAST);
				this.add(x, z + 1, WALL_SOUTH);
			} else if (orientation == NORTH_EAST) {
				this.add(x, z, WALL_EAST | WALL_NORTH);
				this.add(x, z + 1, WALL_SOUTH);
				this.add(x + 1, z, WALL_WEST);
			} else if (orientation == SOUTH_EAST) {
				this.add(x, z, WALL_SOUTH | WALL_EAST);
				this.add(x + 1, z, WALL_WEST);
				this.add(x, z - 1, WALL_NORTH);
			} else if (orientation == SOUTH_WEST) {
				this.add(x, z, WALL_WEST | WALL_SOUTH);
				this.add(x, z - 1, WALL_NORTH);
				this.add(x - 1, z, WALL_EAST);
			}
		}

		if (blocks) {
			if (type == LocationType.WALL_STRAIGHT) {
				if (orientation == NORTH_WEST) {
					this.add(x, z, BLOCKED_WEST);
					this.add(x - 1, z, BLOCKED_EAST);
				} else if (orientation == NORTH_EAST) {
					this.add(x, z, BLOCKED_NORTH);
					this.add(x, z + 1, BLOCKED_SOUTH);
				} else if (orientation == SOUTH_EAST) {
					this.add(x, z, BLOCKED_EAST);
					this.add(x + 1, z, BLOCKED_WEST);
				} else if (orientation == SOUTH_WEST) {
					this.add(x, z, BLOCKED_SOUTH);
					this.add(x, z - 1, BLOCKED_NORTH);
				}
			} else if (type == LocationType.WALL_DIAGONALCORNER || type == LocationType.WALL_SQUARECORNER) {
				if (orientation == NORTH_WEST) {
					this.add(x, z, BLOCKED_NORTHWEST);
					this.add(x - 1, z + 1, BLOCKED_SOUTHEAST);
				} else if (orientation == NORTH_EAST) {
					this.add(x, z, BLOCKED_NORTHEAST);
					this.add(x + 1, z + 1, BLOCKED_SOUTHWEST);
				} else if (orientation == SOUTH_EAST) {
					this.add(x, z, BLOCKED_SOUTHEAST);
					this.add(x + 1, z - 1, BLOCKED_NORTHWEST);
				} else if (orientation == SOUTH_WEST) {
					this.add(x, z, BLOCKED_SOUTHWEST);
					this.add(x - 1, z - 1, BLOCKED_NORTHEAST);
				}
			} else if (type == LocationType.WALL_L) {
				if (orientation == NORTH_WEST) {
					this.add(x, z, BLOCKED_WEST | BLOCKED_NORTH);
					this.add(x - 1, z, BLOCKED_EAST);
					this.add(x, z + 1, BLOCKED_SOUTH);
				} else if (orientation == NORTH_EAST) {
					this.add(x, z, BLOCKED_EAST | BLOCKED_NORTH);
					this.add(x, z + 1, BLOCKED_SOUTH);
					this.add(x + 1, z, BLOCKED_WEST);
				} else if (orientation == SOUTH_EAST) {
					this.add(x, z, BLOCKED_SOUTH | BLOCKED_EAST);
					this.add(x + 1, z, BLOCKED_WEST);
					this.add(x, z - 1, BLOCKED_NORTH);
				} else if (orientation == SOUTH_WEST) {
					this.add(x, z, BLOCKED_WEST | BLOCKED_SOUTH);
					this.add(x, z - 1, BLOCKED_NORTH);
					this.add(x - 1, z, BLOCKED_EAST);
				}
			}
		}
	}

	setLoc(startX, startZ, orientation, sizeX, sizeZ, blocks) {
		let flag = OCCUPIED_TILE;
		if (blocks) {
			flag |= SOLID;
		}

		if (orientation == NORTH_EAST || orientation == SOUTH_WEST) {
			let temp = sizeX;
			sizeX = sizeZ;
			sizeZ = temp;
		}

		for (let x = startX; x < startX + sizeX; x++) {
			for (let z = startZ; z < startZ + sizeZ; z++) {
				this.add(x, z, flag);
			}
		}
	}

	removeWall(x, z, orientation, type, blocks) {
		x -= this.xOffset;
		z -= this.zOffset;

		if (type == LocationType.WALL_STRAIGHT) {
			if (orientation == NORTH_WEST) {
				this.remove(x, z, WALL_WEST);
				this.remove(x, z - 1, WALL_EAST);
			} else if (orientation == NORTH_EAST) {
				this.remove(x, z, WALL_NORTH);
				this.remove(z + 1, x, WALL_SOUTH);
			} else if (orientation == SOUTH_EAST) {
				this.remove(x, z, WALL_EAST);
				this.remove(x, z + 1, WALL_WEST);
			} else if (orientation == SOUTH_WEST) {
				this.remove(x, z, WALL_SOUTH);
				this.remove(z - 1, x, WALL_NORTH);
			}
		} else if (type == LocationType.WALL_DIAGONALCORNER || type == LocationType.WALL_SQUARECORNER) {
			if (orientation == NORTH_WEST) {
				this.remove(x, z, WALL_NORTHWEST);
				this.remove(z + 1, x - 1, WALL_SOUTHEAST);
			} else if (orientation == NORTH_EAST) {
				this.remove(x, z, WALL_NORTHEAST);
				this.remove(z + 1, x + 1, WALL_SOUTHWEST);
			} else if (orientation == SOUTH_EAST) {
				this.remove(x, z, WALL_SOUTHEAST);
				this.remove(z - 1, x + 1, WALL_NORTHWEST);
			} else if (orientation == SOUTH_WEST) {
				this.remove(x, z, WALL_SOUTHWEST);
				this.remove(z - 1, x - 1, WALL_NORTHEAST);
			}
		} else if (type == LocationType.WALL_L) {
			if (orientation == NORTH_WEST) {
				this.remove(x, z, WALL_WEST | WALL_NORTH);
				this.remove(x, z - 1, WALL_EAST);
				this.remove(z + 1, x, WALL_SOUTH);
			} else if (orientation == NORTH_EAST) {
				this.remove(x, z, WALL_EAST | WALL_NORTH);
				this.remove(z + 1, x, WALL_SOUTH);
				this.remove(x, z + 1, WALL_WEST);
			} else if (orientation == SOUTH_EAST) {
				this.remove(x, z, WALL_SOUTH | WALL_EAST);
				this.remove(x, z + 1, WALL_WEST);
				this.remove(z - 1, x, WALL_NORTH);
			} else if (orientation == SOUTH_WEST) {
				this.remove(x, z, WALL_WEST | WALL_SOUTH);
				this.remove(z - 1, x, WALL_NORTH);
				this.remove(x, z - 1, WALL_EAST);
			}
		}

		if (blocks) {
			if (type == LocationType.WALL_STRAIGHT) {
				if (orientation == NORTH_WEST) {
					this.remove(x, z, BLOCKED_WEST);
					this.remove(x, z - 1, BLOCKED_EAST);
				} else if (orientation == NORTH_EAST) {
					this.remove(x, z, BLOCKED_NORTH);
					this.remove(z + 1, x, BLOCKED_SOUTH);
				} else if (orientation == SOUTH_EAST) {
					this.remove(x, z, BLOCKED_EAST);
					this.remove(x, z + 1, BLOCKED_WEST);
				} else if (orientation == SOUTH_WEST) {
					this.remove(x, z, BLOCKED_SOUTH);
					this.remove(z - 1, x, BLOCKED_NORTH);
				}
			} else if (type == LocationType.WALL_DIAGONALCORNER || type == LocationType.WALL_SQUARECORNER) {
				if (orientation == NORTH_WEST) {
					this.remove(x, z, BLOCKED_NORTHWEST);
					this.remove(z + 1, x - 1, BLOCKED_SOUTHEAST);
				} else if (orientation == NORTH_EAST) {
					this.remove(x, z, BLOCKED_NORTHEAST);
					this.remove(z + 1, x + 1, BLOCKED_SOUTHWEST);
				} else if (orientation == SOUTH_EAST) {
					this.remove(x, z, BLOCKED_SOUTHEAST);
					this.remove(z - 1, x + 1, BLOCKED_NORTHWEST);
				} else if (orientation == SOUTH_WEST) {
					this.remove(x, z, BLOCKED_SOUTHWEST);
					this.remove(z - 1, x - 1, BLOCKED_NORTHEAST);
				}
			} else if (type == LocationType.WALL_L) {
				if (orientation == NORTH_WEST) {
					this.remove(x, z, BLOCKED_WEST | BLOCKED_NORTH);
					this.remove(x, z - 1, BLOCKED_EAST);
					this.remove(z + 1, x, BLOCKED_SOUTH);
				} else if (orientation == NORTH_EAST) {
					this.remove(x, z, BLOCKED_EAST | BLOCKED_NORTH);
					this.remove(z + 1, x, BLOCKED_SOUTH);
					this.remove(x, z + 1, BLOCKED_WEST);
				} else if (orientation == SOUTH_EAST) {
					this.remove(x, z, BLOCKED_SOUTH | BLOCKED_EAST);
					this.remove(x, z + 1, BLOCKED_WEST);
					this.remove(z - 1, x, BLOCKED_NORTH);
				} else if (orientation == SOUTH_WEST) {
					this.remove(x, z, BLOCKED_WEST | BLOCKED_SOUTH);
					this.remove(z - 1, x, BLOCKED_NORTH);
					this.remove(x, z - 1, BLOCKED_EAST);
				}
			}
		}
	}

	removeLoc(startX, startZ, orientation, sizeX, sizeZ, blocks) {
		let flag = OCCUPIED_TILE;
		if (blocks) {
			flag |= SOLID;
		}

		startX -= this.xOffset;
		startZ -= this.zOffset;

		if (orientation == NORTH_EAST || orientation == SOUTH_WEST) {
			let temp = sizeX;
			sizeX = sizeZ;
			sizeZ = temp;
		}

		for (let x = startX; x < startX + sizeX; x++) {
			for (let z = startZ; z < startZ + sizeZ; z++) {
				this.remove(x, z, flag);
			}
		}
	}

	reachedWall(x0, z0, x1, z1, orientation, type) {
		if (x0 == x1 && z0 == z1) {
			return true;
		}

		if (type == LocationType.WALL_STRAIGHT) {
			if (orientation == NORTH_WEST) {
				if (x0 == x1 - 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_SOUTH)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_NORTH)) == 0) {
					return true;
				}
			} else if (orientation == NORTH_EAST) {
				if (x0 == x1 && z0 == z1 + 1) {
					return true;
				} else if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_EAST)) == 0) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_WEST)) == 0) {
					return true;
				}
			} else if (orientation == SOUTH_EAST) {
				if (x0 == x1 + 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_SOUTH)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_NORTH)) == 0) {
					return true;
				}
			} else if (orientation == SOUTH_WEST) {
				if (x0 == x1 && z0 == z1 - 1) {
					return true;
				} else if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_EAST)) == 0) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_WEST)) == 0) {
					return true;
				}
			}
		} else if (type == LocationType.WALL_L) {
			if (orientation == NORTH_WEST) {
				if (x0 == x1 - 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_WEST)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_NORTH)) == 0) {
					return true;
				}
			} else if (orientation == NORTH_EAST) {
				if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_EAST)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_NORTH)) == 0) {
					return true;
				}
			} else if (orientation == SOUTH_EAST) {
				if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_EAST)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_SOUTH)) == 0) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1) {
					return true;
				}
			} else if (orientation == SOUTH_WEST) {
				if (x0 == x1 - 1 && z0 == z1) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_SOUTH)) == 0) {
					return true;
				} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & (BLOCKED_TILE | FLAG_UNUSED1 | OCCUPIED_TILE | WALL_WEST)) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1) {
					return true;
				}
			}
		} else if (type == LocationType.WALL_DIAGONAL) {
			if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & WALL_SOUTH) == 0) {
				return true;
			} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & WALL_NORTH) == 0) {
				return true;
			} else if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & WALL_EAST) == 0) {
				return true;
			} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & WALL_WEST) == 0) {
				return true;
			}
		}

		return false;
	}

	reachedDecoration(x0, z0, x1, z1, orientation, type) {
		if (x0 == x1 && z0 == z1) {
			return true;
		}

		if (type == LocType.WALLDECOR_DIAGONAL_NOOFFSET || type == LocType.WALLDECOR_DIAGONAL_OFFSET) {
			if (type == LocType.WALLDECOR_DIAGONAL_OFFSET) {
				orientation = orientation + 2 & 0x3;
			}

			if (orientation == NORTH_WEST) {
				if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & WALL_WEST) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & WALL_NORTH) == 0) {
					return true;
				}
			} else if (orientation == NORTH_EAST) {
				if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & WALL_EAST) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & WALL_NORTH) == 0) {
					return true;
				}
			} else if (orientation == SOUTH_EAST) {
				if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & WALL_EAST) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & WALL_SOUTH) == 0) {
					return true;
				}
			} else if (orientation == SOUTH_WEST) {
				if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & WALL_WEST) == 0) {
					return true;
				} else if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & WALL_SOUTH) == 0) {
					return true;
				}
			}
		} else if (type == LocType.WALLDECOR_DIAGONAL_BOTH) {
			if (x0 == x1 && z0 == z1 + 1 && (this.flags[x0][z0] & WALL_SOUTH) == 0) {
				return true;
			} else if (x0 == x1 && z0 == z1 - 1 && (this.flags[x0][z0] & WALL_NORTH) == 0) {
				return true;
			} else if (x0 == x1 - 1 && z0 == z1 && (this.flags[x0][z0] & WALL_EAST) == 0) {
				return true;
			} else if (x0 == x1 + 1 && z0 == z1 && (this.flags[x0][z0] & WALL_WEST) == 0) {
				return true;
			}
		}

		return false;
	}

	reachedObject(x0, z0, x1, z1, sizeX, sizeZ) {
		let maxX = x1 + sizeX + 1;
		let maxZ = z1 + sizeZ + 1;

		if (x0 >= x1 && x0 <= maxX && z0 >= z1 && z0 <= maxZ) {
			return true;
		} else if (x0 == x1 - 1 && z0 >= z1 && z0 <= maxZ && (this.flags[x0][z] & WALL_EAST) == 0 && (surroundings & 0x8) == 0) {
			return true;
		} else if (x0 == maxX + 1 && z0 >= z1 && z0 <= maxZ && (this.flags[x0][z] & WALL_WEST) == 0 && (surroundings & 0x2) == 0) {
			return true;
		} else if (z0 == z1 - 1 && x0 >= x1 && x0 <= maxX && (this.flags[x0][z] & WALL_NORTH) == 0 && (surroundings & 0x4) == 0) {
			return true;
		} else if (z0 == maxZ + 1 && x0 >= x1 && x0 <= maxX && (this.flags[x0][z] & WALL_SOUTH) == 0 && (surroundings & 0x1) == 0) {
			return true;
		}

		return false;
	}
}
