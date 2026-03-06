import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, heading, sub, ctaLabel, onCta, accent = "#00FFB2" }) {
    return (
        <div className="w-full flex justify-center py-16">
            <div className="flex flex-col items-center text-center max-w-sm">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-float"
                    style={{ background: `rgba(255,255,255,0.05)`, border: '1px solid rgba(255,255,255,0.08)', color: accent }}>
                    <Icon size={32} />
                </div>
                <h3 className="font-syne text-xl font-bold text-[var(--text-primary)] mb-2">
                    {heading}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">
                    {sub}
                </p>

                {ctaLabel && onCta && (
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onCta}
                        className="clay-btn px-6 py-2.5 text-sm font-medium font-syne"
                        style={{
                            background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                            color: accent,
                            border: `1px solid ${accent}40`
                        }}
                    >
                        {ctaLabel}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
