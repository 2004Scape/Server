-- CreateTable
CREATE TABLE `friendlist` (
    `account_id` INTEGER NOT NULL,
    `friend_account_id` INTEGER NOT NULL,

    PRIMARY KEY (`account_id`, `friend_account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ignorelist` (
    `account_id` INTEGER NOT NULL,
    `ignore_account_id` INTEGER NOT NULL,

    PRIMARY KEY (`account_id`, `ignore_account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
