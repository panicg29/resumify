// Compute API base dynamically to avoid localhost/127.0.0.1 mismatches and allow env overrides
let API_ROOT = 'https://resumify-backend-8wol.onrender.com';
let API_BASE_URL = `${API_ROOT}/api/resumes`;
try {
  let env;
  try { env = import.meta.env; } catch (_) { env = undefined; }
  
  // Allow full URL override via environment variable
  if (env && env.VITE_API_BASE_URL) {
    API_ROOT = env.VITE_API_BASE_URL;
  } else if (env && env.VITE_API_HOST) {
    // Support legacy host/port configuration for local development
    const host = env.VITE_API_HOST;
    const port = env.VITE_API_PORT;
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    // Only append port if explicitly provided (for localhost development)
    API_ROOT = port ? `${protocol}://${host}:${port}` : `${protocol}://${host}`;
  }
  
  API_BASE_URL = `${API_ROOT}/api/resumes`;
} catch (_) {
  // ignore and keep default
}

// Export API_ROOT so other files can reuse it
export { API_ROOT };

// Small resilience wrapper: timeout + one retry for transient network hiccups
async function fetchWithResilience(input, init = {}, { timeoutMs = 8000, retries = 1, backoffMs = 400 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(input, { ...init, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      const isLast = attempt === retries;
      const isNetwork = err?.name === 'TypeError' || err?.message === 'Failed to fetch' || err?.name === 'AbortError';
      if (!isNetwork || isLast) throw err;
      await new Promise(r => setTimeout(r, backoffMs * (attempt + 1)));
    }
  }
}

/**
 * Resume API Service
 * Handles all API calls to the backend
 */
const resumeApi = {
  /**
   * Create a new resume
   * @param {Object} resumeData - Resume data matching backend schema
   * @returns {Promise<Object>} Created resume
   */
  createResume: async (resumeData) => {
    try {
      const response = await fetchWithResilience(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      }, { timeoutMs: 10000, retries: 1 });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create resume');
      }

      return result.data.resume;
    } catch (error) {
      console.error('Create resume error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'AbortError' || error.name === 'TypeError') {
        throw new Error('Cannot connect to backend. Please verify server is running and CORS is enabled.');
      }
      throw error;
    }
  },

  /**
   * Get all resumes
   * @returns {Promise<Array>} Array of resumes
   */
  getAllResumes: async () => {
    try {
      const response = await fetchWithResilience(API_BASE_URL, {
        method: 'GET',
        // No Content-Type on GET to avoid unnecessary CORS preflight
      }, { timeoutMs: 8000, retries: 1 });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to fetch resumes');
      }

      const result = await response.json();
      return result.data.resumes;
    } catch (error) {
      console.error('Get all resumes error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check: 1) Backend is running, 2) CORS/OPTIONS enabled, 3) Port/host match');
      }
      throw error;
    }
  },

  /**
   * Get resume by ID
   * @param {String} id - Resume ID
   * @returns {Promise<Object>} Resume object
   */
  getResumeById: async (id) => {
    try {
      const response = await fetchWithResilience(`${API_BASE_URL}/${id}`, {}, { timeoutMs: 8000, retries: 1 });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch resume');
      }

      return result.data.resume;
    } catch (error) {
      console.error('Get resume by ID error:', error);
      throw error;
    }
  },

  /**
   * Get resumes by user ID
   * @param {String} userId - User ID
   * @returns {Promise<Array>} Array of user's resumes
   */
  getResumesByUserId: async (userId) => {
    try {
      const response = await fetchWithResilience(`${API_BASE_URL}/user/${userId}`, {}, { timeoutMs: 8000, retries: 1 });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch user resumes');
      }

      return result.data.resumes;
    } catch (error) {
      console.error('Get resumes by user ID error:', error);
      throw error;
    }
  },

  /**
   * Update resume
   * @param {String} id - Resume ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated resume
   */
  updateResume: async (id, updates) => {
    try {
      const response = await fetchWithResilience(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      }, { timeoutMs: 10000, retries: 1 });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update resume');
      }

      return result.data.resume;
    } catch (error) {
      console.error('Update resume error:', error);
      throw error;
    }
  },

  /**
   * Delete resume by ID
   * Following guide: DELETE {API_ROOT}/api/resumes/:id
   * @param {String} id - Resume ID (24-character MongoDB ObjectId)
   * @returns {Promise<Object>} {success: true/false, message: "...", data: {...}}
   */
  deleteResume: async (id) => {
    try {
      // Step 1: Validate ID format (24 hex characters)
      if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
        throw new Error('Invalid resume ID format. Must be 24 character hex string.');
      }

      // Step 2: Make DELETE request
      const response = await fetchWithResilience(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        // No body and no Content-Type to avoid CORS preflight on DELETE
      }, { timeoutMs: 8000, retries: 1 });

      // Step 3: Parse JSON response
      const data = await response.json();

      // Step 4: Handle different status codes
      if (response.status === 404) {
        throw new Error('Resume not found (already deleted?)');
      }

      if (response.status === 400) {
        throw new Error(data.message || 'Invalid resume ID');
      }

      if (response.status === 500) {
        throw new Error(data.message || 'Server error. Try again later.');
      }

      // Step 5: Check success flag
      if (data.success) {
        console.log('✅ Deleted:', data.data?.deletedName || data.data?.deletedId);
        return data; // Returns {success: true, message: "...", data: {deletedId, deletedName}}
      } else {
        throw new Error(data.message || 'Delete failed');
      }

    } catch (error) {
      console.error('Delete error:', error);
      
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Backend not reachable. Check server status and CORS/OPTIONS.');
      }
      
      // Re-throw other errors
      throw error;
    }
  },

  /**
   * Generate resume from AI prompt
   * @param {String} prompt - Natural language description
   * @param {String} template - Template ID (optional, defaults to 'template1' per API spec)
   * @returns {Promise<Object>} Generated resume
   */
  generateResumeFromPrompt: async (prompt, template = 'template1') => {
    try {
      const API_URL = `${API_ROOT}/api/ai/generate-resume`;
      const response = await fetchWithResilience(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, template }),
      }, { timeoutMs: 30000, retries: 1 });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate resume');
      }

      if (data.success) {
        return data.data.resume;
      } else {
        throw new Error(data.message || 'Failed to generate resume');
      }
    } catch (error) {
      console.error('Generate resume error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },

  /**
   * Fetch resume options for tailoring dropdown.
   * Returns [{ id, label, template, updatedAt }]
   */
  getResumeOptions: async () => {
    try {
      const API_URL = `${API_ROOT}/api/ai/resume-options`;
      const response = await fetchWithResilience(API_URL, {}, { timeoutMs: 10000, retries: 1 });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Failed to load resume options');
      }

      return data.data.options || [];
    } catch (error) {
      console.error('Fetch resume options error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },

  /**
   * Generate a job-tailored resume from an existing base resume plus job data.
   * Backend saves a fresh resume record (base remains unchanged).
   * @param {Object} payload
   * @param {String} payload.resumeId - Existing resume to tailor from
   * @param {String} [payload.jobUrl] - Public job URL to scrape
   * @param {String} [payload.jobDescription] - Manual job description text
   * @param {String} [payload.template] - Resume template identifier
   * @returns {Promise<Object>} API response containing resume + job metadata
   */
  generateJobTailoredResume: async ({ resumeId, jobUrl = '', jobDescription = '', template = 'template1' }) => {
    try {
      if (!resumeId || typeof resumeId !== 'string' || !resumeId.trim()) {
        throw new Error('A base resume selection is required.');
      }

      const trimmedUrl = jobUrl?.trim() ?? '';
      const trimmedDescription = jobDescription?.trim() ?? '';

      if (!trimmedUrl && !trimmedDescription) {
        throw new Error('Provide either a job URL or a job description for tailoring.');
      }

      const requestBody = {
        resumeId: resumeId.trim(),
        template
      };

      if (trimmedUrl) requestBody.jobUrl = trimmedUrl;
      if (trimmedDescription) requestBody.jobDescription = trimmedDescription;

      const API_URL = `${API_ROOT}/api/ai/generate-job-resume`;
      const response = await fetchWithResilience(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }, { timeoutMs: 35000, retries: 1 });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Failed to generate a job-tailored resume');
      }

      return data.data;
    } catch (error) {
      console.error('Generate job-tailored resume error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },

  /**
   * Update resume with AI prompt
   * @param {String} id - Resume ID (MongoDB ObjectId)
   * @param {String} prompt - Natural language description of updates
   * @param {String} template - Optional template identifier to update
   * @returns {Promise<Object>} Updated resume
   */
  updateResumeWithAI: async (id, prompt, template = null) => {
    try {
      // Validate ID format
      if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
        throw new Error('Invalid resume ID format. Must be a valid MongoDB ObjectId.');
      }

      // Validate prompt
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        throw new Error('Prompt is required and must be a non-empty string');
      }

      const requestBody = { prompt: prompt.trim() };
      // Include template if provided
      if (template) {
        requestBody.template = template;
      }

      const API_URL = `${API_ROOT}/api/ai/update-resume/${id}`;
      const response = await fetchWithResilience(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }, { timeoutMs: 30000, retries: 1 });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update resume with AI');
      }

      if (data.success) {
        return data.data.resume;
      } else {
        throw new Error(data.message || 'Failed to update resume with AI');
      }
    } catch (error) {
      console.error('Update resume with AI error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },

  /**
   * Analyze resume with AI
   * @param {String} id - Resume ID (MongoDB ObjectId)
   * @returns {Promise<Object>} Analysis report
   */
  analyzeResume: async (id) => {
    try {
      // Validate ID format
      if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
        throw new Error('Invalid resume ID format. Must be a valid MongoDB ObjectId.');
      }

      const API_URL = `${API_ROOT}/api/ai/analyze-resume/${id}`;
      const response = await fetchWithResilience(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }, { timeoutMs: 30000, retries: 1 });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error status codes
        if (response.status === 400) {
          throw new Error('Invalid resume ID format. Must be a valid MongoDB ObjectId.');
        } else if (response.status === 404) {
          throw new Error('Resume not found');
        } else if (response.status === 500) {
          throw new Error('AI processing failed. Please try again later.');
        }
        throw new Error(data.message || 'Failed to analyze resume');
      }

      if (data.success) {
        return data.data.report;
      } else {
        throw new Error(data.message || 'Failed to analyze resume');
      }
    } catch (error) {
      console.error('Analyze resume error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },

  /**
   * Generate interview prep pack from job data plus optional resume/skills.
   * Always requests exactly 5 questions from the backend.
   * @param {Object} payload
   * @param {String} [payload.jobUrl]
   * @param {String} [payload.jobDescription]
   * @param {String} [payload.resumeId]
   * @param {Array<String>} [payload.skills]
   * @returns {Promise<Object>} API response data
   */
  generateInterviewPrep: async ({ jobUrl = '', jobDescription = '', resumeId = '', skills = [] } = {}) => {
    const trimmedUrl = jobUrl?.trim() ?? '';
    const trimmedDescription = jobDescription?.trim() ?? '';

    if (!trimmedUrl && !trimmedDescription) {
      throw new Error('Provide a job URL or paste the job description.');
    }

    const payload = { questionCount: 5 };
    if (trimmedUrl) payload.jobUrl = trimmedUrl;
    if (trimmedDescription) payload.jobDescription = trimmedDescription;
    if (resumeId && typeof resumeId === 'string' && resumeId.trim()) payload.resumeId = resumeId.trim();

    if (Array.isArray(skills)) {
      const normalizedSkills = skills
        .map(skill => (typeof skill === 'string' ? skill.trim() : ''))
        .filter(Boolean);
      if (normalizedSkills.length) payload.skills = normalizedSkills;
    }

    const API_URL = `${API_ROOT}/api/ai/interview-prep`;

    try {
      const response = await fetchWithResilience(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }, { timeoutMs: 65000, retries: 1 });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Failed to generate interview prep.');
      }

      return data.data;
    } catch (error) {
      console.error('Generate interview prep error:', error);
      if (error.message === 'Failed to fetch' || error.name === 'TypeError' || error.name === 'AbortError') {
        throw new Error('Cannot connect to backend. Please check server status.');
      }
      throw error;
    }
  },
};

export default resumeApi;
