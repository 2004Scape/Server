-- AlterTable
ALTER TABLE `account` ADD COLUMN `flag_removed_by_id` INTEGER NULL,
    ADD COLUMN `flag_removed_reason` VARCHAR(191) NULL,
    ADD COLUMN `flagged_at` DATETIME(3) NULL,
    ADD COLUMN `red_flag` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `red_flag_context` VARCHAR(191) NULL,
    ADD COLUMN `red_flag_reason` INTEGER NULL;
