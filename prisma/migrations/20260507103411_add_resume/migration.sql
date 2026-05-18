/*
  Warnings:

  - You are about to drop the column `password` on the `employee` table. All the data in the column will be lost.
  - Added the required column `resume` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `password`,
    ADD COLUMN `resume` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;
