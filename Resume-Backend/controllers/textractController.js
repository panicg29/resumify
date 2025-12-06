const fs = require('fs');
const path = require('path');
const { awsClient } = require('../utils/awsClient');

/**
 * AWS Textract Controller
 * 
 * Handles document processing using AWS Textract API.
 * Supports:
 * - PDFs and images (PNG, JPEG, TIFF)
 * - Text extraction
 * - Form data extraction (key-value pairs)
 * - Table extraction
 * - Multi-page documents
 */

/**
 * Detect file type (PDF or image)
 * @param {string} filePath - Path to the file
 * @returns {Object} File type information
 */
function detectFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const imageTypes = ['.png', '.jpg', '.jpeg', '.tiff', '.tif'];
  const pdfTypes = ['.pdf'];

  if (pdfTypes.includes(ext)) {
    return {
      type: 'pdf',
      extension: ext,
      isImage: false,
      isPdf: true,
      mimeType: 'application/pdf'
    };
  } else if (imageTypes.includes(ext)) {
    return {
      type: 'image',
      extension: ext,
      isImage: true,
      isPdf: false,
      mimeType: `image/${ext.slice(1)}`
    };
  } else {
    return {
      type: 'unknown',
      extension: ext,
      isImage: false,
      isPdf: false,
      mimeType: 'application/octet-stream'
    };
  }
}

/**
 * Extract text from document using AWS Textract detectDocumentText
 * Best for simple text extraction
 * @param {Buffer} documentBuffer - Document file buffer
 * @returns {Promise<Object>} Extracted text and metadata
 */
async function detectDocumentText(documentBuffer) {
  const textract = awsClient.getTextractClient();

  const params = {
    Document: {
      Bytes: documentBuffer
    }
  };

  try {
    console.log('📄 Calling AWS Textract detectDocumentText...');
    const result = await textract.detectDocumentText(params).promise();

    // Extract text from blocks
    const textBlocks = result.Blocks.filter(block => block.BlockType === 'LINE');
    const extractedText = textBlocks.map(block => block.Text).join('\n');

    return {
      text: extractedText,
      blocks: result.Blocks,
      pageCount: Math.max(...result.Blocks.map(b => b.Page || 1))
    };
  } catch (error) {
    console.error('❌ AWS Textract detectDocumentText error:', error.message);
    // Preserve error code for proper error handling
    if (error.code) {
      error.code = error.code;
    }
    throw error;
  }
}

/**
 * Analyze document using AWS Textract analyzeDocument
 * Best for forms and tables (structured data)
 * @param {Buffer} documentBuffer - Document file buffer
 * @returns {Promise<Object>} Extracted forms, tables, and text
 */
async function analyzeDocument(documentBuffer) {
  const textract = awsClient.getTextractClient();

  const params = {
    Document: {
      Bytes: documentBuffer
    },
    FeatureTypes: ['FORMS', 'TABLES'] // Extract forms and tables
  };

  try {
    console.log('📊 Calling AWS Textract analyzeDocument...');
    const result = await textract.analyzeDocument(params).promise();

    // Extract different types of data
    const blocks = result.Blocks || [];
    
    // Extract text lines
    const textBlocks = blocks.filter(block => block.BlockType === 'LINE');
    const extractedText = textBlocks.map(block => block.Text).join('\n');

    // Extract key-value pairs (forms)
    const keyValuePairs = extractKeyValuePairs(blocks);

    // Extract tables
    const tables = extractTables(blocks);

    return {
      text: extractedText,
      keyValuePairs: keyValuePairs,
      tables: tables,
      blocks: blocks,
      pageCount: Math.max(...blocks.map(b => b.Page || 1))
    };
  } catch (error) {
    console.error('❌ AWS Textract analyzeDocument error:', error.message);
    // Preserve error code for proper error handling
    if (error.code) {
      error.code = error.code;
    }
    throw error;
  }
}

/**
 * Extract key-value pairs from Textract blocks (for forms)
 * @param {Array} blocks - Textract blocks
 * @returns {Array} Array of key-value pairs
 */
function extractKeyValuePairs(blocks) {
  const keyValuePairs = [];
  const keyValueMap = new Map();

  // Find KEY_VALUE_SET blocks
  const keyValueSets = blocks.filter(block => block.BlockType === 'KEY_VALUE_SET');
  
  keyValueSets.forEach(block => {
    if (block.EntityTypes && block.EntityTypes.includes('KEY')) {
      // This is a key
      const keyText = getTextFromBlock(block, blocks);
      keyValueMap.set(block.Id, { key: keyText, value: null });
    } else if (block.EntityTypes && block.EntityTypes.includes('VALUE')) {
      // This is a value - find associated key
      const valueText = getTextFromBlock(block, blocks);
      const relationships = block.Relationships || [];
      
      relationships.forEach(rel => {
        if (rel.Type === 'CHILD') {
          rel.Ids.forEach(id => {
            if (keyValueMap.has(id)) {
              keyValueMap.get(id).value = valueText;
            }
          });
        } else if (rel.Type === 'VALUE') {
          rel.Ids.forEach(keyId => {
            if (keyValueMap.has(keyId)) {
              keyValueMap.get(keyId).value = valueText;
            } else {
              keyValuePairs.push({ key: 'Unknown', value: valueText });
            }
          });
        }
      });
    }
  });

  // Convert map to array and filter out incomplete pairs
  keyValueMap.forEach((pair, id) => {
    if (pair.value !== null) {
      keyValuePairs.push(pair);
    }
  });

  return keyValuePairs;
}

