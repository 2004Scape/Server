import { ServerProtPriority } from '#/network/game/server/codec/ServerProtPriority.js';
import OutgoingMessage from '#/network/game/server/OutgoingMessage.js';

export default class ResetAnims extends OutgoingMessage {
    priority = ServerProtPriority.IMMEDIATE; // todo: what should priority be?
}
