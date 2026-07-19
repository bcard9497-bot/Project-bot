# Sahabat AI

Website chatbot AI dwibahasa (Indonesia/English) dengan sistem **langganan** mock
(frontend-only). Dibuat dengan **React + Vite + Tailwind CSS v4**.

> Ini adalah proyek **demo**. Autentikasi & data disimpan di browser (localStorage) dan
> **tidak aman** untuk produksi.

## Fitur
- **Landing page SEO** — hero, fitur, cara kerja, harga, FAQ, CTA (dwibahasa).
- **Chat AI** — antarmuka kaya: markdown + code block, tombol salin, indikator mengetik,
  stop/retry, streaming, **banyak sesi** (buat/ganti nama/hapus), ekspor `.txt`, riwayat di localStorage.
- **3 mode AI**:
  - `mock` (default): jawaban simulasi, tanpa kunci/koneksi.
  - `provider`: OpenAI-compatible (kunci API + base URL + model). Preset: OpenAI, OpenRouter, Groq, Custom.
  - `arena` (eksperimental): mencoba endpoint LMArena; fallback ke simulasi bila diblokir.
- **Langganan (mock)** — Free (10 pesan/hari), Pro (500/hari), Enterprise (tak terbatas).
  Harga mengikuti bahasa (IDR untuk ID, USD untuk EN). Batas harian ditegakkan.
- **Dwibahasa** dengan toggle (persisten) + **mode gelap/terang**.

## Menjalankan
```bash
npm install
npm run dev        # buka http://localhost:5173
```

## Build & Test
```bash
npm run build      # build produksi ke dist/
npm run preview    # pratinjau hasil build
npm run test       # unit test (Vitest): limits, i18n, storage
npm run e2e        # smoke test (Playwright) — jalankan `npx playwright install` sekali dahulu
```

## Struktur
```
src/
  i18n/         translations.js, LanguageContext.jsx
  context/      ThemeContext.jsx, SubscriptionContext.jsx
  lib/          storage, limits, mockAI, aiClient, arenaClient, markdown, useMeta, useSessions
  components/   Navbar, Footer, Icon, LanguageToggle, ThemeToggle, PlanBadge,
                SignupModal, PricingCards, SettingsPanel, Message, ChatInput, SessionList
  pages/        Home, Chat, Pricing, Dashboard
  test/         unit tests (Vitest)
e2e/            smoke.spec.js (Playwright)
```

## Catatan Mode Arena (LMArena)
LMArena **tidak** menyediakan API chat publik dan dilindungi Cloudflare/captcha, jadi
panggilan langsung dari browser kemungkinan besar diblokir (CORS). Endpoint di
`src/lib/arenaClient.js` adalah placeholder — perlu di-*reverse-engineer* dari DevTools
Network lmarena.ai. Jika gagal, aplikasi otomatis beralih ke mode simulasi. Gunakan dengan
risiko sendiri (kemungkinan melanggar ToS LMArena).
