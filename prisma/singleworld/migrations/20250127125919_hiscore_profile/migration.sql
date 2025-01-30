/*
  Warnings:

  - You are about to drop the column `game` on the `account_session` table. All the data in the column will be lost.
  - The primary key for the `hiscore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hiscore_large` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account_session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "world" INTEGER NOT NULL DEFAULT 0,
    "profile" TEXT NOT NULL DEFAULT 'main',
    "session_uuid" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "coord" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "event_type" INTEGER NOT NULL DEFAULT -1
);
INSERT INTO "new_account_session" ("account_id", "coord", "event", "event_type", "id", "session_uuid", "timestamp", "world") SELECT "account_id", "coord", "event", "event_type", "id", "session_uuid", "timestamp", "world" FROM "account_session";
DROP TABLE "account_session";
ALTER TABLE "new_account_session" RENAME TO "account_session";
CREATE TABLE "new_hiscore" (
    "profile" TEXT NOT NULL DEFAULT 'main',
    "account_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("profile", "account_id", "type")
);
INSERT INTO "new_hiscore" ("account_id", "date", "level", "type", "value") SELECT "account_id", "date", "level", "type", "value" FROM "hiscore";
DROP TABLE "hiscore";
ALTER TABLE "new_hiscore" RENAME TO "hiscore";
CREATE TABLE "new_hiscore_large" (
    "profile" TEXT NOT NULL DEFAULT 'main',
    "account_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "value" BIGINT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("profile", "account_id", "type")
);
INSERT INTO "new_hiscore_large" ("account_id", "date", "level", "type", "value") SELECT "account_id", "date", "level", "type", "value" FROM "hiscore_large";
DROP TABLE "hiscore_large";
ALTER TABLE "new_hiscore_large" RENAME TO "hiscore_large";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
