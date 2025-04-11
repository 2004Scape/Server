-- CreateTable
CREATE TABLE `wealth_event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NOT NULL,
    `coord` INTEGER NOT NULL,
    `world` INTEGER NOT NULL DEFAULT 0,
    `profile` VARCHAR(191) NOT NULL DEFAULT 'main',
    `event_type` INTEGER NOT NULL DEFAULT -1,
    `account_id` INTEGER NOT NULL,
    `account_session` VARCHAR(191) NOT NULL,
    `account_items` MEDIUMTEXT NOT NULL,
    `account_value` INTEGER NOT NULL,
    `recipient_id` INTEGER NULL,
    `recipient_session` VARCHAR(191) NULL,
    `recipient_items` MEDIUMTEXT NULL,
    `recipient_value` INTEGER NULL,

    INDEX `wealth_event_recipient_id_idx`(`recipient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
