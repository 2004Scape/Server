import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class PlayerInfoFaceCoord extends InfoMessage {
    constructor(
        readonly x: number,
        readonly z: number
    ) {
        super();
    }
}