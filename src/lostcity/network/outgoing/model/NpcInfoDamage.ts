import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class NpcInfoDamage extends InfoMessage {
    constructor(
        readonly damage: number,
        readonly type: number,
        readonly currentHitpoints: number,
        readonly baseHitpoints: number
    ) {
        super();
    }
}