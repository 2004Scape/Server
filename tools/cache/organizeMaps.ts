import fs from 'fs';
import path from 'path';

import Packet from '#/io/Packet.js';

import { fromBase37 } from '#/util/JString.js';

const args = process.argv.splice(2);

if (!args.length) {
    process.exit(1);
}

const searchDir = args[0];

type MapEntry = {
    filePath: string,
    name: string,
    ctime: number,
    size: number,
    checksum: number
};

const dirs = fs.readdirSync(searchDir);
const allFiles: MapEntry[] = [];
const betaFiles: MapEntry[] = [];

for (const dir of dirs) {
    const dirPath = path.join(searchDir, dir);
    if (!fs.statSync(dirPath).isDirectory()) {
        continue;
    }

    const files = fs.readdirSync(dirPath);

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

            if (fs.statSync(filePath).birthtime >= new Date('2004-02-01T00:00:00')) {
                allFiles.push({
                    filePath,
                    name,
                    ctime: stats.birthtimeMs,
                    size: stats.size,
                    checksum
                });
            } else {
                // these beta files use a different set of IDs so they're "incompatible" as-is, or in some cases, only existed for a short while
                betaFiles.push({
                    filePath,
                    name,
                    ctime: stats.birthtimeMs,
                    size: stats.size,
                    checksum
                });
            }
        }
    }
}

function sortFiles(files: MapEntry[], outPath: string) {
    files.sort((a, b) => a.name.localeCompare(b.name));
    fs.mkdirSync(outPath, { recursive: true });

    const processed = new Set();
    for (const map of files) {
        if (processed.has(map.name)) {
            continue;
        }

        // only run once on this name
        processed.add(map.name);

        // get all of the map entries that match this one
        let revisions = files.filter(x => x.name === map.name);

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
                fs.copyFileSync(revision.filePath, path.join(outPath, revision.name));
                fs.utimesSync(path.join(outPath, revision.name), revision.ctime / 1000, revision.ctime / 1000);
            }
        } else {
            for (let i = 0; i < revisions.length; i++) {
                const revision = revisions[i];

                if (i === revisions.length - 1) {
                    fs.copyFileSync(revision.filePath, path.join(outPath, revision.name));
                    fs.utimesSync(path.join(outPath, revision.name), revision.ctime / 1000, revision.ctime / 1000);
                    continue;
                }

                const outFolder = path.join(outPath, 'v' + (i + 1));
                if (!fs.existsSync(outFolder)) {
                    fs.mkdirSync(outFolder, { recursive: true });
                }

                fs.copyFileSync(revision.filePath, path.join(outFolder, revision.name));
                fs.utimesSync(path.join(outFolder, revision.name), revision.ctime / 1000, revision.ctime / 1000);
            }
        }
    }
}

sortFiles(allFiles, path.join('dump', 'maps'));
// sortFiles(betaFiles, path.join('dump', 'maps', 'beta'));
