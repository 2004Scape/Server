import fs from 'fs';

import BZip2 from '#jagex2/io/BZip2.js';
import Packet from '#jagex2/io/Packet.js';

let args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: node decompressFolder.js <path/to/folder>');
    process.exit(1);
}

let path = args[0];
let files = fs.readdirSync(path);

for (let i = 0; i < files.length; i++) {
    try {
        let file = Packet.load(`${path}/${files[i]}`);
        let raw = BZip2.decompress(new Uint8Array(file.data).subarray(4));
        fs.writeFileSync(`${path}/${files[i]}`, raw);
    } catch (err) {
        console.log('Failed to decompress', files[i]);
    }
}
