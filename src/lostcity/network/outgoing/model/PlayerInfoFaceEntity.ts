import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class PlayerInfoFaceEntity extends InfoMessage {
    constructor(
        readonly entity: number
    ) {
        super();
    }
}