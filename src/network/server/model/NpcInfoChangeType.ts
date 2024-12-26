import InfoMessage from '#/network/server/InfoMessage.js';

export default class NpcInfoChangeType extends InfoMessage {
    constructor(
        readonly type: number
    ) {
        super();
    }
}