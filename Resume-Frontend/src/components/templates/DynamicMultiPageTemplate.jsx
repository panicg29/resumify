import React from 'react';
import EditableText from '../EditableText';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Github } from 'lucide-react';

const DynamicMultiPageTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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
    pageCount = 1
  } = formData;

  // Ensure we always have arrays
  const educationList = education && education.length > 0 ? education : [];
  const experienceList = experience && experience.length > 0 ? experience : [];
  const skillsList = skills && skills.length > 0 ? skills : [];
  const projectsList = projects && projects.length > 0 ? projects : [];

  // Use pageCount from PDF, minimum 1
  const numPages = Math.max(1, pageCount || 1);

  // Intelligent content distribution algorithm - ensures all pages are filled
  const distributeContent = () => {
    const pages = [];
    
    // Calculate items per page for even distribution
    const expPerPage = Math.ceil(experienceList.length / numPages);
    const projPerPage = Math.ceil(projectsList.length / numPages);
    const eduPerPage = Math.ceil(educationList.length / numPages);
    const skillPerPage = Math.ceil(skillsList.length / numPages);
    
    let expIndex = 0;
    let eduIndex = 0;
    let projIndex = 0;
    let skillIndex = 0;
    
    for (let pageNum = 0; pageNum < numPages; pageNum++) {
      const isFirst = pageNum === 0;
      const isLast = pageNum === numPages - 1;
      const pageContent = {
        experience: [],
        education: [],
        projects: [],
        skills: [],
        isFirst,
        isLast,
        pageNum: pageNum + 1
      };
      
      // Distribute experience evenly
      const expStart = expIndex;
      const expEnd = Math.min(expIndex + expPerPage, experienceList.length);
      for (let i = expStart; i < expEnd; i++) {
        pageContent.experience.push({ data: experienceList[i], index: i });
        expIndex++;
      }
      
      // Distribute projects evenly
      const projStart = projIndex;
      const projEnd = Math.min(projIndex + projPerPage, projectsList.length);
      for (let i = projStart; i < projEnd; i++) {
        pageContent.projects.push({ data: projectsList[i], index: i });
        projIndex++;
      }
      
      // Distribute education evenly
      const eduStart = eduIndex;
      const eduEnd = Math.min(eduIndex + eduPerPage, educationList.length);
      for (let i = eduStart; i < eduEnd; i++) {
        pageContent.education.push({ data: educationList[i], index: i });
        eduIndex++;
      }
      
      // Distribute skills evenly
      const skillStart = skillIndex;
      const skillEnd = Math.min(skillIndex + skillPerPage, skillsList.length);
      for (let i = skillStart; i < skillEnd; i++) {
        pageContent.skills.push({ data: skillsList[i], index: i });
        skillIndex++;
      }
      
      pages.push(pageContent);
    }
    
    return pages;
  };
  
  const pages = distributeContent();

  const renderPage = (pageData, pageNum) => {
    const isFirst = pageData.isFirst;
    const isLast = pageData.isLast;
    
    return (
      <div key={pageNum} className={`page ${!isLast ? 'page-break' : ''}`}>
        <div className="page-content">
          {/* Header - Only on first page */}
          {isFirst && (
            <div className="border-b-2 border-gray-200 pb-2.5 mb-3 no-break">
              <h1 className="text-3xl font-light text-gray-900 mb-1.5 tracking-tight">
                <EditableText
                  value={name}
                  placeholder="Your Full Name"
                  editable={editable}
                  onChange={(val) => onChange('name', val)}
                />
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  <EditableText
                    value={email}
                    placeholder="your.email@example.com"
                    editable={editable}
                    onChange={(val) => onChange('email', val)}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  <EditableText
                    value={phone}
                    placeholder="+1 (555) 123-4567"
                    editable={editable}
                    onChange={(val) => onChange('phone', val)}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  <EditableText
                    value={location}
                    placeholder="City, State, Country"
                    editable={editable}
                    onChange={(val) => onChange('location', val)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Page number indicator for non-first pages */}
          {!isFirst && (
            <div className="mb-2 pb-1.5 border-b border-gray-200 no-break">
              <div className="text-xs text-gray-400 text-right">Page {pageData.pageNum} of {numPages}</div>
            </div>
          )}

          {/* Summary - Only on first page, ALWAYS SHOWN */}
          {isFirst && (
            <div className="mb-3 no-break">
              <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Professional Summary</h2>
              <div className="text-xs text-gray-700 leading-relaxed">
                <EditableText
                  value={summary}
                  placeholder="Experienced professional with a proven track record in [your field]. Skilled in [key skills] with [X] years of experience. Demonstrated expertise in [areas of expertise]. Strong background in [relevant experience] with a focus on [specialization]. Proven ability to [key achievements] and deliver [results]."
                  editable={editable}
                  onChange={(val) => onChange('summary', val)}
                  multiline
                />
              </div>
            </div>
          )}

          {/* Experience Section - ALWAYS SHOWN */}
          <div className="mb-3">
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <Briefcase className="w-3 h-3" />
              {isFirst ? 'Professional Experience' : 'Professional Experience (Continued)'}
            </h2>
            {pageData.experience.length > 0 ? (
              <div className="space-y-2.5">
                  {pageData.experience.map(({ data: exp, index }) => (
                    <div key={index} className="no-break">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-gray-900">
                            <EditableText
                              value={exp.title}
                              placeholder="Senior Job Title"
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.title`, val)}
                            />
                          </h3>
                          <p className="text-xs text-gray-600 mt-0.5">
                            <EditableText
                              value={exp.company}
                              placeholder="Company Name, Inc."
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.company`, val)}
                            />
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 text-right ml-2">
                          <EditableText
                            value={exp.startDate || ''}
                            placeholder="Jan 2020"
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
                              placeholder="Dec 2023"
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                              className="inline"
                            />
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed mt-1 pl-2 border-l-2 border-gray-100">
                        <EditableText
                          value={exp.description || ''}
                          placeholder="• Led and managed cross-functional teams to deliver high-impact projects on time and within budget\n• Developed and implemented innovative solutions that improved efficiency by 40%\n• Collaborated with stakeholders to define requirements and ensure successful project delivery\n• Mentored junior team members and established best practices for the organization"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.description`, val)}
                          multiline
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                  Add your professional experience here
                </div>
              )}
          </div>

          {/* Education Section - ALWAYS SHOWN */}
          <div className="mb-3">
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <GraduationCap className="w-3 h-3" />
              {isFirst ? 'Education' : 'Education (Continued)'}
            </h2>
            {pageData.education.length > 0 ? (
              <div className="space-y-2">
                  {pageData.education.map(({ data: edu, index }) => (
                    <div key={index} className="no-break">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-gray-900">
                            <EditableText
                              value={edu.degree}
                              placeholder="Bachelor of Science in Computer Science"
                              editable={editable}
                              onChange={(val) => onChange(`education.${index}.degree`, val)}
                            />
                          </h3>
                          <p className="text-xs text-gray-600 mt-0.5">
                            <EditableText
                              value={edu.institution}
                              placeholder="University Name"
                              editable={editable}
                              onChange={(val) => onChange(`education.${index}.institution`, val)}
                            />
                          </p>
                          {edu.gpa && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              GPA: <EditableText
                                value={edu.gpa}
                                placeholder="3.8"
                                editable={editable}
                                onChange={(val) => onChange(`education.${index}.gpa`, val)}
                                className="inline"
                              />
                            </p>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 ml-2">
                          <EditableText
                            value={typeof edu.year === 'number' ? String(edu.year) : (edu.year || '')}
                            placeholder="2020"
                            editable={editable}
                            onChange={(val) => onChange(`education.${index}.year`, val)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                  Add your educational background here
                </div>
              )}
          </div>

          {/* Projects Section - ALWAYS SHOWN */}
          <div className="mb-3">
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <Code className="w-3 h-3" />
              {isFirst ? 'Key Projects' : 'Key Projects (Continued)'}
            </h2>
            {pageData.projects.length > 0 ? (
              <div className="space-y-2.5">
                  {pageData.projects.map(({ data: project, index }) => {
                    const technologies = Array.isArray(project.technologies)
                      ? project.technologies
                      : typeof project.technologies === 'string'
                      ? project.technologies.split(',').map(t => t.trim()).filter(t => t)
                      : [];

                    return (
                      <div key={index} className="no-break">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-xs font-semibold text-gray-900">
                            <EditableText
                              value={project.name}
                              placeholder="Project Name"
                              editable={editable}
                              onChange={(val) => onChange(`projects.${index}.name`, val)}
                            />
                          </h3>
                          <div className="flex gap-1.5 ml-2">
                            {project.url && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                <Globe className="w-3 h-3" />
                              </a>
                            )}
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                                <Github className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed mb-1.5 pl-2 border-l-2 border-gray-100">
                          <EditableText
                            value={project.description || ''}
                            placeholder="Comprehensive project description detailing the problem solved, approach taken, technologies used, and results achieved. Include specific metrics and outcomes that demonstrate the project's impact and your contribution to its success."
                            editable={editable}
                            onChange={(val) => onChange(`projects.${index}.description`, val)}
                            multiline
                          />
                        </p>
                        {technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="text-xs px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded border border-gray-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                  Add your key projects here
                </div>
              )}
          </div>

          {/* Skills Section - ALWAYS SHOWN */}
          <div className="mb-3">
            <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <Code className="w-3 h-3" />
              {isFirst ? 'Technical Skills' : 'Technical Skills (Continued)'}
            </h2>
            {pageData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {pageData.skills.map(({ data: skill, index }) => (
                  <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    <EditableText
                      value={skill.name}
                      placeholder="Skill Name"
                      editable={editable}
                      onChange={(val) => onChange(`skills.${index}.name`, val)}
                    />
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                Add your technical skills here
              </div>
            )}
          </div>

          {/* Additional filler sections for middle pages */}
          {!isFirst && !isLast && (
            <>
              {/* Skills by Level on middle pages - ALWAYS SHOWN */}
              <div className="mb-3">
                <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Skills by Proficiency</h2>
                <div className="grid grid-cols-2 gap-2">
                  {['Expert', 'Advanced', 'Intermediate', 'Beginner'].map((level) => {
                    const levelSkills = skillsList.filter(skill => skill.level === level);
                    return (
                      <div key={level} className="no-break">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">{level}</h4>
                        {levelSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {levelSkills.slice(0, 8).map((skill, index) => {
                              const skillIndex = skillsList.findIndex(s => s.name === skill.name && s.level === skill.level);
                              return (
                                <span key={index} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">
                                  <EditableText
                                    value={skill.name}
                                    placeholder="Skill"
                                    editable={editable}
                                    onChange={(val) => onChange(`skills.${skillIndex}.name`, val)}
                                  />
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 italic">Add {level.toLowerCase()} skills</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Skills Display */}
              {skillsList.length > 0 && (
                <div className="mb-3">
                  <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Additional Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.slice(0, 15).map((skill, index) => (
                      <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                        <EditableText
                          value={skill.name}
                          placeholder="Skill"
                          editable={editable}
                          onChange={(val) => onChange(`skills.${index}.name`, val)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Additional sections to fill space on last page */}
          {isLast && (
            <>
              {/* Skills by Level - ALWAYS SHOWN on last page */}
              <div className="mb-3">
                <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Skills by Proficiency Level</h2>
                <div className="grid grid-cols-2 gap-2">
                  {['Expert', 'Advanced', 'Intermediate', 'Beginner'].map((level) => {
                    const levelSkills = skillsList.filter(skill => skill.level === level);
                    return (
                      <div key={level} className="no-break">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">{level}</h4>
                        {levelSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {levelSkills.map((skill, index) => {
                              const skillIndex = skillsList.findIndex(s => s.name === skill.name && s.level === skill.level);
                              return (
                                <span key={index} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">
                                  <EditableText
                                    value={skill.name}
                                    placeholder="Skill"
                                    editable={editable}
                                    onChange={(val) => onChange(`skills.${skillIndex}.name`, val)}
                                  />
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 italic">Add {level.toLowerCase()} skills</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complete Skills Grid - ALWAYS SHOWN on last page */}
              <div className="mb-3">
                <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Complete Skills Inventory</h2>
                {skillsList.length > 0 ? (
                  <div className="grid grid-cols-3 gap-1.5">
                    {skillsList.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between text-xs no-break border-b border-gray-100 pb-0.5">
                        <span className="text-gray-700">
                          <EditableText
                            value={skill.name}
                            placeholder="Skill"
                            editable={editable}
                            onChange={(val) => onChange(`skills.${index}.name`, val)}
                          />
                        </span>
                        {skill.level && (
                          <span className="text-gray-400 text-xs ml-1">
                            <EditableText
                              value={skill.level}
                              placeholder="Level"
                              editable={editable}
                              onChange={(val) => onChange(`skills.${index}.level`, val)}
                            />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                    Skills will be displayed here
                  </div>
                )}
              </div>

              {/* Career Timeline - ALWAYS SHOWN on last page */}
              <div className="mb-3">
                <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Career Timeline</h2>
                {experienceList.length > 0 ? (
                  <div className="space-y-1">
                    {experienceList.map((exp, index) => (
                      <div key={index} className="flex items-center justify-between text-xs border-l-2 border-gray-200 pl-2 py-0.5 no-break">
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">
                            <EditableText
                              value={exp.title}
                              placeholder="Job Title"
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.title`, val)}
                              className="inline"
                            />
                          </span>
                          {' at '}
                          <span className="text-gray-600">
                            <EditableText
                              value={exp.company}
                              placeholder="Company"
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.company`, val)}
                              className="inline"
                            />
                          </span>
                        </div>
                        <div className="text-gray-500 ml-2">
                          <EditableText
                            value={exp.startDate || ''}
                            placeholder="Jan 2020"
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
                              placeholder="Dec 2023"
                              editable={editable}
                              onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                              className="inline"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                    Career timeline will be displayed here
                  </div>
                )}
              </div>

              {/* Academic Credentials - ALWAYS SHOWN on last page */}
              <div className="mb-3">
                <h2 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Academic Credentials</h2>
                {educationList.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {educationList.map((edu, index) => (
                      <div key={index} className="border border-gray-200 p-2 rounded no-break">
                        <div className="text-xs">
                          <div className="font-semibold text-gray-900 mb-0.5">
                            <EditableText
                              value={edu.degree}
                              placeholder="Degree"
                              editable={editable}
                              onChange={(val) => onChange(`education.${index}.degree`, val)}
                            />
                          </div>
                          <div className="text-gray-600">
                            <EditableText
                              value={edu.institution}
                              placeholder="Institution"
                              editable={editable}
                              onChange={(val) => onChange(`education.${index}.institution`, val)}
                            />
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-500">
                              <EditableText
                                value={typeof edu.year === 'number' ? String(edu.year) : (edu.year || '')}
                                placeholder="Year"
                                editable={editable}
                                onChange={(val) => onChange(`education.${index}.year`, val)}
                              />
                            </span>
                            {edu.gpa && (
                              <span className="text-gray-500 font-medium">
                                GPA: <EditableText
                                  value={edu.gpa}
                                  placeholder="3.8"
                                  editable={editable}
                                  onChange={(val) => onChange(`education.${index}.gpa`, val)}
                                  className="inline"
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic pl-2 border-l-2 border-gray-100 py-2">
                    Academic credentials will be displayed here
                  </div>
                )}
              </div>

              {/* Contact Footer - ALWAYS SHOWN on last page */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />
                    <EditableText
                      value={email}
                      placeholder="your.email@example.com"
                      editable={editable}
                      onChange={(val) => onChange('email', val)}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    <EditableText
                      value={phone}
                      placeholder="+1 (555) 123-4567"
                      editable={editable}
                      onChange={(val) => onChange('phone', val)}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <EditableText
                      value={location}
                      placeholder="City, State, Country"
                      editable={editable}
                      onChange={(val) => onChange('location', val)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="w-[21cm] bg-white mx-auto"
      style={{ 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0.8cm;
          }
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
          }
        }
        .page {
            min-height: 28.1cm;
            padding: 0;
        }
        .page-content {
            padding: 0.7cm;
        }
      `}</style>

      {pages.map((pageData, index) => renderPage(pageData, index))}
    </div>
  );
};

export default DynamicMultiPageTemplate;
