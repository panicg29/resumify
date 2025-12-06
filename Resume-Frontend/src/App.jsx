import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup.jsx';
import About from './about.jsx';
import Pricing from './pricing.jsx';
import ResumeBuilderPage from './resume-builder.jsx';
import TemplateGallery from './template-gallery.jsx';
import Dashboard from './pages/dashboard.jsx';
import PdfUpload from './pages/PdfUpload.jsx';
import AIGenerateResume from './pages/AIGenerateResume.jsx';
import JobTailoredResume from './pages/JobTailoredResume.jsx';
import InterviewPrep from './pages/InterviewPrep.jsx';

// Landing Page Components
import LandingHeader from './components/landing/LandingHeader';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import TeamSection from './components/landing/TeamSection';
import FAQSection from './components/landing/FAQSection';
import RealFAQSection from './components/landing/RealFAQSection';
import FooterSection from './components/landing/FooterSection';
import LiquidEther from './components/react-bits/LiquidEther';

function App() {
  return (
    <main className="min-h-screen w-screen font-sans bg-black text-white relative overflow-x-hidden">
      {/* LiquidEther Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <LandingHeader />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Team Section */}
        <TeamSection />

        {/* FAQ Section */}
        <RealFAQSection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </main>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/templates" element={<TemplateGallery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-pdf" element={<PdfUpload />} />
        <Route path="/ai-generate" element={<AIGenerateResume />} />
        <Route path="/job-tailored" element={<JobTailoredResume />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
