import React from 'react';

const ProfessionalTealTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="flex">
        {/* Left Column - Dark Teal/Blue Background */}
        <div className="w-1/3 relative" style={{ backgroundColor: '#2C5F5F' }}>
          {/* Profile Picture Section */}
          <div className="pt-8 pb-6 flex flex-col items-center">
            {/* Profile Picture Circle */}
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 flex items-center justify-center">
                {formData.personalInfo?.firstName ? (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-orange-300 flex items-center justify-center text-4xl font-bold text-white">
                    {formData.personalInfo.firstName.charAt(0)}{formData.personalInfo.lastName?.charAt(0) || ''}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-orange-300 flex items-center justify-center text-4xl font-bold text-white">
                    JD
                  </div>
                )}
              </div>
              {/* Decorative L-brackets */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-pink-300"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-pink-300"></div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="px-6 mb-8">
            <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4" style={{ border: '2px solid #2C5F5F' }}>
              <h3 className="text-sm font-bold uppercase text-center" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                CONTACT
              </h3>
            </div>
            <div className="space-y-3 text-white">
              {formData.personalInfo?.phone && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{formData.personalInfo.phone}</span>
                </div>
              )}
              {formData.personalInfo?.email && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{formData.personalInfo.email}</span>
                </div>
              )}
              {formData.personalInfo?.website && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span className="text-sm">{formData.personalInfo.website}</span>
                </div>
              )}
              {formData.personalInfo?.address && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-sm">{formData.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="px-6 mb-8">
            <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4" style={{ border: '2px solid #2C5F5F' }}>
              <h3 className="text-sm font-bold uppercase text-center" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                SKILLS
              </h3>
            </div>
            <div className="space-y-3">
              {formData.skills?.technical && formData.skills.technical.split(',').map((skill, index) => (
                <div key={index} className="text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.trim()}</span>
                    <span className="text-xs">90%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: '#FFB6C1', 
                        width: '90%',
                        background: 'linear-gradient(to right, #FFB6C1 90%, white 10%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              {formData.skills?.soft && formData.skills.soft.split(',').map((skill, index) => (
                <div key={`soft-${index}`} className="text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.trim()}</span>
                    <span className="text-xs">85%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: '#FFB6C1', 
                        width: '85%',
                        background: 'linear-gradient(to right, #FFB6C1 85%, white 15%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - White Background */}
        <div className="w-2/3 relative">
          {/* Diagonal White Stripe */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white transform rotate-45 origin-top-right"></div>
          
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#2C5F5F' }}>
                {formData.personalInfo?.firstName || 'HENRIETTA'} {formData.personalInfo?.lastName || 'MITCHELL'}
              </h1>
              <div className="inline-block px-4 py-2 rounded-lg" style={{ backgroundColor: '#2C5F5F' }}>
                <h2 className="text-lg font-bold text-white uppercase">
                  {formData.personalInfo?.title || 'GRAPHIC DESIGNER'}
                </h2>
              </div>
            </div>

            {/* About Me Section */}
            {formData.personalInfo?.summary && (
              <div className="mb-8">
                <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4 inline-block" style={{ border: '2px solid #2C5F5F' }}>
                  <h3 className="text-sm font-bold uppercase text-white" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                    ABOUT ME
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {formData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Education Section */}
            {formData.education?.school && (
              <div className="mb-8">
                <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4 inline-block" style={{ border: '2px solid #2C5F5F' }}>
                  <h3 className="text-sm font-bold uppercase text-white" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                    EDUCATION
                  </h3>
                </div>
                <div className="flex">
                  <div className="flex-1 pr-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {formData.education.graduationYear || '2010 - 2012'}
                    </div>
                    <div className="font-bold text-gray-800 mb-1">
                      {formData.education.school}
                    </div>
                    <div className="text-sm text-gray-700">
                      {formData.education.degree}
                    </div>
                  </div>
                  <div className="w-px bg-pink-300 mx-4"></div>
                  <div className="flex-1 pl-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {formData.education.graduationYear || '2010 - 2012'}
                    </div>
                    <div className="font-bold text-gray-800 mb-1">
                      {formData.education.school}
                    </div>
                    <div className="text-sm text-gray-700">
                      {formData.education.degree}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
              <div className="mb-8">
                <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4 inline-block" style={{ border: '2px solid #2C5F5F' }}>
                  <h3 className="text-sm font-bold uppercase text-white" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                    WORK EXPERIENCE
                  </h3>
                </div>
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2C5F5F' }}></div>
                        {index < formData.experience.length - 1 && (
                          <div className="w-px h-16 mt-2" style={{ backgroundColor: '#FFB6C1' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 mb-1">
                          {exp.position}
                        </div>
                        <div className="font-bold text-gray-800 mb-1">
                          {exp.company}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                        {exp.description && (
                          <div className="text-sm text-gray-700">
                            <ul className="list-disc list-inside space-y-1">
                              {exp.description.split('.').filter(item => item.trim()).map((item, idx) => (
                                <li key={idx}>{item.trim()}.</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
              <div className="mb-8">
                <div className="bg-white transform -skew-x-12 px-4 py-2 mb-4 inline-block" style={{ border: '2px solid #2C5F5F' }}>
                  <h3 className="text-sm font-bold uppercase text-white" style={{ color: '#2C5F5F', transform: 'skewX(12deg)' }}>
                    PROJECTS
                  </h3>
                </div>
                <div className="space-y-4">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2C5F5F' }}></div>
                        {index < formData.projects.length - 1 && (
                          <div className="w-px h-16 mt-2" style={{ backgroundColor: '#FFB6C1' }}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 mb-1">
                          {project.name}
                        </div>
                        {project.description && (
                          <div className="text-sm text-gray-700 mb-2">
                            {project.description}
                          </div>
                        )}
                        {project.technologies && (
                          <div className="text-sm text-gray-500">
                            <strong>Technologies:</strong> {project.technologies}
                          </div>
                        )}
                      </div>
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

export default ProfessionalTealTemplate;
