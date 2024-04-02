-- CreateTable
CREATE TABLE "jobs" (
    "job_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "description" TEXT,
    "load_weight" INTEGER,
    "pickup_location" TEXT,
    "dropoff_location" TEXT,
    "date" TEXT,
    "status" TEXT,
    "price" INTEGER
);
