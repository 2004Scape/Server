import RouteCoordinates from '#rsmod/RouteCoordinates.js';

export default class Route {
    static readonly FAILED: Route = new Route([], false, false);

    readonly waypoints: RouteCoordinates[];
    readonly alternative: boolean;
    readonly success: boolean;

    constructor(
        waypoints: RouteCoordinates[],
        alternative: boolean,
        success: boolean
    ) {
        this.waypoints = waypoints;
        this.alternative = alternative;
        this.success = success;
    }

    get failed(): boolean {
        return !this.success;
    }
}
