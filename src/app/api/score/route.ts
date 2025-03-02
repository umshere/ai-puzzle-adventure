import { NextRequest, NextResponse } from "next/server";

// In-memory storage for scores (would be replaced with a database in production)
const scores: Array<{
  userId: string;
  score: number;
  levelId: string;
  timestamp: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, score, levelId } = body;

    // Validate required fields
    if (!userId || typeof score !== "number" || !levelId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create score entry
    const scoreEntry = {
      userId,
      score,
      levelId,
      timestamp: new Date().toISOString(),
    };

    // Add to in-memory storage
    scores.push(scoreEntry);

    // Calculate leaderboard position
    const levelScores = scores
      .filter((s) => s.levelId === levelId)
      .sort((a, b) => b.score - a.score);

    const leaderboardPosition =
      levelScores.findIndex(
        (s) => s.userId === userId && s.timestamp === scoreEntry.timestamp
      ) + 1;

    return NextResponse.json({
      message: "Score saved successfully",
      leaderboardPosition,
    });
  } catch (error) {
    console.error("Error saving score:", error);
    return NextResponse.json(
      { error: "Failed to save score" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get("levelId");

    if (!levelId) {
      return NextResponse.json(
        { error: "Missing levelId parameter" },
        { status: 400 }
      );
    }

    // Filter scores by levelId and sort by score (descending)
    const levelScores = scores
      .filter((s) => s.levelId === levelId)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10 scores

    return NextResponse.json({
      levelId,
      scores: levelScores,
    });
  } catch (error) {
    console.error("Error retrieving scores:", error);
    return NextResponse.json(
      { error: "Failed to retrieve scores" },
      { status: 500 }
    );
  }
}
