const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true
  },
  education: [{
    degree: {
      type: String,
      required: false,
      trim: true
    },
    institution: {
      type: String,
      required: false,
      trim: true
    },
    year: {
      type: Number,
      required: false
    },
    gpa: {
      type: String,
      trim: true
    }
  }],
  experience: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    company: {
      type: String,
      required: false,
      trim: true
    },
    startDate: {
      type: Date,
      required: false
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: false,
      trim: true
    }
  }],
  skills: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    }
  }],
  projects: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }],
    url: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    }
  }],
  certifications: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    issuer: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    expiryDate: {
      type: String,
      trim: true
    },
    credentialId: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    }
  }],
  trainings: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    institution: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  awards: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    organization: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  languages: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    proficiency: {
      type: String,
      trim: true,
      enum: ['Basic', 'Conversational', 'Intermediate', 'Fluent', 'Native', 'Professional'],
      default: 'Intermediate'
    }
  }],
  publications: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    authors: {
      type: String,
      trim: true
    },
    journal: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    },
    doi: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true,
      enum: ['Journal Article', 'Conference Paper', 'Book Chapter', 'Book', 'Blog Post', 'Article', 'Research Paper', 'Thesis', 'Dissertation', 'Other'],
      default: 'Journal Article'
    }
  }],
  patents: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    patentNumber: {
      type: String,
      trim: true
    },
    issuedDate: {
      type: String,
      trim: true
    },
    inventors: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    }
  }],
  volunteerWork: [{
    organization: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    hoursPerWeek: {
      type: String,
      trim: true
    }
  }],
  professionalMemberships: [{
    organization: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    }
  }],
  conferences: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true,
      enum: ['Attended', 'Presented', 'Keynote', 'Workshop', 'Panel', 'Poster', 'Other'],
      default: 'Attended'
    },
    description: {
      type: String,
      trim: true
    }
  }],
  speakingEngagements: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    event: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    }
  }],
  teachingExperience: [{
    course: {
      type: String,
      required: false,
      trim: true
    },
    institution: {
      type: String,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    level: {
      type: String,
      trim: true,
      enum: ['Undergraduate', 'Graduate', 'Professional', 'Workshop', 'Seminar', 'Other'],
      default: 'Undergraduate'
    }
  }],
  mentoring: [{
    menteeName: {
      type: String,
      trim: true
    },
    organization: {
      type: String,
      required: false,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    focus: {
      type: String,
      trim: true
    }
  }],
  leadershipRoles: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    organization: {
      type: String,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    }
  }],
  internships: [{
    title: {
      type: String,
      required: false,
      trim: true
    },
    company: {
      type: String,
      required: false,
      trim: true
    },
    startDate: {
      type: String,
      trim: true
    },
    endDate: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  licenses: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    issuingOrganization: {
      type: String,
      trim: true
    },
    licenseNumber: {
      type: String,
      trim: true
    },
    issueDate: {
      type: String,
      trim: true
    },
    expiryDate: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    }
  }],
  references: [{
    name: {
      type: String,
      required: false,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    }
  }],
  socialMedia: {
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    blog: {
      type: String,
      trim: true
    },
    behance: {
      type: String,
      trim: true
    },
    dribbble: {
      type: String,
      trim: true
    },
    medium: {
      type: String,
      trim: true
    },
    stackoverflow: {
      type: String,
      trim: true
    }
  },
  hobbies: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  openSourceContributions: [{
    project: {
      type: String,
      required: false,
      trim: true
    },
    url: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    contributions: {
      type: String,
      trim: true
    }
  }],
  additionalInfo: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  template: {
    type: String,
    trim: true,
    default: 'template1'
  }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ userId: 1 });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
