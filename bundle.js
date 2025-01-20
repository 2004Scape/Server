import fs from 'fs';
import {basename, dirname, join} from 'path';
import * as esbuild from 'esbuild';

const outDir = '../Client2/public/';
const entrypoints = ['src/appWorker.ts', 'src/server/login/LoginThread.ts'];
const esbuildExternals = ['node:fs/promises', 'path', 'net', 'crypto', 'fs'];
const externals = ['kleur', 'buffer', 'module', 'watcher', 'worker_threads', 'dotenv/config', 'bcrypt', '#/db/query.js', '#/util/PackFile.js'];
const defines = {
    'process.platform': JSON.stringify('webworker'),
    'process.env.STANDALONE_BUNDLE': 'true',
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
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    copyDeps();
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
        entryPoints: entrypoints,
        external: externals.concat(esbuildExternals),
        define: defines,
        // minify: true,
        // sourcemap: 'linked',
    }).catch((e) => { throw new Error(e); });

    for (let index = 0; index < bundle.outputFiles.length; index++) {
        removeImports(bundle.outputFiles[index].text, entrypoints[index]);
    }
}

async function bun() {
    // eslint-disable-next-line no-undef
    const bundle = await Bun.build({
        entrypoints: entrypoints,
        external: externals,
        define: defines,
        // minify: true,
        // sourcemap: 'linked',
    }).catch((e) => { throw new Error(e); });

    for (let index = 0; index < bundle.outputs.length; index++) {
        removeImports(await bundle.outputs[index].text(), entrypoints[index]);
    }
}

function removeImports(output, file) {
    // turn into plugin for minify/sourcemaps
    const path = outDir + basename(file).replace('.ts', '.js');

    output = output.split('\n')
        .filter(line => !line.startsWith('import'))
        .filter(line => !line.startsWith('init_crypto')) // only needed for bun, crypto is an import in esbuild
        .join('\n');

    fs.writeFileSync(path, output);
    logOutput(path);
}

function preloadDirs() {
    const path = 'src/server/PreloadedDirs.ts';
    console.log(`Generating ${path}...`);

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

function copyDeps() {
    const packs = 'data/pack';
    const path = outDir + packs;
    console.log(`Copying packs to ${path}...`);
    copyPacks(packs, path);

    copyPem();
    copyWasm();
}

function copyPem() {
    const path = 'data/config/private.pem';
    const dir = outDir + dirname(path);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const pem = outDir + path;
    fs.copyFileSync(path, pem);
    logOutput(pem);
}

function copyWasm() {
    const wasm = ['src/3rdparty/bzip2-wasm/bzip2-1.0.8/bzip2.wasm', 'node_modules/@2004scape/rsmod-pathfinder/dist/rsmod-pathfinder.wasm'];
    for (const file of wasm) {
        const path = outDir + basename(file);
        fs.copyFileSync(file, path);
        logOutput(path);
    }
}

function copyPacks(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }

    const entries = fs.readdirSync(from, { withFileTypes: true });

    for (const entry of entries) {
        const src = join(from, entry.name);
        const dest = join(to, entry.name);

        if (entry.isDirectory()) {
            copyPacks(src, dest);
        } else if (entry.isFile()) {
            fs.copyFileSync(src, dest);
        }
    }
}

function logOutput(path) {
    console.log(`${path} size: ${(fs.statSync(path).size / (1024 * 1024)).toFixed(2)} MB`);
}
