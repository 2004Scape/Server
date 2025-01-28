import 'dotenv/config';

import Packet from '#/io/Packet.js';
import {toDisplayName} from '#/util/JString.js';

import FontType from '#/cache/config/FontType.js';
import Component from '#/cache/config/Component.js';
import InvType from '#/cache/config/InvType.js';
import LocType from '#/cache/config/LocType.js';
import NpcType from '#/cache/config/NpcType.js';
import ObjType from '#/cache/config/ObjType.js';
import ScriptVarType from '#/cache/config/ScriptVarType.js';
import SeqType from '#/cache/config/SeqType.js';
import VarPlayerType from '#/cache/config/VarPlayerType.js';
import ParamType from '#/cache/config/ParamType.js';
import {ParamHelper} from '#/cache/config/ParamHelper.js';

import BlockWalk from '#/engine/entity/BlockWalk.js';
import {EntityTimer, PlayerTimerType} from '#/engine/entity/EntityTimer.js';
import {EntityQueueRequest, PlayerQueueType, QueueType, ScriptArgument} from '#/engine/entity/EntityQueueRequest.js';
import Loc from '#/engine/entity/Loc.js';
import Npc from '#/engine/entity/Npc.js';
import MoveRestrict from '#/engine/entity/MoveRestrict.js';
import Obj from '#/engine/entity/Obj.js';
import PathingEntity from '#/engine/entity/PathingEntity.js';
import {CoordGrid} from '#/engine/CoordGrid.js';
import CameraInfo from '#/engine/entity/CameraInfo.js';
import MoveSpeed from '#/engine/entity/MoveSpeed.js';
import EntityLifeCycle from '#/engine/entity/EntityLifeCycle.js';
import {PlayerStat, PlayerStatEnabled, PlayerStatFree} from '#/engine/entity/PlayerStat.js';
import MoveStrategy from '#/engine/entity/MoveStrategy.js';
import BuildArea from '#/engine/entity/BuildArea.js';
import HeroPoints from '#/engine/entity/HeroPoints.js';
import {isClientConnected} from '#/engine/entity/NetworkPlayer.js';

import {Inventory} from '#/engine/Inventory.js';
import World from '#/engine/World.js';

import ScriptFile from '#/engine/script/ScriptFile.js';
import ScriptProvider from '#/engine/script/ScriptProvider.js';
import ScriptRunner from '#/engine/script/ScriptRunner.js';
import ScriptState from '#/engine/script/ScriptState.js';
import ServerTriggerType from '#/engine/script/ServerTriggerType.js';
import ScriptPointer from '#/engine/script/ScriptPointer.js';

import LinkList from '#/util/LinkList.js';
import DoublyLinkList from '#/util/DoublyLinkList.js';

import {CollisionFlag} from '@2004scape/rsmod-pathfinder';

import {PRELOADED, PRELOADED_CRC} from '#/cache/PreloadedPacks.js';

import OutgoingMessage from '#/network/server/OutgoingMessage.js';
import IfClose from '#/network/server/model/IfClose.js';
import UpdateUid192 from '#/network/server/model/UpdateUid192.js';
import ResetAnims from '#/network/server/model/ResetAnims.js';
import ResetClientVarCache from '#/network/server/model/ResetClientVarCache.js';
import TutOpen from '#/network/server/model/TutOpen.js';
import UpdateInvStopTransmit from '#/network/server/model/UpdateInvStopTransmit.js';
import VarpSmall from '#/network/server/model/VarpSmall.js';
import VarpLarge from '#/network/server/model/VarpLarge.js';
import MidiSong from '#/network/server/model/MidiSong.js';
import MidiJingle from '#/network/server/model/MidiJingle.js';
import IfSetTab from '#/network/server/model/IfSetTab.js';
import UnsetMapFlag from '#/network/server/model/UnsetMapFlag.js';
import HintArrow from '#/network/server/model/HintArrow.js';
import LastLoginInfo from '#/network/server/model/LastLoginInfo.js';
import MessageGame from '#/network/server/model/MessageGame.js';
import ServerProtPriority from '#/network/server/prot/ServerProtPriority.js';
import ChatFilterSettings from '#/network/server/model/ChatFilterSettings.js';
import InfoProt from '#/network/rs225/server/prot/InfoProt.js';
import WalkTriggerSetting from '#/util/WalkTriggerSetting.js';

import Environment from '#/util/Environment.js';
import { ChatModePrivate, ChatModePublic, ChatModeTradeDuel } from '#/util/ChatModes.js';
import LoggerEventType from '#/server/logger/LoggerEventType.js';

const levelExperience = new Int32Array(99);

let acc = 0;
for (let i = 0; i < 99; i++) {
    const level = i + 1;
    const delta = Math.floor(level + Math.pow(2.0, level / 7.0) * 300.0);
    acc += delta;
    levelExperience[i] = Math.floor(acc / 4) * 10;
}

export function getLevelByExp(exp: number) {
    for (let i = 98; i >= 0; i--) {
        if (exp >= levelExperience[i]) {
            return Math.min(i + 2, 99);
        }
    }

    return 1;
}

export function getExpByLevel(level: number) {
    return levelExperience[level - 2];
}

export default class Player extends PathingEntity {
    static readonly DESIGN_BODY_COLORS: number[][] = [
        [6798, 107, 10283, 16, 4797, 7744, 5799, 4634, 33697, 22433, 2983, 54193],
        [8741, 12, 64030, 43162, 7735, 8404, 1701, 38430, 24094, 10153, 56621, 4783, 1341, 16578, 35003, 25239],
        [25238, 8742, 12, 64030, 43162, 7735, 8404, 1701, 38430, 24094, 10153, 56621, 4783, 1341, 16578, 35003],
        [4626, 11146, 6439, 12, 4758, 10270],
        [4550, 4537, 5681, 5673, 5790, 6806, 8076, 4574]
    ];

    save() {
        const sav = Packet.alloc(1);
        sav.p2(0x2004); // magic
        sav.p2(5); // version

        sav.p2(this.x);
        sav.p2(this.z);
        sav.p1(this.level);
        for (let i = 0; i < 7; i++) {
            sav.p1(this.body[i]);
        }
        for (let i = 0; i < 5; i++) {
            sav.p1(this.colors[i]);
        }
        sav.p1(this.gender);
        sav.p2(this.runenergy);
        sav.p4(this.playtime);

        for (let i = 0; i < 21; i++) {
            sav.p4(this.stats[i]);
            sav.p1(this.levels[i]);
        }

        sav.p2(this.vars.length);
        for (let i = 0; i < this.vars.length; i++) {
            const type = VarPlayerType.get(i);

            if (type.scope === VarPlayerType.SCOPE_PERM) {
                sav.p4(this.vars[i]);
            } else {
                sav.p4(0);
            }
        }

        let invCount = 0;
        const invStartPos = sav.pos;
        sav.p1(0); // placeholder for saved inventory count
        for (const [typeId, inventory] of this.invs) {
            const invType = InvType.get(typeId);
            if (invType.scope !== InvType.SCOPE_PERM) {
                continue;
            }

            sav.p2(typeId);
            sav.p2(inventory.capacity);
            for (let slot = 0; slot < inventory.capacity; slot++) {
                const obj = inventory.get(slot);
                if (!obj) {
                    sav.p2(0);
                    continue;
                }

                sav.p2(obj.id + 1);
                if (obj.count >= 255) {
                    sav.p1(255);
                    sav.p4(obj.count);
                } else {
                    sav.p1(obj.count);
                }
            }
            invCount++;
        }
        // set the total saved inv count as the placeholder
        sav.data[invStartPos] = invCount;

        sav.p1(this.afkZones.length);
        for (let index: number = 0; index < this.afkZones.length; index++) {
            sav.p4(this.afkZones[index]);
        }
        sav.p2(this.lastAfkZone);
        sav.p1((this.publicChat << 4) | (this.privateChat << 2) | this.tradeDuel);

        sav.p4(Packet.getcrc(sav.data, 0, sav.pos));
        return sav.data.subarray(0, sav.pos);
    }

