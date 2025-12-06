import React from 'react';
import EditableText from '../EditableText';

const JamieChastainTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const blackBg = '#000000';
  const whiteBg = '#FFFFFF';
  const textWhite = '#FFFFFF';
  const textBlack = '#000000';

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
      className="w-[21cm] h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: whiteBg }}
    >
      {/* Left Sidebar - Black */}
      <div 
        className="w-[35%] p-6 flex flex-col"
        style={{ backgroundColor: blackBg, color: textWhite }}
      >
        {/* Contact Information */}
        <div className="mb-6">
          <div className="space-y-3">
            {(phone || editable) && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  className="text-sm"
                  style={{ fontSize: '12px', color: textWhite }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="text-sm"
                  style={{ fontSize: '12px', color: textWhite }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  className="text-sm"
                  style={{ fontSize: '12px', color: textWhite }}
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span className="text-sm" style={{ fontSize: '12px' }}>reallygreatsite.com</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            SKILLS
          </h3>
          <div className="space-y-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>
                    <EditableText
                      value={skill.name || ''}
                      placeholder="Skill"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.name`, val)}
                      className="inline"
                      style={{ color: textWhite }}
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
                          style={{ color: textWhite }}
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
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Web Design</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Design Thinking</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Wireframe Creation</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Front End Coding</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Problem-Solving</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Computer Literacy</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Project Management Tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></div>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Strong Communication</span>
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
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <EditableText
                    value={edu.degree || ''}
                    placeholder="Degree"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.degree`, val)}
                    className="text-sm mb-1"
                    style={{ fontSize: '12px', color: textWhite }}
                  />
                  <EditableText
                    value={edu.institution || ''}
                    placeholder="Institution"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.institution`, val)}
                    className="text-sm mb-1"
                    style={{ fontSize: '12px', color: textWhite }}
                  />
                  <div className="text-sm" style={{ fontSize: '12px', color: textWhite }}>
                    <EditableText
                      value={formatEducationYear(edu) || edu.year || ''}
                      placeholder="Year"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.year`, val)}
                      className="inline"
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
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Secondary School</div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Really Great High School</div>
                  <div className="text-sm" style={{ fontSize: '12px' }}>2010 - 2014</div>
                </div>
                <div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Bachelor of Technology</div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Really Great University</div>
                  <div className="text-sm" style={{ fontSize: '12px' }}>2014 - 2016</div>
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
          <div className="space-y-2">
            <div className="text-sm" style={{ fontSize: '12px' }}>English</div>
            <div className="text-sm" style={{ fontSize: '12px' }}>Spanish</div>
          </div>
        </div>
      </div>

      {/* Right Column - White */}
      <div 
        className="flex-1 p-8 flex flex-col"
        style={{ backgroundColor: whiteBg, color: textBlack }}
      >
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '1px' }}
          >
            {(name || 'JAMIE CHASTAIN').split(' ').map((part, i) => (
              <div key={i}>
                <EditableText
                  value={part}
                  placeholder={i === 0 ? 'JAMIE' : 'CHASTAIN'}
                  editable={editable}
                  onChange={(val) => {
                    const parts = (name || 'JAMIE CHASTAIN').split(' ');
                    parts[i] = val;
                    onChange('name', parts.join(' '));
                  }}
                  className="uppercase"
                />
              </div>
            ))}
          </h1>
          <p 
            className="uppercase"
            style={{ fontSize: '18px', fontWeight: 'normal', letterSpacing: '1px' }}
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
        <div className="mb-8">
          <EditableText
            value={summary}
            placeholder="Professional summary"
            editable={editable}
            onChange={(val) => onChange('summary', val)}
            className="text-sm leading-relaxed"
            style={{ fontSize: '13px', lineHeight: '1.6' }}
            multiline
          />
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-5" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            EXPERIENCE
          </h3>
          <div className="space-y-6">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2">
                    <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <EditableText
                      value={exp.title || ''}
                      placeholder="JOB TITLE"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      className="font-bold text-base mb-1 uppercase"
                      style={{ fontSize: '15px' }}
                    />
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Company"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.company`, val)}
                      className="text-sm mb-1"
                      style={{ fontSize: '13px' }}
                    />
                    <div className="text-sm mb-3" style={{ fontSize: '12px' }}>
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
                    {(exp.description || editable) && (
                      <div className="space-y-1">
                        <EditableText
                          value={exp.description || ''}
                          placeholder="Job description"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.description`, val)}
                          className="text-sm"
                          style={{ fontSize: '12px', lineHeight: '1.5' }}
                          multiline
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-2">
                    <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1 uppercase" style={{ fontSize: '15px' }}>APPLICATIONS DEVELOPER</div>
                    <div className="text-sm mb-1" style={{ fontSize: '13px' }}>Arowwai Industries</div>
                    <div className="text-sm mb-3" style={{ fontSize: '12px' }}>2016 - Present</div>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Database administration and website design.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Built the logic for a streamlined ad-serving platform that scaled.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Educational institutions and online classroom management.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-2">
                    <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1 uppercase" style={{ fontSize: '15px' }}>WEB CONTENT MANAGER</div>
                    <div className="text-sm mb-1" style={{ fontSize: '13px' }}>Ginyard International Co.</div>
                    <div className="text-sm mb-3" style={{ fontSize: '12px' }}>2014 - 2016</div>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Database administration and website design.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Built the logic for a streamlined ad-serving platform that scaled.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5">•</span>
                        <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Educational institutions and online classroom management.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <h3 className="text-sm font-bold uppercase mb-5" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            PROJECTS
          </h3>
          <div className="space-y-6">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2">
                    <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <EditableText
                      value={project.name || ''}
                      placeholder="PROJECT NAME"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold text-base mb-1 uppercase"
                      style={{ fontSize: '15px' }}
                    />
                    {(project.description || editable) && (
                      <div className="space-y-1 mb-2">
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          className="text-sm"
                          style={{ fontSize: '12px', lineHeight: '1.5' }}
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
                          className="px-2 py-0.5 text-xs border border-black"
                          style={{ fontSize: '11px' }}
                        />
                      </div>
                    )}
                    <div className="flex gap-3 text-xs" style={{ fontSize: '11px' }}>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative pl-6">
                <div className="absolute left-0 top-2">
                  <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                </div>
                <div>
                  <div className="font-bold text-base mb-1 uppercase" style={{ fontSize: '15px' }}>TASK MANAGEMENT SYSTEM</div>
                  <div className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                    Built a comprehensive task management system with team collaboration features, deadline tracking, and progress visualization.
                  </div>
                  <div className="px-2 py-0.5 text-xs border border-black inline-block" style={{ fontSize: '11px' }}>
                    React, Node.js, PostgreSQL
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamieChastainTemplate;

