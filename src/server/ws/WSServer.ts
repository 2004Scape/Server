import http, { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

import Packet from '#/io/Packet.js';

import NullClientSocket from '#/server/NullClientSocket.js';
import WSClientSocket from '#/server/ws/WSClientSocket.js';
import World from '#/engine/World.js';
import LoggerEventType from '#/server/logger/LoggerEventType.js';
import Environment from '#/util/Environment.js';
import { getPublicPerDeploymentToken } from '#/io/PemUtil.js';


function getIp(req: IncomingMessage) {
    // todo: environment flag to respect cf-connecting-ip (NOT safe if origin is exposed publicly by IP + proxied)
    let forwardedFor = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!forwardedFor) {
        return null;
    }

    if (Array.isArray(forwardedFor)) {
        forwardedFor = forwardedFor[0];
    }

    return forwardedFor.split(',')[0].trim();
}

// todo: websocket keepalives
export default class WSServer {
    wss: WebSocketServer | null = null;

    start(server: http.Server) {
        this.wss = new WebSocketServer({
            server,
            perMessageDeflate: false,
            verifyClient: (info, cb) => {
                if (Environment.WEB_SOCKET_TOKEN_PROTECTION) {
                    // if WEB_CONNECTION_TOKEN_PROTECTION is enabled, we must
                    // have a matching per-deployment token sent via cookie.
                    const headers = info.req.headers;
                    if (!headers.cookie) {
                        // no cookie
                        cb(false);
                        return;
                    }
                    // cookie string is present at least
                    // find exact match. NOTE: the double quotes are deliberate
                    const search = `per_deployment_token="${getPublicPerDeploymentToken()}"`;
                    // could do something more fancy with cookie parsing, but
                    // this seems fine.
                    if (headers.cookie.indexOf(search) === -1) {
                        cb(false);
                        return;
                    }
                }
                const { origin } = info;

                // todo: check more than just the origin header (important!)
                if (Environment.WEB_ALLOWED_ORIGIN && origin !== Environment.WEB_ALLOWED_ORIGIN) {
                    cb(false);
                    return;
                }

                cb(true);
            },
            maxPayload: 2000,
        });

        this.wss.on('connection', (ws: WebSocket, req) => {
            const client = new WSClientSocket(ws, getIp(req) ?? 'unknown');

            // todo: connection negotation feature flag for future revisions
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            client.send(seed.data);

            ws.on('message', (data: Buffer) => {
                try {
                    if (client.state === -1 || client.remaining <= 0) {
                        client.terminate();
                        return;
                    }

                    client.buffer(data);
                    World.onClientData(client);
                } catch (_) {  // eslint-disable-line @typescript-eslint/no-unused-vars
                    client.terminate();
                }
            });

            ws.on('close', () => {
                client.state = -1;

                if (client.player) {
                    client.player.addSessionLog(LoggerEventType.ENGINE, 'WS socket closed');
                    client.player.client = new NullClientSocket();
                }
            });

            ws.on('error', (err) => {
                if (client.player) {
                    client.player.addSessionLog(LoggerEventType.ENGINE, 'WS socket error', err.message);
                }

                ws.terminate();
            });
        });
    }
}
