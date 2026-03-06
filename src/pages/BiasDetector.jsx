import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { callAI } from '../api/ai';
import LoadingBeam from '../components/LoadingBeam';

export default function BiasDetector() {
    const [jobDesc, setJobDesc] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!jobDesc.trim()) return;
        setIsAnalyzing(true);
        setResult(null);
        setError(null);

        const systemPrompt = `You are an expert HR AI specializing in DE&I (Diversity, Equity, and Inclusion). Analyze the job description for unconscious bias, gendered language, ageism, or exclusionary terminology.
    Return ONLY valid JSON with this exact schema:
    {
      "bias_score": <number 0-100 where 100 means extreme bias found>,
      "flags": [{ "phrase": "problematic phrase in exact match", "type": "Gendered | Ageism | Aggressive | Exclusionary etc", "suggestion": "inclusive alternative" }],
      "rewritten_intro": "A 2-3 sentence neutral, inclusive rewrite of the most biased section or intro",
      "summary": "1 sentence summarizing the overall tone."
    }`;

        try {
            const resp = await callAI(systemPrompt, jobDesc);
            const data = JSON.parse(resp);
            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze text. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getSeverityColor = (score) => {
        if (score <= 30) return '#00FFB2'; // Low risk
        if (score <= 60) return '#FFD166'; // Moderate
        return '#FF6B6B'; // High
    };

    const getSeverityLabel = (score) => {
        if (score <= 30) return 'Low Risk';
        if (score <= 60) return 'Moderate Risk';
        return 'High Risk';
    };

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto hidden-scrollbar pb-24">
            {/* Header */}
            <div className="mb-8 relative z-10">
                <h1 className="font-syne text-3xl font-extrabold text-[var(--text-primary)] mb-2">Bias Detector</h1>
                <p className="text-[var(--text-muted)]">Scan job descriptions for exclusionary language</p>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(255,209,102,0.06)] blur-3xl rounded-full pointer-events-none -z-10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2 ml-1">Job Description</label>
                        <textarea
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            className="w-full glass-panel px-5 py-4 rounded-2xl text-sm transition-all focus:border-[var(--accent-amber)] focus:ring-1 focus:ring-[var(--accent-amber)] focus:ring-opacity-20 outline-none resize-none hidden-scrollbar text-[var(--text-primary)]"
                            placeholder="Paste job posting here..."
                            rows={12}
                        />
                        <div className="absolute bottom-4 right-4 text-xs font-medium text-[var(--text-dim)] bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded-md backdrop-blur-md">
                            {jobDesc.length} chars
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={!jobDesc.trim() || isAnalyzing}
                        className="clay-btn w-full py-4 font-syne font-bold text-lg text-[#111118]"
                        style={{
                            background: 'linear-gradient(135deg, #FFD166, #FFB833)',
                            boxShadow: '0 8px 32px rgba(255,209,102,0.25)'
                        }}
                    >
                        {isAnalyzing ? 'Scanning...' : 'Analyze for Bias'}
                    </motion.button>

                    {error && (
                        <div className="text-sm font-medium text-[#FF6B6B] bg-[rgba(255,107,107,0.1)] p-4 rounded-xl border border-[#FF6B6B]/20">
                            {error}
                        </div>
                    )}
                </div>

                <div className="flex flex-col h-full min-h-[400px]">
                    {isAnalyzing ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <LoadingBeam accent="#FFD166" text="Analyzing Linguistic Patterns" />
                        </div>
                    ) : result ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Score Card */}
                                <div className="glass-panel p-6 rounded-2xl flex items-center gap-6">
                                    <div className="flex flex-col items-center justify-center min-w-[120px]">
                                        <span
                                            className="font-syne text-[56px] font-extrabold leading-none tracking-tighter"
                                            style={{ color: getSeverityColor(result.bias_score) }}
                                        >
                                            {result.bias_score}
                                        </span>
                                        <span
                                            className="text-xs font-bold uppercase tracking-widest mt-1"
                                            style={{ color: getSeverityColor(result.bias_score) }}
                                        >
                                            {getSeverityLabel(result.bias_score)}
                                        </span>
                                    </div>
                                    <div className="h-16 w-[1px] bg-[rgba(255,255,255,0.1)]"></div>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{result.summary}</p>
                                </div>

                                {/* Flags list */}
                                {result.flags && result.flags.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="font-syne font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-[#FF6B6B]" />
                                            Flagged Phrases ({result.flags.length})
                                        </h3>
                                        {result.flags.map((flag, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * idx }}
                                                key={idx}
                                                className="clay-card p-4 border-l-[3px] border-l-[#FF6B6B] bg-[rgba(255,255,255,0.03)]"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-syne font-bold font-lg text-[#FF6B6B]">"{flag.phrase}"</span>
                                                    <span className="text-[10px] uppercase tracking-wider font-bold bg-[#FF6B6B] text-white px-2 py-0.5 rounded-sm opacity-80 shrink-0 ml-4">
                                                        {flag.type}
                                                    </span>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-[#00FFB2]">
                                                    <span className="shrink-0 mt-0.5">→</span>
                                                    <span className="font-medium">{flag.suggestion}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {result.flags?.length === 0 && (
                                    <div className="clay-card p-6 flex flex-col items-center justify-center text-center gap-3">
                                        <CheckCircle2 size={32} className="text-[#00FFB2]" />
                                        <p className="text-sm font-medium text-[var(--text-primary)]">Great job! No highly biased language detected.</p>
                                    </div>
                                )}

                                {/* Suggested Rewrite */}
                                {result.rewritten_intro && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="glass-panel p-5 rounded-xl border border-dashed border-[rgba(0,255,178,0.3)] bg-[rgba(0,255,178,0.02)] relative"
                                    >
                                        <div className="absolute -top-3 left-4 bg-[#111118] px-2 text-[10px] font-syne font-bold uppercase tracking-widest text-[#00FFB2]">
                                            ✦ Suggested Rewrite
                                        </div>
                                        <p className="text-sm text-[var(--text-primary)] italic font-sans leading-relaxed mt-1">
                                            "{result.rewritten_intro}"
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-[rgba(255,255,255,0.05)] rounded-2xl h-full mt-7 hidden lg:flex">
                            <ShieldAlert size={48} className="text-[rgba(255,209,102,0.2)] mb-4" />
                            <p className="font-syne text-lg font-bold text-[var(--text-muted)] mb-1">Awaiting Description</p>
                            <p className="text-xs text-[var(--text-dim)]">Results will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
