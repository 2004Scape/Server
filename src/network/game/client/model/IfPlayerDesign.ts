import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class IfPlayerDesign extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly gender: number,
        readonly idkit: number[],
        readonly color: number[]
    ) {
        super();
    }
}
