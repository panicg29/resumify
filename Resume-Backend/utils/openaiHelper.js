const OpenAI = require('openai');

// Initialize OpenAI client with proper error handling
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }
  
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
} catch (error) {
  console.error('OpenAI initialization error:', error);
}

// Configure OpenAI model - can be set via environment variable
// Default to 'gpt-4o-mini' if not specified
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const INTERVIEW_QUESTION_COUNT = 5;

/**
 * Parse resume text using OpenAI GPT-4
 * @param {string} resumeText - The extracted text from the PDF
 * @returns {Object} - Structured resume data
 */
const parseResumeWithAI = async (resumeText) => {
  try {
    // Validate inputs
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return {
        success: false,
        error: 'Invalid or empty resume text provided'
      };
    }

    // Truncate text if too long (OpenAI has token limits)
    const maxTextLength = 8000; // Conservative limit
    const processedText = resumeText.length > maxTextLength 
      ? resumeText.substring(0, maxTextLength) + '\n[Text truncated for processing...]'
      : resumeText;

    const prompt = `
    Parse the following resume text and extract structured information. Return ONLY a valid JSON object with the following structure:

    {
      "name": "Full name of the person",
      "email": "Email address",
      "phone": "Phone number",
      "summary": "Professional summary or objective",
      "education": [
        {
          "degree": "Degree name",
          "institution": "Institution name",
          "year": 2019,
          "gpa": "GPA if mentioned"
        }
      ],
      "experience": [
        {
          "title": "Job title",
          "company": "Company name",
          "startDate": "2020-01-01",
          "endDate": "2023-12-31",
          "current": false,
          "description": "Job description"
        }
      ],
      "skills": [
        {
          "name": "Skill name",
          "level": "Beginner"
        }
      ],
      "projects": [
        {
          "name": "Project name",
          "description": "Project description",
          "technologies": ["Technology1", "Technology2"],
          "url": "Project URL if mentioned",
          "github": "GitHub URL if mentioned"
        }
      ],
      "certifications": [
        {
          "name": "Certification name",
          "issuer": "Issuing organization",
          "date": "2023-01-01",
          "expiryDate": "2026-01-01",
          "credentialId": "Credential ID if mentioned",
          "url": "Certification URL if mentioned"
        }
      ],
      "trainings": [
        {
          "name": "Training or course name",
          "institution": "Training institution",
          "date": "2023-01-01",
          "duration": "40 hours",
          "description": "Training description"
        }
      ],
      "awards": [
        {
          "name": "Award name",
          "organization": "Awarding organization",
          "year": "2023",
          "description": "Award description"
        }
      ],
      "languages": [
        {
          "name": "Language name",
          "proficiency": "Fluent"
        }
      ],
      "publications": [
        {
          "title": "Publication title",
          "authors": "Author names",
          "journal": "Journal or conference name",
          "year": "2023",
          "doi": "DOI if available",
          "url": "URL if available",
          "type": "Journal Article"
        }
      ],
      "patents": [
        {
          "title": "Patent title",
          "patentNumber": "Patent number",
          "issuedDate": "2023-01-01",
          "inventors": "Inventor names",
          "description": "Patent description",
          "url": "URL if available"
        }
      ],
      "volunteerWork": [
        {
          "organization": "Organization name",
          "role": "Volunteer role",
          "startDate": "2023-01-01",
          "endDate": "2023-12-31",
          "current": false,
          "description": "Volunteer work description",
          "hoursPerWeek": "5 hours"
        }
      ],
      "professionalMemberships": [
        {
          "organization": "Organization name",
          "role": "Member role",
          "startDate": "2023-01-01",
          "endDate": "",
          "current": true,
          "description": "Membership description"
        }
      ],
      "conferences": [
        {
          "name": "Conference name",
          "location": "City, Country",
          "date": "2023-06-15",
          "type": "Presented",
          "description": "Conference description"
        }
      ],
      "speakingEngagements": [
        {
          "title": "Talk title",
          "event": "Event name",
          "location": "Location",
          "date": "2023-05-10",
          "description": "Talk description",
          "url": "URL if available"
        }
      ],
      "teachingExperience": [
        {
          "course": "Course name",
          "institution": "Institution name",
          "startDate": "2023-01-01",
          "endDate": "2023-05-31",
          "current": false,
          "description": "Teaching description",
          "level": "Undergraduate"
        }
      ],
      "mentoring": [
        {
          "menteeName": "Mentee name (optional)",
          "organization": "Organization name",
          "startDate": "2023-01-01",
          "endDate": "",
          "current": true,
          "description": "Mentoring description",
          "focus": "Career development"
        }
      ],
      "leadershipRoles": [
        {
          "title": "Leadership title",
          "organization": "Organization name",
          "startDate": "2023-01-01",
          "endDate": "",
          "current": true,
          "description": "Leadership description"
        }
      ],
      "internships": [
        {
          "title": "Internship title",
          "company": "Company name",
          "startDate": "2023-06-01",
          "endDate": "2023-08-31",
          "description": "Internship description"
        }
      ],
      "licenses": [
        {
          "name": "License name",
          "issuingOrganization": "Issuing organization",
          "licenseNumber": "License number",
          "issueDate": "2023-01-01",
          "expiryDate": "2026-01-01",
          "state": "State if applicable"
        }
      ],
      "references": [
        {
          "name": "Reference name",
          "title": "Job title",
          "company": "Company name",
          "email": "email@example.com",
          "phone": "+1-555-000-0000",
          "relationship": "Former Manager"
        }
      ],
      "socialMedia": {
        "linkedin": "LinkedIn profile URL",
        "github": "GitHub profile URL",
        "twitter": "Twitter profile URL",
        "portfolio": "Portfolio website URL",
        "website": "Personal website URL",
        "blog": "Blog URL",
        "behance": "Behance profile URL",
        "dribbble": "Dribbble profile URL",
        "medium": "Medium profile URL",
        "stackoverflow": "Stack Overflow profile URL"
      },
      "hobbies": ["Hobby 1", "Hobby 2"],
      "interests": ["Interest 1", "Interest 2"],
      "openSourceContributions": [
        {
          "project": "Project name",
          "url": "Project URL",
          "description": "Contribution description",
          "contributions": "What you contributed"
        }
      ],
      "additionalInfo": "Any other relevant information that doesn't fit into structured fields",
      "location": "City, State/Country",
      "role": "Current or desired role/title"
    }

    CRITICAL EXTRACTION RULES:
    1. Return ONLY the JSON object, no additional text or markdown formatting
    2. Extract EVERY piece of information from the resume - DO NOT skip any data
    3. If data doesn't fit into a specific field, use the most appropriate field or add to "additionalInfo"
    4. Use null for missing endDate in experience if current job
    5. Set current: true for ongoing positions, memberships, volunteer work, etc.
    6. Use skill levels: "Beginner", "Intermediate", "Advanced", "Expert"
    7. If information is not available, use empty string "" or empty array []
    8. For dates, use YYYY-MM-DD format (use January 1st if only year available)
    9. Extract technologies from project descriptions
    10. Ensure all required fields are present even if empty
    11. If the text is garbled or unclear, make your best guess based on available information
    12. Look for name patterns at the beginning of the text
    13. Look for email patterns anywhere in the text (user@domain.com format)
    14. If no clear name is found, use "Unknown" as the name
    15. If no email is found, use "unknown@example.com" as the email
    16. If no summary is provided, create one based on the job title and experience mentioned
    17. Ensure summary is never empty - create a professional summary from available information
    
    COMPREHENSIVE DATA EXTRACTION:
    18. Extract ALL certifications, professional trainings, courses, and certificates mentioned
    19. Extract ALL awards, honors, recognitions, and achievements mentioned
    20. Extract ALL languages with their proficiency levels (use: "Basic", "Conversational", "Intermediate", "Fluent", "Native", "Professional")
    21. Extract ALL research papers, publications, articles, blog posts, books, theses, dissertations
    22. Extract ALL patents, inventions, and intellectual property
    23. Extract ALL volunteer work, community service, and pro bono activities
    24. Extract ALL professional memberships, associations, societies, and organizations
    25. Extract ALL conference attendance, presentations, workshops, seminars, webinars
    26. Extract ALL speaking engagements, talks, keynotes, panels, interviews
    27. Extract ALL teaching experience, courses taught, guest lectures, tutoring
    28. Extract ALL mentoring activities, coaching, advising
    29. Extract ALL leadership roles, board positions, committee memberships
    30. Extract ALL internships, co-ops, apprenticeships
    31. Extract ALL professional licenses, permits, registrations
    32. Extract ALL references with contact information if provided
    33. Extract ALL social media profiles (LinkedIn, GitHub, Twitter, portfolio, website, blog, etc.)
    34. Extract ALL hobbies, interests, and personal activities
    35. Extract ALL open source contributions, GitHub projects, code repositories
    36. Extract location/address information
    37. Extract current or desired role/title
    
    SECTION RECOGNITION:
    38. Look for sections with various titles: "Publications", "Research", "Papers", "Articles", "Patents", "Volunteer", "Community Service", "Memberships", "Associations", "Conferences", "Presentations", "Speaking", "Teaching", "Mentoring", "Leadership", "Internships", "Licenses", "References", "Contact", "Links", "Social Media", "Hobbies", "Interests", "Open Source", "Contributions", "Additional", "Other", "Miscellaneous", etc.
    39. If only year is available for dates, use YYYY-01-01 format
    40. For publications, identify type: "Journal Article", "Conference Paper", "Book Chapter", "Book", "Blog Post", "Article", "Research Paper", "Thesis", "Dissertation", or "Other"
    41. For conferences, identify type: "Attended", "Presented", "Keynote", "Workshop", "Panel", "Poster", or "Other"
    42. For teaching, identify level: "Undergraduate", "Graduate", "Professional", "Workshop", "Seminar", or "Other"
    
    HANDLING UNSTRUCTURED DATA:
    43. If you encounter information that doesn't clearly fit into any structured field, try to categorize it appropriately
    44. For ambiguous entries, use the most relevant field (e.g., "Professional Development" could be trainings or certifications)
    45. If information is clearly relevant but doesn't fit any field, add it to "additionalInfo" field
    46. DO NOT discard any information - always find a place for it in the structured format
    47. If multiple fields could apply, choose the most specific one (e.g., prefer "publications" over "additionalInfo" for research papers)
    48. Extract all URLs, links, and contact information you find
    49. Extract all dates, even if approximate
    50. Preserve all details - better to have too much information than too little

    Resume text:
    ${processedText}
    `;

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert resume parser. Extract information and return only valid JSON. Do not include any markdown formatting, code blocks, or additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();
    console.log('OpenAI response received:', responseText.substring(0, 200) + '...');
    
    // Clean the response text (remove markdown formatting if present)
    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }
    
    // Parse the JSON response
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    // Validate required fields
    if (!parsedData.name && !parsedData.email) {
      return {
        success: false,
        error: 'AI response missing required fields (name or email)'
      };
    }

    // Ensure arrays exist
    parsedData.education = parsedData.education || [];
    parsedData.experience = parsedData.experience || [];
    parsedData.skills = parsedData.skills || [];
    parsedData.projects = parsedData.projects || [];
    
    return {
      success: true,
      data: parsedData
    };

  } catch (error) {
    console.error('OpenAI parsing error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return {
        success: false,
        error: 'OpenAI API quota exceeded. Please check your billing.'
      };
    }
    
    if (error.code === 'invalid_api_key') {
      return {
        success: false,
        error: 'Invalid OpenAI API key. Please check your configuration.'
      };
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return {
        success: false,
        error: 'OpenAI API rate limit exceeded. Please try again later.'
      };
    }
    
    if (error.name === 'TimeoutError') {
      return {
        success: false,
        error: 'OpenAI API request timed out. Please try again.'
      };
    }
    
    return {
      success: false,
      error: `Failed to parse resume with AI: ${error.message}`
    };
  }
};

