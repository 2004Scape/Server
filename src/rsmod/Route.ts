import RouteCoordinates from "./RouteCoordinates.js";

export default class Route {
    static FAILED: Route = new Route([], false, false);

    readonly waypoints: Array<RouteCoordinates>
    readonly alternative: boolean
    readonly success: boolean

    constructor(
        waypoints: Array<RouteCoordinates>,
        alternative: boolean,
        success: boolean
    ) {
        return new Route(waypoints, alternative, success);
    }

    get failed(): boolean {
        return !this.success;
    }
}