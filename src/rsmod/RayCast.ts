import RouteCoordinates from "./RouteCoordinates.js";

export default class RayCast {
    static FAILED: RayCast = new RayCast([], false, false);
    static EMPTY_SUCCESS : RayCast = new RayCast([], false, true);

    readonly coordinates: Array<RouteCoordinates>;
    readonly alternative: boolean;
    readonly success: boolean;

    constructor(
        coordinates: Array<RouteCoordinates>,
        alternative: boolean,
        success: boolean
    ) {
        return new RayCast(coordinates, alternative, success);
    }
}