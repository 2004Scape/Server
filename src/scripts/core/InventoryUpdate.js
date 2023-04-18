export default class InventoryUpdate {
    execute(player) {
        if (player.bankOpen) {
            if (player.bank.update) {
                player.sendFullInventory(5382, player.bank);
            }

            if (player.inv.update) {
                player.sendFullInventory(5064, player.inv);
            }
        } else {
            if (player.inv.update) {
                player.sendFullInventory(3214, player.inv);
            }
        }

        if (player.worn.update) {
            player.sendFullInventory(1688, player.worn);
        }
    }
}
