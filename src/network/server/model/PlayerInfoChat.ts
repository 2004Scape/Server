import InfoMessage from '#/network/server/InfoMessage.js';

export default class PlayerInfoChat extends InfoMessage {
    constructor(
        readonly color: number,
        readonly effect: number,
        readonly type: number,
        readonly chat: Uint8Array
    ) {
        super();
    }
}