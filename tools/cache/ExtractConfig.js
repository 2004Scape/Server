import fs from 'fs';
import Jagfile from '#cache/Jagfile.js';

import FloorType from '#config/FloorType.js';
import IdentityKitType from '#config/IdentityKitType.js';
import LocationType from '#config/LocationType.js';
import NpcType from '#config/NpcType.js';
import ObjectType from '#config/ObjectType.js';
import SequenceType from '#config/SequenceType.js';
import SpotAnimationType from '#config/SpotAnimationType.js';
import VarpType from '#config/VarpType.js';
import SequenceBase from '#cache/SequenceBase.js';
import SequenceFrame from '#cache/SequenceFrame.js';

// let models = Jagfile.fromFile('data/cache/models');
// SequenceBase.unpack(models.read('base_head.dat'), models.read('base_type.dat'), models.read('base_label.dat')); // needed for SequenceFrame
// SequenceFrame.unpack(models.read('frame_head.dat'), models.read('frame_tran1.dat'), models.read('frame_tran2.dat'), models.read('frame_del.dat')); // needed for SequenceType

let config = Jagfile.fromFile('data/cache/config');

FloorType.unpack(config.read('flo.dat'), config.read('flo.idx'));
IdentityKitType.unpack(config.read('idk.dat'), config.read('idk.idx'));
LocationType.unpack(config.read('loc.dat'), config.read('loc.idx'));
NpcType.unpack(config.read('npc.dat'), config.read('npc.idx'));
ObjectType.unpack(config.read('obj.dat'), config.read('obj.idx'));
// SequenceType.unpack(config.read('seq.dat'), config.read('seq.idx'));
SpotAnimationType.unpack(config.read('spotanim.dat'), config.read('spotanim.idx'));
VarpType.unpack(config.read('varp.dat'), config.read('varp.idx'));

fs.writeFileSync('data/src/flo.def', FloorType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/idk.def', IdentityKitType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/loc.def', LocationType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/npc.def', NpcType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/obj.def', ObjectType.toJagConfig().trimEnd() + '\n');
// fs.writeFileSync('data/src/seq.def', SequenceType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/seq.dat', config.read('seq.dat', false));
fs.writeFileSync('data/src/seq.idx', config.read('seq.idx', false));
fs.writeFileSync('data/src/spotanim.def', SpotAnimationType.toJagConfig().trimEnd() + '\n');
fs.writeFileSync('data/src/varp.def', VarpType.toJagConfig().trimEnd() + '\n');
