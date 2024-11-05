import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class PlayerInfoSpotanim extends InfoMessage {
    constructor(
        readonly spotanim: number,
        readonly height: number,
        readonly delay: number
    ) {
        super();
    }
}