import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, sub, accent, Icon, delay = 0 }) {
    // Convert hex to rgb for the rgba glow
    const hexToRgb = (hex) => {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.slice(0, 2), 16);
        const g = parseInt(cleanHex.slice(2, 4), 16);
        const b = parseInt(cleanHex.slice(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    const rgb = hexToRgb(accent);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)' }}
            className="clay-card p-6 relative overflow-hidden"
        >
            <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.15) 0%, transparent 70%)` }}
            />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="text-[var(--text-muted)] text-sm font-medium">{label}</div>
                <div className="animate-float" style={{ color: accent }}>
                    <Icon size={20} />
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-syne text-3xl font-bold text-[var(--text-primary)] mb-1">{value}</div>
                {sub && <div className="text-[var(--text-dim)] text-xs">{sub}</div>}
            </div>
        </motion.div>
    );
}
