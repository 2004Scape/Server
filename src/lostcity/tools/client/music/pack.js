import fs from 'fs';
import BZip2 from '#jagex2/io/BZip2.js';
import { basename } from 'path';

console.log('---- jingles ----');

let jingles = [];
fs.mkdirSync('data/pack/client/jingles', { recursive: true });
fs.readdirSync('data/src/jingles').forEach(f => {
    // TODO: mtime-based check
    if (fs.existsSync(`data/pack/client/jingles/${f}`)) {
        return;
    }

    jingles.push(`data/src/jingles/${f}`);
});

BZip2.compressMany(jingles, true);
for (let i = 0; i < jingles.length; i++) {
    fs.renameSync(`${jingles[i]}.bz2`, `data/pack/client/jingles/${basename(jingles[i])}`);
}

// ----

console.log('---- songs ----');

let songs = [];
fs.mkdirSync('data/pack/client/songs', { recursive: true });
fs.readdirSync('data/src/songs').forEach(f => {
    // TODO: mtime-based check
    if (fs.existsSync(`data/pack/client/songs/${f}`)) {
        return;
    }

    songs.push(`data/src/songs/${f}`);
});

BZip2.compressMany(songs, true);
for (let i = 0; i < songs.length; i++) {
    fs.renameSync(`${songs[i]}.bz2`, `data/pack/client/songs/${basename(songs[i])}`);
}
