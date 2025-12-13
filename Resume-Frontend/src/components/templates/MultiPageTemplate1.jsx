import React from 'react';
import EditableText from '../EditableText';

/**
 * MultiPageTemplate1 - Professional Corporate Style
 * 3-page template with content distributed to fill each page completely
 * Dense layout with minimal gaps - all fields included
 */
const MultiPageTemplate1 = ({ formData = {}, editable = false, onChange = () => {}, pageContent = null }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], awards = [], languages = [],
    publications = [], patents = [], volunteerWork = [], professionalMemberships = [], conferences = [],
    speakingEngagements = [], teachingExperience = [], mentoring = [], leadershipRoles = [],
    internships = [], licenses = [], references = [], socialMedia = {}, hobbies = [], interests = [],
    openSourceContributions = [], additionalInfo = '', trainings = []
  } = formData;

  const data = pageContent || formData;

  const renderSkillLevel = (level) => {
    const levelMap = { 'Expert': 5, 'Advanced': 4, 'Intermediate': 3, 'Beginner': 2 };
    const filled = levelMap[level] || 3;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-1 h-1 rounded-full ${i <= filled ? 'bg-[#1a4d7a]' : 'bg-transparent border border-[#1a4d7a]'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="multi-page-resume" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* PAGE 1: Header, Contact, Summary, Skills, Education, Certifications, Trainings */}
      <div className="page-break-after: always w-[21cm] h-[29.7cm] bg-white mx-auto shadow-2xl flex flex-col" style={{ pageBreakAfter: 'always' }}>
        <div className="bg-[#1a4d7a] text-white p-3">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1 uppercase tracking-wide">
                <EditableText value={name || ''} placeholder="JOHN DOE" editable={editable} onChange={(val) => onChange('name', val)} className="text-white" />
              </h1>
              <p className="text-base text-blue-200">
                <EditableText value={role || (experience?.[0]?.title) || ''} placeholder="Senior Software Engineer" editable={editable} onChange={(val) => onChange('role', val)} className="text-blue-200" />
              </p>
            </div>
            <div className="text-right text-xs space-y-0.5">
              {(phone || editable) && (
                <div className="flex items-center justify-end gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableText value={phone} placeholder="+1 (555) 123-4567" editable={editable} onChange={(val) => onChange('phone', val)} className="text-white" />
                </div>
              )}
              {(email || editable) && (
                <div className="flex items-center justify-end gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <EditableText value={email} placeholder="john.doe@email.com" editable={editable} onChange={(val) => onChange('email', val)} className="text-white" />
                </div>
              )}
              {(location || editable) && (
                <div className="flex items-center justify-end gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <EditableText value={location} placeholder="San Francisco, CA" editable={editable} onChange={(val) => onChange('location', val)} className="text-white" />
                </div>
              )}
              {socialMedia?.linkedin && (
                <div className="flex items-center justify-end gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-white text-xs">{socialMedia.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-1.5">
          {(summary || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Summary</h2>
              <EditableText value={summary} placeholder="Experienced professional..." editable={editable} onChange={(val) => onChange('summary', val)} className="text-xs text-gray-700 leading-tight" multiline />
            </div>
          )}

          {((data.skills && data.skills.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Core Competencies</h2>
              <div className="grid grid-cols-3 gap-x-3 gap-y-0.5">
                {(data.skills || []).slice(0, 18).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <EditableText value={skill.name || ''} placeholder="Skill" editable={editable} onChange={(val) => onChange(`skills.${index}.name`, val)} className="text-xs text-gray-700" />
                    {renderSkillLevel(skill.level || 'Intermediate')}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.education && data.education.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Education</h2>
              <div className="space-y-1">
                {(data.education || []).slice(0, 2).map((edu, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <EditableText value={edu.degree || ''} placeholder="Degree" editable={editable} onChange={(val) => onChange(`education.${index}.degree`, val)} className="font-bold text-xs text-gray-800" />
                        <EditableText value={typeof edu.year === 'number' ? String(edu.year) : (edu.year || '')} placeholder="Year" editable={editable} onChange={(val) => onChange(`education.${index}.year`, val)} className="text-xs text-[#1a4d7a]" />
                      </div>
                      <EditableText value={edu.institution || ''} placeholder="Institution" editable={editable} onChange={(val) => onChange(`education.${index}.institution`, val)} className="text-xs text-[#1a4d7a]" />
                      {edu.gpa && <span className="text-xs text-gray-600">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.certifications && data.certifications.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Certifications</h2>
              <div className="space-y-0.5">
                {(data.certifications || []).slice(0, 5).map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} className="text-xs text-gray-700" />
                      {cert.issuer && <span className="text-xs text-gray-600"> - {cert.issuer}</span>}
                      {cert.date && <span className="text-xs text-gray-600"> ({cert.date})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.trainings && data.trainings.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Training & Courses</h2>
              <div className="space-y-0.5">
                {(data.trainings || []).slice(0, 4).map((training, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} className="text-xs text-gray-700" />
                      {training.institution && <span className="text-xs text-gray-600"> - {training.institution}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAGE 2: Experience, Internships, Licenses, Languages, Memberships */}
      <div className="page-break-after: always w-[21cm] h-[29.7cm] bg-white mx-auto shadow-2xl flex flex-col" style={{ pageBreakAfter: 'always' }}>
        <div className="p-3 space-y-1.5">
          {((data.experience && data.experience.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Professional Experience</h2>
              <div className="space-y-1.5">
                {(data.experience || []).map((exp, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <div>
                          <EditableText value={exp.title || ''} placeholder="Title" editable={editable} onChange={(val) => onChange(`experience.${index}.title`, val)} className="font-bold text-xs text-gray-800" />
                          <EditableText value={exp.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`experience.${index}.company`, val)} className="text-xs text-[#1a4d7a] block" />
                        </div>
                        <div className="text-xs text-gray-600 text-right">
                          <EditableText value={exp.startDate || ''} placeholder="Start" editable={editable} onChange={(val) => onChange(`experience.${index}.startDate`, val)} className="inline" /> - {exp.current ? 'Present' : <EditableText value={exp.endDate || ''} placeholder="End" editable={editable} onChange={(val) => onChange(`experience.${index}.endDate`, val)} className="inline" />}
                        </div>
                      </div>
                      {(exp.description || editable) && (
                        <EditableText value={exp.description || ''} placeholder="Description" editable={editable} onChange={(val) => onChange(`experience.${index}.description`, val)} className="text-xs text-gray-700 leading-tight" multiline />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.internships && data.internships.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Internships</h2>
              <div className="space-y-1">
                {(data.internships || []).map((intern, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={intern.title || ''} placeholder="Intern Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} className="font-bold text-xs text-gray-800" />
                      <EditableText value={intern.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`internships.${index}.company`, val)} className="text-xs text-[#1a4d7a]" />
                      {intern.description && <div className="text-xs text-gray-600 mt-0.5">{intern.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.licenses && data.licenses.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Licenses</h2>
              <div className="space-y-0.5">
                {(data.licenses || []).map((lic, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} className="text-xs text-gray-700" />
                      {lic.issuingOrganization && <span className="text-xs text-gray-600"> - {lic.issuingOrganization}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.languages && data.languages.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Languages</h2>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {(data.languages || []).map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} className="text-xs text-gray-700" />
                    <span className="text-xs text-gray-600">{lang.proficiency || 'Fluent'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.professionalMemberships && data.professionalMemberships.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Professional Memberships</h2>
              <div className="space-y-0.5">
                {(data.professionalMemberships || []).map((mem, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} className="text-xs text-gray-700" />
                      {mem.role && <span className="text-xs text-gray-600"> - {mem.role}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.skills && data.skills.length > 18) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Additional Skills</h2>
              <div className="grid grid-cols-3 gap-x-3 gap-y-0.5">
                {data.skills.slice(18).map((skill, index) => (
                  <div key={index + 18} className="flex items-center justify-between">
                    <EditableText value={skill.name || ''} placeholder="Skill" editable={editable} onChange={(val) => onChange(`skills.${index + 18}.name`, val)} className="text-xs text-gray-700" />
                    {renderSkillLevel(skill.level || 'Intermediate')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 3: Projects, Publications, Patents, Volunteer, Conferences, Speaking, Teaching, Mentoring, Leadership, Awards, Open Source, Hobbies, Interests, Additional Info */}
      <div className="w-[21cm] h-[29.7cm] bg-white mx-auto shadow-2xl flex flex-col">
        <div className="p-3 space-y-1.5">
          {((data.projects && data.projects.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Key Projects</h2>
              <div className="space-y-1">
                {(data.projects || []).map((project, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={project.name || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`projects.${index}.name`, val)} className="font-bold text-xs text-gray-800" />
                      {(project.description || editable) && (
                        <EditableText value={project.description || ''} placeholder="Description" editable={editable} onChange={(val) => onChange(`projects.${index}.description`, val)} className="text-xs text-gray-700 leading-tight mt-0.5" multiline />
                      )}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).slice(0, 4).map((tech, techIndex) => (
                            <span key={techIndex} className="text-xs px-1.5 py-0.5 bg-[#1a4d7a] text-white rounded">{tech.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.publications && data.publications.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Publications</h2>
              <div className="space-y-0.5">
                {(data.publications || []).map((pub, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} className="text-xs text-gray-700" />
                      {pub.journal && <span className="text-xs text-gray-600"> - {pub.journal}</span>}
                      {pub.year && <span className="text-xs text-gray-600"> ({pub.year})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.patents && data.patents.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Patents</h2>
              <div className="space-y-0.5">
                {(data.patents || []).map((patent, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} className="text-xs text-gray-700" />
                      {patent.patentNumber && <span className="text-xs text-gray-600"> - {patent.patentNumber}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.volunteerWork && data.volunteerWork.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Volunteer Work</h2>
              <div className="space-y-0.5">
                {(data.volunteerWork || []).map((vol, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} className="text-xs text-gray-700" />
                      {vol.role && <span className="text-xs text-gray-600"> - {vol.role}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.conferences && data.conferences.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Conferences</h2>
              <div className="space-y-0.5">
                {(data.conferences || []).map((conf, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} className="text-xs text-gray-700" />
                      {conf.location && <span className="text-xs text-gray-600"> - {conf.location}</span>}
                      {conf.date && <span className="text-xs text-gray-600"> ({conf.date})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.speakingEngagements && data.speakingEngagements.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Speaking Engagements</h2>
              <div className="space-y-0.5">
                {(data.speakingEngagements || []).map((speak, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={speak.title || ''} placeholder="Talk" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} className="text-xs text-gray-700" />
                      {speak.event && <span className="text-xs text-gray-600"> - {speak.event}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.teachingExperience && data.teachingExperience.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Teaching Experience</h2>
              <div className="space-y-0.5">
                {(data.teachingExperience || []).map((teach, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} className="text-xs text-gray-700" />
                      {teach.institution && <span className="text-xs text-gray-600"> - {teach.institution}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.mentoring && data.mentoring.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Mentoring</h2>
              <div className="space-y-0.5">
                {(data.mentoring || []).map((ment, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} className="text-xs text-gray-700" />
                      {ment.focus && <span className="text-xs text-gray-600"> - {ment.focus}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.leadershipRoles && data.leadershipRoles.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Leadership Roles</h2>
              <div className="space-y-0.5">
                {(data.leadershipRoles || []).map((lead, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={lead.title || ''} placeholder="Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} className="text-xs text-gray-700" />
                      {lead.organization && <span className="text-xs text-gray-600"> - {lead.organization}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.awards && data.awards.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Awards</h2>
              <div className="space-y-0.5">
                {(data.awards || []).map((award, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="text-xs text-gray-700" />
                      {award.organization && <span className="text-xs text-gray-600"> - {award.organization}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.openSourceContributions && data.openSourceContributions.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Open Source</h2>
              <div className="space-y-0.5">
                {(data.openSourceContributions || []).map((os, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4d7a] mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} className="text-xs text-gray-700" />
                      {os.url && <a href={os.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1a4d7a] underline ml-1">Link</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.hobbies && data.hobbies.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Hobbies</h2>
              <div className="flex flex-wrap gap-1">
                {(data.hobbies || []).map((hobby, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">{hobby}</span>
                ))}
              </div>
            </div>
          )}

          {((data.interests && data.interests.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Interests</h2>
              <div className="flex flex-wrap gap-1">
                {(data.interests || []).map((interest, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {(data.additionalInfo || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#1a4d7a] mb-1 border-b border-[#1a4d7a] pb-0.5 uppercase">Additional Information</h2>
              <EditableText value={data.additionalInfo || ''} placeholder="Additional information..." editable={editable} onChange={(val) => onChange('additionalInfo', val)} className="text-xs text-gray-700 leading-tight" multiline />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiPageTemplate1;
