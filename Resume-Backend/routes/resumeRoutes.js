const express = require('express');
const {
  createResume,
  getAllResumes,
  getResumesByUserId,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

const router = express.Router();

// @route   POST /api/resumes
// @desc    Create a new resume
// @access  Public
router.post('/', createResume);

// @route   GET /api/resumes
// @desc    Get all resumes
// @access  Public
router.get('/', getAllResumes);

// @route   GET /api/resumes/user/:userId
// @desc    Get all resumes for a specific user
// @access  Public
router.get('/user/:userId', getResumesByUserId);

// @route   GET /api/resumes/:id
// @desc    Get resume by ID
// @access  Public
router.get('/:id', getResumeById);

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Public
router.put('/:id', updateResume);

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Public
router.delete('/:id', deleteResume);

module.exports = router;
