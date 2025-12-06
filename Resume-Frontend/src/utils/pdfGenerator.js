/**
 * Simple, error-free PDF generation using browser's native print functionality
 * This approach bypasses all OKLCH/color parsing issues
 */

/**
 * Generate PDF by opening browser's print dialog
 * User can save as PDF from there - works with all modern CSS including OKLCH
 * @param {HTMLElement} element - DOM element to print
 * @param {String} filename - Suggested filename
 */
export const generatePDF = async (element, filename = 'resume.pdf') => {
  try {
    // Create a new window with only the resume content
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      throw new Error('Pop-up blocked. Please allow pop-ups for this site.');
    }
    
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove buttons and non-printable elements
    const buttons = clone.querySelectorAll('button, .no-print');
    buttons.forEach(btn => btn.remove());
    
    // Get all stylesheets from the parent document
    const stylesheets = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          // Try to get inline styles
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          // External stylesheets - just link them
          if (sheet.href) {
            return `@import url('${sheet.href}');`;
          }
          return '';
        }
      })
      .filter(Boolean)
      .join('\n');
    
    // Build the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename.replace('.pdf', '')}</title>
          <style>
            ${stylesheets}
            
            /* Print-specific styles */
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              /* Hide buttons and interactive elements */
              button, .no-print {
                display: none !important;
              }
              
              /* Ensure colors print correctly */
              * {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
            }
            
            /* Screen styles for preview */
            @media screen {
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                background: #f5f5f5;
              }
            }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
          <script>
            // Auto-trigger print dialog after content loads
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
            
            // Close window after printing/canceling
            window.onafterprint = function() {
              setTimeout(function() {
                window.close();
              }, 100);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    return true;
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
};

/**
 * Generate PDF from resume data using template
 * @param {String} templateId - ID of the resume element in DOM
 * @param {String} filename - Name of the PDF file
 */
export const downloadResumePDF = async (templateId, filename) => {
  const element = document.getElementById(templateId);
  
  if (!element) {
    throw new Error('Resume element not found');
  }

  await generatePDF(element, filename);
};