/**
 * Generate a job-tailored resume using job details + an existing resume profile
 * @param {Object} params
 * @param {Object} params.jobDetails
 * @param {Object} params.baseResume
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
const generateJobTailoredResume = async ({ jobDetails = {}, baseResume = {} }) => {
  try {
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!jobDetails.fullDescription || typeof jobDetails.fullDescription !== 'string') {
      return {
        success: false,
        error: 'Job description is required to tailor the resume'
      };
    }

    if (!baseResume || typeof baseResume !== 'object' || !Object.keys(baseResume).length) {
      return {
        success: false,
        error: 'A base resume is required to personalize the tailored resume'
      };
    }

    const safeStringify = (payload, limit = 6000) => {
      try {
        const str = JSON.stringify(payload, null, 2);
        return str.length > limit ? `${str.slice(0, limit)}...` : str;
      } catch (error) {
        return '';
      }
    };

    const truncatedJobDetails = {
      ...jobDetails,
      fullDescription: jobDetails.fullDescription.slice(0, 6000)
    };

    const sanitizeResume = (resume = {}) => {
      const {
        _id,
        __v,
        createdAt,
        updatedAt,
        ...rest
      } = resume;
      return rest;
    };

    const sanitizedProfile = sanitizeResume(baseResume);
    sanitizedProfile.education = sanitizedProfile.education || [];
    sanitizedProfile.experience = sanitizedProfile.experience || [];
    sanitizedProfile.skills = sanitizedProfile.skills || [];
    sanitizedProfile.projects = sanitizedProfile.projects || [];

    const fallbackContact = {
      name: sanitizedProfile.name || 'Candidate Name',
      email: sanitizedProfile.email || 'candidate@example.com',
      phone: sanitizedProfile.phone || '+00000000000'
    };

    const systemPrompt = `
You are a veteran recruiter and ATS expert. Customize EVERY section of the candidate's resume (summary, experience, education, skills, projects, accomplishments, notable metrics) so it perfectly aligns with the target job post while remaining truthful to their background.

Return ONLY valid JSON with the structure:
{
  "name": "string (if missing fall back to provided profile)",
  "email": "string",
  "phone": "string",
  "summary": "2-3 sentence summary tailored to the job",
  "education": [...],
  "experience": [...],
  "skills": [...],
  "projects": [...],
  "template": "template1"
}

Rules:
1. Tailor every section (summary, experience, education, skills, projects) to the job's title, responsibilities, and requirements.
2. Preserve factual accuracy from the candidate profile (companies, roles, degrees, technologies used) but rewrite bullets and descriptions to spotlight the duties and keywords emphasized in the job post.
3. You may introduce new achievements/projects only if they are logical extensions of the candidate's background; otherwise refactor existing entries to demonstrate fit.
4. Mirror the language, KPIs, seniority, and priorities of the job description so the resume reads as a hand-crafted submission for that role.
5. Keep experience entries concise (1-3 sentences) with quantifiable impact where possible, and ensure dates remain chronological with current roles marked appropriately.
6. Include at least one education entry and 8-12 targeted skills that combine the candidate's strongest capabilities with the job's required stack/tools.
7. Highlight relevant projects (internal or external) that reinforce the posting's responsibilities.
8. Return JSON only -- no markdown, no commentary.
`;

    const userPrompt = `
Target Job Details:
${safeStringify(truncatedJobDetails)}

Candidate Profile (from our database):
${safeStringify(sanitizedProfile)}

Instructions:
- Rewrite every section of this candidate's resume so it clearly proves they are ideal for the job described above.
- Infuse the job's title, responsibilities, and requirements into the summary, experience bullets, skills, projects, and accomplishments.
- If information is missing (e.g., project details), infer realistic enhancements based on the candidate's background to better align with the job (but do not invent unrelated employers/roles).
- Ensure the final resume reads like it was written by a recruiter advocating for the candidate specifically for this job.
`;

    console.log('Generating job-tailored resume with OpenAI...');
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.35,
      max_tokens: 3200
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();
    console.log('AI tailored resume response received');

    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse job-tailored resume JSON:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    if (!parsed || typeof parsed !== 'object') {
      return {
        success: false,
        error: 'AI response did not contain a valid resume object'
      };
    }

    const normalized = {
      ...fallbackContact,
      ...parsed
    };

    normalized.education = normalized.education || [];
    normalized.experience = normalized.experience || [];
    normalized.skills = normalized.skills || [];
    normalized.projects = normalized.projects || [];
    normalized.template = normalized.template || 'template1';

    return {
      success: true,
      data: normalized
    };
  } catch (error) {
    console.error('Job tailored resume generation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate tailored resume'
    };
  }
};

/**
 * Generate resume from natural language prompt using OpenAI GPT-4
 * @param {string} prompt - Natural language description about the user
 * @returns {Object} - Structured resume data
 */
