import { WebSocket } from 'ws';
import WsSyncReq from '#3rdparty/ws-sync/ws-sync.js';

import Environment from '#/util/Environment.js';

export default class LoginClient {
    private ws: WebSocket | null = null;
    private wsr: WsSyncReq | null = null;

    async connect(): Promise<void> {
        if (this.wsr && this.wsr.checkIfWsLive()) {
            return;
        }

        return new Promise((res) => {
            this.ws = new WebSocket(`ws://${Environment.LOGIN_HOST}:${Environment.LOGIN_PORT}`,
                {
                    timeout: 5000
                }
            );

            const timeout = setTimeout(() => {
                if (this.ws) {
                    this.ws.terminate();
                }

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

            this.ws.once('error', () => {
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

            this.ws.on('message', (buf: Buffer) => {
                const message = JSON.parse(buf.toString());

                this.messageHandlers.forEach(fn => fn(message.type, message));
            });
        });
    }

    private messageHandlers: ((opcode: number, data: unknown) => void)[] = [];

    public async onMessage(fn: (opcode: number, data: unknown) => void) {
        this.messageHandlers.push(fn);
    }

    public async worldStartup() {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return -1;
        }

        this.ws.send(JSON.stringify({
            type: 'world_startup',
            world: Environment.NODE_ID
        }));
    }

    public async playerLogin(username: string, password: string) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return -1;
        }

        this.ws.send(JSON.stringify({
            type: 'player_login',
            username,
            password
        }));
    }
}
