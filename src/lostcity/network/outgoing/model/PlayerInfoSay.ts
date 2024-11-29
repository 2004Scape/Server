import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class PlayerInfoSay extends InfoMessage {
    constructor(
        readonly say: string
    ) {
        super();
    }
}