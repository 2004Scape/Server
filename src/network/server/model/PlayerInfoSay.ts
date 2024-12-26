import InfoMessage from '#/network/server/InfoMessage.js';

export default class PlayerInfoSay extends InfoMessage {
    constructor(
        readonly say: string
    ) {
        super();
    }
}