/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F6',
        surface: '#FFFFFF',
        'surface-muted': '#F0F0EE',
        border: '#E2E2E0',
        'text-primary': '#0D0D0D',
        'text-secondary': '#5C5C5C',
        'text-tertiary': '#A0A0A0',
        accent: '#8C1515',
        'accent-hover': '#701010',
        'accent-subtle': '#F5ECEC',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        hero:   ['80px', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' }],
        display:['52px', { lineHeight: '1.1',  letterSpacing: '-0.03em',  fontWeight: '600' }],
        title:  ['36px', { lineHeight: '1.15', letterSpacing: '-0.02em',  fontWeight: '500' }],
        heading:['22px', { lineHeight: '1.25', letterSpacing: '-0.01em',  fontWeight: '600' }],
        sub:    ['16px', { lineHeight: '1.35', letterSpacing: '0',        fontWeight: '500' }],
        'body-lg':['17px', { lineHeight: '1.75', letterSpacing: '0',      fontWeight: '400' }],
        body:   ['15px', { lineHeight: '1.7',  letterSpacing: '0',        fontWeight: '400' }],
        label:  ['11px', { lineHeight: '1.4',  letterSpacing: '0.1em',    fontWeight: '600' }],
        nav:    ['13px', { lineHeight: '1',    letterSpacing: '0.02em',   fontWeight: '450' }],
      },
      spacing: {
        18: '72px',
        22: '88px',
        30: '120px',
        36: '144px',
        48: '192px',
      },
      maxWidth: {
        content: '1080px',
        prose: '640px',
        modal: '760px',
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.07)',
        modal: '0 24px 64px rgba(0, 0, 0, 0.14)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
