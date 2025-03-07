import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import ResumePauseButton from '#/network/client/model/ResumePauseButton.js';
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';

export default class ResumePauseButtonDecoder extends MessageDecoder<ResumePauseButton> {
    prot = ClientProt.RESUME_PAUSEBUTTON;

    decode() {
        return new ResumePauseButton();
    }
}
