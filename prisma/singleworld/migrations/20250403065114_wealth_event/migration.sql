-- CreateTable
CREATE TABLE "wealth_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL,
    "coord" INTEGER NOT NULL,
    "world" INTEGER NOT NULL DEFAULT 0,
    "profile" TEXT NOT NULL DEFAULT 'main',
    "event_type" INTEGER NOT NULL DEFAULT -1,
    "account_id" INTEGER NOT NULL,
    "account_session" TEXT NOT NULL,
    "account_items" TEXT NOT NULL,
    "account_value" INTEGER NOT NULL,
    "recipient_id" INTEGER,
    "recipient_session" TEXT,
    "recipient_items" TEXT,
    "recipient_value" INTEGER
);

-- CreateIndex
CREATE INDEX "wealth_event_recipient_id_idx" ON "wealth_event"("recipient_id");
