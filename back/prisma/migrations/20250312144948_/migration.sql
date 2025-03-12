/*
  Warnings:

  - The primary key for the `ChatGroupUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `ChatGroupUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ChatGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `ChatGroupUsers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatGroupUsers" (
    "creatorId" INTEGER NOT NULL,
    "chatGroupId" INTEGER NOT NULL,

    PRIMARY KEY ("creatorId", "chatGroupId"),
    CONSTRAINT "ChatGroupUsers_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ChatGroupUsers_chatGroupId_fkey" FOREIGN KEY ("chatGroupId") REFERENCES "ChatGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChatGroupUsers" ("chatGroupId") SELECT "chatGroupId" FROM "ChatGroupUsers";
DROP TABLE "ChatGroupUsers";
ALTER TABLE "new_ChatGroupUsers" RENAME TO "ChatGroupUsers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ChatGroup_name_key" ON "ChatGroup"("name");
