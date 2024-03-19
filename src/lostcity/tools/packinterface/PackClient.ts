import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';
import Environment from '#lostcity/util/Environment.js';
import { shouldBuild } from '#lostcity/util/PackFile.js';
import { packInterface } from './PackShared.js';

export function packClientInterface() {
    if (!shouldBuild('data/src/scripts', '.if', 'data/pack/client/interface')) {
        return;
    }

    console.log('Packing interfaces');

    const jag = new Jagfile();
    const data = packInterface(false);

    // if (!Environment.CI_MODE && !Packet.checkcrc(data, -2146838800)) {
    //     console.error('.if CRC check failed! Custom data detected.');
    //     process.exit(1);
    // }

    // data.save('dump/interface/data');
    jag.write('data', data);
    jag.save('data/pack/client/interface');
}
