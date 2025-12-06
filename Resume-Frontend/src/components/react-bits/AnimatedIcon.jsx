import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * React Bits AnimatedIcon Component
 * An icon with hover and entrance animations
 */
export default function AnimatedIcon({
  children,
  className = '',
  delay = 0,
  hoverScale = 1.1,
  ...props
}) {
  const iconRef = useRef(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    // Entrance animation
    gsap.fromTo(
      icon,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        delay: delay,
        ease: 'back.out(1.7)',
      }
    );

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(icon, {
        scale: hoverScale,
        rotation: 360,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    icon.addEventListener('mouseenter', handleMouseEnter);
    icon.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      icon.removeEventListener('mouseenter', handleMouseEnter);
      icon.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay, hoverScale]);

  return (
    <div ref={iconRef} className={className} {...props}>
      {children}
    </div>
  );
}

