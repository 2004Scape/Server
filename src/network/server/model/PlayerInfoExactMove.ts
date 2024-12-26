import InfoMessage from '#/network/server/InfoMessage.js';

export default class PlayerInfoExactMove extends InfoMessage {
    constructor(
        readonly startX: number,
        readonly startZ: number,
        readonly endX: number,
        readonly endZ: number,
        readonly start: number,
        readonly end: number,
        readonly direction: number
    ) {
        super();
    }
}