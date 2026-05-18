/*
  Warnings:

  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Employer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Employer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `employer` ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AssessmentSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `testingCenter` VARCHAR(191) NOT NULL,
    `assessmentDate` VARCHAR(191) NOT NULL,
    `assessmentTime` VARCHAR(191) NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,
    `cardName` VARCHAR(191) NULL,
    `cardNumber` VARCHAR(191) NULL,
    `expiryDate` VARCHAR(191) NULL,
    `cvv` VARCHAR(191) NULL,
    `upiId` VARCHAR(191) NULL,
    `amount` VARCHAR(191) NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
