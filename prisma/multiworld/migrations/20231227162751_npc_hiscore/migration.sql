-- CreateTable
CREATE TABLE `npc_hiscore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `npc_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `kill_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
