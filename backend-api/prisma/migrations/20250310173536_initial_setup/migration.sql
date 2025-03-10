-- CreateTable
CREATE TABLE "TeeTime" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "min_players" INTEGER NOT NULL,
    "max_players" INTEGER NOT NULL,
    "holes" INTEGER NOT NULL,
    "golfCourseName" TEXT NOT NULL,
    "courseUrl" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeeTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeeTime_date_idx" ON "TeeTime"("date");

-- CreateIndex
CREATE INDEX "TeeTime_golfCourseName_idx" ON "TeeTime"("golfCourseName");
