import React from 'react';
import EditableText from '../EditableText';

const KorinaVillanuevaTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  // Helper to render skill dots
  const renderSkillLevel = (level) => {
    const levelMap = {
      'Expert': 5,
      'Advanced': 4,
      'Intermediate': 3,
      'Beginner': 2
    };
    const filled = levelMap[level] || 3;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i <= filled ? 'bg-[#6B4E3D]' : 'bg-transparent border border-[#6B4E3D]'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-2xl flex" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Left Column - Light Beige Background */}
      <div className="w-[35%] bg-[#F5F0E8] p-6 flex flex-col">
        {/* Contact Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-[#4A3728]">
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="+123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  className="text-[#4A3728]"
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="text-[#4A3728]"
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  className="text-[#4A3728]"
                />
              </div>
            )}
            {socialMedia?.linkedin && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-[#4A3728] text-xs">{socialMedia.linkedin}</span>
              </div>
            )}
            {socialMedia?.github && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-[#4A3728] text-xs">{socialMedia.github}</span>
              </div>
            )}
            {socialMedia?.portfolio && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#6B4E3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-[#4A3728] text-xs">{socialMedia.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Education</h3>
          <div className="space-y-4 text-sm">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                    <div>
                      <EditableText
                        value={edu.degree || ''}
                        placeholder="Degree"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="font-semibold text-[#4A3728]"
                      />
                      <EditableText
                        value={edu.institution || ''}
                        placeholder="University"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.institution`, val)}
                        className="text-[#6B4E3D]"
                      />
                      <div className="text-[#6B4E3D]">
                        <EditableText
                          value={typeof edu.year === 'number' ? String(edu.year) : (edu.year || '')}
                          placeholder="Year"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.year`, val)}
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
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-[#4A3728]">Bachelor of Design</div>
                    <div className="text-[#6B4E3D]">Really Great University</div>
                    <div className="text-[#6B4E3D]">2012-2016</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Skills</h3>
          <div className="space-y-2 text-sm">
            {skills && skills.length > 0 ? (
              skills.slice(0, 8).map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <EditableText
                    value={skill.name || ''}
                    placeholder="Skill"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    className="text-[#4A3728]"
                  />
                  {renderSkillLevel(skill.level || 'Intermediate')}
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3728]">Organized</span>
                  {renderSkillLevel('Advanced')}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3728]">Communication</span>
                  {renderSkillLevel('Intermediate')}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Certifications Section */}
        {((certifications && certifications.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Certifications</h3>
            <div className="space-y-2 text-sm">
              {(certifications || []).slice(0, 4).map((cert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                  <div>
                    <EditableText
                      value={cert.name || ''}
                      placeholder="Certification"
                      editable={editable}
                      onChange={(val) => onChange(`certifications.${index}.name`, val)}
                      className="text-[#4A3728]"
                    />
                    {cert.issuer && <div className="text-xs text-[#6B4E3D]">{cert.issuer}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {((languages && languages.length > 0) || editable) && (
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Languages</h3>
            <div className="space-y-2 text-sm">
              {(languages || []).slice(0, 4).map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <EditableText
                    value={lang.name || ''}
                    placeholder="Language"
                    editable={editable}
                    onChange={(val) => onChange(`languages.${index}.name`, val)}
                    className="text-[#4A3728]"
                  />
                  <span className="text-xs text-[#6B4E3D]">{lang.proficiency || 'Fluent'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - White Background */}
      <div className="flex-1 bg-white p-6 flex flex-col">
        {/* Name and Title */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-[#6B4E3D] mb-2 uppercase tracking-wide">
            <EditableText
              value={name || ''}
              placeholder="KORINA VILLANUEVA"
              editable={editable}
              onChange={(val) => onChange('name', val)}
            />
          </h1>
          <p className="text-lg text-[#6B4E3D]">
            <EditableText
              value={role || (experience && experience.length > 0 && experience[0].title ? experience[0].title : '')}
              placeholder="Graphic Designer"
              editable={editable}
              onChange={(val) => onChange('role', val)}
            />
          </p>
        </div>

        {/* Summary */}
        {(summary || editable) && (
          <div className="mb-6">
            <EditableText
              value={summary}
              placeholder="Professional summary"
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="text-sm text-[#4A3728] leading-relaxed"
              multiline
            />
          </div>
        )}

        {/* Experience Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#6B4E3D] mb-4">Experience</h3>
          <div className="space-y-5">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <EditableText
                          value={exp.title || ''}
                          placeholder="Job Title"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.title`, val)}
                          className="font-bold text-[#4A3728]"
                        />
                        <EditableText
                          value={exp.company || ''}
                          placeholder="Company"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.company`, val)}
                          className="text-[#6B4E3D] text-sm"
                        />
                      </div>
                      <div className="text-xs text-[#6B4E3D] text-right">
                        <EditableText
                          value={exp.startDate || ''}
                          placeholder="Jan 2021"
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
                            placeholder="Jan 2022"
                            editable={editable}
                            onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                            className="inline"
                          />
                        )}
                      </div>
                    </div>
                    {(exp.description || editable) && (
                      <div className="text-sm text-[#4A3728] leading-relaxed mt-2">
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
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="font-bold text-[#4A3728]">Graphic Designer</div>
                        <div className="text-[#6B4E3D] text-sm">Aldenaire & Partners</div>
                      </div>
                      <div className="text-xs text-[#6B4E3D] text-right">Jan 2021 - Jan 2022</div>
                    </div>
                    <p className="text-sm text-[#4A3728] leading-relaxed mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#6B4E3D] mb-4">Projects</h3>
          <div className="space-y-4">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <EditableText
                      value={project.name || ''}
                      placeholder="Project Name"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold text-[#4A3728] text-sm mb-1"
                    />
                    {(project.description || editable) && (
                      <div className="mb-2">
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          className="text-xs text-[#4A3728] leading-relaxed"
                          multiline
                        />
                      </div>
                    )}
                    {(project.technologies || editable) && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        <EditableText
                          value={Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '')}
                          placeholder="react, node, mongo"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.technologies`, val)}
                          className="text-xs px-2 py-0.5 bg-[#F5F0E8] text-[#6B4E3D] rounded"
                        />
                      </div>
                    )}
                    <div className="flex gap-3 text-xs">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#6B4E3D] underline">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#6B4E3D] underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6B4E3D] mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="font-bold text-[#4A3728] text-sm mb-1">E-Commerce Website</div>
                  <div className="text-xs text-[#4A3728] leading-relaxed mb-2">
                    Built a full-stack e-commerce platform with user authentication, product management, and payment integration.
                  </div>
                  <div className="text-xs px-2 py-0.5 bg-[#F5F0E8] text-[#6B4E3D] rounded inline-block mb-2">
                    React, Node.js, MongoDB
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections - Compact Layout */}
        {((trainings && trainings.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Training</h3>
            <div className="space-y-1 text-xs">
              {(trainings || []).slice(0, 3).map((training, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} className="inline" />
                  {training.institution && <span className="text-[#6B4E3D]"> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Awards</h3>
            <div className="space-y-1 text-xs">
              {(awards || []).slice(0, 3).map((award, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="inline" />
                  {award.organization && <span className="text-[#6B4E3D]"> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((publications && publications.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Publications</h3>
            <div className="space-y-1 text-xs">
              {(publications || []).slice(0, 2).map((pub, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={pub.title || ''} placeholder="Publication" editable={editable} onChange={(val) => onChange(`publications.${index}.title`, val)} className="inline" />
                  {pub.journal && <span className="text-[#6B4E3D]"> - {pub.journal}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((volunteerWork && volunteerWork.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Volunteer</h3>
            <div className="space-y-1 text-xs">
              {(volunteerWork || []).slice(0, 2).map((vol, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={vol.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`volunteerWork.${index}.organization`, val)} className="inline" />
                  {vol.role && <span className="text-[#6B4E3D]"> - {vol.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((hobbies && hobbies.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Hobbies</h3>
            <div className="flex flex-wrap gap-1 text-xs">
              {(hobbies || []).slice(0, 6).map((hobby, index) => (
                <span key={index} className="px-2 py-0.5 bg-[#F5F0E8] text-[#6B4E3D] rounded">{hobby}</span>
              ))}
            </div>
          </div>
        )}

        {((trainings && trainings.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Trainings</h3>
            <div className="space-y-1 text-xs">
              {(trainings || []).slice(0, 2).map((training, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={training.name || ''} placeholder="Training" editable={editable} onChange={(val) => onChange(`trainings.${index}.name`, val)} className="inline" />
                  {training.institution && <span className="text-[#6B4E3D]"> - {training.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((awards && awards.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Awards</h3>
            <div className="space-y-1 text-xs">
              {(awards || []).slice(0, 2).map((award, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={award.name || ''} placeholder="Award" editable={editable} onChange={(val) => onChange(`awards.${index}.name`, val)} className="inline" />
                  {award.organization && <span className="text-[#6B4E3D]"> - {award.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((patents && patents.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Patents</h3>
            <div className="space-y-1 text-xs">
              {(patents || []).slice(0, 2).map((patent, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={patent.title || ''} placeholder="Patent" editable={editable} onChange={(val) => onChange(`patents.${index}.title`, val)} className="inline" />
                  {patent.patentNumber && <span className="text-[#6B4E3D]"> - {patent.patentNumber}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((professionalMemberships && professionalMemberships.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Memberships</h3>
            <div className="space-y-1 text-xs">
              {(professionalMemberships || []).slice(0, 2).map((mem, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={mem.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`professionalMemberships.${index}.organization`, val)} className="inline" />
                  {mem.role && <span className="text-[#6B4E3D]"> - {mem.role}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((conferences && conferences.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Conferences</h3>
            <div className="space-y-1 text-xs">
              {(conferences || []).slice(0, 2).map((conf, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={conf.name || ''} placeholder="Conference" editable={editable} onChange={(val) => onChange(`conferences.${index}.name`, val)} className="inline" />
                  {conf.location && <span className="text-[#6B4E3D]"> - {conf.location}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((speakingEngagements && speakingEngagements.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Speaking</h3>
            <div className="space-y-1 text-xs">
              {(speakingEngagements || []).slice(0, 2).map((speak, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={speak.title || ''} placeholder="Speaking Title" editable={editable} onChange={(val) => onChange(`speakingEngagements.${index}.title`, val)} className="inline" />
                  {speak.event && <span className="text-[#6B4E3D]"> - {speak.event}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((teachingExperience && teachingExperience.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Teaching</h3>
            <div className="space-y-1 text-xs">
              {(teachingExperience || []).slice(0, 2).map((teach, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={teach.course || ''} placeholder="Course" editable={editable} onChange={(val) => onChange(`teachingExperience.${index}.course`, val)} className="inline" />
                  {teach.institution && <span className="text-[#6B4E3D]"> - {teach.institution}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((mentoring && mentoring.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Mentoring</h3>
            <div className="space-y-1 text-xs">
              {(mentoring || []).slice(0, 2).map((ment, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={ment.organization || ''} placeholder="Organization" editable={editable} onChange={(val) => onChange(`mentoring.${index}.organization`, val)} className="inline" />
                  {ment.focus && <span className="text-[#6B4E3D]"> - {ment.focus}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((leadershipRoles && leadershipRoles.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Leadership</h3>
            <div className="space-y-1 text-xs">
              {(leadershipRoles || []).slice(0, 2).map((lead, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={lead.title || ''} placeholder="Leadership Role" editable={editable} onChange={(val) => onChange(`leadershipRoles.${index}.title`, val)} className="inline" />
                  {lead.organization && <span className="text-[#6B4E3D]"> - {lead.organization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((internships && internships.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Internships</h3>
            <div className="space-y-1 text-xs">
              {(internships || []).slice(0, 2).map((intern, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={intern.title || ''} placeholder="Internship Title" editable={editable} onChange={(val) => onChange(`internships.${index}.title`, val)} className="inline" />
                  {intern.company && <span className="text-[#6B4E3D]"> - {intern.company}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((licenses && licenses.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Licenses</h3>
            <div className="space-y-1 text-xs">
              {(licenses || []).slice(0, 2).map((lic, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={lic.name || ''} placeholder="License" editable={editable} onChange={(val) => onChange(`licenses.${index}.name`, val)} className="inline" />
                  {lic.issuingOrganization && <span className="text-[#6B4E3D]"> - {lic.issuingOrganization}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((references && references.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">References</h3>
            <div className="space-y-1 text-xs">
              {(references || []).slice(0, 2).map((ref, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={ref.name || ''} placeholder="Reference Name" editable={editable} onChange={(val) => onChange(`references.${index}.name`, val)} className="inline" />
                  {ref.title && <span className="text-[#6B4E3D]"> - {ref.title}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {((openSourceContributions && openSourceContributions.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Open Source</h3>
            <div className="space-y-1 text-xs">
              {(openSourceContributions || []).slice(0, 2).map((os, index) => (
                <div key={index} className="text-[#4A3728]">
                  <EditableText value={os.project || ''} placeholder="Project" editable={editable} onChange={(val) => onChange(`openSourceContributions.${index}.project`, val)} className="inline" />
                </div>
              ))}
            </div>
          </div>
        )}

        {((interests && interests.length > 0) || editable) && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Interests</h3>
            <div className="flex flex-wrap gap-1 text-xs">
              {(interests || []).slice(0, 6).map((interest, index) => (
                <span key={index} className="px-2 py-0.5 bg-[#F5F0E8] text-[#6B4E3D] rounded">
                  {typeof interest === 'string' ? interest : (interest?.name || interest?.title || interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {(additionalInfo || editable) && (
          <div>
            <h3 className="text-sm font-bold text-[#6B4E3D] mb-2">Additional</h3>
            <EditableText value={additionalInfo || ''} placeholder="Additional information..." editable={editable} onChange={(val) => onChange('additionalInfo', val)} className="text-xs text-[#4A3728] leading-tight" multiline />
          </div>
        )}
      </div>
    </div>
  );
};

export default KorinaVillanuevaTemplate;

