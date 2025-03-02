import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { geminiClient } from "@/lib/gemini";
import { openRouterClient } from "@/lib/openrouter";

// Fallback level generator when AI APIs are not available
function generateLevelStub(playerSkill = 3, theme = "default") {
  // Generate a simple grid layout
  const size = Math.max(3, Math.min(8, playerSkill + 2));
  const layout = Array(size)
    .fill(0)
    .map(() =>
      Array(size)
        .fill(0)
        .map(() => (Math.random() > 0.7 ? 1 : 0))
    );

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

// Call OpenRouter API to generate a level
async function callOpenRouter(promptData: any) {
  if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_API_TOKEN) {
    console.log("OpenRouter tokens missing, using fallback AI stub.");
    return generateLevelStub(promptData.playerSkill, promptData.theme);
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_TOKEN}`,
        "X-API-Key": process.env.OPENROUTER_API_KEY,
      },
    };

    // This is a simplified example - in a real implementation,
    // we would craft a proper prompt for the AI
    const response = await axios.post(
      "https://api.openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-opus:beta",
        messages: [
          {
            role: "system",
            content:
              "You are a puzzle game level designer. Generate a JSON level layout for a puzzle game.",
          },
          {
            role: "user",
            content: `Create a ${promptData.theme} themed puzzle level with difficulty ${promptData.playerSkill}/10.`,
          },
        ],
        response_format: { type: "json_object" },
      },
      config
    );

    // Parse the AI response and convert to our level format
    // This is simplified - in reality we would need more robust parsing
    try {
      const aiResponse = response.data.choices[0].message.content;
      const parsedResponse = JSON.parse(aiResponse);

      return {
        levelId: `${promptData.theme}-${Date.now().toString(36)}`,
        layout:
          parsedResponse.layout ||
          generateLevelStub(promptData.playerSkill, promptData.theme).layout,
        obstacles: parsedResponse.obstacles || [],
        difficultyRating: promptData.playerSkill,
        theme: promptData.theme,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return generateLevelStub(promptData.playerSkill, promptData.theme);
    }
  } catch (err) {
    console.error("OpenRouter call failed:", err);
    return generateLevelStub(promptData.playerSkill, promptData.theme);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerSkill = 3, theme = "sci-fi" } = body;

    // Try to use Gemini API first
    if (geminiClient.isConfigured()) {
      try {
        console.log("Using Gemini API for level generation");
        const levelData = await geminiClient.generateLevel({
          playerSkill,
          theme,
        });
        return NextResponse.json({
          levelId: `${theme}-${Date.now().toString(36)}`,
          layout:
            levelData.layout || generateLevelStub(playerSkill, theme).layout,
          obstacles: levelData.obstacles || [],
          difficultyRating: playerSkill,
          theme: theme,
        });
      } catch (geminiError) {
        console.error("Gemini API call failed:", geminiError);
        // Fall through to OpenRouter or stub
      }
    }

    // Try OpenRouter API next
    if (openRouterClient.isConfigured()) {
      try {
        console.log("Using OpenRouter API for level generation");
        const levelData = await openRouterClient.generateLevel({
          playerSkill,
          theme,
        });
        return NextResponse.json({
          levelId: `${theme}-${Date.now().toString(36)}`,
          layout:
            levelData.layout || generateLevelStub(playerSkill, theme).layout,
          obstacles: levelData.obstacles || [],
          difficultyRating: playerSkill,
          theme: theme,
        });
      } catch (openRouterError) {
        console.error("OpenRouter API call failed:", openRouterError);
        // Fall through to stub
      }
    }

    // Fallback to stub if both APIs fail or are not configured
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
