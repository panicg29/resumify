import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resumeApi from '../services/resumeApi';
import LightRays from '../components/react-bits/LightRays';
import LandingHeader from '../components/landing/LandingHeader';
import RotatingText from '../components/RotatingText';
import KorinaVillanuevaTemplate from '../components/templates/KorinaVillanuevaTemplate';
import RiaanChandranTemplate from '../components/templates/RiaanChandranTemplate';
import AdoraMontminyTemplate from '../components/templates/AdoraMontminyTemplate';
import JamieChastainTemplate from '../components/templates/JamieChastainTemplate';
import DonnaStroupeTemplate from '../components/templates/DonnaStroupeTemplate';
import RichardSanchezNewTemplate from '../components/templates/RichardSanchezNewTemplate';
import DanielGallegoTemplate from '../components/templates/DanielGallegoTemplate';
import ClaudiaAlvesTemplate from '../components/templates/ClaudiaAlvesTemplate';
import BartholomewHendersonTemplate from '../components/templates/BartholomewHendersonTemplate';
import FranciscoAndradeTemplate from '../components/templates/FranciscoAndradeTemplate';
import OliviaWilsonTemplate from '../components/templates/OliviaWilsonTemplate';
import EstelleDarcyTemplate from '../components/templates/EstelleDarcyTemplate';
import JulianaSilvaTemplate from '../components/templates/JulianaSilvaTemplate';
import CatrineZivTemplate from '../components/templates/CatrineZivTemplate';
import OliviaWilsonDarkBlueTemplate from '../components/templates/OliviaWilsonDarkBlueTemplate';
import PhylisFlexTemplate from '../components/templates/PhylisFlexTemplate';

