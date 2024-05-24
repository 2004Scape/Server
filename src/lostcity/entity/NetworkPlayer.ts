import 'dotenv/config';
import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import CategoryType from '#lostcity/cache/CategoryType.js';
import Component from '#lostcity/cache/Component.js';
import InvType from '#lostcity/cache/InvType.js';
import LocType from '#lostcity/cache/LocType.js';
import NpcType from '#lostcity/cache/NpcType.js';
import ObjType from '#lostcity/cache/ObjType.js';
import VarPlayerType from '#lostcity/cache/VarPlayerType.js';

import Loc from '#lostcity/entity/Loc.js';
import Obj from '#lostcity/entity/Obj.js';
import { Position } from '#lostcity/entity/Position.js';

import ServerProt from '#lostcity/server/ServerProt.js';

import World from '#lostcity/engine/World.js';

import ScriptProvider from '#lostcity/engine/script/ScriptProvider.js';
import ScriptRunner from '#lostcity/engine/script/ScriptRunner.js';
import ScriptState from '#lostcity/engine/script/ScriptState.js';
import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import IdkType from '#lostcity/cache/IdkType.js';

import Environment from '#lostcity/util/Environment.js';
import WordEnc from '#lostcity/cache/WordEnc.js';
import WordPack from '#jagex2/wordenc/WordPack.js';

import { findPath } from '@2004scape/rsmod-pathfinder';
import Player from '#lostcity/entity/Player.js';
import { PRELOADED } from '#lostcity/entity/PreloadedPacks.js';
import ClientSocket from '#lostcity/server/ClientSocket.js';
import Interaction from '#lostcity/entity/Interaction.js';

import ClientProtRepository from '#lostcity/network/225/incoming/prot/ClientProtRepository.js';
import InvButton from '#lostcity/network/225/incoming/InvButton.js';
import ClientProt from '#lostcity/network/225/incoming/prot/ClientProt.js';
import OpHeld from '#lostcity/network/225/incoming/OpHeld.js';
import OpHeldU from '#lostcity/network/225/incoming/OpHeldU.js';
import OpHeldT from '#lostcity/network/225/incoming/OpHeldT.js';
import OpLoc from '#lostcity/network/225/incoming/OpLoc.js';
import OpLocU from '#lostcity/network/225/incoming/OpLocU.js';
import OpLocT from '#lostcity/network/225/incoming/OpLocT.js';
import RebuildGetMaps from '#lostcity/network/225/incoming/RebuildGetMaps.js';
import ClientCheat from '#lostcity/network/225/incoming/ClientCheat.js';
import MessagePublic from '#lostcity/network/225/incoming/MessagePublic.js';
import IfPlayerDesign from '#lostcity/network/225/incoming/IfPlayerDesign.js';
import TutorialClickSide from '#lostcity/network/225/incoming/TutorialClickSide.js';
import CloseModal from '#lostcity/network/225/incoming/CloseModal.js';
import ResumePauseButton from '#lostcity/network/225/incoming/ResumePauseButton.js';
import ResumePCountDialog from '#lostcity/network/225/incoming/ResumePCountDialog.js';
import IfButton from '#lostcity/network/225/incoming/IfButton.js';
import InvButtonD from '#lostcity/network/225/incoming/InvButtonD.js';
import OpNpc from '#lostcity/network/225/incoming/OpNpc.js';
import OpNpcU from '#lostcity/network/225/incoming/OpNpcU.js';
import OpNpcT from '#lostcity/network/225/incoming/OpNpcT.js';
import OpObj from '#lostcity/network/225/incoming/OpObj.js';
import OpObjU from '#lostcity/network/225/incoming/OpObjU.js';
import OpObjT from '#lostcity/network/225/incoming/OpObjT.js';
import OpPlayer from '#lostcity/network/225/incoming/OpPlayer.js';
import OpPlayerU from '#lostcity/network/225/incoming/OpPlayerU.js';
import OpPlayerT from '#lostcity/network/225/incoming/OpPlayerT.js';
import FriendListAdd from '#lostcity/network/225/incoming/FriendListAdd.js';
import FriendListDel from '#lostcity/network/225/incoming/FriendListDel.js';
import IgnoreListAdd from '#lostcity/network/225/incoming/IgnoreListAdd.js';
import IgnoreListDel from '#lostcity/network/225/incoming/IgnoreListDel.js';
import IdleTimer from '#lostcity/network/225/incoming/IdleTimer.js';
import MessagePrivate from '#lostcity/network/225/incoming/MessagePrivate.js';

