"use client";
import React, { ReactNode, useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  compact?: boolean;
}

interface BubbleStyle {
  width: number;
  height: number;
  top: number;
  left: number;
  animationDelay: number;
  isReverse?: boolean;
  color: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children, compact = false }) => {
  const [bubbleStyles, setBubbleStyles] = useState<BubbleStyle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Colors for the bubbles
  const bubbleColors = [
    'rgba(79, 70, 229, 0.2)', // indigo
    'rgba(139, 92, 246, 0.2)', // violet
    'rgba(59, 130, 246, 0.2)', // blue
    'rgba(16, 185, 129, 0.2)', // emerald
  ];

  useEffect(() => {
    setMounted(true);
    // Create 10 bubbles with varying properties
    setBubbleStyles(
      Array(10).fill(null).map((_, index) => ({
        width: Math.random() * 120 + 60,
        height: Math.random() * 120 + 60,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3, // 0-3s delay
        isReverse: index % 2 === 0, // Alternate between normal and reverse animations
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
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

    const section = sectionRef.current;
    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
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
      className="relative min-h-[70vh] flex flex-col justify-center bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-950 text-white overflow-hidden"
    >
      {/* Dark overlay with gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
      
      {/* Loading placeholder when not mounted */}
      {!mounted && renderLoadingPlaceholder()}
      
      {/* Animated bubbles */}
      {mounted && (
        <div className="absolute inset-0">
          {bubbleStyles.map((style, i) => {
            // Calculate distance from mouse to bubble center
            const bubbleX = (style.left / 100) * (sectionRef.current?.offsetWidth || 0);
            const bubbleY = (style.top / 100) * (sectionRef.current?.offsetHeight || 0);
            
            // Calculate distance from mouse (simplified)
            const dx = mousePosition.x - bubbleX;
            const dy = mousePosition.y - bubbleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Influence radius - bubbles within this range will be affected by mouse
            const influenceRadius = 300;
            
            // Calculate scale and opacity based on mouse proximity
            let scale = 1;
            let opacity = 1;
            
            if (distance < influenceRadius) {
              // Closer to mouse = smaller and more transparent
              const factor = distance / influenceRadius;
              scale = 0.8 + (factor * 0.2); // Scale between 0.8 and 1
              opacity = 0.7 + (factor * 0.3); // Opacity between 0.7 and 1
            }
            
            return (
              <div 
                key={i}
                className={`absolute rounded-full ${style.isReverse ? 'animate-float-reverse' : 'animate-float'} transition-transform duration-300`}
                style={{ 
                  background: `radial-gradient(circle at 30% 30%, ${style.color.replace('0.2', '0.4')} 0%, ${style.color} 100%)`,
                  boxShadow: `0 8px 32px ${style.color.replace('0.2', '0.1')}`,
                  width: `${style.width}px`, 
                  height: `${style.height}px`,
                  top: `${style.top}%`, 
                  left: `${style.left}%`,
                  animationDelay: `${style.animationDelay}s`,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  zIndex: 1
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto py-12 stagger-animation">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              const existingClassName = child.props.className || '';
              const newClassName = `${existingClassName} animate-slide-up`.trim();
              
              return React.cloneElement(child, {
                ...child.props,
                className: newClassName,
                style: {
                  ...child.props.style,
                  animationDelay: `${index * 0.2}s`
                }
              });
            }
            return child;
          })}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-950/90 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
