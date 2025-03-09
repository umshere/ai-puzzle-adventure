"use client";
import React, { useEffect, useRef, useState } from 'react';

interface GameCanvasProps {
  levelData: any;
  onScoreUpdate: (score: number) => void;
  onGameComplete: () => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  levelData,
  onScoreUpdate,
  onGameComplete,
}) => {
  const gameRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const initGame = async () => {
      try {
        // Dynamically import Phaser only on client side
        const Phaser = (await import('phaser')).default;

        const config = {
          type: Phaser.AUTO,
          parent: 'game-container',
          width: 800,
          height: 600,
          backgroundColor: '#1a1c2c',
          scene: {
            create: function() {
              // Initialize game scene
              setIsLoading(false);
              
              // Temporary: Just show completion after 3 seconds
              setTimeout(() => {
                onGameComplete();
                onScoreUpdate(100);
              }, 3000);
            }
          }
        };

        // Initialize the game
        gameRef.current = new Phaser.Game(config);

      } catch (error) {
        console.error('Failed to load Phaser:', error);
        setIsLoading(false);
      }
    };

    initGame();

    // Cleanup
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [hasMounted, levelData, onScoreUpdate, onGameComplete]);

  if (!hasMounted) {
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="loading-dots text-blue-400">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div 
        id="game-container" 
        className="w-full h-full"
      />
    </div>
  );
};

export default GameCanvas;