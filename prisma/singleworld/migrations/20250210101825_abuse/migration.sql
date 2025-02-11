-- CreateTable
CREATE TABLE "login" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "world" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "uid" INTEGER NOT NULL,
    "ip" TEXT
);

-- CreateTable
CREATE TABLE "ipban" (
    "ip" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "registration_ip" TEXT,
    "registration_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logged_in" INTEGER NOT NULL DEFAULT 0,
    "login_time" DATETIME,
    "logged_out" INTEGER NOT NULL DEFAULT 0,
    "logout_time" DATETIME,
    "muted_until" DATETIME,
    "banned_until" DATETIME,
    "staffmodlevel" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "notes_updated" DATETIME
);
INSERT INTO "new_account" ("banned_until", "email", "id", "logged_in", "login_time", "muted_until", "password", "registration_date", "registration_ip", "staffmodlevel", "username") SELECT "banned_until", "email", "id", "logged_in", "login_time", "muted_until", "password", "registration_date", "registration_ip", "staffmodlevel", "username" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
