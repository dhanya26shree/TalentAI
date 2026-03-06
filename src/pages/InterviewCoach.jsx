import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Copy, CheckCircle2, ChevronDown } from 'lucide-react';
import { useCandidateStore } from '../store/useCandidateStore';
import { callAI } from '../api/ai';
import EmptyState from '../components/EmptyState';
import LoadingBeam from '../components/LoadingBeam';

const CATEGORY_COLORS = {
    'Technical': '#818CF8',
    'Behavioral': '#00FFB2',
    'Gap Probe': '#FF6B6B',
    'Culture': '#FFD166',
    'Situational': '#F472B6'
};

const QuestionCard = ({ q, index }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(q.question);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const color = CATEGORY_COLORS[q.category] || '#818CF8';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
            className="clay-card p-6 relative group"
        >
            <div className="flex justify-between items-start mb-4">
                <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0"
                    style={{ color, borderColor: color, backgroundColor: `${color}15` }}
                >
                    {q.category}
                </span>
                <button
                    onClick={handleCopy}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                    title="Copy question"
                >
                    {copied ? <CheckCircle2 size={16} className="text-[var(--accent-green)]" /> : <Copy size={16} />}
                </button>
            </div>

            <h3 className="font-syne font-semibold text-lg text-[var(--text-primary)] mb-3 pr-6">
                {q.question}
            </h3>

            <p className="font-sans italic text-xs text-[var(--text-dim)]">
                <span className="font-medium text-[var(--text-muted)] not-italic mr-1">Intent:</span>
                {q.intent}
            </p>
        </motion.div>
    );
};

export default function InterviewCoach() {
    const candidates = useCandidateStore(state => state.candidates);
    const [selectedHash, setSelectedHash] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    if (candidates.length === 0) {
        return (
            <div className="p-8 h-full flex items-center justify-center">
                <EmptyState
                    icon={MessageSquare}
                    heading="Interview Coach"
                    sub="You haven't screened any candidates yet. Go to Resume Screener first."
                    accent="#818CF8"
                />
            </div>
        );
    }

    const handleGenerate = async () => {
        if (!selectedHash) {
            setError("Please select a candidate first.");
            return;
        }
        const candidate = candidates.find(c => c.name + c.role === selectedHash);
        if (!candidate) return;

        setIsGenerating(true);
        setQuestions([]);
        setError(null);

        const systemPrompt = `You are an expert technical recruiter and interviewer. Generate EXACTLY 5 interview questions for this candidate, based on their profile. Return ONLY valid JSON with this exact schema:
    { "questions": [ { "category": "Technical" | "Behavioral" | "Gap Probe" | "Culture" | "Situational", "question": "The question text", "intent": "What this evaluates" } ] }
    Generate EXACTLY one question for each of the 5 categories listed above in order.`;

        const userPrompt = `Candidate Profile:\nName: ${candidate.name}\nRole: ${candidate.role}\nStrengths: ${candidate.strengths?.join(', ')}\nGaps: ${candidate.gaps?.join(', ')}\nSummary: ${candidate.summary}`;

        try {
            const resp = await callAI(systemPrompt, userPrompt);
            const data = JSON.parse(resp);
            if (data.questions && Array.isArray(data.questions)) {
                setQuestions(data.questions.slice(0, 5));
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to generate questions. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto hidden-scrollbar pb-24">
            {/* Header */}
            <div className="mb-8 relative z-10">
                <h1 className="font-syne text-3xl font-extrabold text-[var(--text-primary)] mb-2">Interview Coach</h1>
                <p className="text-[var(--text-muted)]">AI-generated personalized interview questions</p>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(129,140,248,0.06)] blur-3xl rounded-full pointer-events-none -z-10" />
            </div>

            <div className="space-y-6 relative z-10">
                <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full flex flex-col relative">
                        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 ml-1">Select Candidate</label>
                        <div className="relative">
                            <select
                                value={selectedHash}
                                onChange={(e) => setSelectedHash(e.target.value)}
                                className="w-full glass-panel px-4 py-3 rounded-xl text-sm transition-all text-[var(--text-primary)] appearance-none bg-transparent cursor-pointer focus:border-[var(--accent-purple)] focus:ring-1 focus:ring-[var(--accent-purple)] focus:ring-opacity-20 outline-none"
                            >
                                <option value="" disabled className="bg-[var(--surface)] text-[var(--text-muted)]">Choose a screened candidate...</option>
                                {candidates.map((c, i) => (
                                    <option key={i} value={c.name + c.role} className="bg-[var(--surface)] text-[var(--text-primary)]">
                                        {c.name} • {c.role} ({c.score})
                                    </option>
                                ))}
                            </select>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerate}
                        disabled={isGenerating || !selectedHash}
                        className="clay-btn px-8 py-3 font-syne font-bold text-white w-full md:w-auto shrink-0 transition-opacity"
                        style={{
                            background: 'linear-gradient(135deg, rgba(129,140,248,0.9), rgba(99,102,241,0.9))',
                            boxShadow: '0 8px 32px rgba(129,140,248,0.3)'
                        }}
                    >
                        {isGenerating ? 'Drafting...' : 'Generate Questions'}
                    </motion.button>
                </div>

                {error && (
                    <div className="text-sm font-medium text-[#FF6B6B] bg-[rgba(255,107,107,0.1)] p-4 rounded-xl border border-[#FF6B6B]/20">
                        {error}
                    </div>
                )}

                {isGenerating && (
                    <div className="py-12">
                        <LoadingBeam accent="#818CF8" text="Analyzing Profile & Drafting Questions" />
                    </div>
                )}

                <AnimatePresence>
                    {questions.length > 0 && !isGenerating && (
                        <motion.div className="flex flex-col gap-4 mt-8">
                            {questions.map((q, i) => (
                                <QuestionCard key={i} q={q} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
