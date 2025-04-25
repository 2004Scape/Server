import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt244 from '#/network/game/client/codec/rs244/ClientProt244.js';
import ResumePauseButton from '#/network/game/client/model/ResumePauseButton.js';


export default class ResumePauseButtonDecoder extends MessageDecoder<ResumePauseButton> {
    prot = ClientProt244.RESUME_PAUSEBUTTON;

    decode() {
        return new ResumePauseButton();
    }
}
