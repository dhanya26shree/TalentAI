/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                surface: 'var(--surface)',
                border: 'var(--border)',
                'accent-green': 'var(--accent-green)',
                'accent-blue': 'var(--accent-blue)',
                'accent-purple': 'var(--accent-purple)',
                'accent-amber': 'var(--accent-amber)',
                'accent-red': 'var(--accent-red)',
                'accent-pink': 'var(--accent-pink)',
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                syne: ['Syne', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 8px 32px rgba(0,0,0,0.3)',
                'glow': '0 0 20px rgba(0,255,178,0.2)',
                'lifted': '0 12px 40px rgba(0,0,0,0.4)',
            }
        },
    },
    plugins: [],
}
