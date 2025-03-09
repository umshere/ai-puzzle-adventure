import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper functions for database operations

/**
 * Create a new user
 */
export async function createUser(data: { username: string; email?: string }) {
  return prisma.user.create({
    data,
  });
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      scores: true,
      levels: true,
    },
  });
}

/**
 * Create a new level
 */
export async function createLevel(data: {
  creatorId?: string;
  title?: string;
  theme: string;
  difficultyRating: number;
  layout: any; // Will be stringified
  obstacles: any; // Will be stringified
  items?: any; // Will be stringified
  startPosition?: { x: number; y: number }; // Will be stringified
  endPosition?: { x: number; y: number }; // Will be stringified
  isPublished?: boolean;
}) {
  return prisma.level.create({
    data: {
      ...data,
      layout: JSON.stringify(data.layout),
      obstacles: JSON.stringify(data.obstacles),
      items: data.items ? JSON.stringify(data.items) : null,
      startPosition: data.startPosition
        ? JSON.stringify(data.startPosition)
        : null,
      endPosition: data.endPosition ? JSON.stringify(data.endPosition) : null,
    },
  });
}

/**
 * Get a level by ID
 */
export async function getLevelById(id: string) {
  const level = await prisma.level.findUnique({
    where: { id },
    include: {
      creator: true,
      scores: {
        orderBy: {
          score: "desc",
        },
        take: 10,
        include: {
          user: true,
        },
      },
    },
  });

  if (!level) return null;

  // Parse JSON strings back to objects
  return {
    ...level,
    layout: JSON.parse(level.layout),
    obstacles: JSON.parse(level.obstacles),
    items: level.items ? JSON.parse(level.items) : null,
    startPosition: level.startPosition ? JSON.parse(level.startPosition) : null,
    endPosition: level.endPosition ? JSON.parse(level.endPosition) : null,
  };
}

/**
 * Submit a score
 */
export async function submitScore(data: {
  userId: string;
  levelId: string;
  score: number;
  timeMs?: number;
  moves?: number;
}) {
  return prisma.score.create({
    data,
  });
}

/**
 * Get top scores for a level
 */
export async function getTopScoresForLevel(levelId: string, limit = 10) {
  return prisma.score.findMany({
    where: {
      levelId,
    },
    orderBy: {
      score: "desc",
    },
    take: limit,
    include: {
      user: true,
    },
  });
}
