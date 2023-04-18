import { } from 'dotenv/config';
import fs from 'fs';

import FloorType from '#config/FloorType.js';
import IdentityKitType from '#config/IdentityKitType.js';
import LocationType from '#config/LocationType.js';
import NpcType from '#config/NpcType.js';
import ObjectType from '#config/ObjectType.js';
import SpotAnimationType from '#config/SpotAnimationType.js';
import VarpType from '#config/VarpType.js';
import Component from '#cache/Component.js';

import World from '#engine/World.js';
import { startWeb } from './web/app.js';
import SceneBuilder from '#cache/SceneBuilder.js';

import Server from '#network/Server.js';
import WSServer from '#network/WSServer.js';
import { crcTable, loadCrcTable } from '#util/GlobalCache.js';
import Jagfile from '#cache/Jagfile.js';

console.time('Loaded cache');
FloorType.fromJagConfig(fs.readFileSync('data/src/flo.def', 'utf8'));
IdentityKitType.fromJagConfig(fs.readFileSync('data/src/idk.def', 'utf8'));
LocationType.fromJagConfig(fs.readFileSync('data/src/loc.def', 'utf8'));
NpcType.fromJagConfig(fs.readFileSync('data/src/npc.def', 'utf8'));
ObjectType.fromJagConfig(fs.readFileSync('data/src/obj.def', 'utf8'));
SpotAnimationType.fromJagConfig(fs.readFileSync('data/src/spotanim.def', 'utf8'));
VarpType.fromJagConfig(fs.readFileSync('data/src/varp.def', 'utf8'));

Component.load(Jagfile.fromFile('data/cache/interface'));
console.timeEnd('Loaded cache');

SceneBuilder.init();

loadCrcTable();

if (!process.env.STANDALONE_WEB) {
    startWeb();
}

World.start();

let server = new Server();
server.start();

let wsserver = new WSServer();
wsserver.start();

let exiting = false;
process.on('SIGINT', function() {
    if (exiting) {
        return;
    }

    exiting = true;
    if (process.env.LOCAL_DEV) {
        World.stopServer(5);
    } else {
        World.stopServer(10);
    }
});
