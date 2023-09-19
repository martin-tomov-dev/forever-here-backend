/*
  Warnings:

  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `documents`;

-- CreateTable
CREATE TABLE `ForeverMessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attachment` VARCHAR(191) NOT NULL,
    `receiver` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `Message` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ForeverMessages_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
