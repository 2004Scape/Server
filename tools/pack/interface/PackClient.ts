import Jagfile from '#/io/Jagfile.js';
import { shouldBuild } from '#/util/PackFile.js';
import { packInterface } from '#tools/pack/interface/PackShared.js';

export function packClientInterface() {
    if (!shouldBuild('data/src/scripts', '.if', 'data/pack/client/interface')) {
        return;
    }

    const jag = new Jagfile();
    const data = packInterface(false);

    /**
     * TODO: Enable this once we are feature complete.
     * Some interfaces are edited so the CRC check will fail (i.e. unfinished quests in the quest tab).
     */
    // if (!Packet.checkcrc(data, -2146838800)) {
    //     console.error('.if CRC check failed! Custom data detected.');
    //     process.exit(1);
    // }

    // data.save('dump/interface/data');
    jag.write('data', data);
    jag.save('data/pack/client/interface');
    data.release();
}
