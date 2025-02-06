/*
  Warnings:

  - You are about to drop the column `date` on the `private_chat` table. All the data in the column will be lost.
  - You are about to drop the column `from_account_id` on the `private_chat` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `public_chat` table. All the data in the column will be lost.
  - You are about to drop the `npc_hiscore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account_id` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coord` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coord` to the `public_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `public_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `world` to the `public_chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `private_chat` DROP COLUMN `date`,
    DROP COLUMN `from_account_id`,
    ADD COLUMN `account_id` INTEGER NOT NULL,
    ADD COLUMN `coord` INTEGER NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL,
    ALTER COLUMN `profile` DROP DEFAULT;

-- AlterTable
ALTER TABLE `public_chat` DROP COLUMN `date`,
    ADD COLUMN `coord` INTEGER NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL,
    ADD COLUMN `world` INTEGER NOT NULL,
    ALTER COLUMN `profile` DROP DEFAULT;

-- DropTable
DROP TABLE `npc_hiscore`;

-- CreateTable
CREATE TABLE `session` (
    `uuid` VARCHAR(191) NOT NULL,
    `account_id` INTEGER NOT NULL,
    `profile` VARCHAR(191) NOT NULL,
    `world` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `uid` INTEGER NOT NULL,
    `ip` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `profile` VARCHAR(191) NOT NULL,
    `world` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `coord` INTEGER NOT NULL,
    `offender` VARCHAR(191) NOT NULL,
    `reason` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
