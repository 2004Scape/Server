import { WebSocket } from 'ws';
import WsSyncReq from '#3rdparty/ws-sync/ws-sync.js';

import Packet from '#jagex2/io/Packet.js';

import Environment from '#lostcity/util/Environment.js';

type LoginClientSocket = {
    ws: WebSocket
    wsr: WsSyncReq
};

export default class LoginClient {
    async connect() {
        return new Promise<LoginClientSocket>((res, rej) => {
            const ws = new WebSocket(`ws://${Environment.LOGIN_HOST}:${Environment.LOGIN_PORT}`);

            ws.on('error', (err) => {
                rej(err);
            });

            ws.once('open', () => {
                const wsr = new WsSyncReq(ws);
                res({ ws, wsr });
            });
        });
    }

    async load(username37: bigint, password: string, uid: number): Promise<{ reply: number; data: Packet | null }> {
        const { ws, wsr } = await this.connect();

        if (!ws || !wsr) {
            return { reply: -1, data: null };
        }

        const message = await wsr.fetchSync({
            type: 1,
            world: Environment.NODE_ID,
            username37: username37.toString(),
            password,
            uid
        });

        ws.close();

        if (message.error) {
            console.error(message.error);
            return { reply: -1, data: null };
        }

        const { response } = message.result;

        if (response !== 1) {
            return { reply: response, data: null };
        }

        const { save } = message.result;

        return {
            reply: response,
            data: new Packet(Buffer.from(save, 'base64'))
        };
    }

    async save(username37: bigint, save: Uint8Array) {
        const { ws, wsr } = await this.connect();

        if (!ws || !wsr) {
            return -1;
        }

        const message = await wsr.fetchSync({
            type: 2,
            world: Environment.NODE_ID,
            username37: username37.toString(),
            save: Buffer.from(save).toString('base64')
        });

        ws.close();

        if (message.error) {
            console.error(message.error);
            return -1;
        }

        return 0;
    }

    async reset() {
        const { ws, wsr } = await this.connect();

        if (!ws || !wsr) {
            return -1;
        }

        ws.send(JSON.stringify({
            type: 3,
            world: Environment.NODE_ID
        }));

        ws.close();
    }

    async count(world: number) {
        const { ws, wsr } = await this.connect();

        if (!ws || !wsr) {
            return -1;
        }

        const message = await wsr.fetchSync({
            type: 4,
            world
        });

        ws.close();

        if (message.error) {
            console.error(message.error);
            return { reply: -1, data: null };
        }

        const { count } = message.result;

        return count;
    }

    async heartbeat(players: bigint[]) {
        const { ws, wsr } = await this.connect();

        if (!ws || !wsr) {
            return;
        }

        ws.send(JSON.stringify({
            type: 4,
            world: Environment.NODE_ID,
            players: players.map(u => u.toString())
        }));

        ws.close();
    }
}
