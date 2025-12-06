import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../react-bits/AnimatedButton';
import { Input } from '../ui/input';
import AnimatedText from '../react-bits/AnimatedText';
import { API_ROOT } from '../../services/resumeApi';

export default function FooterSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setResult({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_ROOT}/api/email/send-greeting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ type: 'success', message: 'Thanks for subscribing! Check your email.' });
        setEmail('');
        setTimeout(() => setResult(null), 5000);
      } else {
        setResult({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setResult({
        type: 'error',
        message: 'Unable to connect to the server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Resume Builder', href: '#' },
      { name: 'Templates', href: '/templates' },
      { name: 'Cover Letters', href: '#' },
      { name: 'ATS Checker', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Live Chat', href: '#' },
      { name: 'Tutorials', href: '#' },
    ],
  };

  return (
    <footer className="w-full border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Signup */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
          <div className="max-w-2xl">
            <h4 className="text-lg font-semibold mb-2 text-white">
              Stay in the Loop
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Get exclusive resume tips, job market insights, and platform updates delivered to your inbox.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-sm text-white placeholder-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-150 disabled:opacity-50"
                  disabled={loading}
                  required
                />
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </AnimatedButton>
              </div>
              {result && (
                <div
                  className={`mt-3 px-3 py-2 rounded-md text-xs font-medium ${
                    result.type === 'success'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  {result.type === 'success' ? '✅' : '❌'} {result.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

