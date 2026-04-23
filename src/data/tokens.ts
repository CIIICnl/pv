/**
 * Design tokens shared between TypeScript (pdfmake) and SCSS (global.scss).
 * Keep values in sync with src/styles/_tokens.scss — the SCSS file is the
 * runtime source for the web, this module mirrors it for PDF export.
 */

export const tokens = {
  teal: {
    dark: '#1a3a3a',
    mid: '#1e4a4a',
    light: '#2a5c5c',
  },
  lime: '#DBFF00',
  limeSoft: '#f4ffb3',
  /** Print-safe variant of --lime (pdfmake cannot render neon on paper). */
  limePrint: '#9DBE00',
  text: {
    body: '#1a1a1a',
    muted: '#555548',
    inverse: '#ffffff',
  },
  surface: {
    page: '#fafaf7',
    base: '#ffffff',
    alt: '#f3f3ee',
    callout: '#fffceb',
  },
  border: {
    base: '#e3e3dc',
    strong: '#c8c8be',
  },
  status: {
    error: '#b3261e',
    success: '#1f6f4a',
  },
} as const;
