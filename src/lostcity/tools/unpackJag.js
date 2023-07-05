import fs from 'fs';
import path from 'path';

import Jagfile from '#jagex2/io/Jagfile.js';

let args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: node unpackJag.js <path/to/file.jag>');
    process.exit(1);
}

let jagName = path.basename(args[0]);

let jag = Jagfile.load(args[0]);
for (let i = 0; i < jag.fileCount; i++) {
    let name = jag.fileName[i];
    console.log(name);
    let entry = jag.read(name);

    entry.save(`dump/unpack/${jagName}.raw/${name}`, entry.length);
}
