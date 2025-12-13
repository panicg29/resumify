import React from 'react';
import EditableText from '../EditableText';

const RiaanChandranTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  return (
    <div 
      className="w-[21cm] h-[29.7cm] bg-[#1A1A1A] mx-auto shadow-2xl flex flex-col overflow-hidden"
      style={{ 
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700 flex-shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            {(phone || editable) && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#FF6B35] text-xs font-bold uppercase">Phone</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  className="text-white text-sm"
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B35] text-xs font-bold uppercase">Email</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="text-white text-sm"
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#FF6B35] text-xs font-bold uppercase">Location</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  className="text-white text-sm"
                />
              </div>
            )}
            {socialMedia?.linkedin && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#FF6B35] text-xs font-bold uppercase">LinkedIn</span>
                <span className="text-white text-xs">{socialMedia.linkedin}</span>
              </div>
            )}
            {socialMedia?.github && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#FF6B35] text-xs font-bold uppercase">GitHub</span>
                <span className="text-white text-xs">{socialMedia.github}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex justify-end items-start">
            <div className="text-right">
              <div className="text-6xl font-black text-white leading-tight mb-2">
                <EditableText
                  value={(name || '').split(' ')[0] || ''}
                  placeholder="RIAAN"
                  editable={editable}
                  onChange={(val) => {
                    const parts = (name || '').split(' ');
                    parts[0] = val;
                    onChange('name', parts.join(' '));
                  }}
                  className="uppercase"
                />
              </div>
              <div className="text-6xl font-black text-white leading-tight">
                <EditableText
                  value={(name || '').split(' ').slice(1).join(' ') || ''}
                  placeholder="CHANDRAN"
                  editable={editable}
                  onChange={(val) => {
                    const parts = (name || '').split(' ');
                    if (parts.length > 1) {
                      parts.splice(1);
                    }
                    parts.push(val);
                    onChange('name', parts.join(' '));
                  }}
                  className="uppercase"
                />
              </div>
            </div>
            <div className="ml-6">
              <EditableText
                value={formData.role || ''}
                placeholder="UI/UX Designer"
                editable={editable}
                onChange={(val) => onChange('role', val)}
                className="text-[#FF6B35] font-bold text-sm uppercase mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex flex-1 p-6 gap-6 overflow-hidden min-h-0">
        {/* Left Column */}
        <div className="w-[40%] space-y-3 overflow-y-auto pr-2 flex-shrink-0">
          {/* About Me */}
          <div>
            <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-2">About Me</h2>
            <EditableText
              value={summary}
              placeholder="Professional summary"
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="text-white text-xs leading-relaxed"
              multiline
            />
          </div>

          {/* Education */}
          <div>
            <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-2">Education</h2>
            <div className="space-y-2">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="text-white text-xs">
                    <div className="mb-0.5">
                      <EditableText
                        value={typeof edu.year === 'number' ? `${edu.year - 2} - ${edu.year}` : (edu.year || '')}
                        placeholder="2024 - 2027"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.year`, val)}
                        className="font-bold text-xs"
                      />
                    </div>
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="University"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      className="font-bold text-xs mb-0.5"
                    />
                    <div className="text-gray-300 text-xs">
                      <EditableText
                        value={edu.degree || ''}
                        placeholder="Degree"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="inline"
                      />
                      {edu.gpa && (
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
                  <div className="text-white text-xs">
                    <div className="mb-0.5">
                      <span className="font-bold">[2024 - 2027]</span>
                    </div>
                    <div className="font-bold text-xs mb-0.5">RIMBERIO UNIVERSITY</div>
                    <div className="text-gray-300 text-xs">Bachelor of Technology</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills && skills.length > 0 ? (
                skills.slice(0, 8).map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index === 1
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white border border-white'
                    }`}
                  >
                    <EditableText
                      value={skill.name || ''}
                      placeholder="Skill"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.name`, val)}
                      className="inline"
                    />
                  </span>
                ))
              ) : (
                <>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-transparent text-white border border-white">
                    Typography
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-white text-black">
                    Communication
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-transparent text-white border border-white">
                    Visual Imagination
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-transparent text-white border border-white">
                    User Research
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-2">Projects</h2>
            <div className="space-y-2">
              {projects && projects.length > 0 ? (
                projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="text-white">
                    <EditableText
                      value={project.name || ''}
                      placeholder="Project Name"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold text-xs mb-1"
                    />
                    {(project.description || editable) && (
                      <div className="mb-1">
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          className="text-xs text-gray-300 leading-tight"
                          multiline
                        />
                      </div>
                    )}
                    {(project.technologies || editable) && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        <EditableText
                          value={Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '')}
                          placeholder="react, node, mongo"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.technologies`, val)}
                          className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white border border-white/30"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-white">
                  <div className="font-bold text-xs mb-1">Portfolio Website</div>
                  <div className="text-xs text-gray-300 leading-tight mb-1">
                    Designed and developed a personal portfolio website showcasing projects and skills using modern web technologies.
                  </div>
                  <div className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white border border-white/30 inline-block">
                    React, Tailwind CSS, Node.js
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Additional Sections - Compact */}
          {((certifications && certifications.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Certifications</h2>
              <div className="space-y-1 text-xs">
                {(certifications || []).slice(0, 3).map((cert, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={cert.name || ''} placeholder="Certification" editable={editable} onChange={(val) => onChange(`certifications.${index}.name`, val)} className="font-bold text-xs" />
                    {cert.issuer && <div className="text-gray-300 text-xs">{cert.issuer}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((trainings && trainings.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Trainings</h2>
              <div className="space-y-1 text-xs">
                {(trainings || []).slice(0, 3).map((training, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} className="text-xs" />
                    {training.institution && <div className="text-gray-300 text-xs">{training.institution}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((awards && awards.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Awards</h2>
              <div className="space-y-1 text-xs">
                {(awards || []).slice(0, 3).map((award, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="font-bold text-xs" />
                    {award.organization && <div className="text-gray-300 text-xs">{award.organization}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((languages && languages.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Languages</h2>
              <div className="space-y-1 text-xs">
                {(languages || []).slice(0, 4).map((lang, index) => (
                  <div key={index} className="flex justify-between text-white">
                    <EditableText value={lang.name || ''} placeholder="Language" editable={editable} onChange={(val) => onChange(`languages.${index}.name`, val)} className="text-xs" />
                    <span className="text-gray-300 text-xs">{lang.proficiency || 'Fluent'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((publications && publications.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Publications</h2>
              <div className="space-y-1 text-xs">
                {(publications || []).slice(0, 2).map((pub, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} className="text-xs" />
                    {pub.journal && <div className="text-gray-300 text-xs">{pub.journal}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((patents && patents.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Patents</h2>
              <div className="space-y-1 text-xs">
                {(patents || []).slice(0, 2).map((patent, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} className="text-xs" />
                    {patent.patentNumber && <div className="text-gray-300 text-xs">{patent.patentNumber}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((volunteerWork && volunteerWork.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Volunteer Work</h2>
              <div className="space-y-1 text-xs">
                {(volunteerWork || []).slice(0, 2).map((vol, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} className="text-xs" />
                    {vol.role && <div className="text-gray-300 text-xs">{vol.role}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Memberships</h2>
              <div className="space-y-1 text-xs">
                {(professionalMemberships || []).slice(0, 2).map((mem, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} className="text-xs" />
                    {mem.role && <div className="text-gray-300 text-xs">{mem.role}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((conferences && conferences.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Conferences</h2>
              <div className="space-y-1 text-xs">
                {(conferences || []).slice(0, 2).map((conf, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} className="text-xs" />
                    {conf.location && <div className="text-gray-300 text-xs">{conf.location}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Speaking</h2>
              <div className="space-y-1 text-xs">
                {(speakingEngagements || []).slice(0, 2).map((speak, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} className="text-xs" />
                    {speak.event && <div className="text-gray-300 text-xs">{speak.event}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((teachingExperience && teachingExperience.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Teaching</h2>
              <div className="space-y-1 text-xs">
                {(teachingExperience || []).slice(0, 2).map((teach, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} className="text-xs" />
                    {teach.institution && <div className="text-gray-300 text-xs">{teach.institution}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((mentoring && mentoring.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Mentoring</h2>
              <div className="space-y-1 text-xs">
                {(mentoring || []).slice(0, 2).map((ment, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} className="text-xs" />
                    {ment.focus && <div className="text-gray-300 text-xs">{ment.focus}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Leadership</h2>
              <div className="space-y-1 text-xs">
                {(leadershipRoles || []).slice(0, 2).map((lead, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} className="text-xs" />
                    {lead.organization && <div className="text-gray-300 text-xs">{lead.organization}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((internships && internships.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Internships</h2>
              <div className="space-y-1 text-xs">
                {(internships || []).slice(0, 2).map((intern, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} className="text-xs" />
                    {intern.company && <div className="text-gray-300 text-xs">{intern.company}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((licenses && licenses.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Licenses</h2>
              <div className="space-y-1 text-xs">
                {(licenses || []).slice(0, 2).map((lic, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} className="text-xs" />
                    {lic.issuingOrganization && <div className="text-gray-300 text-xs">{lic.issuingOrganization}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((references && references.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">References</h2>
              <div className="space-y-1 text-xs">
                {(references || []).slice(0, 2).map((ref, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} className="text-xs" />
                    {ref.title && <div className="text-gray-300 text-xs">{ref.title}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Open Source</h2>
              <div className="space-y-1 text-xs">
                {(openSourceContributions || []).slice(0, 2).map((os, index) => (
                  <div key={index} className="text-white">
                    <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} className="text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {((hobbies && hobbies.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Hobbies</h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(hobbies || []).slice(0, 6).map((hobby, index) => (
                  <span key={index} className="px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/30">{typeof hobby === 'string' ? hobby : (hobby?.name || hobby?.title || hobby)}</span>
                ))}
              </div>
            </div>
          )}

          {((interests && interests.length > 0) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Interests</h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(interests || []).slice(0, 6).map((interest, index) => (
                  <span key={index} className="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white">
                    {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {((additionalInfo && additionalInfo.trim()) || editable) && (
            <div>
              <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-1.5">Additional Info</h2>
              <div className="text-white text-xs leading-tight">
                <EditableText value={additionalInfo || ''} placeholder="Additional information" editable={editable} onChange={(val) => onChange('additionalInfo', val)} multiline />
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 overflow-y-auto pr-2 min-h-0">
          <h2 className="text-[#FF6B35] text-sm font-bold uppercase mb-3">Work Experience</h2>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="text-white">
                  <div className="font-bold text-sm mb-1.5">
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Company"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.company`, val)}
                      className="inline"
                    />
                    {' - '}
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Title"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      className="inline"
                    />
                    {' ('}
                    {exp.current ? (
                      'NOW'
                    ) : (
                      <EditableText
                        value={exp.endDate || ''}
                        placeholder="2023"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                        className="inline"
                      />
                    )}
                    {' - '}
                    <EditableText
                      value={exp.startDate || ''}
                      placeholder="2021"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                      className="inline"
                    />
                    {')'}
                  </div>
                  {(exp.description || editable) && (
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <EditableText
                        value={exp.description || ''}
                        placeholder="Job description"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.description`, val)}
                        multiline
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="text-white">
                  <div className="font-bold text-sm mb-1.5">
                    AWARDIERE INC. - UX/UI DESIGNER (NOW - 2023)
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="text-white">
                  <div className="font-bold text-sm mb-1.5">
                    SALFORD & CO. - UX/UI DESIGNER (2023 - 2021)
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="text-white">
                  <div className="font-bold text-sm mb-1.5">
                    INGOUDE COMPANY - UX/UI DESIGNER (2021 - 2018)
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiaanChandranTemplate;

