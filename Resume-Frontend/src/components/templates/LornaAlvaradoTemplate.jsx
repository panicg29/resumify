import React from 'react';

const LornaAlvaradoTemplate = ({ formData }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="flex">
        {/* Left Column - Light Blue Background */}
        <div className="w-1/3 relative" style={{ backgroundColor: '#E8F4FD' }}>
          {/* Profile Picture and Name Section */}
          <div className="pt-8 pb-6 px-6">
            {/* Profile Picture with Blue Background */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-300 flex items-center justify-center" style={{ backgroundColor: '#B8D4F0' }}>
                {formData.personalInfo?.firstName ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                    {formData.personalInfo.firstName.charAt(0)}{formData.personalInfo.lastName?.charAt(0) || ''}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                    LA
                  </div>
                )}
              </div>
              {/* Decorative wave shape */}
              <div className="absolute -top-2 -right-2 w-16 h-16 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M10,50 Q30,20 50,50 T90,50" stroke="#3B82F6" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#1E40AF' }}>
                {formData.personalInfo?.firstName || 'LORNA'} {formData.personalInfo?.lastName || 'ALVARADO'}
              </h1>
              <h2 className="text-lg text-gray-600">
                {formData.personalInfo?.title || 'MARKETING MANAGER'}
              </h2>
            </div>
          </div>

          {/* Contact Section */}
          <div className="px-6 mb-6">
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {formData.personalInfo?.phone && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {formData.personalInfo.phone}
                  </div>
                )}
                {formData.personalInfo?.email && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {formData.personalInfo.email}
                  </div>
                )}
                {formData.personalInfo?.address && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {formData.personalInfo.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Me Section */}
          {formData.personalInfo?.summary && (
            <div className="px-6 mb-6">
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  About Me
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {formData.personalInfo.summary}
                </p>
              </div>
            </div>
          )}

          {/* Skills Section */}
          {(formData.skills?.technical || formData.skills?.soft) && (
            <div className="px-6 mb-6">
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Skills
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {formData.skills?.technical && formData.skills.technical.split(',').map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {skill.trim()}
                    </li>
                  ))}
                  {formData.skills?.soft && formData.skills.soft.split(',').map((skill, index) => (
                    <li key={`soft-${index}`} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {skill.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - White Background */}
        <div className="w-2/3 relative bg-white">
          <div className="p-8">
            {/* Education Section */}
            {formData.education?.school && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-600 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-8 flex flex-col items-center mr-6">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                      <div className="w-0.5 h-16 mt-2" style={{ backgroundColor: '#3B82F6' }}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-800 mb-1">
                            {formData.education.degree}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {formData.education.school}
                          </div>
                          <p className="text-sm text-gray-700">
                            {formData.education.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formData.education.graduationYear || '2016 - 2020'}
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
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-sm font-bold text-gray-600 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-2V4c0-1.11-.89-2-2-2H8c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM8 4h8v2H8V4zm12 15H4V8h16v11z" />
                    </svg>
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="flex">
                        <div className="w-8 flex flex-col items-center mr-6">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                          {index < formData.experience.length - 1 && (
                            <div className="w-0.5 h-16 mt-2" style={{ backgroundColor: '#3B82F6' }}></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-gray-800 mb-1">
                                {exp.position}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {exp.company}
                              </div>
                              <p className="text-sm text-gray-700">
                                {exp.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* References Section */}
            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-sm font-bold text-gray-600 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                </svg>
                References
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <div className="font-bold text-gray-800 mb-1">Harumi Kobayashi</div>
                  <div className="text-gray-600 mb-1">Wardiere Inc. / CEO</div>
                  <div className="text-gray-500">Phone: 123-456-7890</div>
                  <div className="text-gray-500">Email: hello@reallygreatsite.com</div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-800 mb-1">Bailey Dupont</div>
                  <div className="text-gray-600 mb-1">Wardiere Inc. / CEO</div>
                  <div className="text-gray-500">Phone: 123-456-7890</div>
                  <div className="text-gray-500">Email: hello@reallygreatsite.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LornaAlvaradoTemplate;
