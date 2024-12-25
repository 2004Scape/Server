import InfoMessage from '#/network/outgoing/InfoMessage.js';

export default class NpcInfoSay extends InfoMessage {
    constructor(
        readonly say: string
    ) {
        super();
    }
}