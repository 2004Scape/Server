import MessageDecoder from '#/network/client/codec/MessageDecoder.js';
import MessageHandler from '#/network/client/handler/MessageHandler.js'; 
import ClientProt from '#/network/rs225/client/prot/ClientProt.js';
import IncomingMessage from '#/network/client/IncomingMessage.js';
import ClientCheatDecoder from '#/network/rs225/client/codec/ClientCheatDecoder.js';
import CloseModalDecoder from '#/network/rs225/client/codec/CloseModalDecoder.js';
import IdleTimerDecoder from '#/network/rs225/client/codec/IdleTimerDecoder.js';
import IfButtonDecoder from '#/network/rs225/client/codec/IfButtonDecoder.js';
import IfPlayerDesignDecoder from '#/network/rs225/client/codec/IfPlayerDesignDecoder.js';
import InvButtonDecoder from '#/network/rs225/client/codec/InvButtonDecoder.js';
import InvButtonDDecoder from '#/network/rs225/client/codec/InvButtonDDecoder.js';
import MessagePrivateDecoder from '#/network/rs225/client/codec/MessagePrivateDecoder.js';
import MessagePublicDecoder from '#/network/rs225/client/codec/MessagePublicDecoder.js';
import OpHeldDecoder from '#/network/rs225/client/codec/OpHeldDecoder.js';
import OpHeldTDecoder from '#/network/rs225/client/codec/OpHeldTDecoder.js';
import OpHeldUDecoder from '#/network/rs225/client/codec/OpHeldUDecoder.js';
import OpLocDecoder from '#/network/rs225/client/codec/OpLocDecoder.js';
import OpLocTDecoder from '#/network/rs225/client/codec/OpLocTDecoder.js';
import OpLocUDecoder from '#/network/rs225/client/codec/OpLocUDecoder.js';
import OpNpcDecoder from '#/network/rs225/client/codec/OpNpcDecoder.js';
import OpNpcTDecoder from '#/network/rs225/client/codec/OpNpcTDecoder.js';
import OpNpcUDecoder from '#/network/rs225/client/codec/OpNpcUDecoder.js';
import OpObjDecoder from '#/network/rs225/client/codec/OpObjDecoder.js';
import OpObjTDecoder from '#/network/rs225/client/codec/OpObjTDecoder.js';
import OpObjUDecoder from '#/network/rs225/client/codec/OpObjUDecoder.js';
import OpPlayerDecoder from '#/network/rs225/client/codec/OpPlayerDecoder.js';
import OpPlayerTDecoder from '#/network/rs225/client/codec/OpPlayerTDecoder.js';
import OpPlayerUDecoder from '#/network/rs225/client/codec/OpPlayerUDecoder.js';
import RebuildGetMapsDecoder from '#/network/rs225/client/codec/RebuildGetMapsDecoder.js';
import ResumePauseButtonDecoder from '#/network/rs225/client/codec/ResumePauseButtonDecoder.js';
import ResumePCountDialogDecoder from '#/network/rs225/client/codec/ResumePCountDialogDecoder.js';
import TutorialClickSideDecoder from '#/network/rs225/client/codec/TutorialClickSideDecoder.js';
import InvButtonHandler from '#/network/rs225/client/handler/InvButtonHandler.js';
import ClientCheatHandler from '#/network/rs225/client/handler/ClientCheatHandler.js';
import CloseModalHandler from '#/network/rs225/client/handler/CloseModalHandler.js';
import IdleTimerHandler from '#/network/rs225/client/handler/IdleTimerHandler.js';
import IfButtonHandler from '#/network/rs225/client/handler/IfButtonHandler.js';
import IfPlayerDesignHandler from '#/network/rs225/client/handler/IfPlayerDesignHandler.js';
import InvButtonDHandler from '#/network/rs225/client/handler/InvButtonDHandler.js';
import MessagePrivateHandler from '#/network/rs225/client/handler/MessagePrivateHandler.js';
import MessagePublicHandler from '#/network/rs225/client/handler/MessagePublicHandler.js';
import OpHeldHandler from '#/network/rs225/client/handler/OpHeldHandler.js';
import OpHeldTHandler from '#/network/rs225/client/handler/OpHeldTHandler.js';
import OpHeldUHandler from '#/network/rs225/client/handler/OpHeldUHandler.js';
import OpLocHandler from '#/network/rs225/client/handler/OpLocHandler.js';
import OpLocTHandler from '#/network/rs225/client/handler/OpLocTHandler.js';
import OpLocUHandler from '#/network/rs225/client/handler/OpLocUHandler.js';
import OpNpcHandler from '#/network/rs225/client/handler/OpNpcHandler.js';
import OpNpcTHandler from '#/network/rs225/client/handler/OpNpcTHandler.js';
import OpNpcUHandler from '#/network/rs225/client/handler/OpNpcUHandler.js';
import OpObjHandler from '#/network/rs225/client/handler/OpObjHandler.js';
import OpObjTHandler from '#/network/rs225/client/handler/OpObjTHandler.js';
import OpObjUHandler from '#/network/rs225/client/handler/OpObjUHandler.js';
import OpPlayerHandler from '#/network/rs225/client/handler/OpPlayerHandler.js';
import OpPlayerTHandler from '#/network/rs225/client/handler/OpPlayerTHandler.js';
import OpPlayerUHandler from '#/network/rs225/client/handler/OpPlayerUHandler.js';
import RebuildGetMapsHandler from '#/network/rs225/client/handler/RebuildGetMapsHandler.js';
import ResumePauseButtonHandler from '#/network/rs225/client/handler/ResumePauseButtonHandler.js';
import ResumePCountDialogHandler from '#/network/rs225/client/handler/ResumePCountDialogHandler.js';
import TutorialClickSideHandler from '#/network/rs225/client/handler/TutorialClickSideHandler.js';
import MoveClickDecoder from '#/network/rs225/client/codec/MoveClickDecoder.js';
import MoveClickHandler from '#/network/rs225/client/handler/MoveClickHandler.js';
import ChatSetModeDecoder from '#/network/rs225/client/codec/ChatSetModeDecoder.js';
import ChatSetModeHandler from '#/network/rs225/client/handler/ChatSetModeHandler.js';
import FriendListAddDecoder from '#/network/rs225/client/codec/FriendListAddDecoder.js';
import FriendListAddHandler from '#/network/rs225/client/handler/FriendListAddHandler.js';
import FriendListDelDecoder from '#/network/rs225/client/codec/FriendListDelDecoder.js';
import FriendListDelHandler from '#/network/rs225/client/handler/FriendListDelHandler.js';
import IgnoreListAddDecoder from '#/network/rs225/client/codec/IgnoreListAddDecoder.js';
import IgnoreListDelDecoder from '#/network/rs225/client/codec/IgnoreListDelDecoder.js';
import IgnoreListAddHandler from '#/network/rs225/client/handler/IgnoreListAddHandler.js';
import IgnoreListDelHandler from '#/network/rs225/client/handler/IgnoreListDelHandler.js';