export default function AIGenerateResume() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('korina-villanueva'); // Default template
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const promptSuggestions = [
    "Start with your name, email, and phone number",
    "Mention your education (degree, institution, year)",
    "Describe your work experience (company, role, dates, responsibilities)",
    "List your technical skills and proficiency levels",
    "Include projects you've worked on with technologies used",
    "Add any certifications or achievements"
  ];

  const examplePrompts = [
    "I'm John Doe, a software engineer with 5 years of experience. I have a Bachelor's in Computer Science from MIT (2018). I worked as a Frontend Developer at Google from 2019 to 2021, where I built React applications. Currently, I'm a Full Stack Developer at Microsoft since 2021. I'm skilled in JavaScript, React, Node.js, MongoDB, and Python. I've built several projects including an e-commerce platform using MERN stack.",
    "Sarah Johnson, senior full-stack developer with 7 years experience. Email: sarah.j@example.com, Phone: +1-555-789-0123. Education: Bachelor's in Computer Science from UC Berkeley (2016), Master's in Software Engineering from Stanford (2018). Experience: Senior Developer at Amazon (2020-present) leading microservices development. Developer at Google (2018-2020) built React applications with Node.js. Skills: JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, Kubernetes - all Advanced to Expert level.",
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim() || prompt.trim().length < 50) {
      setError('Please provide at least 50 characters describing yourself, your experience, education, and skills.');
      return;
    }

    if (!selectedTemplate) {
      setError('Please select a template before generating your resume.');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedResume(null);

    try {
      const resume = await resumeApi.generateResumeFromPrompt(prompt.trim(), selectedTemplate);
      setGeneratedResume(resume);
      toast.success('Resume generated successfully! 🎉');
    } catch (err) {
      console.error('Generate resume error:', err);
      
      // User-friendly error messages
      let errorMessage = 'Failed to generate resume. Please try again.';
      if (err.message.includes('Prompt is required')) {
        errorMessage = 'Please provide a description to generate your resume.';
      } else if (err.message.includes('Failed to generate resume with AI') || err.message.includes('quota')) {
        errorMessage = 'AI service is temporarily unavailable. Please try again in a moment.';
      } else if (err.message.includes('complete resume data')) {
        errorMessage = 'Please provide more details about your experience, education, or skills.';
      } else if (err.message.includes('Network') || err.message.includes('fetch') || err.message.includes('connect')) {
        errorMessage = 'Network error. Please check your connection and ensure the backend is running.';
      } else {
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUseExample = (example) => {
    setPrompt(example);
    setError(null);
  };

  const handleViewResume = () => {
    if (generatedResume) {
      navigate('/dashboard');
      // The dashboard will show the new resume automatically
      toast.info('Navigate to Dashboard to view your resume');
    }
  };

  const handleGenerateAnother = () => {
    setPrompt('');
    setGeneratedResume(null);
    setError(null);
    setSelectedTemplate('korina-villanueva'); // Reset to default
  };

  const templates = [
    { id: 'korina-villanueva', name: 'Korina Villanueva', color: 'from-amber-600 to-amber-800', desc: 'Elegant two-column with light beige sidebar' },
    { id: 'riaan-chandran', name: 'Riaan Chandran', color: 'from-orange-500 to-orange-700', desc: 'Modern dark theme with orange accents' },
    { id: 'adora-montminy', name: 'Adora Montminy', color: 'from-pink-500 to-pink-700', desc: 'Creative dark charcoal with light pink accent' },
    { id: 'jamie-chastain', name: 'Jamie Chastain', color: 'from-gray-800 to-gray-900', desc: 'Professional black sidebar with clean white layout' },
    { id: 'donna-stroupe', name: 'Donna Stroupe', color: 'from-gray-500 to-gray-700', desc: 'Light gray sidebar with centered sections' },
    { id: 'richard-sanchez-new', name: 'Richard Sanchez', color: 'from-blue-600 to-blue-800', desc: 'Modern light gray with blue accents' },
    { id: 'daniel-gallego', name: 'Daniel Gallego', color: 'from-gray-600 to-gray-800', desc: 'Single column with grey header bars' },
    { id: 'claudia-alves', name: 'Claudia Alves', color: 'from-amber-800 to-amber-900', desc: 'Dark brown sidebar with light beige main' },
    { id: 'bartholomew-henderson', name: 'Bartholomew Henderson', color: 'from-blue-900 to-blue-950', desc: 'Dark blue sidebar with white main' },
    { id: 'francisco-andrade', name: 'Francisco Andrade', color: 'from-blue-700 to-blue-900', desc: 'Light gray sidebar with dark blue header' },
    { id: 'olivia-wilson', name: 'Olivia Wilson', color: 'from-purple-700 to-purple-900', desc: 'Elegant two-column with light peach/beige sidebar' },
    { id: 'estelle-darcy', name: 'Estelle Darcy', color: 'from-gray-400 to-gray-600', desc: 'Clean two-column with light grey sidebar' },
    { id: 'juliana-silva', name: 'Juliana Silva', color: 'from-amber-300 to-amber-500', desc: 'Elegant two-column with light peach/beige sidebar' },
    { id: 'catrine-ziv', name: 'Catrine Ziv', color: 'from-green-700 to-green-900', desc: 'Professional two-column with dark green-grey sidebar' },
    { id: 'olivia-wilson-dark-blue', name: 'Olivia Wilson Dark Blue', color: 'from-blue-800 to-blue-900', desc: 'Professional two-column with dark blue-grey sidebar' },
    { id: 'phylis-flex', name: 'Phylis Flex', color: 'from-gray-300 to-gray-500', desc: 'Clean design with light gray header' }
  ];

  const previewData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Senior Software Engineer',
    summary: 'Experienced professional with a proven track record in delivering high-quality results. Skilled in modern web technologies and passionate about creating innovative solutions.',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California',
        year: 2020,
        gpa: '3.8'
      },
      {
        degree: 'Master of Science in Software Engineering',
        institution: 'Stanford University',
        year: 2022,
        gpa: '3.9'
      }
    ],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Company Inc.',
        startDate: 'Jan 2022',
        endDate: 'Present',
        current: true,
        description: 'Leading development of scalable web applications. Architecting microservices and implementing CI/CD pipelines. Mentoring junior developers and conducting code reviews.'
      },
      {
        title: 'Software Engineer',
        company: 'StartupCo',
        startDate: 'Jun 2020',
        endDate: 'Dec 2021',
        current: false,
        description: 'Developed and maintained full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality products.'
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'Expert' },
      { name: 'React', level: 'Expert' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Docker', level: 'Intermediate' }
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce application with modern technologies. Implemented payment processing, inventory management, and user authentication.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        url: 'https://example.com',
        github: 'https://github.com/example/project'
      },
      {
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates and team collaboration features.',
        technologies: ['React', 'Firebase', 'Material-UI'],
        url: 'https://example.com',
        github: 'https://github.com/example/tasks'
      }
    ]
  };

  const getTemplateComponent = (templateId) => {
    switch (templateId) {
      case 'korina-villanueva': return KorinaVillanuevaTemplate;
      case 'riaan-chandran': return RiaanChandranTemplate;
      case 'adora-montminy': return AdoraMontminyTemplate;
      case 'jamie-chastain': return JamieChastainTemplate;
      case 'donna-stroupe': return DonnaStroupeTemplate;
      case 'richard-sanchez-new': return RichardSanchezNewTemplate;
      case 'daniel-gallego': return DanielGallegoTemplate;
      case 'claudia-alves': return ClaudiaAlvesTemplate;
      case 'bartholomew-henderson': return BartholomewHendersonTemplate;
      case 'francisco-andrade': return FranciscoAndradeTemplate;
      case 'olivia-wilson': return OliviaWilsonTemplate;
      case 'estelle-darcy': return EstelleDarcyTemplate;
      case 'juliana-silva': return JulianaSilvaTemplate;
      case 'catrine-ziv': return CatrineZivTemplate;
      case 'olivia-wilson-dark-blue': return OliviaWilsonDarkBlueTemplate;
      case 'phylis-flex': return PhylisFlexTemplate;
      default: return KorinaVillanuevaTemplate;
    }
  };

  const handlePreviewTemplate = (templateId) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="min-h-screen w-full font-sans bg-black text-white relative overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      
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

      {/* Main Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 md:pt-28">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white flex items-center justify-center gap-3 flex-wrap">
              <span>AI Resume</span>
              <span className="inline-block">
                <RotatingText
                  texts={['Generator', 'Builder', 'Creator', 'Designer']}
                  mainClassName="px-4 sm:px-5 md:px-6 bg-blue-500 text-white overflow-hidden py-2 sm:py-2.5 md:py-3 justify-center rounded-lg inline-block"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </h1>
          </div>
          <div className="mb-6">
            <p className="text-xl sm:text-2xl text-white font-medium">
              Our Flagship Feature ✨
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Input Form */}
          <div className="lg:col-span-2">
            <Card className="bg-black/80 backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Describe Yourself
                </CardTitle>
                <CardDescription className="text-base text-white">
                  Share your experience, education, skills, and achievements in your own words
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-6">
                  {/* Template Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      Select Template *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`group rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-lg hover:shadow-xl ${
                            selectedTemplate === template.id
                              ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {/* Template Preview Image/Placeholder */}
                          <div className={`relative w-full h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                            {/* Small template glimpse using lines */}
                            <div className="w-16 h-20 bg-white/90 rounded-sm p-2 shadow-md">
                              <div className="space-y-1">
                                <div className="h-1 bg-gray-800 w-3/4"></div>
                                <div className="h-0.5 bg-gray-600 w-full"></div>
                                <div className="h-0.5 bg-gray-600 w-5/6"></div>
                                <div className="mt-2 h-0.5 bg-gray-500 w-full"></div>
                                <div className="h-0.5 bg-gray-500 w-4/5"></div>
                                <div className="h-0.5 bg-gray-500 w-full"></div>
                                <div className="mt-2 h-0.5 bg-gray-500 w-2/3"></div>
                                <div className="h-0.5 bg-gray-500 w-full"></div>
                              </div>
                            </div>
                            
                            {/* Selected Badge */}
                            {selectedTemplate === template.id && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          {/* Card Content */}
                          <div className="p-5">
                            <h3 className="text-base font-bold text-gray-900 mb-1 text-center">{template.name}</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center">{template.desc}</p>
                            
                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePreviewTemplate(template.id);
                                }}
                                className="px-3 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTemplate(template.id);
                                  setError(null);
                                }}
                                className={`px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center ${
                                  selectedTemplate === template.id
                                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {selectedTemplate === template.id ? '✓ Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Textarea
                      value={prompt}
                      onChange={(e) => {
                        setPrompt(e.target.value);
                        setError(null);
                      }}
                      placeholder="Example: I'm John Doe, a software engineer with 5 years of experience. I have a Bachelor's in Computer Science from MIT (2018). I worked as a Frontend Developer at Google from 2019 to 2021, where I built React applications. Currently, I'm a Full Stack Developer at Microsoft since 2021. I'm skilled in JavaScript, React, Node.js, MongoDB, and Python..."
                      className="min-h-[300px] text-base resize-none bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      disabled={loading}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-white">
                        {prompt.length} / 3000 characters {prompt.length < 50 && '(Minimum 50 recommended)'}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleGenerateAnother}
                          disabled={loading || !prompt}
                          className="text-xs"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-white">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Loading Animation */}
                  {loading && (
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-xl p-8 text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-8 h-8 text-indigo-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">AI is analyzing your information...</h3>
                      <p className="text-white">Creating a professional resume structure from your description</p>
                      <p className="text-sm text-white mt-2">This usually takes 3-5 seconds</p>
                    </div>
                  )}

                  {/* Success State */}
                  {generatedResume && !loading && (
                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-xl p-8 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-4 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Resume Generated Successfully! 🎉</h3>
                      <p className="text-white mb-6">
                        Your resume has been created and saved to your dashboard.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={handleViewResume}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          View in Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleGenerateAnother}
                          className="border-2 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                        >
                          Generate Another
                        </Button>
                      </div>
                    </div>
                  )}

                  {!loading && !generatedResume && (
                    <Button
                      type="submit"
                      disabled={!prompt.trim() || prompt.trim().length < 50}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Resume with AI
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: Tips & Examples */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card className="bg-black/80 backdrop-blur-sm border-2 border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-white">
                  {promptSuggestions.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white font-bold mt-0.5">{index + 1}.</span>
                      <span className="text-white">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Example Prompts Card */}
            <Card className="bg-black/80 backdrop-blur-sm border-2 border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Example Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleUseExample(example)}
                      disabled={loading}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-xs text-white hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="font-semibold text-white">Example {index + 1}:</span>
                      <p className="mt-1 line-clamp-3 text-white">{example.substring(0, 150)}...</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closePreview}
        >
          <div 
            className="relative bg-black border-2 border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-white/20 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Template Preview</h3>
                <p className="text-sm text-white/70">{templates.find(t => t.id === previewTemplate)?.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedTemplate(previewTemplate);
                    closePreview();
                    toast.success('Template selected!');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Use This Template
                </button>
                <button
                  onClick={closePreview}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 bg-white">
              <div className="transform scale-75 origin-top">
                {(() => {
                  const TemplateComponent = getTemplateComponent(previewTemplate);
                  return <TemplateComponent formData={previewData} />;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

