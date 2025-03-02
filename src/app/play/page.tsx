"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import GameCanvas from "@/components/GameCanvas";

// Mock function to generate a level
const generateLevel = async () => {
  try {
    const response = await axios.post("/api/generate", {
      playerSkill: 4,
      theme: "sci-fi"
    });
    
    return response.data;
  } catch (error) {
    console.error("Error generating level:", error);
    
    // Fallback level if API fails
    return {
      levelId: "abc123",
      layout: [
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
      ],
      obstacles: [
        { x: 1, y: 2, type: "spike" },
        { x: 3, y: 2, type: "laser" }
      ],
      difficultyRating: 4,
    };
  }
};

export default function PlayGame() {
  const [level, setLevel] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLevel = async () => {
    setIsGenerating(true);
    try {
      const newLevel = await generateLevel();
      setLevel(newLevel);
    } catch (err) {
      console.error("Failed to generate level:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // Generate a level when the component mounts
    handleGenerateLevel();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Puzzle Adventure</h1>
          <Link href="/" className="text-white hover:text-blue-200">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="container mx-auto">
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {level ? `Level: ${level.levelId}` : "Loading level..."}
                  </h2>
                  {level && (
                    <p className="text-gray-600">
                      Difficulty: {level.difficultyRating}/10
                    </p>
                  )}
                </div>
                <button
                  onClick={handleGenerateLevel}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : "New Level"}
                </button>
              </div>

              {level && (
                <GameCanvas
                  levelData={level}
                  onScoreUpdate={setScore}
                  onGameComplete={() => setGameCompleted(true)}
                />
              )}

              {level && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Game Controls:</h3>
                  <ul className="list-disc pl-5">
                    <li>Arrow keys to move</li>
                    <li>Space to interact</li>
                    <li>ESC to pause</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
