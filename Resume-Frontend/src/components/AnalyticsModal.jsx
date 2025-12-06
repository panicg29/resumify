import React from 'react';
import { Button } from './ui/button';
import Squares from './Squares';
import SpotlightCard from './SpotlightCard';

export default function AnalyticsModal({ report, loading, error, onClose }) {
  if (!report && !loading && !error) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/30';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="fixed inset-0 bg-black z-[70] flex items-center justify-center p-4">
      {/* Squares Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.1)"
          hoverFillColor="rgba(0, 229, 255, 0.2)"
        />
      </div>

      {/* Modal Content */}
      <div className="relative z-10 max-w-5xl w-full max-h-[95vh] flex flex-col">
        <SpotlightCard className="w-full" spotlightColor="rgba(0, 229, 255, 0.2)">
          <div className="relative z-10">
            {/* Modal Header */}
            <div className="mb-6 pb-6 border-b border-neutral-700 flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  Resume Analytics
                </h3>
                <p className="text-gray-400 text-sm">
                  AI-powered analysis and recommendations
                </p>
              </div>
              <Button
                onClick={onClose}
                className="rounded-full w-10 h-10 p-0 border-2 border-neutral-700 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 bg-transparent text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 max-h-[calc(95vh-200px)]">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg 
                    className="animate-spin h-16 w-16 text-cyan-400 mb-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-white text-xl font-bold mb-2">Analyzing your resume...</p>
                  <p className="text-gray-400 text-sm">This may take a few seconds</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-6 text-center">
                  <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-lg font-bold text-white mb-2">Analysis Failed</h4>
                  <p className="text-red-300">{error}</p>
                </div>
              )}

              {report && !loading && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className={`p-6 rounded-lg border-2 ${getScoreBgColor(report.overallScore)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Overall Score</h4>
                      <div className={`text-4xl font-black ${getScoreColor(report.overallScore)}`}>
                        {report.overallScore}/100
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{report.overallAssessment}</p>
                  </div>

                  {/* Section Scores */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Section Scores</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(report.coreSectionScores || {}).map(([section, data]) => (
                        <div key={section} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-300 capitalize">
                              {section.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className={`text-xl font-black ${getScoreColor(data.score)}`}>
                              {data.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">{data.keyInsight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Strengths */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {report.keyStrengths?.map((strength, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Weaknesses */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {report.keyWeaknesses?.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                          <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  {report.highlights && report.highlights.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Highlights
                      </h4>
                      <ul className="space-y-2">
                        {report.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Critical Improvements */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Critical Improvements
                    </h4>
                    <ul className="space-y-2">
                      {report.criticalImprovements?.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                          <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">{index + 1}.</span>
                          <span className="text-gray-300">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing or Weak Areas */}
                  {report.missingOrWeakAreas && report.missingOrWeakAreas.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Missing or Weak Areas</h4>
                      <div className="space-y-3">
                        {report.missingOrWeakAreas.map((area, index) => (
                          <div key={index} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-bold text-white">{area.area}</h5>
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                area.importance === 'high' 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                  : area.importance === 'medium'
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              }`}>
                                {area.importance}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">{area.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Final Insight */}
                  {report.finalInsight && (
                    <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border-2 border-cyan-500/30">
                      <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Final Insight
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{report.finalInsight}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {report && !loading && (
              <div className="border-t border-neutral-700 pt-6 mt-6 flex justify-end">
                <Button 
                  onClick={onClose} 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

