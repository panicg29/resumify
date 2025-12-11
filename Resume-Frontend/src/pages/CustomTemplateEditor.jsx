import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';
import { Button } from '../components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpotlightCard from '../components/SpotlightCard';
import LightRays from '../components/react-bits/LightRays';
import LandingHeader from '../components/landing/LandingHeader';

export default function CustomTemplateEditor() {
  const navigate = useNavigate();
  const viewer = useRef(null);
  const instanceRef = useRef(null); // Track instance to prevent duplicates
  const [instance, setInstance] = useState(null);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (!viewer.current) {
      console.error('Viewer ref is not set');
      return;
    }

    // Prevent duplicate initialization (React StrictMode causes double render in dev)
    if (instanceRef.current) {
      console.log('WebViewer already initialized, skipping...');
      return;
    }

    console.log('Initializing WebViewer...');
    console.log('Viewer element:', viewer.current);
    
    // Clear any existing content in the container
    if (viewer.current) {
      viewer.current.innerHTML = '';
    }
    
    // Initialize WebViewer following Apryse React documentation exactly
    WebViewer(
      {
        path: '/lib',
        licenseKey: 'demo:1765274620184:60f44f410300000000116c70fa8c91508f2bf34bd2fcf5a8c5eec096db',
        initialDoc: '',
        enableAnnotations: true,
      },
      viewer.current
    ).then((webViewerInstance) => {
      // Mark as initialized immediately to prevent duplicates
      instanceRef.current = webViewerInstance;
      
      console.log('WebViewer instance created:', webViewerInstance);
      console.log('UI available:', !!webViewerInstance.UI);
      console.log('Core available:', !!webViewerInstance.Core);
      
      setInstance(webViewerInstance);
      const { documentViewer, annotationManager } = webViewerInstance.Core;

      // Enable content editing feature
      webViewerInstance.UI.enableFeatures([webViewerInstance.UI.Feature.ContentEdit]);

      // Listen for document loaded
      documentViewer.addEventListener('documentLoaded', () => {
        console.log('Document loaded event fired');
        const pageCount = documentViewer.getPageCount();
        console.log('Page count:', pageCount);
        setIsDocumentLoaded(true);
      });

      // Listen for document unload
      documentViewer.addEventListener('documentUnloaded', () => {
        setIsDocumentLoaded(false);
        setFileName('');
      });

      console.log('WebViewer initialized successfully');
    }).catch((error) => {
      console.error('Error initializing WebViewer:', error);
      toast.error('Failed to initialize PDF editor. Please refresh the page.');
      instanceRef.current = null; // Reset on error
    });

    // Cleanup function to prevent duplicates
    return () => {
      if (instanceRef.current && instanceRef.current.UI) {
        console.log('Cleaning up WebViewer instance');
        try {
          instanceRef.current.UI.dispose();
        } catch (e) {
          console.log('Error disposing WebViewer:', e);
        }
        instanceRef.current = null;
      }
    };
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      if (instance && instance.UI) {
        console.log('Loading document:', file.name, 'Size:', arrayBuffer.byteLength);
        // Load document using ArrayBuffer directly as per Apryse docs
        instance.UI.loadDocument(arrayBuffer, { filename: file.name })
          .then(() => {
            console.log('Document loaded successfully');
            toast.success(`PDF loaded: ${file.name}`);
          })
          .catch((error) => {
            console.error('Error loading document:', error);
            toast.error('Failed to load PDF. Please try again.');
          });
      } else {
        console.error('Instance not ready:', { instance: !!instance, UI: instance?.UI });
        toast.error('PDF editor not ready. Please wait a moment and try again.');
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read file. Please try again.');
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle PDF export/download
  const handleExportPDF = async () => {
    if (!instance || !isDocumentLoaded) {
      toast.error('Please upload a PDF first');
      return;
    }

    try {
      const { documentViewer, annotationManager } = instance.Core;
      const doc = documentViewer.getDocument();

      if (!doc) {
        toast.error('No document loaded');
        return;
      }

      // Export annotations (if any)
      const xfdfString = await annotationManager.exportAnnotations();
      
      // Get PDF data with annotations
      const data = await doc.getFileData({ 
        xfdfString,
        downloadType: 'pdf'
      });

      // Create blob and download
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'edited-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  // Handle reset/clear document
  const handleReset = () => {
    if (instance) {
      instance.UI.loadDocument('', { filename: '' });
      setIsDocumentLoaded(false);
      setFileName('');
      // Reset file input
      const fileInput = document.getElementById('pdf-upload-input');
      if (fileInput) fileInput.value = '';
      toast.info('Editor cleared. Upload a new PDF to continue.');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* LightRays Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Navigation */}
      <LandingHeader />

      {/* Content Layer */}
      <div className="relative z-10 pt-24 md:pt-32 pb-8">
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="w-full max-w-[1800px] mx-auto">
            
            {/* Page Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                ✏️ Custom Template Editor
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                Upload your custom PDF template and edit it inline
              </p>
            </div>

            {/* Upload Card */}
            <SpotlightCard className="w-full max-w-6xl mx-auto mb-6" spotlightColor="rgba(0, 229, 255, 0.2)">
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-neutral-700">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2">
                    Upload Your Custom PDF Template
                  </h2>
                  <p className="text-sm md:text-base text-gray-400 mt-2">
                    Upload a PDF file to start editing • Maximum size: 50MB • Edit text inline and export when done
                  </p>
                </div>

                {/* File Input */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-white mb-3">
                    Select PDF File
                  </label>
                  <div className="relative">
                    <input
                      id="pdf-upload-input"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-400
                        file:mr-4 file:py-3 file:px-6
                        file:rounded-lg file:border-0
                        file:text-sm file:font-bold
                        file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500
                        file:text-white
                        hover:file:from-cyan-600 hover:file:to-blue-600
                        file:cursor-pointer"
                    />
                  </div>
                </div>

                {/* File Info */}
                {fileName && (
                  <div className="mb-6 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1">
                        <p className="font-bold text-white">{fileName}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Ready for editing
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleExportPDF}
                    disabled={!isDocumentLoaded}
                    className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </Button>
                  <Button
                    onClick={handleReset}
                    disabled={!isDocumentLoaded}
                    variant="outline"
                    className="flex-1 py-6 text-lg font-bold border-2 border-neutral-700 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear & Upload New
                  </Button>
                </div>

                {/* Instructions */}
                <div className="mt-8 p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <h3 className="font-bold text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    How to use
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">1.</span>
                      <span>Upload your custom PDF template using the file input above</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">2.</span>
                      <span>Use the editor below to click on text and edit it inline</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">3.</span>
                      <span>Add, delete, or modify text as needed using the editing tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-cyan-400 mr-2">4.</span>
                      <span>Click "Download PDF" to save your edited resume</span>
                    </li>
                  </ol>
                </div>
              </div>
            </SpotlightCard>

            {/* PDF Viewer Container */}
            <div className="w-full max-w-6xl mx-auto">
              <div className="mb-4 pb-4 border-b border-neutral-700">
                <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                  PDF Editor
                </h2>
                <p className="text-sm text-gray-400">
                  {isDocumentLoaded 
                    ? 'Click on text to edit. Use the toolbar above for additional tools.'
                    : 'Upload a PDF file to start editing'}
                </p>
              </div>
              
              {/* WebViewer Container */}
              <div 
                ref={viewer} 
                style={{ 
                  height: '800px',
                  width: '100%'
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

