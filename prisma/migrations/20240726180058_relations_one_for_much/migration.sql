/*
  Warnings:

  - You are about to drop the `_PostCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagCategories" DROP CONSTRAINT "_TagCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagCategories" DROP CONSTRAINT "_TagCategories_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "tagId" INTEGER;

-- DropTable
DROP TABLE "_PostCategories";

-- DropTable
DROP TABLE "_TagCategories";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
