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
import CatrineZivTemplate from './components/templates/CatrineZivTemplate';
import OliviaWilsonDarkBlueTemplate from './components/templates/OliviaWilsonDarkBlueTemplate';
import PhylisFlexTemplate from './components/templates/PhylisFlexTemplate';
import MultiPageTemplate1 from './components/templates/MultiPageTemplate1';
import MultiPageTemplate2 from './components/templates/MultiPageTemplate2';
import MultiPageTemplate3 from './components/templates/MultiPageTemplate3';
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
    summary: 'Innovative software engineer with 8+ years of experience in cutting-edge technologies. Specialized in AI/ML, cloud architecture, and full-stack development. Passionate about creating scalable solutions and leading technical teams to deliver exceptional results. Proven track record of building systems serving millions of users with 99.9% uptime.',
    education: [{
      degree: 'Master of Computer Science',
      institution: 'Stanford University',
      year: 2018,
      gpa: '4.0'
    }, {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'UC Berkeley',
      year: 2016,
      gpa: '3.9'
    }, {
      degree: 'Certificate in Cloud Architecture',
      institution: 'AWS Training',
      year: 2023
    }],
    experience: [{
      company: 'TechVision Inc.',
      title: 'Senior Full Stack Engineer',
      startDate: 'Mar 2021',
      endDate: 'Present',
      current: true,
      location: 'San Francisco, CA',
      description: 'Led development of AI-powered applications serving 2M+ users. Architected microservices infrastructure and implemented advanced CI/CD pipelines. Mentored junior developers and established coding standards. Reduced system latency by 40% through optimization initiatives.'
    }, {
      company: 'StartupCo',
      title: 'Full Stack Developer',
      startDate: 'Jun 2019',
      endDate: 'Feb 2021',
      current: false,
      location: 'San Francisco, CA',
      description: 'Developed and maintained full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality products. Implemented automated testing reducing bugs by 60%.'
    }, {
      company: 'Web Solutions Ltd.',
      title: 'Junior Developer',
      startDate: 'Jan 2018',
      endDate: 'May 2019',
      current: false,
      location: 'San Francisco, CA',
      description: 'Built responsive web applications using modern JavaScript frameworks. Participated in agile development processes and code reviews. Contributed to open-source projects.'
    }],
    skills: [{
      name: 'Python',
      level: 'Expert'
    }, {
      name: 'JavaScript',
      level: 'Expert'
    }, {
      name: 'React',
      level: 'Expert'
    }, {
      name: 'Node.js',
      level: 'Advanced'
    }, {
      name: 'AWS',
      level: 'Advanced'
    }, {
      name: 'Docker',
      level: 'Advanced'
    }, {
      name: 'Kubernetes',
      level: 'Intermediate'
    }, {
      name: 'TypeScript',
      level: 'Expert'
    }, {
      name: 'MongoDB',
      level: 'Advanced'
    }, {
      name: 'PostgreSQL',
      level: 'Advanced'
    }, {
      name: 'GraphQL',
      level: 'Intermediate'
    }, {
      name: 'Redis',
      level: 'Intermediate'
    }, {
      name: 'Git',
      level: 'Expert'
    }, {
      name: 'CI/CD',
      level: 'Advanced'
    }, {
      name: 'Microservices',
      level: 'Advanced'
    }, {
      name: 'REST APIs',
      level: 'Expert'
    }, {
      name: 'Agile/Scrum',
      level: 'Advanced'
    }, {
      name: 'System Design',
      level: 'Advanced'
    }, {
      name: 'Linux',
      level: 'Intermediate'
    }, {
      name: 'Terraform',
      level: 'Intermediate'
    }],
    projects: [{
      name: 'AI-Powered Analytics Platform',
      description: 'Developed a comprehensive analytics platform using machine learning algorithms to provide real-time insights and predictive analytics for business intelligence. Handles 1M+ transactions monthly with 99.9% uptime.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      url: 'https://example.com',
      github: 'https://github.com/example/analytics'
    }, {
      name: 'Cloud Infrastructure Automation',
      description: 'Created automated infrastructure deployment system using Terraform and AWS. Reduced deployment time from 2 hours to 15 minutes.',
      technologies: ['Terraform', 'AWS', 'Docker', 'Kubernetes'],
      url: 'https://example.com',
      github: 'https://github.com/example/infra'
    }, {
      name: 'Task Management App',
      description: 'Developed a collaborative task management application with real-time updates and team collaboration features. Used WebSocket for live updates.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      url: 'https://example.com',
      github: 'https://github.com/example/tasks'
    }],
    certifications: [{
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023'
    }, {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022'
    }, {
      name: 'Certified Kubernetes Administrator',
      issuer: 'CNCF',
      date: '2023'
    }],
    awards: [{
      name: 'Employee of the Year',
      organization: 'TechVision Inc.',
      date: '2023'
    }, {
      name: 'Innovation Award',
      organization: 'StartupCo',
      date: '2021'
    }],
    languages: [{
      name: 'English',
      proficiency: 'Native'
    }, {
      name: 'Spanish',
      proficiency: 'Fluent'
    }, {
      name: 'French',
      proficiency: 'Intermediate'
    }],
    achievements: [{
      title: 'Tech Innovation Award',
      description: 'Recognized for outstanding contributions to AI/ML research and development'
    }],
    courses: [{
      title: 'Advanced Machine Learning',
      name: 'Advanced Machine Learning'
    }],
    interests: ['Open Source Contribution', 'Machine Learning Research', 'Tech Blogging'],
    hobbies: ['Photography', 'Hiking', 'Reading'],
    certifications: [{
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023'
    }],
    trainings: [{
      name: 'Advanced Machine Learning',
      institution: 'Coursera',
      date: '2023'
    }],
    publications: [{
      title: 'Scalable Microservices Architecture',
      journal: 'IEEE Software',
      year: '2023'
    }],
    volunteerWork: [{
      organization: 'Code for Good',
      role: 'Volunteer Developer'
    }],
    professionalMemberships: [{
      organization: 'IEEE Computer Society',
      role: 'Member'
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
    },
    {
      id: 'multipage-template-1',
      name: 'Multi-Page Professional',
      description: '3-page corporate style resume with dark blue header and comprehensive content distribution',
      category: 'Multi-Page',
      component: MultiPageTemplate1,
      features: ['3 pages', 'Dark blue header', 'Corporate style', 'Professional', 'Content-filled'],
      color: 'from-blue-700 to-blue-900'
    },
    {
      id: 'multipage-template-2',
      name: 'Multi-Page Modern Tech',
      description: '3-page modern tech resume with gradient design and contemporary layout',
      category: 'Multi-Page',
      component: MultiPageTemplate2,
      features: ['3 pages', 'Gradient design', 'Modern tech', 'Blue theme', 'Content-filled'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'multipage-template-3',
      name: 'Multi-Page Creative',
      description: '3-page creative resume with purple sidebar and bold visual design',
      category: 'Multi-Page',
      component: MultiPageTemplate3,
      features: ['3 pages', 'Purple sidebar', 'Creative design', 'Visual timeline', 'Content-filled'],
      color: 'from-purple-700 to-indigo-800'
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
                    // For multi-page templates, show all pages
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
