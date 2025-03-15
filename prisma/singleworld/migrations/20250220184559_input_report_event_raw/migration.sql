/*
  Warnings:

  - The primary key for the `ignorelist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `timestamp` on the `input_report` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("datetime(3)")` to `DateTime`.

*/
-- CreateTable
CREATE TABLE "input_report_event_raw" (
    "input_report_id" INTEGER NOT NULL,
    "seq" INTEGER NOT NULL,
    "coord" INTEGER NOT NULL,
    "data" BLOB NOT NULL,

    PRIMARY KEY ("input_report_id", "seq")
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ignorelist" (
    "account_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("account_id", "value")
);
INSERT INTO "new_ignorelist" ("account_id", "created", "value") SELECT "account_id", "created", "value" FROM "ignorelist";
DROP TABLE "ignorelist";
ALTER TABLE "new_ignorelist" RENAME TO "ignorelist";
CREATE TABLE "new_input_report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "session_uuid" TEXT NOT NULL
);
INSERT INTO "new_input_report" ("account_id", "id", "session_uuid", "timestamp") SELECT "account_id", "id", "session_uuid", "timestamp" FROM "input_report";
DROP TABLE "input_report";
ALTER TABLE "new_input_report" RENAME TO "input_report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
