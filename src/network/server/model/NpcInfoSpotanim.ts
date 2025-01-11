import InfoMessage from '#/network/server/InfoMessage.js';

export default class NpcInfoSpotanim extends InfoMessage {
    constructor(
        readonly spotanim: number,
        readonly height: number,
        readonly delay: number
    ) {
        super();
    }
}