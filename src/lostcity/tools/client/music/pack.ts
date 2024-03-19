import fs from 'fs';

import BZip2 from '#jagex2/io/BZip2.js';
import { shouldBuild } from '#lostcity/util/PackFile.js';

export function packClientMusic() {
    if (!shouldBuild('data/src/jingles', '', 'data/pack/client/jingles')) {
        return;
    }

    console.log('Packing jingles');
    //console.time('jingles');

    fs.mkdirSync('data/pack/client/jingles', { recursive: true });
    fs.readdirSync('data/src/jingles').forEach(f => {
        // TODO: mtime-based check
        if (fs.existsSync(`data/pack/client/jingles/${f}`)) {
            return;
        }

        const data = fs.readFileSync(`data/src/jingles/${f}`);
        fs.writeFileSync(`data/pack/client/jingles/${f}`, BZip2.compress(data, true));
    });
    //console.timeEnd('jingles');

    // ----

    console.log('Packing songs');
    //console.time('songs');

    fs.mkdirSync('data/pack/client/songs', { recursive: true });
    fs.readdirSync('data/src/songs').forEach(f => {
        // TODO: mtime-based check
        if (fs.existsSync(`data/pack/client/songs/${f}`)) {
            return;
        }

        const data = fs.readFileSync(`data/src/songs/${f}`);
        fs.writeFileSync(`data/pack/client/songs/${f}`, BZip2.compress(data, true));
    });
    //console.timeEnd('songs');
}
