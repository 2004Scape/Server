import InfoMessage from '#/network/outgoing/InfoMessage.js';

export default class NpcInfoChangeType extends InfoMessage {
    constructor(
        readonly type: number
    ) {
        super();
    }
}