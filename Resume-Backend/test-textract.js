const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

/**
 * AWS Textract API Test Script
 * 
 * This script demonstrates how to test the AWS Textract endpoint.
 * 
 * Usage:
 * 1. Make sure your server is running: npm start
 * 2. Update TEST_FILE_PATH below to point to your test PDF or image
 * 3. Run: node test-textract.js
 */

// Configuration
const API_URL = 'http://localhost:5000/api/ai/analyze-file';
const TEST_FILE_PATH = './test-file.pdf'; // Change to your test PDF or image file

/**
 * Test AWS Textract endpoint with a file upload
 */
async function testTextractApi() {
  // Check if test file exists
  if (!fs.existsSync(TEST_FILE_PATH)) {
    console.error(`❌ Test file not found at: ${TEST_FILE_PATH}`);
    console.error('Please create a test-file.pdf or test-file.png in the project root.');
    console.error('Or update TEST_FILE_PATH in this script to point to your test file.');
    return;
  }

  console.log(`🚀 Testing AWS Textract API endpoint: ${API_URL}`);
  console.log(`📄 Uploading file: ${TEST_FILE_PATH}`);
  console.log(`📊 File size: ${(fs.statSync(TEST_FILE_PATH).size / 1024).toFixed(2)} KB\n`);

  try {
    // Create form data with file
    const form = new FormData();
    form.append('file', fs.createReadStream(TEST_FILE_PATH));

    // Make POST request
    const response = await axios.post(API_URL, form, {
      headers: {
        ...form.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60000 // 60 seconds timeout (Textract can take time)
    });

    // Handle successful response
    if (response.status === 200 && response.data.success) {
      console.log('✅ API call successful!\n');
      console.log('📋 Response Summary:');
      console.log(`   Method: ${response.data.data.method}`);
      console.log(`   Text Length: ${response.data.data.text.length} characters`);
      console.log(`   Key-Value Pairs: ${response.data.data.keyValuePairs.length}`);
      console.log(`   Tables: ${response.data.data.tables.length}`);
      console.log(`   Pages: ${response.data.data.pageCount}\n`);

      // Display extracted text preview
      if (response.data.data.text) {
        const preview = response.data.data.text.substring(0, 300);
        console.log('📝 Extracted Text Preview:');
        console.log('─'.repeat(50));
        console.log(preview + (response.data.data.text.length > 300 ? '...' : ''));
        console.log('─'.repeat(50) + '\n');
      }

      // Display key-value pairs if any
      if (response.data.data.keyValuePairs.length > 0) {
        console.log('🔑 Key-Value Pairs:');
        response.data.data.keyValuePairs.slice(0, 5).forEach((pair, index) => {
          console.log(`   ${index + 1}. ${pair.key}: ${pair.value}`);
        });
        if (response.data.data.keyValuePairs.length > 5) {
          console.log(`   ... and ${response.data.data.keyValuePairs.length - 5} more\n`);
        } else {
          console.log('');
        }
      }

      // Display tables if any
      if (response.data.data.tables.length > 0) {
        console.log('📊 Tables Detected:');
        response.data.data.tables.forEach((table, tableIndex) => {
          console.log(`   Table ${tableIndex + 1} (Page ${table.page}, ${table.rows.length} rows):`);
          // Show first few rows
          table.rows.slice(0, 3).forEach((row, rowIndex) => {
            console.log(`      Row ${rowIndex + 1}: ${row.cells.join(' | ')}`);
          });
          if (table.rows.length > 3) {
            console.log(`      ... and ${table.rows.length - 3} more rows`);
          }
        });
        console.log('');
      }

      // Save full response to file
      const outputFile = 'textract-response.json';
      fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));
      console.log(`💾 Full response saved to: ${outputFile}`);
    } else {
      console.error('❌ API call returned unsuccessful response');
      console.error('Response:', JSON.stringify(response.data, null, 2));
    }

  } catch (error) {
    console.error('❌ API call failed!');
    
    if (error.response) {
      // Server responded with error status
      console.error(`Status: ${error.response.status}`);
      console.error('Error Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server. Is the server running?');
      console.error('Make sure to start the server with: npm start');
    } else {
      // Error setting up request
      console.error('Error:', error.message);
    }
  }
}

// Run the test
console.log('='.repeat(60));
console.log('AWS Textract API Test Script');
console.log('='.repeat(60));
console.log('');

testTextractApi();

