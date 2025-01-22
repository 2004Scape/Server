-- AlterTable
ALTER TABLE `account` ADD COLUMN `staffmodlevel` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `account_session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `game` VARCHAR(191) NOT NULL,
    `session_uuid` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `coord` INTEGER NOT NULL,
    `event` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
