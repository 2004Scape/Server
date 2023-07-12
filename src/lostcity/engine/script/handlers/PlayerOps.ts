import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import ScriptProvider from "#lostcity/engine/script/ScriptProvider.js";
import ScriptState from "#lostcity/engine/script/ScriptState.js";
import World from "#lostcity/engine/World.js";

const PlayerOps: CommandHandlers = {
    [ScriptOpcode.FINDUID]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.P_FINDUID]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STRONGQUEUE]: (state) => {
        let types = state.popString();
        let count = types.length;

        let args: ScriptArgument[] = [];
        for (let i = count - 1; i >= 0; i--) {
            let type = types.charAt(i);

            if (type === 's') {
                args[i] = state.popString();
            } else {
                args[i] = state.popInt();
            }
        }

        let delay = state.popInt();
        let scriptId = state.popInt();

        let script = ScriptProvider.get(scriptId);
        if (script) {
            state.activePlayer.enqueueScript(script, 'strong', delay, args);
        }
    },

    [ScriptOpcode.WEAKQUEUE]: (state) => {
        let types = state.popString();
        let count = types.length;

        let args: ScriptArgument[] = [];
        for (let i = count - 1; i >= 0; i--) {
            let type = types.charAt(i);

            if (type === 's') {
                args[i] = state.popString();
            } else {
                args[i] = state.popInt();
            }
        }

        let delay = state.popInt();
        let scriptId = state.popInt();

        let script = ScriptProvider.get(scriptId);
        if (script) {
            state.activePlayer.enqueueScript(script, 'weak', delay, args);
        }
    },

    [ScriptOpcode.ANIM]: (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activePlayer.playAnimation(seq, delay);
    },

    [ScriptOpcode.BUFFER_FULL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.BUILDAPPEARANCE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.CAM_LOOKAT]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.CAM_MOVETO]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.CAM_RESET]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.COORD]: (state) => {
        let packed = state.activePlayer.z | (state.activePlayer.x << 14) | (state.activePlayer.level << 28);
        state.pushInt(packed);
    },

    [ScriptOpcode.DISPLAYNAME]: (state) => {
        state.pushString(state.activePlayer.displayName);
    },

    [ScriptOpcode.FACESQUARE]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.IF_CLOSE]: (state) => {
        state.activePlayer.closeModal();
    },

    [ScriptOpcode.IF_OPENSUBMODAL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.IF_OPENSUBOVERLAY]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.LAST_COM]: (state) => {
        state.pushInt(state.activePlayer.lastCom ?? -1);
    },

    [ScriptOpcode.LAST_INT]: (state) => {
        state.pushInt(state.activePlayer.lastInt ?? -1);
    },

    [ScriptOpcode.LAST_ITEM]: (state) => {
        state.pushInt(state.activePlayer.lastItem ?? -1);
    },

    [ScriptOpcode.LAST_SLOT]: (state) => {
        state.pushInt(state.activePlayer.lastSlot ?? -1);
    },

    [ScriptOpcode.LAST_USEITEM]: (state) => {
        state.pushInt(state.activePlayer.lastUseItem ?? -1);
    },

    [ScriptOpcode.LAST_USESLOT]: (state) => {
        state.pushInt(state.activePlayer.lastUseSlot ?? -1);
    },

    [ScriptOpcode.LAST_VERIFYOBJ]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.MES]: (state) => {
        state.activePlayer.messageGame(state.popString());
    },

    [ScriptOpcode.NAME]: (state) => {
        state.pushString(state.activePlayer.username);
    },

    [ScriptOpcode.P_APRANGE]: (state) => {
        state.activePlayer.currentApRange = state.popInt();
        state.activePlayer.apRangeCalled = true;
    },

    [ScriptOpcode.P_ARRIVEDELAY]: (state) => {
        if (state.activePlayer.clocks.lastMovement < World.currentTick) {
            return;
        }

        state.activePlayer.delay = state.popInt() + 1;
        state.execution = ScriptState.SUSPENDED;
        state.activePlayer.resetInteraction();
    },

    [ScriptOpcode.P_COUNTDIALOG]: (state) => {
        state.execution = ScriptState.COUNTDIALOG;
    },

    [ScriptOpcode.P_DELAY]: (state) => {
        state.activePlayer.delay = state.popInt() + 1;
        state.execution = ScriptState.SUSPENDED;
    },

    [ScriptOpcode.P_OPHELD]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.P_OPLOC]: (state) => {
        let type = state.popInt();
        state.activePlayer.setInteraction(`oploc${type}`, state.activeLoc);
    },

    [ScriptOpcode.P_OPNPC]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.P_PAUSEBUTTON]: (state) => {
        state.execution = ScriptState.PAUSEBUTTON;
    },

    [ScriptOpcode.P_STOPACTION]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.P_TELEJUMP]: (state) => {
        let coord = state.popInt();
        let level = (coord >> 28) & 0x3fff;
        let x = (coord >> 14) & 0x3fff;
        let z = coord & 0x3fff;

        state.activePlayer.teleport(x, z, level);
    },

    [ScriptOpcode.P_WALK]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.SAY]: (state) => {
        state.activePlayer.say(state.popString());
    },

    [ScriptOpcode.SOUND_SYNTH]: (state) => {
        let [synth, loops, delay] = state.popInts(3);

        state.activePlayer.synthSound(synth, loops, delay);
    },

    [ScriptOpcode.STAFFMODLEVEL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STAT]: (state) => {
        let stat = state.popInt();

        state.pushInt(state.activePlayer.levels[stat]);
    },

    [ScriptOpcode.STAT_BASE]: (state) => {
        let stat = state.popInt();

        state.pushInt(state.activePlayer.baseLevel[stat]);
    },

    [ScriptOpcode.STAT_HEAL]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.UID]: (state) => {
        // maybe more unique than this?
        state.pushInt(state.activePlayer.pid);
    },

    [ScriptOpcode.P_LOGOUT]: (state) => {
        state.activePlayer.logout();
    },

    [ScriptOpcode.IF_SETCOLOUR]: (state) => {
        let colour = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetColour(com, colour);
    },

    [ScriptOpcode.IF_OPENBOTTOM]: (state) => {
        let com = state.popInt();

        state.activePlayer.ifOpenBottom(com);
    },

    [ScriptOpcode.IF_OPENSUB]: (state) => {
        let com2 = state.popInt();
        let com1 = state.popInt();

        state.activePlayer.ifOpenSub(com1, com2);
    },

    [ScriptOpcode.IF_SETHIDE]: (state) => {
        let hidden = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetHide(com, hidden === 1);
    },

    [ScriptOpcode.IF_SETOBJECT]: (state) => {
        let zoom = state.popInt();
        let objId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetObject(com, objId, zoom);
    },

    [ScriptOpcode.IF_SETTABACTIVE]: (state) => {
        state.activePlayer.ifSetTabFlash(state.popInt());
    },

    [ScriptOpcode.IF_SETMODEL]: (state) => {
        let modelId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetModel(com, modelId);
    },

    [ScriptOpcode.IF_SETMODELCOLOUR]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.IF_SETTABFLASH]: (state) => {
        state.activePlayer.ifSetTabFlash(state.popInt());
    },

    [ScriptOpcode.IF_CLOSESUB]: (state) => {
        state.activePlayer.ifCloseSub();
    },

    [ScriptOpcode.IF_SETANIM]: (state) => {
        let seqId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetAnim(com, seqId);
    },

    [ScriptOpcode.IF_SETTAB]: (state) => {
        let tab = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetTab(com, tab);
    },

    [ScriptOpcode.IF_OPENTOP]: (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    },

    [ScriptOpcode.IF_OPENSTICKY]: (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    },

    [ScriptOpcode.IF_OPENSIDEBAR]: (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    },

    [ScriptOpcode.IF_SETPLAYERHEAD]: (state) => {
        state.activePlayer.ifSetPlayerHead(state.popInt());
    },

    [ScriptOpcode.IF_SETTEXT]: (state) => {
        let text = state.popString();
        let com = state.popInt();

        state.activePlayer.ifSetText(com, text);
    },

    [ScriptOpcode.IF_SETNPCHEAD]: (state) => {
        let npcId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetNpcHead(com, npcId);
    },

    [ScriptOpcode.IF_SETPOSITION]: (state) => {
        throw new Error("unimplemented");
    },

    [ScriptOpcode.IF_MULTIZONE]: (state) => {
        state.activePlayer.ifMultiZone(state.popInt() === 1);
    },

    [ScriptOpcode.GIVEXP]: (state) => {
        const self = state.activePlayer;

        let xp = state.popInt();
        let stat = state.popInt();

        self.giveXp(stat, xp);
    },

    [ScriptOpcode.DAMAGE]: (state) => {
        let amount = state.popInt();
        let type = state.popInt();
        let uid = state.popInt();

        World.getPlayer(uid)!.applyDamage(amount, type); // TODO (jkm) consider whether we want to use ! here
    },

    [ScriptOpcode.IF_SETRESUMEBUTTONS]: (state) => {
        let [button1, button2, button3, button4, button5] = state.popInts(5);

        state.activePlayer.resumeButtons = [button1, button2, button3, button4, button5];
    },

    [ScriptOpcode.TEXT_GENDER]: (state) => {
        throw new Error("unimplemented");
    },
};

export default PlayerOps;
