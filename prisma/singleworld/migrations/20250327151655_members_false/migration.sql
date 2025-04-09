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
    "notes_updated" DATETIME,
    "members" BOOLEAN NOT NULL DEFAULT false,
    "tfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "tfa_last_code" INTEGER NOT NULL DEFAULT 0,
    "tfa_secret_base32" TEXT,
    "tfa_incorrect_attempts" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_account" ("banned_until", "email", "id", "logged_in", "logged_out", "login_time", "logout_time", "members", "muted_until", "notes", "notes_updated", "password", "registration_date", "registration_ip", "staffmodlevel", "tfa_enabled", "tfa_incorrect_attempts", "tfa_last_code", "tfa_secret_base32", "username") SELECT "banned_until", "email", "id", "logged_in", "logged_out", "login_time", "logout_time", "members", "muted_until", "notes", "notes_updated", "password", "registration_date", "registration_ip", "staffmodlevel", "tfa_enabled", "tfa_incorrect_attempts", "tfa_last_code", "tfa_secret_base32", "username" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
UPDATE "account" SET "members" = false;
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
