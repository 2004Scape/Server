import ClientProtBase from '#/network/game/client/codec/ClientProtBase.js';
import ClientProtRepository from '#/network/game/client/codec/ClientProtRepository.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import ClientProtRepository225 from '#/network/game/client/codec/rs225/ClientProtRepository225.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import ClientProtRepository244 from '#/network/game/client/codec/rs244/ClientProtRepository244.js';
import Environment from '#/util/Environment.js';

class ClientProtProvider {
    ClientProt: typeof ClientProtBase;
    ClientProtRepository: ClientProtRepository;

    constructor() {
        if (Environment.ENGINE_REVISION === 244) {
            this.ClientProt = ClientProt244;
            this.ClientProtRepository = new ClientProtRepository244();
        } else {
            this.ClientProt = ClientProt225;
            this.ClientProtRepository = new ClientProtRepository225();
        }
    }
}

export default new ClientProtProvider();
