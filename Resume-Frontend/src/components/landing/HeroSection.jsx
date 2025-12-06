import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../react-bits/AnimatedButton';
import AnimatedCard from '../react-bits/AnimatedCard';
import AnimatedText from '../react-bits/AnimatedText';
import AnimatedIcon from '../react-bits/AnimatedIcon';
import VariableProximity from '../react-bits/VariableProximity';

export default function HeroSection() {
  const navigate = useNavigate();
  const heroContainerRef = useRef(null);

  const actionCards = [
    {
      id: 'ai-generator',
      title: 'AI Resume Generator',
      description: 'Describe yourself naturally, and our AI creates a professional resume instantly. No forms, no hassle.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      buttonText: 'Try AI Generator →',
      onClick: () => navigate('/ai-generate'),
      featured: true,
    },
    {
      id: 'create-resume',
      title: 'Create New Resume',
      description: 'Build a professional resume from scratch with our intuitive builder. Get expert guidance every step of the way.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      buttonText: 'Start Building Now',
      onClick: () => navigate('/resume-builder'),
      featured: false,
    },
    {
      id: 'templates',
      title: 'Browse Templates',
      description: 'Explore our collection of professionally designed templates tailored for different industries and career levels.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600',
      buttonText: 'View Templates',
      onClick: () => navigate('/templates'),
      featured: false,
      spanFull: true,
    },
  ];

  return (
    <section ref={heroContainerRef} className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16 lg:mb-20 space-y-5">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            <VariableProximity
              label="Land Your Dream Job With a Standout Resume"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={heroContainerRef}
              radius={100}
              falloff="linear"
            />
          </h1>
          <AnimatedText
            tag="p"
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            splitType="words"
            delay={40}
          >
            Create a polished, professional resume in minutes and walk into every opportunity with confidence.
          </AnimatedText>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionCards.map((card, index) => (
            <AnimatedCard
              key={card.id}
              delay={index * 0.08}
              className={`group h-full flex flex-col ${
                card.featured ? 'md:col-span-2 lg:col-span-1 border-white/20' : ''
              } ${card.spanFull ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="p-6 lg:p-8 h-full flex flex-col">
                {card.featured ? (
                  <div className="relative z-10 text-white h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed text-sm flex-grow">
                      {card.description}
                    </p>
                    <div className="mt-auto flex justify-center">
                      <AnimatedButton
                        variant="primary"
                        size="sm"
                        onClick={card.onClick}
                      >
                        {card.buttonText}
                      </AnimatedButton>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed text-sm flex-grow">
                      {card.description}
                    </p>
                    <div className="mt-auto flex justify-center">
                      <AnimatedButton
                        variant="secondary"
                        size="sm"
                        onClick={card.onClick}
                      >
                        {card.buttonText}
                      </AnimatedButton>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

