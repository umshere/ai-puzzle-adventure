"use client";

import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PuzzleIcon = () => (
  <svg 
    className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-500" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C10.9 2 10 2.9 10 4V8C10 9.1 9.1 10 8 10H4C2.9 10 2 10.9 2 12C2 13.1 2.9 14 4 14H8C9.1 14 10 14.9 10 16V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V16C14 14.9 14.9 14 16 14H20C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10H16C14.9 10 14 9.1 14 8V4C14 2.9 13.1 2 12 2Z" 
      fill="currentColor" 
    />
  </svg>
);

const HomePage: React.FC = () => {
  // Add scroll animation effect with improved timing
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 50;
        
        if (isVisible) {
          // Add staggered animation delay
          setTimeout(() => {
            element.classList.add('animate-fade-in');
          }, index * 150);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load with slight delay for better UX
    setTimeout(handleScroll, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection>
        <div className="text-center relative z-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90 filter drop-shadow-lg tracking-wide">
            Welcome to{' '}
            <span className="whitespace-nowrap">AI Puzzle Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl mb-14 text-white/95 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Experience the next generation of AI-powered puzzle gaming.
          </p>
          <Link 
            href="/play" 
            className="group inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:from-indigo-700 hover:to-violet-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 ring-2 ring-white/20 relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center">
              Start Your Adventure
              <PuzzleIcon />
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </div>
      </HeroSection>
      
      <main className="relative z-10 -mt-24 container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-14 max-w-5xl mx-auto scroll-animate opacity-0 transform transition-all duration-700 translate-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent tracking-wide">
            Game Features
          </h2>
          <p className="text-center text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed">
            Discover innovative features powered by cutting-edge AI technology 
            that make every puzzle a unique adventure.
          </p>
          <FeatureCards />
        </div>
      </main>
      
      <div className="mt-24 scroll-animate opacity-0 transform transition-all duration-700 translate-y-8">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
