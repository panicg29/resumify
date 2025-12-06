import React from 'react';
import EditableText from '../EditableText';

const DanielGallegoTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const whiteBg = '#FFFFFF';
  const headerBg = '#E5E5E5'; // Light grey
  const textDark = '#000000'; // Pure black
  const textLight = '#333333'; // Darker for better visibility

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || 'Present');
    return `${start} - ${end}`;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (edu.year) {
      if (typeof edu.year === 'string' && edu.year.includes('-')) {
        return edu.year;
      }
      if (typeof edu.year === 'number') {
        return `${edu.year - 2} - ${edu.year}`;
      }
    }
    return '';
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: whiteBg }}
    >
      <div className="p-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 
            className="font-bold uppercase mb-2"
            style={{ fontSize: '38px', lineHeight: '1.1', letterSpacing: '1px', color: textDark }}
          >
            <EditableText
              value={name || ''}
              placeholder="DANIEL GALLEGO"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="uppercase"
            />
          </h1>
          <p 
            className="uppercase mb-3"
            style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', color: textDark }}
          >
            <EditableText
              value={role || ''}
              placeholder="UX DESIGNER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              className="uppercase"
            />
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ fontSize: '12px', color: textLight }}>
            {(location || editable) && (
              <>
                <EditableText
                  value={location}
                  placeholder="City, Country"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  className="inline"
                  style={{ color: textLight }}
                />
                {(location || editable) && (email || phone || editable) && <span>|</span>}
              </>
            )}
            {(email || editable) && (
              <>
                <EditableText
                  value={email}
                  placeholder="email@example.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  className="inline"
                  style={{ color: textLight }}
                />
                {(email || editable) && (phone || editable) && <span>|</span>}
              </>
            )}
            {(phone || editable) && (
              <EditableText
                value={phone}
                placeholder="+123-456-7890"
                editable={editable}
                onChange={(val) => onChange('phone', val)}
                className="inline"
                style={{ color: textLight }}
              />
            )}
          </div>
        </div>

        {/* SUMMARY Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              SUMMARY
            </h3>
          </div>
          <EditableText
            value={summary}
            placeholder="Professional summary"
            editable={editable}
            onChange={(val) => onChange('summary', val)}
            className="text-sm leading-relaxed text-justify"
            style={{ fontSize: '13px', lineHeight: '1.6', color: textDark }}
            multiline
          />
        </div>

        {/* TECHNICAL SKILLS Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              TECHNICAL SKILLS
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                  <EditableText
                    value={skill.name || ''}
                    placeholder="Skill"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    className="inline"
                    style={{ color: textDark }}
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
                        style={{ color: textDark }}
                      />
                      {')'}
                    </>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>User Research</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Wireframing</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Prototyping</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>UI Design</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Figma</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Adobe XD</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Sketch</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>HTML/CSS</div>
                <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>JavaScript</div>
              </>
            )}
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              PROFESSIONAL EXPERIENCE
            </h3>
          </div>
          <div className="space-y-6">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <EditableText
                        value={exp.title || ''}
                        placeholder="Job Title"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                        className="font-bold text-base mb-1"
                        style={{ fontSize: '14px', color: textDark }}
                      />
                      <EditableText
                        value={exp.company || ''}
                        placeholder="Company"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        className="text-sm"
                        style={{ fontSize: '13px', color: textDark }}
                      />
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>
                      <EditableText
                        value={exp.startDate || ''}
                        placeholder="Start Date"
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
                          placeholder="End Date"
                          editable={editable}
                          onChange={(val) => onChange(`experience.${index}.endDate`, val)}
                          className="inline"
                        />
                      )}
                    </div>
                  </div>
                  {(exp.description || editable) && (
                    <div className="space-y-1">
                      <EditableText
                        value={exp.description || ''}
                        placeholder="Job description"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.description`, val)}
                        className="text-sm"
                        style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}
                        multiline
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Senior UX Designer</div>
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Tech Innovations Inc.</div>
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>Jan 2023 - Present</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Led UX design for multiple product launches.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Conducted user research and usability testing.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>Collaborated with cross-functional teams.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              PROJECTS
            </h3>
          </div>
          <div className="space-y-6">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index}>
                  <EditableText
                    value={project.name || ''}
                    placeholder="Project Name"
                    editable={editable}
                    onChange={(val) => onChange(`projects.${index}.name`, val)}
                    className="font-bold text-base mb-1"
                    style={{ fontSize: '14px', color: textDark }}
                  />
                  {(project.description || editable) && (
                    <div className="mb-2">
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        className="text-sm"
                        style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}
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
                        className="px-2 py-0.5 text-xs border"
                        style={{ fontSize: '11px', borderColor: textLight, color: textDark }}
                      />
                    </div>
                  )}
                  <div className="flex gap-3 text-xs" style={{ fontSize: '11px' }}>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: textDark }}>
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: textDark }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Social Media Platform</div>
                <div className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5', color: textDark }}>
                  Developed a social media platform with user profiles, post creation, commenting system, and real-time notifications.
                </div>
                <div className="px-2 py-0.5 text-xs border inline-block" style={{ fontSize: '11px', borderColor: textLight, color: textDark }}>
                  React, Firebase, Material-UI
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATION Section */}
        <div className="mb-8">
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              EDUCATION
            </h3>
          </div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <EditableText
                        value={edu.degree || ''}
                        placeholder="Degree"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="font-bold text-base mb-1"
                        style={{ fontSize: '14px', color: textDark }}
                      />
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>
                        <EditableText
                          value={edu.institution || ''}
                          placeholder="Institution"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.institution`, val)}
                          className="inline"
                        />
                        {(edu.gpa || editable) && (
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
                    <EditableText
                      value={formatEducationYear(edu) || edu.year || ''}
                      placeholder="Year"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.year`, val)}
                      className="text-sm"
                      style={{ fontSize: '12px', color: textDark }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-bold text-base mb-1" style={{ fontSize: '14px', color: textDark }}>Bachelor of Design</div>
                      <div className="text-sm" style={{ fontSize: '13px', color: textDark }}>Design University</div>
                    </div>
                    <div className="text-sm" style={{ fontSize: '12px', color: textDark }}>2018 - 2022</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ADDITIONAL INFORMATION Section */}
        <div>
          <div 
            className="py-2 px-4 mb-4"
            style={{ backgroundColor: headerBg }}
          >
            <h3 
              className="font-bold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1px', color: textDark }}
            >
              ADDITIONAL INFORMATION
            </h3>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>Languages: </span>
              <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>English (Fluent), Spanish (Conversational)</span>
            </div>
            <div>
              <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>Certifications: </span>
              <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>UX Design Certification, Google UX Design Certificate</span>
            </div>
            <div>
              <span className="font-bold text-sm" style={{ fontSize: '12px', color: textDark }}>Awards/Activities: </span>
              <span className="text-sm" style={{ fontSize: '12px', color: textDark }}>Design Excellence Award 2023, UX Design Community Leader</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanielGallegoTemplate;

