import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoFaceEntity extends InfoMessage {
    constructor(
        readonly entity: number
    ) {
        super();
    }
}