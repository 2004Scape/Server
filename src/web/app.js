import Fastify from 'fastify';
import path from 'path';
import fs from 'fs';

let config = {};

if (process.env.VERBOSE) {
    config.logger = true;
}

if (process.env.HTTPS_CERT) {
    config.https = {
        key: fs.readFileSync(process.env.HTTPS_KEY),
        cert: fs.readFileSync(process.env.HTTPS_CERT)
    };
}

export const fastify = Fastify(config);

import Autoload from '@fastify/autoload';
import Caching from '@fastify/caching';
import Cookie from '@fastify/cookie';
import FormBody from '@fastify/formbody';
import Multipart from '@fastify/multipart';
import Session from '@fastify/session';
import Static from '@fastify/static';
import View from '@fastify/view';
import ejs from 'ejs';
import Cors from '@fastify/cors';

fastify.register(FormBody);
fastify.register(Multipart);

fastify.register(Autoload, {
    dir: path.join(process.cwd(), 'routes')
});

if (process.env.WEB_DEV) {
    fastify.register(
        Caching,
        { privacy: Caching.privacy.NOCACHE },
        (err) => { if (err) throw err; }
    );
}

fastify.register(Static, {
    root: path.join(process.cwd(), 'public')
});

fastify.register(View, {
    engine: {
        ejs
    },
    root: path.join(process.cwd(), 'view'),
    viewExt: 'ejs'
});

fastify.register(Cookie);
fastify.register(Session, {
    secret: 'qxG38pWSAW5u6XS5pJS7jrSqwxbFgQdH',
    cookie: {
        secure: false
    }
});

fastify.register(Cors, {
    origin: '*',
    methods: ['GET']
});

export function startWeb() {
    fastify.listen({ port: process.env.WEB_PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log('[Web]: Listening on', address);
    });
}
