import React from 'react';
import EditableText from '../EditableText';

const OliviaWilsonTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '',
    email = '',
    phone = '',
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = [],
    location = '',
    role = ''
  } = formData;

  // Color scheme: Light peach/beige sidebar, off-white main, dark brown/black text
  const peachBg = '#F5E6D3'; // Light peach/beige for left sidebar
  const offWhite = '#FAF9F6'; // Off-white for right column
  const textDark = '#2C2C2C'; // Dark brown/black for text
  const textMedium = '#4A4A4A'; // Medium gray for dates
  const peachAccent = '#E8D5C4'; // Light peach accent for bullets

  // Format experience dates
  const formatExperienceDate = (exp) => {
    if (!exp.startDate && !exp.endDate) return '';
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || '');
    if (start && end) {
      return `${start} - ${end}`;
    }
    return start || end;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (!edu.year) return '';
    if (typeof edu.year === 'string' && edu.year.includes('-')) {
      return edu.year;
    }
    if (typeof edu.year === 'number') {
      return `${edu.year - 3} - ${edu.year}`;
    }
    return String(edu.year);
  };

  // Get languages from skills or use default
  const languages = skills.filter(skill => 
    ['English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Italian', 'Portuguese'].includes(skill.name)
  );

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex relative"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: offWhite }}
    >
      {/* Decorative Geometric Shapes - Top Right */}
      <div className="absolute top-0 right-0 z-0">
        <div 
          className="w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: peachBg, transform: 'translate(20px, -20px)' }}
        ></div>
        <div 
          className="w-24 h-24 rounded-full opacity-15"
          style={{ backgroundColor: peachAccent, transform: 'translate(40px, -10px)' }}
        ></div>
      </div>

      {/* Left Column - Light Peach/Beige Background */}
      <div 
        className="w-[35%] p-6 flex flex-col relative z-10"
        style={{ backgroundColor: peachBg }}
      >
        {/* Contact Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'none'
            }}
          >
            Contact
          </h3>
          <div className="space-y-2 text-sm" style={{ color: textDark }}>
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="-123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="hello@reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="123 Anywhere St., Any City, ST 12345"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
          </div>
        </div>

        {/* About Me Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'none'
            }}
          >
            About Me
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: textDark }}>
            <EditableText
              value={summary || ''}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textDark }}
              multiline
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'none'
            }}
          >
            Skills
          </h3>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
            {skills && skills.length > 0 ? (
              skills.slice(0, 10).map((skill, index) => (
                <li key={index}>
                  <EditableText
                    value={skill.name || ''}
                    placeholder={`Skill ${index + 1}`}
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    style={{ color: textDark }}
                  />
                </li>
              ))
            ) : (
              <>
                <li>Management Skills</li>
                <li>Creativity</li>
                <li>Teamwork</li>
                <li>Negotiation</li>
                <li>Critical Thinking</li>
                <li>Leadership</li>
                <li>Branding</li>
              </>
            )}
          </ul>
        </div>

        {/* Language Section */}
        <div>
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'none'
            }}
          >
            Language
          </h3>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
            {languages && languages.length > 0 ? (
              languages.slice(0, 3).map((lang, index) => (
                <li key={index}>
                  <EditableText
                    value={lang.name || ''}
                    placeholder={`Language ${index + 1}`}
                    editable={editable}
                    onChange={(val) => {
                      const skillIndex = skills.findIndex(s => s.name === lang.name);
                      if (skillIndex >= 0) {
                        onChange(`skills.${skillIndex}.name`, val);
                      }
                    }}
                    style={{ color: textDark }}
                  />
                </li>
              ))
            ) : (
              <>
                <li>Spanish</li>
                <li>English</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Right Column - Off-White Background */}
      <div className="flex-1 p-8 relative z-10" style={{ backgroundColor: offWhite }}>
        {/* Name and Title */}
        <div className="mb-8 mt-4">
          <h1 
            className="text-5xl font-bold mb-2"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              letterSpacing: '-1px'
            }}
          >
            <EditableText
              value={name || ''}
              placeholder="Olivia Wilson"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              style={{ color: textDark }}
            />
          </h1>
          <p 
            className="text-xl"
            style={{ 
              color: textDark,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'normal'
            }}
          >
            <EditableText
              value={role || ''}
              placeholder="Marketing Manager"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textDark }}
            />
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke={textDark} 
              viewBox="0 0 24 24"
              style={{ width: '20px', height: '20px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M4 9v9a2 2 0 002 2h12a2 2 0 002-2V9" />
            </svg>
            <h3 
              className="text-base font-bold"
              style={{ 
                color: textDark,
                fontFamily: 'Georgia, serif',
                textTransform: 'none'
              }}
            >
              Education
            </h3>
          </div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    {index < education.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 mt-1"
                        style={{ backgroundColor: peachAccent, minHeight: '40px' }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div 
                        className="text-sm font-bold"
                        style={{ color: textDark }}
                      >
                        <EditableText
                          value={edu.degree || ''}
                          placeholder="Bachelor of Business Management"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.degree`, val)}
                          style={{ color: textDark }}
                        />
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: textMedium }}
                      >
                        {formatEducationYear(edu)}
                      </div>
                    </div>
                    <div 
                      className="text-sm mb-2"
                      style={{ color: textDark }}
                    >
                      <EditableText
                        value={edu.institution || ''}
                        placeholder="Borcelle University"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.institution`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    <div 
                      className="text-xs leading-relaxed"
                      style={{ color: textMedium }}
                    >
                      <EditableText
                        value={edu.gpa ? `GPA: ${edu.gpa}` : ''}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.gpa`, val.replace('GPA: ', ''))}
                        style={{ color: textMedium }}
                        multiline
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    <div 
                      className="w-0.5 flex-1 mt-1"
                      style={{ backgroundColor: peachAccent, minHeight: '40px' }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold" style={{ color: textDark }}>Bachelor of Business Management</div>
                      <div className="text-sm" style={{ color: textMedium }}>2016 - 2020</div>
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Borcelle University</div>
                    <div className="text-xs leading-relaxed" style={{ color: textMedium }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold" style={{ color: textDark }}>Bachelor of Business Management</div>
                      <div className="text-sm" style={{ color: textMedium }}>2020 - 2023</div>
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Borcelle University</div>
                    <div className="text-xs leading-relaxed" style={{ color: textMedium }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke={textDark} 
              viewBox="0 0 24 24"
              style={{ width: '20px', height: '20px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 
              className="text-base font-bold"
              style={{ 
                color: textDark,
                fontFamily: 'Georgia, serif',
                textTransform: 'none'
              }}
            >
              Experience
            </h3>
          </div>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    {index < experience.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 mt-1"
                        style={{ backgroundColor: peachAccent, minHeight: '60px' }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div 
                        className="text-sm font-bold"
                        style={{ color: textDark }}
                      >
                        <EditableText
                          value={exp.title || ''}
                          placeholder="Product Design Manager"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.title`, val)}
                          style={{ color: textDark }}
                        />
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: textMedium }}
                      >
                        {formatExperienceDate(exp)}
                      </div>
                    </div>
                    <div 
                      className="text-sm mb-2"
                      style={{ color: textDark }}
                    >
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Arowwai Industries"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    {(exp.description || editable) && (
                      <div 
                        className="text-xs leading-relaxed"
                        style={{ color: textMedium }}
                      >
                        <EditableText
                          value={exp.description || ''}
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.description`, val)}
                          style={{ color: textMedium }}
                          multiline
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    <div 
                      className="w-0.5 flex-1 mt-1"
                      style={{ backgroundColor: peachAccent, minHeight: '60px' }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold" style={{ color: textDark }}>Product Design Manager</div>
                      <div className="text-sm" style={{ color: textMedium }}>2016 - 2020</div>
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Arowwai Industries</div>
                    <div className="text-xs leading-relaxed" style={{ color: textMedium }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    <div 
                      className="w-0.5 flex-1 mt-1"
                      style={{ backgroundColor: peachAccent, minHeight: '60px' }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold" style={{ color: textDark }}>Marketing Manager</div>
                      <div className="text-sm" style={{ color: textMedium }}>2019 - 2020</div>
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Arowwai Industries</div>
                    <div className="text-xs leading-relaxed" style={{ color: textMedium }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold" style={{ color: textDark }}>Marketing Manager</div>
                      <div className="text-sm" style={{ color: textMedium }}>2017 - 2019</div>
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Arowwai Industries</div>
                    <div className="text-xs leading-relaxed" style={{ color: textMedium }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke={textDark} 
              viewBox="0 0 24 24"
              style={{ width: '20px', height: '20px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 
              className="text-base font-bold"
              style={{ 
                color: textDark,
                fontFamily: 'Georgia, serif',
                textTransform: 'none'
              }}
            >
              Projects
            </h3>
          </div>
          <div className="space-y-4">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: peachAccent }}
                    ></div>
                    {index < projects.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 mt-1"
                        style={{ backgroundColor: peachAccent, minHeight: '40px' }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-sm font-bold mb-1"
                      style={{ color: textDark }}
                    >
                      <EditableText
                        value={project.name || ''}
                        placeholder="Project Name"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.name`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    {(project.description || editable) && (
                      <div 
                        className="text-xs leading-relaxed mb-2"
                        style={{ color: textMedium }}
                      >
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description and key achievements."
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          style={{ color: textMedium }}
                          multiline
                        />
                      </div>
                    )}
                    {(project.technologies || editable) && (
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(project.technologies) ? (
                          project.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: peachAccent + '40',
                                color: textDark
                              }}
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span 
                            className="text-xs px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: peachAccent + '40',
                              color: textDark
                            }}
                          >
                            {project.technologies || 'Technologies'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex gap-3 relative">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: peachAccent }}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1" style={{ color: textDark }}>Portfolio Website</div>
                  <div className="text-xs leading-relaxed mb-2" style={{ color: textMedium }}>
                    Designed and developed a professional portfolio website showcasing creative work and achievements.
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: peachAccent + '40',
                        color: textDark
                      }}
                    >
                      React
                    </span>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: peachAccent + '40',
                        color: textDark
                      }}
                    >
                      CSS
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* References Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke={textDark} 
              viewBox="0 0 24 24"
              style={{ width: '20px', height: '20px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 
              className="text-base font-bold"
              style={{ 
                color: textDark,
                fontFamily: 'Georgia, serif',
                textTransform: 'none'
              }}
            >
              References
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: textDark }}>Harumi Kobayashi</div>
              <div className="text-xs mb-1" style={{ color: textMedium }}>Wardiere Inc. / CEO</div>
              <div className="text-xs" style={{ color: textMedium }}>Phone: 123-456-7890</div>
              <div className="text-xs" style={{ color: textMedium }}>Email: hello@reallygreatsite.com</div>
            </div>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: textDark }}>Bailey Dupont</div>
              <div className="text-xs mb-1" style={{ color: textMedium }}>Wardiere Inc. / CEO</div>
              <div className="text-xs" style={{ color: textMedium }}>Phone: 123-456-7890</div>
              <div className="text-xs" style={{ color: textMedium }}>Email: hello@reallygreatsite.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OliviaWilsonTemplate;
