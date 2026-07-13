# Sahabat AI — AI Chatbot Website (React + Vite, bilingual, mock subscription)

## Overview
Build a static, frontend-only website for **Sahabat AI**, an AI chatbot product with a
mock subscription ("langganan") system. React (Vite) + Tailwind CSS v4, bilingual
(Indonesian/English) with a persisted language toggle, dark gradient/techy theme with
blue/cyan accents, rich chat with multiple sessions, and SEO-oriented marketing copy.
No backend; all state in `localStorage` (demo auth, not secure).

## Decisions (locked)
- **Product:** AI chatbot website.
- **Subscription:** Frontend-only / mock (pricing cards, signup modal, usage limits in localStorage).
- **Stack:** React + Vite + Tailwind v4 (`@tailwindcss/vite`).
- **Language:** Bilingual EN/ID toggle, persisted. Pricing currency follows language (IDR↔USD).
- **AI responses:** Both — default simulated (`mockAI`), plus real mode via user-supplied key.
- **Real AI provider:** OpenAI-compatible (key + base URL + model), with presets OpenAI / OpenRouter / Groq + custom.
- **Layout:** Multi-page routes.
- **Styling:** Tailwind CSS.
- **Branding:** "Sahabat AI"; dark gradient/techy; blue/cyan (`cyan-400`/`blue-500`) accents; light mode available.
- **Chat UX:** Rich — markdown + code blocks, copy button, typing indicator, stop/retry, streaming, multiple named sessions (create/rename/delete), export. History in localStorage.
- **Landing:** Full marketing page (hero, features, how-it-works, pricing preview, FAQ, footer CTA) with SEO/marketing copy in both languages.
- **LMArena:** Experimental "Arena" chat mode (attempts LMArena endpoints, graceful fallback + disclaimer). See risks.
- **Deploy:** Local only for now (no deploy config). Validate via `npm run dev`, `npm run test`, `npm run build`.
- **Testing:** Vitest + React Testing Library (logic) + Playwright (smoke test).

## Routes (react-router)
- `/` — Home (full marketing + SEO copy)
- `/chat` — Chat interface
- `/pricing` — Pricing/subscription tiers
- `/dashboard` — Settings + plan/usage (language, theme, AI mode, API key/base/model, sessions, logout/upgrade)

## File structure
```
package.json, vite.config.js, index.html, tailwind/postcss config
src/main.jsx, App.jsx, index.css
src/i18n/        index.js (EN/ID dictionaries incl. marketing/SEO copy), LanguageContext.jsx
src/context/     ThemeContext.jsx, SubscriptionContext.jsx
src/lib/         storage.js, limits.js, mockAI.js, aiClient.js, arenaClient.js, useMeta.js
src/components/  Navbar, LanguageToggle, ThemeToggle, Footer, Hero, Features,
                 HowItWorks, PricingCards, FAQ, SignupModal, ChatWindow, Message,
                 ChatInput, SessionList, SettingsPanel, PlanBadge
src/pages/       Home, Chat, Pricing, Dashboard
src/test/        vitest specs
e2e/             playwright smoke spec
```

## Data models (localStorage)
- `sa_user`: `{ email, name, plan, createdAt }`
- `sa_usage`: `{ date: 'YYYY-MM-DD', count }`
- `sa_settings`: `{ language, theme, aiMode: 'mock'|'provider'|'arena', apiKey, baseUrl, model }`
- `sa_sessions`: `[{ id, name, messages: [{role, content}], createdAt, updatedAt }]`

## Subscription tiers (mock)
- **Free:** 10 messages/day, $0 / Rp0
- **Pro:** 500 messages/day, $9/mo / Rp149k/mo
- **Enterprise:** unlimited, $29/mo / Rp449k/mo
Email-based mock auth (SignupModal). Daily usage tracked + enforced. Upgrade CTA; plan badge in navbar.
> NOTE: localStorage auth is demo-only and NOT secure. Clearly state this in UI.

