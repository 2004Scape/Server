import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoSpotanim extends InfoMessage {
    constructor(
        readonly spotanim: number,
        readonly height: number,
        readonly delay: number
    ) {
        super();
    }
}