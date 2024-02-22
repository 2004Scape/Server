import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';
import { loadOrder, loadPack } from '#lostcity/util/NameMap.js';
import { SoundPack, shouldBuildFileAny } from '#lostcity/util/PackFile.js';

export function packClientSound() {
    if (!shouldBuildFileAny('data/src/sounds', 'data/pack/client/sounds')) {
        return;
    }

    console.log('Packing sounds.jag');
    //console.time('sounds.jag');

    const order = loadOrder('data/pack/sound.order');

    const jag = new Jagfile();

    const out = new Packet();
    for (let i = 0; i < order.length; i++) {
        const id = Number(order[i]);
        const name = SoundPack.getById(id);

        out.p2(id);
        const data = fs.readFileSync(`data/src/sounds/${name}.synth`);
        out.pdata(data);
    }
    out.p2(-1);

    jag.write('sounds.dat', out);
    jag.save('data/pack/client/sounds', true);
    //console.timeEnd('sounds.jag');
}
