import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedButton from './react-bits/AnimatedButton';
import AnimatedText from './react-bits/AnimatedText';
import SpotlightCard from './SpotlightCard';
import AnimatedCard from './react-bits/AnimatedCard';
import LightRays from './react-bits/LightRays';
import LandingHeader from './landing/LandingHeader';
import KorinaVillanuevaTemplate from './templates/KorinaVillanuevaTemplate';
import RiaanChandranTemplate from './templates/RiaanChandranTemplate';
import AdoraMontminyTemplate from './templates/AdoraMontminyTemplate';
import JamieChastainTemplate from './templates/JamieChastainTemplate';
import DonnaStroupeTemplate from './templates/DonnaStroupeTemplate';
import RichardSanchezNewTemplate from './templates/RichardSanchezNewTemplate';
import DanielGallegoTemplate from './templates/DanielGallegoTemplate';
import ClaudiaAlvesTemplate from './templates/ClaudiaAlvesTemplate';
import BartholomewHendersonTemplate from './templates/BartholomewHendersonTemplate';
import FranciscoAndradeTemplate from './templates/FranciscoAndradeTemplate';
import OliviaWilsonTemplate from './templates/OliviaWilsonTemplate';
import EstelleDarcyTemplate from './templates/EstelleDarcyTemplate';
import JulianaSilvaTemplate from './templates/JulianaSilvaTemplate';
import CatrineZivTemplate from './templates/CatrineZivTemplate';
import OliviaWilsonDarkBlueTemplate from './templates/OliviaWilsonDarkBlueTemplate';
import PhylisFlexTemplate from './templates/PhylisFlexTemplate';
import { useResumes } from '../hooks/useResumes';
import { generatePDF } from '../utils/pdfGenerator';
import Stepper, { Step } from './react-bits/Stepper';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { createResume } = useResumes();
  const resumePreviewRef = useRef(null);
  const previewContainerRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(1); // 1 = template selection (Stepper uses 1-based indexing)
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  
  // Form data matching backend schema exactly - all fields optional except name, email, phone, summary
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    location: '',
    role: '',
    education: [{
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    }],
    experience: [{
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    skills: [{
      name: '',
      level: 'Intermediate'
    }],
    projects: [{
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: ''
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    }],
    trainings: [{
      name: '',
      institution: '',
      date: '',
      duration: '',
      description: ''
    }],
    awards: [{
      name: '',
      organization: '',
      year: '',
      description: ''
    }],
    languages: [{
      name: '',
      proficiency: 'Intermediate'
    }],
    publications: [{
      title: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
      url: '',
      type: 'Journal Article'
    }],
    patents: [{
      title: '',
      patentNumber: '',
      issuedDate: '',
      inventors: '',
      description: '',
      url: ''
    }],
    volunteerWork: [{
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      hoursPerWeek: ''
    }],
    professionalMemberships: [{
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    conferences: [{
      name: '',
      location: '',
      date: '',
      type: 'Attended',
      description: ''
    }],
    speakingEngagements: [{
      title: '',
      event: '',
      location: '',
      date: '',
      description: '',
      url: ''
    }],
    teachingExperience: [{
      course: '',
      institution: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      level: 'Undergraduate'
    }],
    mentoring: [{
      menteeName: '',
      organization: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      focus: ''
    }],
    leadershipRoles: [{
      title: '',
      organization: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    internships: [{
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    licenses: [{
      name: '',
      issuingOrganization: '',
      licenseNumber: '',
      issueDate: '',
      expiryDate: '',
      state: ''
    }],
    references: [{
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    }],
    socialMedia: {
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: '',
      website: '',
      blog: '',
      behance: '',
      dribbble: '',
      medium: '',
      stackoverflow: ''
    },
    hobbies: [],
    interests: [],
    openSourceContributions: [{
      project: '',
      url: '',
      description: '',
      contributions: ''
    }],
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  // Calculate dynamic scale for preview
  useEffect(() => {
    if (!selectedTemplate || !previewContainerRef.current) return;

    const calculateScale = () => {
      const container = previewContainerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // A4 dimensions in pixels (at 96 DPI)
      const templateWidth = 21 * 37.8; // 21cm to px
      const templateHeight = 29.7 * 37.8; // 29.7cm to px
      
      const scaleX = (containerWidth - 16) / templateWidth; // 16px for padding
      const scaleY = (containerHeight - 16) / templateHeight;
      
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
      setPreviewScale(scale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [selectedTemplate, currentStep]);

  const steps = [
    { id: 0, title: 'Select Template', description: 'Choose your resume design', icon: '🎨' },
    { id: 1, title: 'Personal Info', description: 'Basic information & summary', icon: '👤' },
    { id: 2, title: 'Education', description: 'Academic background', icon: '🎓' },
    { id: 3, title: 'Experience', description: 'Work history', icon: '💼' },
    { id: 4, title: 'Skills', description: 'Your expertise', icon: '⚡' },
    { id: 5, title: 'Projects', description: 'Portfolio projects', icon: '🚀' },
    { id: 6, title: 'Additional Info', description: 'Certifications, awards & more', icon: '📋' }
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Template selection - required
        if (!selectedTemplate) {
          newErrors.template = 'Please select a template';
        }
        break;
      case 2: // Personal Info - name, email, phone, summary required; location, role optional
        if (!formData.name?.trim()) newErrors.name = 'Full name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
        if (!formData.summary?.trim()) newErrors.summary = 'Professional summary is required';
        // location and role are optional - no validation needed
        break;
      case 3: // Education - optional, but if started, complete it
        // Only validate if user has started filling education
        const hasAnyEducation = formData.education?.some(edu => 
          (edu.degree && edu.degree.trim()) || 
          (edu.institution && edu.institution.trim()) || 
          (edu.year && edu.year.toString().trim())
        );
        if (hasAnyEducation && formData.education) {
          formData.education.forEach((edu, index) => {
            const hasStarted = (edu.degree && edu.degree.trim()) || 
                              (edu.institution && edu.institution.trim()) || 
                              (edu.year && edu.year.toString().trim());
            if (hasStarted) {
              if (!edu.degree?.trim()) newErrors[`education_${index}_degree`] = 'Degree is required';
              if (!edu.institution?.trim()) newErrors[`education_${index}_institution`] = 'Institution is required';
              if (!edu.year?.toString().trim()) newErrors[`education_${index}_year`] = 'Year is required';
            }
          });
        }
        // Always allow navigation for education (it's optional)
        break;
      case 4: // Experience - optional, but if started, complete it
        const hasAnyExperience = formData.experience?.some(exp => 
          (exp.title && exp.title.trim()) || 
          (exp.company && exp.company.trim()) || 
          exp.startDate || 
          (exp.description && exp.description.trim())
        );
        if (hasAnyExperience && formData.experience) {
          formData.experience.forEach((exp, index) => {
            const hasStarted = (exp.title && exp.title.trim()) || 
                              (exp.company && exp.company.trim()) || 
                              exp.startDate || 
                              (exp.description && exp.description.trim());
            if (hasStarted) {
              if (!exp.title?.trim()) newErrors[`experience_${index}_title`] = 'Job title is required';
              if (!exp.company?.trim()) newErrors[`experience_${index}_company`] = 'Company is required';
              if (!exp.startDate) newErrors[`experience_${index}_startDate`] = 'Start date is required';
              if (!exp.description?.trim()) newErrors[`experience_${index}_description`] = 'Description is required';
              if (!exp.current && !exp.endDate) newErrors[`experience_${index}_endDate`] = 'End date is required';
            }
          });
        }
        // Always allow navigation for experience (it's optional)
        break;
      case 5: // Skills - optional, but if name is filled, it's required
        if (formData.skills) {
          formData.skills.forEach((skill, index) => {
            if (skill.level && !skill.name?.trim()) {
              newErrors[`skill_${index}_name`] = 'Skill name is required';
            }
          });
        }
        // Always allow navigation for skills (it's optional)
        break;
      case 6: // Projects - optional, but if started, complete it
        if (formData.projects) {
          formData.projects.forEach((project, index) => {
            const hasStarted = (project.name && project.name.trim()) || 
                              (project.description && project.description.trim()) || 
                              (project.technologies && project.technologies.length > 0);
            if (hasStarted) {
              if (!project.name?.trim()) newErrors[`project_${index}_name`] = 'Project name is required';
              if (!project.description?.trim()) newErrors[`project_${index}_description`] = 'Description is required';
            }
          });
        }
        // Always allow navigation for projects (it's optional)
        break;
      case 7: // Additional Info - all optional, no validation needed
        // All fields in this step are optional - users can skip entirely
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (step) => {
    // Only validate required steps (1 and 2) when moving forward
    if (step > currentStep) {
      if (currentStep === 1 || currentStep === 2) {
        const isValid = validateStep(currentStep);
        if (!isValid) {
          toast.error('Please complete all required fields');
          return; // Don't allow forward navigation if validation fails
        }
      }
      // For steps 3-7, allow navigation without validation (they're optional)
    }
    // Always allow going back or staying on current step
    setCurrentStep(step);
  };

  const handleFinalStepCompleted = () => {
    // This is called when the stepper completes (step > totalSteps)
    // We'll trigger CV generation here
    handleGenerateCV();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
    
    const errorKey = `${arrayName}_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleGenerateCV = async () => {
    // Validate required steps only (1 and 2)
    if (!validateStep(1) || !validateStep(2)) {
      toast.error('Please complete all required fields');
      if (!validateStep(1)) setCurrentStep(1);
      else if (!validateStep(2)) setCurrentStep(2);
      return;
    }

    setIsGenerating(true);

    try {
      // Prepare data for backend (filter out empty items - all fields optional except name, email, phone, summary)
      const resumeData = {
        template: selectedTemplate,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        summary: formData.summary.trim(),
        ...(formData.location?.trim() && { location: formData.location.trim() }),
        ...(formData.role?.trim() && { role: formData.role.trim() }),
        education: formData.education.filter(edu => edu.degree && edu.institution && edu.year)
          .map(edu => ({
            degree: edu.degree,
            institution: edu.institution,
            year: parseInt(edu.year),
            ...(edu.gpa && { gpa: edu.gpa })
          })),
        experience: formData.experience.filter(exp => exp.title && exp.company && exp.startDate && exp.description)
          .map(exp => ({
            title: exp.title,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.current ? null : exp.endDate,
            current: exp.current,
            description: exp.description
          })),
        skills: formData.skills.filter(skill => skill.name)
          .map(skill => ({
            name: skill.name,
            level: skill.level
          })),
        projects: formData.projects.filter(proj => proj.name && proj.description)
          .map(proj => ({
            name: proj.name,
            description: proj.description,
            technologies: Array.isArray(proj.technologies) ? proj.technologies : 
                         (typeof proj.technologies === 'string' ? proj.technologies.split(',').map(t => t.trim()) : []),
            ...(proj.url && { url: proj.url }),
            ...(proj.github && { github: proj.github })
          })),
        certifications: formData.certifications.filter(cert => cert.name)
          .map(cert => ({
            name: cert.name,
            ...(cert.issuer && { issuer: cert.issuer }),
            ...(cert.date && { date: cert.date }),
            ...(cert.expiryDate && { expiryDate: cert.expiryDate }),
            ...(cert.credentialId && { credentialId: cert.credentialId }),
            ...(cert.url && { url: cert.url })
          })),
        trainings: formData.trainings.filter(training => training.name)
          .map(training => ({
            name: training.name,
            ...(training.institution && { institution: training.institution }),
            ...(training.date && { date: training.date }),
            ...(training.duration && { duration: training.duration }),
            ...(training.description && { description: training.description })
          })),
        awards: formData.awards.filter(award => award.name)
          .map(award => ({
            name: award.name,
            ...(award.organization && { organization: award.organization }),
            ...(award.year && { year: award.year }),
            ...(award.description && { description: award.description })
          })),
        languages: formData.languages.filter(lang => lang.name)
          .map(lang => ({
            name: lang.name,
            ...(lang.proficiency && { proficiency: lang.proficiency })
          })),
        publications: formData.publications.filter(pub => pub.title)
          .map(pub => ({
            title: pub.title,
            ...(pub.authors && { authors: pub.authors }),
            ...(pub.journal && { journal: pub.journal }),
            ...(pub.year && { year: pub.year }),
            ...(pub.doi && { doi: pub.doi }),
            ...(pub.url && { url: pub.url }),
            ...(pub.type && { type: pub.type })
          })),
        patents: formData.patents.filter(patent => patent.title)
          .map(patent => ({
            title: patent.title,
            ...(patent.patentNumber && { patentNumber: patent.patentNumber }),
            ...(patent.issuedDate && { issuedDate: patent.issuedDate }),
            ...(patent.inventors && { inventors: patent.inventors }),
            ...(patent.description && { description: patent.description }),
            ...(patent.url && { url: patent.url })
          })),
        volunteerWork: formData.volunteerWork.filter(vol => vol.organization)
          .map(vol => ({
            organization: vol.organization,
            ...(vol.role && { role: vol.role }),
            ...(vol.startDate && { startDate: vol.startDate }),
            ...(vol.endDate && { endDate: vol.endDate }),
            current: vol.current || false,
            ...(vol.description && { description: vol.description }),
            ...(vol.hoursPerWeek && { hoursPerWeek: vol.hoursPerWeek })
          })),
        professionalMemberships: formData.professionalMemberships.filter(mem => mem.organization)
          .map(mem => ({
            organization: mem.organization,
            ...(mem.role && { role: mem.role }),
            ...(mem.startDate && { startDate: mem.startDate }),
            ...(mem.endDate && { endDate: mem.endDate }),
            current: mem.current || false,
            ...(mem.description && { description: mem.description })
          })),
        conferences: formData.conferences.filter(conf => conf.name)
          .map(conf => ({
            name: conf.name,
            ...(conf.location && { location: conf.location }),
            ...(conf.date && { date: conf.date }),
            ...(conf.type && { type: conf.type }),
            ...(conf.description && { description: conf.description })
          })),
        speakingEngagements: formData.speakingEngagements.filter(speak => speak.title)
          .map(speak => ({
            title: speak.title,
            ...(speak.event && { event: speak.event }),
            ...(speak.location && { location: speak.location }),
            ...(speak.date && { date: speak.date }),
            ...(speak.description && { description: speak.description }),
            ...(speak.url && { url: speak.url })
          })),
        teachingExperience: formData.teachingExperience.filter(teach => teach.course)
          .map(teach => ({
            course: teach.course,
            ...(teach.institution && { institution: teach.institution }),
            ...(teach.startDate && { startDate: teach.startDate }),
            ...(teach.endDate && { endDate: teach.endDate }),
            current: teach.current || false,
            ...(teach.description && { description: teach.description }),
            ...(teach.level && { level: teach.level })
          })),
        mentoring: formData.mentoring.filter(ment => ment.organization)
          .map(ment => ({
            organization: ment.organization,
            ...(ment.menteeName && { menteeName: ment.menteeName }),
            ...(ment.startDate && { startDate: ment.startDate }),
            ...(ment.endDate && { endDate: ment.endDate }),
            current: ment.current || false,
            ...(ment.description && { description: ment.description }),
            ...(ment.focus && { focus: ment.focus })
          })),
        leadershipRoles: formData.leadershipRoles.filter(lead => lead.title)
          .map(lead => ({
            title: lead.title,
            ...(lead.organization && { organization: lead.organization }),
            ...(lead.startDate && { startDate: lead.startDate }),
            ...(lead.endDate && { endDate: lead.endDate }),
            current: lead.current || false,
            ...(lead.description && { description: lead.description })
          })),
        internships: formData.internships.filter(intern => intern.title && intern.company)
          .map(intern => ({
            title: intern.title,
            company: intern.company,
            ...(intern.startDate && { startDate: intern.startDate }),
            ...(intern.endDate && { endDate: intern.endDate }),
            ...(intern.description && { description: intern.description })
          })),
        licenses: formData.licenses.filter(lic => lic.name)
          .map(lic => ({
            name: lic.name,
            ...(lic.issuingOrganization && { issuingOrganization: lic.issuingOrganization }),
            ...(lic.licenseNumber && { licenseNumber: lic.licenseNumber }),
            ...(lic.issueDate && { issueDate: lic.issueDate }),
            ...(lic.expiryDate && { expiryDate: lic.expiryDate }),
            ...(lic.state && { state: lic.state })
          })),
        references: formData.references.filter(ref => ref.name)
          .map(ref => ({
            name: ref.name,
            ...(ref.title && { title: ref.title }),
            ...(ref.company && { company: ref.company }),
            ...(ref.email && { email: ref.email }),
            ...(ref.phone && { phone: ref.phone }),
            ...(ref.relationship && { relationship: ref.relationship })
          })),
        socialMedia: Object.keys(formData.socialMedia).some(key => formData.socialMedia[key]?.trim())
          ? Object.fromEntries(
              Object.entries(formData.socialMedia)
                .filter(([_, value]) => value?.trim())
                .map(([key, value]) => [key, value.trim()])
            )
          : {},
        hobbies: formData.hobbies.filter(h => h?.trim()),
        interests: formData.interests.filter(i => i?.trim()),
        openSourceContributions: formData.openSourceContributions.filter(os => os.project)
          .map(os => ({
            project: os.project,
            ...(os.url && { url: os.url }),
            ...(os.description && { description: os.description }),
            ...(os.contributions && { contributions: os.contributions })
          })),
        ...(formData.additionalInfo?.trim() && { additionalInfo: formData.additionalInfo.trim() })
      };

      // Save to backend
      toast.info('Saving resume to database...', { autoClose: 2000 });
      const savedResume = await createResume(resumeData);
      
      toast.success('Resume saved successfully!', { autoClose: 2000 });

      // Wait a moment for the toast to show
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate PDF
      if (resumePreviewRef.current) {
        toast.info('Generating PDF...', { autoClose: 2000 });
        const filename = `${formData.name.replace(/\s+/g, '_')}_Resume.pdf`;
        await generatePDF(resumePreviewRef.current, filename);
        toast.success('PDF downloaded successfully!', { autoClose: 2000 });
      }

      // Navigate to dashboard after a moment
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error generating CV:', error);
      toast.error(`Failed to generate CV: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    // Pass formData directly to templates (matching backend schema) - all fields optional
    const templateData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      summary: formData.summary,
      location: formData.location,
      role: formData.role,
      education: formData.education.filter(edu => edu.degree),
      experience: formData.experience.filter(exp => exp.title),
      skills: formData.skills.filter(skill => skill.name),
      projects: formData.projects.filter(proj => proj.name).map(proj => ({
        ...proj,
        technologies: Array.isArray(proj.technologies) 
          ? proj.technologies 
          : (typeof proj.technologies === 'string' 
            ? proj.technologies.split(',').map(t => t.trim()).filter(t => t)
            : [])
      })),
      certifications: formData.certifications.filter(cert => cert.name),
      trainings: formData.trainings.filter(training => training.name),
      awards: formData.awards.filter(award => award.name),
      languages: formData.languages.filter(lang => lang.name),
      publications: formData.publications.filter(pub => pub.title),
      patents: formData.patents.filter(patent => patent.title),
      volunteerWork: formData.volunteerWork.filter(vol => vol.organization),
      professionalMemberships: formData.professionalMemberships.filter(mem => mem.organization),
      conferences: formData.conferences.filter(conf => conf.name),
      speakingEngagements: formData.speakingEngagements.filter(speak => speak.title),
      teachingExperience: formData.teachingExperience.filter(teach => teach.course),
      mentoring: formData.mentoring.filter(ment => ment.organization),
      leadershipRoles: formData.leadershipRoles.filter(lead => lead.title),
      internships: formData.internships.filter(intern => intern.title && intern.company),
      licenses: formData.licenses.filter(lic => lic.name),
      references: formData.references.filter(ref => ref.name),
      socialMedia: formData.socialMedia,
      hobbies: formData.hobbies.filter(h => h?.trim()),
      interests: formData.interests.filter(i => i?.trim()),
      openSourceContributions: formData.openSourceContributions.filter(os => os.project),
      additionalInfo: formData.additionalInfo
    };

    switch (selectedTemplate) {
      case 'korina-villanueva':
        return <KorinaVillanuevaTemplate formData={templateData} />;
      case 'riaan-chandran':
        return <RiaanChandranTemplate formData={templateData} />;
      case 'adora-montminy':
        return <AdoraMontminyTemplate formData={templateData} />;
      case 'jamie-chastain':
        return <JamieChastainTemplate formData={templateData} />;
      case 'donna-stroupe':
        return <DonnaStroupeTemplate formData={templateData} />;
      case 'richard-sanchez-new':
        return <RichardSanchezNewTemplate formData={templateData} />;
      case 'daniel-gallego':
        return <DanielGallegoTemplate formData={templateData} />;
      case 'claudia-alves':
        return <ClaudiaAlvesTemplate formData={templateData} />;
      case 'bartholomew-henderson':
        return <BartholomewHendersonTemplate formData={templateData} />;
      case 'francisco-andrade':
        return <FranciscoAndradeTemplate formData={templateData} />;
      case 'olivia-wilson':
        return <OliviaWilsonTemplate formData={templateData} />;
      case 'estelle-darcy':
        return <EstelleDarcyTemplate formData={templateData} />;
      case 'juliana-silva':
        return <JulianaSilvaTemplate formData={templateData} />;
      case 'catrine-ziv':
        return <CatrineZivTemplate formData={templateData} />;
      case 'olivia-wilson-dark-blue':
        return <OliviaWilsonDarkBlueTemplate formData={templateData} />;
      case 'phylis-flex':
        return <PhylisFlexTemplate formData={templateData} />;
      default:
        return <KorinaVillanuevaTemplate formData={templateData} />;
    }
  };

  const renderStepContent = (stepNumber = currentStep) => {
    switch (stepNumber) {
      case 1: // Template selection
        return (
          <div className="space-y-6">
            <AnimatedText tag="h3" className="text-2xl font-black text-white mb-6 text-center">
              Choose Your Resume Template
            </AnimatedText>
            {errors.template && <p className="text-red-400 text-center">{errors.template}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
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
                ].map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.template;
                      return newErrors;
                    });
                  }}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'border-white bg-white/10 shadow-lg scale-105'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-full h-48 bg-gradient-to-r ${template.color} rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                    Preview
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{template.name}</h4>
                  <p className="text-sm text-white/70">{template.desc}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-3 flex items-center text-white font-medium">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Personal Info
        return (
          <div className="space-y-6">
            <AnimatedText tag="h3" className="text-2xl font-black text-white mb-4">
              Personal Information
            </AnimatedText>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors.name ? 'border-red-400' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors.email ? 'border-red-400' : ''}`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors.phone ? 'border-red-400' : ''}`}
                  placeholder="+1-234-567-8900"
                />
                {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-white">Professional Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className={`min-h-32 bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors.summary ? 'border-red-400' : ''}`}
                placeholder="Experienced professional with expertise in..."
              />
              {errors.summary && <p className="text-sm text-red-400">{errors.summary}</p>}
              <p className="text-sm text-white/60">Write a brief summary of your professional background and goals (2-3 sentences)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">Location (Optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Current Role (Optional)</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                  placeholder="Software Engineer"
                />
              </div>
            </div>
          </div>
        );

      case 3: // Education
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <AnimatedText tag="h3" className="text-2xl font-black text-white">
                Education
              </AnimatedText>
              <AnimatedButton
                type="button"
                onClick={() => addItem('education', { degree: '', institution: '', year: '', gpa: '' })}
                variant="secondary"
                size="sm"
              >
                + Add Education
              </AnimatedButton>
            </div>

            {formData.education.map((edu, index) => (
              <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">Education {index + 1}</h4>
                    {formData.education.length > 1 && (
                      <AnimatedButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem('education', index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </AnimatedButton>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`education_${index}_degree`] ? 'border-red-400' : ''}`}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                      {errors[`education_${index}_degree`] && <p className="text-sm text-red-400">{errors[`education_${index}_degree`]}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`education_${index}_institution`] ? 'border-red-400' : ''}`}
                        placeholder="University Name"
                      />
                      {errors[`education_${index}_institution`] && <p className="text-sm text-red-400">{errors[`education_${index}_institution`]}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Graduation Year</Label>
                        <Input
                          type="number"
                          value={edu.year}
                          onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                          className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`education_${index}_year`] ? 'border-red-400' : ''}`}
                          placeholder="2024"
                          min="1950"
                          max="2030"
                        />
                        {errors[`education_${index}_year`] && <p className="text-sm text-red-400">{errors[`education_${index}_year`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">GPA (Optional)</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                          className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        );

      case 4: // Experience
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <AnimatedText tag="h3" className="text-2xl font-black text-white">
                Work Experience
              </AnimatedText>
              <AnimatedButton
                type="button"
                onClick={() => addItem('experience', { title: '', company: '', startDate: '', endDate: '', current: false, description: '' })}
                variant="secondary"
                size="sm"
              >
                + Add Experience
              </AnimatedButton>
            </div>

            {formData.experience.map((exp, index) => (
              <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">Experience {index + 1}</h4>
                    {formData.experience.length > 1 && (
                      <AnimatedButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem('experience', index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </AnimatedButton>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Job Title</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                          className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`experience_${index}_title`] ? 'border-red-400' : ''}`}
                          placeholder="Software Engineer"
                        />
                        {errors[`experience_${index}_title`] && <p className="text-sm text-red-400">{errors[`experience_${index}_title`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                          className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`experience_${index}_company`] ? 'border-red-400' : ''}`}
                          placeholder="Tech Corp Inc."
                        />
                        {errors[`experience_${index}_company`] && <p className="text-sm text-red-400">{errors[`experience_${index}_company`]}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Start Date</Label>
                        <Input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                          className={`bg-black/50 border-white/20 text-white focus:border-white/40 ${errors[`experience_${index}_startDate`] ? 'border-red-400' : ''}`}
                        />
                        {errors[`experience_${index}_startDate`] && <p className="text-sm text-red-400">{errors[`experience_${index}_startDate`]}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">End Date</Label>
                        <Input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className={`bg-black/50 border-white/20 text-white focus:border-white/40 disabled:opacity-50 ${errors[`experience_${index}_endDate`] ? 'border-red-400' : ''}`}
                        />
                        {errors[`experience_${index}_endDate`] && <p className="text-sm text-red-400">{errors[`experience_${index}_endDate`]}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current_${index}`}
                        checked={exp.current}
                        onChange={(e) => handleArrayChange('experience', index, 'current', e.target.checked)}
                        className="border-white/20"
                      />
                      <Label htmlFor={`current_${index}`} className="cursor-pointer text-white">I currently work here</Label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Job Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                        className={`min-h-32 bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`experience_${index}_description`] ? 'border-red-400' : ''}`}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                      {errors[`experience_${index}_description`] && <p className="text-sm text-red-400">{errors[`experience_${index}_description`]}</p>}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        );

      case 5: // Skills
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <AnimatedText tag="h3" className="text-2xl font-black text-white">
                Skills
              </AnimatedText>
              <AnimatedButton
                type="button"
                onClick={() => addItem('skills', { name: '', level: 'Intermediate' })}
                variant="secondary"
                size="sm"
              >
                + Add Skill
              </AnimatedButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.skills.map((skill, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Skill Name</Label>
                          <Input
                            value={skill.name}
                            onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                            className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`skill_${index}_name`] ? 'border-red-400' : ''}`}
                            placeholder="JavaScript, React, etc."
                          />
                          {errors[`skill_${index}_name`] && <p className="text-sm text-red-400">{errors[`skill_${index}_name`]}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">Proficiency Level</Label>
                          <select
                            value={skill.level}
                            onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)}
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                            style={{ color: 'white' }}
                          >
                            {skillLevels.map(level => (
                              <option key={level} value={level} style={{ backgroundColor: '#000000', color: 'white' }}>{level}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {formData.skills.length > 1 && (
                        <AnimatedButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem('skills', index)}
                          className="ml-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          ✕
                        </AnimatedButton>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        );

      case 6: // Projects
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <AnimatedText tag="h3" className="text-2xl font-black text-white">
                Projects
              </AnimatedText>
              <AnimatedButton
                type="button"
                onClick={() => addItem('projects', { name: '', description: '', technologies: [], url: '', github: '' })}
                variant="secondary"
                size="sm"
              >
                + Add Project
              </AnimatedButton>
            </div>

            {formData.projects.map((project, index) => (
              <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">Project {index + 1}</h4>
                    {formData.projects.length > 1 && (
                      <AnimatedButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem('projects', index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </AnimatedButton>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                        className={`bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`project_${index}_name`] ? 'border-red-400' : ''}`}
                        placeholder="E-Commerce Platform"
                      />
                      {errors[`project_${index}_name`] && <p className="text-sm text-red-400">{errors[`project_${index}_name`]}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                        className={`min-h-24 bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 ${errors[`project_${index}_description`] ? 'border-red-400' : ''}`}
                        placeholder="Describe what you built and the impact..."
                      />
                      {errors[`project_${index}_description`] && <p className="text-sm text-red-400">{errors[`project_${index}_description`]}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Technologies</Label>
                      <Input
                        value={Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                        onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                        placeholder="React, Node.js, MongoDB (comma separated)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Project URL (Optional)</Label>
                        <Input
                          type="url"
                          value={project.url}
                          onChange={(e) => handleArrayChange('projects', index, 'url', e.target.value)}
                          className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                          placeholder="https://project-demo.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">GitHub (Optional)</Label>
                        <Input
                          type="url"
                          value={project.github}
                          onChange={(e) => handleArrayChange('projects', index, 'github', e.target.value)}
                          className="bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        );

      case 7: // Additional Info - ALL optional fields from schema
        return (
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            <AnimatedText tag="h3" className="text-2xl font-black text-white mb-4">
              Additional Information (All Optional)
            </AnimatedText>
            <p className="text-sm text-white/60 mb-6">Add any additional information to enhance your resume. All fields are optional.</p>

            {/* Certifications */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Certifications</Label>
                <AnimatedButton type="button" onClick={() => addItem('certifications', { name: '', issuer: '', date: '', expiryDate: '', credentialId: '', url: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.certifications.map((cert, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Certification {index + 1}</h4>
                    {formData.certifications.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('certifications', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input value={cert.name} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Name *" />
                    <Input value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Issuer" />
                    <Input value={cert.date} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Date" />
                    <Input value={cert.expiryDate} onChange={(e) => handleArrayChange('certifications', index, 'expiryDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Expiry Date" />
                    <Input value={cert.credentialId} onChange={(e) => handleArrayChange('certifications', index, 'credentialId', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Credential ID" />
                    <Input value={cert.url} onChange={(e) => handleArrayChange('certifications', index, 'url', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="URL" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Trainings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Trainings</Label>
                <AnimatedButton type="button" onClick={() => addItem('trainings', { name: '', institution: '', date: '', duration: '', description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.trainings.map((training, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Training {index + 1}</h4>
                    {formData.trainings.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('trainings', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={training.name} onChange={(e) => handleArrayChange('trainings', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Training Name *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={training.institution} onChange={(e) => handleArrayChange('trainings', index, 'institution', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Institution" />
                      <Input value={training.date} onChange={(e) => handleArrayChange('trainings', index, 'date', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Date" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={training.duration} onChange={(e) => handleArrayChange('trainings', index, 'duration', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Duration" />
                    </div>
                    <Textarea value={training.description} onChange={(e) => handleArrayChange('trainings', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Awards */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Awards</Label>
                <AnimatedButton type="button" onClick={() => addItem('awards', { name: '', organization: '', year: '', description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.awards.map((award, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Award {index + 1}</h4>
                    {formData.awards.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('awards', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={award.name} onChange={(e) => handleArrayChange('awards', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Award Name *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={award.organization} onChange={(e) => handleArrayChange('awards', index, 'organization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Organization" />
                      <Input value={award.year} onChange={(e) => handleArrayChange('awards', index, 'year', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Year" />
                    </div>
                    <Textarea value={award.description} onChange={(e) => handleArrayChange('awards', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Languages</Label>
                <AnimatedButton type="button" onClick={() => addItem('languages', { name: '', proficiency: 'Intermediate' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.languages.map((lang, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Input value={lang.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Language *" />
                      <select value={lang.proficiency} onChange={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)} className="px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white">
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native">Native</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>
                    {formData.languages.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('languages', index)} className="ml-2 text-red-400">✕</AnimatedButton>}
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Publications */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Publications</Label>
                <AnimatedButton type="button" onClick={() => addItem('publications', { title: '', authors: '', journal: '', year: '', doi: '', url: '', type: 'Journal Article' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.publications.map((pub, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Publication {index + 1}</h4>
                    {formData.publications.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('publications', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={pub.title} onChange={(e) => handleArrayChange('publications', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={pub.authors} onChange={(e) => handleArrayChange('publications', index, 'authors', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Authors" />
                      <Input value={pub.journal} onChange={(e) => handleArrayChange('publications', index, 'journal', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Journal" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={pub.year} onChange={(e) => handleArrayChange('publications', index, 'year', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Year" />
                      <select value={pub.type} onChange={(e) => handleArrayChange('publications', index, 'type', e.target.value)} className="px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white">
                        <option value="Journal Article">Journal Article</option>
                        <option value="Conference Paper">Conference Paper</option>
                        <option value="Book Chapter">Book Chapter</option>
                        <option value="Book">Book</option>
                        <option value="Blog Post">Blog Post</option>
                        <option value="Article">Article</option>
                        <option value="Research Paper">Research Paper</option>
                        <option value="Thesis">Thesis</option>
                        <option value="Dissertation">Dissertation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={pub.doi} onChange={(e) => handleArrayChange('publications', index, 'doi', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="DOI" />
                      <Input value={pub.url} onChange={(e) => handleArrayChange('publications', index, 'url', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="URL" />
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Patents */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Patents</Label>
                <AnimatedButton type="button" onClick={() => addItem('patents', { title: '', patentNumber: '', issuedDate: '', inventors: '', description: '', url: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.patents.map((patent, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Patent {index + 1}</h4>
                    {formData.patents.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('patents', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={patent.title} onChange={(e) => handleArrayChange('patents', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={patent.patentNumber} onChange={(e) => handleArrayChange('patents', index, 'patentNumber', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Patent Number" />
                      <Input value={patent.issuedDate} onChange={(e) => handleArrayChange('patents', index, 'issuedDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Issued Date" />
                    </div>
                    <Input value={patent.inventors} onChange={(e) => handleArrayChange('patents', index, 'inventors', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Inventors" />
                    <Textarea value={patent.description} onChange={(e) => handleArrayChange('patents', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                    <Input value={patent.url} onChange={(e) => handleArrayChange('patents', index, 'url', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="URL" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Volunteer Work */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Volunteer Work</Label>
                <AnimatedButton type="button" onClick={() => addItem('volunteerWork', { organization: '', role: '', startDate: '', endDate: '', current: false, description: '', hoursPerWeek: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.volunteerWork.map((vol, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Volunteer {index + 1}</h4>
                    {formData.volunteerWork.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('volunteerWork', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={vol.organization} onChange={(e) => handleArrayChange('volunteerWork', index, 'organization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Organization *" />
                    <Input value={vol.role} onChange={(e) => handleArrayChange('volunteerWork', index, 'role', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Role" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={vol.startDate} onChange={(e) => handleArrayChange('volunteerWork', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={vol.endDate} onChange={(e) => handleArrayChange('volunteerWork', index, 'endDate', e.target.value)} disabled={vol.current} className="bg-black/50 border-white/20 text-white disabled:opacity-50" placeholder="End Date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={vol.current} onChange={(e) => handleArrayChange('volunteerWork', index, 'current', e.target.checked)} className="border-white/20" />
                      <Label className="text-white cursor-pointer">Currently volunteering</Label>
                    </div>
                    <Input value={vol.hoursPerWeek} onChange={(e) => handleArrayChange('volunteerWork', index, 'hoursPerWeek', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Hours per Week" />
                    <Textarea value={vol.description} onChange={(e) => handleArrayChange('volunteerWork', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Professional Memberships */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Professional Memberships</Label>
                <AnimatedButton type="button" onClick={() => addItem('professionalMemberships', { organization: '', role: '', startDate: '', endDate: '', current: false, description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.professionalMemberships.map((mem, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Membership {index + 1}</h4>
                    {formData.professionalMemberships.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('professionalMemberships', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={mem.organization} onChange={(e) => handleArrayChange('professionalMemberships', index, 'organization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Organization *" />
                    <Input value={mem.role} onChange={(e) => handleArrayChange('professionalMemberships', index, 'role', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Role" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={mem.startDate} onChange={(e) => handleArrayChange('professionalMemberships', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={mem.endDate} onChange={(e) => handleArrayChange('professionalMemberships', index, 'endDate', e.target.value)} disabled={mem.current} className="bg-black/50 border-white/20 text-white disabled:opacity-50" placeholder="End Date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={mem.current} onChange={(e) => handleArrayChange('professionalMemberships', index, 'current', e.target.checked)} className="border-white/20" />
                      <Label className="text-white cursor-pointer">Current membership</Label>
                    </div>
                    <Textarea value={mem.description} onChange={(e) => handleArrayChange('professionalMemberships', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Conferences */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Conferences</Label>
                <AnimatedButton type="button" onClick={() => addItem('conferences', { name: '', location: '', date: '', type: 'Attended', description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.conferences.map((conf, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Conference {index + 1}</h4>
                    {formData.conferences.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('conferences', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={conf.name} onChange={(e) => handleArrayChange('conferences', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Conference Name *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={conf.location} onChange={(e) => handleArrayChange('conferences', index, 'location', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Location" />
                      <Input value={conf.date} onChange={(e) => handleArrayChange('conferences', index, 'date', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Date" />
                    </div>
                    <select value={conf.type} onChange={(e) => handleArrayChange('conferences', index, 'type', e.target.value)} className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white">
                      <option value="Attended">Attended</option>
                      <option value="Presented">Presented</option>
                      <option value="Keynote">Keynote</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Panel">Panel</option>
                      <option value="Poster">Poster</option>
                      <option value="Other">Other</option>
                    </select>
                    <Textarea value={conf.description} onChange={(e) => handleArrayChange('conferences', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Speaking Engagements */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Speaking Engagements</Label>
                <AnimatedButton type="button" onClick={() => addItem('speakingEngagements', { title: '', event: '', location: '', date: '', description: '', url: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.speakingEngagements.map((speak, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Engagement {index + 1}</h4>
                    {formData.speakingEngagements.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('speakingEngagements', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={speak.title} onChange={(e) => handleArrayChange('speakingEngagements', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title *" />
                    <Input value={speak.event} onChange={(e) => handleArrayChange('speakingEngagements', index, 'event', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Event" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={speak.location} onChange={(e) => handleArrayChange('speakingEngagements', index, 'location', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Location" />
                      <Input value={speak.date} onChange={(e) => handleArrayChange('speakingEngagements', index, 'date', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Date" />
                    </div>
                    <Textarea value={speak.description} onChange={(e) => handleArrayChange('speakingEngagements', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                    <Input value={speak.url} onChange={(e) => handleArrayChange('speakingEngagements', index, 'url', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="URL" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Teaching Experience */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Teaching Experience</Label>
                <AnimatedButton type="button" onClick={() => addItem('teachingExperience', { course: '', institution: '', startDate: '', endDate: '', current: false, description: '', level: 'Undergraduate' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.teachingExperience.map((teach, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Teaching {index + 1}</h4>
                    {formData.teachingExperience.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('teachingExperience', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={teach.course} onChange={(e) => handleArrayChange('teachingExperience', index, 'course', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Course *" />
                    <Input value={teach.institution} onChange={(e) => handleArrayChange('teachingExperience', index, 'institution', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Institution" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={teach.startDate} onChange={(e) => handleArrayChange('teachingExperience', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={teach.endDate} onChange={(e) => handleArrayChange('teachingExperience', index, 'endDate', e.target.value)} disabled={teach.current} className="bg-black/50 border-white/20 text-white disabled:opacity-50" placeholder="End Date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={teach.current} onChange={(e) => handleArrayChange('teachingExperience', index, 'current', e.target.checked)} className="border-white/20" />
                      <Label className="text-white cursor-pointer">Currently teaching</Label>
                    </div>
                    <select value={teach.level} onChange={(e) => handleArrayChange('teachingExperience', index, 'level', e.target.value)} className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white">
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Professional">Professional</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Other">Other</option>
                    </select>
                    <Textarea value={teach.description} onChange={(e) => handleArrayChange('teachingExperience', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Mentoring */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Mentoring</Label>
                <AnimatedButton type="button" onClick={() => addItem('mentoring', { menteeName: '', organization: '', startDate: '', endDate: '', current: false, description: '', focus: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.mentoring.map((ment, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Mentoring {index + 1}</h4>
                    {formData.mentoring.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('mentoring', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={ment.organization} onChange={(e) => handleArrayChange('mentoring', index, 'organization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Organization *" />
                    <Input value={ment.menteeName} onChange={(e) => handleArrayChange('mentoring', index, 'menteeName', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Mentee Name" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={ment.startDate} onChange={(e) => handleArrayChange('mentoring', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={ment.endDate} onChange={(e) => handleArrayChange('mentoring', index, 'endDate', e.target.value)} disabled={ment.current} className="bg-black/50 border-white/20 text-white disabled:opacity-50" placeholder="End Date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={ment.current} onChange={(e) => handleArrayChange('mentoring', index, 'current', e.target.checked)} className="border-white/20" />
                      <Label className="text-white cursor-pointer">Currently mentoring</Label>
                    </div>
                    <Input value={ment.focus} onChange={(e) => handleArrayChange('mentoring', index, 'focus', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Focus Area" />
                    <Textarea value={ment.description} onChange={(e) => handleArrayChange('mentoring', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Leadership Roles */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Leadership Roles</Label>
                <AnimatedButton type="button" onClick={() => addItem('leadershipRoles', { title: '', organization: '', startDate: '', endDate: '', current: false, description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.leadershipRoles.map((lead, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Leadership {index + 1}</h4>
                    {formData.leadershipRoles.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('leadershipRoles', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={lead.title} onChange={(e) => handleArrayChange('leadershipRoles', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title *" />
                    <Input value={lead.organization} onChange={(e) => handleArrayChange('leadershipRoles', index, 'organization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Organization" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={lead.startDate} onChange={(e) => handleArrayChange('leadershipRoles', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={lead.endDate} onChange={(e) => handleArrayChange('leadershipRoles', index, 'endDate', e.target.value)} disabled={lead.current} className="bg-black/50 border-white/20 text-white disabled:opacity-50" placeholder="End Date" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={lead.current} onChange={(e) => handleArrayChange('leadershipRoles', index, 'current', e.target.checked)} className="border-white/20" />
                      <Label className="text-white cursor-pointer">Current role</Label>
                    </div>
                    <Textarea value={lead.description} onChange={(e) => handleArrayChange('leadershipRoles', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Internships */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Internships</Label>
                <AnimatedButton type="button" onClick={() => addItem('internships', { title: '', company: '', startDate: '', endDate: '', description: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.internships.map((intern, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Internship {index + 1}</h4>
                    {formData.internships.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('internships', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={intern.title} onChange={(e) => handleArrayChange('internships', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title *" />
                    <Input value={intern.company} onChange={(e) => handleArrayChange('internships', index, 'company', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Company *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={intern.startDate} onChange={(e) => handleArrayChange('internships', index, 'startDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Start Date" />
                      <Input value={intern.endDate} onChange={(e) => handleArrayChange('internships', index, 'endDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="End Date" />
                    </div>
                    <Textarea value={intern.description} onChange={(e) => handleArrayChange('internships', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Licenses */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Licenses</Label>
                <AnimatedButton type="button" onClick={() => addItem('licenses', { name: '', issuingOrganization: '', licenseNumber: '', issueDate: '', expiryDate: '', state: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.licenses.map((lic, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">License {index + 1}</h4>
                    {formData.licenses.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('licenses', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={lic.name} onChange={(e) => handleArrayChange('licenses', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="License Name *" />
                    <Input value={lic.issuingOrganization} onChange={(e) => handleArrayChange('licenses', index, 'issuingOrganization', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Issuing Organization" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={lic.licenseNumber} onChange={(e) => handleArrayChange('licenses', index, 'licenseNumber', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="License Number" />
                      <Input value={lic.state} onChange={(e) => handleArrayChange('licenses', index, 'state', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="State" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={lic.issueDate} onChange={(e) => handleArrayChange('licenses', index, 'issueDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Issue Date" />
                      <Input value={lic.expiryDate} onChange={(e) => handleArrayChange('licenses', index, 'expiryDate', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Expiry Date" />
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* References */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">References</Label>
                <AnimatedButton type="button" onClick={() => addItem('references', { name: '', title: '', company: '', email: '', phone: '', relationship: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.references.map((ref, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Reference {index + 1}</h4>
                    {formData.references.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('references', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={ref.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Name *" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={ref.title} onChange={(e) => handleArrayChange('references', index, 'title', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Title" />
                      <Input value={ref.company} onChange={(e) => handleArrayChange('references', index, 'company', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Company" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={ref.email} onChange={(e) => handleArrayChange('references', index, 'email', e.target.value)} type="email" className="bg-black/50 border-white/20 text-white" placeholder="Email" />
                      <Input value={ref.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Phone" />
                    </div>
                    <Input value={ref.relationship} onChange={(e) => handleArrayChange('references', index, 'relationship', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Relationship" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <Label className="text-white text-lg font-semibold">Social Media & Links</Label>
              <AnimatedCard className="border-2 border-white/20 bg-white/5 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input value={formData.socialMedia?.linkedin || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, linkedin: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="LinkedIn URL" />
                  <Input value={formData.socialMedia?.github || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, github: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="GitHub URL" />
                  <Input value={formData.socialMedia?.twitter || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, twitter: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Twitter URL" />
                  <Input value={formData.socialMedia?.portfolio || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, portfolio: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Portfolio URL" />
                  <Input value={formData.socialMedia?.website || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, website: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Website URL" />
                  <Input value={formData.socialMedia?.blog || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, blog: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Blog URL" />
                  <Input value={formData.socialMedia?.behance || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, behance: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Behance URL" />
                  <Input value={formData.socialMedia?.dribbble || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, dribbble: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Dribbble URL" />
                  <Input value={formData.socialMedia?.medium || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, medium: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Medium URL" />
                  <Input value={formData.socialMedia?.stackoverflow || ''} onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, stackoverflow: e.target.value } }))} className="bg-black/50 border-white/20 text-white" placeholder="Stack Overflow URL" />
                </div>
              </AnimatedCard>
            </div>

            {/* Hobbies */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Hobbies</Label>
                <AnimatedButton type="button" onClick={() => addItem('hobbies', '')} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.hobbies.map((hobby, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center">
                    <Input value={typeof hobby === 'string' ? hobby : ''} onChange={(e) => {
                      const newHobbies = [...formData.hobbies];
                      newHobbies[index] = e.target.value;
                      handleInputChange('hobbies', newHobbies);
                    }} className="bg-black/50 border-white/20 text-white" placeholder="Hobby" />
                    {formData.hobbies.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('hobbies', index)} className="ml-2 text-red-400">✕</AnimatedButton>}
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Interests</Label>
                <AnimatedButton type="button" onClick={() => addItem('interests', '')} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.interests.map((interest, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center">
                    <Input value={typeof interest === 'string' ? interest : (interest?.name || interest?.title || '')} onChange={(e) => {
                      const newInterests = [...formData.interests];
                      newInterests[index] = e.target.value;
                      handleInputChange('interests', newInterests);
                    }} className="bg-black/50 border-white/20 text-white" placeholder="Interest" />
                    {formData.interests.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('interests', index)} className="ml-2 text-red-400">✕</AnimatedButton>}
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Open Source Contributions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white text-lg font-semibold">Open Source Contributions</Label>
                <AnimatedButton type="button" onClick={() => addItem('openSourceContributions', { project: '', url: '', description: '', contributions: '' })} variant="secondary" size="sm">+ Add</AnimatedButton>
              </div>
              {formData.openSourceContributions.map((os, index) => (
                <AnimatedCard key={index} className="border-2 border-white/20 bg-white/5 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-bold text-white">Contribution {index + 1}</h4>
                    {formData.openSourceContributions.length > 1 && <AnimatedButton type="button" variant="ghost" size="sm" onClick={() => removeItem('openSourceContributions', index)} className="text-red-400">✕</AnimatedButton>}
                  </div>
                  <div className="space-y-3">
                    <Input value={os.project} onChange={(e) => handleArrayChange('openSourceContributions', index, 'project', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Project Name *" />
                    <Input value={os.url} onChange={(e) => handleArrayChange('openSourceContributions', index, 'url', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="URL" />
                    <Textarea value={os.description} onChange={(e) => handleArrayChange('openSourceContributions', index, 'description', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Description" />
                    <Textarea value={os.contributions} onChange={(e) => handleArrayChange('openSourceContributions', index, 'contributions', e.target.value)} className="bg-black/50 border-white/20 text-white" placeholder="Contributions" />
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label className="text-white">Additional Information</Label>
              <Textarea value={formData.additionalInfo} onChange={(e) => handleInputChange('additionalInfo', e.target.value)} className="min-h-32 bg-black/50 border-white/20 text-white placeholder:text-white/40" placeholder="Any other information you'd like to include..." />
            </div>
          </div>
        );

      default:
        return null;
    }
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

      {/* Content Layer */}
      <div className="relative z-10 pt-24 md:pt-32 pb-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 px-4">
            <div className="flex flex-col items-center text-center">
              <AnimatedText 
                tag="h1" 
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
                splitType="words"
                delay={20}
              >
                Create Your Resume
              </AnimatedText>
              <AnimatedText 
                className="text-lg sm:text-xl text-white/70"
                splitType="words"
                delay={10}
              >
                Build a professional resume step by step
              </AnimatedText>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section with Stepper */}
            <div className="w-full">
              <SpotlightCard className="w-full" spotlightColor="rgba(255, 255, 255, 0.1)">
                <Stepper
                  initialStep={1}
                  currentStep={currentStep}
                  onStepChange={(step) => {
                    handleStepChange(step);
                  }}
                  onFinalStepCompleted={handleFinalStepCompleted}
                  backButtonText="Previous"
                  nextButtonText="Next"
                  stepCircleContainerClassName="bg-black/80 backdrop-blur-md border border-white/20 shadow-lg rounded-lg"
                  stepContainerClassName="bg-black/80 backdrop-blur-md"
                  contentClassName="bg-black/80 backdrop-blur-md min-h-[500px] px-4 sm:px-8 py-6"
                  footerClassName="bg-black/80 backdrop-blur-md"
              backButtonProps={{
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (currentStep > 1) {
                    handleStepChange(currentStep - 1);
                  }
                },
                className: 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }}
              nextButtonProps={{
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (currentStep < 7) {
                    handleStepChange(currentStep + 1);
                  } else {
                    if (!isGenerating) {
                      handleGenerateCV();
                    }
                  }
                },
                disabled: isGenerating,
                className: isGenerating 
                  ? '!opacity-50 !cursor-not-allowed !bg-white/20 !text-white' 
                  : currentStep === 7 
                    ? '!bg-white !text-black hover:!bg-gray-100 !min-w-[200px] !font-bold' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
                children: isGenerating 
                  ? (
                    <span className="flex items-center justify-center gap-2 whitespace-nowrap text-white">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-white">Generating...</span>
                    </span>
                  ) 
                  : currentStep === 7 
                    ? (
                      <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <span className="text-xl">🚀</span>
                        <span className="font-bold text-black">Generate Resume</span>
                      </span>
                    )
                    : undefined
              }}
            renderStepIndicator={({ step, currentStep, onStepClick }) => {
              const stepData = steps[step - 1];
              const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
              // Allow clicking on current step or previous steps
              const canClick = step <= currentStep;
              
              return (
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    onClick={() => {
                      if (canClick) {
                        // Allow going back or to current step
                        handleStepChange(step);
                      } else if (step === currentStep + 1) {
                        // For steps 1-2, validate before allowing next step
                        if (currentStep === 1 || currentStep === 2) {
                          const isValid = validateStep(currentStep);
                          if (isValid) {
                            handleStepChange(step);
                          } else {
                            toast.error('Please complete all required fields');
                          }
                        } else {
                          // For steps 3-6, allow navigation (they're optional)
                          handleStepChange(step);
                        }
                      }
                    }}
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold transition-all duration-300 ${
                      canClick || step === currentStep + 1 ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
                    } ${
                      status === 'active'
                        ? 'bg-white text-black scale-110 shadow-lg ring-4 ring-white/30'
                        : status === 'complete'
                        ? 'bg-white/20 text-white border-2 border-white/40'
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}
                  >
                    {status === 'complete' ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-base sm:text-lg">{stepData.icon}</span>
                    )}
                  </div>
                  <p className={`text-xs font-medium mt-2 text-center whitespace-nowrap ${
                    status === 'active' ? 'text-white font-semibold' : status === 'complete' ? 'text-white/80' : 'text-white/50'
                  }`}>
                    {stepData.title}
                  </p>
                </div>
              );
            }}
          >
            <Step>{renderStepContent(1)}</Step>
            <Step>{renderStepContent(2)}</Step>
            <Step>{renderStepContent(3)}</Step>
            <Step>{renderStepContent(4)}</Step>
            <Step>{renderStepContent(5)}</Step>
            <Step>{renderStepContent(6)}</Step>
            <Step>{renderStepContent(7)}</Step>
          </Stepper>
              </SpotlightCard>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-8rem)] w-full">
              <SpotlightCard className="h-full overflow-hidden flex flex-col" spotlightColor="rgba(255, 255, 255, 0.1)">
                <div className="flex-shrink-0 border-b border-white/20 p-6">
                  <div className="flex flex-col">
                    <AnimatedText tag="h3" className="text-xl font-black text-white mb-1">
                      Live Preview
                    </AnimatedText>
                    <AnimatedText className="text-white/70 text-sm">
                      {selectedTemplate ? 'See how your resume looks' : 'Select a template to preview'}
                    </AnimatedText>
                  </div>
                </div>
                <div ref={previewContainerRef} className="flex-1 overflow-hidden bg-black/40 relative">
                  {selectedTemplate ? (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <div 
                        ref={resumePreviewRef} 
                        className="flex items-center justify-center"
                        style={{
                          transform: `scale(${previewScale})`,
                          transformOrigin: 'center center',
                          width: '21cm',
                          height: '29.7cm'
                        }}
                      >
                        {renderTemplate()}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px] text-white/40">
                      <div className="text-center">
                        <p className="text-lg mb-2">No preview available</p>
                        <p className="text-sm">Select a template to see the preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
