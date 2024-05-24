import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class RebuildGetMaps extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(readonly maps: { type: number, x: number, z: number }[]) {
        super();
    }
}
