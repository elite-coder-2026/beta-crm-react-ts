import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-text: #111827;
    --color-text-muted: #6b7280;
    --color-bg: #f9fafb;
    --color-surface: #ffffff;
    --color-border: #e5e7eb;
    --color-border-subtle: #f1f2f4;
    --color-hover: #f9fafb;
    --color-accent: #6d28d9;
    --color-accent-hover: #5b21b6;
    --color-accent-bg: #ede9fe;
    --color-on-accent: #ffffff;
    --color-overlay: rgba(17, 24, 39, 0.5);

    --color-success: #15803d;
    --color-success-hover: #166534;
    --color-success-bg: #dcfce7;
    --color-warning: #b45309;
    --color-warning-bg: #fef3c7;
    --color-neutral: #4b5563;
    --color-neutral-bg: #f3f4f6;
    --color-danger: #b91c1c;
    --color-danger-hover: #991b1b;
    --color-danger-bg: #fee2e2;
    --color-info: #1d4ed8;
    --color-info-hover: #1e40af;
    --color-info-bg: #dbeafe;
    --color-toast-bg: #1f2937;
    --color-toast-text: #f9fafb;
    --color-toast-muted: #9ca3af;
    --color-toast-action: #c4b5fd;
    --color-toast-success: #4ade80;
    --color-toast-error: #f87171;

    /* Charts: categorical slots in fixed order (validated for CVD on #ffffff) */
    --chart-1: #2a78d6;
    --chart-2: #eb6834;
    --chart-3: #1baf7a;
    /* Charts: ordinal blue ramp, light to dark */
    --chart-ramp-1: #86b6ef;
    --chart-ramp-2: #5598e7;
    --chart-ramp-3: #2a78d6;
    --chart-ramp-4: #1c5cab;
    --chart-ramp-5: #104281;
    --chart-muted: #c3c2b7;
    --chart-grid: #eceef1;
    --chart-axis: #d1d5db;

    --radius: 12px;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.18);
    --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-text);
    background: var(--color-bg);
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  #root {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
  }

  @media (max-width: 720px) {
    #root {
      grid-template-columns: 1fr;
    }
  }
`

export default GlobalStyles
