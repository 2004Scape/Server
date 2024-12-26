import InfoMessage from '#/network/server/InfoMessage.js';

export default class NpcInfoFaceCoord extends InfoMessage {
    constructor(
        readonly x: number,
        readonly z: number
    ) {
        super();
    }
}