const generateResumeFromPrompt = async (prompt) => {
  try {
    // Validate inputs
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return {
        success: false,
        error: 'Invalid or empty prompt provided'
      };
    }

    // Truncate prompt if too long (OpenAI has token limits)
    const maxPromptLength = 3000; // Conservative limit for natural language
    const processedPrompt = prompt.length > maxPromptLength 
      ? prompt.substring(0, maxPromptLength) + '\n[Prompt truncated for processing...]'
      : prompt;

    const systemPrompt = `
    You are an expert resume generator. Based on natural language descriptions provided by users, 
    create a well-structured, professional resume in JSON format. Organize the information logically, 
    fill in reasonable defaults where needed, and ensure the resume is complete and professional.

    Return ONLY a valid JSON object with the following structure:

    {
      "name": "Full name of the person",
      "email": "Email address",
      "phone": "Phone number",
      "summary": "Professional summary or objective (2-4 sentences)",
      "education": [
        {
          "degree": "Degree name",
          "institution": "Institution name",
          "year": 2019,
          "gpa": "GPA if mentioned or reasonable default"
        }
      ],
      "experience": [
        {
          "title": "Job title",
          "company": "Company name",
          "startDate": "2020-01-01",
          "endDate": "2023-12-31",
          "current": false,
          "description": "Job description (2-3 bullet points worth)"
        }
      ],
      "skills": [
        {
          "name": "Skill name",
          "level": "Beginner" | "Intermediate" | "Advanced" | "Expert"
        }
      ],
      "projects": [
        {
          "name": "Project name",
          "description": "Project description",
          "technologies": ["Technology1", "Technology2"],
          "url": "Project URL if mentioned",
          "github": "GitHub URL if mentioned"
        }
      ]
    }

    IMPORTANT RULES:
    1. Return ONLY the JSON object, no additional text or markdown formatting
    2. Extract all relevant information from the prompt
    3. If name is not provided, ask user to provide it or use a placeholder
    4. If email is not provided, generate a placeholder like "user@email.com" 
    5. If phone is not provided, use format like "+1-555-000-0000" as placeholder
    6. Create a professional summary based on experience, skills, and goals mentioned
    7. Use null for endDate in experience if it's a current job
    8. Set current: true for ongoing positions
    9. Use skill levels: "Beginner", "Intermediate", "Advanced", "Expert"
    10. For dates, use YYYY-MM-DD format (use January 1st if only year available)
    11. Ensure all required fields are present (name, email, phone, summary are required)
    12. If information is missing, make reasonable professional assumptions
    13. Organize education chronologically (most recent first)
    14. Organize experience chronologically (most recent first)
    15. Extract technologies mentioned in the prompt for skills and projects
    16. Create at least 2-3 relevant projects if projects are mentioned
    17. Make the resume comprehensive and professional
    18. If user mentions specific years or dates, use them accurately
    19. If no specific dates mentioned, use reasonable defaults (e.g., recent years)
    20. Ensure summary is never empty - create a compelling professional summary
    `;

    const userPrompt = `
    Generate a professional resume based on the following information:

    ${processedPrompt}

    Please organize all the information into a complete, professional resume structure.
    If any details are missing, use professional defaults but indicate clearly what needs to be updated.
    `;

    console.log('Generating resume from prompt with OpenAI...');
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.3, // Slightly higher for creativity, but still structured
      max_tokens: 2500 // More tokens for generating complete resumes
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();
    console.log('OpenAI response received:', responseText.substring(0, 200) + '...');
    
    // Clean the response text (remove markdown formatting if present)
    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }
    
    // Parse the JSON response
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    // Validate required fields
    if (!parsedData.name || !parsedData.email || !parsedData.phone || !parsedData.summary) {
      return {
        success: false,
        error: 'AI response missing required fields (name, email, phone, or summary)'
      };
    }

    // Ensure arrays exist
    parsedData.education = parsedData.education || [];
    parsedData.experience = parsedData.experience || [];
    parsedData.skills = parsedData.skills || [];
    parsedData.projects = parsedData.projects || [];

    // Ensure dates are in correct format for experience
    if (parsedData.experience && parsedData.experience.length > 0) {
      parsedData.experience = parsedData.experience.map(exp => {
        if (exp.startDate && typeof exp.startDate === 'string') {
          // Ensure date is in YYYY-MM-DD format
          if (!exp.startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // Try to parse and reformat
            const date = new Date(exp.startDate);
            if (!isNaN(date.getTime())) {
              exp.startDate = date.toISOString().split('T')[0];
            }
          }
        }
        if (exp.endDate && typeof exp.endDate === 'string' && exp.endDate !== 'null') {
          if (!exp.endDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const date = new Date(exp.endDate);
            if (!isNaN(date.getTime())) {
              exp.endDate = date.toISOString().split('T')[0];
            }
          }
        } else if (exp.current === true || exp.endDate === 'null' || !exp.endDate) {
          exp.endDate = null;
          exp.current = true;
        }
        return exp;
      });
    }
    
    return {
      success: true,
      data: parsedData
    };

  } catch (error) {
    console.error('OpenAI resume generation error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return {
        success: false,
        error: 'OpenAI API quota exceeded. Please check your billing.'
      };
    }
    
    if (error.code === 'invalid_api_key') {
      return {
        success: false,
        error: 'Invalid OpenAI API key. Please check your configuration.'
      };
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return {
        success: false,
        error: 'OpenAI API rate limit exceeded. Please try again later.'
      };
    }
    
    if (error.name === 'TimeoutError') {
      return {
        success: false,
        error: 'OpenAI API request timed out. Please try again.'
      };
    }
    
    return {
      success: false,
      error: `Failed to generate resume with AI: ${error.message}`
    };
  }
};

