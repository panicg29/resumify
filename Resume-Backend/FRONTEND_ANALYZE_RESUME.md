# Frontend Integration: Analyze Resume & Generate Report

## API Endpoint

**Method:** `GET`  
**URL:** `http://localhost:5000/api/ai/analyze-resume/:id`

Replace `:id` with the resume ID (MongoDB ObjectId).

---

## Request Format

### Headers
```javascript
{
  "Content-Type": "application/json"
}
```

### URL Parameters
- `id` - Resume ID (MongoDB ObjectId, 24 characters)

**No request body required** - it's a GET request.

---

## Response Format

### Success Response (200)
```javascript
{
  "success": true,
  "message": "Resume analysis report generated successfully",
  "data": {
    "resumeId": "507f1f77bcf86cd799439011",
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "model": "gpt-4o-mini",
      "report": {
        "overallScore": 80,
        "overallAssessment": "Strong foundation for a software developer role. Needs more quantifiable achievements and better skills detailing.",
        "keyStrengths": [
          "Strong educational background (high GPA, relevant degree)",
          "Internship experience focused on API design",
          "Solid technical stack across multiple programming languages and frameworks"
        ],
        "keyWeaknesses": [
          "Only one internship (limited experience)",
          "Few measurable achievements in experience section",
          "Missing soft skills and certifications"
        ],
        "highlights": [
          "Improved API response time by 20%",
          "Built a full-stack application as a personal project"
        ],
        "coreSectionScores": {
          "experience": {
            "score": 75,
            "keyInsight": "Relevant but minimal; needs metrics"
          },
          "education": {
            "score": 85,
            "keyInsight": "Excellent academic background"
          },
          "skills": {
            "score": 75,
            "keyInsight": "Broad but missing cloud & soft skills"
          },
          "projects": {
            "score": 70,
            "keyInsight": "Practical, but lacks detail on tech stack"
          },
          "atsOptimization": {
            "score": 70,
            "keyInsight": "Needs more keywords and standard headings"
          }
        },
        "criticalImprovements": [
          "Add quantifiable results (e.g., performance metrics, user impact)",
          "Include cloud technologies (AWS/Azure) and DevOps tools",
          "Add a certifications section for credibility",
          "Explicitly mention soft skills (communication, teamwork, problem-solving)",
          "Reorganize skills by category (Frontend / Backend / Tools)"
        ],
        "missingOrWeakAreas": [
          {
            "area": "Certifications",
            "importance": "high",
            "note": "No professional certifications mentioned"
          },
          {
            "area": "Cloud computing (AWS/Azure)",
            "importance": "high",
            "note": "Important for modern software development roles"
          },
          {
            "area": "Soft skills section",
            "importance": "medium",
            "note": "Missing explicit mention of communication, teamwork, etc."
          },
          {
            "area": "Additional achievements/metrics",
            "importance": "high",
            "note": "Limited use of quantifiable metrics in projects and experience"
          },
          {
            "area": "ATS keyword alignment",
            "importance": "medium",
            "note": "Could benefit from more industry-specific keywords"
          }
        ],
        "finalInsight": "A well-rounded and technically strong resume with good potential for junior or mid-level roles. To reach a professional, recruiter-ready level: add measurable impact, modern cloud skills, and clearer structure."
      }
  }
}
```

### Error Responses

