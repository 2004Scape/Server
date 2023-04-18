import ObjectType from '#cache/config/ObjectType.js';
import { Npc } from '#engine/Npc.js';
import World from '#engine/World.js';

export default class BaseScript {
    static max_32bit_int = 0x7FFFFFFFF;
    static lootdrop_duration = 200;
    static dm_default = 'Nothing interesting happens.';
    static dm_members_obj = `Login to a members' server to use this object.`;
    static dm_members_action = `You must be on a members world to do that.`;

    params = {};

    // players: weak, normal, strong
    // npcs: normal
    type = '';

    trigger = '';

    done = false; // ensures we aren't double-running anything by accident
    clock = -1; // continue running on this tick
    counter = 0; // generic internal counter that persists between states
    state = null;
    condition = null;
    choice = -1; // used by p_choice
    count = -1; // used by p_countdialog

    player = null;
    npc = null;

    constructor(player, params = {}, type = 'normal', trigger = '', tickStart = 0) {
        this.player = player;
        this.params = params;
        this.type = type;
        this.trigger = trigger;
        this.clock = World.currentTick + tickStart;

        if (this.params.npcIndex) {
            this.npc = World.npcs[this.params.npcIndex];
        }
    }

    future() {
        return this.player.delay > 0 || this.clock > World.currentTick;
    }

    set(param, value) {
        this.params[param] = value;
    }

    checkCondition() {
        if (this.condition == null) {
            return true;
        }

        switch (this.condition) {
            case 'arrivedelay': {
                if (this.player.walkDir != -1) {
                    return false;
                }
            } break;
            case 'loaddelay': {
                // TODO: figure out how to restore to the last yield and continue once every 10 ticks...
            } break;
            case 'pausebutton': {
                if (this.player.resumed == false) {
                    return false;
                }

                this.player.resumed = false;
            } break;
            case 'countdialog': {
                if (this.player.lastInt == -1) {
                    return false;
                }

                this.count = this.player.lastInt;
                this.player.lastInt = -1;
            } break;
            case 'choice': {
                if (this.player.lastChoice == -1) {
                    return false;
                }

                this.choice = this.player.lastChoice;
                this.player.lastChoice = -1;
            } break;
            case 'bank_visible': {
                if (this.player.bankOpen) {
                    return false;
                }
            } break;
            case 'aprange': {
                if (!this.player.inApproachDistance()) {
                    return false;
                }
            } break;
        }

        this.condition = null;
        return true;
    }

    reset() {
        this.state = null;
    }

    execute() {
        if (this.done) {
            console.error('Warning: Script still in queue', this.type, this.params);
            return true;
        }

        if (!this.state) {
            this.state = this.run(this.player);
        }

        if (!this.checkCondition()) {
            this.wait(1); // try again next tick
            return false;
        }

        while (this.checkCondition() && !this.future() && !this.done) {
            let r = this.state.next();
            // r.value = return value/yield value
            // r.done = no more yields

            if (r.done || r.value == true || typeof r.value == 'undefined') {
                this.done = true;
            }
        }

        if (!this.future()) {
            if (!this.done) {
                this.clock = World.currentTick + 1; // see you again next tick
            } else {
                this.clock = World.currentTick; // goodbyte
            }
        }

        return this.done;
    }

    // returns true when the script is finished
    *run(player) {
        return true;
    }

    // retry next tick, used by anything that will run again next tick without delaying other scripts
    continue() {
        this.clock = World.currentTick + 1;
        return false;
    }

    // set the script clock (not a player delay) to execute again in a number of ticks
    wait(ticks = 1) {
        this.clock = World.currentTick + ticks;
        return false;
    }

    // ---- runescript ----

    // queues

    clearqueue() {
    }

    queue(script, params, tickStart) {
        this.player.queue.push(new script(this.player, params, 'normal', this.trigger, tickStart));
        return true;
    }

    strongqueue(script, params, tickStart) {
        this.player.queue.push(new script(this.player, params, 'strong', this.trigger, tickStart));
        return true;
    }

    weakqueue(script, params, tickStart) {
        this.player.weakQueue.push(new script(this.player, params, 'weak', this.trigger, tickStart));
        return true;
    }

    getqueue() {
    }

    // timers

    settimer() {
    }

    gettimer() {
    }

    // player

    anim(id, delay) {
        this.player.playAnimation(id, delay);
    }

    spotanim(id, height, delay) {
        this.player.playGraphic(id, height, delay);
    }

    buffer_full() {
    }

    buildappearance() {
    }

    cam_lookat() {
    }

    cam_moveto() {
    }

    cam_reset() {
    }

    displayname() {
    }

    facesquare() {
    }

    healenergy() {
    }

    mes(str) {
        this.player.sendMessage(str);
    }

    name() {
    }

    sound_synth(id, loops, delay) {
        this.player.playSound(id, loops, delay);
    }

    staffmodlevel() {
    }

    stat(name) {
        return this.player.tempLevels[name];
    }

    stat_base(name) {
        return this.player.levels[name];
    }

    stat_heal() {
    }

    // protected

    p_aprange(n) {
        this.player.apRangeCalled = true;
        this.player.currentApRange = n;
        this.condition = 'aprange';
        return false;
    }

    p_arrivedelay() {
        this.condition = 'arrivedelay';
        return false;
    }

    // p_delay sets a player delay for delay + 1 server cycles, so 0 is 1 tick, 1 is 2 ticks, etc.
    // this is inherited from the original system design
    p_delay(delay = 0) {
        this.player.delay = delay + 1;
        return false;
    }

