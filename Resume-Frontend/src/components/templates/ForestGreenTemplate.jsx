import React from 'react';
import EditableText from '../EditableText';
import { Phone, Mail, Link as LinkIcon, MapPin, Calendar, Building2 } from 'lucide-react';

const ForestGreenTemplate = ({ formData, editable = false, onChange = () => {} }) => {
  // Destructure matching backend schema
  const {
    name = '', email = '', phone = '', summary = '', education = [], experience = [], skills = [],
    projects = [], location = '', role = '', certifications = [], trainings = [], awards = [],
    languages = [], publications = [], patents = [], volunteerWork = [], professionalMemberships = [],
    conferences = [], speakingEngagements = [], teachingExperience = [], mentoring = [],
    leadershipRoles = [], internships = [], licenses = [], references = [], socialMedia = {},
    hobbies = [], interests = [], openSourceContributions = [], additionalInfo = ''
  } = formData || {};

  // Get additional fields
  const linkedin = socialMedia?.linkedin || formData.linkedin || formData.portfolio || '';
  const achievements = awards || formData.achievements || formData.keyAchievements || [];
  const courses = trainings || formData.courses || [];

  // Dark green color for headings (matching the image)
  const darkGreen = '#1a3d0f';
  // Light green color for accents (matching the image)
  const lightGreen = '#5a7c2a';
  // Light green for decorative shapes (lighter, more subtle)
  const lightGreenShape = '#8fb84a';

  return (
    <div className="w-[21cm] h-[29.7cm] bg-white mx-auto shadow-2xl relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Decorative Wavy Shapes in Top Corners - More organic and abstract */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-25 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <path
            d="M0,80 Q40,40 100,70 T200,60 Q240,30 300,70 L300,0 L0,0 Z"
            fill={lightGreenShape}
          />
          <path
            d="M0,120 Q60,90 120,110 T240,100 Q280,70 300,110 L300,80 L0,80 Z"
            fill={lightGreenShape}
            opacity="0.7"
          />
          <path
            d="M0,160 Q50,130 110,150 T220,140 Q260,110 300,150 L300,120 L0,120 Z"
            fill={lightGreenShape}
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 opacity-25 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <path
            d="M300,80 Q260,40 200,70 T100,60 Q60,30 0,70 L0,0 L300,0 Z"
            fill={lightGreenShape}
          />
          <path
            d="M300,120 Q240,90 180,110 T60,100 Q20,70 0,110 L0,80 L300,80 Z"
            fill={lightGreenShape}
            opacity="0.7"
          />
          <path
            d="M300,160 Q250,130 190,150 T80,140 Q40,110 0,150 L0,120 L300,120 Z"
            fill={lightGreenShape}
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 p-10" style={{ padding: '40px' }}>
        {/* Header Section */}
        <div className="mb-10">
          <h1 
            className="mb-3 font-bold"
            style={{ color: darkGreen, fontSize: '42px', lineHeight: '1.1' }}
          >
            <EditableText
              value={name || 'YOUR NAME'}
              placeholder="YOUR NAME"
              editable={editable}
              onChange={(val) => onChange('name', val)}
              className="font-bold"
            />
          </h1>
          <p 
            className="mb-5"
            style={{ color: lightGreen, fontSize: '18px', fontWeight: '400' }}
          >
            <EditableText
              value={role}
              placeholder="The role you are applying for?"
              editable={editable}
              onChange={(val) => onChange('role', val)}
            />
          </p>
          
          {/* Contact Information */}
          <div className="flex flex-col gap-2.5" style={{ color: darkGreen, fontSize: '13px' }}>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: darkGreen }} />
              <EditableText
                value={phone}
                placeholder="Phone"
                editable={editable}
                onChange={(val) => onChange('phone', val)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" style={{ color: darkGreen }} />
              <EditableText
                value={email}
                placeholder="Email"
                editable={editable}
                onChange={(val) => onChange('email', val)}
              />
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" style={{ color: darkGreen }} />
              <EditableText
                value={linkedin}
                placeholder="LinkedIn/Portfolio"
                editable={editable}
                onChange={(val) => onChange('linkedin', val)}
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: darkGreen }} />
              <EditableText
                value={location}
                placeholder="Location"
                editable={editable}
                onChange={(val) => onChange('location', val)}
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-8 flex">
          <div className="w-1/3 pr-6">
            <h2 
              className="font-bold mb-4"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              SUMMARY
            </h2>
          </div>
          <div className="w-2/3">
            <EditableText
              value={summary}
              placeholder="Briefly explain why you're a great fit for the role - use the AI assistant to tailor this summary for each job posting."
              editable={editable}
              onChange={(val) => onChange('summary', val)}
              className="leading-relaxed text-black"
              style={{ fontSize: '13px', lineHeight: '1.6' }}
              multiline
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8 flex">
          <div className="w-1/3 flex items-start justify-between pr-6">
            <h2 
              className="font-bold"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              EXPERIENCE
            </h2>
            <button 
              className="px-2.5 py-1 rounded bg-gray-200 text-black font-normal hover:bg-gray-300 transition-colors"
              style={{ fontSize: '10px', whiteSpace: 'nowrap', lineHeight: '1.2' }}
            >
              Online Resume Builder
            </button>
          </div>
          <div className="w-2/3">
            {experience && experience.length > 0 ? (
              experience.map((exp, index) => (
                <div key={index} className="mb-7">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2.5">
                      <EditableText
                        value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate || 'Date period'}
                        placeholder="Date period"
                        editable={editable}
                        onChange={(val) => {
                          const dates = val.split(' - ');
                          onChange(`experience.${index}.startDate`, dates[0]);
                          if (dates[1]) onChange(`experience.${index}.endDate`, dates[1]);
                        }}
                        className="text-black"
                        style={{ fontSize: '13px' }}
                      />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4a4a4a' }}></div>
                    </div>
                    <div className="flex-1 ml-5 text-right">
                      <EditableText
                        value={exp.title || 'Title'}
                        placeholder="Title"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.title`, val)}
                        className="font-bold text-black"
                        style={{ fontSize: '13px' }}
                      />
                      <EditableText
                        value={exp.company || 'Company Name'}
                        placeholder="Company Name"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.company`, val)}
                        className="font-bold block mt-1"
                        style={{ color: lightGreen, fontSize: '13px' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <EditableText
                      value={exp.location || 'Location'}
                      placeholder="Location"
                      editable={editable}
                      onChange={(val) => onChange(`experience.${index}.location`, val)}
                      className="text-black"
                      style={{ fontSize: '13px' }}
                    />
                    <div className="flex-1 ml-5 text-right">
                      <EditableText
                        value={exp.description || 'Company Description'}
                        placeholder="Company Description"
                        editable={editable}
                        onChange={(val) => onChange(`experience.${index}.description`, val)}
                        className="text-black mb-2"
                        style={{ fontSize: '13px' }}
                      />
                      <div className="flex items-start gap-2 justify-end">
                        <div className="text-black" style={{ fontSize: '13px' }}>
                          • <EditableText
                            value={exp.achievements || 'Highlight your accomplishments, using numbers if possible.'}
                            placeholder="Highlight your accomplishments, using numbers if possible."
                            editable={editable}
                            onChange={(val) => onChange(`experience.${index}.achievements`, val)}
                            className="inline"
                          />
                        </div>
                        <Building2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#666' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-7">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-black" style={{ fontSize: '13px' }}>Date period</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4a4a4a' }}></div>
                  </div>
                  <div className="flex-1 ml-5 text-right">
                    <span className="font-bold text-black" style={{ fontSize: '13px' }}>Title</span>
                    <span className="font-bold block mt-1" style={{ color: lightGreen, fontSize: '13px' }}>Company Name</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-black" style={{ fontSize: '13px' }}>Location</span>
                  <div className="flex-1 ml-5 text-right">
                    <span className="text-black mb-2 block" style={{ fontSize: '13px' }}>Company Description</span>
                    <div className="flex items-start gap-2 justify-end">
                      <span className="text-black" style={{ fontSize: '13px' }}>• Highlight your accomplishments, using numbers if possible.</span>
                      <Building2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#666' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8 flex">
          <div className="w-1/3 pr-6">
            <h2 
              className="font-bold"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              EDUCATION
            </h2>
          </div>
          <div className="w-2/3">
            {education && education.length > 0 ? (
              education.map((edu, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <EditableText
                        value={edu.year ? String(edu.year) : 'Date period'}
                        placeholder="Date period"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.year`, val)}
                        className="text-black"
                        style={{ fontSize: '13px' }}
                      />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4a4a4a' }}></div>
                    </div>
                    <div className="flex-1 ml-5 text-right">
                      <EditableText
                        value={edu.degree || 'Degree and Field of Study'}
                        placeholder="Degree and Field of Study"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.degree`, val)}
                        className="font-bold text-black"
                        style={{ fontSize: '13px' }}
                      />
                      <EditableText
                        value={edu.institution || 'School or University'}
                        placeholder="School or University"
                        editable={editable}
                        onChange={(val) => onChange(`education.${index}.institution`, val)}
                        className="font-bold block mt-1"
                        style={{ color: lightGreen, fontSize: '13px' }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="text-black" style={{ fontSize: '13px' }}>Date period</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4a4a4a' }}></div>
                  </div>
                  <div className="flex-1 ml-5 text-right">
                    <span className="font-bold text-black" style={{ fontSize: '13px' }}>Degree and Field of Study</span>
                    <span className="font-bold block mt-1" style={{ color: lightGreen, fontSize: '13px' }}>School or University</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 
            className="font-bold mb-4"
            style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
          >
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-6">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="border-b" style={{ borderColor: '#999', paddingBottom: '3px', borderWidth: '1px' }}>
                  <EditableText
                    value={skill.name || 'Your Skill'}
                    placeholder="Your Skill"
                    editable={editable}
                    onChange={(val) => onChange(`skills.${index}.name`, val)}
                    className="text-black"
                    style={{ fontSize: '13px' }}
                  />
              </div>
              ))
            ) : (
              <div className="border-b" style={{ borderColor: '#999', paddingBottom: '3px', borderWidth: '1px' }}>
                <span className="text-black" style={{ fontSize: '13px' }}>Your Skill</span>
              </div>
            )}
        </div>
      </div>

        {/* Key Achievements Section */}
        <div className="mb-8 flex">
          <div className="w-1/3 pr-6">
            <h2 
              className="font-bold"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              KEY ACHIEVEMENTS
            </h2>
          </div>
          <div className="w-2/3">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div key={index} className="mb-4 flex items-start gap-2.5">
                  <svg className="w-3 h-3 mt-1.5 flex-shrink-0" viewBox="0 0 12 12" fill={darkGreen}>
                    <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
                  </svg>
                  <div>
                    <EditableText
                      value={achievement.title || achievement.name || 'Your Achievement'}
                      placeholder="Your Achievement"
                      editable={editable}
                      onChange={(val) => onChange(`achievements.${index}.title`, val)}
                      className="font-bold text-black block mb-1"
                      style={{ fontSize: '13px' }}
                    />
                    <EditableText
                      value={achievement.description || 'Describe what you did and the impact it had.'}
                      placeholder="Describe what you did and the impact it had."
                      editable={editable}
                      onChange={(val) => onChange(`achievements.${index}.description`, val)}
                      className="text-black"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
              </div>
              ))
            ) : (
              <div className="mb-4 flex items-start gap-2.5">
                <svg className="w-3 h-3 mt-1.5 flex-shrink-0" viewBox="0 0 12 12" fill={darkGreen}>
                  <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
                </svg>
                <div>
                  <span className="font-bold text-black block mb-1" style={{ fontSize: '13px' }}>Your Achievement</span>
                  <span className="text-black" style={{ fontSize: '13px' }}>Describe what you did and the impact it had.</span>
                </div>
              </div>
            )}
          </div>
          </div>

        {/* Projects Section */}
        <div className="mb-8 flex">
          <div className="w-1/3 pr-6">
            <h2 
              className="font-bold"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              PROJECTS
            </h2>
          </div>
          <div className="w-2/3">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="mb-5">
                  <EditableText
                    value={project.name || 'Project Name'}
                    placeholder="Project Name"
                    editable={editable}
                    onChange={(val) => onChange(`projects.${index}.name`, val)}
                    className="font-bold text-black block mb-1.5"
                    style={{ fontSize: '13px' }}
                  />
                  <div className="flex items-center gap-4 mb-1.5 text-black" style={{ fontSize: '13px' }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <EditableText
                        value={project.date || project.startDate || 'Date period'}
                        placeholder="Date period"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.date`, val)}
                        className="inline"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <EditableText
                        value={project.location || 'Location'}
                        placeholder="Location"
                        editable={editable}
                        onChange={(val) => onChange(`projects.${index}.location`, val)}
                        className="inline"
                      />
                    </div>
                  </div>
                  <EditableText
                    value={project.description || 'Short summary of your work'}
                    placeholder="Short summary of your work"
                    editable={editable}
                    onChange={(val) => onChange(`projects.${index}.description`, val)}
                    className="text-black mb-1.5 block"
                    style={{ fontSize: '13px' }}
                  />
                  <div className="text-black" style={{ fontSize: '13px' }}>
                    • <EditableText
                      value={project.outcome || 'What was a successful outcome of your work? (e.g. Raised $3,000 for the charity)'}
                      placeholder="What was a successful outcome of your work? (e.g. Raised $3,000 for the charity)"
                      editable={editable}
                      onChange={(val) => onChange(`projects.${index}.outcome`, val)}
                      className="inline"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-5">
                <span className="font-bold text-black block mb-1.5" style={{ fontSize: '13px' }}>Project Name</span>
                <div className="flex items-center gap-4 mb-1.5 text-black" style={{ fontSize: '13px' }}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Date period</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location</span>
                  </div>
                </div>
                <span className="text-black mb-1.5 block" style={{ fontSize: '13px' }}>Short summary of your work</span>
                <span className="text-black" style={{ fontSize: '13px' }}>• What was a successful outcome of your work? (e.g. Raised $3,000 for the charity)</span>
              </div>
            )}
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <h2 
            className="font-bold mb-4"
            style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
          >
            COURSES
          </h2>
          <div className="flex flex-wrap gap-6">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <EditableText
                  key={index}
                  value={course.title || course.name || 'Course Title'}
                  placeholder="Course Title"
                  editable={editable}
                  onChange={(val) => onChange(`courses.${index}.title`, val)}
                  className="font-bold text-black"
                  style={{ fontSize: '13px' }}
                />
              ))
            ) : (
              <span className="font-bold text-black" style={{ fontSize: '13px' }}>Course Title</span>
            )}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-6 flex">
          <div className="w-1/3 pr-6">
            <h2 
              className="font-bold"
              style={{ color: darkGreen, fontSize: '28px', letterSpacing: '0.5px' }}
            >
              INTERESTS
            </h2>
          </div>
          <div className="w-2/3">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <div key={index} className="mb-2.5 flex items-start gap-2.5">
                  <svg className="w-3 h-3 mt-1.5 flex-shrink-0" viewBox="0 0 12 12" fill={darkGreen}>
                    <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
                  </svg>
                  <EditableText
                    value={typeof interest === 'string' ? interest : (interest?.name || interest?.title || 'Career Interest / Passion')}
                    placeholder="Career Interest / Passion"
                    editable={editable}
                    onChange={(val) => onChange(`interests.${index}`, val)}
                    className="font-bold text-black"
                    style={{ fontSize: '13px' }}
                  />
                </div>
              ))
            ) : (
              <div className="mb-2.5 flex items-start gap-2.5">
                <svg className="w-3 h-3 mt-1.5 flex-shrink-0" viewBox="0 0 12 12" fill={darkGreen}>
                  <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
                </svg>
                <span className="font-bold text-black" style={{ fontSize: '13px' }}>Career Interest / Passion</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestGreenTemplate;
