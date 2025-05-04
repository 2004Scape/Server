import ServerProt225 from '#/network/game/server/codec/rs225/ServerProt225.js';
import ServerProtRepository225 from '#/network/game/server/codec/rs225/ServerProtRepository225.js';
import ServerProt244 from '#/network/game/server/codec/rs244/ServerProt244.js';
import ServerProtRepository244 from '#/network/game/server/codec/rs244/ServerProtRepository244.js';
import ServerProtBase from '#/network/game/server/codec/ServerProtBase.js';
import ServerProtRepository from '#/network/game/server/codec/ServerProtRepository.js';
import Environment from '#/util/Environment.js';

class ServerProtProvider {
    ServerProt: typeof ServerProtBase;
    ServerProtRepository: ServerProtRepository;

    constructor() {
        if (Environment.ENGINE_REVISION === 244) {
            this.ServerProt = ServerProt244;
            this.ServerProtRepository = new ServerProtRepository244();
        } else {
            this.ServerProt = ServerProt225;
            this.ServerProtRepository = new ServerProtRepository225();
        }
    }
}

export default new ServerProtProvider();
