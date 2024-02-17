import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

import { shouldBuild } from '#lostcity/util/PackFile.js';

import { readConfigs } from '#lostcity/tools/packconfig/PackShared.js';
import { packFloClient, parseFloConfig } from '#lostcity/tools/packconfig/FloConfig.js';
import { packIdkClient, parseIdkConfig } from '#lostcity/tools/packconfig/IdkConfig.js';
import { packLocClient, parseLocConfig } from '#lostcity/tools/packconfig/LocConfig.js';
import { packNpcClient, parseNpcConfig } from '#lostcity/tools/packconfig/NpcConfig.js';
import { packObjClient, parseObjConfig } from '#lostcity/tools/packconfig/ObjConfig.js';
import { packSeqClient, parseSeqConfig } from '#lostcity/tools/packconfig/SeqConfig.js';
import { packSpotAnimClient, parseSpotAnimConfig } from '#lostcity/tools/packconfig/SpotAnimConfig.js';
import { packVarpClient, parseVarpConfig } from '#lostcity/tools/packconfig/VarpConfig.js';
import Environment from '#lostcity/util/Environment.js';

export function packClientConfig() {
    const jag = new Jagfile();

    /* order:
    'seq.dat',      'seq.idx',
    'loc.dat',      'loc.idx',
    'flo.dat',      'flo.idx',
    'spotanim.dat', 'spotanim.idx',
    'obj.dat',      'obj.idx',
    'npc.dat',      'npc.idx',
    'idk.dat',      'idk.idx',
    'varp.dat',     'varp.idx'
    */

    if (
        shouldBuild('data/src/scripts', '.seq', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.loc', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.flo', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.spotanim', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.npc', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.obj', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.idk', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.varp', 'data/pack/client/config') ||
        shouldBuild('src/lostcity/tools/packconfig', '.ts', 'data/pack/client/config')
    ) {
        console.log('Packing .seq');
        readConfigs('.seq', [], parseSeqConfig, packSeqClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, 1638136604) || !Packet.checkcrc(idx, 969051566))) {
                console.error('.seq CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/seq.dat');
            // idx.save('dump/seq.idx');
            jag.write('seq.dat', dat);
            jag.write('seq.idx', idx);
        });

        console.log('Packing .loc');
        readConfigs('.loc', [], parseLocConfig, packLocClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, 891497087) || !Packet.checkcrc(idx, -941401128))) {
                console.error('.loc CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/loc.dat');
            // idx.save('dump/loc.idx');
            jag.write('loc.dat', dat);
            jag.write('loc.idx', idx);
        });

        console.log('Packing .flo');
        readConfigs('.flo', [], parseFloConfig, packFloClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, 1976597026) || !Packet.checkcrc(idx, 561308705))) {
                console.error('.flo CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/flo.dat');
            // idx.save('dump/flo.idx');
            jag.write('flo.dat', dat);
            jag.write('flo.idx', idx);
        });

        console.log('Packing .spotanim');
        readConfigs('.spotanim', [], parseSpotAnimConfig, packSpotAnimClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, -1279835623) || !Packet.checkcrc(idx, -1696140322))) {
                console.error('.spotanim CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/spotanim.dat');
            // idx.save('dump/spotanim.idx');
            jag.write('spotanim.dat', dat);
            jag.write('spotanim.idx', idx);
        });

        console.log('Packing .obj');
        readConfigs('.obj', [], parseObjConfig, packObjClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, -840233510) || !Packet.checkcrc(idx, 669212954))) {
                console.error('.obj CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/obj.dat');
            // idx.save('dump/obj.idx');
            jag.write('obj.dat', dat);
            jag.write('obj.idx', idx);
        });

        console.log('Packing .npc');
        readConfigs('.npc', [], parseNpcConfig, packNpcClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, -2140681882) || !Packet.checkcrc(idx, -1986014643))) {
                console.error('.npc CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/npc.dat');
            // idx.save('dump/npc.idx');
            jag.write('npc.dat', dat);
            jag.write('npc.idx', idx);
        });

        console.log('Packing .idk');
        readConfigs('.idk', [], parseIdkConfig, packIdkClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, -359342366) || !Packet.checkcrc(idx, 667216411))) {
                console.error('.idk CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/idk.dat');
            // idx.save('dump/idk.idx');
            jag.write('idk.dat', dat);
            jag.write('idk.idx', idx);
        });

        console.log('Packing .varp');
        readConfigs('.varp', [], parseVarpConfig, packVarpClient, (dat: Packet, idx: Packet) => {
            if (Environment.CI_MODE && (!Packet.checkcrc(dat, 705633567) || !Packet.checkcrc(idx, -1843167599))) {
                console.error('.varp CRC check failed! Custom data detected.');
                process.exit(1);
            }

            // dat.save('dump/varp.dat');
            // idx.save('dump/varp.idx');
            jag.write('varp.dat', dat);
            jag.write('varp.idx', idx);
        });

        console.log('Writing config.jag');
        // we would check the CRC of the config.jag file too, but bz2 can differ on Windows...
        jag.save('data/pack/client/config');
    }
}
