import React from 'react';
import EditableText from '../EditableText';

const JulianaSilvaTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
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

  const peachBg = '#F5E6D3'; // Light peach/beige sidebar
  const offWhite = '#FAF9F6'; // Off-white main
  const textDark = '#2C2C2C'; // Dark brown/black
  const textMedium = '#4A4A4A'; // Medium gray

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
      return `${edu.year - 2} - ${edu.year}`;
    }
    return String(edu.year);
  };

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: offWhite }}
    >
      {/* Left Column - Light Peach/Beige Background */}
      <div 
        className="w-[35%] p-6 flex flex-col"
        style={{ backgroundColor: peachBg }}
      >
        {/* Contact Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase'
            }}
          >
            CONTACT
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-2 text-sm" style={{ color: textDark }}>
            {(phone || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="hello@reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="www.reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textDark }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase'
            }}
          >
            EXPERTISE
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
            {skills && skills.length > 0 ? (
              skills.slice(0, 6).map((skill, index) => (
                <li key={index}>
                  <EditableText
                    value={skill.name || ''}
                    placeholder={`Skill ${index + 1}`}
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    style={{ color: textDark }}
                  />
                </li>
              ))
            ) : (
              <>
                <li>UX Design</li>
                <li>Graphics Design</li>
                <li>Project Management</li>
                <li>Branding</li>
              </>
            )}
          </ul>
        </div>

        {/* Software Knowledge Section */}
        <div className="mb-6">
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase'
            }}
          >
            SOFTWARE KNOWLEDGE
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
            <li>Graphic Design Software</li>
            <li>Software for Design</li>
            <li>Another Software</li>
            <li>Team Communication Software</li>
            <li>Graphics Software</li>
          </ul>
        </div>

        {/* Personal Skills Section */}
        <div>
          <h3 
            className="text-base font-bold mb-3"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase'
            }}
          >
            PERSONAL SKILLS
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <ul className="space-y-1 text-sm list-disc list-inside" style={{ color: textDark }}>
            <li>Creativity</li>
            <li>Team building</li>
            <li>Communication</li>
            <li>Problem Solving</li>
            <li>Leadership</li>
          </ul>
        </div>
      </div>

      {/* Right Column - Off-White Background */}
      <div className="flex-1 p-8" style={{ backgroundColor: offWhite }}>
        {/* Name and Title */}
        <div className="mb-6">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              color: textDark,
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase'
            }}
          >
            <EditableText
              value={name || ''}
              placeholder="JULIANA SILVA"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              style={{ color: textDark }}
            />
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: textDark,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'normal'
            }}
          >
            <EditableText
              value={formData.role || ''}
              placeholder="Senior Graphic Designer"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textDark }}
            />
          </p>
          <div 
            className="w-full h-px mt-3"
            style={{ backgroundColor: textDark }}
          ></div>
        </div>

        {/* Personal Profile Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            PERSONAL PROFILE
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="text-sm leading-relaxed" style={{ color: textDark }}>
            <EditableText
              value={summary || ''}
              placeholder="I am a senior graphic designer with 10 years experience in graphic design and UX design. I am also experienced in coordinating a team of mid-level designers."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textDark }}
              multiline
            />
          </div>
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
            className="w-full h-px mb-3"
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
                      placeholder="SENIOR GRAPHIC DESIGNER"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Fauget"
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
                            placeholder="Responsibility description"
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
                  <div className="font-bold mb-1" style={{ color: textDark }}>SENIOR GRAPHIC DESIGNER</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Fauget | Oct 2019 - present</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Design concept development and implementation for the main product application</li>
                    <li>Leading a team of five mid-level designers</li>
                    <li>Coordinating social media graphics team</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>GRAPHIC DESIGNER</div>
                  <div className="text-sm mb-2" style={{ color: textDark }}>Studio Shodwe | Dec 2015 - Sep 2019</div>
                  <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textDark }}>
                    <li>Creating and editing graphic design assets for the web application and website</li>
                    <li>Helping with day-to-day project tasks</li>
                    <li>Developing and editing social media templates</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 
            className="text-base font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            EDUCATION
          </h3>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-3">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={edu.degree || ''}
                      placeholder="MASTERS IN GRAPHIC DESIGN"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.degree`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm" style={{ color: textDark }}>
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="Keithston and Partners"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      style={{ color: textDark }}
                    />
                    {' '}
                    {formatEducationYear(edu) && `| ${formatEducationYear(edu)}`}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>MASTERS IN GRAPHIC DESIGN</div>
                  <div className="text-sm" style={{ color: textDark }}>Keithston and Partners | 2013 - 2015</div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: textDark }}>BA GRAPHIC DESIGN</div>
                  <div className="text-sm" style={{ color: textDark }}>Keithston and Partners | 2010 - 2013</div>
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
            className="w-full h-px mb-3"
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
                    <div className="text-sm" style={{ color: textMedium }}>
                      <EditableText
                        value={project.description || ''}
                        placeholder="Project description"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.description`, val)}
                        style={{ color: textMedium }}
                        multiline
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1" style={{ color: textDark }}>Portfolio Website</div>
                <div className="text-sm" style={{ color: textMedium }}>
                  Designed and developed a professional portfolio showcasing creative work.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JulianaSilvaTemplate;

