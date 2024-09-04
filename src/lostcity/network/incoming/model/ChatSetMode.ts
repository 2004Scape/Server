import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientProtCategory from '#lostcity/network/incoming/prot/ClientProtCategory.js';

export default class ChatSetMode extends IncomingMessage {
    category = ClientProtCategory.USER_EVENT;

    constructor(
        /**
         * 0 = On
         * 1 = Friends
         * 2 = Off
         * 3 = Hide
         */
        readonly publicChat: number,
        /**
         * 0 = On
         * 1 = Friends
         * 2 = Off
         */
        readonly privateChat: number,
        /**
         * 0 = On
         * 1 = Friends
         * 2 = Off
         */
        readonly tradeDuel: number
    ) {
        super();
    }
}
