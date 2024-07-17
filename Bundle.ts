import fs from 'fs';

const modules: string[] = ['buffer', 'module', 'watcher', 'worker_threads', 'dotenv/config', 'bcrypt', '#lostcity/db/query.js', '#lostcity/util/PackFile.js'];
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

    const loginThread = await Bun.build({
        entrypoints: ['src/lostcity/server/LoginThread.ts'],
        external: modules,
        define: defines,
        // sourcemap: 'inline',
        // minify: true,
    });
    console.log(loginThread);

    const worker = await Bun.build({
        entrypoints: ['./src/lostcity/worker.ts'],
        external: modules,
        define: defines,
        // sourcemap: 'inline',
        // minify: true,
    });
    console.log(worker);

    if (loginThread.success && worker.success) {
        removeImports(await loginThread.outputs[0].text(), '../Client2/src/public/LoginThread.js');
        removeImports(await worker.outputs[0].text(), '../Client2/src/public/worker.js');
    }
} catch (e) {
    console.error(e);
}

function preloadDirs() {
    const allMaps: string[] = fs.readdirSync('data/pack/client/maps');
    const allSongs: string[] = fs.readdirSync('data/pack/client/songs');
    const allJingles: string[] = fs.readdirSync('data/pack/client/jingles');
    const serverMaps: string[] = fs.readdirSync('data/pack/server/maps').filter(x => x[0] === 'm');
    fs.writeFileSync('src/lostcity/server/PreloadedDirs.ts', `export const maps: string[] = \n${JSON.stringify(allMaps)};\n\n`);
    fs.appendFileSync('src/lostcity/server/PreloadedDirs.ts', `export const songs: string[] = \n${JSON.stringify(allSongs)};\n\n`);
    fs.appendFileSync('src/lostcity/server/PreloadedDirs.ts', `export const jingles: string[] = \n${JSON.stringify(allJingles)};\n\n`);
    fs.appendFileSync('src/lostcity/server/PreloadedDirs.ts', `export const serverMaps: string[] = \n${JSON.stringify(serverMaps)};\n\n`);
}

function removeImports(bundle: string, path: string) {
    try {
        bundle = bundle.split('\n')
            .filter(line => !line.startsWith('import'))
            .filter(line => !line.startsWith('init_crypto'))
            .join('\n');

        fs.writeFileSync(path, bundle);
    } catch (e) {
        console.error(e);
    }
}
