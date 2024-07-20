import fs from 'fs';
import {basename} from 'path';
import * as esbuild from 'esbuild';

const entryPoints = ['src/lostcity/worker.ts', 'src/lostcity/server/LoginThread.ts'];
const esbuildModules = ['node:fs/promises', 'path', 'net', 'crypto', 'fs'];
const modules = ['buffer', 'module', 'watcher', 'worker_threads', 'dotenv/config', 'bcrypt', '#lostcity/db/query.js', '#lostcity/util/PackFile.js'];
const defines = {
    'process.platform': JSON.stringify('webworker'),
    'process.env.WEB_PORT': 'undefined',
    'process.env.WEB_CORS': 'undefined',
    'process.env.NODE_ID': 'undefined',
    'process.env.NODE_PORT': 'undefined',
    'process.env.NODE_MEMBERS': 'undefined',
    'process.env.NODE_XPRATE': 'undefined',
    'process.env.NODE_PRODUCTION': 'undefined',
    'process.env.NODE_KILLTIMER': 'undefined',
    'process.env.NODE_ALLOW_CHEATS': 'undefined',
    'process.env.NODE_DEBUG': 'undefined',
    'process.env.NODE_DEBUG_PROFILE': 'undefined',
    'process.env.NODE_STAFF': 'undefined',
    'process.env.NODE_CLIENT_ROUTEFINDER': 'undefined',
    'process.env.NODE_SOCKET_TIMEOUT': 'undefined',
    'process.env.LOGIN_HOST': 'undefined',
    'process.env.LOGIN_PORT': 'undefined',
    'process.env.LOGIN_KEY': 'undefined',
    'process.env.DB_HOST': 'undefined',
    'process.env.DB_USER': 'undefined',
    'process.env.DB_PASS': 'undefined',
    'process.env.DB_NAME': 'undefined',
    'process.env.BUILD_JAVA_PATH': 'undefined',
    'process.env.BUILD_STARTUP': 'undefined',
    'process.env.BUILD_STARTUP_UPDATE': 'undefined',
    'process.env.BUILD_VERIFY': 'undefined',
    'process.env.BUILD_VERIFY_FOLDER': 'undefined',
    'process.env.BUILD_VERIFY_PACK': 'undefined',
    'process.env.BUILD_SRC_DIR': 'undefined',
};

try {
    preloadDirs();
    process.argv0 === 'bun' ? await bun() : await esb();
} catch (e) {
    console.error(e);
}

async function esb() {
    const bundle = await esbuild.build({
        bundle: true,
        format: 'esm',
        write: false,
        outdir: 'placeholder', // unused but required by esbuild
        entryPoints: entryPoints,
        external: modules.concat(esbuildModules),
        define: defines,
        // minify: true,
        // sourcemap: 'linked',
    }).catch((e) => { throw new Error(e); });

    for (let index = 0; index < bundle.outputFiles.length; index++) {
        removeImports(bundle.outputFiles[index].text, entryPoints[index]);
    }
}

async function bun() {
    // eslint-disable-next-line no-undef
    const bundle = await Bun.build({
        entrypoints: entryPoints,
        external: modules,
        define: defines,
        // minify: true,
        // sourcemap: 'linked',
    }).catch((e) => { throw new Error(e); });

    for (let index = 0; index < bundle.outputs.length; index++) {
        removeImports(await bundle.outputs[index].text(), entryPoints[index]);
    }
}

function preloadDirs() {
    const path = 'src/lostcity/server/PreloadedDirs.ts';

    // readdirSync is not really sync in bun
    const allMaps = fs.readdirSync('data/pack/client/maps');
    const allSongs = fs.readdirSync('data/pack/client/songs');
    const allJingles = fs.readdirSync('data/pack/client/jingles');
    const serverMaps = fs.readdirSync('data/pack/server/maps').filter(x => x[0] === 'm');

    fs.writeFileSync(path, `export const maps: string[] = \n${JSON.stringify(allMaps)};\n\n`);
    fs.appendFileSync(path, `export const songs: string[] = \n${JSON.stringify(allSongs)};\n\n`);
    fs.appendFileSync(path, `export const jingles: string[] = \n${JSON.stringify(allJingles)};\n\n`);
    fs.appendFileSync(path, `export const serverMaps: string[] = \n${JSON.stringify(serverMaps)};\n\n`);
}

function removeImports(output, file) {
    // turn into plugin for minify/sourcemaps
    const path = '../Client2/src/public/' + basename(file).replace('.ts', '.js');

    output = output.split('\n')
        .filter(line => !line.startsWith('import'))
        .filter(line => !line.startsWith('init_crypto')) // only needed for bun, crypto is an import in esbuild
        .join('\n');

    fs.writeFileSync(path, output);

    console.log(`${path} size: ${(fs.statSync(path).size / (1024 * 1024)).toFixed(2)} MB`);
}
