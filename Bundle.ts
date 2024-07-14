import fs from 'fs';

const modules: string[] = ['buffer', 'module', 'watcher', 'worker_threads', 'dotenv/config', 'bcrypt', '#lostcity/db/query.js', '#lostcity/util/PackFile.js'];
const defines = {
    'process.platform': JSON.stringify('webworker'),
    'process.env.WEB_PORT': '',
    'process.env.WEB_CORS': '',
    'process.env.NODE_ID': '',
    'process.env.NODE_PORT': '',
    'process.env.NODE_MEMBERS': '',
    'process.env.NODE_XPRATE': '',
    'process.env.NODE_PRODUCTION': '',
    'process.env.NODE_KILLTIMER': '',
    'process.env.NODE_ALLOW_CHEATS': '',
    'process.env.NODE_DEBUG': '',
    'process.env.NODE_DEBUG_PROFILE': '',
    'process.env.NODE_STAFF': '',
    'process.env.NODE_CLIENT_ROUTEFINDER': '',
    'process.env.NODE_SOCKET_TIMEOUT': '',
    'process.env.LOGIN_HOST': '',
    'process.env.LOGIN_PORT': '',
    'process.env.LOGIN_KEY': '',
    'process.env.DB_HOST': '',
    'process.env.DB_USER': '',
    'process.env.DB_PASS': '',
    'process.env.DB_NAME': '',
    'process.env.BUILD_JAVA_PATH': '',
    'process.env.BUILD_STARTUP': '',
    'process.env.BUILD_STARTUP_UPDATE': '',
    'process.env.BUILD_VERIFY': '',
    'process.env.BUILD_VERIFY_FOLDER': '',
    'process.env.BUILD_VERIFY_PACK': '',
    'process.env.BUILD_SRC_DIR': '',
};

try {
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

function removeImports(bundle: string, path: string) {
    try {
        bundle = bundle.split('\n')
            .filter(line => !line.startsWith('import'))
            .join('\n');

        fs.writeFileSync(path, bundle);
    } catch (e) {
        console.error(e);
    }
}
