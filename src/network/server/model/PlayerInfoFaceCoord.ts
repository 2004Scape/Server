import InfoMessage from '#/network/server/InfoMessage.js';

export default class PlayerInfoFaceCoord extends InfoMessage {
    constructor(
        readonly x: number,
        readonly z: number
    ) {
        super();
    }
}