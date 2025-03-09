"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";

// Bubble animation component for the header
const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    size: number;
    top: number;
    left: number;
    animationDuration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Create bubbles with random properties
    const bubbleColors = [
      'rgba(79, 70, 229, 0.2)', // indigo
      'rgba(139, 92, 246, 0.2)', // violet
      'rgba(59, 130, 246, 0.2)', // blue
    ];
    
    const newBubbles = Array(8).fill(null).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 40, // 40-100px
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 8 + 12, // 12-20s
      delay: Math.random() * 5,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
    }));
    
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color.replace('0.2', '0.4')} 0%, ${bubble.color} 100%)`,
            boxShadow: `0 8px 32px ${bubble.color.replace('0.2', '0.1')}`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.delay}s`,
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        />
      ))}
    </div>
  );
};

// Custom slider component
const CustomSlider = ({ 
  value, 
  onChange, 
  min, 
  max, 
  label,
  colorClass = "from-indigo-600 to-violet-600"
}: { 
  value: number; 
  onChange: (value: number) => void; 
  min: number; 
  max: number; 
  label: string;
  colorClass?: string;
}) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2 text-gray-800 dark:text-white">
        {label}: <span className="text-indigo-600 font-semibold">{value}</span>
      </label>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`absolute h-full bg-gradient-to-r ${colorClass} rounded-full`}
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
        style={{ marginTop: "-8px" }}
      />
    </div>
  );
};

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
    levelId?: string;
  } | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null);

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
    setIsGenerating(true);
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
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="relative bg-gradient-to-r from-indigo-900 via-violet-900 to-indigo-800 text-white py-6 overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 drop-shadow-md">
            Level Editor
          </h1>
          <Link 
            href="/" 
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-100">
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
                  Level Settings
                </h2>
                
                <CustomSlider 
                  value={gridSize} 
                  onChange={handleGridSizeChange} 
                  min={3} 
                  max={10} 
                  label={`Grid Size (${gridSize}×${gridSize})`}
                />
                
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2 text-gray-800 dark:text-white">
                    Theme
                  </label>
                  <div className="relative">
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full p-3 pr-10 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none transition-colors duration-200"
                    >
                      <option value="default">Default</option>
                      <option value="sci-fi">Sci-Fi</option>
                      <option value="fantasy">Fantasy</option>
                      <option value="cyberpunk">Cyberpunk</option>
                      <option value="space">Space</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <CustomSlider 
                  value={difficulty} 
                  onChange={setDifficulty} 
                  min={1} 
                  max={10} 
                  label={`Difficulty Level (${difficulty}/10)`}
                  colorClass="from-blue-500 to-indigo-600"
                />
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={generateLevel}
                    disabled={isGenerating}
                    className="group inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-700 hover:to-violet-700 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="mr-2">
                      {isGenerating ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </span>
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </button>
                  
                  <button
                    onClick={saveLevel}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="mr-2">
                      {isSaving ? (
                        <div className="animate-spin h-5 w-5 border-2 border-indigo-700 border-t-transparent rounded-full"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      )}
                    </span>
                    {isSaving ? "Saving..." : "Save Level"}
                  </button>
                </div>
                
                {saveResult && (
                  <div
                    className={`mt-6 p-4 rounded-xl ${
                      saveResult.success
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    } animate-fade-in`}
                  >
                    <div className="flex items-center">
                      {saveResult.success ? (
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {saveResult.message}
                    </div>
                    {saveResult.levelId && (
                      <div className="mt-3">
                        <Link
                          href={`/play?levelId=${saveResult.levelId}`}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                          <span className="mr-2">Play this level</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent">
                  Level Grid
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Click cells to toggle between walls and empty spaces
                </p>
                
                <div className="grid-editor border border-indigo-200 rounded-xl p-2 bg-indigo-50/50 inline-block shadow-inner">
                  {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.map((cell, colIndex) => {
                        const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                        return (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-10 h-10 m-0.5 rounded-md cursor-pointer transition-all duration-200 transform ${
                              cell === 1
                                ? "bg-gradient-to-br from-indigo-800 to-violet-900 shadow-md"
                                : "bg-white hover:bg-indigo-100"
                            } ${isHovered ? "scale-110 shadow-md z-10" : ""}`}
                            onClick={() => toggleCell(rowIndex, colIndex)}
                            onMouseEnter={() => setHoveredCell({row: rowIndex, col: colIndex})}
                            onMouseLeave={() => setHoveredCell(null)}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-white/80 rounded-xl border border-indigo-100">
                  <p className="font-medium text-gray-700 mb-3">Legend:</p>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-white border border-indigo-200 rounded-md mr-3"></div>
                    <span className="text-gray-700">Empty space (player can move)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-800 to-violet-900 rounded-md mr-3 shadow-sm"></div>
                    <span className="text-gray-700">Wall (blocks movement)</span>
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
