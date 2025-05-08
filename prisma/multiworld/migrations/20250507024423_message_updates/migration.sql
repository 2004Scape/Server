/*
  Warnings:

  - You are about to drop the column `sender` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `from_deleted` on the `message_thread` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `message_thread` table. All the data in the column will be lost.
  - You are about to drop the column `to_deleted` on the `message_thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `sender`,
    ADD COLUMN `deleted` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `edited` DATETIME(3) NULL,
    ADD COLUMN `edited_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `message_thread` DROP COLUMN `from_deleted`,
    DROP COLUMN `read`,
    DROP COLUMN `to_deleted`,
    ADD COLUMN `closed_by` INTEGER NULL,
    ADD COLUMN `marked_spam` DATETIME(3) NULL,
    ADD COLUMN `marked_spam_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `category` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `message_tag` (
    `tag_id` INTEGER NOT NULL,
    `thread_id` INTEGER NOT NULL,

    PRIMARY KEY (`thread_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
