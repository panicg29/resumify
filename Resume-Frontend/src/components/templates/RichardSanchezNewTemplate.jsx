import React from 'react';
import EditableText from '../EditableText';

const RichardSanchezNewTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const bgColor = '#F5F5F5'; // Light gray
  const blueColor = '#1E40AF'; // Blue
  const textDark = '#000000'; // Changed to pure black for better visibility
  const borderBlue = '#1E40AF';

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
        return `${edu.year - 1} - ${edu.year}`;
      }
    }
    return '';
  };

  return (
    <div 
      className="w-[21cm] h-[29.7cm] mx-auto shadow-2xl relative overflow-hidden"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: bgColor }}
    >
      <div className="p-8 h-full overflow-y-auto">
        {/* Header Section with Name, Title, and Contact */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-4">
            <div className="flex-1">
              <h1 
                className="font-bold mb-2"
                style={{ fontSize: '42px', color: blueColor, lineHeight: '1.1', letterSpacing: '-1px' }}
              >
                <EditableText
                  value={name || ''}
                  placeholder="RICHARD SANCHEZ"
                  editable={editable}
                  onChange={(val) => onChange('name', val)}
                  style={{ color: blueColor }}
                />
              </h1>
              <p 
                className="mb-4"
                style={{ fontSize: '18px', color: textDark, fontWeight: 'normal' }}
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
          </div>

          {/* Contact Information - Horizontal */}
          <div className="flex items-center gap-4 text-sm" style={{ fontSize: '12px', color: textDark }}>
            {(email || editable) && (
              <>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="inline"
                  style={{ color: textDark }}
                />
                <span style={{ color: '#666666' }}>|</span>
              </>
            )}
            {(phone || editable) && (
              <>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  className="inline"
                  style={{ color: textDark }}
                />
                <span style={{ color: '#666666' }}>|</span>
              </>
            )}
            {(location || editable) && (
              <EditableText
                value={location}
                placeholder="City, Country"
                editable={editable}
                onChange={(val) => onChange('location', val)}
                className="inline"
                style={{ color: textDark }}
              />
            )}
          </div>
        </div>

        {/* PROFILE SUMMARY Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h3 
              className="font-bold uppercase mr-4"
              style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}
            >
              PROFILE SUMMARY
            </h3>
            <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
          </div>
          <EditableText
            value={summary}
            placeholder="Professional summary"
            editable={editable}
            onChange={(val) => onChange('summary', val)}
            className="text-sm leading-relaxed"
            style={{ fontSize: '13px', lineHeight: '1.6', color: textDark }}
            multiline
          />
        </div>

        {/* EDUCATION Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h3 
              className="font-bold uppercase mr-4"
              style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}
            >
              EDUCATION
            </h3>
            <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
          </div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="mt-1">•</span>
                      <div>
                        <EditableText
                          value={edu.institution || ''}
                          placeholder="University"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.institution`, val)}
                          className="font-semibold text-sm"
                          style={{ fontSize: '13px', color: textDark }}
                        />
                        <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                          <EditableText
                            value={edu.degree || ''}
                            placeholder="Degree"
                            editable={editable}
                            onChange={(val) => onChange(`education.${index}.degree`, val)}
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
                    </div>
                  </div>
                  <EditableText
                    value={formatEducationYear(edu) || edu.year || ''}
                    placeholder="Year"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.year`, val)}
                    className="text-sm"
                    style={{ fontSize: '12px', color: textDark }}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="mt-1">•</span>
                      <div>
                        <div className="font-semibold text-sm" style={{ fontSize: '13px', color: textDark }}>Wardiere University</div>
                        <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Master of Computer Graphics Technology focuses on interactive Multimedia.</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>2029 - 2030</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="mt-1">•</span>
                      <div>
                        <div className="font-semibold text-sm" style={{ fontSize: '13px', color: textDark }}>Wardiere University</div>
                        <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Bachelor of Computer Graphics Technology focuses on interactive Multimedia.</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>2025 - 2029</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* WORK EXPERIENCE Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h3 
              className="font-bold uppercase mr-4"
              style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}
            >
              WORK EXPERIENCE
            </h3>
            <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
          </div>
          <div className="space-y-5">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>
                        <EditableText
                          value={exp.title || ''}
                          placeholder="Job Title"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.title`, val)}
                          className="inline"
                          style={{ color: textDark }}
                        />
                        {' | '}
                        <EditableText
                          value={exp.company || ''}
                          placeholder="Company"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.company`, val)}
                          className="inline"
                          style={{ color: textDark }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-semibold" style={{ fontSize: '12px', color: textDark }}>
                      <EditableText
                        value={exp.startDate || ''}
                        placeholder="Start Date"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                        className="inline"
                        style={{ color: textDark }}
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
                          style={{ color: textDark }}
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
                        className="text-sm"
                        style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}
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
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Marketing Manager | Borcelle Studio</div>
                    </div>
                    <div className="text-sm font-semibold" style={{ fontSize: '12px', color: textDark }}>2030 - PRESENT</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Developed and executed marketing strategies.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Managed brand presence and media relations.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PROJECTS Section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h3 
              className="font-bold uppercase mr-4"
              style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}
            >
              PROJECTS
            </h3>
            <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
          </div>
          <div className="space-y-5">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index}>
                  <EditableText
                    value={project.name || ''}
                    placeholder="Project Name"
                    editable={editable}
                    onChange={(val) => onChange(`projects.${index}.name`, val)}
                    className="font-bold text-base mb-1"
                    style={{ fontSize: '14px', color: textDark }}
                  />
                  {(project.description || editable) && (
                    <div className="mb-2">
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        className="text-sm"
                        style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}
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
                        style={{ fontSize: '11px', borderColor: blueColor, color: textDark }}
                      />
                    </div>
                  )}
                  <div className="flex gap-3 text-xs" style={{ fontSize: '11px' }}>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: blueColor }}>
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: blueColor }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Analytics Dashboard</div>
                <div className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>
                  Created a comprehensive analytics dashboard with real-time data visualization, custom reports, and export functionality.
                </div>
                <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '11px', borderColor: blueColor, color: textDark }}>
                  React, D3.js, Node.js
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROFESSIONAL SKILL Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h3 
              className="font-bold uppercase mr-4"
              style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}
            >
              PROFESSIONAL SKILL
            </h3>
            <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText
                      value={skill.name || ''}
                      placeholder="Skill"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.name`, val)}
                      className="inline"
                      style={{ color: textDark }}
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
                          style={{ color: textDark }}
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
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Media relation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Brand management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Advertising</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Direct Marketing</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* LANGUAGES Section */}
        {((languages && languages.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h3 
                className="font-bold uppercase mr-4"
                style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}
              >
                LANGUAGES
              </h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages && languages.length > 0 ? (
                languages.map((lang, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                      <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} />
                      {' ('}
                      <EditableText value={lang.proficiency || 'Fluent'} placeholder="Proficiency" editable={editable} onChange={(val) => onChange(`languages.${index}.proficiency`, val)} />
                      {')'}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>English (Fluent)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>German (Basics)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>French (Fluent)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Spanish (Basics)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ALL ADDITIONAL FIELDS - Compact */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>CERTIFICATIONS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(certifications || []).slice(0, 4).map((cert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '11px', color: textDark }}>
                    <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} />
                    {cert.issuer && <span> - {cert.issuer}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>TRAININGS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(trainings || []).map((training, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                    {training.institution && <span> - {training.institution}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>AWARDS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(awards || []).map((award, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} />
                    {award.organization && <span> - {award.organization}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>PUBLICATIONS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(publications || []).map((pub, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} />
                    {pub.journal && <span> - {pub.journal}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>PATENTS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(patents || []).map((patent, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} />
                    {patent.patentNumber && <span> - {patent.patentNumber}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>VOLUNTEER WORK</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(volunteerWork || []).map((vol, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                    {vol.role && <span> - {vol.role}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>MEMBERSHIPS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(professionalMemberships || []).map((mem, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                    {mem.role && <span> - {mem.role}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>CONFERENCES</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(conferences || []).map((conf, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                    {conf.location && <span> - {conf.location}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>SPEAKING</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(speakingEngagements || []).map((speak, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                    {speak.event && <span> - {speak.event}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>TEACHING</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(teachingExperience || []).map((teach, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                    {teach.institution && <span> - {teach.institution}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>MENTORING</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(mentoring || []).map((ment, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} />
                    {ment.focus && <span> - {ment.focus}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>LEADERSHIP</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(leadershipRoles || []).map((lead, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} />
                    {lead.organization && <span> - {lead.organization}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>INTERNSHIPS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(internships || []).map((intern, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                    {intern.company && <span> - {intern.company}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>LICENSES</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(licenses || []).map((lic, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                    {lic.issuingOrganization && <span> - {lic.issuingOrganization}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((references && references.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>REFERENCES</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(references || []).map((ref, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} />
                    {ref.title && <span> - {ref.title}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>OPEN SOURCE</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(openSourceContributions || []).map((os, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((hobbies && hobbies.length > 0) || editable) && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '14px', color: blueColor, letterSpacing: '1px' }}>HOBBIES</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(hobbies || []).map((hobby, index) => (
                <span key={index} className="px-2 py-1 text-xs border" style={{ fontSize: '11px', borderColor: blueColor, color: textDark }}>
                  {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>INTERESTS</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(interests || []).map((interest, index) => (
                <span key={index} className="px-2 py-1 text-xs border" style={{ fontSize: '11px', borderColor: blueColor, color: textDark }}>
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((additionalInfo && additionalInfo.trim()) || editable) && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h3 className="font-bold uppercase mr-4" style={{ fontSize: '13px', color: blueColor, letterSpacing: '1px' }}>ADDITIONAL INFO</h3>
              <div className="flex-1 border-t" style={{ borderColor: blueColor, borderWidth: '2px' }}></div>
            </div>
            <div className="text-sm leading-relaxed" style={{ fontSize: '12px', color: textDark }}>
              <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RichardSanchezNewTemplate;

