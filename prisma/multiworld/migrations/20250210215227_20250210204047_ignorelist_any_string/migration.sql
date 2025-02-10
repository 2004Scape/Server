/*
  Warnings:

  - The primary key for the `ignorelist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ignore_account_id` on the `ignorelist` table. All the data in the column will be lost.
  - Added the required column `value` to the `ignorelist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ignorelist` 
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

UPDATE `ignorelist` il
JOIN `account` a ON il.`ignore_account_id` = a.`id`
SET il.`value` = a.`username`;

ALTER TABLE `ignorelist`
    DROP COLUMN `ignore_account_id`,
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (`account_id`, `value`);