    // constructor properties
    username: string;
    username37: bigint;
    hash64: bigint;
    displayName: string;
    body: number[] = [
        0, // hair
        10, // beard
        18, // body
        26, // arms
        33, // gloves
        36, // legs
        42 // boots
    ];
    colors: number[] = [0, 0, 0, 0, 0];
    gender: number = 0;
    run: number = 0;
    tempRun: number = 0;
    runenergy: number = 10000;
    lastRunEnergy: number = -1;
    runweight: number = 0;
    playtime: number = 0;
    stats: Int32Array = new Int32Array(21);
    levels: Uint8Array = new Uint8Array(21);
    vars: Int32Array;
    varsString: string[];
    invs: Map<number, Inventory> = new Map<number, Inventory>();

    publicChat: ChatModePublic = ChatModePublic.ON;
    privateChat: ChatModePrivate = ChatModePrivate.ON;
    tradeDuel: ChatModeTradeDuel = ChatModeTradeDuel.ON;

    // runtime variables
    pid: number = -1;
    uid: number = -1;
    reconnecting: boolean = false;
    lowMemory: boolean = false;
    webClient: boolean = false;
    combatLevel: number = 3;
    headicons: number = 0;
    appearance: Uint8Array | null = null; // cached appearance
    lastAppearance: number = 0;
    baseLevels = new Uint8Array(21);
    lastStats: Int32Array = new Int32Array(21); // we track this so we know to flush stats only once a tick on changes
    lastLevels: Uint8Array = new Uint8Array(21); // we track this so we know to flush stats only once a tick on changes
    originX: number = -1;
    originZ: number = -1;
    buildArea: BuildArea = new BuildArea();
    basReadyAnim: number = -1;
    basTurnOnSpot: number = -1;
    basWalkForward: number = -1;
    basWalkBackward: number = -1;
    basWalkLeft: number = -1;
    basWalkRight: number = -1;
    basRunning: number = -1;
    animProtect: number = 0;
    invListeners: {
        type: number; // InvType
        com: number; // Component
        source: number; // uid or -1 for world
        firstSeen: boolean;
    }[] = [];
    allowDesign: boolean = false;
    afkEventReady: boolean = false;
    interactWalkTrigger: boolean = false;
    moveClickRequest: boolean = false;

    loggedOut: boolean = false; // pending logout processing
    tryLogout: boolean = false; // logout requested (you *really* need to be sure the logout if_button logic matches the logout trigger...)

    // not stored as a byte buffer so we can write and encrypt opcodes later
    buffer: DoublyLinkList<OutgoingMessage> = new DoublyLinkList();
    lastResponse = -1;

    messageColor: number | null = null;
    messageEffect: number | null = null;
    messageType: number | null = null;
    message: Uint8Array | null = null;

    // ---

    // script variables
    queue: LinkList<EntityQueueRequest> = new LinkList();
    weakQueue: LinkList<EntityQueueRequest> = new LinkList();
    engineQueue: LinkList<EntityQueueRequest> = new LinkList();
    cameraPackets: LinkList<CameraInfo> = new LinkList();
    timers: Map<number, EntityTimer> = new Map();
    tabs: number[] = new Array(14).fill(-1);
    modalState = 0; // 1 - main, 2 - chat, 4 - side, 8 - tutorial
    modalMain = -1;
    lastModalMain = -1;
    modalChat = -1;
    lastModalChat = -1;
    modalSide = -1;
    lastModalSide = -1;
    modalTutorial = -1;
    refreshModal = false;
    refreshModalClose = false;
    requestModalClose = false;

    protect: boolean = false; // whether protected access is available
    activeScript: ScriptState | null = null;
    resumeButtons: number[] = [];

    lastItem: number = -1; // opheld, opheldu, opheldt, inv_button
    lastSlot: number = -1; // opheld, opheldu, opheldt, inv_button, inv_buttond
    lastUseItem: number = -1; // opheldu, opobju, oplocu, opnpcu, opplayeru
    lastUseSlot: number = -1; // opheldu, opobju, oplocu, opnpcu, opplayeru
    lastTargetSlot: number = -1; // inv_buttond
    lastCom: number = -1; // if_button

    staffModLevel: number = 0;

    heroPoints: HeroPoints = new HeroPoints(16); // be sure to reset when stats are recovered/reset

    afkZones: Int32Array = new Int32Array(2);
    lastAfkZone: number = 0;

    // movement triggers
    lastMapZone: number = -1;
    lastZone: number = -1;

    muted_until: Date | null = null;

    constructor(username: string, username37: bigint, hash64: bigint) {
        super(0, 3094, 3106, 1, 1, EntityLifeCycle.FOREVER, MoveRestrict.NORMAL, BlockWalk.NPC, MoveStrategy.SMART, InfoProt.PLAYER_FACE_COORD.id, InfoProt.PLAYER_FACE_ENTITY.id); // tutorial island.
        this.username = username;
        this.username37 = username37;
        this.hash64 = hash64;
        this.displayName = toDisplayName(username);
        this.vars = new Int32Array(VarPlayerType.count);
        this.varsString = new Array(VarPlayerType.count);
        this.lastStats.fill(-1);
        this.lastLevels.fill(-1);
    }

    cleanup(): void {
        this.pid = -1;
        this.uid = -1;
        this.activeScript = null;
        this.invListeners.length = 0;
        this.resumeButtons.length = 0;
        this.buffer.clear();
        this.queue.clear();
        this.weakQueue.clear();
        this.engineQueue.clear();
        this.cameraPackets.clear();
        this.timers.clear();
        this.heroPoints.clear();
        this.buildArea.clear();
    }

    resetEntity(respawn: boolean) {
        if (respawn) {
            this.unfocus();
        }
        super.resetPathingEntity();
        this.repathed = false;
        this.protect = false;
        this.messageColor = null;
        this.messageEffect = null;
        this.messageType = null;
        this.message = null;
    }

    // ----

    onLogin() {
        // normalize client between logins
        this.write(new IfClose());
        this.write(new UpdateUid192(this.pid));
        this.unsetMapFlag();
        this.write(new ResetAnims());
        this.write(new ResetClientVarCache());
        for (let varp = 0; varp < this.vars.length; varp++) {
            const type = VarPlayerType.get(varp);
            const value = this.vars[varp];
            if (type.transmit) {
                this.writeVarp(varp, value);
            }
        }
        this.write(new ChatFilterSettings(this.publicChat, this.privateChat, this.tradeDuel));

        const loginTrigger = ScriptProvider.getByTriggerSpecific(ServerTriggerType.LOGIN, -1, -1);
        if (loginTrigger) {
            this.executeScript(ScriptRunner.init(loginTrigger, this), true);
        }

        this.lastStepX = this.x - 1;
        this.lastStepZ = this.z;
    }

