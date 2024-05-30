import { shouldBuild } from '#lostcity/util/PackFile.js';
import { packInterface } from './PackShared.js';

export function packServerInterface() {
    if (shouldBuild('data/src/scripts', '.if', 'data/pack/server/interface.dat') || shouldBuild('src/lostcity/tools/packinterface', '.ts', 'data/pack/server/interface.dat')) {
        //console.log('Packing interfaces');

        const data = packInterface(true);
        data.save('data/pack/server/interface.dat');
        data.release();
    }
}
