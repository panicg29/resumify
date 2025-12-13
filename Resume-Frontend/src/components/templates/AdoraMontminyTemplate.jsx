import React from 'react';
import EditableText from '../EditableText';

const AdoraMontminyTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const darkBg = '#1A1A1A'; // Dark charcoal/black
  const pinkBg = '#FFE5E5'; // Light pink
  const pinkAccent = '#FFB6C1'; // Light pink for buttons/icons

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
    return '2005 - 2009';
  };

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || 'Present');
    return `${start} - ${end}`;
  };

  return (
    <div 
      className="w-[21cm] h-[29.7cm] mx-auto shadow-2xl flex relative overflow-hidden"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#FFFFFF' }}
    >
      {/* Left Sidebar - Dark Charcoal/Black */}
      <div 
        className="w-[35%] p-6 flex flex-col relative z-10"
        style={{ 
          backgroundColor: darkBg, 
          color: '#FFFFFF',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)'
        }}
      >
        {/* Name */}
        <div className="mb-5">
          <h1 
            className="font-black uppercase leading-tight"
            style={{ fontSize: '32px', lineHeight: '1.2', letterSpacing: '1px' }}
          >
            {(name || 'ADORA MONTMINY').split(' ').map((part, i) => (
              <div key={i}>
                <EditableText
                  value={part}
                  placeholder={i === 0 ? 'ADORA' : 'MONTMINY'}
                  editable={editable}
                  onChange={(val) => {
                    const parts = (name || 'ADORA MONTMINY').split(' ');
                    parts[i] = val;
                    onChange('name', parts.join(' '));
                  }}
                  className="uppercase"
                />
              </div>
            ))}
          </h1>
        </div>

        {/* Contact Information */}
        <div className="mb-6 space-y-2.5">
          {(phone || editable) && (
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: pinkAccent }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <EditableText
                value={phone}
                placeholder="+123-456-7890"
                editable={editable}
                onChange={(val) => onChange('phone', val)}
                className="text-sm"
                style={{ fontSize: '12px' }}
              />
            </div>
          )}
          {(email || editable) && (
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: pinkAccent }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <EditableText
                value={email}
                placeholder="email@example.com"
                editable={editable}
                onChange={(val) => onChange('email', val)}
                className="text-sm"
                style={{ fontSize: '12px' }}
              />
            </div>
          )}
          {(location || editable) && (
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: pinkAccent }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <EditableText
                value={location}
                placeholder="City, Country"
                editable={editable}
                onChange={(val) => onChange('location', val)}
                className="text-sm"
                style={{ fontSize: '12px' }}
              />
            </div>
          )}
          {socialMedia?.linkedin && (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pinkAccent }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <span className="text-sm" style={{ fontSize: '12px' }}>{socialMedia.linkedin}</span>
            </div>
          )}
        </div>

        {/* ABOUT ME Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
            ABOUT ME
          </h3>
          <EditableText
            value={summary}
            placeholder="Professional summary"
            editable={editable}
            onChange={(val) => onChange('summary', val)}
            className="text-sm leading-relaxed"
            style={{ fontSize: '11px', lineHeight: '1.5' }}
            multiline
          />
        </div>

        {/* EDUCATION Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>
            EDUCATION
          </h3>
          {education && education.length > 0 ? (
            education.map((edu, idx) => (
              <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                <EditableText
                  value={edu.degree || ''}
                  placeholder="Degree"
                  editable={editable}
                  onChange={(val) => onChange(`education.${idx}.degree`, val)}
                  className="text-sm mb-2"
                  style={{ fontSize: '12px' }}
                />
                <EditableText
                  value={edu.institution || ''}
                  placeholder="University"
                  editable={editable}
                  onChange={(val) => onChange(`education.${idx}.institution`, val)}
                  className="text-sm mb-3"
                  style={{ fontSize: '12px' }}
                />
                <div className="flex flex-wrap gap-2">
                  <EditableText
                    value={formatEducationYear(edu)}
                    placeholder="2005 - 2009"
                    editable={editable}
                    onChange={(val) => onChange(`education.${idx}.year`, val)}
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                  />
                  {(edu.gpa || editable) && (
                    <span 
                      className="px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                    >
                      {'GPA: '}
                      <EditableText
                        value={edu.gpa || ''}
                        placeholder="GPA"
                        editable={editable}
                        onChange={(val) => onChange(`education.${idx}.gpa`, val)}
                        className="inline"
                      />
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="text-sm mb-2" style={{ fontSize: '12px' }}>Bachelor of Arts in Fashion Design</div>
              <div className="text-sm mb-3" style={{ fontSize: '12px' }}>Chidi Eze Fashion University</div>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                >
                  2005 - 2009
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                >
                  GPA: 3.90
                </span>
              </div>
            </>
          )}
        </div>

        {/* SKILL Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>
            SKILL
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                >
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
              ))
            ) : (
              <>
                <span 
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                >
                  Super eye for detail
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: pinkAccent, fontSize: '11px' }}
                >
                  Digital drawing
                </span>
              </>
            )}
          </div>
        </div>

        {/* Certifications */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>CERTIFICATIONS</h3>
            <div className="space-y-2">
              {(certifications || []).slice(0, 3).map((cert, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px' }}>
                  <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} />
                  {cert.issuer && <span className="opacity-80"> - {cert.issuer}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {((languages && languages.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>LANGUAGES</h3>
            <div className="space-y-1">
              {(languages || []).slice(0, 3).map((lang, index) => (
                <div key={index} className="flex justify-between text-sm" style={{ fontSize: '11px' }}>
                  <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} />
                  <span className="opacity-80">{lang.proficiency || 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {((hobbies && hobbies.length > 0) || editable) && (
          <div>
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>HOBBIES</h3>
            <div className="flex flex-wrap gap-2">
              {(hobbies || []).slice(0, 4).map((hobby, index) => (
                <span key={index} className="px-2 py-1 rounded-full text-xs text-white" style={{ backgroundColor: pinkAccent, fontSize: '10px' }}>
                  {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Light Pink */}
      <div 
        className="flex-1 p-6 relative"
        style={{ backgroundColor: pinkBg, color: '#1A1A1A' }}
      >
        {/* Vertical Rotated Text Strip on Right Edge */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-12 flex items-center justify-center z-10"
          style={{ backgroundColor: pinkBg }}
        >
          <div 
            className="font-black uppercase text-center"
            style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '18px',
              letterSpacing: '2px',
              transform: 'rotate(180deg)',
              color: '#1A1A1A'
            }}
          >
            <EditableText
              value={role || ''}
              placeholder="FASHION DESIGNER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="pr-14 mb-5">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>
            EXPERIENCE
          </h3>
          
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="relative pl-6">
                  {/* Starburst Icon */}
                  <div className="absolute left-0 top-1">
                    <svg 
                      className="w-5 h-5"
                      style={{ color: pinkAccent }}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                    </svg>
                  </div>
                  
                  <div>
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Job Title"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      className="font-bold text-base mb-1"
                      style={{ fontSize: '14px', color: '#1A1A1A' }}
                    />
                    <div className="text-sm mb-3" style={{ fontSize: '12px', color: '#1A1A1A' }}>
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        className="inline"
                      />
                      {' | '}
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
                    <div className="text-sm leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#1A1A1A' }}>
                      <EditableText
                        value={exp.description || ''}
                        placeholder="Description of responsibilities and achievements."
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.description`, val)}
                        multiline
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1">
                    <svg 
                      className="w-5 h-5"
                      style={{ color: pinkAccent }}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: '#1A1A1A' }}>Fashion Designer Intern</div>
                    <div className="text-sm mb-3" style={{ fontSize: '12px', color: '#1A1A1A' }}>Borcelle | 2011 - 2012</div>
                    <p className="text-sm leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#1A1A1A' }}>
                      Collaborated with the specialist team to purchase various materials that meet the production standard and requirements for the Winter Fashion event fashion by Juliana Silva.
                    </p>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1">
                    <svg 
                      className="w-5 h-5"
                      style={{ color: pinkAccent }}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: '#1A1A1A' }}>Fashion Designer</div>
                    <div className="text-sm mb-3" style={{ fontSize: '12px', color: '#1A1A1A' }}>Borcelle | 2012 - Present</div>
                    <p className="text-sm leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.6', color: '#1A1A1A' }}>
                      Solved one of the biggest fashion production mistakes coming from the new intern team that almost ruined the 2022 Claudia Alves Fashion Award event. The new garments created a buzz on the internet after it was displayed at the event, worn by Samira Hadid.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="pr-14 mb-5">
          <h3 className="text-sm font-bold uppercase mb-4" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>
            PROJECTS
          </h3>
          <div className="space-y-3">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-1">
                    <svg 
                      className="w-5 h-5"
                      style={{ color: pinkAccent }}
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <EditableText
                      value={project.name || ''}
                      placeholder="Project Name"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold text-base mb-1"
                      style={{ fontSize: '14px', color: '#1A1A1A' }}
                    />
                    {(project.description || editable) && (
                      <div className="mb-2">
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          className="text-sm leading-relaxed"
                          style={{ fontSize: '11px', lineHeight: '1.6', color: '#1A1A1A' }}
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
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: pinkAccent, color: '#1A1A1A', fontSize: '10px' }}
                        />
                      </div>
                    )}
                    <div className="flex gap-3 text-xs" style={{ fontSize: '10px', color: '#1A1A1A' }}>
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
                <div className="absolute left-0 top-1">
                  <svg className="w-5 h-5" style={{ color: pinkAccent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: '#1A1A1A' }}>Creative Portfolio</div>
                  <div className="text-sm leading-relaxed mb-2" style={{ fontSize: '11px', lineHeight: '1.6', color: '#1A1A1A' }}>
                    Developed a creative portfolio showcasing design work with interactive animations and smooth transitions.
                  </div>
                  <div className="px-2 py-1 rounded text-xs inline-block" style={{ backgroundColor: pinkAccent, color: '#1A1A1A', fontSize: '10px' }}>
                    HTML, CSS, JavaScript, GSAP
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        {((awards && awards.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>AWARDS</h3>
            <div className="space-y-2">
              {(awards || []).slice(0, 2).map((award, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="font-bold" />
                  {award.organization && <span className="opacity-70"> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>TRAINING</h3>
            <div className="space-y-1">
              {(trainings || []).slice(0, 2).map((training, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                  {training.institution && <span className="opacity-70"> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>VOLUNTEER</h3>
            <div className="space-y-1">
              {(volunteerWork || []).slice(0, 2).map((vol, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                  {vol.role && <span className="opacity-70"> - {vol.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>INTERESTS</h3>
            <div className="flex flex-wrap gap-2">
              {(interests || []).slice(0, 4).map((interest, index) => (
                <span key={index} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: pinkAccent, color: '#1A1A1A', fontSize: '10px' }}>
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>PUBLICATIONS</h3>
            <div className="space-y-2">
              {(publications || []).slice(0, 3).map((pub, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={pub.title || ''} placeholder="Publication Title" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} className="font-bold" />
                  {pub.journal && <span className="opacity-70"> - {pub.journal}</span>}
                  {pub.year && <span className="opacity-70"> ({pub.year})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>PATENTS</h3>
            <div className="space-y-2">
              {(patents || []).slice(0, 3).map((patent, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={patent.title || ''} placeholder="Patent Title" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} className="font-bold" />
                  {patent.patentNumber && <span className="opacity-70"> - {patent.patentNumber}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>MEMBERSHIPS</h3>
            <div className="space-y-1">
              {(professionalMemberships || []).slice(0, 3).map((mem, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                  {mem.role && <span className="opacity-70"> - {mem.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>CONFERENCES</h3>
            <div className="space-y-1">
              {(conferences || []).slice(0, 3).map((conf, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                  {conf.location && <span className="opacity-70"> - {conf.location}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>SPEAKING</h3>
            <div className="space-y-1">
              {(speakingEngagements || []).slice(0, 3).map((speak, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                  {speak.event && <span className="opacity-70"> - {speak.event}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>TEACHING</h3>
            <div className="space-y-1">
              {(teachingExperience || []).slice(0, 3).map((teach, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                  {teach.institution && <span className="opacity-70"> - {teach.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>MENTORING</h3>
            <div className="space-y-1">
              {(mentoring || []).slice(0, 3).map((ment, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} />
                  {ment.focus && <span className="opacity-70"> - {ment.focus}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>LEADERSHIP</h3>
            <div className="space-y-1">
              {(leadershipRoles || []).slice(0, 3).map((lead, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} />
                  {lead.organization && <span className="opacity-70"> - {lead.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>INTERNSHIPS</h3>
            <div className="space-y-1">
              {(internships || []).slice(0, 3).map((intern, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                  {intern.company && <span className="opacity-70"> - {intern.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>LICENSES</h3>
            <div className="space-y-1">
              {(licenses || []).slice(0, 3).map((lic, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                  {lic.issuingOrganization && <span className="opacity-70"> - {lic.issuingOrganization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((references && references.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>REFERENCES</h3>
            <div className="space-y-1">
              {(references || []).slice(0, 3).map((ref, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} />
                  {ref.title && <span className="opacity-70"> - {ref.title}</span>}
                  {ref.company && <span className="opacity-70">, {ref.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="pr-14 mb-5">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>OPEN SOURCE</h3>
            <div className="space-y-1">
              {(openSourceContributions || []).slice(0, 3).map((os, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '11px', color: '#1A1A1A' }}>
                  <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {((additionalInfo && additionalInfo.trim()) || editable) && (
          <div className="pr-14">
            <h3 className="text-sm font-bold uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A1A' }}>ADDITIONAL INFO</h3>
            <div className="text-sm leading-relaxed" style={{ fontSize: '11px', color: '#1A1A1A' }}>
              <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoraMontminyTemplate;
