/*
  Warnings:

  - You are about to drop the column `category_id` on the `newspost` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `newspost` table. All the data in the column will be lost.
  - You are about to drop the `newspost_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `newspost` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated` on table `newspost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `newspost` DROP COLUMN `category_id`,
    DROP COLUMN `date`,
    ADD COLUMN `category` INTEGER NOT NULL,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `slug` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` MEDIUMTEXT NOT NULL,
    MODIFY `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `newspost_category`;

-- CreateTable
CREATE TABLE `hiscore` (
    `account_id` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`account_id`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hiscore_large` (
    `account_id` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `value` BIGINT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`account_id`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
