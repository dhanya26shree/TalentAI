import React from 'react';

export default function LoadingBeam({ accent, text }) {
    return (
        <div className="w-full">
            <div
                className="font-syne uppercase text-xs font-bold mb-2 text-center tracking-[3px]"
                style={{ color: accent }}
            >
                {text}
            </div>
            <div className="h-[2px] w-full bg-[rgba(255,255,255,0.05)] overflow-hidden relative rounded-full">
                <div
                    className="absolute top-0 bottom-0 w-1/3 animate-beam rounded-full"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                        boxShadow: `0 0 10px ${accent}`
                    }}
                />
            </div>
        </div>
    );
}