    p_pausebutton() {
        this.condition = 'pausebutton';
        return false;
    }

    p_telejump() {
    }

    // npc

    huntnext() {
    }

    npc_add() {
    }

    npc_anim() {
    }

    npc_basestat() {
    }

    npc_category() {
    }

    npc_coord() {
    }

    npc_del() {
    }

    npc_delay() {
    }

    npc_facesquare() {
    }

    npc_findexact() {
    }

    npc_param() {
    }

    npc_queue() {
    }

    npc_range() {
    }

    npc_say() {
    }

    npc_sethunt() {
    }

    npc_sethuntmode() {
    }

    npc_setmode() {
    }

    npc_statheal() {
    }

    npc_type() {
    }

    // controller

    controller_coord() {
    }

    controller_del() {
    }

    controller_findexact() {
    }

    controller_queue() {
    }

    // loc

    loc_add() {
    }

    loc_angle() {
    }

    loc_anim() {
    }

    loc_category() {
    }

    loc_coord() {
    }

    loc_del() {
    }

    loc_find() {
    }

    loc_findallzone() {
    }

    loc_findnext() {
    }

    loc_param() {
    }

    loc_type() {
    }

    // obj

    obj_add() {
    }

    obj_del() {
    }

    // obj config

    oc_category() {
    }

    oc_desc(id) {
        return ObjectType.get(id).desc;
    }

    oc_members(id) {
        return ObjectType.get(id).members;
    }

    oc_name(id) {
        return ObjectType.get(id).name;
    }

    oc_param() {
    }

    // interface

    if_close() {
        this.player.closeModal();
    }

    if_setevents() {
    }

    last_int() {
        return this.count;
    }

    // inventory

    inv_add(inventory, item, count = 1) {
        inventory.add(item, count);
    }

    inv_del(inventory, item, count = 1) {
        inventory.remove(item, count);
    }

    inv_getobj(inventory, slot) {
        return inventory.get(slot).id;
    }

    inv_getvar() {
    }

    inv_itemspace2() {
    }

    inv_moveitem() {
    }

    inv_resendslot() {
    }

    inv_setslot(inventory, slot, item, count = 1) {
        inventory.set(slot, { id: item, count: count });
    }

    inv_setvar() {
    }

    inv_size(inventory) {
        return inventory.capacity;
    }

    inv_total(inventory, item) {
        return inventory.getItemCount(item);
    }

    objectverify(item1, item2) {
        return item1.id == item2.id;
    }

    last_comsubid() {
        return this.player.lastComSubId;
    }

    last_slot() {
        return this.player.lastSlot;
    }

    last_useitem() {
        return this.player.lastUseItem;
    }

    last_useslot() {
        return this.player.lastUseSlot;
    }

    last_verifyobj() {
        return { id: this.player.lastVerifyObj };
    }

    // varp

    setbit(varp, bit) {
        this.player.varps[varp] |= 1 << bit;
    }

    testbit(varp, bit) {
        return (this.player.varps[varp] & (1 << bit)) !== 0;
    }

    clearbit(varp, bit) {
        this.player.varps[varp] &= ~(1 << bit);
    }

    // util

    coord() {
        return { x: this.player.x, z: this.player.z, plane: this.player.plane };
    }

    enum_getoutputcount() {
    }

    finduid(id) {
        return World.pids[id] || World.nids[id];
    }

    inarea() {
    }

    inzone() {
    }

    map_clock() {
        return World.currentTick;
    }

    map_members() {
        return World.members;
    }

    movecoord() {
    }

    random(n) {
        return Math.floor(Math.random() * n);
    }

    randominc(n) {
        return Math.floor(Math.random() * (n + 1));
    }

    region_findbycoord() {
    }

    region_getcoord() {
    }

    scale(n, factor) {
        return Math.floor(n * factor);
    }

    seqlength() {
    }

    split_init() {
    }

    split_pagecount() {
    }

    // ---- runescript procs ----

    mesbox(...lines) {
        this.player.showMessage(...lines);
        return this.p_pausebutton();
    }

    objbox(item, ...lines) {
        this.player.showObjectMessage(item, ...lines);
        return this.p_pausebutton();
    }

    chatplayer(animation, ...lines) {
        this.player.showPlayerMessage(animation, ...lines);
        return this.p_pausebutton();
    }

    chatnpc(animation, ...lines) {
        this.npc.target = { type: 'player', index: this.player.pid, x: this.player.x, z: this.player.z };
        this.player.showNpcMessage(this.params.npcId, animation, ...lines);
        return this.p_pausebutton();
    }

    p_choice(text1, text2, text3, text4, text5) {
        this.player.showChoices(text1, text2, text3, text4, text5);
        this.condition = 'choice';
        return false;
    }

    p_loaddelay() {
        this.condition = 'loaddelay';
        return false;
    }

    p_countdialog() {
        this.player.showAmountDialog();
        this.condition = 'countdialog';
        return false;
    }

    if_openmain(id) {
        this.player.openInterface(id);
    }

    if_openbottom(id) {
        this.player.openChatboxInterface(id);
    }

    if_settext(id, text) {
        this.player.setInterfaceText(id, text);
    }

    npc_death() {
    }

    npc_meleeattack() {
    }

    npc_meleedamage() {
    }

    playerhit() {
    }

    playerhit_n_melee() {
    }

    playerwalk3() {
    }

    givexp(stat, xp) {
        this.player.addExperience(stat, xp);
    }

    // made this up:

    // pause the script while the bank is open
    bank_visible() {
        this.condition = 'bank_visible';
        return false;
    }
}
