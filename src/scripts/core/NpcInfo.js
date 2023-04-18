import { Npc } from '#engine/Npc.js';
import { ServerProt, ServerProtOpcodeFromID } from '#enum/ServerProt.js';

import Packet from '#util/Packet.js';
import { Position } from '#util/Position.js';

export default class NpcInfo {
    execute(player) {
        let buffer = new Packet();
        buffer.p1(ServerProtOpcodeFromID[ServerProt.NPC_INFO]);
        buffer.p2(0);
        let start = buffer.pos;

        let nearby = player.getNearbyNpcs();
        player.npcs = player.npcs.filter(x => x !== null);

        let newNpcs = nearby.filter(x => player.npcs.findIndex(y => y.nid === x.nid) === -1);
        let removedNpcs = player.npcs.filter(x => nearby.findIndex(y => y.nid === x.nid) === -1);
        player.npcs.filter(x => removedNpcs.findIndex(y => x.nid === y.nid) !== -1).map(x => {
            x.type = 1;
        });

        let updates = [];

        buffer.accessBits();
        buffer.pBit(8, player.npcs.length);
        player.npcs = player.npcs.map(x => {
            if (x.type === 0) {
                if (x.npc.mask > 0) {
                    updates.push(x.npc);
                }

                buffer.pBit(1, x.npc.walkDir != -1 || x.npc.mask > 0 || x.npc.runDir != -1 ? 1 : 0);

                // if (x.npc.runDir !== -1) {
                //     buffer.pBit(2, 2);
                //     buffer.pBit(3, x.npc.walkDir);
                //     buffer.pBit(3, x.npc.runDir);
                //     buffer.pBit(1, x.npc.mask > 0 ? 1 : 0);
                // } else
                if (x.npc.walkDir !== -1) {
                    buffer.pBit(2, 1);
                    buffer.pBit(3, x.npc.walkDir);
                    buffer.pBit(1, x.npc.mask > 0 ? 1 : 0);
                } else if (x.npc.mask > 0) {
                    buffer.pBit(2, 0);
                }
                return x;
            } else if (x.type === 1) {
                // remove
                buffer.pBit(1, 1);
                buffer.pBit(2, 3);
                return null;
            }
        });

        newNpcs.map(n => {
            buffer.pBit(13, n.nid);
            buffer.pBit(11, n.id);
            let xPos = n.x - player.x;
            if (xPos < 0) {
                xPos += 32;
            }
            let zPos = n.z - player.z;
            if (zPos < 0) {
                zPos += 32;
            }
            buffer.pBit(5, xPos);
            buffer.pBit(5, zPos);

            if (n.orientation !== -1) {
                buffer.pBit(1, 1);
                updates.push(n);
            } else {
                buffer.pBit(1, 0);
            }

            player.npcs.push({ type: 0, nid: n.nid, npc: n });
        });

        if (updates.length) {
            buffer.pBit(13, 8191);
        }
        buffer.accessBytes();

        updates.map(n => {
            let newlyObserved = newNpcs.find(x => x == n) != null;

            let mask = n.mask;
            if (newlyObserved && (n.orientation !== -1 || n.faceX !== -1)) {
                mask |= Npc.FACE_COORD;
            }
            if (newlyObserved && n.faceEntity !== -1) {
                mask |= Npc.FACE_ENTITY;
            }
            buffer.p1(mask);

            if (mask & Npc.ANIM) {
                buffer.p2(n.animId);
                buffer.p1(n.animDelay);
            }

            if (mask & Npc.FACE_ENTITY) {
                buffer.p2(n.faceEntity);
            }

            if (mask & Npc.FORCED_CHAT) {
                buffer.pjstr(n.forcedChat);
            }

            if (mask & Npc.DAMAGE) {
                buffer.p1(n.damageTaken);
                buffer.p1(n.damageType);
                buffer.p1(n.currentHealth);
                buffer.p1(n.maxHealth);
            }

            if (mask & Npc.TRANSMOGRIFY) {
                buffer.p2(n.transmogId);
            }

            if (mask & Npc.SPOTANIM) {
                buffer.p2(n.graphicId);
                buffer.p2(n.graphicHeight);
                buffer.p2(n.graphicDelay);
            }

            if (mask & Npc.FACE_COORD) {
                if (newlyObserved && n.faceX != -1) {
                    buffer.p2(n.faceX);
                    buffer.p2(n.faceZ);
                } else if (newlyObserved && n.orientation != -1) {
                    let faceX = Position.moveX(n.x, n.orientation);
                    let faceZ = Position.moveZ(n.z, n.orientation);
                    buffer.p2(faceX * 2 + 1);
                    buffer.p2(faceZ * 2 + 1);
                } else {
                    buffer.p2(n.faceX);
                    buffer.p2(n.faceZ);
                }
            }
        });

        buffer.psize2(buffer.pos - start);
        player.netOut.push(buffer);
    }
}
