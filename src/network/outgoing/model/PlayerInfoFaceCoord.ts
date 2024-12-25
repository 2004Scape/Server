import InfoMessage from '#/network/outgoing/InfoMessage.js';

export default class PlayerInfoFaceCoord extends InfoMessage {
    constructor(
        readonly x: number,
        readonly z: number
    ) {
        super();
    }
}