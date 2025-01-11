import IncomingMessage from '#/network/client/IncomingMessage.js';
import ClientProtCategory from '#/network/client/prot/ClientProtCategory.js';

export default class RebuildGetMaps extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly maps: { type: number, x: number, z: number }[]) {
        super();
    }
}
