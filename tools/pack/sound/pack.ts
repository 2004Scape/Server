import fs from 'fs';
import path from 'path';

import Jagfile from '#/io/Jagfile.js';
import Packet from '#/io/Packet.js';
import { printError } from '#/util/Logger.js';
import { listFiles, loadOrder } from '#/util/NameMap.js';
import { SynthPack, shouldBuildFileAny } from '#/util/PackFile.js';

export function packClientSound() {
    if (!shouldBuildFileAny('data/src/synth', 'data/pack/client/sounds')) {
        return;
    }

    const order = loadOrder('data/src/pack/synth.order');
    const files = listFiles('data/src/synth');

    const jag = new Jagfile();

    const out = Packet.alloc(4);
    for (let i = 0; i < order.length; i++) {
        const id = Number(order[i]);
        const name = SynthPack.getById(id);

        const file = files.find(file => path.basename(file) === `${name}.synth`);
        if (!file) {
            printError('missing synth file ' + id + ' ' + name);
            continue;
        }

        out.p2(id);
        const data = fs.readFileSync(file);
        out.pdata(data, 0, data.length);
    }
    out.p2(-1);

    jag.write('sounds.dat', out);
    jag.save('data/pack/client/sounds', true);
    out.release();
}
