import React from 'react';
import EditableText from '../EditableText';

const EstelleDarcyTemplate = ({ formData = {}, editable = false, onChange = () => {} }) => {
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData;

  const lightGrey = '#E0E0E0'; // Light grey sidebar
  const white = '#FFFFFF';
  const textDark = '#222222';
  const textMedium = '#666666';

  // Format experience dates
  const formatExperienceDate = (exp) => {
    const start = exp.startDate || '';
    const end = exp.current ? 'Present' : (exp.endDate || 'Present');
    return `${start} - ${end}`;
  };

  // Format education year
  const formatEducationYear = (edu) => {
    if (!edu.year) return '';
    if (typeof edu.year === 'string' && edu.year.includes('-')) {
      return edu.year;
    }
    if (typeof edu.year === 'number') {
      return `${edu.year - 4} - ${edu.year}`;
    }
    return String(edu.year);
  };

  // Split name into first and last
  const nameParts = (name || 'ESTELLE DARCY').split(' ');
  const firstName = nameParts[0] || 'ESTELLE';
  const lastName = nameParts.slice(1).join(' ') || 'DARCY';

  return (
    <div 
      className="w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: white }}
    >
      {/* Left Column - Light Grey Background */}
      <div 
        className="w-[35%] p-6 flex flex-col"
        style={{ backgroundColor: lightGrey }}
      >
        {/* Name Header */}
        <div className="mb-6">
          <div 
            className="text-sm uppercase mb-1"
            style={{ color: textMedium, fontWeight: 'normal' }}
          >
            <EditableText
              value={firstName}
              placeholder="ESTELLE"
              editable={editable}
              onChange={(val) => {
                const newName = val + ' ' + lastName;
                onChange('name', newName);
              }}
              style={{ color: textMedium }}
            />
          </div>
          <div 
            className="text-4xl font-bold uppercase mb-4"
            style={{ color: textDark }}
          >
            <EditableText
              value={lastName}
              placeholder="DARCY"
              editable={editable}
              onChange={(val) => {
                const newName = firstName + ' ' + val;
                onChange('name', newName);
              }}
              style={{ color: textDark }}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6 text-right">
          <div className="space-y-2 text-sm" style={{ color: textMedium }}>
            {(phone || editable) && (
              <div className="flex items-center justify-end gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textMedium} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <EditableText
                  value={phone}
                  placeholder="123-456-7890"
                  editable={editable}
                  onChange={(val) => onChange('phone', val)}
                  style={{ color: textMedium }}
                />
              </div>
            )}
            {(email || editable) && (
              <div className="flex items-center justify-end gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textMedium} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <EditableText
                  value={email}
                  placeholder="hello@reallygreatsite.com"
                  editable={editable}
                  onChange={(val) => onChange('email', val)}
                  style={{ color: textMedium }}
                />
              </div>
            )}
            {(location || editable) && (
              <div className="flex items-center justify-end gap-2">
                <svg className="w-4 h-4" fill="none" stroke={textMedium} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <EditableText
                  value={location}
                  placeholder="123 Anywhere St., Any City"
                  editable={editable}
                  onChange={(val) => onChange('location', val)}
                  style={{ color: textMedium }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Role/Title Section */}
        <div className="mb-6">
          <h3 
            className="text-2xl font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            <EditableText
              value={role || ''}
              placeholder="CONTENT CREATOR"
              editable={editable}
              onChange={(val) => onChange('role', val)}
              style={{ color: textDark }}
            />
          </h3>
          <div className="text-sm leading-relaxed" style={{ color: textMedium }}>
            <EditableText
              value={summary || ''}
              placeholder="Creative and detail-oriented Content Creator with 3+ years of experience producing engaging content for online platforms. Skilled in writing, editing, and content strategy development."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              style={{ color: textMedium }}
              multiline
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-xl font-bold uppercase"
              style={{ color: textDark }}
            >
              EXPERIENCE
            </h3>
            <svg className="w-5 h-5" fill="none" stroke={lightGrey} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.slice(0, 2).map((exp, index) => (
                <div key={index}>
                  <div 
                    className="font-bold mb-1"
                    style={{ color: textDark }}
                  >
                    <EditableText
                      value={exp.title || ''}
                      placeholder="Content Creator"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.title`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm mb-1" style={{ color: textMedium }}>
                    <EditableText
                      value={exp.company || ''}
                      placeholder="Ginyard International Co."
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.company`, val)}
                      style={{ color: textMedium }}
                    />
                    {' '}
                    {formatExperienceDate(exp) && `| ${formatExperienceDate(exp)}`}
                  </div>
                  {(exp.description || editable) && (
                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textMedium }}>
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
                            style={{ color: textMedium }}
                            multiline
                          />
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1" style={{ color: textDark }}>Content Creator</div>
                <div className="text-sm mb-1" style={{ color: textMedium }}>Ginyard International Co. | 2021 - Present</div>
                <ul className="list-disc list-inside text-sm space-y-1" style={{ color: textMedium }}>
                  <li>Responsibility point 1</li>
                  <li>Responsibility point 2</li>
                  <li>Responsibility point 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-xl font-bold uppercase"
              style={{ color: textDark }}
            >
              EDUCATION
            </h3>
            <svg className="w-5 h-5" fill="none" stroke={lightGrey} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
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
                      placeholder="Bachelor's Degree in Communication"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.degree`, val)}
                      style={{ color: textDark }}
                    />
                  </div>
                  <div className="text-sm" style={{ color: textMedium }}>
                    <EditableText
                      value={edu.institution || ''}
                      placeholder="Rimberio University"
                      editable={editable}
                      onChange={(val) => onChange(`education.${index}.institution`, val)}
                      style={{ color: textMedium }}
                    />
                    {edu.year && `, Graduated ${formatEducationYear(edu)}`}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="font-bold mb-1" style={{ color: textDark }}>Bachelor's Degree in Communication</div>
                <div className="text-sm" style={{ color: textMedium }}>Rimberio University, Graduated May 2018</div>
              </div>
            )}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-xl font-bold uppercase"
              style={{ color: textDark }}
            >
              CERTIFICATIONS
            </h3>
            <svg className="w-5 h-5" fill="none" stroke={lightGrey} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div 
            className="w-full h-px mb-3"
            style={{ backgroundColor: textDark }}
          ></div>
          <div>
            <div className="font-bold mb-1" style={{ color: textDark }}>Content Marketing Certification</div>
            <div className="text-sm" style={{ color: textMedium }}>Arowwai Industries, June 2019</div>
          </div>
        </div>
      </div>

      {/* Right Column - White Background */}
      <div className="flex-1 p-8">
        {/* Skills Section */}
        <div className="mb-8">
          <h3 
            className="text-xl font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            SKILLS
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <ul className="space-y-2 text-sm" style={{ color: textDark }}>
            {skills && skills.length > 0 ? (
              skills.slice(0, 10).map((skill, index) => (
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
                <li>Content Writing</li>
                <li>Editing</li>
                <li>SEO Optimization</li>
                <li>Social Media Management</li>
                <li>Video Production</li>
                <li>Graphic Design</li>
              </>
            )}
          </ul>
        </div>

        {/* Portfolio Section */}
        <div className="mb-8">
          <h3 
            className="text-xl font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            PORTFOLIO
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="text-sm mb-2" style={{ color: textDark }}>
            <EditableText
              value={projects[0]?.url || projects[0]?.github || ''}
              placeholder="www.reallygreatsite.com"
              editable={editable}
              onChange={(val) => {
                if (projects[0]) {
                  onChange(`projects.0.url`, val);
                }
              }}
              style={{ color: textDark }}
            />
          </div>
          <div className="text-sm" style={{ color: textMedium }}>
            Links to blog posts, articles, videos, or other content created by the candidate.
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h3 
            className="text-xl font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            PROJECTS
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <div className="space-y-4">
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

        {/* Languages Section */}
        <div>
          <h3 
            className="text-xl font-bold uppercase mb-3"
            style={{ color: textDark }}
          >
            LANGUAGES
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: textDark }}
          ></div>
          <ul className="space-y-2 text-sm" style={{ color: textDark }}>
            {skills && skills.filter(s => ['English', 'Spanish', 'French', 'German'].includes(s.name)).length > 0 ? (
              skills.filter(s => ['English', 'Spanish', 'French', 'German'].includes(s.name)).map((lang, index) => (
                <li key={index}>
                  <EditableText
                    value={lang.name || ''}
                    placeholder="Language"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${skills.indexOf(lang)}.name`, val)}
                    style={{ color: textDark }}
                  />
                  {lang.name === 'English' && ' (Native)'}
                  {lang.name === 'Spanish' && ' (Intermediate)'}
                </li>
              ))
            ) : (
              <>
                <li>English (Native)</li>
                <li>Spanish (Intermediate)</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EstelleDarcyTemplate;

