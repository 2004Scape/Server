import path from 'path';

import Jagfile from '#/io/Jagfile.js';

const args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: node jagUnpack.js <path/to/file.jag>');
    process.exit(1);
}

const jagName = path.basename(args[0]);

const jag = Jagfile.load(args[0]);
for (let i = 0; i < jag.fileCount; i++) {
    const name = jag.fileName[i];

    try {
        const entry = jag.read(name);
        if (!entry) {
            continue;
        }

        console.log(name);
        entry.save(`dump/unpack/${jagName}.raw/${name}`, entry.data.length);
    } catch (err) {
        console.error(err, name);
    }
}
