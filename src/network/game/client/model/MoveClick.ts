import ClientProtCategory from '#/network/game/client/codec/ClientProtCategory.js';
import IncomingMessage from '#/network/game/client/IncomingMessage.js';

export default class MoveClick extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        readonly path: { x: number; z: number }[],
        readonly ctrlHeld: number,
        readonly opClick: boolean
    ) {
        super();
    }
}
