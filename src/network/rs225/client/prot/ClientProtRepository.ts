import { ClientProt } from '@2004scape/rsbuf';
import * as rsbuf from '@2004scape/rsbuf';

import MessageHandler from '#/network/MessageHandler.js';
import ChatSetModeHandler from '#/network/rs225/client/handler/ChatSetModeHandler.js';
import ClientCheatHandler from '#/network/rs225/client/handler/ClientCheatHandler.js';
import CloseModalHandler from '#/network/rs225/client/handler/CloseModalHandler.js';
import EventTrackingHandler from '#/network/rs225/client/handler/EventTrackingHandler.js';
import FriendListAddHandler from '#/network/rs225/client/handler/FriendListAddHandler.js';
import FriendListDelHandler from '#/network/rs225/client/handler/FriendListDelHandler.js';
import IdleTimerHandler from '#/network/rs225/client/handler/IdleTimerHandler.js';
import IfButtonHandler from '#/network/rs225/client/handler/IfButtonHandler.js';
import IfPlayerDesignHandler from '#/network/rs225/client/handler/IfPlayerDesignHandler.js';
import IgnoreListAddHandler from '#/network/rs225/client/handler/IgnoreListAddHandler.js';
import IgnoreListDelHandler from '#/network/rs225/client/handler/IgnoreListDelHandler.js';
import InvButtonDHandler from '#/network/rs225/client/handler/InvButtonDHandler.js';
import InvButtonHandler from '#/network/rs225/client/handler/InvButtonHandler.js';
import MessagePrivateHandler from '#/network/rs225/client/handler/MessagePrivateHandler.js';
import MessagePublicHandler from '#/network/rs225/client/handler/MessagePublicHandler.js';
import MoveClickHandler from '#/network/rs225/client/handler/MoveClickHandler.js';
import NoTimeoutHandler from '#/network/rs225/client/handler/NoTimeoutHandler.js';
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
import ReportAbuseHandler from '#/network/rs225/client/handler/ReportAbuseHandler.js';
import ResumePauseButtonHandler from '#/network/rs225/client/handler/ResumePauseButtonHandler.js';
import ResumePCountDialogHandler from '#/network/rs225/client/handler/ResumePCountDialogHandler.js';
import TutorialClickSideHandler from '#/network/rs225/client/handler/TutorialClickSideHandler.js';

class ClientProtRepository {
    private readonly handlers: Map<number, MessageHandler<unknown>> = new Map();
    private readonly maps: Map<ClientProt, (bytes: Uint8Array) => unknown | undefined> = new Map();

    private bind(prot: ClientProt, callback: (bytes: Uint8Array) => unknown | undefined, handler?: MessageHandler<unknown>) {
        if (handler) {
            this.handlers.set(prot, handler);
        }
        this.maps.set(prot, callback);
    }

