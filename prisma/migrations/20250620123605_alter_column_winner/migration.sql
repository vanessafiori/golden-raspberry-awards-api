-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_movie" ("id", "producer", "studio", "title", "winner", "year") SELECT "id", "producer", "studio", "title", coalesce("winner", false) AS "winner", "year" FROM "movie";
DROP TABLE "movie";
ALTER TABLE "new_movie" RENAME TO "movie";
CREATE UNIQUE INDEX "movie_title_key" ON "movie"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
