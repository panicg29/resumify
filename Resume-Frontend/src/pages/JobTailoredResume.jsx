import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ClipboardList,
  Loader2,
  Sparkles,
  Link2,
  FileText,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

import LandingHeader from '../components/landing/LandingHeader';
import Aurora from '../components/react-bits/Aurora';
import AnimatedCard from '../components/react-bits/AnimatedCard';
import AnimatedButton from '../components/react-bits/AnimatedButton';
import SpotlightCard from '../components/SpotlightCard';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import resumeApi from '../services/resumeApi';
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

const templateOptions = [
  {
    id: 'korina-villanueva',
    name: 'Korina Villanueva',
    descriptor: 'Elegant two-column with light beige sidebar',
    accent: 'from-amber-600 to-amber-800'
  },
  {
    id: 'riaan-chandran',
    name: 'Riaan Chandran',
    descriptor: 'Modern dark theme with orange accents',
    accent: 'from-orange-500 to-orange-700'
  },
  {
    id: 'adora-montminy',
    name: 'Adora Montminy',
    descriptor: 'Creative dark charcoal with light pink accent',
    accent: 'from-pink-500 to-pink-700'
  },
  {
    id: 'jamie-chastain',
    name: 'Jamie Chastain',
    descriptor: 'Professional black sidebar with clean white layout',
    accent: 'from-gray-800 to-gray-900'
  },
  {
    id: 'donna-stroupe',
    name: 'Donna Stroupe',
    descriptor: 'Light gray sidebar with centered sections',
    accent: 'from-gray-500 to-gray-700'
  },
  {
    id: 'richard-sanchez-new',
    name: 'Richard Sanchez',
    descriptor: 'Modern light gray with blue accents',
    accent: 'from-blue-600 to-blue-800'
  },
  {
    id: 'daniel-gallego',
    name: 'Daniel Gallego',
    descriptor: 'Single column with grey header bars',
    accent: 'from-gray-600 to-gray-800'
  },
  {
    id: 'claudia-alves',
    name: 'Claudia Alves',
    descriptor: 'Dark brown sidebar with light beige main',
    accent: 'from-amber-800 to-amber-900'
  },
  {
    id: 'bartholomew-henderson',
    name: 'Bartholomew Henderson',
    descriptor: 'Dark blue sidebar with white main',
    accent: 'from-blue-900 to-blue-950'
  },
  {
    id: 'catrine-ziv',
    name: 'Catrine Ziv',
    descriptor: 'Professional two-column with dark green-grey sidebar',
    accent: 'from-green-700 to-green-900'
  },
  {
    id: 'olivia-wilson-dark-blue',
    name: 'Olivia Wilson Dark Blue',
    descriptor: 'Professional two-column with dark blue-grey sidebar',
    accent: 'from-blue-800 to-blue-900'
  },
  {
    id: 'phylis-flex',
    name: 'Phylis Flex',
    descriptor: 'Clean design with light gray header',
    accent: 'from-gray-300 to-gray-500'
  }
];

const jobExamples = [
  {
    title: 'Senior Backend Engineer',
    description:
      'Acme Corp needs a backend lead to harden Node.js microservices powering fintech payments. Responsibilities include mentoring 4 engineers, owning scalability KPIs, and partnering with DevOps for AWS/GCP. Required: 5+ years Node.js, MongoDB, Kafka, AWS, plus compliance exposure.'
  },
  {
    title: 'Product Designer - Fintech',
    description:
      'Lumina Bank is hiring a product designer to ship responsive onboarding flows. Collaborate with PM + Eng, run usability testing, and deliver polished Figma specs. Must know design systems, accessibility, and metrics-driven experimentation.'
  },
  {
    title: 'Data Analyst - Growth',
    description:
      'Northwind Ventures seeks a data analyst to map funnel drop-offs and build dashboards. Role owns SQL, Python notebooks, and Looker models; stakeholder communication is key. Highlight experiment design, attribution, and revenue insight experience.'
  }
];

