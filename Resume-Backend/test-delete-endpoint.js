/**
 * DELETE Endpoint Test Script
 * 
 * This script tests the DELETE /api/resumes/:id endpoint
 * Run with: node test-delete-endpoint.js
 */

const mongoose = require('mongoose');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const TEST_RESUME_DATA = {
  name: 'Test User DELETE',
  email: 'test.delete@example.com',
  phone: '+1-555-0000',
  summary: 'This is a test resume for DELETE endpoint testing'
};

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

/**
 * Helper function to make HTTP requests
 */
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  } catch (error) {
    return { error };
  }
}

/**
 * Test 1: Check if server is running
 */
async function testServerHealth() {
  console.log(`\n${colors.blue}Test 1: Checking server health...${colors.reset}`);
  
  const { response, data, error } = await makeRequest(`${BASE_URL}/health`);
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: Server is not running${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    console.log(`   Make sure backend is running on port 5000`);
    return false;
  }
  
  if (response.ok) {
    console.log(`${colors.green}✅ PASS: Server is running${colors.reset}`);
    console.log(`   Database: ${data.database}`);
    return true;
  }
  
  return false;
}

/**
 * Test 2: Create a test resume
 */
async function createTestResume() {
  console.log(`\n${colors.blue}Test 2: Creating test resume...${colors.reset}`);
  
  const { response, data, error } = await makeRequest(`${BASE_URL}/api/resumes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TEST_RESUME_DATA)
  });
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: Could not create test resume${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    return null;
  }
  
  if (response.ok && data.success) {
    const resumeId = data.data.resume._id;
    console.log(`${colors.green}✅ PASS: Test resume created${colors.reset}`);
    console.log(`   Resume ID: ${resumeId}`);
    return resumeId;
  }
  
  console.log(`${colors.red}❌ FAIL: Could not create test resume${colors.reset}`);
  console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
  return null;
}

/**
 * Test 3: DELETE with valid ID
 */
async function testDeleteValid(resumeId) {
  console.log(`\n${colors.blue}Test 3: Testing DELETE with valid ID...${colors.reset}`);
  
  const { response, data, error } = await makeRequest(
    `${BASE_URL}/api/resumes/${resumeId}`,
    { method: 'DELETE' }
  );
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: DELETE request failed${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    console.log(`   ${colors.yellow}This is the issue you're experiencing!${colors.reset}`);
    return false;
  }
  
  if (response.ok && data.success) {
    console.log(`${colors.green}✅ PASS: Resume deleted successfully${colors.reset}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${data.message}`);
    return true;
  }
  
  console.log(`${colors.red}❌ FAIL: DELETE request unsuccessful${colors.reset}`);
  console.log(`   Status: ${response.status}`);
  console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
  return false;
}

/**
 * Test 4: DELETE with invalid ID format
 */
