import React from 'react';
import EditableText from '../EditableText';

const ClaudiaAlvesTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
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

        {/* ALL ADDITIONAL FIELDS */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>CERTIFICATIONS</h3>
            <div className="space-y-2">
              {(certifications || []).map((cert, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} />
                  {cert.issuer && <span> - {cert.issuer}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>TRAININGS</h3>
            <div className="space-y-2">
              {(trainings || []).map((training, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                  {training.institution && <span> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>AWARDS</h3>
            <div className="space-y-2">
              {(awards || []).map((award, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} />
                  {award.organization && <span> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((languages && languages.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>LANGUAGES</h3>
            <div className="space-y-2">
              {(languages || []).map((lang, index) => (
                <div key={index} className="flex justify-between text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} />
                  <span>{lang.proficiency || 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>PUBLICATIONS</h3>
            <div className="space-y-2">
              {(publications || []).map((pub, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} />
                  {pub.journal && <span> - {pub.journal}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>PATENTS</h3>
            <div className="space-y-2">
              {(patents || []).map((patent, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} />
                  {patent.patentNumber && <span> - {patent.patentNumber}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>VOLUNTEER WORK</h3>
            <div className="space-y-2">
              {(volunteerWork || []).map((vol, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                  {vol.role && <span> - {vol.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>MEMBERSHIPS</h3>
            <div className="space-y-2">
              {(professionalMemberships || []).map((mem, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                  {mem.role && <span> - {mem.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>CONFERENCES</h3>
            <div className="space-y-2">
              {(conferences || []).map((conf, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                  {conf.location && <span> - {conf.location}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>SPEAKING</h3>
            <div className="space-y-2">
              {(speakingEngagements || []).map((speak, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                  {speak.event && <span> - {speak.event}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>TEACHING</h3>
            <div className="space-y-2">
              {(teachingExperience || []).map((teach, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                  {teach.institution && <span> - {teach.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>MENTORING</h3>
            <div className="space-y-2">
              {(mentoring || []).map((ment, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} />
                  {ment.focus && <span> - {ment.focus}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>LEADERSHIP</h3>
            <div className="space-y-2">
              {(leadershipRoles || []).map((lead, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} />
                  {lead.organization && <span> - {lead.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>INTERNSHIPS</h3>
            <div className="space-y-2">
              {(internships || []).map((intern, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                  {intern.company && <span> - {intern.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>LICENSES</h3>
            <div className="space-y-2">
              {(licenses || []).map((lic, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                  {lic.issuingOrganization && <span> - {lic.issuingOrganization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((references && references.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>REFERENCES</h3>
            <div className="space-y-2">
              {(references || []).map((ref, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} />
                  {ref.title && <span> - {ref.title}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>OPEN SOURCE</h3>
            <div className="space-y-2">
              {(openSourceContributions || []).map((os, index) => (
                <div key={index} className="text-xs" style={{ fontSize: '11px', color: textDark }}>
                  <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {((hobbies && hobbies.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>HOBBIES</h3>
            <div className="flex flex-wrap gap-2">
              {(hobbies || []).map((hobby, index) => (
                <span key={index} className="px-2 py-0.5 text-xs border" style={{ fontSize: '10px', borderColor: darkBrown, color: textDark }}>
                  {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>INTERESTS</h3>
            <div className="flex flex-wrap gap-2">
              {(interests || []).map((interest, index) => (
                <span key={index} className="px-2 py-0.5 text-xs border" style={{ fontSize: '10px', borderColor: darkBrown, color: textDark }}>
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((additionalInfo && additionalInfo.trim()) || editable) && (
          <div className="mt-6">
            <h3 className="font-bold uppercase mb-4 underline" style={{ fontSize: '13px', color: darkBrown, letterSpacing: '1px' }}>ADDITIONAL INFO</h3>
            <div className="text-xs leading-relaxed" style={{ fontSize: '11px', color: textDark }}>
              <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaudiaAlvesTemplate;