**400 - Invalid Resume ID**
```javascript
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

**404 - Resume Not Found**
```javascript
{
  "success": false,
  "message": "Resume not found"
}
```

**500 - AI Processing Failed**
```javascript
{
  "success": false,
  "message": "Failed to analyze resume with AI",
  "error": "Error details..."
}
```

---

## Frontend Implementation Examples

### React/JavaScript Example

```javascript
const analyzeResume = async (resumeId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/ai/analyze-resume/${resumeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Analysis Report:', data.data.report);
      return data.data.report;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

// Usage
const handleAnalyze = async () => {
  const report = await analyzeResume('507f1f77bcf86cd799439011');
  // Display report in UI
};
```

### React Hook Example

```javascript
import { useState } from 'react';

const useAnalyzeResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const analyzeResume = async (resumeId) => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ai/analyze-resume/${resumeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setReport(data.data.report);
      return data.data.report;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeResume, loading, error, report };
};

// Usage in component
function ResumeAnalyzer({ resumeId }) {
  const { analyzeResume, loading, error, report } = useAnalyzeResume();

  const handleAnalyze = async () => {
    try {
      await analyzeResume(resumeId);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      
      {error && <p className="error">{error}</p>}
      
      {report && (
        <div className="report">
          <h3>Overall Score: {report.summary.overallScore}/100</h3>
          <p>{report.summary.overallAssessment}</p>
          
          <h4>Strengths</h4>
          <ul>
            {report.summary.strengths.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
          
          <h4>What's Missing</h4>
          <ul>
            {report.whatsNotInResume.missingElements.map((item, i) => (
              <li key={i}>
                <strong>{item.element}</strong> ({item.importance}): {item.description}
              </li>
            ))}
          </ul>
          
          {/* Add more report sections as needed */}
        </div>
      )}
    </div>
  );
}
```

### Axios Example

```javascript
import axios from 'axios';

const analyzeResume = async (resumeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/ai/analyze-resume/${resumeId}`
    );

    return response.data.data.report;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};
```

---

## Complete React Component Example

```javascript
import React, { useState } from 'react';

function ResumeAnalyzer({ resumeId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ai/analyze-resume/${resumeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setReport(data.data.report);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer">
      <h2>Resume Analysis</h2>
      
      <button 
        onClick={handleAnalyze} 
        disabled={loading || !resumeId}
        className="analyze-button"
      >
        {loading ? 'Analyzing Resume...' : 'Generate Analysis Report'}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {report && (
        <div className="analysis-report">
          {/* Overall Summary */}
          <section className="summary-section">
            <h3>Overall Score: {report.summary.overallScore}/100</h3>
            <p>{report.summary.overallAssessment}</p>
            
            <div className="strengths-weaknesses">
              <div>
                <h4>Strengths</h4>
                <ul>
                  {report.summary.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4>Areas for Improvement</h4>
                <ul>
                  {report.summary.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* What's In Resume */}
          <section className="whats-in-section">
            <h3>What's In Your Resume</h3>
            
            <div className="section-scores">
              <div>
                <strong>Contact Info:</strong> {report.whatsInResume.contactInfo.score}/100
                <p>{report.whatsInResume.contactInfo.details}</p>
              </div>
              
              <div>
                <strong>Summary:</strong> {report.whatsInResume.summary.score}/100
                <p>{report.whatsInResume.summary.quality}</p>
              </div>
              
              <div>
                <strong>Experience:</strong> {report.whatsInResume.experience.count} positions, 
                {report.whatsInResume.experience.yearsOfExperience} years ({report.whatsInResume.experience.score}/100)
                <p>{report.whatsInResume.experience.analysis}</p>
              </div>
              
              <div>
                <strong>Skills:</strong> {report.whatsInResume.skills.count} skills ({report.whatsInResume.skills.score}/100)
                <p>{report.whatsInResume.skills.analysis}</p>
              </div>
            </div>
          </section>

          {/* What's Missing */}
          <section className="whats-missing-section">
            <h3>What's Missing</h3>
            
            <div className="missing-elements">
              <h4>Missing Elements</h4>
              {report.whatsNotInResume.missingElements.map((item, i) => (
                <div key={i} className={`missing-item ${item.importance}`}>
                  <strong>{item.element}</strong> ({item.importance} priority)
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="missing-skills">
              <h4>Recommended Skills to Add</h4>
              {report.whatsNotInResume.missingSkills.map((skill, i) => (
                <div key={i} className={`skill-recommendation ${skill.importance}`}>
                  <strong>{skill.skill}</strong> ({skill.importance} priority)
                  <p>{skill.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="recommendations-section">
            <h3>Recommendations</h3>
            
            <div className="critical-improvements">
              <h4>Critical Improvements</h4>
              {report.whatsNeeded.criticalImprovements.map((improvement, i) => (
                <div key={i} className="improvement-item">
                  <strong>{improvement.improvement}</strong>
                  <p>Example: {improvement.example}</p>
                </div>
              ))}
            </div>
            
            <div className="skill-recommendations">
              <h4>Skill Recommendations</h4>
              {report.whatsNeeded.skillRecommendations.map((rec, i) => (
                <div key={i} className={`skill-rec ${rec.priority}`}>
                  <strong>{rec.skill}</strong> - {rec.reason}
                </div>
              ))}
            </div>
          </section>

          {/* Skill Set Analysis */}
          <section className="skills-analysis-section">
            <h3>Skill Set Analysis</h3>
            
            <div className="technical-skills">
              <h4>Technical Skills</h4>
              <p>Score: {report.skillSetAnalysis.technicalSkills.score}/100</p>
              <p>{report.skillSetAnalysis.technicalSkills.assessment}</p>
              
              <div>
                <strong>Strong:</strong> {report.skillSetAnalysis.technicalSkills.strong.join(', ')}
              </div>
              <div>
                <strong>Missing:</strong> {report.skillSetAnalysis.technicalSkills.missing.join(', ')}
              </div>
            </div>
            
            <div className="industry-alignment">
              <h4>Industry Alignment</h4>
              <p>Score: {report.skillSetAnalysis.industryAlignment.score}/100</p>
              <p>{report.skillSetAnalysis.industryAlignment.analysis}</p>
            </div>
          </section>

          {/* Detailed Recommendations */}
          <section className="detailed-recommendations">
            <h3>Detailed Recommendations</h3>
            {report.detailedRecommendations.map((category, i) => (
              <div key={i} className="recommendation-category">
                <h4>{category.category}</h4>
                <ul>
                  {category.recommendations.map((rec, j) => (
                    <li key={j}>{rec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ATS Optimization */}
          <section className="ats-section">
            <h3>ATS Optimization</h3>
            <p>Score: {report.atsOptimization.score}/100</p>
            <p>{report.atsOptimization.analysis}</p>
            <ul>
              {report.atsOptimization.suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          </section>

          {/* Score Breakdown */}
          <section className="scores">
            <h3>Score Breakdown</h3>
            <div className="score-breakdown">
              {Object.entries(report.overallScore.breakdown).map(([category, score]) => (
                <div key={category} className="score-item">
                  <strong>{category}:</strong> {score}/100
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
```

---

## Report Structure Overview

The analysis report includes:

1. **Summary**: Overall score, assessment, strengths, weaknesses
2. **What's In Resume**: Detailed analysis of each section (contact, summary, experience, education, skills, projects)
3. **What's Not In Resume**: Missing elements, skills, sections, and gaps
4. **What's Needed**: Critical improvements, recommendations, skill recommendations, content suggestions
5. **Skill Set Analysis**: Technical skills, soft skills, diversity, industry alignment
6. **Detailed Recommendations**: Categorized recommendations (Content, Structure, Keywords)
7. **ATS Optimization**: ATS compatibility score and suggestions
8. **Overall Score**: Total score with breakdown by category

---

## Best Practices

1. **Loading States**: Show loading indicator (analysis takes 3-5 seconds)
2. **Error Handling**: Display user-friendly error messages
3. **Report Display**: Organize report in collapsible sections for better UX
4. **Action Items**: Highlight high-priority recommendations
5. **Visualization**: Consider charts/graphs for scores
6. **Export**: Allow users to export report as PDF

---

## Testing

### Test with cURL
```bash
curl http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011
```

### Test with Postman
1. Method: `GET`
2. URL: `http://localhost:5000/api/ai/analyze-resume/:id`
3. Replace `:id` with actual resume ID
4. Click Send

---

**Ready to integrate!** 🚀

