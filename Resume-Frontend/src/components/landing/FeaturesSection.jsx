import React, { useRef } from 'react';
import AnimatedCard from '../react-bits/AnimatedCard';
import AnimatedButton from '../react-bits/AnimatedButton';
import AnimatedText from '../react-bits/AnimatedText';
import AnimatedIcon from '../react-bits/AnimatedIcon';
import VariableProximity from '../react-bits/VariableProximity';

const services = [
  {
    icon: '📄',
    title: 'Multi-CV Generation',
    description: 'Create several tailored CVs for different jobs instantly.',
    learnMore: 'Experience the power of parallel universe career planning. Our quantum algorithms generate infinite resume variations, each optimized for specific job markets, industries, and company cultures. Deploy multiple versions simultaneously across different platforms while maintaining perfect consistency in your core narrative.',
    bg: 'from-blue-500/5 to-indigo-600/5',
    gradient: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:text-blue-600',
  },
  {
    icon: '✏️',
    title: 'Manual Editability',
    description: 'Edit every section of your CV before download.',
    learnMore: 'Take full control of your professional narrative with our precision editing suite. Every pixel, every word, every formatting choice is yours to command. Our neural interface adapts to your editing style, predicting your next move and suggesting enhancements in real-time.',
    bg: 'from-emerald-500/5 to-teal-600/5',
    gradient: 'from-emerald-500 to-emerald-600',
    hoverColor: 'hover:text-emerald-600',
  },
  {
    icon: '🤖',
    title: 'Job-Match Intelligence',
    description: 'AI aligns your CV to job requirements for better results.',
    learnMore: 'Our advanced neural networks analyze job descriptions with superhuman precision, identifying hidden keywords, cultural signals, and success patterns. The AI doesn\'t just match—it learns, adapts, and evolves your resume to become the perfect candidate for any role in any industry.',
    bg: 'from-purple-500/5 to-indigo-600/5',
    gradient: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:text-purple-600',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  
  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 text-white tracking-tight">
            <VariableProximity
              label="Our Vision & Our Goal"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={sectionRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <AnimatedText
            tag="p"
            className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            splitType="words"
            delay={30}
          >
            We're pioneering the next generation of career advancement through{' '}
            <span className="text-white font-medium">AI-driven resume intelligence</span> and{' '}
            <span className="text-white font-medium">quantum-powered optimization</span>.
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedCard
              key={service.title}
              delay={index * 0.1}
              className="flex flex-col h-full"
            >
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Title - Fixed height for alignment */}
                <div className="h-14 flex items-center mb-3">
                  <h3 className="text-lg font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                
                {/* Short Description - Fixed height for alignment */}
                <div className="h-20 mb-4">
                  <p className="text-white/80 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
                
                {/* Detailed Description Box - Grows equally in all cards */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6 flex-1">
                  <p className="text-xs text-white/70 leading-relaxed">
                    {service.learnMore}
                  </p>
                </div>
                
                {/* Button - Fixed at bottom */}
                <div className="flex justify-center">
                  <AnimatedButton
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    Explore Technology
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

