import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';
import { loadOrder, loadPack } from '#lostcity/util/NameMap.js';

console.log('---- sounds ----');

let order = loadOrder('data/pack/sound.order');
let pack = loadPack('data/pack/sound.pack');

let jag = new Jagfile();

let out = new Packet();
for (let i = 0; i < order.length; i++) {
    let id = Number(order[i]);
    let name = pack[id];

    out.p2(id);
    let data = fs.readFileSync(`data/src/sounds/${name}.synth`);
    out.pdata(data);
}
out.p2(-1);

jag.write('sounds.dat', out);
jag.save('data/pack/client/sounds', true);
