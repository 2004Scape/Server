import MessageHandler from '#/network/client/handler/MessageHandler.js';
import EventTracking from '#/network/client/model/EventTracking.js';
import Player from '#/engine/entity/Player.js';
import Packet from '#/io/Packet.js';
import ReportEvent from '#/engine/entity/tracking/ReportEvent.js';

enum InputTrackingEvent {
    MOUSEDOWNL = 1,
    MOUSEDOWNR = 2,
    MOUSEUPL = 3,
    MOUSEUPR = 4,
    MOUSEMOVE1 = 5,
    MOUSEMOVE2 = 6,
    MOUSEMOVE3 = 7,
    KEYDOWN = 8,
    KEYUP = 9,
    FOCUS = 10,
    BLUR = 11,
    MOUSEENTER = 12,
    MOUSELEAVE = 13
}

export default class EventTrackingHandler extends MessageHandler<EventTracking> {
    handle(message: EventTracking, player: Player): boolean {
        const bytes: Uint8Array = message.bytes;
        if (bytes.length === 0 || bytes.length > 5000) {
            return false;
        }
        if (!player.input.tracking()) {
            return false;
        }
        const buf: Packet = new Packet(bytes);
        while (buf.available > 0 && player.input.tracking()) {
            const event: number = buf.g1();
            if (event === InputTrackingEvent.MOUSEDOWNL || event === InputTrackingEvent.MOUSEDOWNR) {
                this.onmousedown(player, buf);
            } else if (event === InputTrackingEvent.MOUSEUPL || event === InputTrackingEvent.MOUSEUPR) {
                this.onmouseup(player, buf);
            } else if (event === InputTrackingEvent.MOUSEMOVE1) {
                this.onmousemove(player, buf, 1);
            } else if (event === InputTrackingEvent.MOUSEMOVE2) {
                this.onmousemove(player, buf, 2);
            } else if (event === InputTrackingEvent.MOUSEMOVE3) {
                this.onmousemove(player, buf, 3);
            } else if (event === InputTrackingEvent.KEYDOWN) {
                this.onkeydown(player, buf);
            } else if (event === InputTrackingEvent.KEYUP) {
                this.onkeyup(player, buf);
            } else if (event === InputTrackingEvent.FOCUS) {
                this.onfocus(buf);
            } else if (event === InputTrackingEvent.BLUR) {
                this.onblur(buf);
            } else if (event === InputTrackingEvent.MOUSEENTER) {
                this.onmouseenter(buf);
            } else if (event === InputTrackingEvent.MOUSELEAVE) {
                this.onmouseleave(player, buf);
            } else {
                break;
            }
        }
        return true;
    }

    onmousedown(player: Player, buf: Packet): void {
        buf.pos += 1; // time
        buf.pos += 3; // position

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }

    onmouseup(player: Player, buf: Packet): void {
        buf.pos += 1; // time

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }

    onmousemove(player: Player, buf: Packet, op: number): void {
        buf.pos += 1; // time
        if (op === 1) {
            buf.pos += 1; // position
        } else if (op === 2) {
            buf.pos += 1; // x
            buf.pos += 1; // y
        } else if (op === 3) {
            buf.pos += 3; // position
        }

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }

    onkeydown(player: Player, buf: Packet): void {
        buf.pos += 1; // time
        buf.pos += 1; // key

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }

    onkeyup(player: Player, buf: Packet): void {
        buf.pos += 1; // time
        buf.pos += 1; // key

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }

    onfocus(buf: Packet): void {
        buf.pos += 1; // time
    }

    onblur(buf: Packet): void {
        buf.pos += 1; // time
    }

    onmouseenter(buf: Packet): void {
        buf.pos += 1; // time
    }

    onmouseleave(player: Player, buf: Packet): void {
        buf.pos += 1; // time

        if (player.input.enabled) {
            player.input.disable(true);
        } else {
            player.input.report(ReportEvent.ACTIVE);
        }
    }
}