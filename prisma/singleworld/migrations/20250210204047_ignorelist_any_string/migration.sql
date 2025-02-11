/*
  Warnings:

  - The primary key for the `ignorelist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ignore_account_id` on the `ignorelist` table. All the data in the column will be lost.
  - Added the required column `value` to the `ignorelist` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ignorelist" (
    "account_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("account_id", "value")
);

INSERT INTO "new_ignorelist" ("account_id", "value")
  SELECT 
      il."account_id", 
      a."username" AS "value"
  FROM 
      "ignorelist" il
  JOIN 
      "account" a ON il."ignore_account_id" = a."id";

DROP TABLE "ignorelist";

ALTER TABLE "new_ignorelist"
  RENAME TO "ignorelist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
