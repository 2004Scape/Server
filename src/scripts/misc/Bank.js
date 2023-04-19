import ObjectType from '#cache/config/ObjectType.js';
import locs from '#cache/locs.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';

class OpenBankBooth extends BaseScript {
    *run(player) {
        player.openBank();
        yield this.bank_visible();
    }
}

ScriptManager.register('OPLOC1', { locId: locs.bank_booth1 }, OpenBankBooth);
ScriptManager.register('OPLOC2', { locId: locs.bank_booth1 }, OpenBankBooth);
ScriptManager.register('OPLOC1', { locId: locs.bank_booth3 }, OpenBankBooth);
ScriptManager.register('OPLOC2', { locId: locs.bank_booth3 }, OpenBankBooth);

// ----

class DepositItem extends BaseScript {
    *run(player) {
        const { itemId, slot } = this.params;
        const from = player.inv;
        const to = player.bank;

        if (!from.hasAt(slot, itemId)) {
            return;
        }

        let count = 1;
        if (this.trigger == 'IF_BUTTON2') {
            count = 5;
        } else if (this.trigger == 'IF_BUTTON3') {
            count = 10;
        } else if (this.trigger == 'IF_BUTTON4') {
            count = from.getItemCount(itemId);
        } else if (this.trigger == 'IF_BUTTON5') {
            yield this.p_countdialog();
            count = this.last_int();
        }

        count = Math.min(from.getItemCount(itemId), count);

        let deposited = 0;
        for (let i = 0; i < from.capacity; i++) {
            let item = from.get(i);
            if (!item || item.id != itemId) {
                continue;
            }

            if (deposited >= count) {
                break;
            }

            let left = count - deposited;
            let copy = { id: item.id, count: Math.min(left, item.count) };

            let transfer = from.transfer(to, copy, i, -1, false, true);
            deposited += transfer?.completed ?? 0;
        }

        if (deposited == 0) {
            this.mes("Your bank is full.");
        }
    }
}

ScriptManager.register('IF_BUTTON1', { interfaceId: 5064 }, DepositItem);
ScriptManager.register('IF_BUTTON2', { interfaceId: 5064 }, DepositItem);
ScriptManager.register('IF_BUTTON3', { interfaceId: 5064 }, DepositItem);
ScriptManager.register('IF_BUTTON4', { interfaceId: 5064 }, DepositItem);
ScriptManager.register('IF_BUTTON5', { interfaceId: 5064 }, DepositItem);

// ----

class WithdrawItem extends BaseScript {
    *run(player) {
        const { itemId, slot } = this.params;
        const from = player.bank;
        const to = player.inv;

        if (!from.hasAt(slot, itemId)) {
            return;
        }

        let count = 1;
        if (this.trigger == 'IF_BUTTON2') {
            count = 5;
        } else if (this.trigger == 'IF_BUTTON3') {
            count = 10;
        } else if (this.trigger == 'IF_BUTTON4') {
            count = from.getItemCount(itemId);
        } else if (this.trigger == 'IF_BUTTON5') {
            yield this.p_countdialog();
            count = this.last_int();
        }

        count = Math.min(from.getItemCount(itemId), count);
        let withdrawn = 0;

        let note = player.withdrawCert;
        if (note && !ObjectType.find(i => i.certlink == itemId)) {
            this.mes('This item cannot be withdrawn as a note.');
            note = false;
        }

        for (let i = slot; i < from.capacity; i++) {
            let item = from.get(i);
            if (!item || item.id != itemId) {
                continue;
            }

            if (withdrawn >= count) {
                break;
            }

            let left = count - withdrawn;
            let copy = { id: item.id, count: Math.min(left, item.count) };

            let transfer = from.transfer(to, copy, i, -1, note, !note);
            withdrawn += transfer?.completed ?? 0;
        }

        if (withdrawn == 0) {
            this.mes("You don't have enough inventory space.");
        } else if (withdrawn < count) {
            this.mes("You don't have enough inventory space to withdraw that many.");
        }

        // from.shift();
    }
}

ScriptManager.register('IF_BUTTON1', { interfaceId: 5382 }, WithdrawItem);
ScriptManager.register('IF_BUTTON2', { interfaceId: 5382 }, WithdrawItem);
ScriptManager.register('IF_BUTTON3', { interfaceId: 5382 }, WithdrawItem);
ScriptManager.register('IF_BUTTON4', { interfaceId: 5382 }, WithdrawItem);
ScriptManager.register('IF_BUTTON5', { interfaceId: 5382 }, WithdrawItem);

// ----

class UpdateBankMove extends BaseScript {
    *run(player) {
        const { fromSlot, toSlot } = this.params;

        player.bank.swap(fromSlot, toSlot);
        // player.bank.shift();
    }
}

ScriptManager.register('IF_BUTTOND', { interfaceId: 5382 }, UpdateBankMove);

// ----

class UpdateBankBackpackMove extends BaseScript {
    *run(player) {
        const { fromSlot, toSlot } = this.params;

        player.inv.swap(fromSlot, toSlot);
    }
}

ScriptManager.register('IF_BUTTOND', { interfaceId: 5064 }, UpdateBankBackpackMove);

// ----

class SetWithdrawItemState extends BaseScript {
    *run(player) {
        player.withdrawCert = false;
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 5387 }, SetWithdrawItemState);

// ----

class SetWithdrawCertState extends BaseScript {
    *run(player) {
        player.withdrawCert = true;
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 5386 }, SetWithdrawCertState);
