import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import ResumePauseButton from '#/network/game/client/model/ResumePauseButton.js';

export default class ResumePauseButtonDecoder extends MessageDecoder<ResumePauseButton> {
    prot = ClientProt225.RESUME_PAUSEBUTTON;

    decode() {
        return new ResumePauseButton();
    }
}
