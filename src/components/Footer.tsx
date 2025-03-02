"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      background: 'linear-gradient(to right, #1e293b, #0f172a)',
      color: '#e2e8f0',
      padding: '4rem 0 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            style={{ 
              position: 'absolute',
              borderRadius: '50%',
              background: 'white',
              width: `${Math.random() * 4 + 1}px`, 
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          />
        ))}
      </div>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Main footer content */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Company info */}
          <div style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.1s', opacity: 0 }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              background: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              AI Puzzle Adventure
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Explore a world of procedurally generated puzzles and creative challenges powered by AI.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Social icons */}
              {['twitter', 'facebook', 'github'].map((social, index) => (
                <a 
                  key={social}
                  href="#" 
                  style={{ 
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    color: '#e2e8f0'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>
                    {social === 'twitter' ? '𝕏' : social === 'facebook' ? 'f' : '⌥'}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.25rem', color: 'white' }}>
              Features
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Procedural Generation', 'Adaptive Difficulty', 'User-Generated Content', 'Community Ratings'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    style={{ 
                      color: '#94a3b8', 
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.3s', opacity: 0 }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.25rem', color: 'white' }}>
              Resources
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Documentation', 'API Reference', 'Tutorials', 'Blog'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    style={{ 
                      color: '#94a3b8', 
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.25rem', color: 'white' }}>
              Stay Updated
            </h4>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div style={{ 
              display: 'flex',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <input 
                type="email" 
                placeholder="Your email" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  color: 'white',
                  flexGrow: 1,
                  outline: 'none'
                }}
              />
              <button style={{
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#4338ca';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#4f46e5';
              }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div style={{ 
          height: '1px', 
          background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)', 
          margin: '2rem 0' 
        }}></div>
        
        {/* Copyright */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem',
          color: '#94a3b8',
          animation: 'fadeIn 0.5s ease-out forwards',
          animationDelay: '0.5s',
          opacity: 0
        }}>
          <p>&copy; {new Date().getFullYear()} AI Puzzle Adventure. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                style={{ 
                  color: '#94a3b8',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
