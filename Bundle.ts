import fs from 'fs';

const modules: string[] = ['module', 'watcher', 'worker_threads', 'dotenv/config', 'bcrypt', '#lostcity/db/query.js', '#lostcity/util/PackFile.js'];

try {
    const loginThread = await Bun.build({
        entrypoints: ['src/lostcity/server/LoginThread.ts'],
        external: modules,
        // sourcemap: 'inline',
        // minify: true,
    });
    console.log(loginThread);

    const worker = await Bun.build({
        entrypoints: ['./src/lostcity/worker.ts'],
        external: modules,
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
