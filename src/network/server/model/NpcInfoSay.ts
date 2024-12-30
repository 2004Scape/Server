import InfoMessage from '#/network/server/InfoMessage.js';

export default class NpcInfoSay extends InfoMessage {
    constructor(
        readonly say: string
    ) {
        super();
    }
}