import React from 'react';

export const Sitar: React.FC<{ className?: string, size?: number }> = ({ className, size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Resonator (Tumba) */}
            <path d="M12 15c-3 0-5 1.5-5 4.5S9.5 23 12 23s5-3.5 5-3.5-2-4.5-5-4.5z" />
            {/* Neck (Dandi) */}
            <path d="M12 15V4" />
            {/* Tuning Pegs */}
            <path d="M12 5h2" />
            <path d="M12 7h-2" />
            <path d="M12 9h2" />
            <path d="M12 11h-2" />
            {/* Top Gourd/Head */}
            <circle cx="12" cy="3" r="1.5" />
            {/* Strings */}
            <path d="M11 15V4" strokeOpacity="0.5" />
            <path d="M13 15V4" strokeOpacity="0.5" />
        </svg>
    );
};
