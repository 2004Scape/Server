import Packet from '#jagex2/io/Packet.js';
import { fromBase37 } from '#jagex2/jstring/JString.js';
import fs from 'fs';
import path from 'path';

const args = process.argv.splice(2);

if (!args.length) {
    process.exit(1);
}

const searchDir = args[0];
const outDir = path.join('dump', 'maps');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

class MapEntry {
    constructor(readonly filePath: string, readonly name: string, readonly ctime: number, readonly size: number, readonly checksum: number) {
    }
}

const dirs = fs.readdirSync(searchDir);
const allFiles: MapEntry[] = [];

for (const dir of dirs) {
    const files = fs.readdirSync(path.join(searchDir, dir));

    for (const file of files) {
        const name = fromBase37(BigInt(file));

        if (name === 'invalid_name') {
            // console.log('unknown file:', file);
            continue;
        }

        const filePath = path.join(searchDir, dir, file);

        if (name.match(/[lm]\d+_\d+/)) {
            // lX_Z and mX_Z maps
            const stats = fs.statSync(filePath);
            const data = Packet.load(filePath);

            // users might have uploaded corrupted files
            let bad = false;
            for (let i = 0; i < 8; i++) {
                // "bad_ntfs_decompr" - 6261645F6E7466735F6465636F6D7072
                const sig = data.g4();
                data.pos -= 3;
                if (sig === 0x5F6E7466) {
                    // "_ntf" spotted in the first 12 bytes
                    bad = true;
                } else if (sig === 0x08080808) {
                    // repeating 08 spotted
                    bad = true;
                }
            }
            if (bad) {
                continue;
            }

            const checksum = Packet.getcrc(data.data, 0, data.length);
            allFiles.push(new MapEntry(filePath, name, stats.birthtimeMs, stats.size, checksum));
        }
    }
}

allFiles.sort((a, b) => a.name.localeCompare(b.name));
const processed = new Set();

for (const map of allFiles) {
    if (processed.has(map.name)) {
        continue;
    }

    // only run once on this name
    processed.add(map.name);

    // get all of the map entries that match this one
    let revisions = allFiles.filter(x => x.name === map.name);

    // order by date
    revisions.sort((a, b) => a.ctime - b.ctime);

    // remove duplicates
    revisions = revisions.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name && t.checksum === value.checksum
        ))
    );

    // copy to dump folder
    if (revisions.length <= 1) {
        for (const revision of revisions) {
            fs.copyFileSync(revision.filePath, path.join('dump', 'maps', revision.name));
            fs.utimesSync(path.join(outDir, revision.name), revision.ctime / 1000, revision.ctime / 1000);
        }
    } else {
        for (let i = 0; i < revisions.length; i++) {
            const revision = revisions[i];

            if (i === revisions.length - 1) {
                fs.copyFileSync(revision.filePath, path.join('dump', 'maps', revision.name));
                fs.utimesSync(path.join(outDir, revision.name), revision.ctime / 1000, revision.ctime / 1000);
                continue;
            }

            const outFolder = path.join('dump', 'maps', 'v' + (i + 1));
            if (!fs.existsSync(outFolder)) {
                fs.mkdirSync(outFolder);
            }

            fs.copyFileSync(revision.filePath, path.join(outFolder, revision.name));
            fs.utimesSync(path.join(outFolder, revision.name), revision.ctime / 1000, revision.ctime / 1000);
        }
    }
}
