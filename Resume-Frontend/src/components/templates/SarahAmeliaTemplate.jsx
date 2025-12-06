import React from 'react';

const SarahAmeliaTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section with Monogram */}
      <div className="relative bg-white pt-8 pb-6 px-8">
        <div className="text-center relative">
          {/* Large Monogram Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-bold opacity-10" style={{ color: '#F8BBD9' }}>
              {formData.personalInfo?.firstName?.charAt(0) || 'S'}{formData.personalInfo?.lastName?.charAt(0) || 'A'}
            </div>
          </div>
          
          {/* Name and Title */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {formData.personalInfo?.firstName || 'SARAH'} {formData.personalInfo?.lastName || 'AMELIA'}
            </h1>
            <h2 className="text-xl text-gray-600">
              {formData.personalInfo?.title || 'WEB DEVELOPER'}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Column - Light Beige Background */}
        <div className="w-1/3 relative" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="p-8">
            {/* Contact Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">CONTACT</h3>
              <div className="space-y-3 text-sm text-gray-700">
                {formData.personalInfo?.phone && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {formData.personalInfo.phone}
                  </div>
                )}
                {formData.personalInfo?.email && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {formData.personalInfo.email}
                  </div>
                )}
                {formData.personalInfo?.address && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {formData.personalInfo.address}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            {formData.education?.school && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">EDUCATION</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">SECONDARY SCHOOL</div>
                    <div className="font-bold text-gray-800 mb-1">
                      {formData.education.school}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formData.education.graduationYear || '2010 - 2014'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">BACHELOR OF TECHNOLOGY</div>
                    <div className="font-bold text-gray-800 mb-1">
                      {formData.education.school}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formData.education.graduationYear || '2014 - 2016'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {(formData.skills?.technical || formData.skills?.soft) && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">SKILLS</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {formData.skills?.technical && formData.skills.technical.split(',').map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                      {skill.trim()}
                    </div>
                  ))}
                  {formData.skills?.soft && formData.skills.soft.split(',').map((skill, index) => (
                    <div key={`soft-${index}`} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - White Background */}
        <div className="w-2/3 relative bg-white">
          <div className="p-8">
            {/* Summary Section */}
            {formData.personalInfo?.summary && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">SUMMARY</h3>
                <p className="text-gray-700 leading-relaxed">
                  {formData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience Section */}
            {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6">EXPERIENCE</h3>
                <div className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="font-bold text-gray-800 text-lg mb-2">
                        {exp.position}:
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Company:</span> {exp.company}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-semibold">Dates:</span> {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                      {exp.description && (
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          {exp.description.split('.').filter(item => item.trim()).map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {item.trim()}.
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6">PROJECTS</h3>
                <div className="space-y-6">
                  {formData.projects.map((project, index) => (
                    <div key={index}>
                      <div className="font-bold text-gray-800 text-lg mb-2">
                        {project.name}:
                      </div>
                      {project.description && (
                        <p className="text-sm text-gray-700 mb-2">
                          {project.description}
                        </p>
                      )}
                      {project.technologies && (
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Technologies:</span> {project.technologies}
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

export default SarahAmeliaTemplate;
