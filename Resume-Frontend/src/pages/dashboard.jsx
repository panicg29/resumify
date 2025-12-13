import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/ui/textarea';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useResumes } from '../hooks/useResumes';
import KorinaVillanuevaTemplate from '../components/templates/KorinaVillanuevaTemplate';
import RiaanChandranTemplate from '../components/templates/RiaanChandranTemplate';
import AdoraMontminyTemplate from '../components/templates/AdoraMontminyTemplate';
import JamieChastainTemplate from '../components/templates/JamieChastainTemplate';
import DonnaStroupeTemplate from '../components/templates/DonnaStroupeTemplate';
import RichardSanchezNewTemplate from '../components/templates/RichardSanchezNewTemplate';
import DanielGallegoTemplate from '../components/templates/DanielGallegoTemplate';
import ClaudiaAlvesTemplate from '../components/templates/ClaudiaAlvesTemplate';
import BartholomewHendersonTemplate from '../components/templates/BartholomewHendersonTemplate';
import CatrineZivTemplate from '../components/templates/CatrineZivTemplate';
import OliviaWilsonDarkBlueTemplate from '../components/templates/OliviaWilsonDarkBlueTemplate';
import PhylisFlexTemplate from '../components/templates/PhylisFlexTemplate';
import MultiPageTemplate1 from '../components/templates/MultiPageTemplate1';
import MultiPageTemplate2 from '../components/templates/MultiPageTemplate2';
import MultiPageTemplate3 from '../components/templates/MultiPageTemplate3';
import { distributeContent } from '../utils/contentDistributor';
import { generatePDF } from '../utils/pdfGenerator';
import resumeApi from '../services/resumeApi';
import AnalyticsModal from '../components/AnalyticsModal';
import AnimatedButton from '../components/react-bits/AnimatedButton';
import AnimatedCard from '../components/react-bits/AnimatedCard';
import AnimatedText from '../components/react-bits/AnimatedText';
import AnimatedIcon from '../components/react-bits/AnimatedIcon';
import SpotlightCard from '../components/SpotlightCard';
import LandingHeader from '../components/landing/LandingHeader';
import LightRays from '../components/react-bits/LightRays';

