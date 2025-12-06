import React, { useRef } from 'react';
import AnimatedCard from '../react-bits/AnimatedCard';
import AnimatedText from '../react-bits/AnimatedText';
import AnimatedIcon from '../react-bits/AnimatedIcon';
import VariableProximity from '../react-bits/VariableProximity';

const team = [
  { name: 'Nuzhat Tasnim Silvia' },
  { name: 'Md Al Amin' },
  { name: 'MD Abdullah Al Maruf' },
];

const icons = [
  <svg key="person" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  <svg key="lightbulb" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg key="star" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>,
];

const gradients = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-purple-500 to-purple-600',
];

const hoverColors = [
  'group-hover:text-blue-600',
  'group-hover:text-emerald-600',
  'group-hover:text-purple-600',
];

const borderColors = [
  'hover:border-blue-200',
  'hover:border-emerald-200',
  'hover:border-purple-200',
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  
  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 space-y-5">
          <div className="flex justify-center w-full">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight text-center">
              <VariableProximity
                label="Meet The Team"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={sectionRef}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <AnimatedText
              tag="p"
              className="text-lg text-white/70 max-w-2xl leading-relaxed text-center"
              splitType="words"
              delay={30}
            >
              The talented individuals behind Resumify
            </AnimatedText>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member, index) => (
            <AnimatedCard
              key={member.name}
              delay={index * 0.1}
              className="text-center"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mx-auto mb-4 flex items-center justify-center border border-white/20">
                  {icons[index]}
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-white/70">
                  Team Member
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

