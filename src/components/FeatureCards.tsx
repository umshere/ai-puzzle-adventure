"use client";
import React, { useState } from 'react';

const features = [
  { 
    title: "Procedural Generation", 
    description: "Dynamic levels crafted by AI with local fallbacks.",
    icon: (isHovered: boolean) => (
      <div className={`relative transition-all duration-500 ${isHovered ? 'rotate-45 scale-110' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L6.5 11H17.5L12 2Z" fill="currentColor" />
            <path d="M17.5 11L12 20L6.5 11H17.5Z" fill="currentColor" opacity={isHovered ? "0.9" : "0.7"} />
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
        <svg 
          className={`w-12 h-12 transition-all duration-500 ${isHovered ? 'scale-110' : ''}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
            fill="currentColor" 
            className={isHovered ? 'animate-pulse-slow' : ''}
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
        <svg 
          className={`w-12 h-12 transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" 
            fill="currentColor"
            className={isHovered ? 'origin-center animate-bounce-slow' : ''}
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
            className="bg-white rounded-xl shadow-lg p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ height: '100%' }} // Ensure consistent card height
          >
            {/* Background subtle pattern that appears on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br opacity-0 from-gray-50 to-gray-100 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`}
            />
            
            {/* Top accent gradient */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
            
            {/* Icon with enhanced background */}
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 shadow-xl' : ''}`}>
              {feature.icon(isHovered)}
            </div>
            
            {/* Title with improved contrast */}
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900 relative z-10 transition-colors duration-300">
              {feature.title}
            </h3>
            
            {/* Description with darker text for better readability */}
            <p className="text-gray-700 text-center relative z-10">
              {feature.description}
            </p>
            
            {/* Learn more link with improved animation */}
            <div className="mt-8 text-center">
              <a 
                href="#" 
                className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
              >
                Learn more
                <svg 
                  className="w-4 h-4 ml-1.5 transform group-hover:translate-x-2 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            {/* Bottom border that appears on hover */}
            <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${feature.color} transform origin-center transition-transform duration-500 scale-x-0 ${isHovered ? 'scale-x-100' : ''}`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCards;