/**
 * Update resume fields based on natural language prompt using OpenAI GPT-4
 * @param {Object} currentResume - The current resume data
 * @param {string} prompt - Natural language description of what to change
 * @returns {Object} - Updated resume fields (only changed fields)
 */
const updateResumeFromPrompt = async (currentResume, prompt) => {
  try {
    // Validate inputs
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!currentResume || typeof currentResume !== 'object') {
      return {
        success: false,
        error: 'Current resume data is required'
      };
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return {
        success: false,
        error: 'Invalid or empty prompt provided'
      };
    }

    // Truncate prompt if too long
    const maxPromptLength = 2000;
    const processedPrompt = prompt.length > maxPromptLength 
      ? prompt.substring(0, maxPromptLength) + '\n[Prompt truncated for processing...]'
      : prompt;

    // Convert resume to JSON string for AI
    const resumeJson = JSON.stringify(currentResume, null, 2);

    const systemPrompt = `
    You are an expert resume editor. A user wants to update their existing resume based on a natural language request.
    
    You will receive:
    1. The current resume data in JSON format
    2. A natural language prompt describing what changes the user wants
    
    Your task:
    - Analyze the user's request carefully
    - Update ONLY the fields that need to be changed based on the prompt
    - Keep all other fields EXACTLY as they are in the current resume
    - Return ONLY the fields that should be updated (partial update)
    - If adding to arrays (experience, education, skills, projects), include the entire updated array
    - If modifying specific items in arrays, update the entire array with the changes
    
    Return ONLY a valid JSON object with ONLY the fields that need to be updated. 
    If a field doesn't need to be changed, DO NOT include it in the response.
    
    Structure (only include fields that need updating):
    {
      "name": "Updated name (only if name should change)",
      "email": "Updated email (only if email should change)",
      "phone": "Updated phone (only if phone should change)",
      "summary": "Updated summary (only if summary should change)",
      "education": [ /* entire updated education array, only if education changes */ ],
      "experience": [ /* entire updated experience array, only if experience changes */ ],
      "skills": [ /* entire updated skills array, only if skills change */ ],
      "projects": [ /* entire updated projects array, only if projects change */ ]
    }

    IMPORTANT RULES:
    1. Return ONLY the JSON object, no additional text or markdown formatting
    2. Only include fields that the user explicitly wants to change
    3. If user says "add X", include that item in the appropriate array
    4. If user says "remove X", return the array without that item
    5. If user says "update X to Y", return the field with the new value
    6. Preserve all existing data that isn't mentioned in the prompt
    7. Maintain the same structure and format as the original resume
    8. For dates, use YYYY-MM-DD format
    9. Keep skill levels as: "Beginner", "Intermediate", "Advanced", "Expert"
    10. Ensure arrays are properly formatted with all required fields
    `;

    const userPrompt = `
    Current Resume Data:
    ${resumeJson}
    
    User's Update Request:
    ${processedPrompt}
    
    Based on the user's request, return ONLY the JSON object with fields that need to be updated.
    `;

    console.log('Updating resume from prompt with OpenAI...');
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.2, // Low temperature for precise updates
      max_tokens: 2000
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();
    console.log('OpenAI response received:', responseText.substring(0, 200) + '...');
    
    // Clean the response text (remove markdown formatting if present)
    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }
    
    // Parse the JSON response
    let updateData;
    try {
      updateData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    // Ensure updateData is an object
    if (!updateData || typeof updateData !== 'object') {
      return {
        success: false,
        error: 'AI response is not a valid JSON object'
      };
    }
    
    return {
      success: true,
      data: updateData
    };

  } catch (error) {
    console.error('OpenAI resume update error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return {
        success: false,
        error: 'OpenAI API quota exceeded. Please check your billing.'
      };
    }
    
    if (error.code === 'invalid_api_key') {
      return {
        success: false,
        error: 'Invalid OpenAI API key. Please check your configuration.'
      };
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return {
        success: false,
        error: 'OpenAI API rate limit exceeded. Please try again later.'
      };
    }
    
    if (error.name === 'TimeoutError') {
      return {
        success: false,
        error: 'OpenAI API request timed out. Please try again.'
      };
    }
    
    return {
      success: false,
      error: `Failed to update resume with AI: ${error.message}`
    };
  }
};

