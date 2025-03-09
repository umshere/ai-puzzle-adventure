"use client";

import React, { useState } from 'react';

const features = [
  { 
    title: "Procedural Generation", 
    description: "Dynamic levels crafted by AI with local fallbacks.",
    icon: (isHovered: boolean) => (
      <div className={`relative ${isHovered ? 'animate-spin-slow' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L6.5 11H17.5L12 2Z" fill="currentColor" />
            <path d="M17.5 11L12 20L6.5 11H17.5Z" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
      </div>
    ),
    color: "from-indigo-600 to-indigo-400"
  },
  { 
    title: "Adaptive Difficulty", 
    description: "Levels adjust based on your performance.",
    icon: (isHovered: boolean) => (
      <div className="relative">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
            fill="currentColor" 
            className={isHovered ? 'animate-pulse' : ''}
          />
        </svg>
      </div>
    ),
    color: "from-violet-600 to-violet-400"
  },
  { 
    title: "User-Generated Content", 
    description: "Create & share custom puzzles with community ratings.",
    icon: (isHovered: boolean) => (
      <div className="relative">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" 
            fill="currentColor"
            className={isHovered ? 'animate-bounce-subtle' : ''}
          />
        </svg>
      </div>
    ),
    color: "from-blue-600 to-blue-400"
  }
];

const FeatureCards: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Top accent gradient */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
            
            {/* Icon with background */}
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 ${isHovered ? 'scale-110 shadow-xl' : ''}`}>
              {feature.icon(isHovered)}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-center">
              {feature.description}
            </p>
            
            {/* Learn more link */}
            <div className="mt-6 text-center">
              <a 
                href="#" 
                className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
              >
                Learn more
                <svg 
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCards;
