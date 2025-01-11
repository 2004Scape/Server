-- AlterTable
ALTER TABLE `account` ADD COLUMN `banned_until` DATETIME(3) NULL,
    ADD COLUMN `muted_until` DATETIME(3) NULL;
