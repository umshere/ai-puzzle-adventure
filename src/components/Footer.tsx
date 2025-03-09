"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ParticleStyle {
  width: number;
  height: number;
  top: number;
  left: number;
  animationDuration: number;
  color: string;
}

const Footer: React.FC = () => {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);

  // Particle colors
  const particleColors = [
    'rgba(79, 70, 229, 0.4)', // indigo
    'rgba(139, 92, 246, 0.4)', // violet
    'rgba(59, 130, 246, 0.4)', // blue
  ];

  useEffect(() => {
    // Generate particle styles only on client-side
    setParticles(Array(20).fill(null).map(() => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    })));
  }, []);

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-16 relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{ 
              background: particle.color,
              width: `${particle.width}px`, 
              height: `${particle.height}px`,
              top: `${particle.top}%`, 
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent inline-block">
              AI Puzzle Adventure
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Explore a world of procedurally generated puzzles and creative challenges powered by AI.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              {[
                { name: 'Twitter', icon: '𝕏' },
                { name: 'GitHub', icon: '⌥' },
                { name: 'Discord', icon: 'ᗪ' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Features
            </h4>
            <ul className="space-y-3">
              {['Procedural Generation', 'Adaptive Difficulty', 'User-Generated Content', 'Community Ratings'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-slate-300 hover:text-white transition-all duration-200 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-indigo-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Tutorials', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-slate-300 hover:text-white transition-all duration-200 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-violet-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Stay Updated
            </h4>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex rounded-lg overflow-hidden shadow-lg">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-none py-3 px-4 text-white flex-grow outline-none focus:bg-white/15 transition-colors duration-200"
              />
              <button className="bg-indigo-600 text-white border-none py-3 px-4 font-medium cursor-pointer transition-all duration-300 hover:bg-indigo-700 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-slate-400 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
          <p>&copy; {new Date().getFullYear()} AI Puzzle Adventure. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
