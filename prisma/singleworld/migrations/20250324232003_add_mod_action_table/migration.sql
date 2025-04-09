-- CreateTable
CREATE TABLE "mod_action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "target_id" INTEGER,
    "action_id" INTEGER NOT NULL,
    "data" TEXT,
    "ip" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
