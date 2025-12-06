import React from 'react';

const ProfessionalDarkTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <div className="bg-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            {formData.personalInfo?.firstName || ''} {formData.personalInfo?.lastName || ''}
          </h1>
          {formData.personalInfo?.title && (
            <p className="text-xl text-yellow-400 mb-6">{formData.personalInfo.title}</p>
          )}
          
          {/* Contact Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {formData.personalInfo?.email && (
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {formData.personalInfo.email}
              </div>
            )}
            {formData.personalInfo?.phone && (
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {formData.personalInfo.phone}
              </div>
            )}
            {formData.personalInfo?.linkedin && (
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {formData.personalInfo.linkedin}
              </div>
            )}
            {formData.personalInfo?.website && (
              <div className="flex items-center text-gray-300">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                {formData.personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Professional Summary */}
        {formData.personalInfo?.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">Professional Summary</h2>
            <p className="text-gray-300 leading-relaxed">{formData.personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* Skills */}
            {(formData.skills?.technical || formData.skills?.soft) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Skills</h3>
                {formData.skills?.technical && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Technical</h4>
                    <p className="text-sm text-gray-300">{formData.skills.technical}</p>
                  </div>
                )}
                {formData.skills?.soft && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Soft Skills</h4>
                    <p className="text-sm text-gray-300">{formData.skills.soft}</p>
                  </div>
                )}
              </div>
            )}

            {/* Education */}
            {formData.education?.school && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Education</h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white">{formData.education.degree}</h4>
                  <p className="text-gray-400">{formData.education.school}</p>
                  {formData.education.graduationYear && (
                    <p className="text-sm text-gray-500">{formData.education.graduationYear}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Experience */}
            {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Experience</h3>
                <div className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-bold text-white">{exp.position}</h4>
                      <p className="text-yellow-400 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-400 mb-2">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-gray-300 text-sm">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Projects</h3>
                <div className="space-y-4">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-white">{project.name}</h4>
                      {project.description && (
                        <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                      )}
                      {project.technologies && (
                        <p className="text-yellow-400 text-sm mt-2 font-medium">{project.technologies}</p>
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

export default ProfessionalDarkTemplate;
