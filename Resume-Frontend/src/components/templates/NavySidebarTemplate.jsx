import React from 'react';

const levelPercent = level => {
  if (!level) return 60;
  const normalized = level.toLowerCase();
  if (normalized.includes('expert')) return 98;
  if (normalized.includes('advanced')) return 85;
  if (normalized.includes('intermediate')) return 70;
  if (normalized.includes('beginner')) return 40;
  return 60;
};

const levelLabel = level => {
  if (!level) return 'Good';
  const normalized = level.toLowerCase();
  if (normalized.includes('expert')) return 'Excellent';
  if (normalized.includes('advanced')) return 'Very Good';
  if (normalized.includes('intermediate')) return 'Good';
  if (normalized.includes('beginner')) return 'Basic';
  return 'Good';
};

const bulletize = text => {
  if (!text) return [];
  return text
    .split(/\n|•/g)
    .map(item => item.trim())
    .filter(Boolean);
};

const formatRange = (start, end, current) => {
  const startText = start || '';
  const endText = current ? 'Present' : end || '';
  return [startText, endText].filter(Boolean).join(' - ');
};

const NavySidebarTemplate = ({ formData = {} }) => {
  const {
    name = '',
    email = '',
    phone = '',
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = []
  } = formData;

  const title =
    formData.title ||
    formData.role ||
    formData.headline ||
    (experience?.[0]?.title || 'Professional Title');
  const address = formData.location || formData.address || formData.city || '';
  const linkedin = formData.linkedin || formData.portfolio || '';
  const website = formData.website || formData.url || '';

  const skillList = skills.filter(skill => skill?.name).slice(0, 8);
  const softwareList = skills.filter(skill => skill?.name).slice(0, 6);
  const languageList = (formData.languages && formData.languages.length
    ? formData.languages
    : skills.slice(6, 9)
  ).filter(lang => lang);

  const educationList = education.filter(
    edu => edu?.degree || edu?.institution || edu?.year
  );
  const experienceList = experience.filter(exp => exp?.title || exp?.company);

  const interests = formData.interests || [];
  const certifications = formData.certifications || formData.certs || [];

  return (
    <div
      className="w-[21cm] min-h-[29.7cm] bg-white mx-auto shadow-2xl flex"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="w-[32%] bg-[#003b7a] text-white p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight break-words">{name || 'Your Name'}</h1>
          <p className="text-lg text-white/90">{title}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide uppercase">Personal Info</h2>
          <div className="space-y-3 text-sm">
            {address && (
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-white/80">{address}</p>
              </div>
            )}
            {phone && (
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-white/80">{phone}</p>
              </div>
            )}
            {email && (
              <div>
                <p className="font-semibold">E-mail</p>
                <p className="text-white/80 break-words">{email}</p>
              </div>
            )}
            {linkedin && (
              <div>
                <p className="font-semibold">LinkedIn</p>
                <p className="text-white/80 break-words">{linkedin}</p>
              </div>
            )}
            {!linkedin && website && (
              <div>
                <p className="font-semibold">Portfolio</p>
                <p className="text-white/80 break-words">{website}</p>
              </div>
            )}
          </div>
        </div>

        {skillList.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-wide uppercase">Skills</h2>
            <ul className="space-y-2 text-sm">
              {skillList.map((skill, idx) => (
                <li key={skill.name + idx} className="flex items-start gap-2">
                  <span className="mt-1 block w-1 h-1 rounded-full bg-white" />
                  <span className="text-white/90">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {softwareList.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-wide uppercase">Software</h2>
            <div className="space-y-3">
              {softwareList.map((soft, idx) => (
                <div key={soft.name + idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>{soft.name}</span>
                    <span>{levelLabel(soft.level)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-white"
                      style={{ width: `${levelPercent(soft.level)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languageList.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-wide uppercase">Languages</h2>
            <div className="space-y-3">
              {languageList.map((lang, idx) => {
                const item = typeof lang === 'string' ? { name: lang, level: 'Intermediate' } : lang;
                return (
                  <div key={item.name + idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{item.name}</span>
                      <span>{levelLabel(item.level)}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${levelPercent(item.level)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-10 space-y-8 text-gray-900">
        {summary && (
          <p className="text-sm leading-relaxed">
            {summary}
          </p>
        )}

        {experienceList.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#003b7a]">Experience</h2>
            <div className="space-y-6">
              {experienceList.map((exp, idx) => (
                <div key={`${exp.title}-${idx}`} className="grid grid-cols-[110px,1fr] gap-4">
                  <div className="text-xs text-gray-600">
                    {formatRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                    {exp.company && <p className="italic text-sm text-gray-700">{exp.company}</p>}
                    {bulletize(exp.description).length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {bulletize(exp.description).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {educationList.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#003b7a]">Education</h2>
            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div key={`${edu.degree}-${idx}`} className="grid grid-cols-[110px,1fr] gap-4">
                  <div className="text-xs text-gray-600">{edu.year || edu.graduationYear || ''}</div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    {edu.details && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {bulletize(edu.details).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#003b7a]">Certifications</h2>
            <ul className="space-y-2 text-sm text-gray-800">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="block w-1 h-1 rounded-full bg-[#003b7a] mt-2" />
                  <span>{typeof cert === 'string' ? cert : cert.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#003b7a]">Projects</h2>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <div key={`${project.name}-${idx}`} className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-gray-700">{project.description}</p>
                  )}
                  {project.technologies?.length ? (
                    <p className="text-xs text-gray-600">
                      Tech: {project.technologies.join(', ')}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {interests.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#003b7a]">Interests</h2>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {interests.map((interest, idx) => (
                <li key={idx}>{interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavySidebarTemplate;
