import React, { useState, useRef } from 'react';
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';
import Particles from './components/react-bits/Particles';
import MagicBento, { ParticleCard } from './components/react-bits/MagicBento';
import LandingHeader from './components/landing/LandingHeader';

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const gridRef = useRef(null);

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for students and entry-level professionals',
      price: { monthly: 9, annual: 7 },
      features: [
        '1 Resume Template',
        'Basic AI Optimization',
        'PDF Download',
        'Email Support',
        'ATS Compatibility Check'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      popular: false,
      gradient: 'from-gray-500 to-gray-600',
      hoverGradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Professional',
      description: 'Ideal for experienced professionals and job seekers',
      price: { monthly: 19, annual: 15 },
      features: [
        '10+ Premium Templates',
        'Advanced AI Optimization',
        'Multiple Format Downloads',
        'Priority Support',
        'Cover Letter Builder',
        'LinkedIn Profile Optimization',
        'Job Matching Alerts',
        'Unlimited Revisions'
      ],
      buttonText: 'Choose Professional',
      buttonVariant: 'default',
      popular: true,
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      hoverGradient: 'from-indigo-700 via-purple-700 to-pink-700'
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: { monthly: 49, annual: 39 },
      features: [
        'Unlimited Templates',
        'Custom Branding',
        'Team Collaboration',
        'API Access',
        'Dedicated Account Manager',
        'Custom Integrations',
        'Advanced Analytics',
        'White-label Solution',
        'Bulk Resume Processing'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      popular: false,
      gradient: 'from-emerald-600 via-green-600 to-lime-600',
      hoverGradient: 'from-emerald-700 via-green-700 to-lime-700'
    }
  ];

  return (
    <main className="min-h-screen w-screen font-sans bg-black text-white relative overflow-x-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      {/* Navigation */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-24 md:pt-32 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Pricing</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Choose the perfect plan for your career journey. All plans include our core AI-powered resume optimization features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <div className="relative inline-flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  !isAnnual
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isAnnual
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 w-full py-8 px-4 sm:px-6 lg:px-8 bento-section">
        <div className="max-w-7xl mx-auto">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
            gridRef={gridRef}
          >
            <div 
              ref={gridRef}
              className="bento-section grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {pricingPlans.map((plan, index) => (
                <ParticleCard
                  key={plan.name}
                  className={`magic-bento-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden group ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-300 scale-105 ring-4 ring-indigo-100' 
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  } magic-bento-card--border-glow`}
                  style={{
                    backgroundColor: plan.popular 
                      ? 'transparent' 
                      : '#ffffff',
                    borderColor: plan.popular 
                      ? 'rgba(99, 102, 241, 0.3)' 
                      : 'rgba(229, 231, 235, 1)',
                    '--glow-x': '50%',
                    '--glow-y': '50%',
                    '--glow-intensity': '0',
                    '--glow-radius': '300px'
                  }}
                  particleCount={12}
                  glowColor="132, 0, 255"
                  enableTilt={true}
                  clickEffect={true}
                  enableMagnetism={true}
                >
                  {/* Special gradient overlay for popular plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
                  )}

                  {/* Regular gradient overlay on hover for non-popular plans */}
                  {!plan.popular && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient.replace('from-', 'from-').replace('to-', 'to-')}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                  )}
                  
                  <div className="relative z-10">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'text-gray-900'}`}>
                        {plan.name}
                      </h3>
                      <p className={`mb-6 ${plan.popular ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>{plan.description}</p>
                      <div className="mb-6">
                        <span className={`text-5xl font-black ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'text-gray-900'}`}>
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className={`ml-2 ${plan.popular ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>/month</span>
                        {isAnnual && (
                          <div className={`text-sm font-medium mt-1 ${plan.popular ? 'text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block' : 'text-emerald-600'}`}>
                            💰 Billed annually (${plan.price.annual * 12}/year)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md' 
                              : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                          }`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className={`${plan.popular ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white'
                          : plan.buttonVariant === 'outline'
                          ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 bg-white'
                          : plan.name === 'Starter'
                          ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                          : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'
                      }`}
                      onClick={() => navigate('/signup')}
                    >
                      {plan.popular && <span className="mr-2">🚀</span>}
                      {plan.buttonText}
                    </Button>
                  </div>
                </ParticleCard>
              ))}
            </div>
          </MagicBento>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">Everything you need to know about our pricing</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-white">Can I change my plan anytime?</h3>
              <p className="text-gray-300 leading-relaxed">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-white">Is there a free trial?</h3>
              <p className="text-gray-300 leading-relaxed">We offer a 14-day free trial for all paid plans. No credit card required to start your trial.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-white">What payment methods do you accept?</h3>
              <p className="text-gray-300 leading-relaxed">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-3 text-white">Can I cancel anytime?</h3>
              <p className="text-gray-300 leading-relaxed">Absolutely! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 100,000+ professionals who've transformed their careers with Resumify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => navigate('/resume-builder')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
