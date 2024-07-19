import fs from 'fs';
import child_process from 'child_process';

import { packServerInterface } from '#lostcity/cache/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/cache/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/cache/symbols.js';
import { packConfigs } from '#lostcity/cache/packconfig/PackShared.js';
import { packWorldmap } from '#lostcity/cache/packmap/Worldmap.js';
import Environment from '#lostcity/util/Environment.js';
import { revalidatePack } from '#lostcity/util/PackFile.js';

import { packClientInterface } from '#lostcity/cache/packinterface/PackClient.js';
import { packClientMap } from '#lostcity/cache/packmap/PackClient.js';
import { packClientModel } from '#lostcity/cache/packgraphics/pack.js';
import { packClientMusic } from '#lostcity/cache/packmidi/pack.js';
import { packClientSound } from '#lostcity/cache/packsound/pack.js';
import { packClientWordenc } from '#lostcity/cache/packchat/pack.js';
import { packClientTitle } from '#lostcity/cache/packsprite/title/pack.js';
import { packClientTexture } from '#lostcity/cache/packsprite/textures/pack.js';
import { packClientMedia } from '#lostcity/cache/packsprite/media/pack.js';
import { CrcBuffer } from '#lostcity/server/CrcTable.js';

export async function packServer() {
    if (!fs.existsSync('RuneScriptCompiler.jar')) {
        console.log('The RuneScript compiler is missing and the build process cannot continue.');
        process.exit(1);
    }

    console.time('Packing server cache (1/2)');
    try {
        revalidatePack();
        packConfigs();
        packServerInterface();

        packServerMap();
        await packWorldmap();

        generateServerSymbols();
    } catch (err) {
        console.error(err);
    }

    try {
        child_process.execSync(`"${Environment.BUILD_JAVA_PATH}" -jar RuneScriptCompiler.jar`, { stdio: 'inherit' });
    } catch (err) {
        process.exit(1);
    }
    console.timeEnd('Packing server cache (1/2)');

    fs.writeFileSync('data/pack/server/lastbuild.pack', '');
}

export async function packClient() {
    console.time('Packing client cache (2/2)');
    await packClientTitle();
    packConfigs();
    packClientInterface();
    await packClientMedia();
    packClientModel();
    await packClientTexture();
    packClientWordenc();
    packClientSound();
    
    packClientMap();
    packClientMusic();
    console.timeEnd('Packing client cache (2/2)');

    fs.writeFileSync('data/pack/client/crc', CrcBuffer.data);
    fs.writeFileSync('data/pack/client/lastbuild.pack', '');
}