    triggerMapzone(x: number, z: number) {
        // todo: getByTrigger needs more bits to lookup by coord
        const trigger = ScriptProvider.getByName(`[mapzone,0_${x >> 6}_${z >> 6}]`);
        if (trigger) {
            this.enqueueScript(trigger, PlayerQueueType.ENGINE);
        }
    }

    triggerMapzoneExit(x: number, z: number) {
        const trigger = ScriptProvider.getByName(`[mapzoneexit,0_${x >> 6}_${z >> 6}]`);
        if (trigger) {
            this.enqueueScript(trigger, PlayerQueueType.ENGINE);
        }
    }

    triggerZone(level: number, x: number, z: number) {
        const mx = x >> 6;
        const mz = z >> 6;
        const lx = (x & 0x3f) >> 3 << 3;
        const lz = (z & 0x3f) >> 3 << 3;
        const trigger = ScriptProvider.getByName(`[zone,${level}_${mx}_${mz}_${lx}_${lz}]`);
        if (trigger) {
            this.enqueueScript(trigger, PlayerQueueType.ENGINE);
        }
    }

    triggerZoneExit(level: number, x: number, z: number) {
        const mx = x >> 6;
        const mz = z >> 6;
        const lx = (x & 0x3f) >> 3 << 3;
        const lz = (z & 0x3f) >> 3 << 3;
        const trigger = ScriptProvider.getByName(`[zoneexit,${level}_${mx}_${mz}_${lx}_${lz}]`);
        if (trigger) {
            this.enqueueScript(trigger, PlayerQueueType.ENGINE);
        }
    }

    calculateRunWeight() {
        this.runweight = 0;

        const invs = this.invs.values();
        for (let i = 0; i < this.invs.size; i++) {
            const inv = invs.next().value;
            if (!inv) {
                continue;
            }

            const invType = InvType.get(inv.type);
            if (!invType || !invType.runweight) {
                continue;
            }

            for (let slot = 0; slot < inv.capacity; slot++) {
                const item = inv.get(slot);
                if (!item) {
                    continue;
                }

                const type = ObjType.get(item.id);
                if (!type || type.stackable) {
                    continue;
                }

                this.runweight += type.weight * item.count;
            }
        }
    }

    addSessionLog(event_type: LoggerEventType, message: string, ...args: string[]): void {
        World.addSessionLog(event_type, this.username, 'headless', CoordGrid.packCoord(this.level, this.x, this.z), message, ...args);
    }

    addWealthLog(change: number, message: string, ...args: string[]) {
        World.addSessionLog(LoggerEventType.WEALTH, this.username, 'headless', CoordGrid.packCoord(this.level, this.x, this.z), change + ';' + message, ...args);
    }