export default function JobTailoredResume() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resumeId: '',
    jobUrl: '',
    jobDescription: '',
    template: templateOptions[0].id
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [requestMeta, setRequestMeta] = useState(null);
  const [resumeOptions, setResumeOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const selectedTemplate = useMemo(
    () => templateOptions.find(template => template.id === formData.template) ?? templateOptions[0],
    [formData.template]
  );
  const selectedBaseOption = useMemo(
    () => resumeOptions.find(option => option.id === formData.resumeId),
    [resumeOptions, formData.resumeId]
  );

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

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResumeChange = value => {
    const option = resumeOptions.find(opt => opt.id === value);
    setFormData(prev => ({
      ...prev,
      resumeId: value,
      template: option?.template || prev.template || templateOptions[0].id
    }));
  };

  useEffect(() => {
    let isMounted = true;
    const loadOptions = async () => {
      try {
        setOptionsLoading(true);
        setOptionsError(null);
        const options = await resumeApi.getResumeOptions();
        if (!isMounted) return;
        setResumeOptions(options);
        if (options.length) {
          setFormData(prev => ({
            ...prev,
            resumeId: prev.resumeId || options[0].id,
            template: prev.template || options[0].template || templateOptions[0].id
          }));
        }
      } catch (err) {
        if (!isMounted) return;
        const message = err.message || 'Failed to load resume options.';
        setOptionsError(message);
        toast.error(message);
      } finally {
        if (isMounted) setOptionsLoading(false);
      }
    };
    loadOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!formData.resumeId) {
      const message = 'Select a base resume to tailor.';
      setError(message);
      toast.error(message);
      return;
    }

    if (!formData.jobUrl.trim() && !formData.jobDescription.trim()) {
      const message = 'Provide either a job URL or the job description text.';
      setError(message);
      toast.error(message);
      return;
    }

    const startedAt = performance.now();
    setLoading(true);
    setRequestMeta({ startedAt });

    try {
      const data = await resumeApi.generateJobTailoredResume({
        resumeId: formData.resumeId,
        jobUrl: formData.jobUrl.trim(),
        jobDescription: formData.jobDescription.trim(),
        template: formData.template
      });

      setResult(data);
      setRequestMeta({
        startedAt,
        finishedAt: performance.now(),
        viaUrl: Boolean(formData.jobUrl.trim()),
        viaDescription: Boolean(formData.jobDescription.trim())
      });
      toast.success('Tailored resume saved. Review differences vs the selected base resume.');
    } catch (err) {
      const failureMeta = {
        startedAt,
        finishedAt: performance.now(),
        failed: true
      };
      setRequestMeta(failureMeta);
      setResult(null);
      setError(err.message || 'Failed to generate a job-tailored resume.');
      toast.error(err.message || 'Failed to generate a job-tailored resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      resumeId: resumeOptions[0]?.id || '',
      jobUrl: '',
      jobDescription: '',
      template: resumeOptions[0]?.template || templateOptions[0].id
    });
    setResult(null);
    setError(null);
    setRequestMeta(null);
  };

  const durationSeconds =
    requestMeta?.finishedAt && requestMeta?.startedAt
      ? Math.max(0, requestMeta.finishedAt - requestMeta.startedAt) / 1000
      : null;

  const resume = result?.resume;
  const jobDetails = result?.jobDetails;
  const displaySkills = Array.isArray(resume?.skills) ? resume.skills.slice(0, 6) : [];
  const topRequirements = Array.isArray(jobDetails?.requirements) ? jobDetails.requirements.slice(0, 4) : [];

  const resolvedTemplateLabel = useMemo(() => {
    if (resume?.template) {
      const match = templateOptions.find(option => option.id === resume.template);
      return match?.name || resume.template;
    }
    return selectedTemplate.name;
  }, [resume?.template, selectedTemplate.name]);

  const isSubmitDisabled = loading || optionsLoading || !formData.resumeId;
  const baseUpdatedLabel = selectedBaseOption?.updatedAt
    ? new Date(selectedBaseOption.updatedAt).toLocaleString()
    : null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <ToastContainer position="bottom-right" theme="dark" />

      <div className="relative z-10">
        <LandingHeader />

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
          <header className="text-center space-y-5">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Your resume, precisely tailored to the role.
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Feed us a live job posting (URL or pasted text), pick a base resume, and Resumify scrapes it, rewrites every section like a recruiter, and stores the brand-new record instantly. Contact info inherits from the selected resume so edits stay consistent.
            </p>

          </header>

          <SpotlightCard className="p-8 bg-white/5 border-white/10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">Request blueprint</p>
                  <h2 className="text-2xl font-semibold mt-2">Job Intelligence</h2>
                </div>
                {durationSeconds && (
                  <div className="ml-auto flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 bg-white/5">
                    <Sparkles size={18} className="text-white" />
                    Turnaround {durationSeconds.toFixed(1)}s
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-widest text-white/60">Base resume</p>
                  {optionsLoading ? (
                    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/70">
                      Loading stored resumes...
                    </div>
                  ) : resumeOptions.length ? (
                    <>
                      <select
                        value={formData.resumeId}
                        onChange={e => handleResumeChange(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-2xl border border-white/15 bg-black/70 px-4 py-3 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      >
                        {resumeOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="text-xs text-white/60 flex flex-col gap-1">
                        {selectedBaseOption?.template && (
                          <span>Template suggestion: {selectedBaseOption.template}</span>
                        )}
                        {baseUpdatedLabel && <span>Last updated {baseUpdatedLabel}</span>}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                      No saved resumes found. Create one in the dashboard first to unlock job tailoring.
                    </div>
                  )}
                  {optionsError && (
                    <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-2xl px-4 py-3">
                      {optionsError}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <label className="text-sm uppercase tracking-widest text-white/60 flex items-center gap-2">
                      <Link2 size={16} /> Job URL
                    </label>
                    <Input
                      value={formData.jobUrl}
                      onChange={e => handleFormChange('jobUrl', e.target.value)}
                      placeholder="https://jobs.bdjobs.com/details.asp?id=123456"
                      className="bg-black/70 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                    />
                    <p className="text-xs text-white/50">
                      Public postings only. We handle scraping + normalization on the backend, so no CORS worries.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm uppercase tracking-widest text-white/60 flex items-center gap-2">
                      <FileText size={16} /> Job Description Text
                    </label>
                    <Textarea
                      rows={6}
                      value={formData.jobDescription}
                      onChange={e => handleFormChange('jobDescription', e.target.value)}
                      placeholder="Paste responsibilities, requirements, or keywords here..."
                      className="bg-black/70 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                    />
                    <p className="text-xs text-white/50">Leave blank if the URL already covers it.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-widest text-white/60">Template</p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {templateOptions.map(option => (
                      <div
                        key={option.id}
                        className={`group rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-lg hover:shadow-xl ${
                          formData.template === option.id
                            ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* Template Preview Image/Placeholder */}
                        <div className={`relative w-full h-32 bg-gradient-to-br ${option.accent} flex items-center justify-center`}>
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
                          {formData.template === option.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-5">
                          <h3 className="text-base font-bold text-gray-900 mb-1 text-center">{option.name}</h3>
                          <p className="text-sm text-gray-600 mb-4 text-center">{option.descriptor}</p>
                          
                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreviewTemplate(option.id);
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
                              type="button"
                              onClick={() => handleFormChange('template', option.id)}
                              className={`px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center ${
                                formData.template === option.id
                                  ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {formData.template === option.id ? '✓ Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-widest text-white/60">Need inspiration?</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {jobExamples.map(example => (
                      <AnimatedCard key={example.title} className="p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-white/60 uppercase tracking-widest">{example.title}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleFormChange('jobDescription', example.description)}
                            className="text-xs uppercase tracking-widest text-white border border-white/20 rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
                          >
                            Use
                          </button>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{example.description}</p>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-2xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-4">
                  <AnimatedButton type="submit" disabled={isSubmitDisabled} className="px-8 py-4 text-base">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Linking job data...
                      </>
                    ) : (
                      <>
                        <ClipboardList size={18} />
                        Generate tailored resume
                      </>
                    )}
                  </AnimatedButton>
                  <AnimatedButton
                    type="button"
                    onClick={handleReset}
                    disabled={loading || optionsLoading}
                    variant="secondary"
                    className="px-8 py-4 text-base"
                  >
                    <RefreshCw size={18} />
                    Reset form
                  </AnimatedButton>
                </div>
              </form>
            </div>
          </SpotlightCard>

          {result && (
            <section className="space-y-6" aria-live="polite">
              <div className="grid gap-6 lg:grid-cols-2">
                <SpotlightCard className="p-8 bg-white/5 border-white/10">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/50">Resume snapshot</p>
                    <h3 className="text-2xl font-semibold">
                      {resume?.name || 'New Resume'} / {resolvedTemplateLabel}
                    </h3>
                    <p className="text-white/70">{resume?.summary}</p>
                    <p className="text-xs text-white/60">
                      Contact info carries over from the chosen resume, while summary, experience, education, projects, and skills are rewritten for this job posting.
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 mt-4 text-sm text-white/80">
                      {resume?.email && (
                        <div className="flex items-center gap-2">
                          <Link2 size={16} />
                          <span>{resume.email}</span>
                        </div>
                      )}
                      {resume?.phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIconFallback />
                          <span>{resume.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} />
                        <span>{resolvedTemplateLabel} template</span>
                      </div>
                      {durationSeconds && (
                        <div className="flex items-center gap-2">
                          <TimerIconFallback />
                          <span>{durationSeconds.toFixed(1)}s end-to-end</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {displaySkills.map(skill => (
                        <span
                          key={skill?.name || skill}
                          className="text-xs uppercase tracking-widest border border-white/20 rounded-full px-3 py-1 text-white/80"
                        >
                          {skill?.name || skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 pt-6">
                      <AnimatedButton
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        variant="purple"
                        className="px-6 py-3 text-base"
                      >
                        View in dashboard
                        <ExternalLink size={18} />
                      </AnimatedButton>
                      <AnimatedButton
                        type="button"
                        onClick={() => {
                          setResult(null);
                          setRequestMeta(null);
                          setError(null);
                        }}
                        variant="secondary"
                        className="px-6 py-3 text-base"
                      >
                        Generate another
                      </AnimatedButton>
                    </div>
                  </div>
                </SpotlightCard>

                <div className="grid gap-6">
                  <AnimatedCard className="p-6">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <ClipboardList size={18} />
                      Job details pulled in
                    </h4>
                    {jobDetails ? (
                      <div className="space-y-3 text-sm text-white/70 mt-4">
                        {jobDetails.title && <DetailLine label="Title" value={jobDetails.title} />}
                        {jobDetails.company && <DetailLine label="Company" value={jobDetails.company} />}
                        {jobDetails.location && <DetailLine label="Location" value={jobDetails.location} />}
                        {jobDetails.source && (
                          <DetailLine
                            label="Source"
                            value={
                              <a href={jobDetails.source} target="_blank" rel="noreferrer" className="underline">
                                {jobDetails.source}
                              </a>
                            }
                          />
                        )}
                        {jobDetails.experienceLevel && (
                          <DetailLine label="Experience" value={jobDetails.experienceLevel} />
                        )}
                        {topRequirements.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Requirements</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              {topRequirements.map(req => (
                                <li key={req}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-white/60 mt-4">No structured job details returned.</p>
                    )}
                  </AnimatedCard>
                </div>
              </div>
            </section>
          )}
        </section>
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
                <p className="text-sm text-white/70">{templateOptions.find(t => t.id === previewTemplate)?.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleFormChange('template', previewTemplate);
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

const DetailLine = ({ label, value }) => (
  <div className="flex flex-col gap-1 text-sm text-white/80">
    <span className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</span>
    <span>{value}</span>
  </div>
);

const PhoneIconFallback = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
    <path
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.05 11.05 0 003.45.55 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.05 11.05 0 00.55 3.45 1 1 0 01-.24 1.01l-2.2 2.33z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TimerIconFallback = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
    <path
      d="M12 8v5l3 2M9 2h6M12 22a8 8 0 100-16 8 8 0 000 16z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
