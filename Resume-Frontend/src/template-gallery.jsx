import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { CardDescription } from './components/ui/card';
import KorinaVillanuevaTemplate from './components/templates/KorinaVillanuevaTemplate';
import RiaanChandranTemplate from './components/templates/RiaanChandranTemplate';
import AdoraMontminyTemplate from './components/templates/AdoraMontminyTemplate';
import JamieChastainTemplate from './components/templates/JamieChastainTemplate';
import DonnaStroupeTemplate from './components/templates/DonnaStroupeTemplate';
import RichardSanchezNewTemplate from './components/templates/RichardSanchezNewTemplate';
import DanielGallegoTemplate from './components/templates/DanielGallegoTemplate';
import ClaudiaAlvesTemplate from './components/templates/ClaudiaAlvesTemplate';
import BartholomewHendersonTemplate from './components/templates/BartholomewHendersonTemplate';
import FranciscoAndradeTemplate from './components/templates/FranciscoAndradeTemplate';
import OliviaWilsonTemplate from './components/templates/OliviaWilsonTemplate';
import EstelleDarcyTemplate from './components/templates/EstelleDarcyTemplate';
import JulianaSilvaTemplate from './components/templates/JulianaSilvaTemplate';
import CatrineZivTemplate from './components/templates/CatrineZivTemplate';
import OliviaWilsonDarkBlueTemplate from './components/templates/OliviaWilsonDarkBlueTemplate';
import PhylisFlexTemplate from './components/templates/PhylisFlexTemplate';
import LightRays from './components/react-bits/LightRays';
import TemplateTiltedCard from './components/TemplateTiltedCard';
import LandingHeader from './components/landing/LandingHeader';
import CardSwap, { Card } from './components/react-bits/CardSwap';

