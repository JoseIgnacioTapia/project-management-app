/*
  Warnings:

  - A unique constraint covering the columns `[user_id,project_id]` on the table `ProjectUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_user_id_project_id_key" ON "ProjectUser"("user_id", "project_id");
