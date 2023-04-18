import fs from 'fs';
import Jagfile from '#cache/Jagfile.js';
import FloorType from '#cache/config/FloorType.js';
import IdentityKitType from '#cache/config/IdentityKitType.js';
import LocationType from '#cache/config/LocationType.js';
import NpcType from '#cache/config/NpcType.js';
import ObjectType from '#cache/config/ObjectType.js';
import SpotAnimationType from '#cache/config/SpotAnimationType.js';
import VarpType from '#cache/config/VarpType.js';

let config = new Jagfile();

// TODO: generate these like the rest (need to figure out framegroup problem)
config.write('seq.dat', fs.readFileSync('data/src/seq.dat'));
config.write('seq.idx', fs.readFileSync('data/src/seq.idx'));

LocationType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/loc.def')).toString());
let locPack = LocationType.pack();
config.write('loc.dat', locPack.dat.data);
config.write('loc.idx', locPack.idx.data);

FloorType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/flo.def')).toString());
let floPack = FloorType.pack();
config.write('flo.dat', floPack.dat.data);
config.write('flo.idx', floPack.idx.data);

SpotAnimationType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/spotanim.def')).toString());
let spotanimPack = SpotAnimationType.pack();
config.write('spotanim.dat', spotanimPack.dat.data);
config.write('spotanim.idx', spotanimPack.idx.data);

ObjectType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/obj.def')).toString());
let objPack = ObjectType.pack();
config.write('obj.dat', objPack.dat.data);
config.write('obj.idx', objPack.idx.data);

NpcType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/npc.def')).toString());
let npcPack = NpcType.pack();
config.write('npc.dat', npcPack.dat.data);
config.write('npc.idx', npcPack.idx.data);

IdentityKitType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/idk.def')).toString());
let idkPack = IdentityKitType.pack();
config.write('idk.dat', idkPack.dat.data);
config.write('idk.idx', idkPack.idx.data);

VarpType.fromJagConfig(Buffer.from(fs.readFileSync('data/src/varp.def')).toString());
let varpPack = VarpType.pack();
config.write('varp.dat', varpPack.dat.data);
config.write('varp.idx', varpPack.idx.data);

config.pack().toFile('data/cache/config');
