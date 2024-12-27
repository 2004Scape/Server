import InternalClient from '#/server/InternalClient.js';

import Environment from '#/util/Environment.js';

export default class LoginClient extends InternalClient {
    private nodeId = 0;

    constructor(nodeId: number) {
        super(Environment.LOGIN_HOST, Environment.LOGIN_PORT);

        this.nodeId = nodeId;
    }

    public async worldStartup() {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'world_startup',
            nodeId: this.nodeId,
            nodeTime: Date.now()
        }));
    }

    public async playerLogin(username: string, password: string, uid: number): Promise<{ reply: number, save: Uint8Array | null }> {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return { reply: -1, save: null };
        }

        const reply = await this.wsr.fetchSync(JSON.stringify({
            type: 'player_login',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username,
            password,
            uid
        }));

        if (reply.error) {
            return { reply: -1, save: null };
        }

        const { response, save } = reply.result;

        if (response !== 0) {
            return { reply: response, save: null };
        }

        return { reply: response, save: Buffer.from(save, 'base64') };
    }

    // returns true if the login server acknowledged the logout
    public async playerLogout(username: string, save: Uint8Array) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return false;
        }

        const reply = await this.wsr.fetchSync(JSON.stringify({
            type: 'player_logout',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username,
            save: Buffer.from(save).toString('base64')
        }));

        if (reply.error) {
            return false;
        }

        return reply.result.response === 0;
    }

    // we don't care about acknowledgement, send the save and continue on
    public async playerAutosave(username: string, save: Uint8Array) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'player_autosave',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username,
            save: Buffer.from(save).toString('base64')
        }));
    }

    // in case the player is stuck logged-in
    public async playerForceLogout(username: string) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'player_force_logout',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username
        }));
    }
}
