import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Brain,
  Link2,
  ListChecks,
  Loader2,
  MessageSquare,
  Sparkles,
  X
} from 'lucide-react';
import LandingHeader from '../components/landing/LandingHeader';
import Aurora from '../components/react-bits/Aurora';
import AnimatedCard from '../components/react-bits/AnimatedCard';
import AnimatedButton from '../components/react-bits/AnimatedButton';
import SpotlightCard from '../components/SpotlightCard';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import resumeApi from '../services/resumeApi';

export default function InterviewPrep() {
  const [formData, setFormData] = useState({
    jobUrl: '',
    jobDescription: '',
    skills: [],
    skillsInput: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSkillAdd = () => {
    if (!formData.skillsInput.trim()) return;
    const entries = formData.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const merged = Array.from(new Set([...formData.skills, ...entries]));
    setFormData(prev => ({
      ...prev,
      skills: merged,
      skillsInput: ''
    }));
  };

  const handleSkillRemove = skill => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item !== skill)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!formData.jobUrl.trim() && !formData.jobDescription.trim()) {
      const message = 'Provide a job URL or paste the job description.';
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        jobUrl: formData.jobUrl,
        jobDescription: formData.jobDescription,
        skills: formData.skills,
        questionCount: 5
      };

      const data = await resumeApi.generateInterviewPrep(payload);
      setResult(data);
      toast.success('Interview prep generated successfully.');
    } catch (err) {
      const message = err.message || 'Failed to generate interview prep.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      jobUrl: '',
      jobDescription: '',
      skills: [],
      skillsInput: ''
    });
    setResult(null);
    setError(null);
  };

  const jobDetails = result?.jobDetails;
  const interviewPack = result?.interviewPack;
  const questionsToShow = interviewPack?.questions?.slice(0, 5) ?? [];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <ToastContainer position="bottom-right" theme="dark" />

      <div className="relative z-10">
        <LandingHeader />

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
          <header className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Interview Prep AI</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Job-Oriented Interview Training</h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Drop a job link or paste the description and get a full interview question pack with answers,
              follow-ups, scoring cues, and prep notes tailored to that role.
            </p>
          </header>

          <SpotlightCard className="p-8 bg-white/5 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-widest text-white/60">Job URL</p>
                  <Input
                    value={formData.jobUrl}
                    onChange={e => setFormData(prev => ({ ...prev, jobUrl: e.target.value }))}
                    placeholder="https://jobs.example.com/123"
                    className="bg-black/70 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                  />
                  <p className="text-xs text-white/50">We will scrape and normalize the posting.</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-widest text-white/60">Job description text</p>
                  <Textarea
                    rows={5}
                    value={formData.jobDescription}
                    onChange={e => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                    placeholder="Paste responsibilities, requirements, or the full job description..."
                    className="bg-black/70 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                  />
                  <p className="text-xs text-white/50">Required if no URL is provided.</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm uppercase tracking-widest text-white/60">Skills to emphasize</p>
                <div className="flex gap-2">
                  <Input
                    value={formData.skillsInput}
                    onChange={e => setFormData(prev => ({ ...prev, skillsInput: e.target.value }))}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd();
                      }
                    }}
                    placeholder="Type a skill and press Enter (comma supported)"
                    className="bg-black/70 border-white/15 text-white placeholder:text-white/40 focus-visible:ring-white/20"
                  />
                  <AnimatedButton type="button" onClick={handleSkillAdd} className="px-4">
                    Add
                  </AnimatedButton>
                </div>
                {!!formData.skills.length && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <span
                        key={skill}
                        className="flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs uppercase tracking-wide text-white/80"
                      >
                        {skill}
                        <button type="button" onClick={() => handleSkillRemove(skill)} className="text-white/70 hover:text-white">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-white/50">We generate exactly 5 tailored questions for every request.</p>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-2xl px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex gap-4 flex-wrap">
                <AnimatedButton type="submit" disabled={loading} className="px-8 py-4 text-base">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain size={18} />
                      Generate interview prep
                    </>
                  )}
                </AnimatedButton>
                <AnimatedButton type="button" variant="secondary" onClick={handleReset} disabled={loading} className="px-8 py-4 text-base">
                  Reset
                </AnimatedButton>
              </div>
            </form>
          </SpotlightCard>

          {result && (
            <section className="space-y-6" aria-live="polite">
              <div className="grid gap-6">
                <SpotlightCard className="p-6 bg-white/5 border-white/10">
                  <div className="flex items-start gap-3">
                    <Link2 size={18} />
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Job details</p>
                      <p className="text-lg font-semibold">
                        {jobDetails?.title || 'Job'} {jobDetails?.company ? `@ ${jobDetails.company}` : ''}
                      </p>
                      <p className="text-sm text-white/70">
                        {jobDetails?.location || 'Location not provided'} • {jobDetails?.experienceLevel || 'Experience level N/A'}
                      </p>
                      {jobDetails?.source && (
                        <a href={jobDetails.source} target="_blank" rel="noreferrer" className="text-sm text-white underline">
                          View source
                        </a>
                      )}
                      {jobDetails?.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {jobDetails.skills.slice(0, 8).map(skill => (
                            <span key={skill} className="text-xs uppercase tracking-wide border border-white/20 rounded-full px-3 py-1 text-white/80">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              {interviewPack && (
                <div className="grid gap-6 lg:grid-cols-3">
                  <SpotlightCard className="p-6 bg-white/5 border-white/10 lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <ListChecks size={18} />
                      <h3 className="text-xl font-semibold">Question pack</h3>
                    </div>

                    <div className="grid gap-4">
                      {questionsToShow.map((q, idx) => (
                        <AnimatedCard key={q.id || idx} className="p-5">
                          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/70">
                            <span className="border border-white/20 rounded-full px-2 py-1">{q.type || 'Question'}</span>
                            <span className="border border-white/20 rounded-full px-2 py-1">{q.difficulty || 'medium'}</span>
                            {q.targets?.length ? (
                              <span className="border border-white/20 rounded-full px-2 py-1">
                                Targets: {q.targets.join(', ')}
                              </span>
                            ) : null}
                          </div>
                          <h4 className="text-lg font-semibold mt-3">{q.question}</h4>
                          {q.whyAsked && <p className="text-sm text-white/70 mt-2">Why asked: {q.whyAsked}</p>}
                          {q.modelAnswer && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs uppercase tracking-widest text-white/60">Model answer</p>
                              <p className="text-sm text-white/80 leading-relaxed">{q.modelAnswer}</p>
                            </div>
                          )}
                          {q.followUp && (
                            <p className="text-sm text-white/70 mt-2">
                              Follow-up: <span className="text-white/90">{q.followUp}</span>
                            </p>
                          )}
                          {q.scoring && (
                            <div className="grid gap-2 md:grid-cols-3 mt-3 text-xs text-white/70">
                              <div className="border border-white/15 rounded-lg p-2">Strong: {q.scoring.strong}</div>
                              <div className="border border-white/15 rounded-lg p-2">Average: {q.scoring.average}</div>
                              <div className="border border-white/15 rounded-lg p-2">Red flag: {q.scoring.redFlag}</div>
                            </div>
                          )}
                          {q.keywordsToHit?.length ? (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {q.keywordsToHit.map(keyword => (
                                <span key={keyword} className="text-xs uppercase tracking-wide border border-white/20 rounded-full px-3 py-1 text-white/80">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </AnimatedCard>
                      ))}
                    </div>
                  </SpotlightCard>

                  <div className="space-y-4">
                    <AnimatedCard className="p-5">
                      <div className="flex items-center gap-3">
                        <Brain size={18} />
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Candidate context</p>
                          <p className="text-lg font-semibold">{interviewPack?.candidateContext?.name || 'Candidate'}</p>
                          <p className="text-sm text-white/70">{interviewPack?.candidateContext?.headline}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mt-3 text-sm text-white/80">
                        {interviewPack?.candidateContext?.strengths?.length ? (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/60">Strengths</p>
                            <ul className="list-disc list-inside space-y-1">
                              {interviewPack.candidateContext.strengths.map(item => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {interviewPack?.candidateContext?.gaps?.length ? (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/60">Gaps</p>
                            <ul className="list-disc list-inside space-y-1">
                              {interviewPack.candidateContext.gaps.map(item => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </AnimatedCard>

                    <AnimatedCard className="p-5">
                      <div className="flex items-center gap-3">
                        <Sparkles size={18} />
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Job context</p>
                          <p className="text-sm text-white/70">
                            {interviewPack?.jobContext?.title || jobDetails?.title} {interviewPack?.jobContext?.company || jobDetails?.company ? `@ ${interviewPack?.jobContext?.company || jobDetails?.company}` : ''}
                          </p>
                          <p className="text-xs text-white/60">
                            {interviewPack?.jobContext?.experienceLevel || jobDetails?.experienceLevel || 'Experience level N/A'}
                          </p>
                        </div>
                      </div>
                      {interviewPack?.jobContext?.skillsFocus?.length ? (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {interviewPack.jobContext.skillsFocus.map(skill => (
                            <span key={skill} className="text-xs uppercase tracking-wide border border-white/20 rounded-full px-3 py-1 text-white/80">
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </AnimatedCard>

                    {interviewPack?.prepNotes?.length ? (
                      <AnimatedCard className="p-5">
                        <div className="flex items-center gap-3">
                          <MessageSquare size={18} />
                          <h4 className="text-lg font-semibold">Prep notes</h4>
                        </div>
                        <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-white/80">
                          {interviewPack.prepNotes.map(note => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </AnimatedCard>
                    ) : null}

                    {result?.meta && (
                      <AnimatedCard className="p-4 text-xs text-white/60 space-y-1">
                        <p>Model: {result.meta.model}</p>
                        <p>Questions generated: {questionsToShow.length || result.meta.questionCount || 5}</p>
                        <p>Job source: {result.meta.jobSource}</p>
                      </AnimatedCard>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
