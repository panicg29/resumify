import React from 'react';
import EditableText from '../EditableText';

const DonnaStroupeTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const sidebarBg = '#E5E5E5'; // Light gray
  const mainBg = '#FFFFFF';
  const textDark = '#333333';
  const textLight = '#333333';

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'present' : (exp.endDate || 'present');
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
      className="w-[21cm] h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: mainBg }}
    >
      {/* Left Sidebar - Light Gray */}
      <div 
        className="w-[35%] p-6 flex flex-col items-center"
        style={{ backgroundColor: sidebarBg, color: textLight }}
      >
        {/* Contact Information */}
        <div className="mb-8 w-full">
          <div className="space-y-4">
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
                  style={{ fontSize: '12px' }}
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
                  style={{ fontSize: '12px' }}
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
                  style={{ fontSize: '12px' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* EDUCATION Section */}
        <div className="mb-8 w-full">
          <h3 className="text-sm font-bold uppercase mb-4 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            EDUCATION
          </h3>
          <div className="border-t border-gray-600 mb-4"></div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <EditableText
                    value={edu.degree || ''}
                    placeholder="Degree"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.degree`, val)}
                    className="text-sm mb-1 font-semibold"
                    style={{ fontSize: '12px' }}
                  />
                  <EditableText
                    value={edu.institution || ''}
                    placeholder="Institution"
                    editable={editable}
                    onChange={(val) => onChange(`education.${index}.institution`, val)}
                    className="text-sm mb-1"
                    style={{ fontSize: '12px' }}
                  />
                  <div className="text-sm" style={{ fontSize: '12px' }}>
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
                  <div className="text-sm mb-1 font-semibold" style={{ fontSize: '12px' }}>BA Sales and Commerce</div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Wardiere University</div>
                  <div className="text-sm" style={{ fontSize: '12px' }}>2011 - 2015</div>
                </div>
                <div>
                  <div className="text-sm mb-1 font-semibold" style={{ fontSize: '12px' }}>BA Sales and Commerce</div>
                  <div className="text-sm mb-1" style={{ fontSize: '12px' }}>Wardiere University</div>
                  <div className="text-sm" style={{ fontSize: '12px' }}>2011 - 2015</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SKILLS Section */}
        <div className="mb-8 w-full">
          <h3 className="text-sm font-bold uppercase mb-4 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            SKILLS
          </h3>
          <div className="border-t border-gray-600 mb-4"></div>
          <div className="space-y-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <EditableText
                    value={skill.name || ''}
                    placeholder="Skill"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    className="text-sm"
                    style={{ fontSize: '12px' }}
                  />
                  {skill.level && (
                    <>
                      {' ('}
                      <EditableText
                        value={skill.level || ''}
                        placeholder="Level"
                        editable={editable}
                        onChange={(val) => onChange(`skills.${index}.level`, val)}
                        className="inline text-sm"
                        style={{ fontSize: '12px' }}
                      />
                      {')'}
                    </>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Fast-moving Consumer Goods</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Packaged Consumer Goods</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Sales</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Corporate sales account management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span className="text-sm" style={{ fontSize: '12px' }}>Experience in retail</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* LANGUAGE Section */}
        <div className="w-full">
          <h3 className="text-sm font-bold uppercase mb-4 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            LANGUAGE
          </h3>
          <div className="border-t border-gray-600 mb-4"></div>
          <div className="space-y-2">
            <div className="text-sm" style={{ fontSize: '12px' }}>English</div>
            <div className="text-sm" style={{ fontSize: '12px' }}>French</div>
          </div>
        </div>
      </div>

      {/* Right Column - White */}
      <div 
        className="flex-1 p-6 flex flex-col overflow-y-auto"
        style={{ backgroundColor: mainBg, color: textDark, maxHeight: '29.7cm' }}
      >
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '38px', lineHeight: '1.1', letterSpacing: '1px' }}
          >
            <EditableText
              value={name || ''}
              placeholder="DONNA STROUPE"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="uppercase"
            />
          </h1>
          <p 
            className="uppercase"
            style={{ fontSize: '16px', fontWeight: 'normal', letterSpacing: '1px' }}
          >
            <EditableText
              value={role || ''}
              placeholder="SALES REPRESENTATIVE"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
            />
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase mb-4 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            ABOUT ME
          </h3>
          <div className="border-t border-gray-600 mb-4"></div>
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

        {/* WORK EXPERIENCE Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase mb-3 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            WORK EXPERIENCE
          </h3>
          <div className="border-t border-gray-600 mb-3"></div>
          <div className="space-y-4">
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
                        style={{ fontSize: '14px' }}
                      />
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        className="text-sm"
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px' }}>
                      <EditableText
                        value={exp.startDate || ''}
                        placeholder="Start Date"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                        className="inline"
                      />
                      {' - '}
                      {exp.current ? (
                        'present'
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
                        style={{ fontSize: '12px', lineHeight: '1.5' }}
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
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px' }}>Consumer Goods Seller</div>
                      <div className="text-sm" style={{ fontSize: '13px' }}>Timmerman Industries</div>
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px' }}>Aug 2018 - present</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Offer consumer goods packages to clients.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Meet with clients to discuss their needs.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>Train junior sales agents.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase mb-4 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            PROJECTS
          </h3>
          <div className="border-t border-gray-600 mb-4"></div>
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
                    style={{ fontSize: '14px' }}
                  />
                  {(project.description || editable) && (
                    <div className="mb-2">
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
                        className="px-2 py-0.5 text-xs border border-gray-600"
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
              ))
            ) : (
              <div>
                <div className="font-bold text-base mb-1" style={{ fontSize: '14px' }}>Inventory Management App</div>
                <div className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Developed an inventory management application with barcode scanning, real-time stock updates, and automated reorder alerts.
                </div>
                <div className="px-2 py-0.5 text-xs border border-gray-600 inline-block" style={{ fontSize: '11px' }}>
                  Vue.js, Express, MySQL
                </div>
              </div>
            )}
          </div>
        </div>

        {/* REFERENCES Section */}
        <div className="mt-auto mb-4">
          <h3 className="text-sm font-bold uppercase mb-3 text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
            REFERENCES
          </h3>
          <div className="border-t border-gray-600 mb-3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-sm mb-1" style={{ fontSize: '12px' }}>Estelle Darcy</div>
              <div className="text-xs mb-1" style={{ fontSize: '11px' }}>Wardiere Inc. / CEO</div>
              <div className="text-xs" style={{ fontSize: '11px' }}>+123-456-7890</div>
              <div className="text-xs" style={{ fontSize: '11px' }}>hello@reallygreatsite.com</div>
            </div>
            <div>
              <div className="font-bold text-sm mb-1" style={{ fontSize: '12px' }}>Harper Russo</div>
              <div className="text-xs mb-1" style={{ fontSize: '11px' }}>Wardiere Inc. / CEO</div>
              <div className="text-xs" style={{ fontSize: '11px' }}>+123-456-7890</div>
              <div className="text-xs" style={{ fontSize: '11px' }}>hello@reallygreatsite.com</div>
            </div>
          </div>
        </div>

        {/* Additional Sections - Compact */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>CERTIFICATIONS</h3>
            <div className="space-y-1">
              {(certifications || []).slice(0, 2).map((cert, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} />
                  {cert.issuer && <span className="opacity-70"> - {cert.issuer}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((languages && languages.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>LANGUAGES</h3>
            <div className="space-y-1">
              {(languages || []).slice(0, 3).map((lang, index) => (
                <div key={index} className="flex justify-between text-xs" style={{ fontSize: '10px' }}>
                  <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} />
                  <span className="opacity-70">{lang.proficiency || 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>AWARDS</h3>
            <div className="space-y-1">
              {(awards || []).slice(0, 2).map((award, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} />
                  {award.organization && <span className="opacity-70"> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>TRAININGS</h3>
            <div className="space-y-1">
              {(trainings || []).slice(0, 2).map((training, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                  {training.institution && <span className="opacity-70"> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>PUBLICATIONS</h3>
            <div className="space-y-1">
              {(publications || []).slice(0, 2).map((pub, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} />
                  {pub.journal && <span className="opacity-70"> - {pub.journal}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>PATENTS</h3>
            <div className="space-y-1">
              {(patents || []).slice(0, 2).map((patent, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} />
                  {patent.patentNumber && <span className="opacity-70"> - {patent.patentNumber}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>VOLUNTEER</h3>
            <div className="space-y-1">
              {(volunteerWork || []).slice(0, 2).map((vol, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                  {vol.role && <span className="opacity-70"> - {vol.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>MEMBERSHIPS</h3>
            <div className="space-y-1">
              {(professionalMemberships || []).slice(0, 2).map((mem, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                  {mem.role && <span className="opacity-70"> - {mem.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>CONFERENCES</h3>
            <div className="space-y-1">
              {(conferences || []).slice(0, 2).map((conf, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                  {conf.location && <span className="opacity-70"> - {conf.location}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>SPEAKING</h3>
            <div className="space-y-1">
              {(speakingEngagements || []).slice(0, 2).map((speak, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                  {speak.event && <span className="opacity-70"> - {speak.event}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>TEACHING</h3>
            <div className="space-y-1">
              {(teachingExperience || []).slice(0, 2).map((teach, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                  {teach.institution && <span className="opacity-70"> - {teach.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>MENTORING</h3>
            <div className="space-y-1">
              {(mentoring || []).slice(0, 2).map((ment, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} />
                  {ment.focus && <span className="opacity-70"> - {ment.focus}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>LEADERSHIP</h3>
            <div className="space-y-1">
              {(leadershipRoles || []).slice(0, 2).map((lead, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} />
                  {lead.organization && <span className="opacity-70"> - {lead.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>INTERNSHIPS</h3>
            <div className="space-y-1">
              {(internships || []).slice(0, 2).map((intern, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                  {intern.company && <span className="opacity-70"> - {intern.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>LICENSES</h3>
            <div className="space-y-1">
              {(licenses || []).slice(0, 2).map((lic, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                  {lic.issuingOrganization && <span className="opacity-70"> - {lic.issuingOrganization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>OPEN SOURCE</h3>
            <div className="space-y-1">
              {(openSourceContributions || []).slice(0, 2).map((os, index) => (
                <div key={index} className="text-xs text-center" style={{ fontSize: '10px' }}>
                  <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>INTERESTS</h3>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {(interests || []).slice(0, 4).map((interest, index) => (
                <span key={index} className="px-2 py-0.5 text-xs border border-gray-600" style={{ fontSize: '9px' }}>
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((hobbies && hobbies.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>HOBBIES</h3>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {(hobbies || []).slice(0, 4).map((hobby, index) => (
                <span key={index} className="px-2 py-0.5 text-xs border border-gray-600" style={{ fontSize: '9px' }}>
                  {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                </span>
              ))}
            </div>
          </div>
        )}

        {((additionalInfo && additionalInfo.trim()) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase mb-2 text-center" style={{ fontSize: '11px', letterSpacing: '1px' }}>ADDITIONAL INFO</h3>
            <div className="text-xs text-center leading-tight" style={{ fontSize: '10px' }}>
              <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonnaStroupeTemplate;

