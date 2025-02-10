-- AlterTable
ALTER TABLE `account` ADD COLUMN `logged_out` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `logout_time` DATETIME(3) NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `notes_updated` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `login` (
    `uuid` VARCHAR(191) NOT NULL,
    `account_id` INTEGER NOT NULL,
    `world` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `uid` INTEGER NOT NULL,
    `ip` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ipban` (
    `ip` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
