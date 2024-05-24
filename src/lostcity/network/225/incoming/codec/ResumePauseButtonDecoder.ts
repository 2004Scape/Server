import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import ResumePauseButton from '#lostcity/network/225/incoming/ResumePauseButton.js';

export default class ResumePauseButtonDecoder extends MessageDecoder<ResumePauseButton> {
    prot = ClientProt.RESUME_PAUSEBUTTON;

    decode() {
        return new ResumePauseButton();
    }
}
