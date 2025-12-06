import React from 'react';
import EditableText from '../EditableText';

const FranciscoAndradeTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const darkBlue = '#1E3A5F'; // Dark blue header
  const lightGray = '#E5E5E5'; // Light gray sidebar
  const white = '#FFFFFF';
  const textDark = '#000000'; // Pure black for maximum visibility

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'PRESENT' : (exp.endDate || 'PRESENT');
    return `${start} - ${end}`;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (edu.year) {
      if (typeof edu.year === 'string' && edu.year.includes('-')) {
        return edu.year;
      }
      if (typeof edu.year === 'number') {
        return `${edu.year - 2} - ${edu.year}`;
      }
    }
    return '';
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex flex-col"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Header - Dark Blue */}
      <div className="p-6" style={{ backgroundColor: darkBlue, color: white }}>
        <h1 
          className="font-bold uppercase mb-2"
          style={{ fontSize: '38px', letterSpacing: '1px' }}
        >
          <EditableText
            value={name || ''}
            placeholder="FRANCISCO ANDRADE"
            editable={editable}
            onChange={(val) => onChange('name', val)}
            className="uppercase"
            style={{ color: white }}
          />
        </h1>
        <p 
          className="uppercase"
          style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}
        >
          <EditableText
            value={role || ''}
            placeholder="CREATIVE HEAD"
            editable={editable}
            onChange={(val) => onChange('role', val)}
            className="uppercase"
            style={{ color: white }}
          />
        </p>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex flex-1">
        {/* Left Sidebar - Light Gray */}
        <div className="w-[33%] p-6 flex flex-col" style={{ backgroundColor: lightGray }}>
          {/* Contact Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              CONTACT
            </h3>
            <div className="space-y-3 text-xs">
              {(phone || editable) && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textDark }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableText
                    value={phone}
                    placeholder="+123-456-7890"
                    editable={editable}
                    onChange={(val) => onChange('phone', val)}
                    style={{ fontSize: '11px', color: textDark }}
                  />
                </div>
              )}
              {(email || editable) && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textDark }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <EditableText
                    value={email}
                    placeholder="email@example.com"
                    editable={editable}
                    onChange={(val) => onChange('email', val)}
                    style={{ fontSize: '11px', color: textDark }}
                  />
                </div>
              )}
              {(location || editable) && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textDark }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <EditableText
                    value={location}
                    placeholder="City, Country"
                    editable={editable}
                    onChange={(val) => onChange('location', val)}
                    style={{ fontSize: '11px', color: textDark }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textDark }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span style={{ fontSize: '11px', color: textDark }}>www.reallygreatsite.com</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              SKILLS
            </h3>
            <div className="space-y-2 text-xs">
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>
                      <EditableText
                        value={skill.name || ''}
                        placeholder="Skill"
                        editable={editable}
                        onChange={(val) => onChange(`skills.${index}.name`, val)}
                        className="inline"
                      />
                      {skill.level && (
                        <>
                          {' ('}
                          <EditableText
                            value={skill.level || ''}
                            placeholder="Level"
                            editable={editable}
                            onChange={(val) => onChange(`skills.${index}.level`, val)}
                            className="inline"
                          />
                          {')'}
                        </>
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Project Management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Public Relations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Teamwork</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Time Management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Leadership</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Effective Communication</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Critical Thinking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '10px', color: textDark }}>•</span>
                    <span style={{ fontSize: '11px', color: textDark }}>Digital Marketing</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              LANGUAGES
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span style={{ fontSize: '10px', color: textDark }}>•</span>
                <span style={{ fontSize: '11px', color: textDark }}>English (Fluent)</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ fontSize: '10px', color: textDark }}>•</span>
                <span style={{ fontSize: '11px', color: textDark }}>French (Fluent)</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ fontSize: '10px', color: textDark }}>•</span>
                <span style={{ fontSize: '11px', color: textDark }}>German (Basic)</span>
              </div>
              <div className="flex items-start gap-2">
                <span style={{ fontSize: '10px', color: textDark }}>•</span>
                <span style={{ fontSize: '11px', color: textDark }}>Spanish (Intermediate)</span>
              </div>
            </div>
          </div>

          {/* Reference Section */}
          <div>
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              REFERENCE
            </h3>
            <div className="text-xs">
              <div className="font-semibold mb-1" style={{ fontSize: '11px', color: textDark }}>Estelle Darcy</div>
              <div className="mb-1" style={{ fontSize: '10px', color: textDark }}>Wardiere Inc. / CTO</div>
              <div className="mb-1" style={{ fontSize: '10px', color: textDark }}>Phone: 123-456-7890</div>
              <div style={{ fontSize: '10px', color: textDark }}>Email: hello@reallygreatsite.com</div>
            </div>
          </div>
        </div>

        {/* Right Column - White */}
        <div className="flex-1 p-6 flex flex-col" style={{ backgroundColor: white }}>
          {/* Profile Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              PROFILE
            </h3>
            <EditableText
              value={summary}
              placeholder="Professional summary"
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="text-sm leading-relaxed"
              style={{ fontSize: '12px', lineHeight: '1.6', color: textDark }}
              multiline
            />
          </div>

          {/* Work Experience Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              WORK EXPERIENCE
            </h3>
            <div className="space-y-5">
              {experience && experience.length > 0 ? (
                experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <EditableText
                          value={exp.company || ''}
                          placeholder="COMPANY"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.company`, val)}
                          className="font-bold mb-1 uppercase"
                          style={{ fontSize: '14px', color: textDark }}
                        />
                        <EditableText
                          value={exp.title || ''}
                          placeholder="Job Title"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.title`, val)}
                          className="text-sm"
                          style={{ fontSize: '13px', color: textDark }}
                        />
                      </div>
                      <div className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                        <EditableText
                          value={exp.startDate || ''}
                          placeholder="Start Date"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                          className="inline"
                        />
                        {' - '}
                        {exp.current ? (
                          'PRESENT'
                        ) : (
                          <EditableText
                            value={exp.endDate || ''}
                            placeholder="End Date"
                            editable={editable}
                            onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                            className="inline"
                          />
                        )}
                      </div>
                    </div>
                    {(exp.description || editable) && (
                      <div className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                        <EditableText
                          value={exp.description || ''}
                          placeholder="Job description"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.description`, val)}
                          multiline
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold mb-1" style={{ fontSize: '14px', color: textDark }}>Borcelle Studio</div>
                        <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Marketing Manager & Specialist</div>
                      </div>
                      <div className="text-xs" style={{ fontSize: '11px', color: textDark }}>2030 - PRESENT</div>
                    </div>
                    <div className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-6">
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              PROJECTS
            </h3>
            <div className="space-y-4">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index}>
                  <EditableText
                    value={project.name || ''}
                    placeholder="PROJECT NAME"
                    editable={editable}
                    onChange={(val) => onChange(`projects.${index}.name`, val)}
                    className="font-bold mb-1 uppercase"
                    style={{ fontSize: '14px', color: textDark }}
                  />
                  {(project.description || editable) && (
                    <div className="mb-2">
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        className="text-xs"
                        style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}
                        multiline
                      />
                    </div>
                  )}
                  {(project.technologies || editable) && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      <EditableText
                        value={Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '')}
                        placeholder="react, node, mongo"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.technologies`, val)}
                        className="px-2 py-0.5 text-xs border"
                        style={{ fontSize: '10px', borderColor: textDark, color: textDark }}
                      />
                    </div>
                  )}
                    <div className="flex gap-3 text-xs" style={{ fontSize: '10px' }}>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: textDark }}>
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: textDark }}>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="font-bold mb-1 uppercase" style={{ fontSize: '14px', color: textDark }}>FITNESS TRACKING APP</div>
                  <div className="text-xs mb-2" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                    Built a fitness tracking application with workout logging, progress charts, and personalized workout recommendations.
                  </div>
                  <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '10px', borderColor: textDark, color: textDark }}>
                    React Native, Redux, SQLite
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 
              className="font-bold uppercase mb-4 border-b-2 border-black pb-2"
              style={{ fontSize: '12px', letterSpacing: '1px', color: textDark }}
            >
              EDUCATION
            </h3>
            <div className="space-y-4">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <EditableText
                          value={edu.degree || ''}
                          placeholder="DEGREE"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.degree`, val)}
                          className="font-bold mb-1 uppercase"
                          style={{ fontSize: '14px', color: textDark }}
                        />
                        <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>
                          <EditableText
                            value={edu.institution || ''}
                            placeholder="Institution"
                            editable={editable}
                            onChange={(val) => onChange(`education.${index}.institution`, val)}
                            className="inline"
                            style={{ color: textDark }}
                          />
                          {(edu.gpa || editable) && (
                            <>
                              {' | GPA: '}
                              <EditableText
                                value={edu.gpa || ''}
                                placeholder="GPA"
                                editable={editable}
                                onChange={(val) => onChange(`education.${index}.gpa`, val)}
                                className="inline"
                                style={{ color: textDark }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <EditableText
                        value={formatEducationYear(edu) || edu.year || ''}
                        placeholder="Year"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.year`, val)}
                        className="text-xs"
                        style={{ fontSize: '11px', color: textDark }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="font-bold mb-1" style={{ fontSize: '14px', color: textDark }}>Master of Business Management</div>
                        <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>School of business | Wardiere University | GPA: 3.8 / 4.0</div>
                      </div>
                      <div className="text-xs" style={{ fontSize: '11px', color: textDark }}>2029 - 2031</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranciscoAndradeTemplate;