/**
 * Analyze resume and generate detailed report using OpenAI GPT-4
 * @param {Object} resume - The resume data to analyze
 * @returns {Object} - Detailed analysis report
 */
const analyzeResumeReport = async (resume) => {
  try {
    // Validate inputs
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!resume || typeof resume !== 'object') {
      return {
        success: false,
        error: 'Resume data is required'
      };
    }

    // Convert resume to JSON string for AI
    const resumeJson = JSON.stringify(resume, null, 2);

    const systemPrompt = `
    You are an expert resume analyst. Analyze the provided resume and generate a concise, high-value report.
    
    Focus on actionable insights and keep it brief. Return ONLY a valid JSON object with this structure:
    {
      "overallScore": 80,
      "overallAssessment": "Brief 2-3 sentence assessment of resume quality and fit for role",
      "keyStrengths": [
        "Strength 1 (be specific)",
        "Strength 2",
        "Strength 3"
      ],
      "keyWeaknesses": [
        "Weakness 1 (be specific)",
        "Weakness 2",
        "Weakness 3"
      ],
      "highlights": [
        "Notable achievement or highlight 1",
        "Notable achievement or highlight 2"
      ],
      "coreSectionScores": {
        "experience": {
          "score": 75,
          "keyInsight": "Brief one-sentence insight about experience section"
        },
        "education": {
          "score": 85,
          "keyInsight": "Brief one-sentence insight about education section"
        },
        "skills": {
          "score": 75,
          "keyInsight": "Brief one-sentence insight about skills section"
        },
        "projects": {
          "score": 70,
          "keyInsight": "Brief one-sentence insight about projects section"
        },
        "atsOptimization": {
          "score": 70,
          "keyInsight": "Brief one-sentence insight about ATS compatibility"
        }
      },
      "criticalImprovements": [
        "High-priority improvement 1 (be specific and actionable)",
        "High-priority improvement 2",
        "High-priority improvement 3",
        "High-priority improvement 4",
        "High-priority improvement 5"
      ],
      "missingOrWeakAreas": [
        {
          "area": "Certifications",
          "importance": "high",
          "note": "Brief explanation why it's important"
        },
        {
          "area": "Cloud computing (AWS/Azure)",
          "importance": "high",
          "note": "Brief explanation why it's important"
        },
        {
          "area": "Soft skills section",
          "importance": "medium",
          "note": "Brief explanation"
        },
        {
          "area": "Additional achievements/metrics",
          "importance": "high",
          "note": "Brief explanation"
        },
        {
          "area": "ATS keyword alignment",
          "importance": "medium",
          "note": "Brief explanation"
        }
      ],
      "finalInsight": "2-3 sentence summary with overall assessment and key next steps to reach professional, recruiter-ready level"
    }

    IMPORTANT RULES:
    1. Return ONLY the JSON object, no markdown formatting
    2. Keep all text concise and actionable
    3. Scores should be 0-100
    4. Focus on high-value insights only
    5. Be specific in strengths/weaknesses (mention actual content from resume)
    6. Critical improvements should be actionable and prioritized
    7. Missing areas should only include high/medium importance items
    8. Final insight should be practical and forward-looking
    9. Limit to 3-5 items per array (most important only)
    10. Key insights should be one sentence each
    `;

    const userPrompt = `
    Analyze the following resume and generate a concise, high-value analysis report:
    
    ${resumeJson}
    
    Focus on the most important insights: overall score, key strengths/weaknesses, section scores, critical improvements, and missing areas.
    Keep it brief and actionable - remove less important details.
    `;

    console.log('Analyzing resume with OpenAI for detailed report...');
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent analysis
      max_tokens: 3000 // More tokens for comprehensive report
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();
    console.log('OpenAI analysis response received:', responseText.substring(0, 200) + '...');
    
    // Clean the response text (remove markdown formatting if present)
    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }
    
    // Parse the JSON response
    let analysisReport;
    try {
      analysisReport = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    // Validate that we have a report structure
    if (!analysisReport || typeof analysisReport !== 'object') {
      return {
        success: false,
        error: 'AI response is not a valid report object'
      };
    }
    
    return {
      success: true,
      data: analysisReport
    };

  } catch (error) {
    console.error('Resume analysis error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze resume'
    };
  }
};

