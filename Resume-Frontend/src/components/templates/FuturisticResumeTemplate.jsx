import React from 'react';

const FuturisticResumeTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-cyan-400 opacity-20 rotate-45"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-blue-400 opacity-30 transform rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                {formData.personalInfo?.firstName || ''} {formData.personalInfo?.lastName || ''}
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"></div>
            </div>
            
            {/* QR Code Placeholder */}
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg border border-cyan-400/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded grid grid-cols-4 gap-0.5 p-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`w-full h-full rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              {formData.personalInfo?.email && (
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-300">{formData.personalInfo.email}</span>
                </div>
              )}

              {formData.personalInfo?.phone && (
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-300">{formData.personalInfo.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {formData.personalInfo?.linkedin && (
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-300">{formData.personalInfo.linkedin}</span>
                </div>
              )}

              {formData.personalInfo?.website && (
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-300">{formData.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {formData.personalInfo?.summary && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-cyan-400">PROFESSIONAL SUMMARY</h2>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20">
              <p className="text-lg leading-relaxed text-gray-300">{formData.personalInfo.summary}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skills */}
          <div className="lg:col-span-1">
            {/* Skills & Expertise */}
            {(formData.skills?.technical || formData.skills?.soft) && (
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">SKILLS</h3>
                </div>
                <div className="space-y-4">
                  {formData.skills?.technical && (
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">Technical</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.technical.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.skills?.soft && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wide">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.soft.split(',').map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full text-sm text-blue-300">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {formData.education?.school && (
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-400">EDUCATION</h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-indigo-400/20">
                  <h4 className="text-lg font-bold text-white mb-2">{formData.education.degree}</h4>
                  <p className="text-cyan-300 font-medium mb-1">{formData.education.school}</p>
                  {formData.education.graduationYear && (
                    <p className="text-gray-400 text-sm">{formData.education.graduationYear}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Experience & Projects */}
          <div className="lg:col-span-2">
            {/* Work Experience */}
            {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-purple-400">EXPERIENCE</h2>
                </div>
                <div className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                          <p className="text-purple-300 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-cyan-300 font-medium">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notable Projects */}
            {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-pink-400">PROJECTS</h2>
                </div>
                <div className="space-y-6">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="bg-gradient-to-r from-pink-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                      {project.description && (
                        <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>
                      )}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split(',').map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-400/30 rounded-full text-sm text-pink-300">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticResumeTemplate;