export class NetworkPlayer extends Player {
    client: ClientSocket | null = null;

    constructor(username: string, username37: bigint, client: ClientSocket) {
        super(username, username37);

        this.client = client;
        this.client.player = this;
    }

    decodeIn() {
        // this.lastResponse = World.currentTick; // use to keep headless players in the world
        if (this.client === null || this.client.inOffset < 1) {
            return;
        }

        let offset = 0;
        this.lastResponse = World.currentTick;

        const path: number[] = [];
        let opcalled: boolean = false;

        while (this.client.inOffset > offset) {
            const packetType = ClientProt.byId[this.client.in[offset++]];
            let length = packetType.length;
            if (length == -1) {
                length = this.client.in[offset++];
            } else if (length == -2) {
                length = (this.client.in[offset++] << 8) | this.client.in[offset++];
            }
            const data = new Packet(this.client.in.slice(offset, offset + length));
            offset += length;

            const incoming = ClientProtRepository.get(packetType);
            if (incoming) {
                const message = incoming.decode(data);

                // todo: register these handlers in a different place / separate functions :)
                if (message instanceof RebuildGetMaps) {
                    const { maps: requested } = message;

                    for (let i = 0; i < requested.length; i++) {
                        const { type, x, z } = requested[i];

                        const CHUNK_SIZE = 1000 - 1 - 2 - 1 - 1 - 2 - 2;
                        if (type == 0) {
                            const land = PRELOADED.get(`m${x}_${z}`);
                            if (!land) {
                                continue;
                            }

                            for (let off = 0; off < land.length; off += CHUNK_SIZE) {
                                this.writeHighPriority(ServerProt.DATA_LAND, x, z, off, land.length, land.subarray(off, off + CHUNK_SIZE));
                            }

                            this.writeHighPriority(ServerProt.DATA_LAND_DONE, x, z);
                        } else if (type == 1) {
                            const loc = PRELOADED.get(`l${x}_${z}`);
                            if (!loc) {
                                continue;
                            }

                            for (let off = 0; off < loc.length; off += CHUNK_SIZE) {
                                this.writeHighPriority(ServerProt.DATA_LOC, x, z, off, loc.length, loc.subarray(off, off + CHUNK_SIZE));
                            }

                            this.writeHighPriority(ServerProt.DATA_LOC_DONE, x, z);
                        }
                    }
                } else if (message instanceof ClientCheat) {
                    const { input } = message;

                    if (input.length > 80) {
                        continue;
                    }

                    this.onCheat(input);
                } else if (message instanceof MessagePublic) {
                    const { color, effect, input } = message;

                    if (color < 0 || color > 11 || effect < 0 || effect > 2 || input.length > 100) {
                        continue;
                    }

                    this.messageColor = color;
                    this.messageEffect = effect;
                    this.messageType = 0;

                    const out = Packet.alloc(0);
                    WordPack.pack(out, WordEnc.filter(input));
                    this.message = new Uint8Array(out.pos);
                    out.pos = 0;
                    out.gdata(this.message, 0, this.message.length);
                    out.release();
                    this.mask |= Player.CHAT;

                    World.socialPublicMessage(this.username37, input);
                } else if (message instanceof IfPlayerDesign) {
                    const { gender, idkit, color } = message;

                    if (!this.allowDesign) {
                        continue;
                    }

                    if (gender > 1) {
                        continue;
                    }

                    let pass = true;
                    for (let i = 0; i < 7; i++) {
                        let type = i;
                        if (gender === 1) {
                            type += 7;
                        }

                        if (type == 8 && idkit[i] === -1) {
                            // female jaw is an exception
                            continue;
                        }

                        const idk = IdkType.get(idkit[i]);
                        if (!idk || idk.disable || idk.type != type) {
                            pass = false;
                            break;
                        }
                    }

                    if (!pass) {
                        continue;
                    }

                    for (let i = 0; i < 5; i++) {
                        if (color[i] >= Player.DESIGN_BODY_COLORS[i].length) {
                            pass = false;
                            break;
                        }
                    }

                    if (!pass) {
                        continue;
                    }

                    this.gender = gender;
                    this.body = idkit;
                    this.colors = color;
                    this.generateAppearance(InvType.getId('worn'));
                } else if (message instanceof TutorialClickSide) {
                    const { tab } = message;

                    if (tab < 0 || tab > 13) {
                        continue;
                    }

                    const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.TUTORIAL_CLICKSIDE, -1, -1);
                    if (script) {
                        this.executeScript(ScriptRunner.init(script, this), true);
                    }
                } else if (message instanceof CloseModal) {
                    this.closeModal();
                } else if (message instanceof ResumePauseButton) {
                    if (!this.activeScript || this.activeScript.execution !== ScriptState.PAUSEBUTTON) {
                        continue;
                    }

                    this.executeScript(this.activeScript, true);
                } else if (message instanceof ResumePCountDialog) {
                    const { input } = message;

                    if (!this.activeScript || this.activeScript.execution !== ScriptState.COUNTDIALOG) {
                        continue;
                    }

                    this.lastInt = input;
                    this.executeScript(this.activeScript, true);
                } else if (message instanceof IfButton) {
                    const { component: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    this.lastCom = comId;

                    if (this.resumeButtons.indexOf(this.lastCom) !== -1) {
                        if (this.activeScript) {
                            this.executeScript(this.activeScript, true);
                        }
                    } else {
                        const root = Component.get(com.rootLayer);

                        const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.IF_BUTTON, comId, -1);
                        if (script) {
                            this.executeScript(ScriptRunner.init(script, this), root.overlay == false);
                        } else {
                            if (Environment.LOCAL_DEV) {
                                this.messageGame(`No trigger for [if_button,${com.comName}]`);
                            }
                        }
                    }
                } else if (message instanceof InvButton) {
                    // jagex has if_button1-5
                    const { op, obj: item, slot, component: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !com.inventoryOptions || !com.inventoryOptions.length || !this.isComponentVisible(com)) {
                        continue;
                    }

                    if (!com.inventoryOptions[op - 1]) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.lastItem = item;
                    this.lastSlot = slot;

                    let trigger: ServerTriggerType;
                    if (op === 1) {
                        trigger = ServerTriggerType.INV_BUTTON1;
                    } else if (op === 2) {
                        trigger = ServerTriggerType.INV_BUTTON2;
                    } else if (op === 3) {
                        trigger = ServerTriggerType.INV_BUTTON3;
                    } else if (op === 4) {
                        trigger = ServerTriggerType.INV_BUTTON4;
                    } else {
                        trigger = ServerTriggerType.INV_BUTTON5;
                    }

                    const script = ScriptProvider.getByTrigger(trigger, comId, -1);
                    if (script) {
                        const root = Component.get(com.rootLayer);

                        this.executeScript(ScriptRunner.init(script, this), root.overlay == false);
                    } else {
                        if (Environment.LOCAL_DEV) {
                            this.messageGame(`No trigger for [${ServerTriggerType.toString(trigger)},${com.comName}]`);
                        }
                    }
                } else if (message instanceof InvButtonD) {
                    // jagex has if_buttond
                    const { component: comId, slot, targetSlot } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.get(slot) || !inv.validSlot(targetSlot)) {
                        continue;
                    }

                    if (this.delayed()) {
                        // do nothing; revert the client visual
                        this.writeHighPriority(ServerProt.UPDATE_INV_PARTIAL, comId, inv, [slot, targetSlot]);
                        continue;
                    }

                    this.lastSlot = slot;
                    this.lastTargetSlot = targetSlot;

                    const dragTrigger = ScriptProvider.getByTrigger(ServerTriggerType.INV_BUTTOND, comId);
                    if (dragTrigger) {
                        const root = Component.get(com.rootLayer);

                        this.executeScript(ScriptRunner.init(dragTrigger, this), root.overlay == false);
                    } else {
                        if (Environment.LOCAL_DEV) {
                            this.messageGame(`No trigger for [inv_buttond,${com.comName}]`);
                        }
                    }
                } else if (message instanceof OpHeld) {
                    const { obj: item, slot, component: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const type = ObjType.get(item);
                    if (
                        (packetType === ClientProt.OPHELD1 && ((type.iop && !type.iop[0]) || !type.iop)) ||
                        (packetType === ClientProt.OPHELD2 && ((type.iop && !type.iop[1]) || !type.iop)) ||
                        (packetType === ClientProt.OPHELD3 && ((type.iop && !type.iop[2]) || !type.iop)) ||
                        (packetType === ClientProt.OPHELD4 && ((type.iop && !type.iop[3]) || !type.iop))
                    ) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.lastItem = item;
                    this.lastSlot = slot;

                    this.clearInteraction();
                    this.closeModal();

                    let trigger: ServerTriggerType;
                    if (packetType === ClientProt.OPHELD1) {
                        trigger = ServerTriggerType.OPHELD1;
                    } else if (packetType === ClientProt.OPHELD2) {
                        trigger = ServerTriggerType.OPHELD2;
                    } else if (packetType === ClientProt.OPHELD3) {
                        trigger = ServerTriggerType.OPHELD3;
                    } else if (packetType === ClientProt.OPHELD4) {
                        trigger = ServerTriggerType.OPHELD4;
                    } else {
                        trigger = ServerTriggerType.OPHELD5;
                    }

                    const script = ScriptProvider.getByTrigger(trigger, type.id, type.category);
                    if (script) {
                        this.executeScript(ScriptRunner.init(script, this), true);
                    } else {
                        if (Environment.LOCAL_DEV) {
                            this.messageGame(`No trigger for [${ServerTriggerType.toString(trigger)},${type.debugname}]`);
                        }
                    }
                } else if (message instanceof OpHeldU) {
                    const { obj: item, slot, component: comId, useObj: useItem, useSlot, useComponent: useComId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const useCom = Component.get(comId);
                    if (typeof useCom === 'undefined' || !this.isComponentVisible(useCom)) {
                        continue;
                    }

                    {
                        const listener = this.invListeners.find(l => l.com === comId);
                        if (!listener) {
                            continue;
                        }

                        const inv = this.getInventoryFromListener(listener);
                        if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                            continue;
                        }
                    }

                    {
                        const listener = this.invListeners.find(l => l.com === useComId);
                        if (!listener) {
                            continue;
                        }

                        const inv = this.getInventoryFromListener(listener);
                        if (!inv || !inv.validSlot(useSlot) || !inv.hasAt(useSlot, useItem)) {
                            continue;
                        }
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.lastItem = item;
                    this.lastSlot = slot;
                    this.lastUseItem = useItem;
                    this.lastUseSlot = useSlot;

                    const objType = ObjType.get(this.lastItem);
                    const useObjType = ObjType.get(this.lastUseItem);

                    if ((objType.members || useObjType.members) && !World.members) {
                        this.messageGame("To use this item please login to a members' server.");
                        continue;
                    }

                    // [opheldu,b]
                    let script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, objType.id, -1);

                    // [opheldu,a]
                    if (!script) {
                        script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, useObjType.id, -1);
                        [this.lastItem, this.lastUseItem] = [this.lastUseItem, this.lastItem];
                        [this.lastSlot, this.lastUseSlot] = [this.lastUseSlot, this.lastSlot];
                    }

                    // [opheld,b_category]
                    const objCategory = objType.category !== -1 ? CategoryType.get(objType.category) : null;
                    if (!script && objCategory) {
                        script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, -1, objCategory.id);
                    }

                    // [opheld,a_category]
                    const useObjCategory = useObjType.category !== -1 ? CategoryType.get(useObjType.category) : null;
                    if (!script && useObjCategory) {
                        script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.OPHELDU, -1, useObjCategory.id);
                        [this.lastItem, this.lastUseItem] = [this.lastUseItem, this.lastItem];
                        [this.lastSlot, this.lastUseSlot] = [this.lastUseSlot, this.lastSlot];
                    }