    constructor() {
        this.bind(ClientProt.CLIENT_CHEAT, (b) => rsbuf.clientCheat(b), new ClientCheatHandler());
        this.bind(ClientProt.CLOSE_MODAL, (b) => rsbuf.closeModal(b), new CloseModalHandler());
        this.bind(ClientProt.FRIENDLIST_ADD, (b) => rsbuf.friendListAdd(b), new FriendListAddHandler());
        this.bind(ClientProt.FRIENDLIST_DEL, (b) => rsbuf.friendListDel(b), new FriendListDelHandler());
        this.bind(ClientProt.IDLE_TIMER, (b) => rsbuf.idleTimer(b), new IdleTimerHandler());
        this.bind(ClientProt.IF_BUTTON, (b) => rsbuf.ifButton(b), new IfButtonHandler());
        this.bind(ClientProt.IF_PLAYERDESIGN, (b) => rsbuf.ifPlayerDesign(b), new IfPlayerDesignHandler());
        this.bind(ClientProt.IGNORELIST_ADD, (b) => rsbuf.ignoreListAdd(b), new IgnoreListAddHandler());
        this.bind(ClientProt.IGNORELIST_DEL, (b) => rsbuf.ignoreListDel(b), new IgnoreListDelHandler());
        this.bind(ClientProt.INV_BUTTON1, (b) => rsbuf.invButton1(b), new InvButtonHandler());
        this.bind(ClientProt.INV_BUTTON2, (b) => rsbuf.invButton2(b), new InvButtonHandler());
        this.bind(ClientProt.INV_BUTTON3, (b) => rsbuf.invButton3(b), new InvButtonHandler());
        this.bind(ClientProt.INV_BUTTON4, (b) => rsbuf.invButton4(b), new InvButtonHandler());
        this.bind(ClientProt.INV_BUTTON5, (b) => rsbuf.invButton5(b), new InvButtonHandler());
        this.bind(ClientProt.INV_BUTTOND, (b) => rsbuf.invButtonD(b), new InvButtonDHandler());
        this.bind(ClientProt.MESSAGE_PRIVATE, (b) => rsbuf.messagePrivate(b), new MessagePrivateHandler());
        this.bind(ClientProt.MESSAGE_PUBLIC, (b) => rsbuf.messagePublic(b), new MessagePublicHandler());
        this.bind(ClientProt.MOVE_GAMECLICK, (b) => rsbuf.moveGameClick(b), new MoveClickHandler());
        this.bind(ClientProt.MOVE_OPCLICK, (b) => rsbuf.moveGameClick(b), new MoveClickHandler());
        this.bind(ClientProt.MOVE_MINIMAPCLICK, (b) => rsbuf.moveMinimapClick(b), new MoveClickHandler());
        this.bind(ClientProt.NO_TIMEOUT, (b) => rsbuf.noTimeout(b), new NoTimeoutHandler());
        this.bind(ClientProt.OPHELD1, (b) => rsbuf.opheld1(b), new OpHeldHandler());
        this.bind(ClientProt.OPHELD2, (b) => rsbuf.opheld2(b), new OpHeldHandler());
        this.bind(ClientProt.OPHELD3, (b) => rsbuf.opheld3(b), new OpHeldHandler());
        this.bind(ClientProt.OPHELD4, (b) => rsbuf.opheld4(b), new OpHeldHandler());
        this.bind(ClientProt.OPHELD5, (b) => rsbuf.opheld5(b), new OpHeldHandler());
        this.bind(ClientProt.OPHELDT, (b) => rsbuf.opheldT(b), new OpHeldTHandler());
        this.bind(ClientProt.OPHELDU, (b) => rsbuf.opheldU(b), new OpHeldUHandler());
        this.bind(ClientProt.OPLOC1, (b) => rsbuf.oploc1(b), new OpLocHandler());
        this.bind(ClientProt.OPLOC2, (b) => rsbuf.oploc2(b), new OpLocHandler());
        this.bind(ClientProt.OPLOC3, (b) => rsbuf.oploc3(b), new OpLocHandler());
        this.bind(ClientProt.OPLOC4, (b) => rsbuf.oploc4(b), new OpLocHandler());
        this.bind(ClientProt.OPLOC5, (b) => rsbuf.oploc5(b), new OpLocHandler());
        this.bind(ClientProt.OPLOCT, (b) => rsbuf.oplocT(b), new OpLocTHandler());
        this.bind(ClientProt.OPLOCU, (b) => rsbuf.oplocU(b), new OpLocUHandler());
        this.bind(ClientProt.OPNPC1, (b) => rsbuf.opnpc1(b), new OpNpcHandler());
        this.bind(ClientProt.OPNPC2, (b) => rsbuf.opnpc2(b), new OpNpcHandler());
        this.bind(ClientProt.OPNPC3, (b) => rsbuf.opnpc3(b), new OpNpcHandler());
        this.bind(ClientProt.OPNPC4, (b) => rsbuf.opnpc4(b), new OpNpcHandler());
        this.bind(ClientProt.OPNPC5, (b) => rsbuf.opnpc5(b), new OpNpcHandler());
        this.bind(ClientProt.OPNPCT, (b) => rsbuf.opnpcT(b), new OpNpcTHandler());
        this.bind(ClientProt.OPNPCU, (b) => rsbuf.opnpcU(b), new OpNpcUHandler());
        this.bind(ClientProt.OPOBJ1, (b) => rsbuf.opobj1(b), new OpObjHandler());
        this.bind(ClientProt.OPOBJ2, (b) => rsbuf.opobj2(b), new OpObjHandler());
        this.bind(ClientProt.OPOBJ3, (b) => rsbuf.opobj3(b), new OpObjHandler());
        this.bind(ClientProt.OPOBJ4, (b) => rsbuf.opobj4(b), new OpObjHandler());
        this.bind(ClientProt.OPOBJ5, (b) => rsbuf.opobj5(b), new OpObjHandler());
        this.bind(ClientProt.OPOBJT, (b) => rsbuf.opobjT(b), new OpObjTHandler());
        this.bind(ClientProt.OPOBJU, (b) => rsbuf.opobjU(b), new OpObjUHandler());
        this.bind(ClientProt.OPPLAYER1, (b) => rsbuf.opplayer1(b), new OpPlayerHandler());
        this.bind(ClientProt.OPPLAYER2, (b) => rsbuf.opplayer2(b), new OpPlayerHandler());
        this.bind(ClientProt.OPPLAYER3, (b) => rsbuf.opplayer3(b), new OpPlayerHandler());
        this.bind(ClientProt.OPPLAYER4, (b) => rsbuf.opplayer4(b), new OpPlayerHandler());
        this.bind(ClientProt.OPPLAYERT, (b) => rsbuf.opplayerT(b), new OpPlayerTHandler());
        this.bind(ClientProt.OPPLAYERU, (b) => rsbuf.opplayerU(b), new OpPlayerUHandler());
        this.bind(ClientProt.REBUILD_GETMAPS, (b) => rsbuf.rebuildGetMaps(b), new RebuildGetMapsHandler());
        this.bind(ClientProt.RESUME_PAUSEBUTTON, (b) => rsbuf.resumePauseButton(b), new ResumePauseButtonHandler());
        this.bind(ClientProt.RESUME_P_COUNTDIALOG, (b) => rsbuf.resumeCountDialog(b), new ResumePCountDialogHandler());
        this.bind(ClientProt.TUTORIAL_CLICKSIDE, (b) => rsbuf.tutorialClickSide(b), new TutorialClickSideHandler());
        this.bind(ClientProt.CHAT_SETMODE, (b) => rsbuf.chatSetMode(b), new ChatSetModeHandler());
        this.bind(ClientProt.EVENT_TRACKING, (b) => rsbuf.eventTracking(b), new EventTrackingHandler());
        this.bind(ClientProt.REPORT_ABUSE, (b) => rsbuf.reportAbuse(b), new ReportAbuseHandler());
        this.bind(ClientProt.EVENT_CAMERA_POSITION, (b) => rsbuf.eventCameraPosition(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC1, (b) => rsbuf.anticheatOp1(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC2, (b) => rsbuf.anticheatOp2(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC3, (b) => rsbuf.anticheatOp3(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC4, (b) => rsbuf.anticheatOp4(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC5, (b) => rsbuf.anticheatOp5(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC6, (b) => rsbuf.anticheatOp6(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC7, (b) => rsbuf.anticheatOp7(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC8, (b) => rsbuf.anticheatOp8(b));
        this.bind(ClientProt.ANTICHEAT_OPLOGIC9, (b) => rsbuf.anticheatOp9(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC1, (b) => rsbuf.anticheatCycle1(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC2, (b) => rsbuf.anticheatCycle2(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC3, (b) => rsbuf.anticheatCycle3(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC4, (b) => rsbuf.anticheatCycle4(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC5, (b) => rsbuf.anticheatCycle5(b));
        this.bind(ClientProt.ANTICHEAT_CYCLELOGIC6, (b) => rsbuf.anticheatCycle6(b));
    }

    getHandler(prot: ClientProt): MessageHandler<unknown> | undefined {
        return this.handlers.get(prot);
    }

    getMessage(prot: ClientProt, bytes: Uint8Array): unknown | undefined {
        return this.maps.get(prot)?.(bytes);
    }
}

export default new ClientProtRepository();
