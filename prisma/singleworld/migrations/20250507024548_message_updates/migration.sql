/*
  Warnings:

  - You are about to drop the column `sender` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `from_deleted` on the `message_thread` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `message_thread` table. All the data in the column will be lost.
  - You are about to drop the column `to_deleted` on the `message_thread` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "message_tag" (
    "tag_id" INTEGER NOT NULL,
    "thread_id" INTEGER NOT NULL,

    PRIMARY KEY ("thread_id", "tag_id")
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thread_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "sender_ip" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited" DATETIME,
    "edited_by" INTEGER,
    "deleted" DATETIME,
    "deleted_by" INTEGER
);
INSERT INTO "new_message" ("content", "created", "id", "sender_id", "sender_ip", "thread_id") SELECT "content", "created", "id", "sender_id", "sender_ip", "thread_id" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
CREATE TABLE "new_message_thread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "to_account_id" INTEGER,
    "from_account_id" INTEGER NOT NULL,
    "last_message_from" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messages" INTEGER NOT NULL DEFAULT 1,
    "closed" DATETIME,
    "closed_by" INTEGER,
    "marked_spam" DATETIME,
    "marked_spam_by" INTEGER
);
INSERT INTO "new_message_thread" ("closed", "created", "from_account_id", "id", "last_message_from", "messages", "subject", "to_account_id", "updated") SELECT "closed", "created", "from_account_id", "id", "last_message_from", "messages", "subject", "to_account_id", "updated" FROM "message_thread";
DROP TABLE "message_thread";
ALTER TABLE "new_message_thread" RENAME TO "message_thread";
CREATE TABLE "new_tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "category" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_tag" ("color", "id", "name") SELECT "color", "id", "name" FROM "tag";
DROP TABLE "tag";
ALTER TABLE "new_tag" RENAME TO "tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
