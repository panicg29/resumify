import React from 'react';
import EditableText from '../EditableText';

/**
 * MultiPageTemplate2 - Modern Tech Style
 * 3-page template with contemporary design, tech-focused layout
 * Dense layout with minimal gaps - all fields included
 */
const MultiPageTemplate2 = ({ formData = {}, editable = false, onChange = () => {}, pageContent = null }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], languages = [],
    publications = [], patents = [], volunteerWork = [], professionalMemberships = [], conferences = [],
    speakingEngagements = [], teachingExperience = [], mentoring = [], leadershipRoles = [],
    internships = [], licenses = [], references = [], socialMedia = {}, hobbies = [], interests = [],
    openSourceContributions = [], additionalInfo = '', trainings = []
  } = formData;

  const data = pageContent || formData;

  return (
    <div className="multi-page-resume" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* PAGE 1: Header, Summary, Skills, Education, Certifications, Trainings */}
      <div className="page-break-after: always w-[21cm] h-[29.7cm] bg-gradient-to-br from-gray-50 to-white mx-auto shadow-2xl flex flex-col" style={{ pageBreakAfter: 'always' }}>
        <div className="bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white p-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-1 tracking-tight">
              <EditableText value={name || ''} placeholder="JANE SMITH" editable={editable} onChange={(val) => onChange('name', val)} className="text-white" />
            </h1>
            <p className="text-base text-blue-100 font-medium">
              <EditableText value={role || (experience?.[0]?.title) || ''} placeholder="Full Stack Developer" editable={editable} onChange={(val) => onChange('role', val)} className="text-blue-100" />
            </p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs">
              {(phone || editable) && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableText value={phone} placeholder="+1 (555) 987-6543" editable={editable} onChange={(val) => onChange('phone', val)} className="text-white" />
                </div>
              )}
              {(email || editable) && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <EditableText value={email} placeholder="jane.smith@email.com" editable={editable} onChange={(val) => onChange('email', val)} className="text-white" />
                </div>
              )}
              {(location || editable) && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <EditableText value={location} placeholder="New York, NY" editable={editable} onChange={(val) => onChange('location', val)} className="text-white" />
                </div>
              )}
              {socialMedia?.linkedin && <span className="text-xs">{socialMedia.linkedin}</span>}
              {socialMedia?.github && <span className="text-xs">{socialMedia.github}</span>}
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-1.5">
          {(summary || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                ABOUT
              </h2>
              <EditableText value={summary} placeholder="Passionate developer..." editable={editable} onChange={(val) => onChange('summary', val)} className="text-xs text-gray-700 leading-tight" multiline />
            </div>
          )}

          {((data.skills && data.skills.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                TECHNICAL SKILLS
              </h2>
              <div className="grid grid-cols-3 gap-x-3 gap-y-0.5">
                {(data.skills || []).slice(0, 18).map((skill, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
                    <EditableText value={skill.name || ''} placeholder="React" editable={editable} onChange={(val) => onChange(`skills.${index}.name`, val)} className="text-xs text-gray-700" />
                    {skill.level && <span className="text-xs text-gray-500">({skill.level})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.education && data.education.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                EDUCATION
              </h2>
              <div className="space-y-1">
                {(data.education || []).slice(0, 2).map((edu, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <EditableText value={edu.degree || ''} placeholder="Degree" editable={editable} onChange={(val) => onChange(`education.${index}.degree`, val)} className="font-bold text-xs text-gray-800" />
                        <EditableText value={edu.institution || ''} placeholder="Institution" editable={editable} onChange={(val) => onChange(`education.${index}.institution`, val)} className="text-xs text-[#2563eb] block" />
                      </div>
                      <EditableText value={typeof edu.year === 'number' ? String(edu.year) : (edu.year || '')} placeholder="Year" editable={editable} onChange={(val) => onChange(`education.${index}.year`, val)} className="text-xs text-gray-600" />
                    </div>
                    {edu.gpa && <span className="text-xs text-gray-600">GPA: {edu.gpa}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.certifications && data.certifications.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                CERTIFICATIONS
              </h2>
              <div className="space-y-0.5">
                {(data.certifications || []).slice(0, 5).map((cert, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} className="text-xs text-gray-700" />
                    {cert.issuer && <span className="text-xs text-gray-600"> - {cert.issuer}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.trainings && data.trainings.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                TRAINING & COURSES
              </h2>
              <div className="space-y-0.5">
                {(data.trainings || []).slice(0, 4).map((training, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} className="text-xs text-gray-700" />
                    {training.institution && <span className="text-xs text-gray-600"> - {training.institution}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAGE 2: Experience, Internships, Licenses, Languages, Memberships */}
      <div className="page-break-after: always w-[21cm] h-[29.7cm] bg-gradient-to-br from-gray-50 to-white mx-auto shadow-2xl flex flex-col" style={{ pageBreakAfter: 'always' }}>
        <div className="p-3 space-y-1.5">
          {((data.experience && data.experience.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                WORK EXPERIENCE
              </h2>
              <div className="space-y-1.5">
                {(data.experience || []).map((exp, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <div className="flex justify-between items-start mb-0.5">
                      <div>
                        <EditableText value={exp.title || ''} placeholder="Title" editable={editable} onChange={(val) => onChange(`experience.${index}.title`, val)} className="font-bold text-xs text-gray-800" />
                        <EditableText value={exp.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`experience.${index}.company`, val)} className="text-xs text-[#2563eb] block" />
                      </div>
                      <div className="text-xs text-gray-600 text-right">
                        <EditableText value={exp.startDate || ''} placeholder="Start" editable={editable} onChange={(val) => onChange(`experience.${index}.startDate`, val)} className="inline" /> - {exp.current ? 'Present' : <EditableText value={exp.endDate || ''} placeholder="End" editable={editable} onChange={(val) => onChange(`experience.${index}.endDate`, val)} className="inline" />}
                      </div>
                    </div>
                    {(exp.description || editable) && (
                      <EditableText value={exp.description || ''} placeholder="Description" editable={editable} onChange={(val) => onChange(`experience.${index}.description`, val)} className="text-xs text-gray-700 leading-tight" multiline />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.internships && data.internships.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                INTERNSHIPS
              </h2>
              <div className="space-y-0.5">
                {(data.internships || []).map((intern, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={intern.title || ''} placeholder="Intern Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} className="font-bold text-xs text-gray-800" />
                    <EditableText value={intern.company || ''} placeholder="Company" editable={editable} onChange={(val) => onChange(`internships.${index}.company`, val)} className="text-xs text-[#2563eb]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.licenses && data.licenses.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                LICENSES
              </h2>
              <div className="space-y-0.5">
                {(data.licenses || []).map((lic, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} className="text-xs text-gray-700" />
                    {lic.issuingOrganization && <span className="text-xs text-gray-600"> - {lic.issuingOrganization}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.languages && data.languages.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                LANGUAGES
              </h2>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {(data.languages || []).map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} className="text-xs text-gray-700" />
                    <span className="text-xs text-[#2563eb]">{lang.proficiency || 'Fluent'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.professionalMemberships && data.professionalMemberships.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                MEMBERSHIPS
              </h2>
              <div className="space-y-0.5">
                {(data.professionalMemberships || []).map((mem, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} className="text-xs text-gray-700" />
                    {mem.role && <span className="text-xs text-gray-600"> - {mem.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills && data.skills.length > 18 && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                ADDITIONAL SKILLS
              </h2>
              <div className="grid grid-cols-3 gap-x-3 gap-y-0.5">
                {data.skills.slice(18).map((skill, index) => (
                  <div key={index + 18} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
                    <EditableText value={skill.name || ''} placeholder="Skill" editable={editable} onChange={(val) => onChange(`skills.${index + 18}.name`, val)} className="text-xs text-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAGE 3: Projects, Publications, Patents, Volunteer, Conferences, Speaking, Teaching, Mentoring, Leadership, Awards, Open Source, Hobbies, Interests, Additional */}
      <div className="w-[21cm] h-[29.7cm] bg-gradient-to-br from-gray-50 to-white mx-auto shadow-2xl flex flex-col">
        <div className="p-3 space-y-1.5">
          {((data.projects && data.projects.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                PROJECTS
              </h2>
              <div className="space-y-1">
                {(data.projects || []).map((project, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={project.name || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`projects.${index}.name`, val)} className="font-bold text-xs text-gray-800" />
                    {(project.description || editable) && (
                      <EditableText value={project.description || ''} placeholder="Description" editable={editable} onChange={(val) => onChange(`projects.${index}.description`, val)} className="text-xs text-gray-700 leading-tight mt-0.5" multiline />
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs px-1.5 py-0.5 bg-[#2563eb] text-white rounded">{tech.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.publications && data.publications.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                PUBLICATIONS
              </h2>
              <div className="space-y-0.5">
                {(data.publications || []).map((pub, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} className="text-xs text-gray-700" />
                    {pub.journal && <span className="text-xs text-gray-600"> - {pub.journal}</span>}
                    {pub.year && <span className="text-xs text-gray-600"> ({pub.year})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.patents && data.patents.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                PATENTS
              </h2>
              <div className="space-y-0.5">
                {(data.patents || []).map((patent, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} className="text-xs text-gray-700" />
                    {patent.patentNumber && <span className="text-xs text-gray-600"> - {patent.patentNumber}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.volunteerWork && data.volunteerWork.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                VOLUNTEER WORK
              </h2>
              <div className="space-y-0.5">
                {(data.volunteerWork || []).map((vol, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} className="text-xs text-gray-700" />
                    {vol.role && <span className="text-xs text-gray-600"> - {vol.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.conferences && data.conferences.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                CONFERENCES
              </h2>
              <div className="space-y-0.5">
                {(data.conferences || []).map((conf, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} className="text-xs text-gray-700" />
                    {conf.location && <span className="text-xs text-gray-600"> - {conf.location}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.speakingEngagements && data.speakingEngagements.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                SPEAKING
              </h2>
              <div className="space-y-0.5">
                {(data.speakingEngagements || []).map((speak, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={speak.title || ''} placeholder="Talk" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} className="text-xs text-gray-700" />
                    {speak.event && <span className="text-xs text-gray-600"> - {speak.event}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.teachingExperience && data.teachingExperience.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                TEACHING
              </h2>
              <div className="space-y-0.5">
                {(data.teachingExperience || []).map((teach, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} className="text-xs text-gray-700" />
                    {teach.institution && <span className="text-xs text-gray-600"> - {teach.institution}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.mentoring && data.mentoring.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                MENTORING
              </h2>
              <div className="space-y-0.5">
                {(data.mentoring || []).map((ment, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} className="text-xs text-gray-700" />
                    {ment.focus && <span className="text-xs text-gray-600"> - {ment.focus}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.leadershipRoles && data.leadershipRoles.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                LEADERSHIP
              </h2>
              <div className="space-y-0.5">
                {(data.leadershipRoles || []).map((lead, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={lead.title || ''} placeholder="Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} className="text-xs text-gray-700" />
                    {lead.organization && <span className="text-xs text-gray-600"> - {lead.organization}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.awards && data.awards.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                AWARDS
              </h2>
              <div className="space-y-0.5">
                {(data.awards || []).map((award, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="text-xs text-gray-700" />
                    {award.organization && <span className="text-xs text-gray-600"> - {award.organization}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.openSourceContributions && data.openSourceContributions.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                OPEN SOURCE
              </h2>
              <div className="space-y-0.5">
                {(data.openSourceContributions || []).map((os, index) => (
                  <div key={index} className="border-l-2 border-[#2563eb] pl-2">
                    <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} className="text-xs text-gray-700" />
                    {os.url && <a href={os.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#2563eb] underline ml-1">Link</a>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((data.hobbies && data.hobbies.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                HOBBIES
              </h2>
              <div className="flex flex-wrap gap-1">
                {(data.hobbies || []).map((hobby, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-blue-50 text-gray-700 rounded">{hobby}</span>
                ))}
              </div>
            </div>
          )}

          {((data.interests && data.interests.length > 0) || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                INTERESTS
              </h2>
              <div className="flex flex-wrap gap-1">
                {(data.interests || []).map((interest, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-blue-50 text-gray-700 rounded">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {(data.additionalInfo || editable) && (
            <div>
              <h2 className="text-base font-bold text-[#2563eb] mb-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#2563eb]"></div>
                ADDITIONAL INFO
              </h2>
              <EditableText value={data.additionalInfo || ''} placeholder="Additional information..." editable={editable} onChange={(val) => onChange('additionalInfo', val)} className="text-xs text-gray-700 leading-tight" multiline />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiPageTemplate2;
