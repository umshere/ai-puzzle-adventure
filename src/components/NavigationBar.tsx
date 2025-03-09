import Link from 'next/link';
import * as Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerateLevel = () => {
    setIsGenerating(true);
    // Add your level generation logic here
    setTimeout(() => setIsGenerating(false), 2000); // Simulate async operation
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-indigo-950/90 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-white hover:text-indigo-300 transition-colors flex items-center gap-2 group"
          >
            <div className="relative">
              <Icon.logo className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              AI Puzzle Adventure
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/play', label: 'Play' },
              { href: '/create', label: 'Create' }
            ].map(link => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`relative py-1 px-1 transition-colors ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-indigo-100/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div>
          <Button 
            onClick={handleGenerateLevel}
            disabled={isGenerating}
            variant="primary"
            className="px-5 py-2 rounded-full shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 text-sm"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Icon.sparkles className="h-4 w-4" />
                <span>New Level</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
