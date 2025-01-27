-- AlterTable
ALTER TABLE `account` ADD COLUMN `logged_in` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `login_time` DATETIME(3) NULL;
