import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt from '#/network/game/client/codec/rs225/ClientProt.js';
import ResumePauseButton from '#/network/game/client/model/ResumePauseButton.js';

export default class ResumePauseButtonDecoder extends MessageDecoder<ResumePauseButton> {
    prot = ClientProt.RESUME_PAUSEBUTTON;

    decode() {
        return new ResumePauseButton();
    }
}
