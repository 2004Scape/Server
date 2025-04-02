import { ClientProtCategory, NoTimeout } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import MessageHandler from '#/server/client/MessageHandler.js';

export default class NoTimeoutHandler extends MessageHandler<NoTimeout> {
    readonly category: ClientProtCategory = ClientProtCategory.CLIENT_EVENT;

    handle(_: NoTimeout, __: Player): boolean {
        return true;
    }
}
