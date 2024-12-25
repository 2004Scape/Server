import InfoMessage from '#/network/server/InfoMessage.js';

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