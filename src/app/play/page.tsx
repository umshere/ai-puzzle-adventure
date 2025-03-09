"use client";

import { useEffect, useState, useRef } from "react";
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

// Animated background component for the content area
const ContentBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    top: number;
    left: number;
    animationDuration: number;
    delay: number;
    color: string;
    isReverse?: boolean;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Create particles with random properties
    const particleColors = [
      'rgba(79, 70, 229, 0.15)', // indigo
      'rgba(139, 92, 246, 0.15)', // violet
      'rgba(59, 130, 246, 0.15)', // blue
    ];
    
    const newParticles = Array(6).fill(null).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 60, // 60-140px
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15, // 15-25s
      delay: Math.random() * 5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      isReverse: i % 2 === 0
    }));
    
    setParticles(newParticles);

    // Add mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        // Calculate distance from mouse to particle center
        const particleX = (particle.left / 100) * (containerRef.current?.offsetWidth || 0);
        const particleY = (particle.top / 100) * (containerRef.current?.offsetHeight || 0);
        
        // Calculate distance from mouse
        const dx = mousePosition.x - particleX;
        const dy = mousePosition.y - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Influence radius
        const influenceRadius = 300;
        
        // Calculate scale and opacity based on mouse proximity
        let scale = 1;
        let translateX = 0;
        let translateY = 0;
        
        if (distance < influenceRadius) {
          // Subtle repel effect
          const factor = distance / influenceRadius;
          scale = 0.95 + (factor * 0.1);
          
          const repelStrength = 20 * (1 - factor);
          const angle = Math.atan2(dy, dx);
          translateX = Math.cos(angle) * repelStrength;
          translateY = Math.sin(angle) * repelStrength;
        }

        return (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.isReverse ? 'animate-float-reverse' : 'animate-float'}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              background: `radial-gradient(circle at 30% 30%, ${particle.color.replace('0.15', '0.3')} 0%, ${particle.color} 100%)`,
              boxShadow: `0 8px 32px ${particle.color.replace('0.15', '0.1')}`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.delay}s`,
              backdropFilter: 'blur(3px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
              transition: 'transform 0.8s ease-out',
              zIndex: -1
            }}
          />
        );
      })}
    </div>
  );
};

export default function PlayGame() {
  const [level, setLevel] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-950 via-violet-950 to-blue-950">
      <HeroSection>
        <NavigationBar />
        
        <main className="container mx-auto mt-20 mb-16 px-4 relative">
          <ContentBackground />
          
          {showDescription ? (
            <div className="max-w-4xl mx-auto relative z-10">
              <GameDescription />
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setShowDescription(false)}
                  variant="primary"
                  className="text-xl px-10 py-5 font-bold shadow-lg hover:shadow-indigo-500/30 group relative overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center">
                    Start Playing
                    <Icon.arrowRight className={`ml-2 h-5 w-5 transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-white/10 to-indigo-600/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 relative z-10">
              {/* Game Canvas Area */}
              <div className="lg:col-span-3 relative group">
                <Card 
                  variant="glass" 
                  className="p-1 shadow-2xl transition-all duration-500 hover:shadow-blue-500/30 border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-md"
                >
                  {error ? (
                    <div className="flex h-96 items-center justify-center rounded-lg bg-red-900/20 backdrop-blur-sm">
                      <div className="text-center text-red-300 p-8 animate-fade-in">
                        <Icon.warning className="mx-auto h-12 w-12 text-red-400 mb-4 animate-pulse" />
                        <p className="mt-4 text-lg">{error}</p>
                        <Button 
                          onClick={handleGenerateLevel}
                          className="mt-6 px-6 py-3"
                          variant="primary">
                          Try Again
                        </Button>
                      </div>
                    </div>
                  ) : !level ? (
                    <div className="flex h-96 items-center justify-center rounded-lg bg-blue-900/20 backdrop-blur-sm">
                      <div className="text-center space-y-6 p-8 animate-fade-in">
                        <div className="relative mx-auto w-16 h-16">
                          <div className="absolute inset-0 rounded-full border-4 border-indigo-300/30 border-t-indigo-400 animate-spin"></div>
                          <div className="absolute inset-3 rounded-full bg-indigo-400/20 animate-pulse"></div>
                        </div>
                        <p className="text-blue-200 text-xl font-medium">
                          Generating your puzzle...
                        </p>
                        <p className="text-blue-300/70 text-sm max-w-md">
                          Our AI is crafting a unique puzzle experience just for you. This will only take a moment.
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
                  <Card 
                    variant="glass" 
                    className="mt-6 p-8 animate-slide-up border border-indigo-500/30 backdrop-blur-md shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mr-4 shadow-lg shadow-indigo-500/20">
                        <Icon.trophy className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                        Level Complete!
                      </h3>
                    </div>
                    <p className="text-blue-100 mb-6 text-lg">
                      Congratulations! You've completed this level with a score of <span className="font-bold text-white">{score}</span>.
                    </p>
                    <Button 
                      onClick={handleGenerateLevel}
                      variant="primary"
                      className="px-8 py-4 text-lg font-bold shadow-lg hover:shadow-indigo-500/30"
                    >
                      <span className="mr-2">Play Next Level</span>
                      <Icon.arrowRight className="h-5 w-5" />
                    </Button>
                  </Card>
                )}
              </div>

              {/* Stats Panel */}
              <div className="space-y-6 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
                {/* Game Info Section */}
                <Card 
                  variant="glass" 
                  className="p-6 backdrop-blur-lg border border-indigo-500/30 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300 drop-shadow-sm">
                      AI Puzzle Adventure
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto mb-4 rounded-full"></div>
                    <p className="text-blue-100 text-lg mb-8">
                      Procedurally generated puzzles powered by AI
                    </p>
                    <Button
                      onClick={handleGenerateLevel}
                      variant="primary"
                      disabled={isGenerating}
                      className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-indigo-500/30 group"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 mr-3 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Icon.sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                          <span>Generate New Level</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
                      <h3 className="text-lg font-semibold mb-3 text-indigo-200 flex items-center">
                        <Icon.stats className="w-5 h-5 mr-2 text-indigo-400" />
                        Level Statistics
                      </h3>
                      <LevelStats level={level} score={score} />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
                      <h3 className="text-lg font-semibold mb-3 text-indigo-200 flex items-center">
                        <Icon.chart className="w-5 h-5 mr-2 text-indigo-400" />
                        Progress
                      </h3>
                      <ProgressSection gameCompleted={gameCompleted} />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
                      <h3 className="text-lg font-semibold mb-3 text-indigo-200 flex items-center">
                        <Icon.keyboard className="w-5 h-5 mr-2 text-indigo-400" />
                        Controls
                      </h3>
                      <ControlsSection />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </HeroSection>
    </div>
  );
}