async function testDeleteInvalidFormat() {
  console.log(`\n${colors.blue}Test 4: Testing DELETE with invalid ID format...${colors.reset}`);
  
  const invalidId = '123invalid';
  const { response, data, error } = await makeRequest(
    `${BASE_URL}/api/resumes/${invalidId}`,
    { method: 'DELETE' }
  );
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: Request failed unexpectedly${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (response.status === 400 && !data.success) {
    console.log(`${colors.green}✅ PASS: Invalid ID rejected correctly${colors.reset}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${data.message}`);
    return true;
  }
  
  console.log(`${colors.yellow}⚠️ WARN: Expected 400 status for invalid ID${colors.reset}`);
  console.log(`   Got status: ${response.status}`);
  return false;
}

/**
 * Test 5: DELETE non-existent resume
 */
async function testDeleteNonExistent() {
  console.log(`\n${colors.blue}Test 5: Testing DELETE with non-existent ID...${colors.reset}`);
  
  // Valid format but doesn't exist
  const nonExistentId = '507f1f77bcf86cd799439011';
  const { response, data, error } = await makeRequest(
    `${BASE_URL}/api/resumes/${nonExistentId}`,
    { method: 'DELETE' }
  );
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: Request failed unexpectedly${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (response.status === 404 && !data.success) {
    console.log(`${colors.green}✅ PASS: Non-existent resume handled correctly${colors.reset}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Message: ${data.message}`);
    return true;
  }
  
  console.log(`${colors.yellow}⚠️ WARN: Expected 404 status for non-existent ID${colors.reset}`);
  console.log(`   Got status: ${response.status}`);
  return false;
}

/**
 * Test 6: Verify resume was actually deleted
 */
async function verifyDeletion(resumeId) {
  console.log(`\n${colors.blue}Test 6: Verifying resume was deleted...${colors.reset}`);
  
  const { response, data, error } = await makeRequest(
    `${BASE_URL}/api/resumes/${resumeId}`
  );
  
  if (error) {
    console.log(`${colors.red}❌ FAIL: Could not verify deletion${colors.reset}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (response.status === 404) {
    console.log(`${colors.green}✅ PASS: Resume confirmed deleted${colors.reset}`);
    console.log(`   GET request returns 404 as expected`);
    return true;
  }
  
  console.log(`${colors.red}❌ FAIL: Resume still exists after deletion${colors.reset}`);
  console.log(`   Status: ${response.status}`);
  return false;
}

/**
 * Main test runner
 */
async function runTests() {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${colors.blue}DELETE ENDPOINT TEST SUITE${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
  
  let results = {
    total: 0,
    passed: 0,
    failed: 0
  };
  
  // Test 1: Server health
  const serverUp = await testServerHealth();
  results.total++;
  if (serverUp) results.passed++; else results.failed++;
  
  if (!serverUp) {
    console.log(`\n${colors.red}❌ Cannot continue tests - server is not running${colors.reset}`);
    printResults(results);
    process.exit(1);
  }
  
  // Test 2: Create test resume
  const resumeId = await createTestResume();
  results.total++;
  if (resumeId) results.passed++; else results.failed++;
  
  if (!resumeId) {
    console.log(`\n${colors.red}❌ Cannot continue tests - could not create test resume${colors.reset}`);
    printResults(results);
    process.exit(1);
  }
  
  // Test 3: DELETE with valid ID
  const deleteSuccess = await testDeleteValid(resumeId);
  results.total++;
  if (deleteSuccess) results.passed++; else results.failed++;
  
  if (!deleteSuccess) {
    console.log(`\n${colors.red}❌ CRITICAL: DELETE endpoint is not working!${colors.reset}`);
    console.log(`\n${colors.yellow}Troubleshooting steps:${colors.reset}`);
    console.log('   1. Check if MongoDB is connected');
    console.log('   2. Check backend console for errors');
    console.log('   3. Verify CORS is configured correctly');
    console.log('   4. Check if route is registered: DELETE /api/resumes/:id');
    console.log(`\n   See DELETE_ENDPOINT_TROUBLESHOOTING.md for detailed guide`);
    printResults(results);
    process.exit(1);
  }
  
  // Test 4: Invalid ID format
  const invalidTest = await testDeleteInvalidFormat();
  results.total++;
  if (invalidTest) results.passed++; else results.failed++;
  
  // Test 5: Non-existent ID
  const nonExistentTest = await testDeleteNonExistent();
  results.total++;
  if (nonExistentTest) results.passed++; else results.failed++;
  
  // Test 6: Verify deletion
  const verifyTest = await verifyDeletion(resumeId);
  results.total++;
  if (verifyTest) results.passed++; else results.failed++;
  
  // Print final results
  printResults(results);
  
  if (results.failed === 0) {
    console.log(`\n${colors.green}🎉 All tests passed! DELETE endpoint is working correctly.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠️ Some tests failed. Check the output above for details.${colors.reset}`);
    process.exit(1);
  }
}

/**
 * Print test results summary
 */
function printResults(results) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${colors.blue}TEST RESULTS${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Total Tests: ${results.total}`);
  console.log(`${colors.green}✅ Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${results.failed}${colors.reset}`);
  console.log(`${'='.repeat(60)}`);
}

// Run the tests
runTests().catch(error => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});

