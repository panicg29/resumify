import React from 'react';
import AnimatedCard from '../react-bits/AnimatedCard';
import AnimatedText from '../react-bits/AnimatedText';
import AnimatedIcon from '../react-bits/AnimatedIcon';

const faqs = [
  {
    question: 'AI-Powered Resume Generation',
    answer:
      'Describe yourself naturally and our AI creates a professional resume instantly. No forms, no hassle - just tell us about your experience and let AI do the work.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'blue',
    hoverColor: 'hover:border-blue-200',
    bgColor: 'bg-blue-100',
    hoverBgColor: 'group-hover:bg-blue-200',
    textColor: 'group-hover:text-blue-600',
  },
  {
    question: 'Job-Match Intelligence',
    answer:
      'Our AI analyzes job descriptions and tailors your resume to match specific requirements. Increase your chances by aligning your CV to what employers are looking for.',
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'emerald',
    hoverColor: 'hover:border-emerald-200',
    bgColor: 'bg-emerald-100',
    hoverBgColor: 'group-hover:bg-emerald-200',
    textColor: 'group-hover:text-emerald-600',
  },
  {
    question: 'Multiple Professional Templates',
    answer:
      'Choose from 10+ professionally designed templates including Korina Villanueva, Riaan Chandran, and more. Each template is ATS-optimized and industry-tested.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
    color: 'purple',
    hoverColor: 'hover:border-purple-200',
    bgColor: 'bg-purple-100',
    hoverBgColor: 'group-hover:bg-purple-200',
    textColor: 'group-hover:text-purple-600',
  },
  {
    question: 'PDF Upload & OCR Extraction',
    answer:
      'Upload your existing resume (PDF or image) and our OCR technology extracts all information automatically. AI then parses and structures your data for easy editing.',
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    color: 'orange',
    hoverColor: 'hover:border-orange-200',
    bgColor: 'bg-orange-100',
    hoverBgColor: 'group-hover:bg-orange-200',
    textColor: 'group-hover:text-orange-600',
  },
  {
    question: 'Interview Preparation AI',
    answer:
      'Get AI-generated interview questions and answers based on job descriptions. Practice with role-specific questions and walk into interviews fully prepared.',
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'red',
    hoverColor: 'hover:border-red-200',
    bgColor: 'bg-red-100',
    hoverBgColor: 'group-hover:bg-red-200',
    textColor: 'group-hover:text-red-600',
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-lg text-white/70">
            Everything you need to build the perfect resume
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedCard
              key={index}
              delay={index * 0.08}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {faq.question}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

