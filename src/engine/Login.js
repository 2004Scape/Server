import World from '#engine/World.js';
import ClientWrapper from '#network/ClientWrapper.js';
import { crcTable } from '#util/GlobalCache.js';
import { IsaacRandom } from '#util/IsaacRandom.js';
import Packet from '#util/Packet.js';
import axios from 'axios';

class Login {
    STATE = 0;

    static CONNECT = Uint8Array.from([ 2 ]);
    static CONNECT_JMOD = Uint8Array.from([ 18 ]);
    static RECONNECT = Uint8Array.from([ 15 ]);
    static INVALID_CREDENTIALS = Uint8Array.from([ 3 ]);
    static ACCOUNT_DISABLED = Uint8Array.from([ 4 ]);
    static ACCOUNT_LOGGED_IN = Uint8Array.from([ 5 ]);
    static GAME_UPDATED = Uint8Array.from([ 6 ]);
    static WORLD_FULL = Uint8Array.from([ 7 ]);
    static LOGIN_OFFLINE = Uint8Array.from([ 8 ]);
    static LOGIN_SESSION_LIMIT = Uint8Array.from([ 9 ]);
    static BAD_SESSION = Uint8Array.from([ 10 ]);
    static LOGIN_REJECTED = Uint8Array.from([ 11 ]);
    static MEMBERS_ONLY = Uint8Array.from([ 12 ]);
    static GENERIC_ERROR = Uint8Array.from([ 13 ]);
    static SERVER_UPDATING = Uint8Array.from([ 14 ]);
    static LOGIN_ATTEMPTS_EXCEEDED = Uint8Array.from([ 16 ]);
    static MEMBERS_ONLY_AREA = Uint8Array.from([ 17 ]);

    async readIn(socket, data) {
        let opcode = data.g1();

        while (data.available > 0) {
            switch (opcode) {
                case 16:
                case 18: {
                    let login = data.gPacket(data.g1());

                    let revision = login.g1();
                    if (revision !== 225) {
                        socket.send(Login.GAME_UPDATED);
                        socket.close();
                        return;
                    }

                    let info = login.g1();
                    let lowMemory = (info & 0x1) === 1; // compatibility with a custom client test
                    let webClient = socket.type === ClientWrapper.WEBSOCKET;

                    let crcs = login.gdata(9 * 4);
                    if (Packet.crc32(crcs) != Packet.crc32(crcTable)) {
                        socket.send(Login.GAME_UPDATED);
                        socket.close();
                        return;
                    }

                    login.rsadec();
                    let magic = login.g1();
                    if (magic !== 10) {
                        socket.send(Login.LOGIN_REJECTED);
                        socket.close();
                        return;
                    }

                    let seed = [];
                    for (let i = 0; i < 4; i++) {
                        seed.push(login.g4());
                    }

                    let uid = login.g4();
                    let username = login.gjstr();
                    if (!username.length) {
                        username = 'test';
                    }
                    let password = login.gjstr();
                    if (!password.length) {
                        // TODO: temporary
                        password = '1';
                    }

                    if (username.length < 1 || username.length > 12 || username.indexOf(':') !== -1) {
                        socket.send(Login.INVALID_CREDENTIALS);
                        socket.close();
                        return;
                    }

                    if (password.length < 1 || password.length > 20) {
                        socket.send(Login.INVALID_CREDENTIALS);
                        socket.close();
                        return;
                    }

                    if (World.getNextPid() === -1) {
                        socket.send(Login.WORLD_FULL);
                        socket.close();
                        return;
                    }

                    let save;
                    if (process.env.MASTER_ADDRESS) {
                        try {
                            save = await axios.post(`${process.env.MASTER_ADDRESS}/servapi/v1/login`, {
                                username: username,
                                password: password,
                                world: process.env.GAME_ID
                            });
                        } catch (err) {
                            if (!err.response || !err.response.data) {
                                socket.send(Login.LOGIN_OFFLINE);
                                socket.close();
                                return;
                            }

                            const { errorCode } = err.response.data;
                            if (errorCode == 2) {
                                socket.send(Login.INVALID_CREDENTIALS);
                                socket.close();
                            } else if (errorCode == 3) {
                                socket.send(Login.ACCOUNT_LOGGED_IN);
                                socket.close();
                            } else {
                                socket.send(Login.LOGIN_REJECTED);
                                socket.close();
                            }

                            return;
                        }
                    }

                    socket.decryptor = new IsaacRandom(seed);
                    for (let i = 0; i < 4; ++i) {
                        seed[i] += 50;
                    }
                    socket.encryptor = new IsaacRandom(seed);

                    if (opcode == 16) {
                        socket.send(Login.CONNECT);
                    } else {
                        socket.send(Login.RECONNECT);
                    }

                    if (save && save.data && save.data.username) {
                        World.addPlayer(socket, opcode === 18, save.data.username, lowMemory, webClient, save.data);
                    } else {
                        World.addPlayer(socket, opcode === 18, username, lowMemory, webClient);
                    }
                } break;
                default:
                    socket.state = -1;
                    socket.close();
                    return;
            }
        }
    }
}

export default new Login();
