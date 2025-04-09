-- AlterTable
ALTER TABLE `account` ADD COLUMN `oauth_provider` VARCHAR(191) NULL,
    ADD COLUMN `password_updated` DATETIME(3) NULL;
