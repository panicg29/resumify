import React from 'react';
import EditableText from '../EditableText';

const ClaudiaAlvesTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const darkBrown = '#6B4E3D'; // Dark brown/terracotta
  const lightBeige = '#F5F0E8'; // Light beige
  const textDark = '#2A1810'; // Much darker for better visibility

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
        return `${edu.year - 4} - ${edu.year}`;
      }
    }
    return '';
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Left Sidebar - Dark Brown */}
      <div className="w-[33%] p-6 flex flex-col" style={{ backgroundColor: darkBrown, color: '#FFFFFF' }}>
        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4 underline" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            CONTACT
          </h3>
          <div className="space-y-3 text-xs">
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ fontSize: '11px' }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ fontSize: '11px' }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ fontSize: '11px' }}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span style={{ fontSize: '11px' }}>www.reallygreatsite.com</span>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4 underline" style={{ fontSize: '12px', letterSpacing: '1px' }}>
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
                    style={{ fontSize: '11px', color: '#FFFFFF' }}
                  />
                  <EditableText
                    value={edu.institution || ''}
                    placeholder="Institution"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.institution`, val)}
                    className="mb-1"
                    style={{ fontSize: '10px', color: '#FFFFFF' }}
                  />
                  <div style={{ fontSize: '10px', color: '#FFFFFF' }}>
                    <EditableText
                      value={formatEducationYear(edu) || edu.year || ''}
                      placeholder="Year"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.year`, val)}
                      className="inline"
                      style={{ color: '#FFFFFF' }}
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
                          style={{ color: '#FFFFFF' }}
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
                  <div className="mb-1" style={{ fontSize: '10px' }}>THYNK UNLIMITED HIGH SCHOOL</div>
                  <div style={{ fontSize: '10px' }}>2011 - 2015</div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: '11px' }}>BACHELOR OF TECHNOLOGY</div>
                  <div className="mb-1" style={{ fontSize: '10px' }}>THYNK UNLIMITED UNIVERSITY</div>
                  <div style={{ fontSize: '10px' }}>2015 - 2017</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-4 underline" style={{ fontSize: '12px', letterSpacing: '1px' }}>
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
                      style={{ color: '#FFFFFF' }}
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
                          style={{ color: '#FFFFFF' }}
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
              </>
            )}
          </div>
        </div>

        {/* My Hobby Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4 underline" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            MY HOBBY
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span style={{ fontSize: '10px' }}>•</span>
              <span style={{ fontSize: '11px' }}>Playing Basketball</span>
            </div>
            <div className="flex items-start gap-2">
              <span style={{ fontSize: '10px' }}>•</span>
              <span style={{ fontSize: '11px' }}>Drawing</span>
            </div>
            <div className="flex items-start gap-2">
              <span style={{ fontSize: '10px' }}>•</span>
              <span style={{ fontSize: '11px' }}>Traveling</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Light Beige */}
      <div className="flex-1 p-6 flex flex-col" style={{ backgroundColor: lightBeige }}>
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '32px', color: darkBrown, letterSpacing: '1px' }}
          >
            <EditableText
              value={name || ''}
              placeholder="CLAUDIA ALVES"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="uppercase"
              style={{ color: darkBrown }}
            />
          </h1>
          <p 
            className="uppercase"
            style={{ fontSize: '16px', color: darkBrown, fontWeight: 'bold' }}
          >
            <EditableText
              value={role || ''}
              placeholder="FASHION DESIGNER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
              style={{ color: darkBrown }}
            />
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-6">
          <h3 
            className="font-bold uppercase mb-3 underline"
            style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}
          >
            ABOUT ME
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
            className="font-bold uppercase mb-4 underline"
            style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}
          >
            WORK EXPERIENCE
          </h3>
          <div className="space-y-5">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold mb-1" style={{ fontSize: '14px', color: darkBrown }}>
                        <EditableText
                          value={exp.title || ''}
                          placeholder="JOB TITLE"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.title`, val)}
                          className="inline uppercase"
                          style={{ color: darkBrown }}
                        />
                        {' | '}
                        <EditableText
                          value={exp.company || ''}
                          placeholder="COMPANY"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.company`, val)}
                          className="inline uppercase"
                          style={{ color: darkBrown }}
                        />
                      </div>
                    </div>
                    <div className="text-xs" style={{ fontSize: '11px', color: darkBrown }}>
                      <EditableText
                        value={exp.startDate || ''}
                        placeholder="Start Date"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                        className="inline"
                        style={{ color: darkBrown }}
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
                          style={{ color: darkBrown }}
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
                      <div className="font-bold mb-1" style={{ fontSize: '14px', color: darkBrown }}>
                        FASHION CREATIVE DIRECTOR | FRADEL AND SPIES CO
                      </div>
                    </div>
                    <div className="text-xs" style={{ fontSize: '11px', color: darkBrown }}>2020 - Present</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1" style={{ fontSize: '10px', color: darkBrown }}>•</span>
                      <span className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                        Oversee the entire design process from concept to final product.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1" style={{ fontSize: '10px', color: darkBrown }}>•</span>
                      <span className="text-xs" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                        Set the artistic vision for seasonal collections.
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
            className="font-bold uppercase mb-4 underline"
            style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}
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
                    style={{ fontSize: '14px', color: darkBrown }}
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
                        style={{ fontSize: '10px', borderColor: darkBrown, color: textDark }}
                      />
                    </div>
                  )}
                  <div className="flex gap-3 text-xs" style={{ fontSize: '10px' }}>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: darkBrown }}>
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: darkBrown }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1 uppercase" style={{ fontSize: '14px', color: darkBrown }}>RECIPE SHARING WEBSITE</div>
                <div className="text-xs mb-2" style={{ fontSize: '11px', lineHeight: '1.5', color: textDark }}>
                  Built a recipe sharing platform with user-generated content, ratings, comments, and advanced search functionality.
                </div>
                <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '10px', borderColor: darkBrown, color: textDark }}>
                  Angular, Node.js, MongoDB
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaudiaAlvesTemplate;
