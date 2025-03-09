import { NextRequest, NextResponse } from "next/server";
import { klusterClient } from "@/lib/kluster";

// Fallback level generator when AI APIs are not available
function generateLevelStub(playerSkill = 3, theme = "default") {
  // Generate a simple grid layout
  const size = Math.max(3, Math.min(8, playerSkill + 2));
  let layout = Array(size)
    .fill(0)
    .map(() =>
      Array(size)
        .fill(0)
        .map(() => (Math.random() > 0.7 ? 1 : 0))
    );

  // Run-length encode the layout
  let encodedLayout = [];
  for (let row of layout) {
    let count = 1;
    for (let i = 1; i < row.length; i++) {
      if (row[i] === row[i - 1]) {
        count++;
      } else {
        encodedLayout.push(count);
        count = 1;
      }
    }
    encodedLayout.push(count);
  }
  layout = encodedLayout;

  // Add some obstacles based on difficulty
  const obstacles = [];
  const obstacleCount = Math.floor(playerSkill * 1.5);

  for (let i = 0; i < obstacleCount; i++) {
    obstacles.push({
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
      type: ["spike", "laser", "trap"][Math.floor(Math.random() * 3)],
    });
  }

  // Generate a unique level ID
  const levelId = `${theme}-${Date.now().toString(36)}`;

  return {
    levelId,
    layout,
    obstacles,
    difficultyRating: playerSkill,
    theme,
  };
}

// Helper function to run-length encode the layout
function encodeLayout(layout: number[][]): number[] {
  let encodedLayout: number[] = [];
  for (let row of layout) {
    let count = 1;
    for (let i = 1; i < row.length; i++) {
      if (row[i] === row[i - 1]) {
        count++;
      } else {
        encodedLayout.push(count);
        count = 1;
      }
    }
    encodedLayout.push(count);
  }
  return encodedLayout;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate and sanitize inputs
    const playerSkill = Math.min(Math.max(body.playerSkill || 3, 1), 10);
    const theme = (body.theme || "sci-fi")
      .toString()
      .slice(0, 20)
      .replace(/[^a-zA-Z0-9-]/g, "");

    // Try to use Kluster API
    if (klusterClient.isConfigured()) {
      try {
        console.log("Using Kluster API for level generation");
        const levelData = await klusterClient.generateLevel({
          playerSkill,
          theme,
        });
        const encodedLayout = encodeLayout(levelData.layout);
        return NextResponse.json({
          levelId: `${theme}-${Date.now().toString(36)}`,
          layout: encodedLayout || generateLevelStub(playerSkill, theme).layout,
          obstacles: levelData.obstacles || [],
          difficultyRating: playerSkill,
          theme: theme,
        });
      } catch (klusterError) {
        console.error("Kluster API call failed:", klusterError);
        // Fall through to stub
      }
    }

    // Fallback to stub if API fails or is not configured
    console.log("Using fallback stub for level generation");
    const levelData = generateLevelStub(playerSkill, theme);
    return NextResponse.json(levelData);
  } catch (error) {
    console.error("Error generating level:", error);
    return NextResponse.json(
      { error: "Failed to generate level" },
      { status: 500 }
    );
  }
}
