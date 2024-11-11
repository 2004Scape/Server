import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoChangeType extends InfoMessage {
    constructor(
        readonly type: number
    ) {
        super();
    }
}