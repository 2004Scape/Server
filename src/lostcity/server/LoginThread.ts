import fs from 'fs';
import fsp from 'fs/promises';
import forge from 'node-forge';
import { parentPort } from 'worker_threads';

import Packet from '#jagex2/io/Packet.js';

import { toBase37, toSafeName } from '#jagex2/jstring/JString.js';

import {LoginClient, LoginResponse} from '#lostcity/server/LoginServer.js';

import Environment from '#lostcity/util/Environment.js';

let priv;

if (typeof self !== 'undefined') {
    priv = forge.pki.privateKeyFromPem(await (await fetch('data/config/private.pem')).text());
} else {
    if (!parentPort) throw new Error('This file must be run as a worker thread.');
    priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem', 'ascii'));
}

if (typeof self === 'undefined' && parentPort) {
    parentPort.on('message', async msg => {
        try {
            if (!parentPort) throw new Error('This file must be run as a worker thread.');

            switch (msg.type) {
                case 'reset': {
                    if (!Environment.LOGIN_KEY) {
                        return;
                    }

                    const login = new LoginClient();
                    await login.reset();
                    break;
                }
                case 'heartbeat': {
                    if (!Environment.LOGIN_KEY) {
                        return;
                    }

                    const login = new LoginClient();
                    await login.heartbeat(msg.players);
                    break;
                }
                case 'loginreq': {
                    const { opcode, data, socket } = msg;

                    const stream = new Packet(data);

                    const revision = stream.g1();
                    if (revision !== 225) {
                        parentPort.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.SERVER_UPDATED,
                            socket
                        });
                        return;
                    }

                    const info = stream.g1();

                    const crcs = new Uint8Array(9 * 4);
                    stream.gdata(crcs, 0, crcs.length);

                    stream.rsadec(priv);

                    if (stream.g1() !== 10) {
                        parentPort.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.LOGIN_REJECTED,
                            socket
                        });
                        return;
                    }

                    const seed = [];
                    for (let i = 0; i < 4; i++) {
                        seed[i] = stream.g4();
                    }

                    const uid = stream.g4();
                    const username = stream.gjstr();
                    const password = stream.gjstr();

                    if (username.length < 1 || username.length > 12) {
                        parentPort.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.INVALID_USER_OR_PASS,
                            socket
                        });
                        return;
                    }

                    if (Environment.LOGIN_KEY) {
                        if (password.length < 5 || password.length > 20) {
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.INVALID_USER_OR_PASS,
                                socket
                            });
                            return;
                        }

                        const login = new LoginClient();
                        const request = await login.load(toBase37(toSafeName(username)), password, uid);

                        if (request.reply === 1 && request.data) {
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.SUCCESSFUL,
                                socket,
                                info,
                                seed,
                                username: toSafeName(username),
                                save: request.data.data
                            });
                        } else if ((request.reply === 2 || request.reply === 3) && opcode === 16) {
                            // new connection + already logged in
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGGED_IN,
                                socket
                            });
                            return;
                        } else if (request.reply === 3 && opcode === 18) {
                            // reconnection + already logged into another world (???)
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGGED_IN,
                                socket
                            });
                            return;
                        } else if (request.reply === 4) {
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.SUCCESSFUL,
                                socket,
                                info,
                                seed,
                                username: toSafeName(username),
                                save: new Uint8Array()
                            });
                        } else if (request.reply === 5) {
                            // invalid credentials (bad user or bad pass)
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.INVALID_USER_OR_PASS,
                                socket
                            });
                            return;
                        } else if (request.reply === -1) {
                            // login server connection error
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGIN_SERVER_OFFLINE,
                                socket
                            });
                            return;
                        } else {
                            parentPort.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGIN_REJECTED,
                                socket
                            });
                            return;
                        }
                    } else {
                        let save = new Uint8Array();
                        const safeName = toSafeName(username);
                        if (fs.existsSync(`data/players/${safeName}.sav`)) {
                            save = await fsp.readFile(`data/players/${safeName}.sav`);
                        }

                        parentPort.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.SUCCESSFUL,
                            socket,
                            info,
                            seed,
                            username: safeName,
                            save
                        });
                    }
                    break;
                }
                case 'logout': {
                    const { username, save } = msg;

                    if (Environment.LOGIN_KEY) {
                        const login = new LoginClient();
                        const reply = await login.save(toBase37(username), save);

                        if (reply === 0) {
                            parentPort.postMessage({
                                type: 'logoutreply',
                                username
                            });
                        }
                    } else {
                        parentPort.postMessage({
                            type: 'logoutreply',
                            username
                        });
                    }
                    break;
                }
                default:
                    console.error('Unknown message type: ' + msg.type);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    });
} else {
    self.onmessage = async msg => {
        try {
            switch (msg.data.type) {
                case 'reset': {
                    // if (!Environment.LOGIN_KEY) {
                    //     return;
                    // }

                    // const login = new LoginClient();
                    // await login.reset();
                    break;
                }
                case 'heartbeat': {
                    // if (!Environment.LOGIN_KEY) {
                    //     return;
                    // }

                    // const login = new LoginClient();
                    // await login.heartbeat(msg.players);
                    break;
                }
                case 'loginreq': {
                    const { opcode, data, socket } = msg.data;

                    const stream = new Packet(data);

                    const revision = stream.g1();
                    if (revision !== 225) {
                        self.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.SERVER_UPDATED,
                            socket
                        });
                        return;
                    }

                    const info = stream.g1();

                    const crcs = new Uint8Array(9 * 4);
                    stream.gdata(crcs, 0, crcs.length);

                    stream.rsadec(priv);

                    if (stream.g1() !== 10) {
                        self.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.LOGIN_REJECTED,
                            socket
                        });
                        return;
                    }

                    const seed = [];
                    for (let i = 0; i < 4; i++) {
                        seed[i] = stream.g4();
                    }

                    const uid = stream.g4();
                    const username = stream.gjstr();
                    const password = stream.gjstr();

                    if (username.length < 1 || username.length > 12) {
                        self.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.INVALID_USER_OR_PASS,
                            socket
                        });
                        return;
                    }

                    if (Environment.LOGIN_KEY) {
                        if (password.length < 5 || password.length > 20) {
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.INVALID_USER_OR_PASS,
                                socket
                            });
                            return;
                        }

                        const login = new LoginClient();
                        const request = await login.load(toBase37(toSafeName(username)), password, uid);

                        if (request.reply === 1 && request.data) {
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.SUCCESSFUL,
                                socket,
                                info,
                                seed,
                                username: toSafeName(username),
                                save: request.data.data
                            });
                        } else if ((request.reply === 2 || request.reply === 3) && opcode === 16) {
                            // new connection + already logged in
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGGED_IN,
                                socket
                            });
                            return;
                        } else if (request.reply === 3 && opcode === 18) {
                            // reconnection + already logged into another world (???)
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGGED_IN,
                                socket
                            });
                            return;
                        } else if (request.reply === 4) {
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.SUCCESSFUL,
                                socket,
                                info,
                                seed,
                                username: toSafeName(username),
                                save: new Uint8Array()
                            });
                        } else if (request.reply === 5) {
                            // invalid credentials (bad user or bad pass)
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.INVALID_USER_OR_PASS,
                                socket
                            });
                            return;
                        } else if (request.reply === -1) {
                            // login server connection error
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGIN_SERVER_OFFLINE,
                                socket
                            });
                            return;
                        } else {
                            self.postMessage({
                                type: 'loginreply',
                                status: LoginResponse.LOGIN_REJECTED,
                                socket
                            });
                            return;
                        }
                    } else {
                        let save = new Uint8Array();
                        const safeName = toSafeName(username);
                        const url = new URL(`data/players/${safeName}.sav`, self.location.origin);
                        if ((await fetch(url)).ok) {
                            save = new Uint8Array(await (await fetch(url)).arrayBuffer());
                        }

                        self.postMessage({
                            type: 'loginreply',
                            status: LoginResponse.SUCCESSFUL,
                            socket,
                            info,
                            seed,
                            username: safeName,
                            save
                        });
                    }
                    break;
                }
                case 'logout': {
                    const { username, save } = msg.data;

                    if (Environment.LOGIN_KEY) {
                        const login = new LoginClient();
                        const reply = await login.save(toBase37(username), save);

                        if (reply === 0) {
                            self.postMessage({
                                type: 'logoutreply',
                                username
                            });
                        }
                    } else {
                        self.postMessage({
                            type: 'logoutreply',
                            username
                        });
                    }
                    break;
                }
                default:
                    console.error('Unknown message type: ' + msg.data.type);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    };
}
