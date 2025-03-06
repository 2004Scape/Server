-- CreateTable
CREATE TABLE "message_thread" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "to_account_id" INTEGER,
    "from_account_id" INTEGER NOT NULL,
    "last_message_from" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" DATETIME,
    "closed" DATETIME,
    "to_deleted" DATETIME,
    "from_deleted" DATETIME,
    "messages" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thread_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "sender_ip" TEXT NOT NULL,
    "sender" TEXT NOT NULL DEFAULT 'me',
    "content" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
