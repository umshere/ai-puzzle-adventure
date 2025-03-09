"use client";

import React, { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // You can add theme toggling functionality here later if needed
  
  return (
    <div className="theme-provider">
      {/* Include any global UI elements here */}
      {children}
      
      <style jsx global>{`
        :root {
          /* Define your theme colors as CSS variables */
          --primary: 79, 70, 229; /* indigo-600 */
          --secondary: 16, 185, 129; /* emerald-500 */
          --accent: 139, 92, 246; /* violet-500 */
          --game-bg-start: 26, 26, 46; /* dark blue */
          --game-bg-end: 22, 33, 62; /* darker blue */
        }
        
        /* Ensure proper full height layout for all pages */
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Apply consistent bg to all pages */
        #__next {
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ThemeProvider;