-- AlterTable
ALTER TABLE `account` MODIFY `members` BOOLEAN NOT NULL DEFAULT false;
UPDATE `account` SET `members` = false;
