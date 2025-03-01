-- CreateTable
CREATE TABLE `input_report` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `account_id` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `session_uuid` VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE `input_report_event` (
    `input_report_id` INTEGER NOT NULL,
    `seq` INTEGER NOT NULL,
    `input_type` INTEGER NOT NULL DEFAULT -1,
    `delta` INTEGER NOT NULL,
    `coord` INTEGER NOT NULL,
    `mouse_x` INTEGER NULL,
    `mouse_y` INTEGER NULL,
    `key_code` INTEGER NULL,

    PRIMARY KEY (`input_report_id`, `seq`)
);
