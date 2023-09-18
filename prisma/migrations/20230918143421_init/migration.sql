/*
  Warnings:

  - You are about to drop the column `user_id` on the `documents` table. All the data in the column will be lost.
  - Added the required column `email` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `documents` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
