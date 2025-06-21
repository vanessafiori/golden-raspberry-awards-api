-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "winner" BOOLEAN DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_title_key" ON "movie"("title");
