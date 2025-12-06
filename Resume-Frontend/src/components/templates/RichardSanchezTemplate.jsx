import React from 'react';

const RichardSanchezTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="flex">
        {/* Left Column - Dark Gray Background */}
        <div className="w-1/3 relative" style={{ backgroundColor: '#2C2C2C' }}>
          {/* Profile Picture and Name Section */}
          <div className="pt-8 pb-6 px-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 bg-gray-300 flex items-center justify-center">
              {formData.personalInfo?.firstName ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                  {formData.personalInfo.firstName.charAt(0)}{formData.personalInfo.lastName?.charAt(0) || ''}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                  RS
                </div>
              )}
            </div>
            
            {/* Name and Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                {formData.personalInfo?.firstName || 'RICHARD'} {formData.personalInfo?.lastName || 'SANCHEZ'}
              </h1>
              <h2 className="text-lg text-white">
                {formData.personalInfo?.title || 'UI/UX DESIGNER'}
              </h2>
            </div>
          </div>

          {/* Skills Section */}
          <div className="px-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">SKILLS</h3>
            <ul className="space-y-2 text-white">
              {formData.skills?.technical && formData.skills.technical.split(',').map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <span className="text-sm">{skill.trim()}</span>
                </li>
              ))}
              {formData.skills?.soft && formData.skills.soft.split(',').map((skill, index) => (
                <li key={`soft-${index}`} className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <span className="text-sm">{skill.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages Section */}
          <div className="px-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">LANGUAGES</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                <span className="text-sm">English</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                <span className="text-sm">Spanish</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Light Gray Background */}
        <div className="w-2/3 relative" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="p-8">
            {/* Profile Section */}
            {formData.personalInfo?.summary && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-black mb-4">PROFILE</h3>
                <p className="text-gray-700 leading-relaxed">
                  {formData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Education Section */}
            {formData.education?.school && (
              <div className="mb-8">
                <div className="flex">
                  <div className="w-8 flex flex-col items-center mr-6">
                    <div className="w-1 h-8 bg-black"></div>
                    <h3 className="text-lg font-bold text-black transform -rotate-90 whitespace-nowrap mt-4" style={{ writingMode: 'vertical-rl' }}>
                      EDUCATION
                    </h3>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {formData.education.graduationYear || '2001 - 2004'}
                        </div>
                        <div className="font-bold text-gray-800">
                          {formData.education.degree}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formData.education.school}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Section */}
            {formData.experience && formData.experience.length > 0 && formData.experience[0].company && (
              <div className="mb-8">
                <div className="flex">
                  <div className="w-8 flex flex-col items-center mr-6">
                    <div className="w-1 h-32 bg-black"></div>
                    <h3 className="text-lg font-bold text-black transform -rotate-90 whitespace-nowrap mt-4" style={{ writingMode: 'vertical-rl' }}>
                      EXPERIENCE
                    </h3>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-4">
                      {formData.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="text-sm text-gray-500 mb-1">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.position}
                          </div>
                          <div className="font-bold text-gray-800 mb-2">
                            {exp.company}
                          </div>
                          {exp.description && (
                            <div className="text-sm text-gray-700">
                              {exp.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orange Footer */}
      <div className="w-full py-6 px-8" style={{ backgroundColor: '#FF6B35' }}>
        <h3 className="text-lg font-bold text-white mb-4">CONTACT</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
          {formData.personalInfo?.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">{formData.personalInfo.phone}</span>
            </div>
          )}
          {formData.personalInfo?.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{formData.personalInfo.email}</span>
            </div>
          )}
          {formData.personalInfo?.website && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span className="text-sm">{formData.personalInfo.website}</span>
            </div>
          )}
          {formData.personalInfo?.address && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-sm">{formData.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichardSanchezTemplate;
