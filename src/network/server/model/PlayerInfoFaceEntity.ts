import InfoMessage from '#/network/server/InfoMessage.js';

export default class PlayerInfoFaceEntity extends InfoMessage {
    constructor(
        readonly entity: number
    ) {
        super();
    }
}