# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run format:check # Check formatting without writing
```

No test suite is configured.

## Environment

The AI tutor requires `ANTHROPIC_API_KEY` set in your environment (`.env.local`). Without it, the `/api/tutor` route returns 500.

## Architecture

This is a Next.js 16 App Router project with next-intl for i18n. The app supports two locales: `en` and `zh-TW` (default: `en`), managed via `i18n/routing.ts`. All localized pages live under `app/[locale]/`.

### Content system

Algorithm topics are defined as static JSON files in `data/algorithms/{locale}/{slug}.json`. The `AlgorithmTopic` type in `lib/types.ts` defines the full schema — each topic contains overview, concept, patterns, signals, frontend scenarios, implementation code, visualization steps, and practice items.

`lib/topic-loader.ts` reads these files from disk (server-side only). `lib/topics.ts` adds curriculum ordering logic via `CURRICULUM_ORDER` and exposes `getAllTopics`, `getTopicBySlug`, `getPreviousTopic`, and `getNextTopic`.

When a locale file doesn't exist for a slug, `topic-loader` falls back to `en`.

**To add a new topic:** create a JSON file matching the `AlgorithmTopic` schema in both `data/algorithms/en/` and `data/algorithms/zh-TW/`, then add the slug to `CURRICULUM_ORDER` in `lib/topics.ts`.

### AI tutor

`app/api/tutor/route.ts` handles POST requests and streams responses from `claude-haiku-4-5-20251001`. It builds a system prompt from the current topic's data, keeps a rolling window of the last 10 messages, and streams raw text chunks back to the client.

### Routing

- `/` → locale home page
- `/algorithms` → topic listing
- `/algorithms/[slug]` → individual topic page (server component that loads topic data and passes it to client components)

The `[locale]` layout in `app/[locale]/layout.tsx` validates the locale and wraps content with `NextIntlClientProvider`.

## Code style

ESLint uses `eslint-config-next` with Prettier integration (no conflicts). Prettier config is in `.prettierrc`.
