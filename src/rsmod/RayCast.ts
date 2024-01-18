import RouteCoordinates from '#rsmod/RouteCoordinates.js';

export default class RayCast {
    static readonly FAILED: RayCast = new RayCast([], false, false);
    static readonly EMPTY_SUCCESS : RayCast = new RayCast([], false, true);

    readonly coordinates: RouteCoordinates[];
    readonly alternative: boolean;
    readonly success: boolean;

    constructor(
        coordinates: RouteCoordinates[],
        alternative: boolean,
        success: boolean
    ) {
        this.coordinates = coordinates;
        this.alternative = alternative;
        this.success = success;
    }
}
