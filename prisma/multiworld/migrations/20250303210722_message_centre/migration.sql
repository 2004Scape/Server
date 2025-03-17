-- CreateTable
CREATE TABLE `message_thread` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `to_account_id` INTEGER NULL,
    `from_account_id` INTEGER NOT NULL,
    `last_message_from` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `read` DATETIME(3) NULL,
    `closed` DATETIME(3) NULL,
    `to_deleted` DATETIME(3) NULL,
    `from_deleted` DATETIME(3) NULL,
    `messages` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thread_id` INTEGER NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `sender_ip` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL DEFAULT 'me',
    `content` TEXT NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
