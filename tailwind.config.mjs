import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', ...defaultTheme.fontFamily.serif],
        body: ['system-ui', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'hh-bg': '#ffffff',
        'hh-surface': '#f9f8f6',
        'hh-text': '#1a1a1a',
        'hh-muted': '#6b6b6b',
        'hh-border': '#e5e2dc',
        'hh-accent': '#1a1a1a',
        'hh-tag': '#f0ede8',
      },
      borderRadius: {
        card: '0px',
        btn: '0px',
      },
      transitionDuration: {
        DEFAULT: '250ms',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.hh-text', '#1a1a1a'),
            '--tw-prose-headings': theme('colors.hh-text', '#1a1a1a'),
            '--tw-prose-links': theme('colors.hh-text', '#1a1a1a'),
            '--tw-prose-bold': theme('colors.hh-text', '#1a1a1a'),
            '--tw-prose-counters': theme('colors.hh-muted', '#6b6b6b'),
            '--tw-prose-bullets': theme('colors.hh-border', '#e5e2dc'),
            '--tw-prose-hr': theme('colors.hh-border', '#e5e2dc'),
            '--tw-prose-quotes': theme('colors.hh-muted', '#6b6b6b'),
            '--tw-prose-quote-borders': theme('colors.hh-border', '#e5e2dc'),
            '--tw-prose-captions': theme('colors.hh-muted', '#6b6b6b'),
            '--tw-prose-code': theme('colors.hh-text', '#1a1a1a'),
            '--tw-prose-pre-bg': theme('colors.hh-surface', '#f9f8f6'),
            '--tw-prose-th-borders': theme('colors.hh-border', '#e5e2dc'),
            '--tw-prose-td-borders': theme('colors.hh-border', '#e5e2dc'),
            'h1, h2, h3, h4': {
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: '500',
              letterSpacing: '-0.01em',
              lineHeight: '1.15',
            },
            a: {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.hh-border', '#e5e2dc'),
              textUnderlineOffset: '2px',
              transition: 'text-decoration-color 0.2s ease',
            },
            'a:hover': {
              textDecorationColor: theme('colors.hh-text', '#1a1a1a'),
            },
            img: {
              borderRadius: '0px',
            },
            blockquote: {
              borderLeftWidth: '2px',
              borderLeftColor: theme('colors.hh-border', '#e5e2dc'),
              fontStyle: 'normal',
              color: theme('colors.hh-muted', '#6b6b6b'),
              paddingLeft: '1.5rem',
            },
            pre: {
              backgroundColor: theme('colors.hh-surface', '#f9f8f6'),
              color: theme('colors.hh-text', '#1a1a1a'),
              borderRadius: '0px',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
