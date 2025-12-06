import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpotlightCard from '../components/SpotlightCard';
import LightRays from '../components/react-bits/LightRays';
import LandingHeader from '../components/landing/LandingHeader';
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

export default function PdfUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('korina-villanueva'); // Default template
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const API_ENDPOINT = 'http://localhost:5000/api/ocr/file';

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

  /**
   * Handle file selection with validation
   * Supports PDF and image files (jpg, jpeg, png, gif, bmp, tiff)
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Reset states
    setError(null);
    setResume(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Allowed file types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Allowed types: PDF, JPG, JPEG, PNG, GIF, BMP, TIFF');
      setFile(null);
      toast.error('❌ Invalid file type. Please select a PDF or image file.');
      return;
    }
    
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit');
      setFile(null);
      toast.error('❌ File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
    toast.success(`✅ File selected: ${selectedFile.name}`);
  };

  /**
   * Upload and process file (PDF or image)
   * Process: Upload → OCR text extraction → AI parse → Save to DB
   */
  const handleUpload = async () => {
    // Step 1: Validate file is selected
    if (!file) {
      setError('Please select a file');
      toast.error('❌ Please select a file');
      return;
    }

    // Step 2: Initialize upload state
    setUploading(true);
    setError(null);
    setResume(null);
    setProgress(0);

    console.log('🚀 Starting file upload...');
    console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
    console.log('Endpoint:', API_ENDPOINT);

    // Step 3: Simulate progress (visual feedback)
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      // Step 4: Create FormData
      const formData = new FormData();
      formData.append('file', file); // Changed from 'pdf' to 'file'
      formData.append('template', selectedTemplate);
      // Optional fields: userId, language, OCREngine can be added if needed
      
      console.log('📤 Sending POST request...');
      console.log('Template:', selectedTemplate);
      
      // Step 5: Upload to backend
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type header - browser sets it automatically with boundary
      });

      // Clear progress simulation
      clearInterval(progressInterval);
      setProgress(100);

      console.log('📥 Response received. Status:', response.status);

      // Step 6: Parse response
      const data = await response.json();
      console.log('📄 Response data:', data);

      // Step 7: Handle response
      if (data.success) {
        setResume(data.data.resume);
        setError(null);
        toast.success(`✅ Resume created for ${data.data.resume.name}!`);
        console.log('✅ Resume data:', data.data.resume);
      } else {
        // Handle different error types from API
        const errorMessage = data.message || data.error || 'Failed to process file';
        setError(errorMessage);
        toast.error(`❌ ${errorMessage}`);
        console.error('❌ Backend returned error:', errorMessage);
      }
    } catch (err) {
      clearInterval(progressInterval);
      console.error('❌ Upload error:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      
      // Handle network errors
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        const errorMsg = `Cannot connect to backend. Backend might be:
1) Not running at http://localhost:5000
2) Missing route: POST /api/ocr/file
3) CORS not configured for POST requests
4) Crashing when receiving the request

Check backend console for errors.`;
        
        setError(errorMsg);
        toast.error('❌ Cannot connect to backend. Check console for details.');
        console.error('🔴 NETWORK ERROR - Detailed info:');
        console.error('- Endpoint:', API_ENDPOINT);
        console.error('- This usually means:');
        console.error('  1. Backend not running');
        console.error('  2. Endpoint does not exist');
        console.error('  3. CORS blocking the request');
        console.error('  4. Backend crashed on request');
      } else {
        setError('Upload failed. Please try again.');
        toast.error('❌ Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  /**
   * Reset form to upload another PDF
   */
  const handleReset = () => {
    setFile(null);
    setResume(null);
    setError(null);
    setProgress(0);
    setSelectedTemplate('korina-villanueva'); // Reset to default
    // Reset file input
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
  };

  /**
   * View created resume in dashboard
   */
  const handleViewResume = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      {/* Content Layer */}
      <div className="relative z-10 pt-24 md:pt-32">

        {/* Main Content */}
        <div className="w-full px-4 lg:px-8 xl:px-12 py-8 lg:py-12">
          <div className="w-full max-w-[1600px] mx-auto">
            
            {/* Page Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                📄 Upload Resume File
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                Upload your resume (PDF or image) and let AI extract the information using OCR
              </p>
            </div>

            {/* Upload Card */}
            {!resume && (
              <SpotlightCard className="w-full max-w-4xl mx-auto" spotlightColor="rgba(0, 229, 255, 0.2)">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6 pb-6 border-b border-neutral-700">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2">
                      Upload Your Resume
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      Supported formats: PDF, JPG, JPEG, PNG, GIF, BMP, TIFF • Maximum size: 10MB • Processing time: 5-30 seconds
                    </p>
                  </div>
                
                {/* Template Selection */}
                <div className="mb-6">
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

                {/* File Input */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-white mb-3">
                    Select Resume File
                  </label>
                  <div className="relative">
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff,application/pdf,image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/tiff"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="block w-full text-sm text-gray-400
                        file:mr-4 file:py-3 file:px-6
                        file:rounded-lg file:border-0
                        file:text-sm file:font-bold
                        file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500
                        file:text-white
                        hover:file:from-cyan-600 hover:file:to-blue-600
                        file:cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* File Info */}
                {file && (
                  <div className="mb-6 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1">
                        <p className="font-bold text-white">{file.name}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Size: {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-bold text-white">Error</p>
                        <p className="text-sm text-red-300 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="w-full py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing... Please wait
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload & Process with AI
                    </>
                  )}
                </Button>

                {/* Progress Bar */}
                {uploading && progress > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">Processing...</span>
                      <span className="text-sm font-bold text-cyan-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      OCR Processing → AI Parsing → Saving to database
                    </p>
                  </div>
                )}

                {/* Instructions */}
                <div className="mt-8 p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <h3 className="font-bold text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    How it works
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">1.</span>
                      <span>Upload your resume file (PDF or image: JPG, PNG, GIF, BMP, TIFF)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">2.</span>
                      <span>OCR extracts text from your file, then AI analyzes and structures the content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">3.</span>
                      <span>Resume data is parsed and saved to your account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">4.</span>
                      <span>View, edit, and download your resume anytime</span>
                    </li>
                  </ol>
                </div>
              </div>
            </SpotlightCard>
          )}

          {/* Success Result */}
          {resume && (
            <SpotlightCard className="w-full max-w-4xl mx-auto" spotlightColor="rgba(34, 197, 94, 0.2)">
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-green-500/30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white">
                        ✅ Resume Created Successfully!
                      </h2>
                      <p className="text-sm md:text-base text-gray-400 mt-1">
                        Your resume has been processed and saved
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Resume Preview */}
                <div className="space-y-6">
                  
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Name</p>
                      <p className="text-base lg:text-lg font-bold text-white break-words">{resume.name}</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Email</p>
                      <p className="text-base lg:text-lg font-bold text-white break-all">{resume.email}</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Phone</p>
                      <p className="text-base lg:text-lg font-bold text-white">{resume.phone}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  {resume.summary && (
                    <div className="p-4 lg:p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <p className="text-xs font-bold text-blue-300 uppercase mb-2">Summary</p>
                      <p className="text-sm lg:text-base text-gray-300 leading-relaxed">{resume.summary}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <div className="text-center p-4 lg:p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                      <p className="text-3xl lg:text-4xl font-black text-cyan-400">{resume.education?.length || 0}</p>
                      <p className="text-xs lg:text-sm font-bold text-gray-300 mt-1">Education</p>
                    </div>
                    <div className="text-center p-4 lg:p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <p className="text-3xl lg:text-4xl font-black text-blue-400">{resume.experience?.length || 0}</p>
                      <p className="text-xs lg:text-sm font-bold text-gray-300 mt-1">Experience</p>
                    </div>
                    <div className="text-center p-4 lg:p-6 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <p className="text-3xl lg:text-4xl font-black text-purple-400">{resume.skills?.length || 0}</p>
                      <p className="text-xs lg:text-sm font-bold text-gray-300 mt-1">Skills</p>
                    </div>
                    <div className="text-center p-4 lg:p-6 bg-pink-500/10 rounded-lg border border-pink-500/30">
                      <p className="text-3xl lg:text-4xl font-black text-pink-400">{resume.projects?.length || 0}</p>
                      <p className="text-xs lg:text-sm font-bold text-gray-300 mt-1">Projects</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={handleViewResume}
                      className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View in Dashboard
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 py-6 text-lg font-bold border-2 border-neutral-700 text-white hover:bg-neutral-800"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Another Resume
                    </Button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          )}

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
    </div>
  );
}