const buildInterviewScoringTemplate = () => ({
  strong: 'Provides specific example with metrics and clear ownership.',
  average: 'Shares a relevant example with some detail but limited metrics.',
  redFlag: 'Vague, lacks ownership, or cannot describe outcomes.'
});

const buildFallbackInterviewQuestions = ({
  desiredCount,
  startIndex = 1,
  jobSummary,
  candidateSummary
}) => {
  const skills = jobSummary.skills || [];
  const primarySkill = skills[0] || 'the primary skill for this role';
  const secondarySkill = skills[1] || primarySkill;
  const responsibility = (jobSummary.responsibilities || [])[0] || 'a core responsibility from the posting';
  const requirement = (jobSummary.requirements || [])[0] || secondarySkill;
  const experienceSample = (candidateSummary.notableExperience || [])[0] || {};
  const projectSample = (candidateSummary.projects || [])[0] || {};
  const roleTitle = jobSummary.title || 'this role';

  const templates = [
    {
      type: 'technical',
      difficulty: 'medium',
      question: `Walk me through how you've applied ${primarySkill} to deliver a result that mattered to ${jobSummary.company || 'a team'} in the past.`,
      whyAsked: `Confirms hands-on depth with ${primarySkill} against the role's impact expectations.`,
      targets: [primarySkill, responsibility].filter(Boolean),
      modelAnswer: 'Describe the situation, the choices you made, and the measurable outcome while naming the tooling you used.',
      followUp: 'What trade-offs did you manage and what would you improve next time?'
    },
    {
      type: 'situational',
      difficulty: 'medium',
      question: `If you had to strengthen ${requirement} for ${roleTitle}, how would you design and sequence the work?`,
      whyAsked: `Tests structured thinking and decision-making for a key requirement (${requirement}).`,
      targets: [requirement, secondarySkill].filter(Boolean),
      modelAnswer: 'Outline discovery, prioritization, design, and delivery steps while mentioning risks and validation points.',
      followUp: 'What signals would tell you to pivot from your initial plan?'
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: `Tell me about a time you partnered with stakeholders to deliver ${responsibility}. How did you handle disagreements?`,
      whyAsked: 'Surfaces collaboration style and conflict management on a responsibility tied to the role.',
      targets: [responsibility, 'cross-functional collaboration'].filter(Boolean),
      modelAnswer: 'Walk through the context, how you aligned expectations, resolved friction, and the final outcome.',
      followUp: 'How did you keep stakeholders informed as the work progressed?'
    },
    {
      type: 'resume',
      difficulty: 'medium',
      question: experienceSample.company
        ? `In your role at ${experienceSample.company}, what was a challenging deliverable and how did you measure success?`
        : `Pick a recent project you are proud of. What made it successful and how did you measure impact?`,
      whyAsked: 'Connects past accomplishments to the role and probes for measurable impact.',
      targets: [experienceSample.title || projectSample.name || responsibility].filter(Boolean),
      modelAnswer: 'Share the goal, your contribution, the metrics you moved, and what you would refine now.',
      followUp: 'What feedback did you receive from leads or stakeholders?'
    },
    {
      type: 'culture',
      difficulty: 'easy',
      question: `How do you keep your ${primarySkill} knowledge sharp and ensure it aligns with ${jobSummary.company || 'the team'} goals?`,
      whyAsked: 'Checks growth mindset and alignment with team outcomes.',
      targets: [primarySkill, 'continuous improvement'].filter(Boolean),
      modelAnswer: 'Mention learning habits, recent improvements, and how you tie learning to team priorities.',
      followUp: 'What topic are you actively leveling up on right now?'
    }
  ];

  return templates
    .slice(0, Math.max(0, desiredCount))
    .map((template, index) => {
      const targets = template.targets || [];
      const keywords = template.keywordsToHit && template.keywordsToHit.length ? template.keywordsToHit : targets;
      return {
        id: `Q${startIndex + index}`,
        type: template.type,
        difficulty: template.difficulty || 'medium',
        question: template.question,
        whyAsked: template.whyAsked,
        targets,
        modelAnswer: template.modelAnswer,
        followUp: template.followUp,
        scoring: { ...buildInterviewScoringTemplate(), ...template.scoring },
        keywordsToHit: keywords.filter(Boolean)
      };
    });
};