    processEngineQueue() {
        for (let request = this.engineQueue.head(); request !== null; request = this.engineQueue.next()) {
            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                const script = ScriptRunner.init(request.script, this, null, request.args);
                this.executeScript(script, true);

                request.unlink();
            }
        }
    }

    // ----

    updateMovement(repathAllowed: boolean = true): boolean {
        // players cannot walk if they have a modal open *and* something in their queue, confirmed as far back as 2005
        if (this.moveClickRequest && this.busy() && (this.queue.head() != null || this.engineQueue.head() != null || this.walktrigger !== -1)) {
            this.recoverEnergy(false);
            return false;
        }

        if (Environment.NODE_WALKTRIGGER_SETTING === WalkTriggerSetting.PLAYERMOVEMENT && !this.target && this.hasWaypoints()) {
            this.processWalktrigger();
        }
        if (repathAllowed && this.target instanceof PathingEntity && !this.interacted && this.walktrigger === -1) {
            this.pathToPathingTarget();
        }
        if (this.moveSpeed !== MoveSpeed.INSTANT) {
            this.moveSpeed = this.defaultMoveSpeed();
            if (this.basRunning === -1) {
                this.moveSpeed = MoveSpeed.WALK;
            } else if (this.tempRun) {
                this.moveSpeed = MoveSpeed.RUN;
            }
        }

        if (!super.processMovement()) {
            // todo: this is running every idle tick
            this.tempRun = 0;
        }

        const moved = this.lastTickX !== this.x || this.lastTickZ !== this.z;
        this.drainEnergy(moved);
        this.recoverEnergy(moved);
        if (this.runenergy === 0) {
            this.run = 0;
            // todo: better way to sync engine varp
            this.setVar(VarPlayerType.RUN, this.run);
        }
        if (this.runenergy < 100) {
            this.tempRun = 0;
        }
        if (moved) {
            this.lastMovement = World.currentTick + 1;
        }
        return moved;
    }

    private drainEnergy(moved: boolean): void {
        if (!moved || this.stepsTaken === 0) {
            return;
        }
        if (!this.delayed && this.moveSpeed === MoveSpeed.RUN && this.stepsTaken > 1) {
            const weightKg = Math.floor(this.runweight / 1000);
            const clampWeight = Math.min(Math.max(weightKg, 0), 64);
            const loss = (67 + (67 * clampWeight) / 64) | 0;
            this.runenergy = Math.max(this.runenergy - loss, 0);
        }
    }

    private recoverEnergy(moved: boolean): void {
        if (!this.delayed && (!moved || this.moveSpeed !== MoveSpeed.RUN) && this.runenergy < 10000) {
            const recovered = (this.baseLevels[PlayerStat.AGILITY] / 9 | 0) + 8;
            this.runenergy = Math.min(this.runenergy + recovered, 10000);
        }
    }

    blockWalkFlag(): CollisionFlag {
        return CollisionFlag.PLAYER;
    }

    defaultMoveSpeed(): MoveSpeed {
        return this.run ? MoveSpeed.RUN : MoveSpeed.WALK;
    }

    // ----

    closeTutorial() {
        if (this.modalTutorial !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType.IF_CLOSE, this.modalTutorial);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, PlayerQueueType.ENGINE);
            }

            this.modalTutorial = -1;
            this.write(new TutOpen(-1));
        }
    }

    closeModal() {
        this.weakQueue.clear();

        if (!this.delayed) {
            this.protect = false;
        }

        if (this.modalState === 0) {
            return;
        }

        if (this.modalMain !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType.IF_CLOSE, this.modalMain);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, PlayerQueueType.ENGINE);
            }

            this.modalMain = -1;
        }

        if (this.modalChat !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType.IF_CLOSE, this.modalChat);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, PlayerQueueType.ENGINE);
            }

            this.modalChat = -1;
        }

        if (this.modalSide !== -1) {
            const closeTrigger = ScriptProvider.getByTrigger(ServerTriggerType.IF_CLOSE, this.modalSide);
            if (closeTrigger) {
                this.enqueueScript(closeTrigger, PlayerQueueType.ENGINE);
            }

            this.modalSide = -1;
        }

        this.modalState = 0;
        this.refreshModalClose = true;
    }

    containsModalInterface() {
        // main or chat is open
        return (this.modalState & 1) !== 0 || (this.modalState & 2) !== 0;
    }

    busy() {
        return this.delayed || this.containsModalInterface();
    }

    canAccess() {
        if (World.shutdown) {
            // once the world has gone past shutting down, no protection rules apply
            return true;
        } else {
            return !this.protect && !this.busy();
        }
    }

    /**
     *
     * @param script
     * @param {QueueType} type
     * @param delay
     * @param args
     */
    enqueueScript(script: ScriptFile, type: QueueType = PlayerQueueType.NORMAL, delay = 0, args: ScriptArgument[] = []) {
        const request = new EntityQueueRequest(type, script, args, delay);
        if (type === PlayerQueueType.ENGINE) {
            request.delay = 0;
            this.engineQueue.addTail(request);
        } else if (type === PlayerQueueType.WEAK) {
            this.weakQueue.addTail(request);
        } else {
            this.queue.addTail(request);
        }
    }

    unlinkQueuedScript(scriptId: number, type: QueueType = PlayerQueueType.NORMAL) {
        if (type === PlayerQueueType.ENGINE) {
            for (let request = this.engineQueue.head(); request !== null; request = this.engineQueue.next()) {
                if (request.script.id === scriptId) {
                    request.unlink();
                }
            }
        } else {
            for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
                if (request.script.id === scriptId) {
                    request.unlink();
                }
            }
            for (let request = this.weakQueue.head(); request !== null; request = this.weakQueue.next()) {
                if (request.script.id === scriptId) {
                    request.unlink();
                }
            }
        }

    }

    processQueues() {
        // the presence of a strong script closes modals before queue runs
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            if (request.type === PlayerQueueType.STRONG) {
                this.requestModalClose = true;
                break;
            }
        }
        if (this.requestModalClose) {
            this.requestModalClose = false;
            this.closeModal();
        }

        this.processQueue();
        this.processWeakQueue();
    }

    processQueue() {
        // there is a quirk with their LinkList impl that results in a queue speedup bug:
        // in .head() the next link is cached. on the next iteration, next() will use this cached value, even if it's null
        // regardless of whether the end of the list has been reached (i.e. the previous iteration added to the end of the list)
        // - thank you De0 for the explanation
        // essentially, if a script is before the end of the list, it can be processed this tick and result in inconsistent queue timing (authentic)
        for (let request = this.queue.head(); request !== null; request = this.queue.next()) {
            if (this.tryLogout && request.type === PlayerQueueType.LONG) {
                const logoutAction = request.args.shift();
                if (logoutAction === 0) {
                    // ^accelerate
                    request.delay = 0;
                } else {
                    // ^discard
                    request.unlink();
                    continue;
                }
            }

            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                request.unlink();

                const save = this.queue.cursor; // LinkList-specific behavior so we can getqueue/clearqueue inside of this

                const script = ScriptRunner.init(request.script, this, null, request.args);
                this.executeScript(script, true);

                this.queue.cursor = save;
            }
        }
    }

    processWeakQueue() {
        for (let request = this.weakQueue.head(); request !== null; request = this.weakQueue.next()) {
            const delay = request.delay--;
            if (this.canAccess() && delay <= 0) {
                request.unlink();

                const save = this.queue.cursor; // LinkList-specific behavior so we can getqueue/clearqueue inside of this

                const script = ScriptRunner.init(request.script, this, null, request.args);
                this.executeScript(script, true);

                this.queue.cursor = save;
            }
        }
    }

    setTimer(type: PlayerTimerType, script: ScriptFile, args: ScriptArgument[] = [], interval: number) {
        const timerId = script.id;
        const timer = {
            type,
            script,
            args,
            interval,
            clock: interval
        };

        this.timers.set(timerId, timer);
    }

    clearTimer(timerId: number) {
        this.timers.delete(timerId);
    }

    processTimers(type: PlayerTimerType) {
        for (const timer of this.timers.values()) {
            if (type !== timer.type) {
                continue;
            }

            // only execute if it's time and able
            // soft timers can execute while busy, normal cannot
            if (--timer.clock <= 0 && (timer.type === PlayerTimerType.SOFT || this.canAccess())) {
                // set clock back to interval
                timer.clock = timer.interval;

                const script = ScriptRunner.init(timer.script, this, null, timer.args);
                this.executeScript(script, timer.type === PlayerTimerType.NORMAL);
            }
        }
    }

    // clear current interaction and walk queue
    stopAction() {
        this.clearPendingAction();
        this.unsetMapFlag();
    }

    // clear current interaction but leave walk queue intact
    clearPendingAction() {
        this.clearInteraction();
        this.closeModal();
    }

    hasInteraction() {
        return this.target !== null;
    }

    getOpTrigger() {
        if (!this.target) {
            return null;
        }

        let typeId = -1;
        let categoryId = -1;

        // prio trigger details by target<type<com
        if (this.target instanceof Npc || this.target instanceof Loc || this.target instanceof Obj) {
            const type = this.target instanceof Npc ? NpcType.get(this.target.type) : this.target instanceof Loc ? LocType.get(this.target.type) : ObjType.get(this.target.type);
            typeId = type.id;
            categoryId = type.category;
        }
        if (this.targetSubject.type !== -1) {
            typeId = this.targetSubject.type;
        }
        if (this.targetSubject.com !== -1) {
            typeId = this.targetSubject.com;
        }

        return ScriptProvider.getByTrigger(this.targetOp + 7, typeId, categoryId) ?? null;
    }

    getApTrigger() {
        if (!this.target) {
            return null;
        }

        let typeId = -1;
        let categoryId = -1;

        // prio trigger details by target<type<com
        if (this.target instanceof Npc || this.target instanceof Loc || this.target instanceof Obj) {
            const type = this.target instanceof Npc ? NpcType.get(this.target.type) : this.target instanceof Loc ? LocType.get(this.target.type) : ObjType.get(this.target.type);
            typeId = type.id;
            categoryId = type.category;
        }
        if (this.targetSubject.type !== -1) {
            typeId = this.targetSubject.type;
        }
        if (this.targetSubject.com !== -1) {
            typeId = this.targetSubject.com;
        }

        return ScriptProvider.getByTrigger(this.targetOp, typeId, categoryId) ?? null;
    }
    // https://youtu.be/_NmFftkMm0I?si=xSgb8GCydgUXUayR&t=79
    // to allow p_walk (sets player destination tile) during walktriggers
    // we process walktriggers from regular movement in client input, 
    // and for each interaction.
    processWalktrigger() {
        if (this.walktrigger !== -1 && (!this.protect && !this.delayed)) {
            const trigger = ScriptProvider.get(this.walktrigger);
            this.walktrigger = -1;
            if (trigger) {
                const script = ScriptRunner.init(trigger, this);
                this.runScript(script, true);
            }
        }
    }

    processInteraction() {
        if (this.target === null || !this.canAccess()) {
            this.updateMovement(false);
            return;
        }

        if (this.target.level !== this.level) {
            this.clearInteraction();
            this.unsetMapFlag(); // assuming its right
            return;
        }

        if (this.target instanceof Npc && (typeof World.getNpc(this.target.nid) === 'undefined' || this.target.delayed)) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }

        // this is effectively checking if the npc did a changetype
        if (this.target instanceof Npc && this.targetSubject.type !== -1 && World.getNpcByUid((this.targetSubject.type << 16) | this.target.nid) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }

        if (this.target instanceof Obj && World.getObj(this.target.x, this.target.z, this.level, this.target.type, this.hash64) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }

        if (this.target instanceof Loc && World.getLoc(this.target.x, this.target.z, this.level, this.target.type) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }

        if (this.target instanceof Player && World.getPlayerByUid(this.target.uid) === null) {
            this.clearInteraction();
            this.unsetMapFlag();
            return;
        }
        if (this.targetOp === ServerTriggerType.APPLAYER3 || this.targetOp === ServerTriggerType.OPPLAYER3) {
            const walktrigger: number = this.walktrigger;
            if (this.hasWaypoints()) {
                this.processWalktrigger();
            }    
            const moved: boolean = this.updateMovement(false);    
            if (!moved && walktrigger !== -1 && this.target instanceof Player && (this.x !== this.target.lastStepX || this.z !== this.target.lastStepZ)) {
                this.clearInteraction();
                this.unsetMapFlag();
            }
            return;
        }
        if (!this.interactWalkTrigger || this.hasWaypoints()) {
            this.processWalktrigger();
            this.interactWalkTrigger = true;
        }

        const opTrigger = this.getOpTrigger();
        const apTrigger = this.getApTrigger();

        if (opTrigger && this.target instanceof PathingEntity && this.inOperableDistance(this.target)) {
            const target = this.target;
            this.target = null;
            this.clearWaypoints(); 

            this.executeScript(ScriptRunner.init(opTrigger, this, target), true);
            this.interacted = true;

        } else if (apTrigger && this.inApproachDistance(this.apRange, this.target)) {
            const target = this.target;
            this.target = null;
            const wayPoints = this.waypoints;
            const waypointIndex = this.waypointIndex;
            this.clearWaypoints();

            this.executeScript(ScriptRunner.init(apTrigger, this, target), true);

            // if aprange was called then we did not interact.
            if (this.apRangeCalled) {
                this.waypoints = wayPoints;
                this.waypointIndex = waypointIndex;
                this.target = target;
            } else {
                if (this.target === target) { // if p_opnpc was called
                    this.clearWaypoints(); 
                }
                this.interacted = true;
            }

        } else if (this.target instanceof PathingEntity && this.inOperableDistance(this.target)) {
            if (Environment.NODE_DEBUG && !opTrigger && !apTrigger) {
                let debugname = '_';
                if (this.target instanceof Npc) {
                    if (this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType.APNPCT || this.targetOp === ServerTriggerType.OPNPCT) {
                        debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                    } else {
                        debugname = NpcType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    }
                } else if (this.target instanceof Loc) {
                    debugname = LocType.get(this.target.type)?.debugname ?? this.target.type.toString();
                } else if (this.target instanceof Obj) {
                    debugname = ObjType.get(this.target.type)?.debugname ?? this.target.type.toString();
                } else if (this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType.APNPCT || this.targetOp === ServerTriggerType.APPLAYERT || this.targetOp === ServerTriggerType.APLOCT || this.targetOp === ServerTriggerType.APOBJT) {
                    debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                } else if (this.targetSubject.type !== -1) {
                    debugname = ObjType.get(this.targetSubject.type)?.debugname ?? this.targetSubject.toString();
                }

                this.messageGame(`No trigger for [${ServerTriggerType[this.targetOp + 7].toLowerCase()},${debugname}]`);
            }

            this.target = null;
            this.messageGame('Nothing interesting happens.');
            this.interacted = true;
            this.clearWaypoints();
        }
        let moved = false;
        if (this.interacted && !this.apRangeCalled) {
            this.recoverEnergy(false);
        } else if (this.target) {
            this.interacted = false;
            this.processWalktrigger();
            moved = this.updateMovement();
            if (opTrigger && (this.target instanceof PathingEntity || !moved) && this.inOperableDistance(this.target)) {

                const target = this.target;
                this.target = null;
                this.clearWaypoints(); 

                this.executeScript(ScriptRunner.init(opTrigger, this, target), true);
                this.interacted = true;

            } else if (apTrigger && this.inApproachDistance(this.apRange, this.target)) {
                this.apRangeCalled = false;

                const target = this.target;
                this.target = null;
                const wayPoints = this.waypoints;
                const waypointIndex = this.waypointIndex;
                this.clearWaypoints();

                this.executeScript(ScriptRunner.init(apTrigger, this, target), true);

                // if aprange was called then we did not interact.
                if (this.apRangeCalled) {
                    this.target = target;
                    this.waypoints = wayPoints;
                    this.waypointIndex = waypointIndex;
                } else {
                    if (this.target === target) { // if p_opnpc was called
                        this.clearWaypoints();
                    }
                    this.interacted = true;
                }

            } else if ((this.target instanceof PathingEntity || !moved) && this.inOperableDistance(this.target)) {
                if (!Environment.NODE_PRODUCTION && !opTrigger && !apTrigger) {
                    let debugname = '_';
                    if (this.target instanceof Npc) {
                        debugname = NpcType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (this.target instanceof Loc) {
                        debugname = LocType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (this.target instanceof Obj) {
                        debugname = ObjType.get(this.target.type)?.debugname ?? this.target.type.toString();
                    } else if (this.targetSubject.com !== -1 && this.targetOp === ServerTriggerType.APNPCT || this.targetOp === ServerTriggerType.APPLAYERT || this.targetOp === ServerTriggerType.APLOCT || this.targetOp === ServerTriggerType.APOBJT) {
                        debugname = Component.get(this.targetSubject.com)?.comName ?? this.targetSubject.toString();
                    } else if (this.targetSubject.type !== -1) {
                        debugname = ObjType.get(this.targetSubject.type)?.debugname ?? this.targetSubject.toString();
                    }

                    this.messageGame(`No trigger for [${ServerTriggerType[this.targetOp + 7].toLowerCase()},${debugname}]`);
                }

                this.target = null;
                this.messageGame('Nothing interesting happens.');
                this.interacted = true;
                this.clearWaypoints();
            }
        }

        if (!this.interacted && !this.hasWaypoints() && !moved) {
            this.messageGame("I can't reach that!");
            this.clearInteraction();
        }

        if (this.interacted && !this.apRangeCalled && this.target === null) {
            this.clearInteraction();
        }
        
        if (!this.hasWaypoints()) {
            this.unsetMapFlag();
        }
    }

    // ----

    getAppearanceInSlot(slot: number) {
        let part = -1;
        if (slot === 8) {
            part = this.body[0];
        } else if (slot === 11) {
            part = this.body[1];
        } else if (slot === 4) {
            part = this.body[2];
        } else if (slot === 6) {
            part = this.body[3];
        } else if (slot === 9) {
            part = this.body[4];
        } else if (slot === 7) {
            part = this.body[5];
        } else if (slot === 10) {
            part = this.body[6];
        }

        if (part === -1) {
            return 0;
        } else {
            return 0x100 + part;
        }
    }

    getCombatLevel() {
        const base = 0.25 * (this.baseLevels[PlayerStat.DEFENCE] + this.baseLevels[PlayerStat.HITPOINTS] + Math.floor(this.baseLevels[PlayerStat.PRAYER] / 2));
        const melee = 0.325 * (this.baseLevels[PlayerStat.ATTACK] + this.baseLevels[PlayerStat.STRENGTH]);
        const range = 0.325 * (Math.floor(this.baseLevels[PlayerStat.RANGED] / 2) + this.baseLevels[PlayerStat.RANGED]);
        const magic = 0.325 * (Math.floor(this.baseLevels[PlayerStat.MAGIC] / 2) + this.baseLevels[PlayerStat.MAGIC]);
        return Math.floor(base + Math.max(melee, range, magic));
    }

    generateAppearance(inv: number) {
        const stream = Packet.alloc(0);

        stream.p1(this.gender);
        stream.p1(this.headicons);

        const skippedSlots = [];

        let worn = this.getInventory(inv);
        if (!worn) {
            worn = new Inventory(InvType.WORN, 0);
        }

        for (let i = 0; i < worn.capacity; i++) {
            const equip = worn.get(i);
            if (!equip) {
                continue;
            }

            const config = ObjType.get(equip.id);

            if (config.wearpos2 !== -1) {
                if (skippedSlots.indexOf(config.wearpos2) === -1) {
                    skippedSlots.push(config.wearpos2);
                }
            }

            if (config.wearpos3 !== -1) {
                if (skippedSlots.indexOf(config.wearpos3) === -1) {
                    skippedSlots.push(config.wearpos3);
                }
            }
        }

        for (let slot = 0; slot < 12; slot++) {
            if (skippedSlots.indexOf(slot) !== -1) {
                stream.p1(0);
                continue;
            }

            const equip = worn.get(slot);
            if (!equip) {
                const appearanceValue = this.getAppearanceInSlot(slot);
                if (appearanceValue < 1) {
                    stream.p1(0);
                } else {
                    stream.p2(appearanceValue);
                }
            } else {
                stream.p2(0x200 + equip.id);
            }
        }

        for (let i = 0; i < this.colors.length; i++) {
            stream.p1(this.colors[i]);
        }

        stream.p2(this.basReadyAnim);
        stream.p2(this.basTurnOnSpot);
        stream.p2(this.basWalkForward);
        stream.p2(this.basWalkBackward);
        stream.p2(this.basWalkLeft);
        stream.p2(this.basWalkRight);
        stream.p2(this.basRunning);

        stream.p8(this.username37);
        stream.p1(this.combatLevel);

        this.masks |= InfoProt.PLAYER_APPEARANCE.id;

        this.appearance = new Uint8Array(stream.pos);
        stream.pos = 0;
        stream.gdata(this.appearance, 0, this.appearance.length);
        stream.release();

        this.lastAppearance = World.currentTick;
    }

    // ----

    getInventoryFromListener(listener: any) {
        if (listener.source === -1) {
            return World.getInventory(listener.type);
        } else {
            const player = World.getPlayerByUid(listener.source);
            if (!player) {
                return null;
            }

            return player.getInventory(listener.type);
        }
    }

    getInventory(inv: number): Inventory | null {
        if (inv === -1) {
            return null;
        }

        const invType = InvType.get(inv);
        let container = null;

        if (!invType) {
            return null;
        }

        if (invType.scope === InvType.SCOPE_SHARED) {
            container = World.getInventory(inv);
        } else {
            container = this.invs.get(inv);

            if (!container) {
                container = Inventory.fromType(inv);
                this.invs.set(inv, container);
            }
        }

        return container;
    }

    invListenOnCom(inv: number, com: number, source: number) {
        if (inv === -1) {
            return;
        }

        const index = this.invListeners.findIndex(l => l.type === inv && l.com === com);
        if (index !== -1) {
            // already listening
            return;
        }

        const invType = InvType.get(inv);
        if (invType.scope === InvType.SCOPE_SHARED) {
            source = -1;
        }

        this.invListeners.push({ type: inv, com, source, firstSeen: true });
    }

    invStopListenOnCom(com: number) {
        const index = this.invListeners.findIndex(l => l.com === com);
        if (index === -1) {
            return;
        }

        this.invListeners.splice(index, 1);
        this.write(new UpdateInvStopTransmit(com));
    }

    invGetSlot(inv: number, slot: number) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invGetSlot: Invalid inventory type: ' + inv);
        }

        if (!container.validSlot(slot)) {
            throw new Error('invGetSlot: Invalid slot: ' + slot);
        }

        return container.get(slot);
    }

    invClear(inv: number) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invClear: Invalid inventory type: ' + inv);
        }

        container.removeAll();
    }

    invAdd(inv: number, obj: number, count: number, assureFullInsertion: boolean = true): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invAdd: Invalid inventory type: ' + inv);
        }

        const transaction = container.add(obj, count, -1, assureFullInsertion);
        return transaction.completed;
    }

    invSet(inv: number, obj: number, count: number, slot: number) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invSet: Invalid inventory type: ' + inv);
        }

        if (!container.validSlot(slot)) {
            throw new Error('invSet: Invalid slot: ' + slot);
        }

        container.set(slot, { id: obj, count });
    }

    invDel(inv: number, obj: number, count: number, beginSlot: number = -1): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invDel: Invalid inventory type: ' + inv);
        }

        // has to start at -1
        if (beginSlot < -1 || beginSlot >= this.invSize(inv)) {
            throw new Error('invDel: Invalid beginSlot: ' + beginSlot);
        }

        const transaction = container.remove(obj, count, beginSlot);
        return transaction.completed;
    }

    invDelSlot(inv: number, slot: number) {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invDelSlot: Invalid inventory type: ' + inv);
        }

        if (!container.validSlot(slot)) {
            throw new Error('invDelSlot: Invalid slot: ' + slot);
        }

        container.delete(slot);
    }

    invSize(inv: number): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invSize: Invalid inventory type: ' + inv);
        }

        return container.capacity;
    }

    invTotal(inv: number, obj: number): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotal: Invalid inventory type: ' + inv);
        }

        return container.getItemCount(obj);
    }

    invFreeSpace(inv: number): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invFreeSpace: Invalid inventory type: ' + inv);
        }

        return container.freeSlotCount;
    }

    invItemSpace(inv: number, obj: number, count: number, size: number): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invItemSpace: Invalid inventory type: ' + inv);
        }

        const objType = ObjType.get(obj);

        // oc_uncert
        let uncert = obj;
        if (objType.certtemplate >= 0 && objType.certlink >= 0) {
            uncert = objType.certlink;
        }
        if (objType.stackable || uncert != obj || container.stackType == Inventory.ALWAYS_STACK) {
            const stockObj = InvType.get(inv).stockobj?.includes(obj) === true;
            if (this.invTotal(inv, obj) == 0 && this.invFreeSpace(inv) == 0 && !stockObj) {
                return count;
            }
            return Math.max(0, count - (Inventory.STACK_LIMIT - this.invTotal(inv, obj)));
        }
        return Math.max(0, count - (this.invFreeSpace(inv) - (this.invSize(inv) - size)));
    }

    invMoveToSlot(fromInv: number, toInv: number, fromSlot: number, toSlot: number) {
        const from = this.getInventory(fromInv);
        if (!from) {
            throw new Error('invMoveToSlot: Invalid inventory type: ' + fromInv);
        }

        if (!from.validSlot(fromSlot)) {
            throw new Error('invMoveToSlot: Invalid from slot: ' + fromSlot);
        }

        const to = this.getInventory(toInv);
        if (!to) {
            throw new Error('invMoveToSlot: Invalid inventory type: ' + toInv);
        }

        if (!to.validSlot(toSlot)) {
            throw new Error('invMoveToSlot: Invalid to slot: ' + toSlot);
        }

        const fromObj = this.invGetSlot(fromInv, fromSlot);
        if (!fromObj) {
            throw new Error(`invMoveToSlot: Invalid from obj was null. This means the obj does not exist at this slot: ${fromSlot}`);
        }

        const toObj = this.invGetSlot(toInv, toSlot);
        this.invSet(toInv, fromObj.id, fromObj.count, toSlot);

        if (toObj) {
            this.invSet(fromInv, toObj.id, toObj.count, fromSlot);
        } else {
            this.invDelSlot(fromInv, fromSlot);
        }
    }

    invMoveFromSlot(fromInv: number, toInv: number, fromSlot: number) {
        const from = this.getInventory(fromInv);
        if (!from) {
            throw new Error('invMoveFromSlot: Invalid inventory type: ' + fromInv);
        }

        const to = this.getInventory(toInv);
        if (!to) {
            throw new Error('invMoveFromSlot: Invalid inventory type: ' + toInv);
        }

        if (!from.validSlot(fromSlot)) {
            throw new Error('invMoveFromSlot: Invalid from slot: ' + fromSlot);
        }

        const fromObj = this.invGetSlot(fromInv, fromSlot);
        if (!fromObj) {
            throw new Error(`invMoveFromSlot: Invalid from obj was null. This means the obj does not exist at this slot: ${fromSlot}`);
        }

        this.invDelSlot(fromInv, fromSlot);

        return {
            overflow: fromObj.count - this.invAdd(toInv, fromObj.id, fromObj.count, false),
            fromObj: fromObj.id
        };
    }

    invTotalCat(inv: number, category: number): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotalCat: Invalid inventory type: ' + inv);
        }

        return container.itemsFiltered.filter(obj => ObjType.get(obj.id).category == category).reduce((count, obj) => count + obj.count, 0);
    }

    private _invTotalParam(inv: number, param: number, stack: boolean): number {
        const container = this.getInventory(inv);
        if (!container) {
            throw new Error('invTotalParam: Invalid inventory type: ' + inv);
        }

        const paramType: ParamType = ParamType.get(param);

        let total: number = 0;
        for (let slot: number = 0; slot < container.capacity; slot++) {
            const item = container.items[slot];
            if (!item || item.id < 0 || item.id >= ObjType.count) {
                continue;
            }

            const obj: ObjType = ObjType.get(item.id);
            const value: number = ParamHelper.getIntParam(paramType.id, obj, paramType.defaultInt);

            if (stack) {
                total += item.count * value;
            } else {
                total += value;
            }
        }

        return total;
    }

    invTotalParam(inv: number, param: number): number {
        return this._invTotalParam(inv, param, false);
    }

    invTotalParamStack(inv: number, param: number): number {
        return this._invTotalParam(inv, param, true);
    }

    // ----

    getVar(id: number) {
        const varp = VarPlayerType.get(id);
        return varp.type === ScriptVarType.STRING ? this.varsString[varp.id] : this.vars[varp.id];
    }

    setVar(id: number, value: number | string) {
        const varp = VarPlayerType.get(id);

        if (varp.type === ScriptVarType.STRING && typeof value === 'string') {
            this.varsString[varp.id] = value;
        } else if (typeof value === 'number') {
            this.vars[varp.id] = value;

            if (varp.transmit) {
                this.writeVarp(id, value);
            }
        }
    }

    private writeVarp(id: number, value: number): void {
        if (value >= -128 && value <= 127) {
            this.write(new VarpSmall(id, value));
        } else {
            this.write(new VarpLarge(id, value));
        }
    }

    addXp(stat: number, xp: number, allowMulti: boolean = true) {
        // require xp is >= 0. there is no reason for a requested addXp to be negative.
        if (xp < 0) {
            throw new Error(`Invalid xp parameter for addXp call: Stat was: ${stat}, Exp was: ${xp}`);
        }

        // if the xp arg is 0, then we do not have to change anything or send an unnecessary stat packet.
        if (xp == 0) {
            return;
        }

        const multi = allowMulti ? Environment.NODE_XPRATE : 1;
        this.stats[stat] += xp * multi;

        // cap to 200m, this is represented as "2 billion" because we use 32-bit signed integers and divide by 10 to give us a decimal point
        if (this.stats[stat] > 2_000_000_000) {
            this.stats[stat] = 2_000_000_000;
        }

        const before = this.baseLevels[stat];
        if (this.levels[stat] === this.baseLevels[stat]) {
            // only update if no buff/debuff is active
            this.levels[stat] = getLevelByExp(this.stats[stat]);
        }
        this.baseLevels[stat] = getLevelByExp(this.stats[stat]);

        if (this.baseLevels[stat] > before) {
            if (this.levels[stat] < before) {
                // replenish stat
                this.levels[stat] += this.baseLevels[stat] - before;
            }

            this.changeStat(stat);

            // fun logging for players :)
            this.addSessionLog(LoggerEventType.ADVENTURE, 'Levelled up ' + PlayerStat[stat].toLowerCase() + ' from ' + before + ' to ' + this.baseLevels[stat]);

            let total = 0;
            let freeTotal = 0;
            for (let stat = 0; stat < this.baseLevels.length; stat++) {
                if (!PlayerStatEnabled[stat]) {
                    continue;
                }

                total += this.baseLevels[stat];

                if (PlayerStatFree[stat]) {
                    freeTotal += this.baseLevels[stat];
                }
            }
            if (total === 1881) {
                this.addSessionLog(LoggerEventType.ADVENTURE, 'Reached total level 1881 - you beat p2p!');
            } else if (total === 250 || total === 500 || total === 750 || total === 1000 || total === 1250 || total === 1500 || total === 1750) {
                this.addSessionLog(LoggerEventType.ADVENTURE, `Reached total level ${total}`);
            }
            if (freeTotal === 1485) {
                this.addSessionLog(LoggerEventType.ADVENTURE, 'Reached total level 1485 - you beat f2p!');
            }

            const script = ScriptProvider.getByTriggerSpecific(ServerTriggerType.ADVANCESTAT, stat, -1);
            if (script) {
                this.unlinkQueuedScript(script.id, PlayerQueueType.ENGINE);
                this.enqueueScript(script, PlayerQueueType.ENGINE);
            }
        }

        if (this.combatLevel != this.getCombatLevel()) {
            this.combatLevel = this.getCombatLevel();
            this.generateAppearance(InvType.WORN);
        }
    }

    changeStat(stat: number) {
        const script = ScriptProvider.getByTrigger(ServerTriggerType.CHANGESTAT, stat, -1);
        if (script) {
            this.enqueueScript(script, PlayerQueueType.ENGINE);
        }
    }

    setLevel(stat: number, level: number) {
        level = Math.min(99, Math.max(1, level));

        this.baseLevels[stat] = level;
        this.levels[stat] = level;
        this.stats[stat] = getExpByLevel(level);

        if (this.getCombatLevel() != this.combatLevel) {
            this.combatLevel = this.getCombatLevel();
            this.generateAppearance(InvType.WORN);
        }
    }

    playAnimation(anim: number, delay: number) {
        if (anim >= SeqType.count || this.animProtect) {
            return;
        }

        if (anim == -1 || this.animId == -1 || SeqType.get(anim).priority > SeqType.get(this.animId).priority || SeqType.get(this.animId).priority === 0) {
            this.animId = anim;
            this.animDelay = delay;
            this.masks |= InfoProt.PLAYER_ANIM.id;
        }
    }

    spotanim(spotanim: number, height: number, delay: number) {
        this.graphicId = spotanim;
        this.graphicHeight = height;
        this.graphicDelay = delay;
        this.masks |= InfoProt.PLAYER_SPOTANIM.id;
    }

    applyDamage(damage: number, type: number) {
        this.damageTaken = damage;
        this.damageType = type;

        const current = this.levels[PlayerStat.HITPOINTS];
        if (current - damage <= 0) {
            this.levels[PlayerStat.HITPOINTS] = 0;
            this.damageTaken = current;
        } else {
            this.levels[PlayerStat.HITPOINTS] = current - damage;
        }

        this.masks |= InfoProt.PLAYER_DAMAGE.id;
    }

    say(message: string) {
        this.chat = message;
        this.masks |= InfoProt.PLAYER_SAY.id;
    }

    faceSquare(x: number, z: number) {
        this.focus(CoordGrid.fine(x, 1), CoordGrid.fine(z, 1), true);
    }

    playSong(name: string) {
        name = name.toLowerCase().replaceAll(' ', '_');
        if (!name) {
            return;
        }

        const song = PRELOADED.get(name + '.mid');
        const crc = PRELOADED_CRC.get(name + '.mid');
        if (song && crc) {
            const length = song.length;
            this.write(new MidiSong(name, crc, length));
        }
    }

    playJingle(delay: number, name: string): void {
        name = name.toLowerCase().replaceAll('_', ' ');
        if (!name) {
            return;
        }
        const jingle = PRELOADED.get(name + '.mid');
        if (jingle) {
            this.write(new MidiJingle(delay, jingle));
        }
    }

    openMainModal(com: number) {
        if ((this.modalState & 2) !== 0) {
            // close chat modal if we're opening a new main modal
            this.write(new IfClose());
            this.modalState &= ~2;
            this.modalChat = -1;
        }

        if ((this.modalState & 4) !== 0) {
            // close side modal if we're opening a new main modal
            this.write(new IfClose());
            this.modalState &= ~4;
            this.modalSide = -1;
        }

        this.modalState |= 1;
        this.modalMain = com;
        this.refreshModal = true;
    }

    openChat(com: number) {
        this.modalState |= 2;
        this.modalChat = com;
        this.refreshModal = true;
    }

    openSideModal(com: number) {
        this.modalState |= 4;
        this.modalSide = com;
        this.refreshModal = true;
    }

    openTutorial(com: number) {
        this.write(new TutOpen(com));
        this.modalState |= 8;
        this.modalTutorial = com;
    }

    openMainModalSide(top: number, side: number) {
        this.modalState |= 1;
        this.modalMain = top;
        this.modalState |= 4;
        this.modalSide = side;
        this.refreshModal = true;
    }

    exactMove(startX: number, startZ: number, endX: number, endZ: number, startCycle: number, endCycle: number, direction: number) {
        this.exactStartX = startX;
        this.exactStartZ = startZ;
        this.exactEndX = endX;
        this.exactEndZ = endZ;
        this.exactMoveStart = startCycle;
        this.exactMoveEnd = endCycle;
        this.exactMoveDirection = direction;
        this.masks |= InfoProt.PLAYER_EXACT_MOVE.id;

        // todo: interpolate over time? instant teleport? verify with true tile on osrs
        this.x = endX;
        this.z = endZ;
        this.lastStepX = this.x - 1;
        this.lastStepZ = this.z;
        this.tele = true;
    }

    setTab(com: number, tab: number) {
        this.tabs[tab] = com;
        this.write(new IfSetTab(com, tab));
    }

    isComponentVisible(com: Component) {
        return this.modalMain === com.rootLayer || this.modalChat === com.rootLayer || this.modalSide === com.rootLayer || this.tabs.findIndex(l => l === com.rootLayer) !== -1 || this.modalTutorial === com.rootLayer;
    }

    updateAfkZones(): void {
        this.lastAfkZone = Math.min(1000, this.lastAfkZone + 1);
        if (this.withinAfkZone()) {
            return;
        }
        const coord: number = CoordGrid.packCoord(0, this.x - 10, this.z - 10); // level doesn't matter.
        if (this.moveSpeed === MoveSpeed.INSTANT && this.jump) {
            this.afkZones[1] = coord;
        } else {
            this.afkZones[1] = this.afkZones[0];
        }
        this.afkZones[0] = coord;
        this.lastAfkZone = 0;
    }

    zonesAfk(): boolean {
        return this.lastAfkZone === 1000;
    }

    private withinAfkZone(): boolean {
        const size: number = 21;
        for (let index: number = 0; index < this.afkZones.length; index++) {
            const coord: CoordGrid = CoordGrid.unpackCoord(this.afkZones[index]);
            if (CoordGrid.intersects(this.x, this.z, this.width, this.length, coord.x, coord.z, size, size)) {
                return true;
            }
        }
        return false;
    }

    // copied from client
    isInWilderness(): boolean {
        if (this.x >= 2944 && this.x < 3392 && this.z >= 3520 && this.z < 6400) {
            return true;
        } else if (this.x >= 2944 && this.x < 3392 && this.z >= 9920 && this.z < 12800) {
            return true;
        } else {
            return false;
        }
    }

    // ----

    runScript(script: ScriptState, protect: boolean = false, force: boolean = false) {
        if (!force && protect && (this.protect || this.delayed)) {
            // can't get protected access, bye-bye
            // printDebug('No protected access:', script.script.name, protect, this.protect);
            return -1;
        }

        if (protect) {
            script.pointerAdd(ScriptPointer.ProtectedActivePlayer);
            this.protect = true;
        }

        const state = ScriptRunner.execute(script);

        if (protect) {
            this.protect = false;
        }

        if (script.pointerGet(ScriptPointer.ProtectedActivePlayer) && script._activePlayer) {
            script.pointerRemove(ScriptPointer.ProtectedActivePlayer);
            script._activePlayer.protect = false;
        }

        if (script.pointerGet(ScriptPointer.ProtectedActivePlayer2) && script._activePlayer2) {
            script.pointerRemove(ScriptPointer.ProtectedActivePlayer2);
            script._activePlayer2.protect = false;
        }

        return state;
    }

    executeScript(script: ScriptState, protect: boolean = false, force: boolean = false) {
        // printDebug('Executing', script.script.name);

        const state = this.runScript(script, protect, force);
        if (state === -1) {
            // printDebug('Script did not run', script.script.name, protect, this.protect);
            return;
        }

        if (state !== ScriptState.FINISHED && state !== ScriptState.ABORTED) {
            if (state === ScriptState.WORLD_SUSPENDED) {
                World.enqueueScript(script, script.popInt());
            } else if (state === ScriptState.NPC_SUSPENDED) {
                script.activeNpc.activeScript = script;
            } else {
                script.activePlayer.activeScript = script;
                script.activePlayer.protect = protect; // preserve protected access when delayed
            }
        } else if (script === this.activeScript) {
            this.activeScript = null;

            if ((this.modalState & 1) === 0) {
                // close chat dialogues automatically and leave main modals alone
                this.closeModal();
            }
        }
    }

    wrappedMessageGame(mes: string) {
        const font = FontType.get(1);
        const lines = font.split(mes, 456);
        for (const line of lines) {
            this.messageGame(line);
        }
    }

    write(message: OutgoingMessage) {
        if (!isClientConnected(this)) {
            return;
        }

        if (message.priority === ServerProtPriority.IMMEDIATE) {
            this.writeInner(message);
        } else {
            this.buffer.push(message);
        }
    }

    unsetMapFlag() {
        this.clearWaypoints();
        this.write(new UnsetMapFlag());
    }

    hintNpc(nid: number) {
        this.write(new HintArrow(1, nid, 0, 0, 0, 0));
    }

    hintTile(offset: number, x: number, z: number, height: number) {
        this.write(new HintArrow(offset, 0, 0, x, z, height));
    }

    hintPlayer(pid: number) {
        this.write(new HintArrow(10, 0, pid, 0, 0, 0));
    }

    stopHint() {
        this.write(new HintArrow(-1, 0, 0, 0, 0, 0));
    }

    lastLoginInfo(lastLoginIp: number, daysSinceLogin: number, daysSinceRecoveryChange: number, unreadMessageCount: number) {
        this.write(new LastLoginInfo(lastLoginIp, daysSinceLogin, daysSinceRecoveryChange, unreadMessageCount));
    }

    logout(): void {
        // to be overridden
    }

    terminate(): void {
        // to be overridden
    }

    messageGame(msg: string) {
        this.write(new MessageGame(msg));
    }
}
