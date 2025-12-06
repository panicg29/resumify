import React from 'react';
import SplitText from '../SplitText';

/**
 * React Bits AnimatedText Component
 * Wrapper around SplitText for easy text animations
 */
export default function AnimatedText({
  children,
  tag = 'p',
  className = '',
  delay = 50,
  duration = 0.6,
  splitType = 'chars',
  ...props
}) {
  if (typeof children !== 'string') {
    return React.createElement(tag, { className, ...props }, children);
  }

  return (
    <SplitText
      text={children}
      tag={tag}
      className={className}
      delay={delay}
      duration={duration}
      splitType={splitType}
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      {...props}
    />
  );
}