class ClientProtRepository {
    decoders: Map<number, MessageDecoder<IncomingMessage>> = new Map();
    handlers: Map<number, MessageHandler<IncomingMessage>> = new Map();

    private bind(decoder: MessageDecoder<IncomingMessage>, handler?: MessageHandler<IncomingMessage>) {
        if (this.decoders.has(decoder.prot.id)) {
            throw new Error(`[ClientProtRepository] Already defines a ${decoder.prot.id}.`);
        }

        this.decoders.set(decoder.prot.id, decoder);

        if (handler) {
            this.handlers.set(decoder.prot.id, handler);
        }
    }

    constructor() {
        this.bind(new ClientCheatDecoder(), new ClientCheatHandler());
        this.bind(new CloseModalDecoder(), new CloseModalHandler());
        this.bind(new FriendListAddDecoder(), new FriendListAddHandler());
        this.bind(new FriendListDelDecoder(), new FriendListDelHandler());
        this.bind(new IdleTimerDecoder(), new IdleTimerHandler());
        this.bind(new IfButtonDecoder(), new IfButtonHandler());
        this.bind(new IfPlayerDesignDecoder(), new IfPlayerDesignHandler());
        this.bind(new IgnoreListAddDecoder(), new IgnoreListAddHandler());
        this.bind(new IgnoreListDelDecoder(), new IgnoreListDelHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON1, 1), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON2, 2), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON3, 3), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON4, 4), new InvButtonHandler());
        this.bind(new InvButtonDecoder(ClientProt.INV_BUTTON5, 5), new InvButtonHandler());
        this.bind(new InvButtonDDecoder(), new InvButtonDHandler());
        this.bind(new MessagePrivateDecoder(), new MessagePrivateHandler());
        this.bind(new MessagePublicDecoder(), new MessagePublicHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_GAMECLICK), new MoveClickHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_OPCLICK), new MoveClickHandler());
        this.bind(new MoveClickDecoder(ClientProt.MOVE_MINIMAPCLICK), new MoveClickHandler());
        // this.bind(new NoTimeoutDecoder(), new NoTimeoutHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD1, 1), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD2, 2), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD3, 3), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD4, 4), new OpHeldHandler());
        this.bind(new OpHeldDecoder(ClientProt.OPHELD5, 5), new OpHeldHandler());
        this.bind(new OpHeldTDecoder(), new OpHeldTHandler());
        this.bind(new OpHeldUDecoder(), new OpHeldUHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC1, 1), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC2, 2), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC3, 3), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC4, 4), new OpLocHandler());
        this.bind(new OpLocDecoder(ClientProt.OPLOC5, 5), new OpLocHandler());
        this.bind(new OpLocTDecoder(), new OpLocTHandler());
        this.bind(new OpLocUDecoder(), new OpLocUHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC1, 1), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC2, 2), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC3, 3), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC4, 4), new OpNpcHandler());
        this.bind(new OpNpcDecoder(ClientProt.OPNPC5, 5), new OpNpcHandler());
        this.bind(new OpNpcTDecoder(), new OpNpcTHandler());
        this.bind(new OpNpcUDecoder(), new OpNpcUHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ1, 1), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ2, 2), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ3, 3), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ4, 4), new OpObjHandler());
        this.bind(new OpObjDecoder(ClientProt.OPOBJ5, 5), new OpObjHandler());
        this.bind(new OpObjTDecoder(), new OpObjTHandler());
        this.bind(new OpObjUDecoder(), new OpObjUHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER1, 1), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER2, 2), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER3, 3), new OpPlayerHandler());
        this.bind(new OpPlayerDecoder(ClientProt.OPPLAYER4, 4), new OpPlayerHandler());
        this.bind(new OpPlayerTDecoder(), new OpPlayerTHandler());
        this.bind(new OpPlayerUDecoder(), new OpPlayerUHandler());
        this.bind(new RebuildGetMapsDecoder(), new RebuildGetMapsHandler());
        this.bind(new ResumePauseButtonDecoder(), new ResumePauseButtonHandler());
        this.bind(new ResumePCountDialogDecoder(), new ResumePCountDialogHandler());
        this.bind(new TutorialClickSideDecoder(), new TutorialClickSideHandler());
        this.bind(new ChatSetModeDecoder(), new ChatSetModeHandler());
    }

    getDecoder(prot: ClientProt) {
        return this.decoders.get(prot.id);
    }

    getHandler(prot: ClientProt) {
        return this.handlers.get(prot.id);
    }
}

export default new ClientProtRepository();
