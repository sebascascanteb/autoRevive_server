/*
  Warnings:

  - Added the required column `answer1` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer2` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer3` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoicedetail` DROP FOREIGN KEY `InvoiceDetail_productId_fkey`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `canceled` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO';

-- AlterTable
ALTER TABLE `invoicedetail` ADD COLUMN `serviceId` INTEGER NULL,
    MODIFY `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `answer1` VARCHAR(191) NOT NULL,
    ADD COLUMN `answer2` VARCHAR(191) NOT NULL,
    ADD COLUMN `answer3` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDetail` ADD CONSTRAINT `InvoiceDetail_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
