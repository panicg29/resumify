import { useState, useEffect, useCallback } from 'react';
import resumeApi from '../services/resumeApi';

/**
 * Sort resumes by createdAt (newest first)
 * Uses createdAt primarily, falls back to updatedAt only if createdAt is missing
 */
const sortResumesByDate = (resumesArray) => {
  return [...resumesArray].sort((a, b) => {
    // Prioritize createdAt, only use updatedAt as fallback
    const dateA = new Date(a.createdAt || a.updatedAt || 0);
    const dateB = new Date(b.createdAt || b.updatedAt || 0);
    return dateB - dateA; // Descending order (newest first)
  });
};

/**
 * Custom hook for managing resumes
 * @returns {Object} Resume operations and state
 */
export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all resumes
   */
  const fetchResumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resumeApi.getAllResumes();
      const sortedResumes = sortResumesByDate(data);
      setResumes(sortedResumes);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new resume
   */
  const createResume = async (resumeData) => {
    setLoading(true);
    setError(null);
    try {
      const newResume = await resumeApi.createResume(resumeData);
      // Add new resume and sort to ensure newest-first order
      setResumes((prev) => {
        const updated = [newResume, ...prev];
        return sortResumesByDate(updated);
      });
      return newResume;
    } catch (err) {
      setError(err.message);
      console.error('Failed to create resume:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get resume by ID
   */
  const getResumeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const resume = await resumeApi.getResumeById(id);
      return resume;
    } catch (err) {
      setError(err.message);
      console.error('Failed to get resume:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update resume
   */
  const updateResume = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updatedResume = await resumeApi.updateResume(id, updates);
      // Update resume in place (position stays the same based on createdAt)
      // Only re-sort if needed to maintain order
      setResumes((prev) => {
        const updated = prev.map((resume) => (resume._id === id ? updatedResume : resume));
        // Re-sort to ensure order is maintained (newest first by createdAt)
        return sortResumesByDate(updated);
      });
      return updatedResume;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update resume:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete resume by ID
   * Following guide best practices
   * @param {String} id - Resume ID
   * @returns {Promise<Object>} {success: true/false, name: "...", error: "..."}
   */
  const deleteResume = async (id) => {
    setError(null);
    try {
      // Call API (returns {success: true, data: {deletedId, deletedName}})
      const result = await resumeApi.deleteResume(id);
      
      if (result.success) {
        // Update UI immediately (optimistic update)
        setResumes((prev) => prev.filter((resume) => resume._id !== id));
        
        return { 
          success: true, 
          name: result.data?.deletedName || 'Resume',
          id: result.data?.deletedId 
        };
      }
      
      return { success: false, error: result.message };
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete resume:', err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Fetch resumes on mount
   */
  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return {
    resumes,
    loading,
    error,
    createResume,
    getResumeById,
    updateResume,
    deleteResume,
    refetch: fetchResumes,
  };
};

export default useResumes;

