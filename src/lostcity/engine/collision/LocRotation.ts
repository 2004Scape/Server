import {LocRotations} from "#lostcity/engine/collision/LocRotations.js";

export default class LocRotation {
    static rotation(rotation: number): LocRotations {
        switch (rotation) {
            case 0:
                return LocRotations.WEST;
            case 1:
                return LocRotations.NORTH;
            case 2:
                return LocRotations.EAST;
            case 3:
                return LocRotations.SOUTH;
            default:
                throw new Error("Invalid loc rotation.")
        }
    }
}