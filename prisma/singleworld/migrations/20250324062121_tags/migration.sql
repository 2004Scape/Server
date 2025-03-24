-- CreateTable
CREATE TABLE "tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "account_tag" (
    "tag_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("account_id", "tag_id")
);