export default function TemplateGallery() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewData, setPreviewData] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexchen',
    role: 'Senior Full Stack Engineer',
    title: 'Senior Full Stack Engineer',
    summary: 'Innovative software engineer with 6+ years of experience in cutting-edge technologies. Specialized in AI/ML, cloud architecture, and full-stack development. Passionate about creating scalable solutions and leading technical teams to deliver exceptional results.',
    education: [{
      degree: 'Master of Computer Science',
      institution: 'Stanford University',
      year: 2018,
      gpa: '4.0'
    }],
    experience: [{
      company: 'TechVision Inc.',
      title: 'Senior Full Stack Engineer',
      startDate: 'Mar 2021',
      endDate: 'Present',
      current: true,
      location: 'San Francisco, CA',
      description: 'Led development of AI-powered applications serving 2M+ users. Architected microservices infrastructure and implemented advanced CI/CD pipelines. Mentored junior developers and established coding standards.',
      achievements: 'Increased application performance by 40% through optimization techniques'
    }],
    skills: [{
      name: 'Python',
      level: 'Expert'
    }, {
      name: 'JavaScript',
      level: 'Expert'
    }, {
      name: 'React',
      level: 'Advanced'
    }, {
      name: 'AWS',
      level: 'Advanced'
    }],
    projects: [{
      name: 'AI-Powered Analytics Platform',
      description: 'Developed a comprehensive analytics platform using machine learning algorithms to provide real-time insights and predictive analytics for business intelligence.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      date: '2022 - 2023',
      location: 'Remote',
      outcome: 'Successfully deployed to production serving 500K+ users'
    }],
    achievements: [{
      title: 'Tech Innovation Award',
      description: 'Recognized for outstanding contributions to AI/ML research and development'
    }],
    courses: [{
      title: 'Advanced Machine Learning',
      name: 'Advanced Machine Learning'
    }],
    interests: [{
      name: 'Open Source Contribution',
      title: 'Open Source Contribution'
    }]
  });

  const templates = [
    {
      id: 'korina-villanueva',
      name: 'Korina Villanueva',
      description: 'Elegant two-column design with light beige sidebar and professional layout',
      category: 'Professional',
      component: KorinaVillanuevaTemplate,
      features: ['Two-column', 'Beige theme', 'Professional', 'Clean layout', 'Skills rating'],
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'riaan-chandran',
      name: 'Riaan Chandran',
      description: 'Modern dark theme with orange accents and bold typography',
      category: 'Creative',
      component: RiaanChandranTemplate,
      features: ['Dark theme', 'Orange accents', 'Bold design', 'Modern', 'Grid pattern'],
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'adora-montminy',
      name: 'Adora Montminy',
      description: 'Creative design with dark charcoal sidebar, light pink accent, and portrait',
      category: 'Creative',
      component: AdoraMontminyTemplate,
      features: ['Dark theme', 'Pink accent', 'Portrait', 'Creative', 'Vertical text'],
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 'jamie-chastain',
      name: 'Jamie Chastain',
      description: 'Professional black sidebar design with clean white main content area',
      category: 'Professional',
      component: JamieChastainTemplate,
      features: ['Black sidebar', 'White theme', 'Professional', 'Clean layout', 'Bullet points'],
      color: 'from-gray-800 to-gray-900'
    },
    {
      id: 'donna-stroupe',
      name: 'Donna Stroupe',
      description: 'Light gray sidebar with centered sections and professional white layout',
      category: 'Professional',
      component: DonnaStroupeTemplate,
      features: ['Gray sidebar', 'Centered sections', 'Professional', 'Clean layout', 'References'],
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'richard-sanchez-new',
      name: 'Richard Sanchez',
      description: 'Modern light gray background with blue accents and horizontal sections',
      category: 'Modern',
      component: RichardSanchezNewTemplate,
      features: ['Light gray', 'Blue accents', 'Modern', 'Horizontal layout', 'Skills grid'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'daniel-gallego',
      name: 'Daniel Gallego',
      description: 'Single column design with grey header bars and clean professional layout',
      category: 'Professional',
      component: DanielGallegoTemplate,
      features: ['Single column', 'Grey headers', 'Professional', 'Clean layout', 'Justified text'],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'claudia-alves',
      name: 'Claudia Alves',
      description: 'Dark brown sidebar with light beige main content and professional layout',
      category: 'Professional',
      component: ClaudiaAlvesTemplate,
      features: ['Dark brown sidebar', 'Light beige', 'Professional', 'Two-column', 'Hobby section'],
      color: 'from-amber-800 to-amber-900'
    },
    {
      id: 'bartholomew-henderson',
      name: 'Bartholomew Henderson',
      description: 'Dark blue sidebar with white main content and clean design',
      category: 'Professional',
      component: BartholomewHendersonTemplate,
      features: ['Dark blue sidebar', 'White theme', 'Professional', 'Two-column', 'Language section'],
      color: 'from-blue-900 to-blue-950'
    },
    {
      id: 'francisco-andrade',
      name: 'Francisco Andrade',
      description: 'Light gray sidebar with dark blue header and white main content',
      category: 'Professional',
      component: FranciscoAndradeTemplate,
      features: ['Gray sidebar', 'Blue header', 'Professional', 'Two-column', 'Reference section'],
      color: 'from-blue-700 to-blue-900'
    },
    {
      id: 'olivia-wilson',
      name: 'Olivia Wilson',
      description: 'Elegant two-column design with light peach/beige sidebar and off-white main content',
      category: 'Professional',
      component: OliviaWilsonTemplate,
      features: ['Peach sidebar', 'Off-white theme', 'Professional', 'Two-column', 'Decorative elements'],
      color: 'from-purple-700 to-purple-900'
    },
    {
      id: 'estelle-darcy',
      name: 'Estelle Darcy',
      description: 'Clean two-column design with light grey sidebar and white main content',
      category: 'Professional',
      component: EstelleDarcyTemplate,
      features: ['Light grey sidebar', 'White theme', 'Professional', 'Two-column', 'Content Creator'],
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'juliana-silva',
      name: 'Juliana Silva',
      description: 'Elegant two-column design with light peach/beige sidebar and off-white main content',
      category: 'Professional',
      component: JulianaSilvaTemplate,
      features: ['Peach sidebar', 'Off-white theme', 'Professional', 'Two-column', 'Senior Graphic Designer'],
      color: 'from-amber-300 to-amber-500'
    },
    {
      id: 'catrine-ziv',
      name: 'Catrine Ziv',
      description: 'Professional two-column design with dark green-grey sidebar and light off-white main content',
      category: 'Professional',
      component: CatrineZivTemplate,
      features: ['Dark green sidebar', 'Off-white theme', 'Professional', 'Two-column', 'IT Project Manager'],
      color: 'from-green-700 to-green-900'
    },
    {
      id: 'olivia-wilson-dark-blue',
      name: 'Olivia Wilson Dark Blue',
      description: 'Professional two-column design with dark blue-grey sidebar and white main content',
      category: 'Professional',
      component: OliviaWilsonDarkBlueTemplate,
      features: ['Dark blue sidebar', 'White theme', 'Professional', 'Two-column', 'Marketing Manager'],
      color: 'from-blue-800 to-blue-900'
    },
    {
      id: 'phylis-flex',
      name: 'Phylis Flex',
      description: 'Clean design with light gray header and two-column layout',
      category: 'Professional',
      component: PhylisFlexTemplate,
      features: ['Light gray header', 'Two-column', 'Professional', 'Graphic Designer'],
      color: 'from-gray-300 to-gray-500'
    }
  ];

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    // Navigate to resume builder with selected template
    navigate(`/resume-builder?template=${templateId}`);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTemplate]);

  return (
    <main className="min-h-screen w-screen font-sans bg-black text-white relative overflow-x-hidden">
      {/* LightRays Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      
      {/* Navigation */}
      <LandingHeader />

      {/* Header */}
      <div className="relative z-10 text-center pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-6 text-white">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Select from our collection of professionally designed resume templates
          </p>
        </div>
      </div>

      {/* Template Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
          {templates.map((template) => (
            <div key={template.id} className="group w-full max-w-sm flex flex-col">
              {/* Template Preview with Tilted Effect */}
              <div className="relative mb-4 rounded-[15px] overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
                <TemplateTiltedCard
                  containerHeight="300px"
                  containerWidth="100%"
                  contentHeight="300px"
                  contentWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  captionText={template.name}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute top-2 right-2 z-10 pointer-events-auto">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${template.color}`}>
                        {template.category}
                      </span>
                    </div>
                  }
                >
                  {/* Template Preview Content */}
                  <div className="relative w-full h-full bg-white overflow-hidden">
                    <div className="transform scale-[0.28] origin-top-left w-[357%] h-[1123px] overflow-hidden">
                      {React.createElement(template.component, { formData: previewData })}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                </TemplateTiltedCard>
              </div>

              {/* Template Info */}
              <div className="flex flex-col flex-grow px-1">
                <h3 className="text-xl font-black mb-2 text-white">
                  {template.name}
                </h3>
                <CardDescription className="text-gray-300 text-sm leading-relaxed mb-4">
                  {template.description}
                </CardDescription>
                
                {/* Features */}
                <div className="mb-5 flex-grow">
                  <h4 className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Features</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {template.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 bg-white/10 text-gray-200 rounded-lg text-xs font-medium border border-white/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <Button 
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`w-full h-10 rounded-xl bg-gradient-to-r ${template.color} hover:opacity-95 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Use Template
                    </span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-8 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 font-medium text-sm bg-transparent"
                    onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                  >
                    {selectedTemplate === template.id ? 'Hide Preview' : 'Preview Full'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Size Preview Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedTemplate(null);
            }
          }}
        >
          <div className="relative max-w-7xl w-full max-h-[95vh] flex flex-col bg-black/80 backdrop-blur-md rounded-3xl shadow-3xl border border-white/10">
            <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center rounded-t-3xl flex-shrink-0">
              <div>
                <h3 className="text-2xl font-black text-white mb-1">
                  {templates.find(t => t.id === selectedTemplate)?.name} Template
                </h3>
                <p className="text-gray-300 font-medium">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setSelectedTemplate(null)}
                className="rounded-full w-12 h-12 p-0 border-2 border-white/20 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 shadow-lg hover:shadow-xl bg-transparent text-white flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl mx-auto" style={{ maxWidth: '21cm', overflow: 'visible' }}>
                {(() => {
                  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
                  if (selectedTemplateData && selectedTemplateData.component) {
                    const TemplateComponent = selectedTemplateData.component;
                    return <TemplateComponent formData={previewData} />;
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
