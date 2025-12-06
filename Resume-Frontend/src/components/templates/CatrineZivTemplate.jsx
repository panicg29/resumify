import React from 'react';
import EditableText from '../EditableText';

const CatrineZivTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const darkGreen = '#6B706B'; // Dark green-grey sidebar
  const offWhite = '#F5F0E8'; // Light off-white main
  const textDark = '#4A3728'; // Dark grey/brown
  const textLight = '#6B4E3D'; // Light grey/brown for dates
  const textWhite = '#FFFFFF'; // White text for sidebar

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
      return `${edu.year - 1} - ${edu.year}`;
    }
    return String(edu.year);
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: offWhite }}
    >
      {/* Left Column - Dark Green-Grey Background */}
      <div 
        className="w-[35%] p-6 flex flex-col"
        style={{ backgroundColor: darkGreen }}
      >
        {/* Profile Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            PROFILE
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: textWhite }}>
            <EditableText
              value={summary || ''}
              placeholder="IT project manager with holistic knowledge and experience in software development, project management, and team coordination."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textWhite }}
              multiline
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            SKILLS
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
                <li>Project Management</li>
                <li>Software Development</li>
                <li>Process Improvement</li>
                <li>Team Leadership</li>
                <li>Agile Methodology</li>
                <li>Risk Management</li>
              </>
            )}
          </ul>
        </div>

        {/* Awards Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textWhite }}
          >
            AWARDS
          </h3>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textWhite }}>
            <li>Most Outstanding Employee of the Year, Pixelpoint Hive (2015)</li>
            <li>Best Mobile App Design, HGFZ Graduate Center (2014)</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-auto">
          <div className="space-y-2 text-sm" style={{ color: textWhite }}>
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
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textWhite} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textWhite }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Light Off-White Background */}
      <div className="flex-1 p-8" style={{ backgroundColor: offWhite }}>
        {/* Name and Title */}
        <div className="mb-8">
          <h1 
            className="text-5xl font-bold mb-2"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif'
            }}
          >
            <EditableText
              value={name || ''}
              placeholder="Catrine Ziv"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              style={{ color: textDark }}
            />
          </h1>
          <p 
            className="text-lg uppercase"
            style={{ 
              color: textLight,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'normal'
            }}
          >
            <EditableText
              value={formData.role || ''}
              placeholder="IT PROJECT MANAGER"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textLight }}
            />
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            WORK EXPERIENCE
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Project Manager"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Westheon FGW"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.company`, val)}
                      style={{ color: textDark }}
                    />
                    {' '}
                    {formatExperienceDate(exp) && `| ${formatExperienceDate(exp)}`}
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
                            placeholder="Conduct day-to-day project coordination, planning, and implementation across multiple teams."
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
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>Project Manager</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Westheon FGW | Oct 2017 - present</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Conduct day-to-day project coordination, planning, and implementation across multiple teams.</li>
                    <li>Manage project timelines and deliverables.</li>
                    <li>Coordinate with stakeholders and team members.</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>Senior Project Coordinator</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Tech Solutions Inc. | Jan 2015 - Sep 2017</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Assisted in project planning and execution.</li>
                    <li>Maintained project documentation and reports.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Educational History Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            EDUCATIONAL HISTORY
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="HGFZ Graduate Center"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>
                    <EditableText
                      value={edu.degree || ''}
                      placeholder="Masters in Project Management"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.degree`, val)}
                      style={{ color: textDark }}
                    />
                    {' '}
                    {formatEducationYear(edu) && `| ${formatEducationYear(edu)}`}
                  </div>
                  {(edu.gpa || editable) && (
                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                      <li>
                        <EditableText
                          value={edu.gpa ? `GPA: ${edu.gpa}` : ''}
                          placeholder="GPA: 3.26"
                          editable={editable}
                          onChange={(val) => onChange(`education.${index}.gpa`, val.replace('GPA: ', ''))}
                          style={{ color: textDark }}
                        />
                      </li>
                      <li>Minor in Management</li>
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>HGFZ Graduate Center</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Masters in Project Management | Jan 2013 - Dec 2014</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Studied project planning, coordination, and ethics</li>
                    <li>GPA: 3.26</li>
                    <li>Minor in Management</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>University Name</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Bachelor's Degree | 2009 - 2013</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Relevant coursework and achievements</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            PROJECTS
          </h3>
          <div 
            className="w-full h-px mb-4"
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
                    <div className="text-sm" style={{ color: textDark }}>
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        style={{ color: textDark }}
                        multiline
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1" style={{ color: textDark }}>Enterprise Software Implementation</div>
                <div className="text-sm" style={{ color: textDark }}>
                  Led implementation of enterprise software solution for client organization.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatrineZivTemplate;

