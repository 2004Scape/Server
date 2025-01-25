/*
  Warnings:

  - You are about to drop the `newspost_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `category_id` on the `newspost` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `newspost` table. All the data in the column will be lost.
  - Added the required column `category` to the `newspost` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "newspost_category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "hiscore" (
    "account_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("account_id", "type")
);

-- CreateTable
CREATE TABLE "hiscore_large" (
    "account_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "value" BIGINT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("account_id", "type")
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_newspost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_newspost" ("content", "id", "title", "updated") SELECT "content", "id", "title", coalesce("updated", CURRENT_TIMESTAMP) AS "updated" FROM "newspost";
DROP TABLE "newspost";
ALTER TABLE "new_newspost" RENAME TO "newspost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
