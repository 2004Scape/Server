import Jagfile from '#/io/Jagfile.js';
import Packet from '#/io/Packet.js';
import { printError } from '#/util/Logger.js';

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: ts-loader jagCompare.ts <path/to/file1.jag> <path/to/file2.jag>');
    process.exit(1);
}

const jag1 = Jagfile.load(args[0]);
const jag2 = Jagfile.load(args[1]);

for (let i = 0; i < jag1.fileCount; i++) {
    try {
        const file1 = jag1.get(i)!;
        const file2 = jag2.get(i)!;

        const crc1 = Packet.getcrc(file1.data, 0, file1.length);
        const crc2 = Packet.getcrc(file2.data, 0, file2.length);

        if (crc1 !== crc2) {
            printError(`${jag1.fileName[i]} is different`);

            console.log(Buffer.from(file1.data).subarray(0, 25), file1.length, crc1);
            console.log(Buffer.from(file2.data).subarray(0, 25), file2.length, crc2);

            file1.save(`dump/1.${jag1.fileName[i]}`, file1.length);
            file2.save(`dump/2.${jag2.fileName[i]}`, file2.length);
        }
    } catch (err) {
        if (err instanceof Error) {
            printError(jag1.fileName[i] + ' ' + err.message);
        }
    }
}
