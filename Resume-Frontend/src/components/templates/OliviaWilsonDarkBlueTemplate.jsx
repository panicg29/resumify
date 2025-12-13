import React from 'react';
import EditableText from '../EditableText';

const OliviaWilsonDarkBlueTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const darkBlue = '#2C3E50'; // Dark blue-grey sidebar
  const white = '#FFFFFF';
  const textDark = '#2C2C2C';
  const textMedium = '#666666';
  const textWhite = '#FFFFFF';
  const lightGrey = '#E0E0E0';

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
      return `${edu.year - 4} - ${edu.year}`;
    }
    return String(edu.year);
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex relative"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: white }}
    >
      {/* Decorative Elements - Top Right */}
      <div className="absolute top-0 right-0 z-0">
        <div 
          className="w-24 h-16"
          style={{ 
            backgroundColor: darkBlue,
            transform: 'translate(10px, -10px) rotate(-5deg)',
            opacity: 0.8
          }}
        ></div>
        <div 
          className="w-16 h-12"
          style={{ 
            backgroundColor: lightGrey,
            transform: 'translate(30px, -5px) rotate(10deg)',
            opacity: 0.6
          }}
        ></div>
      </div>

      {/* Left Column - Dark Blue-Grey Background */}
      <div 
        className="w-[35%] p-6 flex flex-col relative z-10"
        style={{ backgroundColor: darkBlue }}
      >
        {/* Contact Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textWhite }}
          >
            Contact
          </h3>
          <div className="space-y-2 text-sm" style={{ color: textWhite }}>
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
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="123 Anywhere St., Any City"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textWhite }}
                />
              </div>
            )}
            {(projects[0]?.url || projects[0]?.github || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <EditableText
                  value={projects[0]?.url || projects[0]?.github || ''}
                  placeholder="reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => {
                    if (projects[0]) {
                      onChange(`projects.0.url`, val);
                    }
                  }}
                  style={{ color: textWhite }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textWhite }}
          >
            Education
          </h3>
          <div className="space-y-3">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textWhite }}
                  >
                    <EditableText
                      value={edu.degree || ''}
                      placeholder="Master of Business"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.degree`, val)}
                      style={{ color: textWhite }}
                    />
                  </div>
                  <div className="text-sm mb-1" style={{ color: textWhite }}>
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="Wardiere University"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      style={{ color: textWhite }}
                    />
                  </div>
                  <div className="text-sm" style={{ color: textWhite, opacity: 0.8 }}>
                    {formatEducationYear(edu)}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="font-bold mb-1" style={{ color: textWhite }}>Master of Business</div>
                  <div className="text-sm mb-1" style={{ color: textWhite }}>Wardiere University</div>
                  <div className="text-sm" style={{ color: textWhite, opacity: 0.8 }}>2011 - 2015</div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textWhite }}>BA Sales and Commerce</div>
                  <div className="text-sm mb-1" style={{ color: textWhite }}>Wardiere University</div>
                  <div className="text-sm" style={{ color: textWhite, opacity: 0.8 }}>2011 - 2015</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textWhite }}
          >
            Skills
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
                <li>ROI Calculations</li>
                <li>Social media marketing</li>
                <li>Product development lifecycle</li>
                <li>Marketing strategy</li>
                <li>Product promotion</li>
                <li>Value Propositions</li>
              </>
            )}
          </ul>
        </div>

        {/* Language Section */}
        <div>
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textWhite }}
          >
            Language
          </h3>
          <div className="space-y-1 text-sm" style={{ color: textWhite }}>
            {skills && skills.filter(s => ['English', 'French'].includes(s.name)).length > 0 ? (
              skills.filter(s => ['English', 'French'].includes(s.name)).map((lang, index) => (
                <div key={index}>
                  <EditableText
                    value={lang.name || ''}
                    placeholder="Language"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${skills.indexOf(lang)}.name`, val)}
                    style={{ color: textWhite }}
                  />
                </div>
              ))
            ) : (
              <>
                <div>English</div>
                <div>French</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - White Background */}
      <div className="flex-1 p-8 relative z-10" style={{ backgroundColor: white }}>
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="text-5xl font-bold mb-2"
            style={{ color: textDark }}
          >
            <EditableText
              value={name || ''}
              placeholder="Olivia Wilson"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              style={{ color: textDark }}
            />
          </h1>
          <p 
            className="text-xl"
            style={{ 
              color: textDark,
              fontWeight: 'normal'
            }}
          >
            <EditableText
              value={formData.role || ''}
              placeholder="Marketing Manager"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textDark }}
            />
          </p>
        </div>

        {/* About Me Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textDark }}
          >
            About Me
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="text-sm leading-relaxed" style={{ color: textDark }}>
            <EditableText
              value={summary || ''}
              placeholder="Experienced marketing professional with expertise in digital marketing, brand management, and strategic planning."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textDark }}
              multiline
            />
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textDark }}
          >
            Work Experience
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="relative pl-4">
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: lightGrey }}
                  ></div>
                  <div className="text-sm mb-1" style={{ color: textMedium }}>
                    {formatExperienceDate(exp)}
                  </div>
                  <div className="text-sm mb-1" style={{ color: textMedium }}>
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Timmerman Industries"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.company`, val)}
                      style={{ color: textMedium }}
                    />
                  </div>
                  <div 
                    className="font-bold mb-2"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Marketing Manager"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      style={{ color: textDark }}
                    />
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
                            placeholder="Maintained and organized numerous office files."
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
                <div className="relative pl-4">
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: lightGrey }}
                  ></div>
                  <div className="text-sm mb-1" style={{ color: textMedium }}>Aug 2018 - present</div>
                  <div className="text-sm mb-1" style={{ color: textMedium }}>Timmerman Industries</div>
                  <div className="font-bold mb-2" style={{ color: textDark }}>Marketing Manager</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Maintained and organized numerous office files.</li>
                    <li>Constantly updated the company's contact and mailing lists.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold mb-3"
            style={{ color: textDark }}
          >
            Projects
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
                <div className="font-bold mb-1" style={{ color: textDark }}>Marketing Campaign</div>
                <div className="text-sm" style={{ color: textMedium }}>
                  Developed and executed comprehensive marketing campaigns.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections - ALL FIELDS */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Certifications</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Trainings</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Awards</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Publications</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Patents</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Volunteer Work</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Professional Memberships</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Conferences</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Speaking Engagements</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Teaching Experience</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Mentoring</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Leadership Roles</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Internships</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Licenses</h3>
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

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Open Source Contributions</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Hobbies</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Interests</h3>
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
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>Additional Info</h3>
            <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
            <div className="text-sm leading-relaxed" style={{ color: textDark }}>
              <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
            </div>
          </div>
        )}

        {/* References Section */}
        {((references && references.length > 0) || editable) && (
          <div>
            <h3 className="text-base font-bold mb-3" style={{ color: textDark }}>References</h3>
            <div className="w-full h-px mb-3" style={{ backgroundColor: textDark }}></div>
            <div className="grid grid-cols-2 gap-4">
              {references && references.length > 0 ? (
                references.map((ref, index) => (
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
                ))
              ) : (
                <>
                  <div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>Estelle Darcy</div>
                    <div className="text-sm mb-1" style={{ color: textMedium }}>Wardiere Inc. / CEO</div>
                    <div className="text-sm" style={{ color: textMedium }}>Phone: +123-456-7890</div>
                    <div className="text-sm" style={{ color: textMedium }}>Email: hello@reallygreatsite.com</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1" style={{ color: textDark }}>Harper Richard</div>
                    <div className="text-sm mb-1" style={{ color: textMedium }}>Wardiere Inc. / CEO</div>
                    <div className="text-sm" style={{ color: textMedium }}>Phone: +123-456-7890</div>
                    <div className="text-sm" style={{ color: textMedium }}>Email: hello@reallygreatsite.com</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OliviaWilsonDarkBlueTemplate;

