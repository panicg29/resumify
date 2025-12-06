import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * React Bits AnimatedCard Component
 * An animated card with hover effects and entrance animations
 */
export default function AnimatedCard({
  children,
  className = '',
  hoverScale = 1.02,
  delay = 0,
  gradient = false,
  gradientColors = 'from-blue-500/5 to-indigo-600/5',
  ...props
}) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: 'power3.out',
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -4,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (gradient && contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverScale, delay, gradient, gradientColors]);

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-lg
        bg-white/5 backdrop-blur-md border border-white/10
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