/**
 * Generate interview prep questions, answers, and rationales using job + resume context
 * @param {Object} params
 * @param {Object} params.jobDetails - Parsed job details (title, company, responsibilities, requirements, skills, fullDescription)
 * @param {Object} [params.resumeProfile] - Candidate resume/profile data
 * @param {Array<string>} [params.userSkills] - Extra skills provided by the user
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
const generateInterviewPrep = async ({
  jobDetails,
  resumeProfile = {},
  userSkills = []
}) => {
  try {
    if (!openai) {
      return {
        success: false,
        error: 'OpenAI client not initialized. Check OPENAI_API_KEY environment variable.'
      };
    }

    if (!jobDetails || typeof jobDetails !== 'object' || !jobDetails.fullDescription) {
      return {
        success: false,
        error: 'Job details with a fullDescription are required'
      };
    }

    const truncate = (str = '', limit = 6000) =>
      typeof str === 'string' && str.length > limit ? `${str.slice(0, limit)}...` : str;

    const sanitizeSkills = (skills = []) =>
      (skills || [])
        .filter(Boolean)
        .map(skill => (typeof skill === 'string' ? skill.trim() : ''))
        .filter(Boolean)
        .slice(0, 20);

    const cleanedUserSkills = sanitizeSkills(userSkills);
    const combinedSkills = Array.from(
      new Set([
        ...(jobDetails.skills || []),
        ...(resumeProfile.skills || []).map(s => (s && s.name ? s.name : '')).filter(Boolean),
        ...cleanedUserSkills
      ])
    ).filter(Boolean);

    const safeJson = (payload, limit = 6000) => {
      try {
        const json = JSON.stringify(payload, null, 2);
        return json.length > limit ? `${json.slice(0, limit)}...` : json;
      } catch (error) {
        return '';
      }
    };

    const targetQuestionCount = INTERVIEW_QUESTION_COUNT;

    const jobSummary = {
      title: jobDetails.title || '',
      company: jobDetails.company || '',
      location: jobDetails.location || '',
      experienceLevel: jobDetails.experienceLevel || '',
      responsibilities: jobDetails.responsibilities || [],
      requirements: jobDetails.requirements || [],
      skills: combinedSkills.slice(0, 20),
      sourceType: jobDetails.sourceType || 'text'
    };

    const candidateSummary = {
      name: resumeProfile.name || 'Candidate',
      headline: resumeProfile.summary || '',
      topSkills: sanitizeSkills((resumeProfile.skills || []).map(s => (s && s.name) || '')),
      notableExperience: (resumeProfile.experience || []).slice(0, 3).map(exp => ({
        title: exp.title,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current
      })),
      projects: (resumeProfile.projects || []).slice(0, 2).map(proj => ({
        name: proj.name,
        technologies: proj.technologies || []
      }))
    };

    const systemPrompt = `
You are an elite technical interviewer and career coach. Given a job posting and candidate profile, produce a set of interview questions that feel handcrafted for this role.
- Tailor every question to the job's responsibilities, required skills, and seniority.
- Include a short "whyAsked" explaining the intent of each question.
- Provide concise, high-quality model answers that demonstrate depth and clarity.
- Keep language crisp and recruiter-friendly. Return JSON only.
`;

    const userPrompt = `
Job Details:
${safeJson({ ...jobSummary, fullDescription: truncate(jobDetails.fullDescription, 5500) })}

Candidate Profile:
${safeJson(candidateSummary)}

User-supplied skills to emphasize:
${JSON.stringify(cleanedUserSkills)}

Instructions:
- Produce ${targetQuestionCount} questions mixing technical, behavioral, system/design (if relevant), and resume-specific items.
- Target the stack, tools, and responsibilities from the job description.
- Questions should be short and clear.
- Model answers should be 3-6 sentences or bullet equivalents, grounded in the candidate profile where possible.
- Add a brief followUp that a recruiter could ask next.
- Include scoring cues (what a strong vs. red-flag answer looks like) to guide interviewers.
- Return ONLY valid JSON, no markdown.

Response JSON shape:
{
  "jobContext": {
    "title": "string",
    "company": "string",
    "location": "string",
    "experienceLevel": "string",
    "skillsFocus": ["list of primary skills/keywords"]
  },
  "candidateContext": {
    "name": "string",
    "headline": "string",
    "strengths": ["top strengths based on resume/skills"],
    "gaps": ["possible gaps or risk areas to probe"]
  },
  "questions": [
    {
      "id": "Q1",
      "type": "technical|behavioral|situational|culture|resume",
      "difficulty": "easy|medium|hard",
      "question": "The interview question text",
      "whyAsked": "Reason this matters for this role",
      "targets": ["skills or requirements this probes"],
      "modelAnswer": "Concise, strong answer",
      "followUp": "Smart follow-up question",
      "scoring": {
        "strong": "What great sounds like",
        "average": "What okay sounds like",
        "redFlag": "What risky sounds like"
      },
      "keywordsToHit": ["important keywords to mention"]
    }
  ],
  "prepNotes": [
    "2-4 concise prep tips for the candidate aligned to the job"
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt.trim() },
        { role: "user", content: userPrompt.trim() }
      ],
      temperature: 0.35,
      max_tokens: 3200
    });

    if (!completion.choices || completion.choices.length === 0) {
      return {
        success: false,
        error: 'No response received from OpenAI'
      };
    }

    const responseText = completion.choices[0].message.content.trim();

    let cleanedResponse = responseText;
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?/g, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse interview prep JSON:', parseError);
      console.error('Raw response:', responseText);
      return {
        success: false,
        error: 'Failed to parse AI response as valid JSON'
      };
    }

    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.questions)) {
      return {
        success: false,
        error: 'AI response missing expected interview question set'
      };
    }

    const parsedQuestions = Array.isArray(parsed.questions) ? parsed.questions.filter(Boolean) : [];
    const trimmedQuestions = parsedQuestions.slice(0, targetQuestionCount);
    const fallbackQuestions =
      trimmedQuestions.length < targetQuestionCount
        ? buildFallbackInterviewQuestions({
            desiredCount: targetQuestionCount - trimmedQuestions.length,
            startIndex: trimmedQuestions.length + 1,
            jobSummary,
            candidateSummary
          })
        : [];
    const normalizedQuestions = [...trimmedQuestions, ...fallbackQuestions].slice(0, targetQuestionCount);

    return {
      success: true,
      data: {
        jobContext: parsed.jobContext || jobSummary,
        candidateContext: parsed.candidateContext || candidateSummary,
        questions: normalizedQuestions,
        prepNotes: parsed.prepNotes || []
      }
    };
  } catch (error) {
    console.error('Interview prep generation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate interview preparation set'
    };
  }
};

module.exports = {
  parseResumeWithAI,
  generateJobTailoredResume,
  generateResumeFromPrompt,
  updateResumeFromPrompt,
  analyzeResumeReport,
  generateInterviewPrep,
  OPENAI_MODEL
};
