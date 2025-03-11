-- AlterTable
ALTER TABLE `schedule` MODIFY `availability` ENUM('SCHEDULE', 'BLOCK') NOT NULL DEFAULT 'SCHEDULE';
