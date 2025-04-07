-- CreateTable
CREATE TABLE `mod_action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `target_id` INTEGER NULL,
    `action_id` INTEGER NOT NULL,
    `data` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
