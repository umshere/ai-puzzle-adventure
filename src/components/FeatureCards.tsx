"use client";

import React from 'react';

const features = [
  { 
    title: "Procedural Generation", 
    description: "Dynamic levels crafted by AI with local fallbacks.",
    icon: "🧩",
    color: "#4f46e5" // indigo
  },
  { 
    title: "Adaptive Difficulty", 
    description: "Levels adjust based on your performance.",
    icon: "⚡",
    color: "#8b5cf6" // violet
  },
  { 
    title: "User-Generated Content", 
    description: "Create & share custom puzzles with community ratings.",
    icon: "👥",
    color: "#6366f1" // indigo/violet mix
  }
];

const FeatureCards: React.FC = () => {
  return (
    <section style={{ 
      padding: '6rem 0',
      background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
          animation: 'fadeIn 0.5s ease-out forwards'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Game Features
          </h2>
          <div style={{ 
            width: '6rem', 
            height: '0.25rem', 
            background: 'linear-gradient(to right, #4f46e5, #8b5cf6)', 
            margin: '0 auto 1.5rem' 
          }}></div>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Experience the next generation of AI-powered puzzle gaming with these innovative features.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{ 
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                padding: '2rem',
                transition: 'all 0.3s ease',
                opacity: 0,
                transform: 'scale(0.95)',
                animation: 'scaleIn 0.5s ease-out forwards',
                animationDelay: `${0.1 + index * 0.1}s`,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Top accent line with gradient */}
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(to right, ${feature.color}, ${feature.color}bb)`
              }}></div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1.5rem',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}99)`,
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: `0 10px 15px ${feature.color}33`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#111827',
                  transition: 'color 0.3s ease'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div style={{ 
                  marginTop: '1.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: feature.color,
                  fontWeight: '500',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.3s ease'
                }}
                className="learn-more-link"
                >
                  <span>Learn more</span>
                  <svg 
                    style={{ 
                      width: '1rem', 
                      height: '1rem', 
                      marginLeft: '0.5rem',
                      transition: 'transform 0.3s ease'
                    }} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        div:hover .learn-more-link {
          opacity: 1;
          transform: translateY(0);
        }
        div:hover .learn-more-link svg {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
};

export default FeatureCards;
