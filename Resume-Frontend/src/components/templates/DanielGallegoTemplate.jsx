import React from 'react';
import EditableText from '../EditableText';

const DanielGallegoTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const whiteBg = '#FFFFFF';
  const headerBg = '#E5E5E5'; // Light grey
  const textDark = '#000000'; // Pure black
  const textLight = '#333333'; // Darker for better visibility

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
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: whiteBg }}
    >
      <div className="p-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '38px', lineHeight: '1.1', letterSpacing: '1px', color: textDark }}
          >
            <EditableText
              value={name || ''}
              placeholder="DANIEL GALLEGO"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="uppercase"
            />
          </h1>
          <p 
            className="uppercase mb-3"
            style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', color: textDark }}
          >
            <EditableText
              value={role || ''}
              placeholder="UX DESIGNER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
            />
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ fontSize: '12px', color: textLight }}>
            {(location || editable) && (
              <>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  className="inline"
                  style={{ color: textLight }}
                />
                {(location || editable) && (email || phone || editable) && <span>|</span>}
              </>
            )}
            {(email || editable) && (
              <>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="inline"
                  style={{ color: textLight }}
                />
                {(email || editable) && (phone || editable) && <span>|</span>}
              </>
            )}
            {(phone || editable) && (
              <EditableText
                value={phone}
                placeholder="+123-456-7890"
                editable={editable}
                onChange={(val) => onChange('phone', val)}
                className="inline"
                style={{ color: textLight }}
              />
            )}
          </div>
        </div>

        {/* SUMMARY Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              SUMMARY
            </h3>
          </div>
          <EditableText
            value={summary}
            placeholder="Professional summary"
            editable={editable}
            onChange={(val) => onChange('summary', val)}
            className="text-sm leading-relaxed text-justify"
            style={{ fontSize: '13px', lineHeight: '1.6', color: textDark }}
            multiline
          />
        </div>

        {/* TECHNICAL SKILLS Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              TECHNICAL SKILLS
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '12px', color: textDark }}>
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
                </div>
              ))
            ) : (
              <>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>User Research</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Wireframing</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Prototyping</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>UI Design</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Figma</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Adobe XD</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Sketch</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>HTML/CSS</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>JavaScript</div>
              </>
            )}
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              PROFESSIONAL EXPERIENCE
            </h3>
          </div>
          <div className="space-y-6">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <EditableText
                        value={exp.title || ''}
                        placeholder="Job Title"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                        className="font-bold text-base mb-1"
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
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>
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
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Senior UX Designer</div>
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Tech Innovations Inc.</div>
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Jan 2023 - Present</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Led UX design for multiple product launches.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Conducted user research and usability testing.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Collaborated with cross-functional teams.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              PROJECTS
            </h3>
          </div>
          <div className="space-y-6">
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
                        style={{ fontSize: '11px', borderColor: textLight, color: textDark }}
                      />
                    </div>
                  )}
                  <div className="flex gap-3 text-xs" style={{ fontSize: '11px' }}>
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
                <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Social Media Platform</div>
                <div className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>
                  Developed a social media platform with user profiles, post creation, commenting system, and real-time notifications.
                </div>
                <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '11px', borderColor: textLight, color: textDark }}>
                  React, Firebase, Material-UI
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATION Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              EDUCATION
            </h3>
          </div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <EditableText
                        value={edu.degree || ''}
                        placeholder="Degree"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="font-bold text-base mb-1"
                        style={{ fontSize: '14px', color: textDark }}
                      />
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>
                        <EditableText
                          value={edu.institution || ''}
                          placeholder="Institution"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.institution`, val)}
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
                    <EditableText
                      value={formatEducationYear(edu) || edu.year || ''}
                      placeholder="Year"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.year`, val)}
                      className="text-sm"
                      style={{ fontSize: '12px', color: textDark }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Bachelor of Design</div>
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Design University</div>
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>2018 - 2022</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ALL ADDITIONAL FIELDS */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>CERTIFICATIONS</h3>
            </div>
            <div className="space-y-2">
              {(certifications || []).map((cert, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} />
                  </span>
                  {cert.issuer && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {cert.issuer}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>TRAININGS</h3>
            </div>
            <div className="space-y-2">
              {(trainings || []).map((training, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                  </span>
                  {training.institution && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>AWARDS</h3>
            </div>
            <div className="space-y-2">
              {(awards || []).map((award, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} />
                  </span>
                  {award.organization && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((languages && languages.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>LANGUAGES</h3>
            </div>
            <div className="space-y-2">
              {(languages || []).map((lang, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} />
                  </span>
                  {lang.proficiency && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> ({lang.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>PUBLICATIONS</h3>
            </div>
            <div className="space-y-2">
              {(publications || []).map((pub, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} />
                  </span>
                  {pub.journal && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {pub.journal}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>PATENTS</h3>
            </div>
            <div className="space-y-2">
              {(patents || []).map((patent, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} />
                  </span>
                  {patent.patentNumber && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {patent.patentNumber}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>VOLUNTEER WORK</h3>
            </div>
            <div className="space-y-2">
              {(volunteerWork || []).map((vol, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                  </span>
                  {vol.role && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {vol.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>MEMBERSHIPS</h3>
            </div>
            <div className="space-y-2">
              {(professionalMemberships || []).map((mem, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                  </span>
                  {mem.role && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {mem.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>CONFERENCES</h3>
            </div>
            <div className="space-y-2">
              {(conferences || []).map((conf, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                  </span>
                  {conf.location && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {conf.location}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>SPEAKING</h3>
            </div>
            <div className="space-y-2">
              {(speakingEngagements || []).map((speak, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                  </span>
                  {speak.event && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {speak.event}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>TEACHING</h3>
            </div>
            <div className="space-y-2">
              {(teachingExperience || []).map((teach, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                  </span>
                  {teach.institution && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {teach.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>MENTORING</h3>
            </div>
            <div className="space-y-2">
              {(mentoring || []).map((ment, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} />
                  </span>
                  {ment.focus && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {ment.focus}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>LEADERSHIP</h3>
            </div>
            <div className="space-y-2">
              {(leadershipRoles || []).map((lead, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} />
                  </span>
                  {lead.organization && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {lead.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>INTERNSHIPS</h3>
            </div>
            <div className="space-y-2">
              {(internships || []).map((intern, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                  </span>
                  {intern.company && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {intern.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>LICENSES</h3>
            </div>
            <div className="space-y-2">
              {(licenses || []).map((lic, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                  </span>
                  {lic.issuingOrganization && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {lic.issuingOrganization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((references && references.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>REFERENCES</h3>
            </div>
            <div className="space-y-2">
              {(references || []).map((ref, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} />
                  </span>
                  {ref.title && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}> - {ref.title}</span>}
                  {ref.company && <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>, {ref.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>OPEN SOURCE</h3>
            </div>
            <div className="space-y-2">
              {(openSourceContributions || []).map((os, index) => (
                <div key={index}>
                  <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>
                    <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((hobbies && hobbies.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>HOBBIES</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(hobbies || []).map((hobby, index) => (
                <span key={index} className="px-2 py-1 text-xs border" style={{ fontSize: '11px', borderColor: textDark, color: textDark }}>
                  {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>INTERESTS</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(interests || []).map((interest, index) => (
                <span key={index} className="px-2 py-1 text-xs border" style={{ fontSize: '11px', borderColor: textDark, color: textDark }}>
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((additionalInfo && additionalInfo.trim()) || editable) && (
          <div className="mb-6">
            <div className="py-2 px-4 mb-4" style={{ backgroundColor: headerBg }}>
              <h3 className="font-bold uppercase" style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}>ADDITIONAL INFORMATION</h3>
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

export default DanielGallegoTemplate;

