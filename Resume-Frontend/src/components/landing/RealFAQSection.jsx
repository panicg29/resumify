import React, { useState, useRef } from 'react';
import AnimatedCard from '../react-bits/AnimatedCard';
import AnimatedText from '../react-bits/AnimatedText';
import VariableProximity from '../react-bits/VariableProximity';

const faqs = [
  {
    question: 'How long does it take to create a resume?',
    answer:
      'With our AI-powered generator, you can create a professional resume in just 5-10 minutes. Our guided builder takes 15-20 minutes if you prefer manual input. You can save your progress and return anytime.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    question: 'Are the templates ATS-friendly?',
    answer:
      'Yes! All our templates are designed to pass Applicant Tracking Systems (ATS). We use standard fonts, proper formatting, and optimized layouts that ensure your resume gets through automated screening.',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    question: 'Can I edit my resume after creating it?',
    answer:
      'Absolutely! Access your dashboard anytime to edit, update, or modify any section of your resume. You can also change templates, download new versions, and create multiple variations for different jobs.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'purple',
  },
  {
    question: 'What file formats can I download?',
    answer:
      'You can download your resume as a high-quality PDF, which is the most widely accepted format by employers. PDF ensures your formatting stays perfect across all devices and platforms.',
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'orange',
  },
  {
    question: 'Is my data secure and private?',
    answer:
      'Your privacy is our priority. All data is encrypted and stored securely. You have complete control over your information and can delete your account and data at any time. We never share your information with third parties.',
    icon: (
      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'pink',
  },
  {
    question: 'Do you offer customer support?',
    answer:
      'Yes! We provide comprehensive support through our help center, email support, and detailed tutorials. Our team is here to help you create the perfect resume and answer any questions you may have.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'blue',
  },
];

export default function RealFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            <VariableProximity
              label="Frequently Asked Questions"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={sectionRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about Resumify
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-white/30 bg-white/[0.08]' 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-start justify-between gap-4"
              >
                <h3 className="text-lg font-semibold text-white flex-1 pr-4">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Subtle gradient line at bottom when expanded */}
              {openIndex === index && (
                <div className={`h-0.5 bg-gradient-to-r ${
                  faq.color === 'cyan' ? 'from-cyan-500/50 via-cyan-400/50 to-transparent' :
                  faq.color === 'emerald' ? 'from-emerald-500/50 via-emerald-400/50 to-transparent' :
                  faq.color === 'purple' ? 'from-purple-500/50 via-purple-400/50 to-transparent' :
                  faq.color === 'orange' ? 'from-orange-500/50 via-orange-400/50 to-transparent' :
                  faq.color === 'pink' ? 'from-pink-500/50 via-pink-400/50 to-transparent' :
                  'from-blue-500/50 via-blue-400/50 to-transparent'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

