import React from 'react';
import EditableText from '../EditableText';

const RiaanChandranTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '',
    email = '',
    phone = '',
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = [],
    location = '',
    role = ''
  } = formData;

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] bg-[#1A1A1A] mx-auto shadow-2xl flex flex-col"
      style={{ 
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Header Section */}
      <div className="p-8 border-b border-gray-700">
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
      <div className="flex flex-1 p-8 gap-8">
        {/* Left Column */}
        <div className="w-[40%] space-y-8">
          {/* About Me */}
          <div>
            <h2 className="text-[#FF6B35] text-base font-bold uppercase mb-3">About Me</h2>
            <EditableText
              value={summary}
              placeholder="Professional summary"
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="text-white text-sm leading-relaxed"
              multiline
            />
          </div>

          {/* Education */}
          <div>
            <h2 className="text-[#FF6B35] text-base font-bold uppercase mb-4">Education</h2>
            <div className="space-y-4">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="text-white text-sm">
                    <div className="mb-1">
                      <EditableText
                        value={typeof edu.year === 'number' ? `${edu.year - 2} - ${edu.year}` : (edu.year || '')}
                        placeholder="2024 - 2027"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.year`, val)}
                        className="font-bold"
                      />
                    </div>
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="University"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      className="font-bold text-base mb-1"
                    />
                    <div className="text-gray-300">
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
                  <div className="text-white text-sm">
                    <div className="mb-1">
                      <span className="font-bold">[2024 - 2027]</span>
                    </div>
                    <div className="font-bold text-base mb-1">RIMBERIO UNIVERSITY</div>
                    <div className="text-gray-300">Bachelor of Technology</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-[#FF6B35] text-base font-bold uppercase mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                    {skill.level && (
                      <>
                        {' ('}
                        <EditableText
                          value={skill.level || ''}
                          placeholder="Level"
                          editable={editable}
                          onChange={(val) => onChange(`skills.${index}.level`, val)}
                          className="inline"
                        />
                        {')'}
                      </>
                    )}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-transparent text-white border border-white">
                    Typography
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black">
                    Communication
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-transparent text-white border border-white">
                    Visual Imagination
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-transparent text-white border border-white">
                    User Research
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-[#FF6B35] text-base font-bold uppercase mb-4">Projects</h2>
            <div className="space-y-4">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="text-white">
                    <EditableText
                      value={project.name || ''}
                      placeholder="Project Name"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.name`, val)}
                      className="font-bold text-base mb-2"
                    />
                    {(project.description || editable) && (
                      <div className="mb-2">
                        <EditableText
                          value={project.description || ''}
                          placeholder="Project description"
                          editable={editable}
                          onChange={(val) => onChange(`projects.${index}.description`, val)}
                          className="text-sm text-gray-300 leading-relaxed"
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
                          className="px-3 py-1 rounded-full text-xs bg-white/10 text-white border border-white/30"
                        />
                      </div>
                    )}
                    <div className="flex gap-3 text-xs">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-white">
                  <div className="font-bold text-base mb-2">Portfolio Website</div>
                  <div className="text-sm text-gray-300 leading-relaxed mb-2">
                    Designed and developed a personal portfolio website showcasing projects and skills using modern web technologies.
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs bg-white/10 text-white border border-white/30 inline-block">
                    React, Tailwind CSS, Node.js
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <h2 className="text-[#FF6B35] text-base font-bold uppercase mb-4">Work Experience</h2>
          <div className="space-y-6">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="text-white">
                  <div className="font-bold text-base mb-2">
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
                    <div className="text-sm text-gray-300 leading-relaxed">
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
                  <div className="font-bold text-base mb-2">
                    AWARDIERE INC. - UX/UI DESIGNER (NOW - 2023)
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="text-white">
                  <div className="font-bold text-base mb-2">
                    SALFORD & CO. - UX/UI DESIGNER (2023 - 2021)
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="text-white">
                  <div className="font-bold text-base mb-2">
                    INGOUDE COMPANY - UX/UI DESIGNER (2021 - 2018)
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
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

