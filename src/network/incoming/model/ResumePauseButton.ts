import IncomingMessage from '#/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#/network/incoming/prot/ClientProtCategory.js';

export default class ResumePauseButton extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;
}
