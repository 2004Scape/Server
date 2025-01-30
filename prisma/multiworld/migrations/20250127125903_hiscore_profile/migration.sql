/*
  Warnings:

  - You are about to drop the column `game` on the `account_session` table. All the data in the column will be lost.
  - The primary key for the `hiscore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hiscore_large` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `account_session` DROP COLUMN `game`,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL DEFAULT 'main';

-- AlterTable
ALTER TABLE `hiscore` DROP PRIMARY KEY,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL DEFAULT 'main',
    ADD PRIMARY KEY (`account_id`, `profile`, `type`);

-- AlterTable
ALTER TABLE `hiscore_large` DROP PRIMARY KEY,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL DEFAULT 'main',
    ADD PRIMARY KEY (`account_id`, `profile`, `type`);

-- AlterTable
ALTER TABLE `private_chat` ADD COLUMN `profile` VARCHAR(191) NOT NULL DEFAULT 'main';

-- AlterTable
ALTER TABLE `public_chat` ADD COLUMN `profile` VARCHAR(191) NOT NULL DEFAULT 'main';
