-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "driver" BOOLEAN NOT NULL DEFAULT false,
    "user" BOOLEAN NOT NULL DEFAULT false,
    "subscription_status" TEXT
);
INSERT INTO "new_user" ("driver", "email", "id", "name", "password", "subscription_status", "user") SELECT "driver", "email", "id", "name", "password", "subscription_status", "user" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
