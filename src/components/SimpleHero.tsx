"use client";

import React from 'react';

const SimpleHero: React.FC = () => {
  return (
    <section style={{ 
      backgroundColor: '#2563eb', 
      color: 'white', 
      padding: '3rem 0' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem' 
        }}>
          Modern UI Adventure
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '1.5rem' 
        }}>
          Explore a world of modern design and animations.
        </p>
        <button style={{ 
          backgroundColor: 'white', 
          color: '#2563eb', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '0.5rem', 
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer'
        }}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default SimpleHero;
