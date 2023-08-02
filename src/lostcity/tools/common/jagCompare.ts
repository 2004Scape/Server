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
    try {
        const file1 = jag1.get(i)!;
        const file2 = jag2.get(i)!;

        const crc1 = Packet.crc32(file1);
        const crc2 = Packet.crc32(file2);

        if (crc1 !== crc2) {
            console.log(`File ${jag1.fileName[i]} is different`);

            console.log(Buffer.from(file1.data).subarray(0, 25), file1.length);
            console.log(Buffer.from(file2.data).subarray(0, 25), file2.length);

            console.log();

            file1.save(`dump/1.${jag1.fileName[i]}`, file1.length);
            file2.save(`dump/2.${jag2.fileName[i]}`, file2.length);
        }
    } catch (err) {
        console.log(`File ${jag1.fileName[i]} is missing`);
    }
}
