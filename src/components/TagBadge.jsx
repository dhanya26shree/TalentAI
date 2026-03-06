import React from 'react';

export default function TagBadge({ label, color }) {
    let badgeColor = color;
    if (!badgeColor) {
        if (label === 'Hire') badgeColor = '#00FFB2';
        else if (label === 'Maybe') badgeColor = '#FFD166';
        else if (label === 'Pass') badgeColor = '#FF6B6B';
        else badgeColor = '#818CF8';
    }

    return (
        <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 whitespace-nowrap"
            style={{
                color: badgeColor,
                borderColor: badgeColor,
                backgroundColor: `${badgeColor}20`,
                boxShadow: `0 0 8px ${badgeColor}40`
            }}
        >
            {label}
        </span>
    );
}
