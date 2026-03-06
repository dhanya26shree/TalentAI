import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { callAI } from '../api/ai';
import { useCandidateStore } from '../store/useCandidateStore';

const SUGGESTIONS = [
    "Who is the best candidate?",
    "Draft an offer letter",
    "Summarize all candidates",
    "Write a rejection email"
];

const TypingIndicator = () => (
    <div className="flex gap-1 items-center px-4 py-3 glass-panel w-16 h-10 rounded-2xl rounded-tl-none">
        {[0, 1, 2].map(i => (
            <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#F472B6]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
        ))}
    </div>
);

export default function HRCopilot() {
    const candidates = useCandidateStore(state => state.candidates);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), role: 'user', content: text };
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        const stringifiedContext = candidates.length
            ? JSON.stringify(candidates.map(c => ({ name: c.name, role: c.role, score: c.score, rec: c.recommendation, strengths: c.strengths, gaps: c.gaps })))
            : "No candidates screened yet.";

        const systemPrompt = `You are an expert HR Copilot assistant. You help recruiters analyze candidates, draft emails, and make hiring decisions. Respond in helpful, concise markdown. Here is the current candidate context:\n${stringifiedContext}`;

        const conversationHistory = updatedMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');
        const finalPrompt = `Conversation History:\n${conversationHistory}\n\nPlease respond to the user's last message.`;

        try {
            const resp = await callAI(systemPrompt, finalPrompt, false);
            setMessages([...updatedMessages, { id: Date.now() + 1, role: 'assistant', content: resp }]);
        } catch (err) {
            console.error("HRCopilot AI Error:", err);
            setMessages([...updatedMessages, { id: Date.now() + 1, role: 'assistant', content: '_I\'m having trouble connecting to the AI brain right now. Please ensure your Groq API key is valid in the .env file._' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] md:h-screen flex flex-col hidden-scrollbar pb-20 md:pb-8">
            {/* Header */}
            <div className="mb-6 shrink-0 relative z-10">
                <h1 className="font-syne text-3xl font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-3">
                    HR Copilot <Sparkles className="text-[#F472B6]" size={24} />
                </h1>
                <p className="text-[var(--text-muted)]">Your AI recruiting assistant</p>
                <div className="absolute top-0 right-10 w-48 h-48 bg-[rgba(244,114,182,0.06)] blur-3xl rounded-full pointer-events-none -z-10" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 glass-panel rounded-3xl flex flex-col overflow-hidden relative border-[rgba(244,114,182,0.1)] shadow-[0_8px_32px_rgba(244,114,182,0.05)]">

                {/* Messages Scroll View */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 hidden-scrollbar custom-scrollbar w-full max-w-[560px] mx-auto">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center pt-10">
                            <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-[#F472B6] mb-6 animate-float shadow-[0_0_30px_rgba(244,114,182,0.2)]">
                                <Bot size={32} />
                            </div>
                            <h3 className="font-syne text-xl font-bold text-[var(--text-primary)] mb-8 text-center">How can I help you today?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {SUGGESTIONS.map((sug, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSend(sug)}
                                        className="glass-panel py-3 px-4 rounded-xl text-sm text-[var(--text-primary)] hover:border-[#F472B6] hover:bg-[rgba(244,114,182,0.05)] transition-all text-left"
                                    >
                                        {sug}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id}
                                    className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <span className="font-syne font-bold text-[10px] text-[#F472B6] mb-1 tracking-widest uppercase ml-1">
                                            ✦ Copilot
                                        </span>
                                    )}
                                    <div
                                        className={`max-w-[85%] px-5 py-3.5 ${msg.role === 'user'
                                            ? 'clay-card rounded-2xl rounded-tr-sm bg-[rgba(244,114,182,0.12)] border border-[#F472B6]/30 text-[var(--text-primary)]'
                                            : 'glass-panel rounded-2xl rounded-tl-sm text-[var(--text-primary)]'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-col items-start"
                                >
                                    <span className="font-syne font-bold text-[10px] text-[#F472B6] mb-1 tracking-widest uppercase ml-1">
                                        ✦ Copilot
                                    </span>
                                    <TypingIndicator />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(17,17,24,0.6)] backdrop-blur-md shrink-0">
                    <div className="max-w-[560px] mx-auto relative flex items-end gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Copilot anything..."
                            className="w-full glass-panel pl-5 pr-12 py-4 rounded-2xl text-sm transition-all focus:border-[#F472B6] focus:ring-1 focus:ring-[#F472B6] focus:ring-opacity-20 outline-none resize-none hidden-scrollbar min-h-[52px] max-h-[120px]"
                            rows={1}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 bottom-2 w-9 h-9 flex items-center justify-center rounded-xl bg-[#F472B6] text-white shadow-[0_0_15px_rgba(244,114,182,0.4)] disabled:opacity-50 disabled:shadow-none"
                        >
                            <Send size={16} className="-ml-0.5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Internal Bot Icon component since Lucide Bot wasn't initially imported in this file
function Bot(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
        </svg>
    );
}
