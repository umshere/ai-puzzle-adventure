import Link from 'next/link';
import * as Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const NavigationBar = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLevel = () => {
    setIsGenerating(true);
    // Add your level generation logic here
    setTimeout(() => setIsGenerating(false), 2000); // Simulate async operation
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-white hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            <Icon.logo className="h-6 w-6" />
            <span className="font-bold text-lg">AI Puzzle Adventure</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-blue-100 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/play" className="text-white font-semibold border-b-2 border-blue-400">
              Play
            </Link>
            <Link href="/create" className="text-blue-100 hover:text-white transition-colors">
              Create
            </Link>
          </nav>
        </div>
        
        <div>
          <Button 
            onClick={handleGenerateLevel}
            disabled={isGenerating}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                Generating...
              </>
            ) : (
              <>
                <Icon.refresh className="h-4 w-4" />
                New Level
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
