import React from 'react';
import { Card } from './ui/Card';

const GameDescription = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="glass" className="p-6">
        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
          How the Game Works
        </h3>
        <div className="space-y-4 text-blue-100">
          <p>
            AI Puzzle Adventure is a unique game that combines artificial intelligence with puzzle-solving. 
            Each level is procedurally generated using advanced AI algorithms, ensuring a fresh and 
            challenging experience every time you play.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card variant="glass" className="p-4">
              <h4 className="font-semibold mb-2 text-white">🎮 Gameplay</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Navigate through AI-generated mazes</li>
                <li>Avoid dynamic obstacles and traps</li>
                <li>Collect power-ups and items</li>
                <li>Find the optimal path to the exit</li>
              </ul>
            </Card>
            <Card variant="glass" className="p-4">
              <h4 className="font-semibold mb-2 text-white">🎯 Objectives</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Complete levels efficiently</li>
                <li>Maximize your score</li>
                <li>Discover unique strategies</li>
                <li>Progress through increasing difficulty</li>
              </ul>
            </Card>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
          Level Generation
        </h3>
        <div className="space-y-4 text-blue-100">
          <p>
            Each level is uniquely crafted by our AI system using the Kluster API. The generation process 
            considers multiple factors to create engaging and balanced puzzles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card variant="glass" className="p-4">
              <h4 className="font-semibold mb-2 text-white">🤖 AI Generation</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Dynamic layout creation</li>
                <li>Intelligent obstacle placement</li>
                <li>Theme-based elements</li>
                <li>Difficulty scaling</li>
              </ul>
            </Card>
            <Card variant="glass" className="p-4">
              <h4 className="font-semibold mb-2 text-white">🎨 Theme Integration</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Themed obstacles</li>
                <li>Custom visual elements</li>
                <li>Matching power-ups</li>
                <li>Coherent aesthetics</li>
              </ul>
            </Card>
            <Card variant="glass" className="p-4">
              <h4 className="font-semibold mb-2 text-white">⚖️ Difficulty Scaling</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Adaptive complexity</li>
                <li>Progressive challenges</li>
                <li>Skill-based adjustments</li>
                <li>Balanced progression</li>
              </ul>
            </Card>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
          Game Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="glass" className="p-4 text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h4 className="font-semibold text-white mb-1">Endless Variety</h4>
            <p className="text-sm text-blue-100">
              Every level is unique and procedurally generated
            </p>
          </Card>
          <Card variant="glass" className="p-4 text-center">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="font-semibold text-white mb-1">Skill Based</h4>
            <p className="text-sm text-blue-100">
              Difficulty adapts to your performance
            </p>
          </Card>
          <Card variant="glass" className="p-4 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-white mb-1">Theme System</h4>
            <p className="text-sm text-blue-100">
              Multiple themes affect gameplay elements
            </p>
          </Card>
          <Card variant="glass" className="p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-semibold text-white mb-1">Achievements</h4>
            <p className="text-sm text-blue-100">
              Track progress and earn rewards
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default GameDescription;