"use client";

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section style={{ 
      background: 'linear-gradient(to right, #4f46e5, #7e22ce, #3b82f6)',
      color: 'white',
      padding: '5rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            style={{ 
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              width: `${Math.random() * 200 + 50}px`, 
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ animation: 'slideUp 0.5s ease-out forwards' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffffff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}>
            AI-Assisted Creative Puzzle Adventure
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            marginBottom: '2.5rem',
            maxWidth: '42rem',
            margin: '0 auto 2.5rem',
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out 0.3s forwards'
          }}>
            Explore a world of procedurally generated puzzles and creative challenges.
          </p>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out 0.6s forwards'
          }}>
            <a 
              href="/play" 
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: '#4f46e5',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              Get Started
            </a>
            <a 
              href="/create" 
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.3s ease',
                border: '2px solid white'
              }}
            >
              Create Puzzle
            </a>
          </div>
        </div>
        
        {/* Floating 3D element */}
        <div style={{ 
          marginTop: '4rem',
          position: 'relative',
          width: '16rem',
          height: '16rem',
          margin: '4rem auto 0',
          animation: 'float 3s ease-in-out infinite',
          perspective: '1000px'
        }}>
          <div style={{ 
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
            borderRadius: '1rem',
            transform: 'rotate(12deg)',
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}>
            <div style={{ 
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ 
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>AI</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(79, 70, 229, 0); }
          50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.5); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
