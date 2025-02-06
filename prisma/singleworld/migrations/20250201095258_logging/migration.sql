/*
  Warnings:

  - You are about to drop the `npc_hiscore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `date` on the `private_chat` table. All the data in the column will be lost.
  - You are about to drop the column `from_account_id` on the `private_chat` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `public_chat` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coord` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `private_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coord` to the `public_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `public_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `public_chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `world` to the `public_chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN "email" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "npc_hiscore";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "session" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "world" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "uid" INTEGER NOT NULL,
    "ip" TEXT
);

-- CreateTable
CREATE TABLE "report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "world" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "coord" INTEGER NOT NULL,
    "offender" TEXT NOT NULL,
    "reason" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_private_chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "coord" INTEGER NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_private_chat" ("id", "message", "to_account_id") SELECT "id", "message", "to_account_id" FROM "private_chat";
DROP TABLE "private_chat";
ALTER TABLE "new_private_chat" RENAME TO "private_chat";
CREATE TABLE "new_public_chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "profile" TEXT NOT NULL,
    "world" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "coord" INTEGER NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_public_chat" ("account_id", "id", "message") SELECT "account_id", "id", "message" FROM "public_chat";
DROP TABLE "public_chat";
ALTER TABLE "new_public_chat" RENAME TO "public_chat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
