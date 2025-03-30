import { ClientProtCategory, ReportAbuse } from '@2004scape/rsbuf';

import Player from '#/engine/entity/Player.js';
import World from '#/engine/World.js';
import MessageHandler from '#/network/MessageHandler.js';
import Environment from '#/util/Environment.js';
import { fromBase37 } from '#/util/JString.js';
import { ReportAbuseReason } from '#/util/ReportAbuse.js';

export default class ReportAbuseHandler extends MessageHandler<ReportAbuse> {
    category: ClientProtCategory = ClientProtCategory.USER_EVENT;

    handle(message: ReportAbuse, player: Player): boolean {
        if (player.reportAbuseProtect) {
            return false;
        }

        const { offender, reason, mute } = message;

        if (reason < ReportAbuseReason.OFFENSIVE_LANGUAGE || reason > ReportAbuseReason.REAL_WORLD_TRADING) {
            World.notifyPlayerBan('automated', player.username, Date.now() + 172800000);
            return false;
        }

        if (mute && player.staffModLevel > 0 && Environment.NODE_PRODUCTION) {
            // 2 day mute
            World.notifyPlayerMute(player.username, fromBase37(offender), Date.now() + 172800000);
        }

        World.notifyPlayerReport(player, fromBase37(offender), reason);
        player.messageGame('Thank-you, your abuse report has been received');
        player.reportAbuseProtect = true;
        return true;
    }
}
