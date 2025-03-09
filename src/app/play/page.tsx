"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GameCanvas from "@/components/GameCanvas";
import NavigationBar from "@/components/NavigationBar";
import LevelStats from "@/components/LevelStats";
import ProgressSection from "@/components/ProgressSection";
import ControlsSection from "@/components/ControlsSection";
import GameDescription from "@/components/GameDescription";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import * as Icon from "@/components/icons";
import { Card } from "@/components/ui/Card";

export default function PlayGame() {
  const [level, setLevel] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(true);

  const handleGenerateLevel = async () => {
    setIsGenerating(true);
    setGameCompleted(false);
    try {
      const response = await axios.post("/api/generate", {
        theme: "sci-fi",
        playerSkill: 3
      });
      setLevel(response.data);
      setScore(0);
      setShowDescription(false);
    } catch (err) {
      console.error("Failed to generate level:", err);
      setError("Failed to generate level. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!showDescription) {
      handleGenerateLevel();
    }
  }, [showDescription]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection compact>
        <NavigationBar />
        
        <main className="container mx-auto mt-8 mb-12 px-4">
          {showDescription ? (
            <div className="max-w-4xl mx-auto">
              <GameDescription />
              <div className="mt-8 text-center">
                <Button
                  onClick={() => setShowDescription(false)}
                  variant="primary"
                  className="animate-pulse-glow text-lg"
                >
                  Start Playing
                  <Icon.arrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {/* Game Canvas Area */}
              <div className="lg:col-span-3 relative group">
                <Card variant="glass" className="p-1 shadow-2xl transition-all duration-300 hover:shadow-blue-500/30">
                  {error ? (
                    <div className="flex h-96 items-center justify-center rounded-lg bg-red-900/20">
                      <div className="text-center text-red-300">
                        <Icon.warning className="mx-auto h-8 w-8" />
                        <p className="mt-4">{error}</p>
                        <Button 
                          onClick={handleGenerateLevel}
                          className="mt-4"
                          variant="primary">
                          Try Again
                        </Button>
                      </div>
                    </div>
                  ) : !level ? (
                    <div className="flex h-96 items-center justify-center rounded-lg bg-blue-900/20">
                      <div className="text-center space-y-4">
                        <Icon.loader className="h-8 w-8 animate-spin text-blue-300 mx-auto" />
                        <p className="text-blue-200 animate-pulse">
                          Generating your puzzle...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <GameCanvas
                      levelData={level}
                      onScoreUpdate={setScore}
                      onGameComplete={() => setGameCompleted(true)}
                    />
                  )}
                </Card>
                
                {gameCompleted && (
                  <Card variant="glass" className="mt-6 p-8 animate-slide-up">
                    <h3 className="text-xl font-bold text-blue-100 mb-2">Level Complete!</h3>
                    <p className="text-blue-200 mb-4">You've completed this level with a score of {score}.</p>
                    <Button 
                      onClick={handleGenerateLevel}
                      variant="primary"
                    >
                      Play Next Level
                    </Button>
                  </Card>
                )}
              </div>

              {/* Stats Panel */}
              <div className="space-y-6 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
                {/* Game Info Section */}
                <Card variant="glass" className="p-6 backdrop-blur-lg border border-blue-900/20">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                      AI Puzzle Adventure
                    </h2>
                    <p className="text-blue-200/90 text-lg mb-6">
                      Procedurally generated puzzles powered by AI
                    </p>
                    <Button
                      onClick={handleGenerateLevel}
                      variant="primary"
                      disabled={isGenerating}
                      className="w-full animate-pulse-glow"
                    >
                      {isGenerating ? (
                        <><Icon.loader className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                      ) : (
                        'Generate New Level'
                      )}
                    </Button>
                  </div>

                  <LevelStats level={level} score={score} />
                  <ProgressSection gameCompleted={gameCompleted} />
                  <ControlsSection />
                </Card>
              </div>
            </div>
          )}
        </main>
      </HeroSection>
    </div>
  );
}
