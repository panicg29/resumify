import React from 'react';
import EditableText from '../EditableText';

const BartholomewHendersonTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const darkBlue = '#1A1A2E'; // Dark blue/almost black
  const white = '#FFFFFF';
  const textDark = '#000000'; // Pure black for maximum visibility

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || 'Present');
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
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Left Sidebar - Dark Blue */}
      <div className="w-[33%] p-6 flex flex-col" style={{ backgroundColor: darkBlue, color: white }}>
        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            CONTACT
          </h3>
          <div className="space-y-3 text-xs">
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: white }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ fontSize: '11px', color: white }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: white }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ fontSize: '11px', color: white }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: white }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ fontSize: '11px', color: white }}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: white }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span style={{ fontSize: '11px' }}>reallygreatsite.com</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            SKILLS
          </h3>
          <div className="space-y-2 text-xs">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>
                    <EditableText
                      value={skill.name || ''}
                      placeholder="Skill"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.name`, val)}
                      className="inline"
                      style={{ color: white }}
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
                          style={{ color: white }}
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
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Web Design</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Design Thinking</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Wireframe Creation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Front End Coding</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Problem-Solving</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Computer Literacy</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Project Management Tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px' }}>Strong Communication</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            EDUCATION
          </h3>
          <div className="space-y-4 text-xs">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <EditableText
                    value={edu.degree || ''}
                    placeholder="DEGREE"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.degree`, val)}
                    className="font-bold mb-1"
                    style={{ fontSize: '11px', color: white }}
                  />
                  <EditableText
                    value={edu.institution || ''}
                    placeholder="Institution"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.institution`, val)}
                    className="mb-1"
                    style={{ fontSize: '10px', color: white }}
                  />
                  <div style={{ fontSize: '10px', color: white }}>
                    <EditableText
                      value={formatEducationYear(edu) || edu.year || ''}
                      placeholder="Year"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.year`, val)}
                      className="inline"
                      style={{ color: white }}
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
                          style={{ color: white }}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: '11px' }}>SECONDARY SCHOOL</div>
                  <div className="mb-1" style={{ fontSize: '10px' }}>Really Great High School</div>
                  <div style={{ fontSize: '10px' }}>2010 - 2014</div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: '11px' }}>BACHELOR OF TECHNOLOGY</div>
                  <div className="mb-1" style={{ fontSize: '10px' }}>Really Great University</div>
                  <div style={{ fontSize: '10px' }}>2014 - 2016</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Language Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            LANGUAGE
          </h3>
          <div className="space-y-2 text-xs">
            <div style={{ fontSize: '11px' }}>English</div>
            <div style={{ fontSize: '11px' }}>Spanish</div>
          </div>
        </div>
      </div>

      {/* Right Column - White */}
      <div className="flex-1 p-6 flex flex-col" style={{ backgroundColor: white }}>
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '36px', color: textDark, letterSpacing: '1px' }}
          >
            <EditableText
              value={name || ''}
              placeholder="BARTHOLOMEW HENDERSON"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="uppercase"
            />
          </h1>
          <p 
            className="uppercase"
            style={{ fontSize: '16px', color: textDark, fontWeight: 'bold' }}
          >
            <EditableText
              value={role || ''}
              placeholder="PROJECT MANAGER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
            />
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6">
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

        {/* Experience Section */}
        <div className="mb-6">
          <h3 
            className="font-bold uppercase mb-4"
            style={{ fontSize: '13px', color: textDark, letterSpacing: '1px' }}
          >
            EXPERIENCE
          </h3>
          <div className="space-y-5">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <EditableText
                        value={exp.title || ''}
                        placeholder="JOB TITLE"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                        className="font-bold mb-1 uppercase"
                        style={{ fontSize: '14px', color: textDark }}
                      />
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
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
                        'Present'
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
                    <div className="space-y-1">
                      <EditableText
                        value={exp.description || ''}
                        placeholder="Job description"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.description`, val)}
                        className="text-xs"
                        style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}
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
                      <div className="font-bold mb-1" style={{ fontSize: '14px', color: textDark }}>
                        APPLICATIONS DEVELOPER
                      </div>
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Really Great Company</div>
                    </div>
                    <div className="text-xs" style={{ fontSize: '11px', color: textDark }}>2016 - Present</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1" style={{ fontSize: '10px', color: textDark }}>•</span>
                      <span className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                        Database administration and website design.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1" style={{ fontSize: '10px', color: textDark }}>•</span>
                      <span className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                        Built the logic for a streamlined ad-serving platform that scaled.
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h3 
            className="font-bold uppercase mb-4"
            style={{ fontSize: '13px', color: textDark, letterSpacing: '1px' }}
          >
            PROJECTS
          </h3>
          <div className="space-y-4">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index}>
                  <div className="font-bold mb-1" style={{ fontSize: '14px', color: textDark }}>
                    <EditableText
                      value={project.name || ''}
                      placeholder="PROJECT NAME"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold mb-1 uppercase"
                      style={{ fontSize: '14px', color: textDark }}
                    />
                  </div>
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
                <div className="font-bold mb-1 uppercase" style={{ fontSize: '14px', color: textDark }}>BOOKING SYSTEM</div>
                <div className="text-xs mb-2" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                  Designed and developed an online booking system with calendar integration, payment processing, and automated confirmations.
                </div>
                <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '10px', borderColor: textDark, color: textDark }}>
                  React, Stripe, Node.js
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BartholomewHendersonTemplate;

