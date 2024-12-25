import ZoneMessage from '#/network/outgoing/ZoneMessage.js';

export default class ObjDel extends ZoneMessage {
    constructor(
        readonly coord: number,
        readonly obj: number
    ) {
        super(coord);
    }
}