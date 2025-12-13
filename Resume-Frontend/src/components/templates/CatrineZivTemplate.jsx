import React from 'react';
import EditableText from '../EditableText';

const CatrineZivTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const darkGreen = '#6B706B'; // Dark green-grey sidebar
  const offWhite = '#F5F0E8'; // Light off-white main
  const textDark = '#4A3728'; // Dark grey/brown
  const textLight = '#6B4E3D'; // Light grey/brown for dates
  const textWhite = '#FFFFFF'; // White text for sidebar

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'present' : (exp.endDate || 'present');
    return `${start} - ${end}`;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (!edu.year) return '';
    if (typeof edu.year === 'string' && edu.year.includes('-')) {
      return edu.year;
    }
    if (typeof edu.year === 'number') {
      return `${edu.year - 1} - ${edu.year}`;
    }
    return String(edu.year);
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: offWhite }}
    >
      {/* Left Column - Dark Green-Grey Background */}
      <div 
        className="w-[35%] p-6 flex flex-col"
        style={{ backgroundColor: darkGreen }}
      >
        {/* Profile Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            PROFILE
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: textWhite }}>
            <EditableText
              value={summary || ''}
              placeholder="IT project manager with holistic knowledge and experience in software development, project management, and team coordination."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textWhite }}
              multiline
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            SKILLS
          </h3>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textWhite }}>
            {skills && skills.length > 0 ? (
              skills.slice(0, 8).map((skill, index) => (
                <li key={index}>
                  <EditableText
                    value={skill.name || ''}
                    placeholder={`Skill ${index + 1}`}
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    style={{ color: textWhite }}
                  />
                </li>
              ))
            ) : (
              <>
                <li>Project Management</li>
                <li>Software Development</li>
                <li>Process Improvement</li>
                <li>Team Leadership</li>
                <li>Agile Methodology</li>
                <li>Risk Management</li>
              </>
            )}
          </ul>
        </div>

        {/* Awards Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            AWARDS
          </h3>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textWhite }}>
            <li>Most Outstanding Employee of the Year, Pixelpoint Hive (2015)</li>
            <li>Best Mobile App Design, HGFZ Graduate Center (2014)</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-auto">
          <div className="space-y-2 text-sm" style={{ color: textWhite }}>
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ color: textWhite }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="hello@reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ color: textWhite }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textWhite }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Light Off-White Background */}
      <div className="flex-1 p-8" style={{ backgroundColor: offWhite }}>
        {/* Name and Title */}
        <div className="mb-8">
          <h1 
            className="text-5xl font-bold mb-2"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif'
            }}
          >
            <EditableText
              value={name || ''}
              placeholder="Catrine Ziv"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              style={{ color: textDark }}
            />
          </h1>
          <p 
            className="text-lg uppercase"
            style={{ 
              color: textLight,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'normal'
            }}
          >
            <EditableText
              value={formData.role || ''}
              placeholder="IT PROJECT MANAGER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textLight }}
            />
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            WORK EXPERIENCE
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Project Manager"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Westheon FGW"
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
                            placeholder="Conduct day-to-day project coordination, planning, and implementation across multiple teams."
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
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>Project Manager</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Westheon FGW | Oct 2017 - present</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Conduct day-to-day project coordination, planning, and implementation across multiple teams.</li>
                    <li>Manage project timelines and deliverables.</li>
                    <li>Coordinate with stakeholders and team members.</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>Senior Project Coordinator</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Tech Solutions Inc. | Jan 2015 - Sep 2017</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Assisted in project planning and execution.</li>
                    <li>Maintained project documentation and reports.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Educational History Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            EDUCATIONAL HISTORY
          </h3>
          <div 
            className="w-full h-px mb-4"
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
                      value={edu.institution || ''}
                      placeholder="HGFZ Graduate Center"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>
                    <EditableText
                      value={edu.degree || ''}
                      placeholder="Masters in Project Management"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.degree`, val)}
                      style={{ color: textDark }}
                    />
                    {' '}
                    {formatEducationYear(edu) && `| ${formatEducationYear(edu)}`}
                  </div>
                  {(edu.gpa || editable) && (
                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                      <li>
                        <EditableText
                          value={edu.gpa ? `GPA: ${edu.gpa}` : ''}
                          placeholder="GPA: 3.26"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.gpa`, val.replace('GPA: ', ''))}
                          style={{ color: textDark }}
                        />
                      </li>
                      <li>Minor in Management</li>
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>HGFZ Graduate Center</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Masters in Project Management | Jan 2013 - Dec 2014</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Studied project planning, coordination, and ethics</li>
                    <li>GPA: 3.26</li>
                    <li>Minor in Management</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>University Name</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Bachelor's Degree | 2009 - 2013</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Relevant coursework and achievements</li>
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
            className="w-full h-px mb-4"
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
                    <div className="text-sm" style={{ color: textDark }}>
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        style={{ color: textDark }}
                        multiline
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1" style={{ color: textDark }}>Enterprise Software Implementation</div>
                <div className="text-sm" style={{ color: textDark }}>
                  Led implementation of enterprise software solution for client organization.
                </div>
              </div>
            )}
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
                    {cert.issuer && <span style={{ color: textLight }}> - {cert.issuer}</span>}
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
                    {training.institution && <span style={{ color: textLight }}> - {training.institution}</span>}
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
                    {pub.journal && <span style={{ color: textLight }}> - {pub.journal}</span>}
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
                    {patent.patentNumber && <span style={{ color: textLight }}> - {patent.patentNumber}</span>}
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
                    {vol.role && <span style={{ color: textLight }}> - {vol.role}</span>}
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
                    {mem.role && <span style={{ color: textLight }}> - {mem.role}</span>}
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
                    {conf.location && <span style={{ color: textLight }}> - {conf.location}</span>}
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
                    {speak.event && <span style={{ color: textLight }}> - {speak.event}</span>}
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
                    {teach.institution && <span style={{ color: textLight }}> - {teach.institution}</span>}
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
                    {ment.role && <span style={{ color: textLight }}> - {ment.role}</span>}
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
                    {lead.organization && <span style={{ color: textLight }}> - {lead.organization}</span>}
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
                    {intern.company && <span style={{ color: textLight }}> - {intern.company}</span>}
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
                    {lic.issuer && <span style={{ color: textLight }}> - {lic.issuer}</span>}
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
                    <div className="text-sm mb-1" style={{ color: textLight }}>
                      <EditableText value={ref.title || ''} placeholder="Title" editable={editable} onChange={(val) => onChange(`references.${index}.title`, val)} />
                      {ref.company && <> / <EditableText value={ref.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`references.${index}.company`, val)} /></>}
                    </div>
                    {ref.phone && <div className="text-sm" style={{ color: textLight }}>Phone: <EditableText value={ref.phone || ''} placeholder="Phone" editable={editable} onChange={(val) => onChange(`references.${index}.phone`, val)} /></div>}
                    {ref.email && <div className="text-sm" style={{ color: textLight }}>Email: <EditableText value={ref.email || ''} placeholder="Email" editable={editable} onChange={(val) => onChange(`references.${index}.email`, val)} /></div>}
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

export default CatrineZivTemplate;

