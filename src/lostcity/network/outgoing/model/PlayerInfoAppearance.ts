import InfoMessage from '#lostcity/network/outgoing/InfoMessage.js';

export default class PlayerInfoAppearance extends InfoMessage {
    constructor(readonly appearance: Uint8Array) {
        super();
    }

    get persists(): boolean {
        return true;
    }
}