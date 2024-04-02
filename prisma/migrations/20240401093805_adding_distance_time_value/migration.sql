/*
  Warnings:

  - You are about to alter the column `price` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_jobs" (
    "job_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "description" TEXT,
    "load_weight" INTEGER,
    "pickup_location" TEXT,
    "dropoff_location" TEXT,
    "date" TEXT,
    "status" TEXT,
    "price" REAL,
    "distance" REAL,
    "time" REAL
);
INSERT INTO "new_jobs" ("date", "description", "distance", "dropoff_location", "job_id", "load_weight", "pickup_location", "price", "status", "time", "user_id") SELECT "date", "description", "distance", "dropoff_location", "job_id", "load_weight", "pickup_location", "price", "status", "time", "user_id" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
