import ZoneMessage from '#/network/game/server/ZoneMessage.js';

export default class ObjDel extends ZoneMessage {
    constructor(
        readonly coord: number,
        readonly obj: number
    ) {
        super(coord);
    }
}
