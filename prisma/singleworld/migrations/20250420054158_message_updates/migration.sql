-- AlterTable
ALTER TABLE "message" ADD COLUMN "deleted" DATETIME;
ALTER TABLE "message" ADD COLUMN "deleted_by" INTEGER;
ALTER TABLE "message" ADD COLUMN "edited" DATETIME;
ALTER TABLE "message" ADD COLUMN "edited_by" INTEGER;

-- AlterTable
ALTER TABLE "message_thread" ADD COLUMN "closed_by" INTEGER;
ALTER TABLE "message_thread" ADD COLUMN "marked_spam" DATETIME;
ALTER TABLE "message_thread" ADD COLUMN "marked_spam_by" INTEGER;

-- CreateTable
CREATE TABLE "message_tag" (
    "tag_id" INTEGER NOT NULL,
    "thread_id" INTEGER NOT NULL,

    PRIMARY KEY ("thread_id", "tag_id")
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