// Template name mapping
const getTemplateName = (templateId) => {
  const templateMap = {
    'korina-villanueva': 'Korina Villanueva',
    'riaan-chandran': 'Riaan Chandran',
    'adora-montminy': 'Adora Montminy',
    'jamie-chastain': 'Jamie Chastain',
    'donna-stroupe': 'Donna Stroupe',
    'richard-sanchez-new': 'Richard Sanchez',
    'daniel-gallego': 'Daniel Gallego',
    'claudia-alves': 'Claudia Alves',
    'bartholomew-henderson': 'Bartholomew Henderson',
    'catrine-ziv': 'Catrine Ziv',
    'olivia-wilson-dark-blue': 'Olivia Wilson Dark Blue',
    'phylis-flex': 'Phylis Flex',
    'multipage-template-1': 'Multi-Page Professional',
    'multipage-template-2': 'Multi-Page Modern Tech',
    'multipage-template-3': 'Multi-Page Creative'
  };
  return templateMap[templateId] || templateId || 'Unknown Template';
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { resumes, loading, error, refetch, deleteResume, updateResume } = useResumes();
  const [selectedResume, setSelectedResume] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isAIEditOpen, setIsAIEditOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiUpdating, setAiUpdating] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [analyticsResumeId, setAnalyticsResumeId] = useState(null);
  const [analyticsReport, setAnalyticsReport] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  // Ensure editableData is initialized when entering edit mode
  useEffect(() => {
    if (isEditMode && !editableData && selectedResume) {
      const dataCopy = JSON.parse(JSON.stringify(selectedResume));
      // Ensure template field is preserved
      if (!dataCopy.template && selectedResume.template) {
        dataCopy.template = selectedResume.template;
      }
      setEditableData(dataCopy);
      console.log('[Edit] useEffect initialized editableData:', dataCopy);
    }
  }, [isEditMode, editableData, selectedResume]);

  const handlePreview = (resume) => {
    // Debug: Log the resume object to see what template value it has
    if (process.env.NODE_ENV === 'development') {
      console.log('[handlePreview] Original resume:', {
        id: resume._id,
        name: resume.name,
        template: resume.template,
        allKeys: Object.keys(resume)
      });
    }
    
    // Ensure template field is preserved when copying resume data
    const resumeCopy = JSON.parse(JSON.stringify(resume));
    
    // Explicitly ensure template field exists - check multiple possible field names
    if (!resumeCopy.template) {
      if (resume.template) {
        resumeCopy.template = resume.template;
      } else if (resume.templateId) {
        resumeCopy.template = resume.templateId;
      } else {
        // If no template found, default to korina-villanueva
        resumeCopy.template = 'korina-villanueva';
        console.warn(`[handlePreview] No template found for resume ${resume._id}, defaulting to korina-villanueva`);
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[handlePreview] Resume copy:', {
        id: resumeCopy._id,
        template: resumeCopy.template
      });
    }
    
    // Ensure template is preserved (important for preview and edit modes)
    // Also ensure selectedResume has the template field
    const resumeWithTemplate = { ...resume };
    if (!resumeWithTemplate.template && resumeCopy.template) {
      resumeWithTemplate.template = resumeCopy.template;
    }
    
    setSelectedResume(resumeWithTemplate);
    setEditableData(resumeCopy);
    setIsEditMode(false);
    setIsPreviewOpen(true);
  };
  // Update helper for nested paths like "education.0.degree"
  const updateByPath = (obj, path, value) => {
    const keys = path.split('.');
    const last = keys.pop();
    let curr = obj;
    for (const k of keys) {
      const idx = Number.isInteger(Number(k)) ? Number(k) : k;
      if (curr[idx] == null) curr[idx] = Number.isInteger(Number(k)) ? [] : {};
      curr = curr[idx];
    }
    curr[last] = value;
  };

  const handleTemplateChange = (path, value) => {
    setEditableData(prev => {
      // If prev is null, initialize from selectedResume
      if (!prev && selectedResume) {
        prev = JSON.parse(JSON.stringify(selectedResume));
      }
      if (!prev) {
        console.warn('handleTemplateChange: No editableData or selectedResume available');
        return prev;
      }
      const next = JSON.parse(JSON.stringify(prev));
      // Special case: projects.*.technologies may be comma-separated string; store as string
      updateByPath(next, path, value);
      return next;
    });
  };

  const normalizeProjectsForSave = (projects) => {
    return (projects || []).map((proj) => ({
      name: proj.name || '',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies
        : (typeof proj.technologies === 'string'
          ? proj.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : []),
      ...(proj.url ? { url: proj.url } : {}),
      ...(proj.github ? { github: proj.github } : {}),
    }));
  };

  const handleSaveEdits = async () => {
    if (!selectedResume || !editableData) return;
    setSaving(true);
    try {
      // Build payload (partial allowed). Include arrays to replace when present.
      // Ensure template is included - use editableData template or fallback to selectedResume template
      const payload = {
        name: editableData.name,
        email: editableData.email,
        phone: editableData.phone,
        summary: editableData.summary,
        template: editableData.template || selectedResume.template || 'korina-villanueva',
        education: (editableData.education || []).map(e => ({
          degree: e.degree || '',
          institution: e.institution || '',
          year: e.year,
          ...(e.gpa ? { gpa: e.gpa } : {}),
        })),
        experience: (editableData.experience || []).map(ex => ({
          title: ex.title || '',
          company: ex.company || '',
          startDate: ex.startDate || '',
          endDate: ex.current ? null : (ex.endDate || ''),
          description: ex.description || '',
          current: !!ex.current,
        })),
        skills: (editableData.skills || []).map(s => ({ name: s.name || '', ...(s.level ? { level: s.level } : {}) })),
        projects: normalizeProjectsForSave(editableData.projects),
      };

      // Remove undefined to avoid accidental overwrites
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      const updated = await updateResume(selectedResume._id, payload);
      // Update modal state
      setSelectedResume(updated);
      setEditableData(updated);
      setIsEditMode(false);
      toast.success('Resume updated successfully');
    } catch (e) {
      console.error('Save edits failed:', e);
      toast.error(e.message || 'Failed to update resume');
    } finally {
      setSaving(false);
    }
  };

  const handleAIUpdate = async () => {
    if (!selectedResume || !aiPrompt.trim()) {
      toast.error('Please enter a prompt describing what you want to update');
      return;
    }

    setAiUpdating(true);
    try {
      const updated = await resumeApi.updateResumeWithAI(selectedResume._id, aiPrompt);
      
      // Ensure template is preserved if backend didn't return it
      if (!updated.template && selectedResume.template) {
        updated.template = selectedResume.template;
      }
      
      // Update the resume in the list
      await refetch();
      
      // Update modal state with the new resume data
      const updatedCopy = JSON.parse(JSON.stringify(updated));
      // Ensure template is preserved in the copy
      if (!updatedCopy.template && updated.template) {
        updatedCopy.template = updated.template;
      }
      
      setSelectedResume(updated);
      setEditableData(updatedCopy);
      
      // Close AI modal and reset prompt
      setIsAIEditOpen(false);
      setAiPrompt('');
      
      toast.success('Resume updated successfully with AI!');
    } catch (error) {
      console.error('AI update failed:', error);
      toast.error(error.message || 'Failed to update resume with AI');
    } finally {
      setAiUpdating(false);
    }
  };

  const handleAnalyzeResume = async (resumeId) => {
    setAnalyticsResumeId(resumeId);
    setAnalyticsReport(null);
    setAnalyticsError(null);
    setIsAnalyticsOpen(true);
    setAnalyticsLoading(true);

    try {
      const report = await resumeApi.analyzeResume(resumeId);
      setAnalyticsReport(report);
      toast.success('Resume analysis completed!');
    } catch (error) {
      console.error('Analyze resume error:', error);
      setAnalyticsError(error.message || 'Failed to analyze resume');
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleCloseAnalytics = () => {
    setIsAnalyticsOpen(false);
    setAnalyticsResumeId(null);
    setAnalyticsReport(null);
    setAnalyticsError(null);
  };


  const handleDownload = async (resume) => {
    setDownloadingId(resume._id);
    try {
      // Create a temporary container for the resume
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '21cm';
      document.body.appendChild(tempContainer);

      // Render the resume template
      const root = document.createElement('div');
      tempContainer.appendChild(root);
      
      // Format data to match template schema (with formatted dates)
      const templateData = {
        name: resume.name,
        email: resume.email,
        phone: resume.phone,
        summary: resume.summary,
        education: (resume.education || []).map(edu => ({
          ...edu,
          year: edu.year // Keep as number or convert if needed
        })),
        experience: (resume.experience || []).map(exp => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '',
          endDate: exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''
        })),
        skills: resume.skills || [],
        projects: (resume.projects || []).map(proj => ({
          ...proj,
          // Ensure technologies is always an array
          technologies: Array.isArray(proj.technologies) 
            ? proj.technologies 
            : (typeof proj.technologies === 'string' 
              ? proj.technologies.split(',').map(t => t.trim()).filter(t => t)
              : [])
        })),
        certifications: resume.certifications || [],
        trainings: resume.trainings || [],
        awards: resume.awards || [],
        languages: resume.languages || [],
        publications: resume.publications || [],
        patents: resume.patents || [],
        volunteerWork: resume.volunteerWork || [],
        professionalMemberships: resume.professionalMemberships || [],
        conferences: resume.conferences || [],
        speakingEngagements: resume.speakingEngagements || [],
        teachingExperience: resume.teachingExperience || [],
        mentoring: resume.mentoring || [],
        leadershipRoles: resume.leadershipRoles || [],
        internships: resume.internships || [],
        licenses: resume.licenses || [],
        references: resume.references || [],
        socialMedia: resume.socialMedia || {},
        hobbies: resume.hobbies || [],
        interests: resume.interests || [],
        openSourceContributions: resume.openSourceContributions || [],
        additionalInfo: resume.additionalInfo || '',
        location: resume.location || '',
        role: resume.role || ''
      };

      // Render the template (we'll use a simple approach)
      root.innerHTML = `<div id="resume-download-${resume._id}"></div>`;
      
      // Import React and ReactDOM dynamically for rendering
      const { createRoot } = await import('react-dom/client');
      const reactRoot = createRoot(root.firstChild);
      
      // Determine template component
      // Normalize template value (trim whitespace, handle null/undefined)
      const templateValue = resume.template;
      const normalizedTemplate = templateValue ? String(templateValue).trim() : null;
      
      // Template is normalized and ready for use
      
      let TemplateComponent;
      if (normalizedTemplate === 'korina-villanueva') {
        TemplateComponent = KorinaVillanuevaTemplate;
      } else if (normalizedTemplate === 'riaan-chandran') {
        TemplateComponent = RiaanChandranTemplate;
      } else if (normalizedTemplate === 'adora-montminy') {
        TemplateComponent = AdoraMontminyTemplate;
      } else if (normalizedTemplate === 'jamie-chastain') {
        TemplateComponent = JamieChastainTemplate;
      } else if (normalizedTemplate === 'donna-stroupe') {
        TemplateComponent = DonnaStroupeTemplate;
      } else if (normalizedTemplate === 'richard-sanchez-new') {
        TemplateComponent = RichardSanchezNewTemplate;
      } else if (normalizedTemplate === 'daniel-gallego') {
        TemplateComponent = DanielGallegoTemplate;
      } else if (normalizedTemplate === 'claudia-alves') {
        TemplateComponent = ClaudiaAlvesTemplate;
      } else if (normalizedTemplate === 'bartholomew-henderson') {
        TemplateComponent = BartholomewHendersonTemplate;
      } else if (normalizedTemplate === 'catrine-ziv') {
        TemplateComponent = CatrineZivTemplate;
      } else if (normalizedTemplate === 'olivia-wilson-dark-blue') {
        TemplateComponent = OliviaWilsonDarkBlueTemplate;
      } else if (normalizedTemplate === 'phylis-flex') {
        TemplateComponent = PhylisFlexTemplate;
      } else if (normalizedTemplate === 'multipage-template-1') {
        TemplateComponent = MultiPageTemplate1;
      } else if (normalizedTemplate === 'multipage-template-2') {
        TemplateComponent = MultiPageTemplate2;
      } else if (normalizedTemplate === 'multipage-template-3') {
        TemplateComponent = MultiPageTemplate3;
      } else {
        // Default fallback to korina-villanueva if template is missing or invalid
        // This handles cases where old resumes don't have a template field
        TemplateComponent = KorinaVillanuevaTemplate;
      }
      
      // For multi-page templates, use full data (template handles distribution internally)
      reactRoot.render(<TemplateComponent formData={templateData} />);

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate PDF
      const filename = `${resume.name.replace(/\s+/g, '_')}_Resume.pdf`;
      await generatePDF(root.firstChild, filename);

      // Cleanup
      reactRoot.unmount();
      document.body.removeChild(tempContainer);

      toast.success('Resume downloaded successfully');
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download resume');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (resume) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resume.name}"'s resume? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    setDeletingId(resume._id);
    try {
      const result = await deleteResume(resume._id);
      
      if (result.success) {
        toast.success(`Resume "${result.name}" deleted successfully`);
      } else {
        toast.error(`Failed to delete resume: ${result.error}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete resume');
    } finally {
      setDeletingId(null);
    }
  };

  const renderTemplate = (resume, options = {}) => {
    if (!resume) return null;
    const { editable = false, onChange } = options;

    // Get template value from resume - check multiple possible locations
    const templateValue = resume.template || resume.templateId || null;
    
    // Debug logging to help diagnose template issues
    if (process.env.NODE_ENV === 'development') {
      console.log('[renderTemplate] Resume data:', {
        id: resume._id,
        name: resume.name,
        template: templateValue,
        templateType: typeof templateValue,
        hasTemplate: 'template' in resume,
        resumeKeys: Object.keys(resume).filter(k => k.toLowerCase().includes('template'))
      });
    }

    // Format data to match template schema (with formatted dates)
    const templateData = {
      name: resume.name,
      email: resume.email,
      phone: resume.phone,
      summary: resume.summary,
      education: (resume.education || []).map(edu => ({
        ...edu,
        year: edu.year // Keep as number or convert if needed
      })),
      experience: (resume.experience || []).map(exp => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '',
        endDate: exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''
      })),
      skills: resume.skills || [],
      projects: (resume.projects || []).map(proj => ({
        ...proj,
        // Ensure technologies is always an array
        technologies: Array.isArray(proj.technologies) 
          ? proj.technologies 
          : (typeof proj.technologies === 'string' 
            ? proj.technologies.split(',').map(t => t.trim()).filter(t => t)
            : [])
      })),
      certifications: resume.certifications || [],
      trainings: resume.trainings || [],
      awards: resume.awards || [],
      languages: resume.languages || [],
      publications: resume.publications || [],
      patents: resume.patents || [],
      volunteerWork: resume.volunteerWork || [],
      professionalMemberships: resume.professionalMemberships || [],
      conferences: resume.conferences || [],
      speakingEngagements: resume.speakingEngagements || [],
      teachingExperience: resume.teachingExperience || [],
      mentoring: resume.mentoring || [],
      leadershipRoles: resume.leadershipRoles || [],
      internships: resume.internships || [],
      licenses: resume.licenses || [],
      references: resume.references || [],
      socialMedia: resume.socialMedia || {},
      hobbies: resume.hobbies || [],
      interests: resume.interests || [],
      openSourceContributions: resume.openSourceContributions || [],
      additionalInfo: resume.additionalInfo || '',
      location: resume.location || '',
      role: resume.role || ''
    };

    // Use the appropriate template based on resume.template field
    // Normalize template value (trim whitespace, handle null/undefined)
    const normalizedTemplate = templateValue ? String(templateValue).trim() : null;
    
    let TemplateComponent;
    if (normalizedTemplate === 'korina-villanueva') {
      TemplateComponent = KorinaVillanuevaTemplate;
    } else if (normalizedTemplate === 'riaan-chandran') {
      TemplateComponent = RiaanChandranTemplate;
    } else if (normalizedTemplate === 'adora-montminy') {
      TemplateComponent = AdoraMontminyTemplate;
    } else if (normalizedTemplate === 'jamie-chastain') {
      TemplateComponent = JamieChastainTemplate;
    } else if (normalizedTemplate === 'donna-stroupe') {
      TemplateComponent = DonnaStroupeTemplate;
    } else if (normalizedTemplate === 'richard-sanchez-new') {
      TemplateComponent = RichardSanchezNewTemplate;
    } else if (normalizedTemplate === 'daniel-gallego') {
      TemplateComponent = DanielGallegoTemplate;
    } else if (normalizedTemplate === 'claudia-alves') {
      TemplateComponent = ClaudiaAlvesTemplate;
    } else if (normalizedTemplate === 'bartholomew-henderson') {
      TemplateComponent = BartholomewHendersonTemplate;
    } else if (normalizedTemplate === 'catrine-ziv') {
      TemplateComponent = CatrineZivTemplate;
    } else if (normalizedTemplate === 'olivia-wilson-dark-blue') {
      TemplateComponent = OliviaWilsonDarkBlueTemplate;
    } else if (normalizedTemplate === 'phylis-flex') {
      TemplateComponent = PhylisFlexTemplate;
    } else if (normalizedTemplate === 'multipage-template-1') {
      TemplateComponent = MultiPageTemplate1;
    } else if (normalizedTemplate === 'multipage-template-2') {
      TemplateComponent = MultiPageTemplate2;
    } else if (normalizedTemplate === 'multipage-template-3') {
      TemplateComponent = MultiPageTemplate3;
    } else {
      // Default fallback to korina-villanueva if template is missing or invalid
      // This handles cases where old resumes don't have a template field
      TemplateComponent = KorinaVillanuevaTemplate;
    }

    // For multi-page templates, the template handles content distribution internally
    // It will automatically distribute content across 3 pages with minimal gaps
    return <TemplateComponent formData={templateData} editable={editable} onChange={onChange} />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && resumes.length === 0) {
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

        {/* Modern Loading Animation */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            {/* Animated Logo/Icon */}
            <div className="mb-8 relative">
              <div className="w-24 h-24 mx-auto relative">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
                
                {/* Middle rotating ring */}
                <div className="absolute inset-2 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                
                {/* Inner pulsing circle */}
                <div className="absolute inset-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">
                Loading Your Resumes
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-white/60 text-sm">Please wait while we fetch your data</p>
            </div>

            {/* Progress bar */}
            <div className="mt-8 w-64 mx-auto">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <SpotlightCard 
          className="w-full max-w-md p-6" 
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <h3 className="text-white text-xl font-semibold mb-2">Error</h3>
          <p className="text-white/70 mb-4">{error}</p>
          <button onClick={refetch} className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105">
            Try Again
          </button>
        </SpotlightCard>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-screen font-sans bg-black text-white relative overflow-x-hidden">
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
          {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight animate-fade-in">
              My Resumes
            </h1>
            <p className="text-xl text-white/70 leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
              {resumes.length === 0 
                ? 'No resumes yet. Create your first one!'
                : `You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>

        {/* Resume List */}
        {resumes.length === 0 ? (
          <SpotlightCard 
            className="py-16 text-center" 
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="w-24 h-24 mx-auto mb-6 animate-fade-in">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 animate-fade-in" style={{ animationDelay: '100ms' }}>No resumes yet</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Get started by creating your first professional resume. It only takes a few minutes!
            </p>
            <button 
              onClick={() => navigate('/resume-builder')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              Create Your First Resume
            </button>
          </SpotlightCard>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume, index) => (
              <SpotlightCard
                key={resume._id}
                className="p-6"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left: Resume Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                        {resume.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">
                            {resume.name}
                          </h3>
                          <span className="text-white/70 text-sm">
                            {resume.email}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{resume.experience?.length || 0} Experience{resume.experience?.length !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>{resume.education?.length || 0} Education</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span>{resume.skills?.length || 0} Skills</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs">Created: {formatDate(resume.createdAt)}</span>
                          </div>
                          {resume.template && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                              </svg>
                              <span className="text-xs font-medium text-white/80">Template: {getTemplateName(resume.template)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:min-w-[200px]">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      onClick={() => handlePreview(resume)}
                      className="flex-1 lg:w-full"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </AnimatedButton>

                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAnalyzeResume(resume._id)}
                      disabled={analyticsLoading && analyticsResumeId === resume._id}
                      className="flex-1 lg:w-full"
                    >
                      {analyticsLoading && analyticsResumeId === resume._id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Analytics
                        </>
                      )}
                    </AnimatedButton>
                    
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(resume)}
                      disabled={downloadingId === resume._id}
                      className="flex-1 lg:w-full"
                    >
                      {downloadingId === resume._id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download PDF
                        </>
                      )}
                    </AnimatedButton>

                    <AnimatedButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(resume)}
                      disabled={deletingId === resume._id}
                      className="flex-1 lg:w-full text-white/70 hover:text-white"
                    >
                      {deletingId === resume._id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </>
                      )}
                    </AnimatedButton>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && selectedResume && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-[95vh] w-full bg-black rounded-lg border border-white/20 overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-white/10 p-6 flex justify-between items-center z-10">
              <div>
                <AnimatedText tag="h3" className="text-2xl font-black text-white mb-1">
                  {selectedResume.name}'s Resume
                </AnimatedText>
                <AnimatedText className="text-white/70 font-medium">
                  {isEditMode ? 'Edit Mode' : 'Preview Mode'} • Template: {getTemplateName(editableData?.template || selectedResume?.template || 'korina-villanueva')}
                </AnimatedText>
                {/* Template Selector */}
                {isEditMode && (
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-white/70 mb-2">Change Template:</label>
                    <select
                      value={editableData?.template || selectedResume?.template || 'korina-villanueva'}
                      onChange={(e) => {
                        const newTemplate = e.target.value;
                        if (editableData) {
                          setEditableData({ ...editableData, template: newTemplate });
                        } else {
                          setSelectedResume({ ...selectedResume, template: newTemplate });
                        }
                      }}
                      className="px-3 py-1.5 text-sm bg-black/80 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="korina-villanueva" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Korina Villanueva</option>
                      <option value="riaan-chandran" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Riaan Chandran</option>
                      <option value="adora-montminy" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Adora Montminy</option>
                      <option value="jamie-chastain" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Jamie Chastain</option>
                      <option value="donna-stroupe" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Donna Stroupe</option>
                      <option value="richard-sanchez-new" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Richard Sanchez</option>
                      <option value="daniel-gallego" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Daniel Gallego</option>
                      <option value="claudia-alves" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Claudia Alves</option>
                      <option value="bartholomew-henderson" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Bartholomew Henderson</option>
                      <option value="catrine-ziv" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Catrine Ziv</option>
                      <option value="olivia-wilson-dark-blue" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Olivia Wilson Dark Blue</option>
                      <option value="phylis-flex" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Phylis Flex</option>
                      <optgroup label="Multi-Page Templates" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                        <option value="multipage-template-1" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Multi-Page Professional</option>
                        <option value="multipage-template-2" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Multi-Page Modern Tech</option>
                        <option value="multipage-template-3" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Multi-Page Creative</option>
                      </optgroup>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <AnimatedButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAIEditOpen(true)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Edit with AI
                </AnimatedButton>
                <AnimatedButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (!isEditMode) {
                      // When entering edit mode, ensure editableData is initialized from selectedResume
                      if (!editableData && selectedResume) {
                        const dataCopy = JSON.parse(JSON.stringify(selectedResume));
                        // Ensure template field is preserved
                        if (!dataCopy.template && selectedResume.template) {
                          dataCopy.template = selectedResume.template;
                        }
                        setEditableData(dataCopy);
                        console.log('[Edit] Initialized editableData:', dataCopy);
                      } else if (editableData) {
                        console.log('[Edit] editableData already exists');
                      } else {
                        console.warn('[Edit] No selectedResume available to initialize editableData');
                      }
                    }
                    setIsEditMode((v) => !v);
                  }}
                >
                  {isEditMode ? 'Stop Editing' : 'Edit'}
                </AnimatedButton>
                {isEditMode && (
                  <>
                    <AnimatedButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditableData(JSON.parse(JSON.stringify(selectedResume)))}
                    >
                      Reset Changes
                    </AnimatedButton>
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      onClick={handleSaveEdits}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </AnimatedButton>
                  </>
                )}
                <AnimatedButton 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    setSelectedResume(null);
                    setEditableData(null);
                    setIsEditMode(false);
                    setIsAIEditOpen(false);
                    setAiPrompt('');
                  }}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </AnimatedButton>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 bg-black overflow-auto max-h-[calc(95vh-100px)]">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden mx-auto" style={{maxWidth: '21cm'}}>
                {(() => {
                  // Use editableData if in edit mode, otherwise use selectedResume
                  // But ensure template is always present
                  const baseResume = isEditMode ? (editableData || selectedResume) : selectedResume;
                  
                  // Create a copy to avoid mutations and ensure template field exists
                  if (!baseResume) return null;
                  
                  const resumeToRender = { ...baseResume };
                  
                  // Ensure template field exists - use the one from editableData if available, fallback to selectedResume
                  if (!resumeToRender.template) {
                    if (editableData?.template) {
                      resumeToRender.template = editableData.template;
                    } else if (selectedResume?.template) {
                      resumeToRender.template = selectedResume.template;
                    } else {
                      resumeToRender.template = 'korina-villanueva'; // Default fallback
                    }
                  }
                  
                  // Only pass editable and onChange if we're in edit mode and editableData exists
                  const editOptions = isEditMode && editableData 
                    ? { editable: true, onChange: (path, val) => handleTemplateChange(path, val) }
                    : { editable: false, onChange: () => {} };
                  
                  return renderTemplate(resumeToRender, editOptions);
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Edit Modal */}
      {isAIEditOpen && selectedResume && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-black rounded-lg shadow-2xl border border-white/20 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-black border-b border-white/10 p-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <AnimatedText tag="h3" className="text-2xl font-bold text-white mb-1">
                    Edit with AI
                  </AnimatedText>
                  <AnimatedText className="text-white/70 text-sm">
                    Describe what you want to update in your resume
                  </AnimatedText>
                </div>
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAIEditOpen(false);
                    setAiPrompt('');
                  }}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </AnimatedButton>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  What would you like to update?
                </label>
                <Textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Example: Add 2 years of experience as Senior Developer at Google. Update summary to highlight leadership skills."
                  rows={6}
                  className="w-full resize-none bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  disabled={aiUpdating}
                />
                <p className="mt-2 text-xs text-white/60">
                  Examples: "Add React to skills", "Update summary to emphasize frontend expertise", "Add new experience at Microsoft"
                </p>
              </div>

              {aiUpdating && (
                <div className="flex items-center gap-2 text-white text-sm">
                  <svg 
                    className="animate-spin h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Updating resume with AI...</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <AnimatedButton
                  variant="ghost"
                  onClick={() => {
                    setIsAIEditOpen(false);
                    setAiPrompt('');
                  }}
                  disabled={aiUpdating}
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleAIUpdate}
                  disabled={aiUpdating || !aiPrompt.trim()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Update with AI
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {isAnalyticsOpen && (
        <AnalyticsModal
          report={analyticsReport}
          loading={analyticsLoading}
          error={analyticsError}
          onClose={handleCloseAnalytics}
        />
      )}
    </main>
  );
}

