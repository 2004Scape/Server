import MessageDecoder from '#lostcity/network/incoming/codec/MessageDecoder.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import IncomingMessage from '#lostcity/network/incoming/IncomingMessage.js';
import ClientCheatDecoder from '#lostcity/network/225/incoming/codec/ClientCheatDecoder.js';
import CloseModalDecoder from '#lostcity/network/225/incoming/codec/CloseModalDecoder.js';
import FriendListAddDecoder from '#lostcity/network/225/incoming/codec/FriendListAddDecoder.js';
import FriendListDelDecoder from '#lostcity/network/225/incoming/codec/FriendListDelDecoder.js';
import IdleTimerDecoder from '#lostcity/network/225/incoming/codec/IdleTimerDecoder.js';
import IgnoreListAddDecoder from '#lostcity/network/225/incoming/codec/IgnoreListAddDecoder.js';
import IgnoreListDelDecoder from '#lostcity/network/225/incoming/codec/IgnoreListDelDecoder.js';
import IfButtonDecoder from '#lostcity/network/225/incoming/codec/IfButtonDecoder.js';
import IfPlayerDesignDecoder from '#lostcity/network/225/incoming/codec/IfPlayerDesignDecoder.js';
import InvButtonDecoder from '#lostcity/network/225/incoming/codec/InvButtonDecoder.js';
import InvButtonDDecoder from '#lostcity/network/225/incoming/codec/InvButtonDDecoder.js';
import MessagePrivateDecoder from '#lostcity/network/225/incoming/codec/MessagePrivateDecoder.js';
import MessagePublicDecoder from '#lostcity/network/225/incoming/codec/MessagePublicDecoder.js';
import NoTimeoutDecoder from '#lostcity/network/225/incoming/codec/NoTimeoutDecoder.js';
import OpHeldDecoder from '#lostcity/network/225/incoming/codec/OpHeldDecoder.js';
import OpHeldTDecoder from '#lostcity/network/225/incoming/codec/OpHeldTDecoder.js';
import OpHeldUDecoder from '#lostcity/network/225/incoming/codec/OpHeldUDecoder.js';
import OpLocDecoder from '#lostcity/network/225/incoming/codec/OpLocDecoder.js';
import OpLocTDecoder from '#lostcity/network/225/incoming/codec/OpLocTDecoder.js';
import OpLocUDecoder from '#lostcity/network/225/incoming/codec/OpLocUDecoder.js';
import OpNpcDecoder from '#lostcity/network/225/incoming/codec/OpNpcDecoder.js';
import OpNpcTDecoder from '#lostcity/network/225/incoming/codec/OpNpcTDecoder.js';
import OpNpcUDecoder from '#lostcity/network/225/incoming/codec/OpNpcUDecoder.js';
import OpObjDecoder from '#lostcity/network/225/incoming/codec/OpObjDecoder.js';
import OpObjTDecoder from '#lostcity/network/225/incoming/codec/OpObjTDecoder.js';
import OpObjUDecoder from '#lostcity/network/225/incoming/codec/OpObjUDecoder.js';
import OpPlayerDecoder from '#lostcity/network/225/incoming/codec/OpPlayerDecoder.js';
import OpPlayerTDecoder from '#lostcity/network/225/incoming/codec/OpPlayerTDecoder.js';
import OpPlayerUDecoder from '#lostcity/network/225/incoming/codec/OpPlayerUDecoder.js';
import RebuildGetMapsDecoder from '#lostcity/network/225/incoming/codec/RebuildGetMapsDecoder.js';
import ResumePauseButtonDecoder from '#lostcity/network/225/incoming/codec/ResumePauseButtonDecoder.js';
import ResumePCountDialogDecoder from '#lostcity/network/225/incoming/codec/ResumePCountDialogDecoder.js';
import TutorialClickSideDecoder from '#lostcity/network/225/incoming/codec/TutorialClickSideDecoder.js';

class ClientProtRepository {
    bound: Map<number, MessageDecoder<IncomingMessage>> = new Map();

    private bind(decoder: MessageDecoder<IncomingMessage>) {
        this.bound.set(decoder.prot.id, decoder);
    }

    constructor() {
        this.bind(new ClientCheatDecoder());
        this.bind(new CloseModalDecoder());
        this.bind(new FriendListAddDecoder());
        this.bind(new FriendListDelDecoder());
        this.bind(new IdleTimerDecoder());
        this.bind(new IfButtonDecoder());
        this.bind(new IfPlayerDesignDecoder());
        this.bind(new IgnoreListAddDecoder());
        this.bind(new IgnoreListDelDecoder());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON1, 1));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON2, 2));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON3, 3));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON4, 4));
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON5, 5));
        this.bind(new InvButtonDDecoder());
        this.bind(new MessagePrivateDecoder());
        this.bind(new MessagePublicDecoder());
        this.bind(new NoTimeoutDecoder());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD1, 1));
        this.bind(new OpHeldDecoder(ClientProt.OPHELD2, 2));
        this.bind(new OpHeldDecoder(ClientProt.OPHELD3, 3));
        this.bind(new OpHeldDecoder(ClientProt.OPHELD4, 4));
        this.bind(new OpHeldDecoder(ClientProt.OPHELD5, 5));
        this.bind(new OpHeldTDecoder());
        this.bind(new OpHeldUDecoder());
        this.bind(new OpLocDecoder(ClientProt.OPLOC1, 1));
        this.bind(new OpLocDecoder(ClientProt.OPLOC2, 2));
        this.bind(new OpLocDecoder(ClientProt.OPLOC3, 3));
        this.bind(new OpLocDecoder(ClientProt.OPLOC4, 4));
        this.bind(new OpLocDecoder(ClientProt.OPLOC5, 5));
        this.bind(new OpLocTDecoder());
        this.bind(new OpLocUDecoder());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC1, 1));
        this.bind(new OpNpcDecoder(ClientProt.OPNPC2, 2));
        this.bind(new OpNpcDecoder(ClientProt.OPNPC3, 3));
        this.bind(new OpNpcDecoder(ClientProt.OPNPC4, 4));
        this.bind(new OpNpcDecoder(ClientProt.OPNPC5, 5));
        this.bind(new OpNpcTDecoder());
        this.bind(new OpNpcUDecoder());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ1, 1));
        this.bind(new OpObjDecoder(ClientProt.OPOBJ2, 2));
        this.bind(new OpObjDecoder(ClientProt.OPOBJ3, 3));
        this.bind(new OpObjDecoder(ClientProt.OPOBJ4, 4));
        this.bind(new OpObjDecoder(ClientProt.OPOBJ5, 5));
        this.bind(new OpObjTDecoder());
        this.bind(new OpObjUDecoder());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER1, 1));
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER2, 2));
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER3, 3));
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER4, 4));
        this.bind(new OpPlayerTDecoder());
        this.bind(new OpPlayerUDecoder());
        this.bind(new RebuildGetMapsDecoder());
        this.bind(new ResumePauseButtonDecoder());
        this.bind(new ResumePCountDialogDecoder());
        this.bind(new TutorialClickSideDecoder());
    }

    get(prot: ClientProt) {
        return this.bound.get(prot.id);
    }
}

export default new ClientProtRepository();
