import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoAnim extends InfoMessage {
    constructor(
        readonly anim: number,
        readonly delay: number
    ) {
        super();
    }
}