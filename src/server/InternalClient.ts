import { WebSocket } from 'ws';

import WsSyncReq from '#3rdparty/ws-sync/ws-sync.js';

export default class InternalClient {
    protected ws: WebSocket | null = null;
    protected wsr: WsSyncReq | null = null;

    private host: string;
    private port: number;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    async connect(): Promise<void> {
        if (this.wsr && this.wsr.checkIfWsLive()) {
            return;
        }

        return new Promise(res => {
            this.ws = new WebSocket(`ws://${this.host}:${this.port}`, {
                timeout: 5000
            });

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
                try {
                    const message = JSON.parse(buf.toString());

                    this.messageHandlers.forEach(fn => fn(message.type, message));
                } catch (err) {
                    console.error(err);
                }
            });
        });
    }

    private messageHandlers: ((opcode: number, data: unknown) => void)[] = [];

    public async onMessage(fn: (opcode: number, data: unknown) => void) {
        this.messageHandlers.push(fn);
    }
}
