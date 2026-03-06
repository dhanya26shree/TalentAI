import React, { useEffect, useState } from 'react';
import { getScoreColor } from '../utils/helpers';

export default function ScoreRing({ score }) {
    const [dashArray, setDashArray] = useState(0);
    const color = getScoreColor(score);
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const targetDashArray = `${(Math.max(0, score) / 100) * circumference} ${circumference}`;

    useEffect(() => {
        // Animate dasharray 0 → final over 1s on mount
        const timer = setTimeout(() => {
            setDashArray(targetDashArray);
        }, 50);
        return () => clearTimeout(timer);
    }, [targetDashArray]);

    return (
        <div className="relative w-[80px] h-[80px] flex items-center justify-center shrink-0">
            <svg width="80" height="80" className="absolute top-0 left-0 transform -rotate-90">
                {/* Outer glass ring */}
                <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Background ring */}
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                {/* Score ring */}
                <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={dashArray === 0 ? `0 ${circumference}` : dashArray}
                    style={{ transition: 'stroke-dasharray 1s ease-out' }}
                />
            </svg>
            <span className="font-syne font-extrabold text-xl" style={{ color }}>{score}</span>
        </div>
    );
}
