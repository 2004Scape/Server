import ZoneMessage from '#/network/game/server/ZoneMessage.js';

export default class ObjAdd extends ZoneMessage {
    constructor(
        readonly coord: number,
        readonly obj: number,
        readonly count: number
    ) {
        super(coord);
    }
}
