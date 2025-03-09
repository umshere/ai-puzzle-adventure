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
  const [email, setEmail] = useState('');
  
  // Enhanced particle colors with better opacity
  const particleColors = [
    'rgba(79, 70, 229, 0.45)', // indigo with slightly higher opacity
    'rgba(139, 92, 246, 0.45)', // violet with slightly higher opacity
    'rgba(59, 130, 246, 0.45)', // blue with slightly higher opacity
  ];
  
  useEffect(() => {
    // Generate particle styles only on client-side
    setParticles(Array(25).fill(null).map(() => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    })));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log(`Subscribing email: ${email}`);
    // Reset form after submission
    setEmail('');
  };
  
  return (
    <footer className="bg-gradient-to-r from-slate-950 to-indigo-950 text-white py-16 relative overflow-hidden">
      {/* Darker overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-25">
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
              animationDuration: `${particle.animationDuration}s`,
              boxShadow: `0 0 4px ${particle.color.replace('0.45', '0.7')}` // Add glow effect
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content with improved spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Company info */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent inline-block">
              AI Puzzle Adventure
            </h3>
            <p className="text-slate-200 mb-7 leading-relaxed">
              Explore a world of procedurally generated puzzles and creative challenges powered by AI.
            </p>
            <div className="flex gap-4">
              {/* Social icons with enhanced hover effects */}
              {[
                { name: 'Twitter', icon: '𝕏' },
                { name: 'GitHub', icon: '⌥' },
                { name: 'Discord', icon: 'ᗪ' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links with improved text contrast */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold mb-6 text-white/95">
              Features
            </h4>
            <ul className="space-y-3.5">
              {['Procedural Generation', 'Adaptive Difficulty', 'User-Generated Content', 'Community Ratings'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-slate-200 hover:text-white transition-all duration-200 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-indigo-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources with improved text contrast */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold mb-6 text-white/95">
              Resources
            </h4>
            <ul className="space-y-3.5">
              {['Documentation', 'API Reference', 'Tutorials', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-slate-200 hover:text-white transition-all duration-200 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-violet-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter with improved form alignment */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-semibold mb-6 text-white/95">
              Stay Updated
            </h4>
            <p className="text-slate-200 mb-5 leading-relaxed">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-lg">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/15 border-none py-3.5 px-4 text-white flex-grow outline-none focus:bg-white/20 transition-colors duration-200 placeholder-white/50"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 text-white border-none py-3.5 px-5 font-medium cursor-pointer transition-all duration-300 hover:bg-indigo-500 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/50 text-sm mt-3">
              We respect your privacy. No spam.
            </p>
          </div>
        </div>
        
        {/* Divider with improved gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10"></div>
        
        {/* Copyright with better contrast */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-slate-300 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
          <p>&copy; {new Date().getFullYear()} AI Puzzle Adventure. All rights reserved.</p>
          <div className="flex gap-8 mt-5 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-slate-300 hover:text-white transition-colors duration-200 hover:underline"
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
