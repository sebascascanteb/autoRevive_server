/*
  Warnings:

  - You are about to drop the column `branch` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `branch`,
    ADD COLUMN `branchId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