## AI modes (Settings → aiClient / arenaClient / mockAI)
1. `mock` (default): `mockAI.js` simulated streaming replies (persona/canned + echo fallback).
2. `provider` (OpenAI-compatible): user pastes API key + base URL + model. Presets:
   - OpenAI `https://api.openai.com/v1`
   - OpenRouter `https://openrouter.ai/api/v1`
   - Groq `https://api.groq.com/openai/v1`
   - Custom (any OpenAI-compatible endpoint)
   Calls `/chat/completions` via `fetch`, streams responses.
3. `arena` (experimental): `arenaClient.js` attempts LMArena chat endpoints directly from the browser.

### LMArena — risks & implementation notes
- LMArena has **no public chat API with an API key**; the site is protected by Cloudflare/captcha.
- `arenaClient.js` must reverse-engineer the web chat endpoint: open `lmarena.ai` Text Arena, send a
  prompt, capture the exact `POST /api/...` request (URL, headers, body) from DevTools Network, and
  replicate it.
- On CORS/Cloudflare/failure: show an inline notice ("Arena chat unavailable / blocked") and fall back
  to mock or the selected provider. Never crash.
- Add a visible disclaimer: experimental, may break at any time, may violate LMArena ToS; provided as-is.

## SEO / marketing copy (both languages, in i18n dictionaries)
- **Hero H1:** EN "Sahabat AI — Your Smart AI Chatbot Assistant" / ID "Sahabat AI — Asisten Chatbot AI Cerdas untuk Anda". Subhead includes "subscription"/"langganan".
- **Features (4–6):** instant answers, multi-model (OpenAI/OpenRouter/Groq/Arena), chat sessions, bilingual, secure mock billing, dark mode.
- **How it works (3 steps):** Daftar → Pilih paket/langganan → Chat.
- **FAQ (SEO targets):** "Apa itu Sahabat AI?", "Apakah ada paket gratis?", "Bagaimana cara berlangganan?", "Model AI apa yang didukung?", "Apakah aman?".
- **Meta:** `useMeta` helper sets `<title>`, meta description, Open Graph/Twitter, canonical; semantic `h1`/`h2`; image `alt` text.

## Implementation order
1. Scaffold Vite+React; install `react-router-dom`, `tailwindcss @tailwindcss/vite`, `vitest @testing-library/react jsdom`, `@playwright/test`.
2. Tailwind config + dark-mode (class strategy) + global styles + `useMeta` SEO helper.
3. i18n dictionaries (incl. SEO/marketing copy) + `LanguageContext` + toggle (persisted).
4. `ThemeContext` + dark mode toggle (respect `prefers-color-scheme`).
5. `storage.js` + `limits.js` (Free 10 / Pro 500 / Enterprise ∞) + `SubscriptionContext` (mock auth, usage, enforce).
6. Layout: Navbar (lang/theme/plan badges) + Footer + routes.
7. Home (SEO marketing) + Pricing (currency-by-language) + Dashboard (SettingsPanel w/ provider presets + Arena mode).
8. Chat: sessions, rich UX, `mockAI` / `aiClient` / `arenaClient`.
9. Tests: Vitest for limits/i18n/storage; Playwright smoke for chat + signup flow.
10. Validate: `npm run dev`, `npm run test`, `npm run build`.

## Validation
- `npm install`
- `npm run dev` → manually test: language toggle (copy + currency), dark mode, mock chat + streaming,
  real provider mode (key/base/model), experimental Arena mode + fallback, signup, plan limits, upgrade,
  multiple chat sessions, history persistence, responsive + a11y.
- `npm run test` (Vitest) and Playwright smoke.
- `npm run build` succeeds.

## Open questions / risks
- Arena chat mode may be unreliable due to Cloudflare/ToS; treated as experimental with fallback.
- localStorage "auth" is not secure — demo only.
- Exact LMArena endpoint must be captured at implementation time (may change).
