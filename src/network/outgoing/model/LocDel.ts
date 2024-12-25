import ZoneMessage from '#/network/outgoing/ZoneMessage.js';

export default class LocDel extends ZoneMessage {
    constructor(
        readonly coord: number,
        readonly shape: number,
        readonly angle: number
    ) {
        super(coord);
    }
}