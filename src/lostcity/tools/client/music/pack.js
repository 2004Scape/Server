import fs from 'fs';
import BZip2 from '#jagex2/io/BZip2.js';
import { basename } from 'path';

console.log('---- jingles ----');

let jingles = [];
fs.mkdirSync('data/pack/server/jingles', { recursive: true });
fs.readdirSync('data/src/jingles').forEach(f => {
    // TODO: mtime-based check
    if (fs.existsSync(`data/pack/server/jingles/${f}`)) {
        return;
    }

    jingles.push(`data/src/jingles/${f}`);
});

BZip2.compressMany(jingles, true);
for (let i = 0; i < jingles.length; i++) {
    fs.renameSync(`${jingles[i]}.bz2`, `data/pack/server/jingles/${basename(jingles[i])}`);
}

// ----

console.log('---- songs ----');

let songs = [];
fs.mkdirSync('data/pack/server/songs', { recursive: true });
fs.readdirSync('data/src/songs').forEach(f => {
    // TODO: mtime-based check
    if (fs.existsSync(`data/pack/server/songs/${f}`)) {
        return;
    }

    songs.push(`data/src/songs/${f}`);
});

BZip2.compressMany(songs, true);
for (let i = 0; i < songs.length; i++) {
    fs.renameSync(`${songs[i]}.bz2`, `data/pack/server/songs/${basename(songs[i])}`);
}
