import InfoMessage from '#/network/server/InfoMessage.js';

export default class NpcInfoFaceEntity extends InfoMessage {
    constructor(
        readonly entity: number
    ) {
        super();
    }
}