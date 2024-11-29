import { WebSocket } from 'ws';
import WsSyncReq from '#3rdparty/ws-sync/ws-sync.js';

import Packet from '#jagex/io/Packet.js';

import Environment from '#lostcity/util/Environment.js';

export default class LoginClient {
    private ws: WebSocket | null = null;
    private wsr: WsSyncReq | null = null;

    async connect() {
        if (this.wsr && this.wsr.checkIfWsLive()) {
            return;
        }

        return new Promise<void>((res, rej) => {
            this.ws = new WebSocket(`ws://${Environment.LOGIN_HOST}:${Environment.LOGIN_PORT}`);

            const timeout = setTimeout(() => {
                this.ws = null;
                this.wsr = null;
                res();
            }, 10000);

            this.ws.once('close', () => {
                clearTimeout(timeout);

                this.ws = null;
                this.wsr = null;
                res();
            });

            this.ws.once('error', (err) => {
                clearTimeout(timeout);

                this.ws = null;
                this.wsr = null;
                res();
            });

            this.ws.once('open', () => {
                clearTimeout(timeout);

                this.wsr = new WsSyncReq(this.ws);
                res();
            });
        });
    }

    async load(username37: bigint, password: string, uid: number): Promise<{ reply: number; data: Packet | null }> {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return { reply: -1, data: null };
        }

        const message = await this.wsr.fetchSync({
            type: 1,
            world: Environment.NODE_ID,
            username37: username37.toString(),
            password,
            uid
        });

        if (message.error) {
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
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        await this.wsr.fetchSync({
            type: 2,
            world: Environment.NODE_ID,
            username37: username37.toString(),
            save: Buffer.from(save).toString('base64')
        });
    }

    async reset() {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return -1;
        }

        this.ws.send(JSON.stringify({
            type: 3,
            world: Environment.NODE_ID
        }));
    }

    async count(world: number) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return -1;
        }

        const message = await this.wsr.fetchSync({
            type: 4,
            world
        });

        if (message.error) {
            return { reply: -1, data: null };
        }

        const { count } = message.result;

        return count;
    }

    async heartbeat(players: bigint[]) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 5,
            world: Environment.NODE_ID,
            players: players.map(u => u.toString())
        }));
    }

    async autosave(username37: bigint, save: Uint8Array) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 6,
            world: Environment.NODE_ID,
            username37: username37.toString(),
            save: Buffer.from(save).toString('base64')
        }));
    }
}
