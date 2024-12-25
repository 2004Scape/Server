import InfoMessage from '#/network/outgoing/InfoMessage.js';

export default class NpcInfoAnim extends InfoMessage {
    constructor(
        readonly anim: number,
        readonly delay: number
    ) {
        super();
    }
}