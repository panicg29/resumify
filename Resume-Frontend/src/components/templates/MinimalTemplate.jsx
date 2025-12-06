import React from 'react';

const MinimalTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12 border-b border-gray-300 pb-8">
          <h1 className="text-5xl font-light text-gray-900 mb-2">
            {formData.personalInfo?.firstName || ''} {formData.personalInfo?.lastName || ''}
          </h1>
          {formData.personalInfo?.title && (
            <p className="text-xl text-gray-600 mb-6">{formData.personalInfo.title}</p>
          )}
          
          {/* Contact Information */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {formData.personalInfo?.email && (
              <span>{formData.personalInfo.email}</span>
            )}
            {formData.personalInfo?.phone && (
              <span>{formData.personalInfo.phone}</span>
            )}
            {formData.personalInfo?.linkedin && (
              <span>{formData.personalInfo.linkedin}</span>
            )}
            {formData.personalInfo?.website && (
              <span>{formData.personalInfo.website}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {formData.personalInfo?.summary && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{formData.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Experience</h2>
            <div className="space-y-8">
              {formData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.education?.school && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Education</h2>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{formData.education.degree}</h3>
              <p className="text-gray-600">{formData.education.school}</p>
              {formData.education.graduationYear && (
                <p className="text-sm text-gray-500">{formData.education.graduationYear}</p>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {(formData.skills?.technical || formData.skills?.soft) && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.skills?.technical && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Technical</h3>
                  <p className="text-gray-700">{formData.skills.technical}</p>
                </div>
              )}
              {formData.skills?.soft && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Soft Skills</h3>
                  <p className="text-gray-700">{formData.skills.soft}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-800 mb-6">Projects</h2>
            <div className="space-y-6">
              {formData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 mt-1">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-sm text-gray-500 mt-2">{project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
