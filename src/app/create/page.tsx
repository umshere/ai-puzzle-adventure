"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

// Simple level editor component
export default function CreateLevel() {
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<number[][]>(
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(0))
  );
  const [theme, setTheme] = useState("default");
  const [difficulty, setDifficulty] = useState(3);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
    levelId?: string;
  } | null>(null);

  // Toggle a cell in the grid between wall (1) and empty (0)
  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  // Update grid size
  const handleGridSizeChange = (newSize: number) => {
    const newGrid = Array(newSize)
      .fill(0)
      .map((_, rowIndex) =>
        Array(newSize)
          .fill(0)
          .map((_, colIndex) => {
            // Preserve existing cells when possible
            if (rowIndex < grid.length && colIndex < grid[0].length) {
              return grid[rowIndex][colIndex];
            }
            return 0;
          })
      );
    setGridSize(newSize);
    setGrid(newGrid);
  };

  // Save the level
  const saveLevel = async () => {
    setIsSaving(true);
    setSaveResult(null);

    try {
      // In a real app, this would call the API to save the level
      // For now, we'll just simulate a successful save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveResult({
        success: true,
        message: "Level saved successfully!",
        levelId: `level-${Date.now().toString(36)}`,
      });
    } catch (error) {
      console.error("Error saving level:", error);
      setSaveResult({
        success: false,
        message: "Failed to save level. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Generate a level using AI
  const generateLevel = async () => {
    setIsSaving(true);
    setSaveResult(null);

    try {
      const response = await axios.post("/api/generate", {
        playerSkill: difficulty,
        theme,
      });

      const levelData = response.data;
      
      // Update the grid with the generated layout
      if (levelData.layout && Array.isArray(levelData.layout)) {
        const newSize = levelData.layout.length;
        setGridSize(newSize);
        setGrid(levelData.layout);
      }

      setSaveResult({
        success: true,
        message: "Level generated successfully!",
      });
    } catch (error) {
      console.error("Error generating level:", error);
      setSaveResult({
        success: false,
        message: "Failed to generate level. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Level Editor</h1>
          <Link href="/" className="text-white hover:text-green-200">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Level Settings</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Grid Size: {gridSize}x{gridSize}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={gridSize}
                    onChange={(e) => handleGridSizeChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="default">Default</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="space">Space</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Difficulty: {difficulty}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={generateLevel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50"
                  >
                    {isSaving ? "Generating..." : "Generate with AI"}
                  </button>
                  
                  <button
                    onClick={saveLevel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Level"}
                  </button>
                </div>
                
                {saveResult && (
                  <div
                    className={`mt-4 p-3 rounded ${
                      saveResult.success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {saveResult.message}
                    {saveResult.levelId && (
                      <div className="mt-2">
                        <Link
                          href={`/play?levelId=${saveResult.levelId}`}
                          className="text-blue-600 hover:underline"
                        >
                          Play this level
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Level Grid</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click cells to toggle between walls (dark) and empty spaces (light)
                </p>
                
                <div className="grid-editor border border-gray-300 inline-block">
                  {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`w-8 h-8 border border-gray-200 cursor-pointer ${
                            cell === 1
                              ? "bg-gray-800"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() => toggleCell(rowIndex, colIndex)}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Legend:</p>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-200 mr-2"></div>
                    <span>Empty space (player can move)</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-gray-800 border border-gray-200 mr-2"></div>
                    <span>Wall (blocks movement)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
