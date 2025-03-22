-- AlterTable
ALTER TABLE `account` ADD COLUMN `tfa_enabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tfa_incorrect_attempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tfa_last_code` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tfa_secret_base32` VARCHAR(191) NULL;
