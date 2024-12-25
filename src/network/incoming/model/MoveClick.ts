import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class MoveClick extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly path: { x: number, z: number}[], readonly ctrlHeld: number, readonly opClick: boolean) {
        super();
    }
}
