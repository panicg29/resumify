import React from 'react';
import EditableText from '../EditableText';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Languages } from 'lucide-react';

const IsabelSchumacherGlassTemplate = ({ formData, editable = false, onChange = () => {} }) => {
  // Destructure matching backend schema
  const {
    name = '',
    email = '',
    phone = '',
    summary = '',
    education = [],
    experience = [],
    skills = [],
    projects = []
  } = formData || {};

  return (
    <div className="w-[21cm] h-[29.7cm] mx-auto shadow-2xl flex relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Background with gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgb(192, 132, 252), rgb(249, 168, 212), rgb(96, 165, 250))' }}></div>
      
      {/* Left Sidebar - Glass Effect */}
      <div className="relative w-[35%] backdrop-blur-xl text-white p-8 flex flex-col border-r border-white/20" style={{ backgroundColor: 'rgba(17, 24, 39, 0.4)' }}>
        {/* Overlay for extra glass effect */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), transparent)' }}></div>
        
        <div className="relative z-10">
          {/* About Me Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <User className="w-5 h-5" />
              <h3 className="text-lg font-bold">About Me</h3>
            </div>
            <EditableText
              value={summary}
              placeholder="Professional summary goes here"
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="text-sm leading-relaxed text-white/90 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
              multiline
            />
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Mail className="w-5 h-5" />
              <h3 className="text-lg font-bold">Contact</h3>
            </div>
            <div className="space-y-3 text-sm bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <EditableText
                  value={phone}
                  placeholder={'+123-456-7899'}
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  className="text-white/90"
                />
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <EditableText
                  value={email}
                  placeholder={'email@example.com'}
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="text-white/90 break-all"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-lg font-bold">Skills</h3>
            </div>
            <div className="space-y-2 text-sm text-white/90 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-lg shadow-white/50"></div>
                      <EditableText
                        value={skill.name}
                        placeholder="Skill"
                        editable={editable}
                        onChange={(val) => onChange(`skills.${index}.name`, val)}
                      />
                    </div>
                    <EditableText
                      value={skill.level}
                      placeholder="Level"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.level`, val)}
                      className="text-xs text-white/70"
                    />
                  </div>
                ))
              ) : (
                <div className="text-white/60 text-xs">No skills added</div>
              )}
            </div>
          </div>

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                <Briefcase className="w-5 h-5" />
                <h3 className="text-lg font-bold">Projects</h3>
              </div>
              <div className="space-y-3 text-sm text-white/90 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                {projects.map((project, index) => {
                  // Ensure technologies is an array
                  const technologies = Array.isArray(project.technologies) 
                    ? project.technologies 
                    : (typeof project.technologies === 'string' 
                      ? project.technologies.split(',').map(t => t.trim()).filter(t => t)
                      : []);
                  
                  return (
                    <div key={index} className="border-b border-white/20 pb-2 last:border-0">
                    <div className="font-semibold">
                      <EditableText
                        value={project.name}
                        placeholder="Project name"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.name`, val)}
                      />
                    </div>
                    <EditableText
                      value={project.description}
                      placeholder="Project description"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.description`, val)}
                      className="text-xs text-white/70 mt-1"
                      multiline
                    />
                      {technologies && technologies.length > 0 && (
                        <div className="text-xs text-white/60 mt-1">
                          <EditableText
                            value={technologies.join(', ')}
                            placeholder="react, node, mongo"
                            editable={editable}
                            onChange={(val) => onChange(`projects.${index}.technologies`, val)}
                          />
                        </div>
                      )}
                      {(project.url || project.github) && (
                        <div className="flex gap-3 text-xs text-white/60 mt-2">
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
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content - Glass Effect */}
      <div className="relative w-[65%] backdrop-blur-xl p-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        {/* Overlay for extra glass effect */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))' }}></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
            <h1 className="text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm">
              <EditableText
                value={name}
                placeholder="Your Name"
                editable={editable}
                onChange={(val) => onChange('name', val)}
              />
            </h1>
            <p className="text-xl text-gray-700">
              {experience && experience.length > 0 && experience[0].title ? (
                <EditableText
                  value={experience[0].title}
                  placeholder="Professional"
                  editable={editable}
                  onChange={(val) => onChange('experience.0.title', val)}
                />
              ) : (
                editable ? (
                  <EditableText
                    value=""
                    placeholder="Professional"
                    editable={editable}
                    onChange={(val) => onChange('experience.0.title', val)}
                  />
                ) : (
                  'Professional'
                )
              )}
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-white/40 bg-white/10 backdrop-blur-sm rounded-t-lg px-4 py-2">
              <GraduationCap className="w-6 h-6 text-gray-800" />
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>

            <div className="space-y-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-700/50">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-800 shadow-lg"></div>
                    <div>
                      <EditableText
                        value={String(edu.year || '')}
                        placeholder="2024"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.year`, val)}
                        className="text-sm font-bold text-gray-800 mb-1"
                      />
                      <h3 className="text-lg font-bold text-gray-800 uppercase">
                        <EditableText
                          value={edu.institution}
                          placeholder="University"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.institution`, val)}
                        />
                      </h3>
                      <EditableText
                        value={edu.degree}
                        placeholder="Degree"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="text-sm text-gray-700 mb-2"
                      />
                      {editable ? (
                        <EditableText
                          value={edu.gpa || ''}
                          placeholder="GPA"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.gpa`, val)}
                          className="text-sm text-gray-700"
                        />
                      ) : (
                        edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No education added</p>
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-white/40 bg-white/10 backdrop-blur-sm rounded-t-lg px-4 py-2">
              <Briefcase className="w-6 h-6 text-gray-800" />
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
            </div>

            <div className="space-y-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              {experience && experience.length > 0 ? (
                experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-700/50">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-800 shadow-lg"></div>
                    <div>
                    <p className="text-sm font-bold text-gray-800 mb-1">
                      (<EditableText
                        value={exp.startDate || ''}
                        placeholder="Jan 2022"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.startDate`, val)}
                      /> - <EditableText
                        value={exp.current ? 'Present' : (exp.endDate || '')}
                        placeholder="Present"
                        editable={editable && !exp.current}
                        onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                      />)
                    </p>
                    <h3 className="text-lg font-bold text-gray-800 uppercase">
                      <EditableText
                        value={exp.title}
                        placeholder="Title"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                      />
                    </h3>
                    <p className="text-base font-semibold text-gray-700 mb-2">
                      <EditableText
                        value={exp.company}
                        placeholder="Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                      />
                    </p>
                    <EditableText
                      value={exp.description || ''}
                      placeholder={'Responsibility 1\nResponsibility 2'}
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.description`, val)}
                      className="text-sm text-gray-700 space-y-1"
                      multiline
                    />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No experience added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsabelSchumacherGlassTemplate;

