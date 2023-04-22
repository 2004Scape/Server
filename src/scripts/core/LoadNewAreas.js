import fs from 'fs';

import Packet from '#util/Packet.js';
import { Position } from '#util/Position.js';

import { ServerProt, ServerProtOpcodeFromID } from '#enum/ServerProt.js';

import ObjectType from '#cache/config/ObjectType.js';
import Component from '#cache/Component.js';
import World from '#engine/World.js';
import objs from '#cache/objs.js';
import VarpType from '#cache/config/VarpType.js';

export default class LoadNewAreas {
    execute(player) {
        // check if the player is 2 zones away from the edge of the loaded area (52 - 16 = 36)
        if (player.placement || Math.abs(player.x - player.lastX) >= 36 || Math.abs(player.z - player.lastZ) >= 36) {
            player.loaded = false;
            player.loading = false;
        }

        if (player.loading || player.loaded) {
            return;
        }

        let buffer = new Packet();
        buffer.p1(ServerProtOpcodeFromID[ServerProt.LOAD_AREA]);
        buffer.p2(0);
        let start = buffer.pos;

        buffer.p2(Position.zone(player.x));
        buffer.p2(Position.zone(player.z));

        // build area is 13x13 zones (8*13 = 104 tiles), so we need to load 6 zones in each direction
        let areas = [];
        for (let x = Position.zone(player.x) - 6; x <= Position.zone(player.x) + 6; x++) {
            for (let z = Position.zone(player.z) - 6; z <= Position.zone(player.z) + 6; z++) {
                let fileX = Position.mapsquare(x << 3);
                let fileZ = Position.mapsquare(z << 3);

                let landExists = fs.existsSync(`data/maps/m${fileX}_${fileZ}`);
                let locExists = fs.existsSync(`data/maps/l${fileX}_${fileZ}`);
                if ((landExists || locExists) && areas.findIndex(a => a.x === fileX && a.z === fileZ) === -1) {
                    areas.push({ x: fileX, z: fileZ });
                }
            }
        }

        for (let i = 0; i < areas.length; i++) {
            const { x, z } = areas[i];
            buffer.p1(x);
            buffer.p1(z);

            let landExists = fs.existsSync(`data/maps/m${x}_${z}`);
            let locExists = fs.existsSync(`data/maps/l${x}_${z}`);
            buffer.p4(landExists ? Packet.crc32(Packet.fromFile(`data/maps/m${x}_${z}`)) : 0);
            buffer.p4(locExists ? Packet.crc32(Packet.fromFile(`data/maps/l${x}_${z}`)) : 0);
        }

        buffer.psize2(buffer.pos - start);
        player.netOut.push(buffer);

        // remove zones that are no longer loaded on the client by comparing x to lastX, and z to lastZ
        let zones = player.zones;
        for (let i = 0; i < zones.length; i++) {
            const { x, z } = zones[i];
            if (Math.abs(x - player.lastX) >= 52 || Math.abs(z - player.lastZ) >= 52) {
                zones.splice(i, 1);
                i--;
            }
        }
        console.log(zones);

        player.lastX = player.x;
        player.lastZ = player.z;
        player.loading = true;

        if (player.firstLoad) {
            // TODO: enqueue a login script? for now it's here
            player.sendUid();
            player.clearWalkingQueue();
            player.resetAnimations();

            if (player.reconnecting) {
                player.closeModal(true);
            }

            player.setTab(5855, 0);
            player.setTab(3917, 1);
            player.setTab(638, 2);
            player.setTab(3213, 3);
            player.setTab(1644, 4);
            player.setTab(5608, 5);
            player.setTab(1151, 6);
            player.setTab(5065, 8);
            player.setTab(5715, 9);
            player.setTab(2449, 10);
            player.setTab(147, 12);

            if (player.lowmem) {
                player.setTab(4445, 11);
                player.setTab(6299, 13);
            } else {
                player.setTab(904, 11);
                player.setTab(962, 13);
            }

            // Weapon tab
            player.setInterfaceText(5857, 'Unarmed');

            for (let i = 0; i < player.levels.length; ++i) {
                player.updateStat(i);
            }

            // Quest tab
            let questTab = Component.get(638);
            let questList = Component.get(questTab.children[0]);
            for (let i = 0; i < questList.children.length; ++i) {
                let quest = Component.get(questList.children[i]);
                if (quest.buttonType !== 1) { // not a quest
                    continue;
                }

                // 0x33FF - yellow - in progress
                // 0x3366 - green - done
                player.setInterfaceColor(quest.id, 0x3366); // mark all as complete for now
            }

            // Equipment tab
            player.updateBonuses();

            player.inv.update = true;

            // send all varps
            player.resetVarCache();
            for (let i = 0; i < player.varps.length; ++i) {
                if (!VarpType.get(i).transmit) {
                    continue;
                }

                let varp = player.varps[i];
                if (varp > 255) {
                    player.sendVarpLarge(i, varp);
                } else {
                    player.sendVarp(i, varp);
                }
            }

            player.sendRunEnergy(Math.floor(player.energy / 100));

            if (player.firstLogin) {
                // TODO: add this after tutorial island
                player.inv.add(objs.bronze_axe);
                player.inv.add(objs.bronze_pickaxe);
                player.inv.add(objs.tinderbox);
                player.inv.add(objs.small_fishing_net);
                player.inv.add(objs.shrimps);
                player.inv.add(objs.bronze_dagger);
                player.inv.add(objs.bronze_longsword);
                player.inv.add(objs.wooden_shield);
                player.inv.add(objs.shortbow2);
                player.inv.add(objs.bronze_arrow, 25);
                player.inv.add(objs.air_rune, 25);
                player.inv.add(objs.mind_rune, 15);
                player.inv.add(objs.bucket);
                player.inv.add(objs.pot);
                player.inv.add(objs.bread);
                player.inv.add(objs.water_rune, 6);
                player.inv.add(objs.earth_rune, 4);
                player.inv.add(objs.body_rune, 2);

                // set music player to autoplay
                player.sendVarp(18, 1);

                // set default brightness to normal
                player.sendVarp(166, 2);

                player.openInterface(3559);
                player.firstLogin = false;
            } else {
                player.showWelcome();
            }

            if (!player.reconnecting) {
                player.sendMessage('Welcome to RuneScape.');
                player.sendMessage('Spawns are being worked on, random walk is disabled.');
            }

            if (World.endTick > World.currentTick) {
                player.sendRebootTimer(World.endTick - World.currentTick);
            }

            player.firstLoad = false;
        }
    }
}
