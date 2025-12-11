import React from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from '../PillNav';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'AI Generator', href: '/ai-generate' },
  { label: 'Job Match AI', href: '/job-tailored' },
  { label: 'Interview Prep', href: '/interview-prep' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Upload PDF', href: '/upload-pdf' },
  { label: 'Custom Template', href: '/custom-template' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
];

export default function LandingHeader() {
  const location = useLocation();
  const activeHref = location.pathname;

  return (
    <div className="relative w-full pt-4 md:pt-6 lg:pt-8 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center w-full">
          <PillNav
            items={navItems}
            activeHref={activeHref}
            className="w-full md:w-auto"
            ease="power2.easeOut"
            baseColor="rgba(0, 0, 0, 0.9)"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
          />
        </div>
      </div>
    </div>
  );
}
