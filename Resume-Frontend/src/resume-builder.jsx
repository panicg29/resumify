import React from 'react';
import ResumeBuilder from './components/ResumeBuilder';

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen w-full font-sans text-gray-900 relative overflow-x-hidden bg-black">
      {/* Resume Builder Component */}
      <div className="relative z-10 w-full">
        <ResumeBuilder />
      </div>
    </main>
  );
}
