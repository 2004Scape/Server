import { CommandHandlers } from "#lostcity/engine/script/ScriptRunner.js";
import ScriptOpcode from "#lostcity/engine/script/ScriptOpcode.js";
import { ScriptArgument } from "#lostcity/entity/EntityQueueRequest.js";
import ScriptProvider from "#lostcity/engine/script/ScriptProvider.js";
import ScriptState from "#lostcity/engine/script/ScriptState.js";
import World from "#lostcity/engine/World.js";
import ScriptPointer, { checkedHandler } from "#lostcity/engine/script/ScriptPointer.js";
import ServerTriggerType from "#lostcity/engine/script/ServerTriggerType.js";

const ActivePlayer = [ScriptPointer.ActivePlayer, ScriptPointer.ActivePlayer2];
const ProtectedActivePlayer = [ScriptPointer.ProtectedActivePlayer, ScriptPointer.ProtectedActivePlayer2];

const PlayerOps: CommandHandlers = {
    [ScriptOpcode.FINDUID]: (state) => {
        // should add ActivePlayer[state.intOperand] on success
        throw new Error("unimplemented");
    },

    [ScriptOpcode.P_FINDUID]: (state) => {
        // should add ProtectedActivePlayer[state.intOperand] on success
        throw new Error("unimplemented");
    },

    [ScriptOpcode.STRONGQUEUE]: checkedHandler(ActivePlayer, (state) => {
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
    }),

    [ScriptOpcode.WEAKQUEUE]: checkedHandler(ActivePlayer, (state) => {
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
    }),

    [ScriptOpcode.ANIM]: checkedHandler(ActivePlayer, (state) => {
        let delay = state.popInt();
        let seq = state.popInt();

        state.activePlayer.playAnimation(seq, delay);
    }),

    [ScriptOpcode.BUFFER_FULL]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.BUILDAPPEARANCE]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.CAM_LOOKAT]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.CAM_MOVETO]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.CAM_RESET]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.COORD]: checkedHandler(ActivePlayer, (state) => {
        let packed = state.activePlayer.z | (state.activePlayer.x << 14) | (state.activePlayer.level << 28);
        state.pushInt(packed);
    }),

    [ScriptOpcode.DISPLAYNAME]: checkedHandler(ActivePlayer, (state) => {
        state.pushString(state.activePlayer.displayName);
    }),

    [ScriptOpcode.FACESQUARE]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.IF_CLOSE]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.closeModal();
    }),

    [ScriptOpcode.IF_OPENSUBMODAL]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.IF_OPENSUBOVERLAY]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

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

    [ScriptOpcode.MES]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.messageGame(state.popString());
    }),

    [ScriptOpcode.NAME]: checkedHandler(ActivePlayer, (state) => {
        state.pushString(state.activePlayer.username);
    }),

    [ScriptOpcode.P_APRANGE]: checkedHandler(ProtectedActivePlayer, (state) => {
        state.activePlayer.currentApRange = state.popInt();
        state.activePlayer.apRangeCalled = true;
    }),

    [ScriptOpcode.P_ARRIVEDELAY]: checkedHandler(ProtectedActivePlayer, (state) => {
        if (state.activePlayer.clocks.lastMovement < World.currentTick) {
            return;
        }

        state.activePlayer.delay = state.popInt() + 1;
        state.execution = ScriptState.SUSPENDED;
        state.activePlayer.resetInteraction();
    }),

    [ScriptOpcode.P_COUNTDIALOG]: checkedHandler(ProtectedActivePlayer, (state) => {
        state.execution = ScriptState.COUNTDIALOG;
        // TODO last_int pointer
    }),

    [ScriptOpcode.P_DELAY]: checkedHandler(ProtectedActivePlayer, (state) => {
        state.activePlayer.delay = state.popInt() + 1;
        state.execution = ScriptState.SUSPENDED;
        // TODO should this wipe any pointers?
    }),

    [ScriptOpcode.P_OPHELD]: checkedHandler(ProtectedActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.P_OPLOC]: checkedHandler(ProtectedActivePlayer, (state) => {
        let type = state.popInt() - 1;
        if (type < 0 || type >= 5) {
            throw new Error(`Invalid oploc: ${type + 1}`);
        }

        state.activePlayer.setInteraction(ServerTriggerType.OPLOC1 + type, ServerTriggerType.APLOC1 + type, state.activeLoc);
    }),

    [ScriptOpcode.P_OPNPC]: checkedHandler(ProtectedActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.P_PAUSEBUTTON]: checkedHandler(ProtectedActivePlayer, (state) => {
        state.execution = ScriptState.PAUSEBUTTON;
        // TODO last_com
    }),

    [ScriptOpcode.P_STOPACTION]: checkedHandler(ProtectedActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.P_TELEJUMP]: checkedHandler(ProtectedActivePlayer, (state) => {
        let coord = state.popInt();
        let level = (coord >> 28) & 0x3fff;
        let x = (coord >> 14) & 0x3fff;
        let z = coord & 0x3fff;

        state.activePlayer.teleport(x, z, level);
    }),

    [ScriptOpcode.P_WALK]: checkedHandler(ProtectedActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.SAY]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.say(state.popString());
    }),

    [ScriptOpcode.SOUND_SYNTH]: checkedHandler(ActivePlayer, (state) => {
        let [synth, loops, delay] = state.popInts(3);

        state.activePlayer.synthSound(synth, loops, delay);
    }),

    [ScriptOpcode.STAFFMODLEVEL]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.STAT]: checkedHandler(ActivePlayer, (state) => {
        let stat = state.popInt();

        state.pushInt(state.activePlayer.levels[stat]);
    }),

    [ScriptOpcode.STAT_BASE]: checkedHandler(ActivePlayer, (state) => {
        let stat = state.popInt();

        state.pushInt(state.activePlayer.baseLevel[stat]);
    }),

    [ScriptOpcode.STAT_HEAL]: checkedHandler(ProtectedActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.UID]: checkedHandler(ActivePlayer, (state) => {
        // maybe more unique than this?
        state.pushInt(state.activePlayer.pid);
    }),

    [ScriptOpcode.P_LOGOUT]: checkedHandler(ProtectedActivePlayer, (state) => {
        state.activePlayer.logout();
    }),

    [ScriptOpcode.IF_SETCOLOUR]: checkedHandler(ActivePlayer, (state) => {
        let colour = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetColour(com, colour);
    }),

    [ScriptOpcode.IF_OPENBOTTOM]: checkedHandler(ActivePlayer, (state) => {
        let com = state.popInt();

        state.activePlayer.ifOpenBottom(com);
    }),

    [ScriptOpcode.IF_OPENSUB]: checkedHandler(ActivePlayer, (state) => {
        let com2 = state.popInt();
        let com1 = state.popInt();

        state.activePlayer.ifOpenSub(com1, com2);
    }),

    [ScriptOpcode.IF_SETHIDE]: checkedHandler(ActivePlayer, (state) => {
        let hidden = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetHide(com, hidden === 1);
    }),

    [ScriptOpcode.IF_SETOBJECT]: checkedHandler(ActivePlayer, (state) => {
        let zoom = state.popInt();
        let objId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetObject(com, objId, zoom);
    }),

    [ScriptOpcode.IF_SETTABACTIVE]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifSetTabFlash(state.popInt());
    }),

    [ScriptOpcode.IF_SETMODEL]: checkedHandler(ActivePlayer, (state) => {
        let modelId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetModel(com, modelId);
    }),

    [ScriptOpcode.IF_SETMODELCOLOUR]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.IF_SETTABFLASH]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifSetTabFlash(state.popInt());
    }),

    [ScriptOpcode.IF_CLOSESUB]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifCloseSub();
    }),

    [ScriptOpcode.IF_SETANIM]: checkedHandler(ActivePlayer, (state) => {
        let seqId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetAnim(com, seqId);
    }),

    [ScriptOpcode.IF_SETTAB]: checkedHandler(ActivePlayer, (state) => {
        let tab = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetTab(com, tab);
    }),

    [ScriptOpcode.IF_OPENTOP]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    }),

    [ScriptOpcode.IF_OPENSTICKY]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    }),

    [ScriptOpcode.IF_OPENSIDEBAR]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifOpenTop(state.popInt());
    }),

    [ScriptOpcode.IF_SETPLAYERHEAD]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifSetPlayerHead(state.popInt());
    }),

    [ScriptOpcode.IF_SETTEXT]: checkedHandler(ActivePlayer, (state) => {
        let text = state.popString();
        let com = state.popInt();

        state.activePlayer.ifSetText(com, text);
    }),

    [ScriptOpcode.IF_SETNPCHEAD]: checkedHandler(ActivePlayer, (state) => {
        let npcId = state.popInt();
        let com = state.popInt();

        state.activePlayer.ifSetNpcHead(com, npcId);
    }),

    [ScriptOpcode.IF_SETPOSITION]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.IF_MULTIZONE]: checkedHandler(ActivePlayer, (state) => {
        state.activePlayer.ifMultiZone(state.popInt() === 1);
    }),

    [ScriptOpcode.GIVEXP]: checkedHandler(ProtectedActivePlayer, (state) => {
        const self = state.activePlayer;

        let xp = state.popInt();
        let stat = state.popInt();

        self.giveXp(stat, xp);
    }),

    [ScriptOpcode.DAMAGE]: (state) => {
        let amount = state.popInt();
        let type = state.popInt();
        let uid = state.popInt();

        World.getPlayer(uid)!.applyDamage(amount, type); // TODO (jkm) consider whether we want to use ! here
    },

    [ScriptOpcode.IF_SETRESUMEBUTTONS]: checkedHandler(ActivePlayer, (state) => {
        let [button1, button2, button3, button4, button5] = state.popInts(5);

        state.activePlayer.resumeButtons = [button1, button2, button3, button4, button5];
    }),

    [ScriptOpcode.TEXT_GENDER]: checkedHandler(ActivePlayer, (state) => {
        throw new Error("unimplemented");
    }),

    [ScriptOpcode.MIDI_SONG]: (state) => {
        state.self.playSong(state.popString());
    },
};

export default PlayerOps;
