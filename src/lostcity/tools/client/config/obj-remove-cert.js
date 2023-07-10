import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import { loadPack } from '#lostcity/util/NameMap.js';

let objPack = loadPack('dump/pack/obj.pack');

// lazy
function append() {}

let config = Jagfile.load('dump/client/config');
let obj = config.read('obj.dat');

let count = obj.g2();
for (let id = 0; id < count; id++) {
    if (id > 0) {
        append('all.obj', '');
    }

    objPack[id] = `obj_${id}`;

    while (true) {
        let code = obj.g1();
        if (code === 0) {
            break;
        }

        if (code === 1) {
            append('all.obj', `model=model_${obj.g2()}`);
        } else if (code === 2) {
            append('all.obj', `name=${obj.gjstr()}`);
        } else if (code === 3) {
            append('all.obj', `desc=${obj.gjstr()}`);
        } else if (code === 4) {
            append('all.obj', `2dzoom=${obj.g2()}`);
        } else if (code === 5) {
            append('all.obj', `2dxan=${obj.g2()}`);
        } else if (code === 6) {
            append('all.obj', `2dyan=${obj.g2()}`);
        } else if (code === 7) {
            append('all.obj', `2dxof=${obj.g2s()}`);
        } else if (code === 8) {
            append('all.obj', `2dyof=${obj.g2s()}`);
        } else if (code === 9) {
            append('all.obj', `code9=yes`);
        } else if (code === 10) {
            append('all.obj', `code10=seq_${obj.g2()}`);
        } else if (code === 11) {
            append('all.obj', `stackable=yes`);
        } else if (code === 12) {
            append('all.obj', `cost=${obj.g4()}`);
        } else if (code === 16) {
            append('all.obj', `members=yes`);
        } else if (code === 23) {
            append('all.obj', `manwear=model_${obj.g2()},${obj.g1()}`);
        } else if (code === 24) {
            append('all.obj', `manwear2=model_${obj.g2()}`);
        } else if (code === 25) {
            append('all.obj', `womanwear=model_${obj.g2()},${obj.g1()}`);
        } else if (code === 26) {
            append('all.obj', `womanwear2=model_${obj.g2()}`);
        } else if (code >= 30 && code < 35) {
            append('all.obj', `op${code - 30 + 1}=${obj.gjstr()}`);
        } else if (code >= 35 && code < 40) {
            append('all.obj', `iop${code - 35 + 1}=${obj.gjstr()}`);
        } else if (code === 40) {
            let recol = obj.g1();

            for (let i = 0; i < recol; i++) {
                append('all.obj', `recol${i + 1}s=${obj.g2()}`);
                append('all.obj', `recol${i + 1}d=${obj.g2()}`);
            }
        } else if (code === 78) {
            append('all.obj', `manwear3=model_${obj.g2()}`);
        } else if (code === 79) {
            append('all.obj', `womanwear3=model_${obj.g2()}`);
        } else if (code === 90) {
            append('all.obj', `manhead=model_${obj.g2()}`);
        } else if (code === 91) {
            append('all.obj', `womanhead=model_${obj.g2()}`);
        } else if (code === 92) {
            append('all.obj', `manhead2=model_${obj.g2()}`);
        } else if (code === 93) {
            append('all.obj', `womanhead2=model_${obj.g2()}`);
        } else if (code === 95) {
            append('all.obj', `2dzan=${obj.g2()}`);
        } else if (code === 97) {
            objPack[id] = `cert_obj_${obj.g2()}`;
        } else if (code === 98) {
            append('all.obj', `certtemplate=obj_${obj.g2()}`);
        } else if (code >= 100 && code < 110) {
            append('all.obj', `count${code - 100 + 1}=obj_${obj.g2()},${obj.g2()}`);
        } else {
            console.error(`Unrecognized obj config code: ${code}`);
            process.exit(1);
        }
    }
}

fs.writeFileSync('dump/pack/obj.pack', objPack.map((v, i) => `${i}=${v}`).join('\n'));
