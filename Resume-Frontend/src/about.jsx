import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import LiquidEther from './components/react-bits/LiquidEther';
import LandingHeader from './components/landing/LandingHeader';

function About() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Advanced language models analyze job requirements and identify high-impact keywords for optimal resume matching.'
    },
    {
      icon: '📊',
      title: 'Results-Oriented Content',
      description: 'Generate compelling bullet points that showcase measurable outcomes and quantified achievements.'
    },
    {
      icon: '✅',
      title: 'ATS Optimization',
      description: 'Built-in compatibility checks ensure your resume passes through Applicant Tracking Systems seamlessly.'
    },
    {
      icon: '🔒',
      title: 'Privacy-First Design',
      description: 'Your data remains under your control with transparent editing and secure storage practices.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload & Analyze',
      description: 'Upload your resume or enter experience details, then paste job descriptions for targeted optimization.'
    },
    {
      number: '02',
      title: 'AI Tailored Drafting',
      description: 'Our system generates structured sections using action verbs and domain-specific vocabulary.'
    },
    {
      number: '03',
      title: 'Optimization & Refinement',
      description: 'Get suggestions for length, readability, and keyword coverage while preserving your authentic voice.'
    },
    {
      number: '04',
      title: 'Export & Track',
      description: 'Download in ATS-friendly formats and maintain role-specific versions with progress insights.'
    }
  ];

  return (
    <main className="min-h-screen w-screen font-sans bg-black text-white relative overflow-x-hidden">
      {/* LiquidEther Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      {/* Navigation */}
      <LandingHeader />
      
      <div className="relative z-10 pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About <span className="text-blue-400">Resumify</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Resumify is a precision AI-powered tool designed to transform your professional history into compelling, 
              job-ready resumes. We help professionals from diverse backgrounds communicate their capabilities with 
              confidence and land their dream jobs.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Resumify?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our AI-powered platform combines cutting-edge technology with user-friendly design
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const colors = [
                  { bg: 'from-blue-500 to-blue-600', hover: 'hover:text-blue-600', gradient: 'from-blue-500/5 to-blue-600/5' },
                  { bg: 'from-emerald-500 to-emerald-600', hover: 'hover:text-emerald-600', gradient: 'from-emerald-500/5 to-emerald-600/5' },
                  { bg: 'from-purple-500 to-purple-600', hover: 'hover:text-purple-600', gradient: 'from-purple-500/5 to-purple-600/5' },
                  { bg: 'from-orange-500 to-orange-600', hover: 'hover:text-orange-600', gradient: 'from-orange-500/5 to-orange-600/5' }
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div key={feature.title} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <h3 className={`text-xl font-bold text-gray-900 mb-4 ${colorScheme.hover} transition-colors duration-300`}>{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Powerful Features Section */}
        <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Everything you need to build the perfect resume
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'AI-Powered Resume Generation',
                  description: 'Describe yourself naturally and our AI creates a professional resume instantly. No forms, no hassle - just tell us about your experience and let AI do the work.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Job-Match Intelligence',
                  description: 'Our AI analyzes job descriptions and tailors your resume to match specific requirements. Increase your chances by aligning your CV to what employers are looking for.',
                  color: 'from-emerald-500 to-emerald-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                    </svg>
                  ),
                  title: 'Multiple Professional Templates',
                  description: 'Choose from 10+ professionally designed templates including Korina Villanueva, Riaan Chandran, and more. Each template is ATS-optimized and industry-tested.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                  title: 'PDF Upload & OCR Extraction',
                  description: 'Upload your existing resume (PDF or image) and our OCR technology extracts all information automatically. AI then parses and structures your data for easy editing.',
                  color: 'from-orange-500 to-orange-600'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                  title: 'Interview Preparation AI',
                  description: 'Get AI-generated interview questions and answers based on job descriptions. Practice with role-specific questions and walk into interviews fully prepared.',
                  color: 'from-pink-500 to-pink-600'
                }
              ].map((feature, index) => {
                return (
                  <div key={feature.title} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color.replace('to', 'via')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get your perfect resume in just four simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const colors = [
                  { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', border: 'border-blue-200' },
                  { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600', border: 'border-emerald-200' },
                  { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600', border: 'border-purple-200' },
                  { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', border: 'border-orange-200' }
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div key={step.number} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colorScheme.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      <h3 className={`text-xl font-bold text-gray-900 mb-4 ${colorScheme.text} transition-colors duration-300`}>{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Mission</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
                <p>
                  Resumify exists to widen access to opportunity. By lowering the barrier to professional storytelling, 
                  we help candidates from diverse backgrounds communicate their capabilities with confidence and dignity.
                </p>
                <p>
                  Our system promotes equitable hiring by emphasizing verified skills and outcomes, offering inclusive 
                  language guidance, and providing clear, constructive feedback rather than opaque scoring.
                </p>
                <p>
                  Whether you are entering the workforce, changing careers, or aiming higher in your current field, 
                  Resumify equips you to present your best work clearly, truthfully, and effectively—so your talent 
                  is recognized on merit.
                </p>
              </div>
            </div>
        </div>
        </section>
      </div>
    </main>
  );
}

export default About;
