import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoSay extends InfoMessage {
    constructor(
        readonly say: string
    ) {
        super();
    }
}