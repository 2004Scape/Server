-- CreateTable
CREATE TABLE "message_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thread_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    "read" DATETIME,
    "deleted" DATETIME
);