/**
 * Extract tables from Textract blocks
 * @param {Array} blocks - Textract blocks
 * @returns {Array} Array of tables with cells
 */
function extractTables(blocks) {
  const tables = [];
  const tableBlocks = blocks.filter(block => block.BlockType === 'TABLE');

  tableBlocks.forEach(tableBlock => {
    const table = {
      id: tableBlock.Id,
      page: tableBlock.Page || 1,
      rows: []
    };

    // Get cells for this table
    const relationships = tableBlock.Relationships || [];
    const cellIds = [];
    
    relationships.forEach(rel => {
      if (rel.Type === 'CHILD') {
        cellIds.push(...rel.Ids);
      }
    });

    // Group cells by row
    const cells = blocks.filter(block => 
      block.BlockType === 'CELL' && cellIds.includes(block.Id)
    );

    // Organize cells into rows
    const rowMap = new Map();
    cells.forEach(cell => {
      const rowIndex = cell.RowIndex || 0;
      if (!rowMap.has(rowIndex)) {
        rowMap.set(rowIndex, []);
      }
      rowMap.get(rowIndex).push({
        columnIndex: cell.ColumnIndex || 0,
        text: getTextFromBlock(cell, blocks),
        isHeader: cell.EntityTypes && cell.EntityTypes.includes('COLUMN_HEADER')
      });
    });

    // Convert to array of rows
    const sortedRows = Array.from(rowMap.entries()).sort((a, b) => a[0] - b[0]);
    sortedRows.forEach(([rowIndex, cells]) => {
      cells.sort((a, b) => a.columnIndex - b.columnIndex);
      table.rows.push({
        rowIndex: rowIndex,
        cells: cells.map(c => c.text)
      });
    });

    tables.push(table);
  });

  return tables;
}

/**
 * Get text content from a block by following relationships
 * @param {Object} block - Textract block
 * @param {Array} allBlocks - All blocks from response
 * @returns {string} Extracted text
 */
function getTextFromBlock(block, allBlocks) {
  if (block.Text) {
    return block.Text;
  }

  // Follow relationships to find text
  const relationships = block.Relationships || [];
  const textParts = [];

  relationships.forEach(rel => {
    if (rel.Type === 'CHILD') {
      rel.Ids.forEach(id => {
        const childBlock = allBlocks.find(b => b.Id === id);
        if (childBlock && childBlock.Text) {
          textParts.push(childBlock.Text);
        }
      });
    }
  });

  return textParts.join(' ');
}

/**
 * Process document with AWS Textract
 * Automatically chooses the best method (analyzeDocument for forms/tables, detectDocumentText for simple text)
 * @param {string} filePath - Path to the document file
 * @param {boolean} preferAnalysis - If true, prefer analyzeDocument (for forms/tables). Default: true
 * @returns {Promise<Object>} Complete extraction results
 */
async function processDocument(filePath, preferAnalysis = true) {
  if (!awsClient.isAvailable()) {
    throw new Error('AWS Textract is not configured. Please set AWS credentials.');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Detect file type
  const fileType = detectFileType(filePath);
  if (fileType.type === 'unknown') {
    throw new Error(`Unsupported file type: ${fileType.extension}`);
  }

  // Read file as buffer
  const documentBuffer = fs.readFileSync(filePath);
  console.log(`📄 Processing ${fileType.type.toUpperCase()} file: ${path.basename(filePath)} (${(documentBuffer.length / 1024).toFixed(2)} KB)`);

  const results = {
    fileInfo: {
      fileName: path.basename(filePath),
      fileSize: documentBuffer.length,
      fileType: fileType.type,
      mimeType: fileType.mimeType
    },
    text: '',
    keyValuePairs: [],
    tables: [],
    pageCount: 1,
    method: 'detectDocumentText'
  };

  try {
    // Try analyzeDocument first (for forms and tables)
    if (preferAnalysis) {
      try {
        console.log('🔍 Attempting analyzeDocument (for forms/tables)...');
        const analysisResult = await analyzeDocument(documentBuffer);
        
        results.text = analysisResult.text;
        results.keyValuePairs = analysisResult.keyValuePairs;
        results.tables = analysisResult.tables;
        results.pageCount = analysisResult.pageCount;
        results.method = 'analyzeDocument';
        
        console.log(`✅ Analysis complete: ${results.text.length} chars, ${results.keyValuePairs.length} key-value pairs, ${results.tables.length} tables`);
        return results;
      } catch (analysisError) {
        console.warn('⚠️  analyzeDocument failed, falling back to detectDocumentText:', analysisError.message);
        // Fall back to detectDocumentText
      }
    }

    // Use detectDocumentText for simple text extraction
    console.log('📝 Using detectDocumentText (simple text extraction)...');
    const textResult = await detectDocumentText(documentBuffer);
    
    results.text = textResult.text;
    results.pageCount = textResult.pageCount;
    results.method = 'detectDocumentText';
    
    console.log(`✅ Text extraction complete: ${results.text.length} characters`);
    return results;

  } catch (error) {
    console.error('❌ AWS Textract processing error:', error);
    throw error;
  }
}

module.exports = {
  processDocument,
  detectDocumentText,
  analyzeDocument,
  detectFileType,
  extractKeyValuePairs,
  extractTables
};

