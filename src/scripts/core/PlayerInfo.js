import { Player } from '#engine/Player.js';
import World from '#engine/World.js';
import { ServerProt, ServerProtOpcodeFromID } from '#enum/ServerProt.js';
import Packet from '#util/Packet.js';
import { Position } from '#util/Position.js';

export default class PlayerInfo {
    execute(player) {
        let buffer = new Packet();
        buffer.p1(ServerProtOpcodeFromID[ServerProt.PLAYER_INFO]);
        buffer.p2(0);
        let start = buffer.pos;

        let updates = [];
        if (player.mask > 0) {
            updates.push({ pid: player.pid });
        }

        buffer.accessBits();
        buffer.pBit(1, (player.placement || player.walkDir != -1 || player.mask) ? 1 : 0);
        if (player.placement) {
            buffer.pBit(2, 3);
            buffer.pBit(2, player.plane);
            buffer.pBit(7, Position.local(player.x));
            buffer.pBit(7, Position.local(player.z));
            buffer.pBit(1, 1);
            buffer.pBit(1, player.mask > 0 ? 1 : 0);
            player.placement = false;
        } else if (player.runDir != -1) {
            buffer.pBit(2, 2);
            buffer.pBit(3, player.walkDir);
            buffer.pBit(3, player.runDir);
            buffer.pBit(1, player.mask > 0 ? 1 : 0);
        } else if (player.walkDir != -1) {
            buffer.pBit(2, 1);
            buffer.pBit(3, player.walkDir);
            buffer.pBit(1, player.mask > 0 ? 1 : 0);
        } else if (player.mask > 0) {
            buffer.pBit(2, 0);
        }

        let added = [];
        let removed = [];
        let existed = player.players;

        let seen = [];
        let nearby = player.getNearbyPlayers().map(p => p.pid);
        for (let i = 0; i < nearby.length; i++) {
            seen.push(nearby[i]);

            if (!existed.find(pid => pid == nearby[i])) {
                added.push(nearby[i]);
            }
        }

        for (let i = 0; i < existed.length; i++) {
            if (seen.indexOf(existed[i]) == -1) {
                removed.push(existed[i]);
            }
        }

        // increasing 8 to 11 will increase the amount of players that can be seen
        buffer.pBit(8, existed.length);

        existed.forEach(pid => {
            const p = World.getPlayer(pid);

            if (removed.indexOf(pid) === -1) {
                // still exists
                buffer.pBit(1, (p.walkDir != -1 || p.mask) ? 1 : 0);

                if (p.runDir != -1) {
                    buffer.pBit(2, 2); // walk
                    buffer.pBit(3, p.walkDir);
                    buffer.pBit(3, p.runDir);
                    buffer.pBit(1, p.mask > 0 ? 1 : 0);
                } else if (p.walkDir != -1) {
                    buffer.pBit(2, 1); // walk
                    buffer.pBit(3, p.walkDir);
                    buffer.pBit(1, p.mask > 0 ? 1 : 0);
                } else if (p.mask > 0) {
                    buffer.pBit(2, 0);
                }

                if (p.mask > 0) {
                    updates.push({ pid });
                }
            } else {
                // goodbye
                buffer.pBit(1, 1);
                buffer.pBit(2, 3);
            }
        });

        for (let i = 0; i < removed.length; i++) {
            existed.splice(existed.indexOf(removed[i]), 1);
        }

        added.forEach(pid => {
            const p = World.getPlayer(pid);

            // even though we're sending the pid using 11 bits, the last section being 8 bits limits the max visible players to 255
            buffer.pBit(11, p.pid);
            let xPos = p.x - player.x;
            if (xPos < 0) {
                xPos += 32;
            }
            let zPos = p.z - player.z;
            if (zPos < 0) {
                zPos += 32;
            }
            buffer.pBit(5, xPos);
            buffer.pBit(5, zPos);
            buffer.pBit(1, 1); // clear walking queue
            buffer.pBit(1, 1); // update mask follows

            updates.push({ pid, firstSeen: true });
            existed.push(pid);
        });

        player.players = existed;

        if (updates.length) {
            buffer.pBit(11, 2047);
        }

        buffer.accessBytes();
        for (let i = 0; i < updates.length; i++) {
            let p = World.getPlayer(updates[i].pid);
            this.writeUpdate(buffer, p, player.pid == p.pid, updates[i].firstSeen);
        }

        buffer.psize2(buffer.pos - start);
        player.netOut.push(buffer);
    }

    writeUpdate(buffer, player, self = false, firstSeen = false) {
        let mask = player.mask;
        if (firstSeen) {
            mask |= Player.APPEARANCE;
        }
        if (firstSeen && (player.orientation !== -1 || player.faceX != -1 || player.faceZ != -1)) {
            mask |= Player.FACE_COORD;
        }
        if (firstSeen && (player.faceEntity != -1)) {
            mask |= Player.FACE_ENTITY;
        }

        if (mask > 255) {
            // so the client knows to read an additional byte
            mask |= 0x80;
        }

        // we don't want to echo the local chat message back to the player
        if (self && (mask & Player.CHAT)) {
            mask &= ~Player.CHAT;
        }

        buffer.p1(mask & 0xFF);
        if (mask & 0x80) {
            buffer.p1(mask >> 8);
        }

        if (mask & Player.APPEARANCE) {
            buffer.p1(player.appearance.length);
            buffer.pdata(player.appearance);
        }

        if (mask & Player.ANIM) {
            buffer.p2(player.animId);
            buffer.p1(player.animDelay);
        }

        if (mask & Player.FACE_ENTITY) {
            buffer.p2(player.faceEntity);
        }

        if (mask & Player.FORCED_CHAT) {
            buffer.pjstr(player.forcedChat);
        }

        if (mask & Player.DAMAGE) {
            buffer.p1(player.damageTaken);
            buffer.p1(player.damageType);
            buffer.p1(player.currentHealth);
            buffer.p1(player.maxHealth);
        }

        if (mask & Player.FACE_COORD) {
            if (firstSeen && player.faceX != -1) {
                buffer.p2(player.faceX);
                buffer.p2(player.faceZ);
            } else if (firstSeen && player.orientation != -1) {
                let faceX = Position.moveX(player.x, player.orientation);
                let faceZ = Position.moveZ(player.z, player.orientation);
                buffer.p2(faceX * 2 + 1);
                buffer.p2(faceZ * 2 + 1);
            } else {
                buffer.p2(player.faceX);
                buffer.p2(player.faceZ);
            }
        }

        if (mask & Player.CHAT) {
            buffer.p1(player.messageColor);
            buffer.p1(player.messageEffect);
            buffer.p1(player.messageType);

            buffer.p1(player.message.length);
            buffer.pdata(player.message);
        }

        if (mask & Player.SPOTANIM) {
            buffer.p2(player.graphicId);
            buffer.p2(player.graphicHeight);
            buffer.p2(player.graphicDelay);
        }

        if (mask & Player.FORCED_MOVEMENT) {
            buffer.p1(player.forceStartX);
            buffer.p1(player.forceStartY);
            buffer.p1(player.forceDestX);
            buffer.p1(player.forceDestY);
            buffer.p2(player.forceMoveDelay);
            buffer.p2(player.forceMoveDelayEnd);
            buffer.p1(player.forceFaceDirection);
        }
    }
}
