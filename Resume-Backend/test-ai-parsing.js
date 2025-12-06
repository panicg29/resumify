/**
 * Test script for AI Resume Parsing
 * Run this with: node test-ai-parsing.js
 */

const { parseResumeWithAI } = require('./utils/openaiHelper');

const testResumeText = `
John Doe
Software Developer
john.doe@example.com
+1-555-0123

SUMMARY
Experienced software developer with 5+ years of experience in full-stack development. 
Skilled in React, Node.js, and MongoDB. Passionate about building scalable web applications.

EDUCATION
Bachelor of Computer Science
Massachusetts Institute of Technology
Graduated: 2019
GPA: 3.8

EXPERIENCE
Senior Software Developer
Tech Corp Inc.
January 2020 - December 2023
- Led development of web applications using React and Node.js
- Collaborated with cross-functional teams to deliver high-quality software
- Mentored junior developers

Software Developer
StartupXYZ
June 2019 - December 2019
- Built responsive web interfaces using HTML, CSS, and JavaScript
- Implemented RESTful APIs using Express.js

SKILLS
JavaScript (Expert)
React (Advanced)
Node.js (Advanced)
MongoDB (Intermediate)
Python (Beginner)

PROJECTS
E-commerce Platform
Built a full-stack e-commerce application using React, Node.js, and MongoDB.
Technologies: React, Node.js, MongoDB, Express.js
GitHub: https://github.com/johndoe/ecommerce
URL: https://ecommerce-demo.example.com

Task Management App
Created a collaborative project management tool with real-time updates.
Technologies: Vue.js, Socket.io, PostgreSQL
GitHub: https://github.com/johndoe/taskmanager
`;

async function testAIParsing() {
  console.log('🤖 Testing AI Resume Parsing...\n');
  
  try {
    const result = await parseResumeWithAI(testResumeText);
    
    if (result.success) {
      console.log('✅ AI Parsing Successful!');
      console.log('📊 Parsed Data:');
      console.log(JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ AI Parsing Failed!');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.log('💥 Test Error:', error.message);
  }
}

// Run the test
testAIParsing();
