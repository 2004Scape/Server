import child_process from 'child_process';
import fs from 'fs';

import bz2 from 'bz2';

import Packet from '#util/Packet.js';

export function decompressBz2(data, prepend = true) {
    if (data.data) {
        data = data.data;
    }

    if (data[0] != 0x42 || data[1] != 0x5A || data[2] != 0x68 || data[3] != 0x31) {
        if (prepend) {
            let temp = new Uint8Array(data.length + 4);
            temp.set(Uint8Array.from([0x42, 0x5A, 0x68, 0x31]));
            temp.set(data, 4);
            return bz2.decompress(temp);
        } else {
            data[0] = 0x42;
            data[1] = 0x5A;
            data[2] = 0x68;
            data[3] = 0x31;
        }
    }

    return bz2.decompress(data);
}

fs.mkdirSync('dump', { recursive: true });
export function compressBz2(data, prependLength = true) {
    let time = Date.now();
    let path = `dump/${time}.tmp`;

    fs.writeFileSync(path, data);
    child_process.execSync(`java -jar JagCompress.jar bz2 ${path}`);
    fs.unlinkSync(path);

    let compressed = Packet.fromFile(path + '.bz2');
    fs.unlinkSync(path + '.bz2');
    if (prependLength) {
        compressed.p4(data.length);
    } else {
        compressed = new Packet(compressed.gdata(4)); // remove BZip header
    }

    return compressed.data;
}
