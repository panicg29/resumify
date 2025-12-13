import React from 'react';
import EditableText from '../EditableText';

const PhylisFlexTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const lightGray = '#E5E5E5'; // Light gray header and left column
  const white = '#FFFFFF';
  const textDark = '#333333';
  const textMedium = '#666666';

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || 'Present');
    return `${start} - ${end}`;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (!edu.year) return '';
    if (typeof edu.year === 'string' && edu.year.includes('-')) {
      return edu.year;
    }
    if (typeof edu.year === 'number') {
      return `${edu.year - 2} - ${edu.year}`;
    }
    return String(edu.year);
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: white }}
    >
      {/* Header Section - Light Gray */}
      <div 
        className="p-6 relative"
        style={{ backgroundColor: lightGray }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 
              className="text-4xl font-bold uppercase mb-2"
              style={{ color: textDark }}
            >
              <EditableText
                value={name || ''}
                placeholder="PHYLIS FLEX"
                editable={editable}
                onChange={(val) => onChange('name', val)}
                style={{ color: textDark }}
              />
            </h1>
            <p 
              className="text-lg uppercase text-center"
              style={{ color: textDark }}
            >
              <EditableText
                value={formData.role || ''}
                placeholder="GRAPHIC DESIGNER"
                editable={editable}
                onChange={(val) => onChange('role', val)}
                style={{ color: textDark }}
              />
            </p>
          </div>
        </div>
      </div>

      {/* Main Body - Two Columns */}
      <div className="flex">
        {/* Left Column - Light Gray Background */}
        <div 
          className="w-[35%] p-6"
          style={{ backgroundColor: lightGray }}
        >
          {/* Contact Section */}
          <div className="mb-6">
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              CONTACT
            </h3>
            <div className="space-y-2 text-sm" style={{ color: textDark }}>
              {(phone || editable) && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableText
                    value={phone}
                    placeholder="123-456-7890"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <EditableText
                    value={location}
                    placeholder="www.reallygreatsite.com"
                    editable={editable}
                    onChange={(val) => onChange('location', val)}
                    style={{ color: textDark }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              EDUCATION
            </h3>
            <div 
              className="w-full h-px mb-3"
              style={{ backgroundColor: textDark }}
            ></div>
            <div className="space-y-4">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index}>
                    <div 
                      className="font-bold mb-1"
                      style={{ color: textDark }}
                    >
                      <EditableText
                        value={edu.degree || ''}
                        placeholder="Masters in Product Design"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    <div className="text-sm mb-1" style={{ color: textDark }}>
                      <EditableText
                        value={edu.institution || ''}
                        placeholder="Fauget Academy"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.institution`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    <div className="text-sm" style={{ color: textDark }}>
                      {formatEducationYear(edu)}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>Masters in Product Design</div>
                    <div className="text-sm mb-1" style={{ color: textDark }}>Fauget Academy</div>
                    <div className="text-sm" style={{ color: textDark }}>2019-2021</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>BA Product Design</div>
                    <div className="text-sm mb-1" style={{ color: textDark }}>Borcelle Academy</div>
                    <div className="text-sm" style={{ color: textDark }}>2015-2019</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              SKILLS
            </h3>
            <div 
              className="w-full h-px mb-3"
              style={{ backgroundColor: textDark }}
            ></div>
            <div 
              className="text-xs uppercase mb-2"
              style={{ color: textDark }}
            >
              PROFESSIONAL
            </div>
            <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
              {skills && skills.length > 0 ? (
                skills.slice(0, 8).map((skill, index) => (
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
                  <li>Time management</li>
                  <li>Problem solving</li>
                  <li>Communication</li>
                  <li>Creativity</li>
                  <li>Leadership</li>
                  <li>Quick learner</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column - White Background */}
        <div className="flex-1 p-8" style={{ backgroundColor: white }}>
          {/* Profile Section */}
          <div className="mb-8">
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              PROFILE
            </h3>
            <div 
              className="w-full h-px mb-3"
              style={{ backgroundColor: textDark }}
            ></div>
            <div className="text-sm leading-relaxed" style={{ color: textDark }}>
              <EditableText
                value={summary || ''}
                placeholder="Assists the department head in carrying out digital marketing campaigns works closely with the marketing head for digital promotions and others. Develop and maintain graphical standards, templates, and resources."
                editable={editable}
                onChange={(val) => onChange('summary', val)}
                style={{ color: textDark }}
                multiline
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              EXPERIENCE
            </h3>
            <div 
              className="w-full h-px mb-3"
              style={{ backgroundColor: textDark }}
            ></div>
            <div className="space-y-4 relative pl-4">
              <div 
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: textDark }}
              ></div>
              {experience && experience.length > 0 ? (
                experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="absolute -left-2 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: textDark }}
                    ></div>
                    <div 
                      className="font-bold mb-1"
                      style={{ color: textDark }}
                    >
                      <EditableText
                        value={exp.title || ''}
                        placeholder="ART DIRECTOR"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                        style={{ color: textDark }}
                      />
                    </div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Really Great Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        style={{ color: textDark }}
                      />
                      {' '}
                      {formatExperienceDate(exp) && `| ${formatExperienceDate(exp)}`}
                    </div>
                    {(exp.description || editable) && (
                      <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                        {exp.description ? (
                          exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                            <li key={i}>{line}</li>
                          ))
                        ) : (
                          <li>
                            <EditableText
                              value={exp.description || ''}
                              placeholder="Comes up with unique graphic designs for clients."
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.description`, val)}
                              style={{ color: textDark }}
                              multiline
                            />
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="relative">
                    <div 
                      className="absolute -left-2 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: textDark }}
                    ></div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>ART DIRECTOR</div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Really Great Company | 2023</div>
                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                      <li>Comes up with unique graphic designs for clients.</li>
                      <li>Brainstorms innovative ideas for the company's portfolio.</li>
                      <li>Works closely with the copywriting team.</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div 
                      className="absolute -left-2 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: textDark }}
                    ></div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>PROJECT MANAGER</div>
                    <div className="text-sm mb-2" style={{ color: textDark }}>Really Great Company | 2025</div>
                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                      <li>Edited editorial photos for clients and magazines</li>
                      <li>Increase lift for existing packages in varied lines of business.</li>
                      <li>Tasked to make graphics for online layouts.</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 
              className="text-base font-bold uppercase mb-3"
              style={{ color: textDark }}
            >
              PROJECTS
            </h3>
            <div 
              className="w-full h-px mb-3"
              style={{ backgroundColor: textDark }}
            ></div>
            <div className="space-y-3">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index}>
                    <div 
                      className="font-bold mb-1"
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
                      <div className="text-sm" style={{ color: textMedium }}>
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          style={{ color: textMedium }}
                          multiline
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>Brand Identity Design</div>
                  <div className="text-sm" style={{ color: textMedium }}>
                    Created comprehensive brand identity for client including logo, color palette, and marketing materials.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Sections - ALL FIELDS */}
          {((certifications && certifications.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>CERTIFICATIONS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(certifications || []).map((cert, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} className="font-bold" />
                    {cert.issuer && <span style={{ color: textMedium }}> - {cert.issuer}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((trainings && trainings.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>TRAININGS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(trainings || []).map((training, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} />
                    {training.institution && <span style={{ color: textMedium }}> - {training.institution}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((awards && awards.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>AWARDS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(awards || []).map((award, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="font-bold" />
                    {award.organization && <span style={{ color: textMedium }}> - {award.organization}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((publications && publications.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>PUBLICATIONS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(publications || []).map((pub, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} />
                    {pub.journal && <span style={{ color: textMedium }}> - {pub.journal}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((patents && patents.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>PATENTS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(patents || []).map((patent, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} />
                    {patent.patentNumber && <span style={{ color: textMedium }}> - {patent.patentNumber}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((volunteerWork && volunteerWork.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>VOLUNTEER WORK</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(volunteerWork || []).map((vol, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} />
                    {vol.role && <span style={{ color: textMedium }}> - {vol.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>PROFESSIONAL MEMBERSHIPS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(professionalMemberships || []).map((mem, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} />
                    {mem.role && <span style={{ color: textMedium }}> - {mem.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((conferences && conferences.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>CONFERENCES</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(conferences || []).map((conf, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} />
                    {conf.location && <span style={{ color: textMedium }}> - {conf.location}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>SPEAKING ENGAGEMENTS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(speakingEngagements || []).map((speak, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} />
                    {speak.event && <span style={{ color: textMedium }}> - {speak.event}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((teachingExperience && teachingExperience.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>TEACHING EXPERIENCE</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(teachingExperience || []).map((teach, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} />
                    {teach.institution && <span style={{ color: textMedium }}> - {teach.institution}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((mentoring && mentoring.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>MENTORING</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(mentoring || []).map((ment, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={ment.program || ''} placeholder="Program" editable={editable} onChange={(val) => onChange(`mentoring.${index}.program`, val)} />
                    {ment.role && <span style={{ color: textMedium }}> - {ment.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>LEADERSHIP ROLES</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(leadershipRoles || []).map((lead, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={lead.role || ''} placeholder="Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.role`, val)} />
                    {lead.organization && <span style={{ color: textMedium }}> - {lead.organization}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((internships && internships.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>INTERNSHIPS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(internships || []).map((intern, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} />
                    {intern.company && <span style={{ color: textMedium }}> - {intern.company}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((licenses && licenses.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>LICENSES</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(licenses || []).map((lic, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} />
                    {lic.issuer && <span style={{ color: textMedium }}> - {lic.issuer}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((references && references.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>REFERENCES</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="grid grid-cols-2 gap-4">
                {(references || []).map((ref, index) => (
                  <div key={index}>
                    <div className="font-bold mb-1" style={{ color: textDark }}>
                      <EditableText value={ref.name || ''} placeholder="Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} />
                    </div>
                    <div className="text-sm mb-1" style={{ color: textMedium }}>
                      <EditableText value={ref.title || ''} placeholder="Title" editable={editable} onChange={(val) => onChange(`references.${index}.title`, val)} />
                      {ref.company && <> / <EditableText value={ref.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`references.${index}.company`, val)} /></>}
                    </div>
                    {ref.phone && <div className="text-sm" style={{ color: textMedium }}>Phone: <EditableText value={ref.phone || ''} placeholder="Phone" editable={editable} onChange={(val) => onChange(`references.${index}.phone`, val)} /></div>}
                    {ref.email && <div className="text-sm" style={{ color: textMedium }}>Email: <EditableText value={ref.email || ''} placeholder="Email" editable={editable} onChange={(val) => onChange(`references.${index}.email`, val)} /></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>OPEN SOURCE CONTRIBUTIONS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="space-y-2">
                {(openSourceContributions || []).map((os, index) => (
                  <div key={index} className="text-sm" style={{ color: textDark }}>
                    <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {((hobbies && hobbies.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>HOBBIES</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="flex flex-wrap gap-2">
                {(hobbies || []).map((hobby, index) => (
                  <span key={index} className="px-2 py-1 text-xs border" style={{ borderColor: textDark, color: textDark }}>
                    {typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {((interests && interests.length > 0) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>INTERESTS</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="flex flex-wrap gap-2">
                {(interests || []).map((interest, index) => (
                  <span key={index} className="px-2 py-1 text-xs border" style={{ borderColor: textDark, color: textDark }}>
                    {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {((additionalInfo && additionalInfo.trim()) || editable) && (
            <div className="mb-6">
              <h3 className="text-base font-bold uppercase mb-3" style={{ color: textDark }}>ADDITIONAL INFO</h3>
              <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
              <div className="text-sm leading-relaxed" style={{ color: textDark }}>
                <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhylisFlexTemplate;

