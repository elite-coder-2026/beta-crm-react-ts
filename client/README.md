# Beta CRM

> **Component-Driven CRM Frontend**  
> Built with **React 19**, **TypeScript**, **Vite**, and **styled-components**, with hand-built SVG charts and no UI or chart libraries.

[![React](https://img.shields.io/badge/react-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-6.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/build-Vite%208-646cff.svg)](https://vite.dev/)
[![Styling](https://img.shields.io/badge/styling-styled--components-db7093.svg)](https://styled-components.com/)

**Beta CRM** is the browser client for a lightweight customer relationship manager: members, projects on Kanban boards, deals, invoices, and the reports that tie them together. Every screen is built from in-house components, each with its own `.styles.ts` file and the shared design tokens in `src/styles/global-styles.ts`, and they can all be browsed from a showcase sidebar inside the app. The client runs on seeded sample data today; a matching Express API lives in `../server`.

---

## Key Capabilities & Features

* **Component Showcase:** A sidebar groups every component into Components, Reports, Charts, Buttons, Tables, and Forms, so each one can be opened and tried on its own.
* **Members Management:** Member list with status badges, an add/edit modal, and a slide-in details panel with initials avatars.
* **Kanban Projects:** Multiple projects, each with its own board, created from Basic, Sales pipeline, Software, or Empty templates. Cards can be dragged between and within columns, filtered by search, priority, and assignee, edited in a modal, and deleted with Undo.
* **Reports & Analytics:** A Sales report (date-range and owner filters, KPI tiles with change versus the previous period, revenue trend, deal funnel, leads by source, rep performance) and a Projects report built live from the Kanban boards.
* **Accessible Charts:** Line, bar, horizontal bar, and stacked bar charts plus stat tiles, all hand-built in SVG with hover and keyboard tooltips, a legend, and a Chart/Table toggle on every card. Chart colours are checked for colour-blind safety and contrast.
* **Data Tables:** Basic, striped, and sortable tables with row selection and view/edit/remove actions, plus an invoice table with search, status and date filters, sorting, and cursor-based pagination.
* **Forms:** Login, register, forgot and reset password, profile settings, contact, and a comment thread, with inline validation and success states.
* **Feedback:** Top-right notifications with a countdown and bottom toasts with optional actions such as Undo, available anywhere through `useNotification()` and `useToast()`.

---

## Tech Stack & Architecture

| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **UI Framework** | React 19 | Components, hooks, and state (`useReducer` for the Kanban board) |
| **Language** | TypeScript 6 (strict) | Typed props, data models, and API contracts |
| **Build & Dev Server** | Vite 8 | Fast refresh, production builds, `/api` proxy to `localhost:4000` |
| **Styling** | styled-components 6 | Per-component `.styles.ts` files on shared CSS custom properties |
| **Charts** | Hand-built SVG | Line, bar, and stacked charts with tooltips and table views |
| **Linting** | oxlint | Fast lint rules for React and TypeScript |
| **Data** | Seeded sample data | Deterministic members, projects, deals, and invoices in `src/data/` |
| **API** | Express 5 (`../server`) | REST backend, scaffolded and ready to replace the sample data |

---

## Project Layout

```text
client/
├── index.html             # HTML shell that loads src/main.tsx
├── vite.config.ts         # Vite config and /api dev proxy
├── src/
│   ├── main.tsx           # Entry point: notification and toast providers around App
│   ├── App.tsx            # Showcase sidebar and the screen for each component
│   ├── App.styles.ts      # Main content area and showcase layout
│   ├── styles/
│   │   └── global-styles.ts   # Reset, page layout, colour and chart design tokens
│   ├── components/
│   │   ├── buttons/       # Primary, secondary, error, success, and info buttons
│   │   ├── charts/        # Line, bar, stacked bar, stat tile, chart card, tooltip
│   │   ├── forms/         # Login, register, password, profile, contact, comments
│   │   ├── invoices/      # Invoice table, useInvoices hook, cursor-paginated API
│   │   ├── kanban/        # Board, columns, cards, card modal, useKanbanBoard
│   │   ├── notifications/ # Notification card, provider, useNotification
│   │   ├── projects/      # Projects overview, switcher, new-project modal, templates
│   │   ├── reports/       # Sales and projects reports, sales metrics
│   │   ├── toasts/        # Toast bar, provider, useToast
│   │   └── *.tsx          # Members list, member modals, tables, sidebar
│   ├── data/              # Seeded sample members, projects, deals, and invoices
│   ├── hooks/             # useDebouncedValue, useElementWidth
│   ├── icons/             # Inline SVG icon components
│   └── utils/             # IDs, dates, and initials helpers
└── public/                # Favicon and icon sprite
```
