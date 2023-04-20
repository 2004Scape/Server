import { Player } from "#engine/Player.js";

export default class InventoryUpdate {
    execute(player) {
        if (player.inv.update || player.worn.update) {
            player.updateWeight();
        }

        if (player.bankOpen) {
            if (player.bank.update) {
                player.sendFullInventory(5382, player.bank);
            }

            if (player.inv.update) {
                player.sendFullInventory(5064, player.inv);
                player.sendFullInventory(3214, player.inv); // update normal backpack to prevent flicker when closing
            }
        } else {
            if (player.inv.update) {
                player.sendFullInventory(3214, player.inv);
            }
        }

        if (player.worn.update) {
            player.mask |= Player.APPEARANCE;
            player.generateAppearance();
            player.sendFullInventory(1688, player.worn);
            player.updateBonuses();
        }
    }
}
