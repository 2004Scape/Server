import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: node jagList.js <path/to/file1.jag> <path/to/file2.jag>');
    process.exit(1);
}

const jag1 = Jagfile.load(args[0]);
const jag2 = Jagfile.load(args[1]);

for (let i = 0; i < jag1.fileCount; i++) {
    const file1 = jag1.get(i)!;
    const file2 = jag2.get(i)!;

    const crc1 = Packet.crc32(file1);
    const crc2 = Packet.crc32(file2);

    if (crc1 !== crc2) {
        console.log(`File ${jag1.fileName[i]} is different`);

        console.log(file1, file2);
    }
}
