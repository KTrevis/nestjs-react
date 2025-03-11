/*
  Warnings:

  - Added the required column `creatorId` to the `ChatGroup` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    CONSTRAINT "ChatGroup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChatGroup" ("id", "name") SELECT "id", "name" FROM "ChatGroup";
DROP TABLE "ChatGroup";
ALTER TABLE "new_ChatGroup" RENAME TO "ChatGroup";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
