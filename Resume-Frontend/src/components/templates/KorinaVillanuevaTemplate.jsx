import React from 'react';
import EditableText from '../EditableText';

const KorinaVillanuevaTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '',
    email = '',
    phone = '',
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = [],
    location = ''
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
        <div>
          <h3 className="text-base font-bold text-[#6B4E3D] mb-3">Skills</h3>
          <div className="space-y-3 text-sm">
            {skills && skills.length > 0 ? (
              skills.slice(0, 5).map((skill, index) => (
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
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3728]">Teamwork</span>
                  {renderSkillLevel('Advanced')}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3728]">Meeting deadlines</span>
                  {renderSkillLevel('Intermediate')}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4A3728]">Critical thinking</span>
                  {renderSkillLevel('Expert')}
                </div>
              </>
            )}
          </div>
        </div>
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
            {experience && experience.length > 0 && experience[0].title ? (
              <EditableText
                value={experience[0].title}
                placeholder="Graphic Designer"
                editable={editable}
                onChange={(val) => onChange('experience.0.title', val)}
              />
            ) : (
              editable ? (
                <EditableText
                  value=""
                  placeholder="Graphic Designer"
                  editable={editable}
                  onChange={(val) => onChange('experience.0.title', val)}
                />
              ) : (
                'Graphic Designer'
              )
            )}
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

        {/* Language Section */}
        <div>
          <h3 className="text-base font-bold text-[#6B4E3D] mb-4">Language</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#4A3728]">French</span>
                <span className="text-xs text-[#6B4E3D]">70%</span>
              </div>
              <div className="w-full h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4E3D]" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#4A3728]">English</span>
                <span className="text-xs text-[#6B4E3D]">90%</span>
              </div>
              <div className="w-full h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4E3D]" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#4A3728]">Spanish</span>
                <span className="text-xs text-[#6B4E3D]">60%</span>
              </div>
              <div className="w-full h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4E3D]" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KorinaVillanuevaTemplate;

