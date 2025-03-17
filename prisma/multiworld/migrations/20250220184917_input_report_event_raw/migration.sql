-- CreateTable
CREATE TABLE `input_report_event_raw` (
    `input_report_id` INTEGER NOT NULL,
    `seq` INTEGER NOT NULL,
    `coord` INTEGER NOT NULL,
    `data` LONGBLOB NOT NULL,

    PRIMARY KEY (`input_report_id`, `seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
