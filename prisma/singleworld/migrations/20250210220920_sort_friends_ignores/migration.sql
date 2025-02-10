-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_friendlist" (
    "account_id" INTEGER NOT NULL,
    "friend_account_id" INTEGER NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("account_id", "friend_account_id")
);
INSERT INTO "new_friendlist" ("account_id", "friend_account_id") SELECT "account_id", "friend_account_id" FROM "friendlist";
DROP TABLE "friendlist";
ALTER TABLE "new_friendlist" RENAME TO "friendlist";
CREATE TABLE "new_ignorelist" (
    "account_id" INTEGER NOT NULL,
    "ignore_account_id" INTEGER NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("account_id", "ignore_account_id")
);
INSERT INTO "new_ignorelist" ("account_id", "ignore_account_id") SELECT "account_id", "ignore_account_id" FROM "ignorelist";
DROP TABLE "ignorelist";
ALTER TABLE "new_ignorelist" RENAME TO "ignorelist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
