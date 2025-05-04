import ZoneMessage from '#/network/game/server/ZoneMessage.js';

export default class LocDel extends ZoneMessage {
    constructor(
        readonly coord: number,
        readonly shape: number,
        readonly angle: number
    ) {
        super(coord);
    }
}
