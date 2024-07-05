import fs from 'fs';
import fsp from 'fs/promises';
import http from 'http';
import { extname } from 'path';
import ejs from 'ejs';

import { CrcBuffer } from '#lostcity/server/CrcTable.js';

import Environment from '#lostcity/util/Environment.js';
import { tryParseInt } from '#lostcity/util/TryParse.js';

const MIME_TYPES = new Map<string, string>();
MIME_TYPES.set('.js', 'application/javascript');
MIME_TYPES.set('.mjs', 'application/javascript');
MIME_TYPES.set('.css', 'text/css');
MIME_TYPES.set('.html', 'text/html');
MIME_TYPES.set('.wasm', 'application/wasm');
MIME_TYPES.set('.sf2', 'application/octet-stream');

// we don't need/want a full blown website or API on the game server
const web = http.createServer(async (req, res) => {
    try {
        if (!Environment.SKIP_CORS) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }

        if (req.method !== 'GET') {
            res.writeHead(405);
            res.end();
            return;
        }

        const url = new URL(req.url ?? '', `http://${req.headers.host}`);

        if (url.pathname.startsWith('/crc')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(CrcBuffer.data);
        } else if (url.pathname.startsWith('/title')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/title'));
        } else if (url.pathname.startsWith('/config')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/config'));
        } else if (url.pathname.startsWith('/interface')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/interface'));
        } else if (url.pathname.startsWith('/media')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/media'));
        } else if (url.pathname.startsWith('/models')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/models'));
        } else if (url.pathname.startsWith('/textures')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/textures'));
        } else if (url.pathname.startsWith('/wordenc')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/wordenc'));
        } else if (url.pathname.startsWith('/sounds')) {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/sounds'));
        } else if (url.pathname === '/') {
            if (Environment.LOCAL_DEV) {
                res.writeHead(302, { Location: '/rs2.cgi?lowmem=0&plugin=0' });
                res.end();
            } else {
                res.writeHead(404);
                res.end();
            }
        } else if (url.pathname === '/rs2.cgi') {
            // embedded from website.com/client.cgi
            const plugin = tryParseInt(url.searchParams.get('plugin'), 0);
            const lowmem = tryParseInt(url.searchParams.get('lowmem'), 0);

            if (plugin === 1) {
                // plugin 1 - transpiled webclient
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(await ejs.renderFile('view/teavmclient.ejs', {
                    plugin,
                    nodeid: Environment.WORLD_ID + 9,
                    portoff: Environment.GAME_PORT - 43594,
                    lowmem: lowmem ? 'lowmem' : 'highmem',
                    members: Environment.MEMBERS_WORLD ? 'members' : 'free'
                }));
            } else if (plugin === 2) {
                // plugin 2 - java applet
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(await ejs.renderFile('view/javaclient.ejs', {
                    plugin,
                    nodeid: Environment.WORLD_ID + 9,
                    portoff: Environment.GAME_PORT - 43594,
                    lowmem,
                    members: Environment.MEMBERS_WORLD
                }));
            } else if (plugin === 3) {
                // plugin 3 - unsigned java applet
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(await ejs.renderFile('view/javaclientunsigned.ejs', {
                    plugin,
                    nodeid: Environment.WORLD_ID + 9,
                    portoff: Environment.GAME_PORT - 43594,
                    lowmem,
                    members: Environment.MEMBERS_WORLD
                }));
            } else {
                // plugin 0 / default - typescript webclient
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(await ejs.renderFile('view/tsclient.ejs', {
                    plugin,
                    nodeid: Environment.WORLD_ID + 9,
                    portoff: Environment.GAME_PORT - 43594,
                    lowmem,
                    members: Environment.MEMBERS_WORLD
                }));
            }
        } else if (fs.existsSync('public' + url.pathname)) {
            res.setHeader('Content-Type', MIME_TYPES.get(extname(url.pathname ?? '')) ?? 'text/plain');
            res.writeHead(200);
            res.end(await fsp.readFile('public' + url.pathname));
        } else if (url.pathname.endsWith('.mid')) {
            // todo: packing process should spit out files with crc included in the name
            //   but the server needs to be aware of the crc so it can send the proper length
            //   so that's been pushed off til later...

            // strip _crc from filename, but keep extension
            const filename = url.pathname.substring(1, url.pathname.lastIndexOf('_')) + '.mid';
            res.setHeader('Content-Type', 'application/octet-stream');
            res.writeHead(200);
            res.end(await fsp.readFile('data/pack/client/songs/' + filename));
        } else {
            res.writeHead(404);
            res.end();
        }
    } catch (err) {
        res.writeHead(500);
        res.end();
    }
});

export function startWeb() {
    web.listen(Environment.WEB_PORT, '0.0.0.0');
}
