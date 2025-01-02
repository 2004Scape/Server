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

    public async playerLogin(username: string, password: string, uid: number) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return { reply: -1, save: null, muted_until: null };
        }

        const reply = await this.wsr.fetchSync({
            type: 'player_login',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username,
            password,
            uid
        });

        if (reply.error) {
            return { reply: -1, save: null, muted_until: null };
        }

        const { response, staffmodlevel, save, muted_until } = reply.result;

        if (response !== 0) {
            return { reply: response, save: null, muted_until: null };
        }

        return { reply: response, staffmodlevel, save: Buffer.from(save, 'base64'), muted_until };
    }

    // returns true if the login server acknowledged the logout
    public async playerLogout(username: string, save: Uint8Array) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return false;
        }

        const reply = await this.wsr.fetchSync({
            type: 'player_logout',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            username,
            save: Buffer.from(save).toString('base64')
        });

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

    public async playerBan(staff: string, username: string, until: Date) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'player_ban',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            staff,
            username,
            until
        }));
    }

    public async playerMute(staff: string, username: string, until: Date) {
        await this.connect();

        if (!this.ws || !this.wsr || !this.wsr.checkIfWsLive()) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'player_mute',
            nodeId: this.nodeId,
            nodeTime: Date.now(),
            staff,
            username,
            until
        }));
    }
}
