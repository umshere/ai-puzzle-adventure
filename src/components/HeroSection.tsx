"use client";
import React, { ReactNode, useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  compact?: boolean;
  className?: string; // Added className prop for better customization
}

interface BubbleStyle {
  width: number;
  height: number;
  top: number;
  left: number;
  animationDelay: number;
  animationDuration: number; // Added duration for varied animation speeds
  isReverse?: boolean;
  color: string;
  pulseDelay: number; // Added for staggered pulse animations
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  children, 
  compact = false,
  className = "" 
}) => {
  const [bubbleStyles, setBubbleStyles] = useState<BubbleStyle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Enhanced bubble colors with slightly higher opacity for better visibility
  const bubbleColors = [
    'rgba(79, 70, 229, 0.25)', // indigo
    'rgba(139, 92, 246, 0.25)', // violet
    'rgba(59, 130, 246, 0.25)', // blue
    'rgba(16, 185, 129, 0.25)', // emerald
  ];

  useEffect(() => {
    setMounted(true);
    // Create bubbles with enhanced properties
    setBubbleStyles(
      Array(12).fill(null).map((_, index) => ({
        width: Math.random() * 140 + 80, // Slightly larger bubbles
        height: Math.random() * 140 + 80,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2, // Shorter max delay for more synchronized movement
        animationDuration: 15 + Math.random() * 10, // Between 15-25s for smoother movement
        isReverse: index % 2 === 0,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        pulseDelay: index * 0.7 // Staggered pulse effect
      }))
    );
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 800); // Reset after animation completes
    };

    const section = sectionRef.current;
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('click', handleClick);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('click', handleClick);
    };
  }, [sectionRef]);

  const renderLoadingPlaceholder = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-[75vh] flex flex-col justify-center bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-950 text-white overflow-hidden ${className}`}
    >
      {/* Enhanced dark overlay with gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      
      {/* Loading placeholder when not mounted */}
      {!mounted && renderLoadingPlaceholder()}
      
      {/* Animated bubbles with enhanced effects */}
      {mounted && (
        <div className="absolute inset-0">
          {bubbleStyles.map((style, i) => {
            // Calculate distance from mouse to bubble center
            const bubbleX = (style.left / 100) * (sectionRef.current?.offsetWidth || 0);
            const bubbleY = (style.top / 100) * (sectionRef.current?.offsetHeight || 0);
            
            // Calculate distance from mouse (improved)
            const dx = mousePosition.x - bubbleX;
            const dy = mousePosition.y - bubbleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Enhanced influence radius with dynamic behavior
            const influenceRadius = 350;
            
            // Calculate more dynamic scale, opacity and movement based on mouse proximity
            let scale = 1;
            let opacity = 1;
            let translateX = 0;
            let translateY = 0;
            
            if (distance < influenceRadius) {
              // More pronounced interaction effect
              const factor = distance / influenceRadius;
              scale = 0.9 + (factor * 0.15); // Subtler scale effect
              opacity = 0.8 + (factor * 0.2); // Higher minimum opacity
              
              // Subtle repel effect - bubbles move slightly away from cursor
              const repelStrength = 15 * (1 - factor);
              const angle = Math.atan2(dy, dx);
              translateX = Math.cos(angle) * repelStrength;
              translateY = Math.sin(angle) * repelStrength;
            }

            // Add extra pulse effect when clicked
            const pulseEffect = isClicked ? 'animate-pulse-once' : '';
            
            return (
              <div 
                key={i}
                className={`absolute rounded-full ${style.isReverse ? 'animate-float-reverse' : 'animate-float'} ${pulseEffect} transition-all duration-700`}
                style={{ 
                  background: `radial-gradient(circle at 30% 30%, ${style.color.replace('0.25', '0.5')} 0%, ${style.color} 100%)`,
                  boxShadow: `0 8px 32px ${style.color.replace('0.25', '0.15')}, 0 0 15px ${style.color.replace('0.25', '0.3')} inset`,
                  width: `${style.width}px`, 
                  height: `${style.height}px`,
                  top: `${style.top}%`, 
                  left: `${style.left}%`,
                  animationDelay: `${style.animationDelay}s`,
                  animationDuration: `${style.animationDuration}s`, // Custom animation duration
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                  opacity: opacity,
                  zIndex: 1,
                  filter: `blur(1px)`,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out, filter 0.8s ease-out'
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Content container with improved spacing */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto py-16 stagger-animation">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              // Check if this is a heading element that might contain the title
              const isHeading = child.type === 'h1' || 
                               (typeof child.type === 'string' && child.type.startsWith('h'));
              
              // Apply special spacing fixes to headings
              const headingClass = isHeading ? 'tracking-wide leading-tight space-x-1' : '';
              const existingClassName = child.props.className || '';
              const newClassName = `${existingClassName} ${headingClass} animate-slide-up`.trim();
              
              return React.cloneElement(child, {
                ...child.props,
                className: newClassName,
                style: {
                  ...child.props.style,
                  animationDelay: `${index * 0.15}s`,
                  wordSpacing: isHeading ? '0.1em' : 'inherit', // Fix spacing issues in titles
                }
              });
            }
            return child;
          })}
        </div>
      </div>

      {/* Improved bottom gradient fade with smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-indigo-950/95 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
