import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet2 from '#jagex2/io/Packet2.js';
import { loadOrder, loadPack } from '#lostcity/util/NameMap.js';
import { SoundPack, shouldBuildFileAny } from '#lostcity/util/PackFile.js';

export function packClientSound() {
    if (!shouldBuildFileAny('data/src/sounds', 'data/pack/client/sounds')) {
        return;
    }

    console.log('Packing sounds.jag');
    //console.time('sounds.jag');

    const order = loadOrder('data/src/pack/sound.order');

    const jag = new Jagfile();

    const out = Packet2.alloc(4);
    for (let i = 0; i < order.length; i++) {
        const id = Number(order[i]);
        const name = SoundPack.getById(id);

        out.p2(id);
        const data = new Uint8Array(fs.readFileSync(`data/src/sounds/${name}.synth`));
        out.pdata(data, 0, data.length);
    }
    out.p2(-1);

    jag.write('sounds.dat', out);
    jag.save('data/pack/client/sounds', true).release();
    out.release();
    //console.timeEnd('sounds.jag');
}