                    this.clearInteraction();
                    this.closeModal();

                    if (script) {
                        this.executeScript(ScriptRunner.init(script, this), true);
                    } else {
                        if (Environment.LOCAL_DEV) {
                            this.messageGame(`No trigger for [opheldu,${objType.debugname}]`);
                        }

                        // todo: is this appropriate?
                        this.messageGame('Nothing interesting happens.');
                    }
                } else if (message instanceof OpHeldT) {
                    const { obj: item, slot, component: comId, spellComponent: spellComId} = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const spellCom = Component.get(comId);
                    if (typeof spellCom === 'undefined' || !this.isComponentVisible(spellCom)) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.lastItem = item;
                    this.lastSlot = slot;

                    this.clearInteraction();
                    this.closeModal();

                    const script = ScriptProvider.getByTrigger(ServerTriggerType.OPHELDT, spellComId, -1);
                    if (script) {
                        this.executeScript(ScriptRunner.init(script, this), true);
                    } else {
                        if (Environment.LOCAL_DEV) {
                            this.messageGame(`No trigger for [opheldt,${spellCom.comName}]`);
                        }

                        // todo: is this appropriate?
                        this.messageGame('Nothing interesting happens.');
                    }
                } else if (message instanceof OpLoc) {
                    const { x, z, loc: locId } = message;

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const loc = World.getLoc(x, z, this.level, locId);
                    if (!loc) {
                        this.unsetMapFlag();
                        continue;
                    }

                    const locType = LocType.get(loc.type);
                    if (!locType.op) {
                        continue;
                    }
                    if (
                        (packetType === ClientProt.OPLOC1 && !locType.op[0]) ||
                        (packetType === ClientProt.OPLOC2 && !locType.op[1]) ||
                        (packetType === ClientProt.OPLOC3 && !locType.op[2]) ||
                        (packetType === ClientProt.OPLOC4 && !locType.op[3]) ||
                        (packetType === ClientProt.OPLOC5 && !locType.op[4])
                    ) {
                        continue;
                    }

                    let mode: ServerTriggerType;
                    if (packetType === ClientProt.OPLOC1) {
                        mode = ServerTriggerType.APLOC1;
                    } else if (packetType === ClientProt.OPLOC2) {
                        mode = ServerTriggerType.APLOC2;
                    } else if (packetType === ClientProt.OPLOC3) {
                        mode = ServerTriggerType.APLOC3;
                    } else if (packetType === ClientProt.OPLOC4) {
                        mode = ServerTriggerType.APLOC4;
                    } else {
                        mode = ServerTriggerType.APLOC5;
                    }

                    this.setInteraction(Interaction.ENGINE, loc, mode);
                    opcalled = true;
                } else if (message instanceof OpLocU) {
                    const { x, z, loc: locId, useObj: item, useSlot: slot, useComponent: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    const loc = World.getLoc(x, z, this.level, locId);
                    if (!loc) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }
                    if (ObjType.get(item).members && !World.members) {
                        this.messageGame("To use this item please login to a members' server.");
                        continue;
                    }

                    this.lastUseItem = item;
                    this.lastUseSlot = slot;

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, loc, ServerTriggerType.APLOCU);
                    opcalled = true;
                } else if (message instanceof OpLocT) {
                    const { x, z, loc: locId, spellComponent: spellComId } = message;

                    const spellCom = Component.get(spellComId);
                    if (typeof spellCom === 'undefined' || !this.isComponentVisible(spellCom)) {
                        continue;
                    }

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const loc = World.getLoc(x, z, this.level, locId);
                    if (!loc) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, loc, ServerTriggerType.APLOCT, { type: loc.type, com: spellComId });
                    opcalled = true;
                } else if (message instanceof OpNpc) {
                    const { nid } = message;

                    const npc = World.getNpc(nid);
                    if (!npc || npc.delayed()) {
                        this.unsetMapFlag();
                        continue;
                    }

                    if (!this.npcs.has(npc.nid)) {
                        continue;
                    }

                    const npcType = NpcType.get(npc.type);
                    if (!npcType.op) {
                        continue;
                    }
                    if (
                        (packetType === ClientProt.OPNPC1 && !npcType.op[0]) ||
                        (packetType === ClientProt.OPNPC2 && !npcType.op[1]) ||
                        (packetType === ClientProt.OPNPC3 && !npcType.op[2]) ||
                        (packetType === ClientProt.OPNPC4 && !npcType.op[3]) ||
                        (packetType === ClientProt.OPNPC5 && !npcType.op[4])
                    ) {
                        continue;
                    }

                    let mode: ServerTriggerType;
                    if (packetType === ClientProt.OPNPC1) {
                        mode = ServerTriggerType.APNPC1;
                    } else if (packetType === ClientProt.OPNPC2) {
                        mode = ServerTriggerType.APNPC2;
                    } else if (packetType === ClientProt.OPNPC3) {
                        mode = ServerTriggerType.APNPC3;
                    } else if (packetType === ClientProt.OPNPC4) {
                        mode = ServerTriggerType.APNPC4;
                    } else {
                        mode = ServerTriggerType.APNPC5;
                    }

                    this.setInteraction(Interaction.ENGINE, npc, mode, { type: npc.type, com: -1 });
                    opcalled = true;
                } else if (message instanceof OpNpcU) {
                    const { nid, useObj: item, useSlot: slot, useComponent: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    const npc = World.getNpc(nid);
                    if (!npc || npc.delayed()) {
                        continue;
                    }

                    if (!this.npcs.has(npc.nid)) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    if (ObjType.get(item).members && !World.members) {
                        this.messageGame("To use this item please login to a members' server.");
                        continue;
                    }

                    this.lastUseItem = item;
                    this.lastUseSlot = slot;

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, npc, ServerTriggerType.APNPCU, { type: npc.type, com: -1 });
                    opcalled = true;
                } else if (message instanceof OpNpcT) {
                    const { nid, spellComponent: spellComId } = message;

                    const spellCom = Component.get(spellComId);
                    if (typeof spellCom === 'undefined' || !this.isComponentVisible(spellCom)) {
                        continue;
                    }

                    const npc = World.getNpc(nid);
                    if (!npc || npc.delayed()) {
                        continue;
                    }

                    if (!this.npcs.has(npc.nid)) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, npc, ServerTriggerType.APNPCT, { type: npc.type, com: spellComId });
                    opcalled = true;
                } else if (message instanceof OpObj) {
                    const { x, z, obj: objId } = message;

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const obj = World.getObj(x, z, this.level, objId);
                    if (!obj) {
                        this.unsetMapFlag();
                        continue;
                    }

                    const objType = ObjType.get(obj.type);
                    // todo: validate all options
                    if (
                        (packetType === ClientProt.OPOBJ1 && ((objType.op && !objType.op[0]) || !objType.op)) ||
                        (packetType === ClientProt.OPOBJ4 && ((objType.op && !objType.op[3]) || !objType.op))
                    ) {
                        continue;
                    }

                    let mode: ServerTriggerType;
                    if (packetType === ClientProt.OPOBJ1) {
                        mode = ServerTriggerType.APOBJ1;
                    } else if (packetType === ClientProt.OPOBJ2) {
                        mode = ServerTriggerType.APOBJ2;
                    } else if (packetType === ClientProt.OPOBJ3) {
                        mode = ServerTriggerType.APOBJ3;
                    } else if (packetType === ClientProt.OPOBJ4) {
                        mode = ServerTriggerType.APOBJ4;
                    } else {
                        mode = ServerTriggerType.APOBJ5;
                    }

                    this.setInteraction(Interaction.ENGINE, obj, mode);
                    opcalled = true;
                } else if (message instanceof OpObjU) {
                    const { x, z, obj: objId, useObj: item, useSlot: slot, useComponent: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    const obj = World.getObj(x, z, this.level, objId);
                    if (!obj) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    if (ObjType.get(item).members && !World.members) {
                        this.messageGame("To use this item please login to a members' server.");
                        continue;
                    }

                    this.lastUseItem = item;
                    this.lastUseSlot = slot;

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJU);
                    opcalled = true;
                } else if (message instanceof OpObjT) {
                    const { x, z, obj: objId, spellComponent: spellComId } = message;

                    const spellCom = Component.get(spellComId);
                    if (typeof spellCom === 'undefined' || !this.isComponentVisible(spellCom)) {
                        continue;
                    }

                    const absLeftX = this.loadedX - 52;
                    const absRightX = this.loadedX + 52;
                    const absTopZ = this.loadedZ + 52;
                    const absBottomZ = this.loadedZ - 52;
                    if (x < absLeftX || x > absRightX || z < absBottomZ || z > absTopZ) {
                        continue;
                    }

                    const obj = World.getObj(x, z, this.level, objId);
                    if (!obj) {
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, obj, ServerTriggerType.APOBJT, { type: obj.type, com: spellComId });
                    opcalled = true;
                } else if (message instanceof OpPlayer) {
                    const { pid } = message;

                    const player = World.getPlayer(pid);
                    if (!player) {
                        // does player exist?
                        continue;
                    }

                    if (!this.players.has(player.uid)) {
                        // are we aware of the player?
                        continue;
                    }

                    let mode: ServerTriggerType;
                    if (packetType === ClientProt.OPPLAYER1) {
                        mode = ServerTriggerType.APPLAYER1;
                    } else if (packetType === ClientProt.OPPLAYER2) {
                        mode = ServerTriggerType.APPLAYER2;
                    } else if (packetType === ClientProt.OPPLAYER3) {
                        mode = ServerTriggerType.APPLAYER3;
                    } else {
                        mode = ServerTriggerType.APPLAYER4;
                    }

                    this.setInteraction(Interaction.ENGINE, player, mode);
                    opcalled = true;
                } else if (message instanceof OpPlayerU) {
                    const { pid, useObj: item, useSlot: slot, useComponent: comId } = message;

                    const com = Component.get(comId);
                    if (typeof com === 'undefined' || !this.isComponentVisible(com)) {
                        continue;
                    }

                    const listener = this.invListeners.find(l => l.com === comId);
                    if (!listener) {
                        continue;
                    }

                    const inv = this.getInventoryFromListener(listener);
                    if (!inv || !inv.validSlot(slot) || !inv.hasAt(slot, item)) {
                        continue;
                    }

                    const player = World.getPlayer(pid);
                    if (!player) {
                        // does player exist?
                        continue;
                    }

                    if (!this.players.has(player.uid)) {
                        // are we aware of the player?
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }
                    if (ObjType.get(item).members && !World.members) {
                        this.messageGame("To use this item please login to a members' server.");
                        continue;
                    }

                    this.lastUseSlot = slot;

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, player, ServerTriggerType.APPLAYERU, { type: item, com: -1 });
                    opcalled = true;
                } else if (message instanceof OpPlayerT) {
                    const { pid, spellComponent: spellComId } = message;

                    const spellCom = Component.get(spellComId);
                    if (typeof spellCom === 'undefined' || !this.isComponentVisible(spellCom)) {
                        continue;
                    }

                    const player = World.getPlayer(pid);
                    if (!player) {
                        // does player exist?
                        continue;
                    }

                    if (!this.players.has(player.uid)) {
                        // are we aware of the player?
                        continue;
                    }

                    if (this.delayed()) {
                        continue;
                    }

                    this.clearInteraction();
                    this.closeModal();
                    this.setInteraction(Interaction.ENGINE, player, ServerTriggerType.APPLAYERT, { type: -1, com: spellComId });
                    opcalled = true;
                } else if (message instanceof FriendListAdd) {
                    const { username: other } = message;

                    World.socialAddFriend(this.username37, other);
                } else if (message instanceof FriendListDel) {
                    const { username: other } = message;

                    World.socialRemoveFriend(this.username37, other);
                } else if (message instanceof IgnoreListAdd) {
                    const { username: other } = message;

                    World.socialAddIgnore(this.username37, other);
                } else if (message instanceof IgnoreListDel) {
                    const { username: other } = message;

                    World.socialRemoveIgnore(this.username37, other);
                } else if (message instanceof IdleTimer) {
                    if (!Environment.LOCAL_DEV) {
                        this.logout();
                        this.logoutRequested = true;
                    }
                } else if (message instanceof MessagePrivate) {
                    const { username, input } = message;

                    World.socialPrivateMessage(this.username37, username, input);
                }
            } else if (packetType === ClientProt.MOVE_GAMECLICK || packetType === ClientProt.MOVE_MINIMAPCLICK || packetType === ClientProt.MOVE_OPCLICK) {
                const running: number = data.g1();
                const startX: number = data.g2();
                const startZ: number = data.g2();
                const offset: number = packetType === ClientProt.MOVE_MINIMAPCLICK ? 14 : 0;
                const waypoints: number = (data.available - offset) >> 1;

                path[0] = Position.packCoord(this.level, startX, startZ);

                if (waypoints !== 0) {
                    if (Environment.CLIENT_PATHFINDER) {
                        for (let index: number = 1; index <= waypoints && index < 25; index++) {
                            path[index] = Position.packCoord(this.level, data.g1b() + startX, data.g1b() + startZ);
                        }
                    } else {
                        // Just grab the last one we need skip the rest.
                        data.pos += (waypoints - 1) << 1;
                        path[0] = Position.packCoord(this.level, data.g1b() + startX, data.g1b() + startZ);
                    }
                }

                if (this.delayed() || running < 0 || running > 1 || Position.distanceToSW(this, {x: startX, z: startZ}) > 104) {
                    this.unsetMapFlag();
                    path.length = 0;
                    continue;
                }

                if (packetType !== ClientProt.MOVE_OPCLICK) {
                    this.clearInteraction();
                    this.closeModal();
                }

                if (this.runenergy < 100) {
                    this.setVar(VarPlayerType.getId('temp_run'), 0);
                } else {
                    this.setVar(VarPlayerType.getId('temp_run'), running);
                }
            } else {
                // console.log('Unhandled packet');
            }
        }

        this.client?.reset();

        if (path.length > 0 || opcalled) {
            if (this.delayed()) {
                this.unsetMapFlag();
                return;
            }

            if (!this.target || this.target instanceof Loc || this.target instanceof Obj) {
                this.faceEntity = -1;
                this.mask |= Player.FACE_ENTITY;
            }

            if (opcalled && (path.length === 0 || !Environment.CLIENT_PATHFINDER)) {
                this.pathToTarget();
                return;
            }

            if (Environment.CLIENT_PATHFINDER) {
                this.queueWaypoints(path);
            } else {
                const { x, z } = Position.unpackCoord(path[0]);
                this.queueWaypoints(findPath(this.level, this.x, this.z, x, z));
            }
        }
    }

    encodeOut() {
        if (!this.client) {
            return;
        }

        if (this.modalTop !== this.lastModalTop || this.modalBottom !== this.lastModalBottom || this.modalSidebar !== this.lastModalSidebar || this.refreshModalClose) {
            if (this.refreshModalClose) {
                this.writeLowPriority(ServerProt.IF_CLOSE);
            }
            this.refreshModalClose = false;

            this.lastModalTop = this.modalTop;
            this.lastModalBottom = this.modalBottom;
            this.lastModalSidebar = this.modalSidebar;
        }

        if (this.refreshModal) {
            if ((this.modalState & 1) === 1 && (this.modalState & 4) === 4) {
                this.writeLowPriority(ServerProt.IF_OPENMAINSIDEMODAL, this.modalTop, this.modalSidebar);
            } else if ((this.modalState & 1) === 1) {
                this.writeLowPriority(ServerProt.IF_OPENMAINMODAL, this.modalTop);
            } else if ((this.modalState & 2) === 2) {
                this.writeLowPriority(ServerProt.IF_OPENCHATMODAL, this.modalBottom);
            } else if ((this.modalState & 4) === 4) {
                this.writeLowPriority(ServerProt.IF_OPENSIDEMODAL, this.modalSidebar);
            }

            this.refreshModal = false;
        }

        for (let packet: Packet | null = this.highPriorityOut.head(); packet !== null; packet = this.highPriorityOut.next()) {
            if (this.client.encryptor) {
                packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
            }
            World.lastCycleBandwidth[1] += packet.pos;

            this.client.write(packet);
            packet.release();
            packet.uncache();
        }

        for (let packet: Packet | null = this.lowPriorityOut.head(); packet !== null; packet = this.lowPriorityOut.next()) {
            if (this.client.encryptor) {
                packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
            }
            World.lastCycleBandwidth[1] += packet.pos;

            this.client.write(packet);
            packet.release();
            packet.uncache();
        }

        this.client.flush();
    }

    writeImmediately(packet: Packet) {
        if (!this.client) {
            return;
        }

        if (this.client.encryptor) {
            packet.data[0] = (packet.data[0] + this.client.encryptor.nextInt()) & 0xff;
        }

        this.client.write(packet);
        this.client.flush();
    }

    override logout() {
        const out = new Packet(new Uint8Array(1));
        out.p1(ServerProt.LOGOUT.id);

        this.writeImmediately(out);
    }

    override terminate() {
        this.client?.terminate();
        this.client = null;
    }

    override playerLog(message: string, ...args: string[]): void {
        if (args.length > 0) {
            fs.appendFileSync(`data/players/${this.username}.log`, `[${new Date().toISOString().split('T')[0]} ${this.client?.remoteAddress}]: ${message} ${args.join(' ')}\n`);
        } else {
            fs.appendFileSync(`data/players/${this.username}.log`, `[${new Date().toISOString().split('T')[0]} ${this.client?.remoteAddress}]: ${message}\n`);
        }
    }
}

export function isNetworkPlayer(player: Player): player is NetworkPlayer {
    return (player as NetworkPlayer).client !== null && (player as NetworkPlayer).client !== undefined;
}
