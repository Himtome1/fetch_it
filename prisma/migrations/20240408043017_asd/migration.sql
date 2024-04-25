/*
  Warnings:

  - You are about to drop the column `user_id` on the `jobs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jobs" (
    "job_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_email" TEXT,
    "driver_id" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "pickup_location" TEXT,
    "dropoff_location" TEXT,
    "date" TEXT,
    "status" TEXT,
    "price" REAL,
    "distance" REAL,
    "time" REAL,
    "job_object" TEXT,
    "load_type" TEXT
);
INSERT INTO "new_jobs" ("date", "description", "distance", "driver_id", "dropoff_location", "job_id", "job_object", "pickup_location", "price", "status", "time", "title") SELECT "date", "description", "distance", "driver_id", "dropoff_location", "job_id", "job_object", "pickup_location", "price", "status", "time", "title" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
