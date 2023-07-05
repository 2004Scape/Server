import path from 'path';
import Fastify from 'fastify';

import Autoload from '@fastify/autoload';
import Static from '@fastify/static';

let fastify = Fastify();

fastify.register(Autoload, {
    dir: path.join(process.cwd(), 'src', 'lostcity', 'web', 'routes')
});

fastify.register(Static, {
    root: path.join(process.cwd(), 'public')
});

export function startWeb() {
    fastify.listen({ port: process.env.WEB_PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`[Web]: Listening on port ${Number(process.env.WEB_PORT)}`);
    });
}
