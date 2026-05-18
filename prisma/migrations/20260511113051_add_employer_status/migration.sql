/*
  Warnings:

  - You are about to drop the column `cardName` on the `assessmentschedule` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `assessmentschedule` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `assessmentschedule` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `assessmentschedule` table. All the data in the column will be lost.
  - You are about to drop the column `upiId` on the `assessmentschedule` table. All the data in the column will be lost.
  - Added the required column `employeeEmail` to the `AssessmentSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assessmentschedule` DROP COLUMN `cardName`,
    DROP COLUMN `cardNumber`,
    DROP COLUMN `cvv`,
    DROP COLUMN `expiryDate`,
    DROP COLUMN `upiId`,
    ADD COLUMN `employeeEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `employerStatus` VARCHAR(191) NOT NULL DEFAULT 'PENDING';
