# 1hSona-Image-Sharing

Interactive **Sona × 1Health** demo (image sharing → provider network) built as a single React module plus a minimal Vite shell.

**Primary demo (shipped in the app):** `sona-1health-demo3.jsx` — latest multi-step flow wired in `src/App.jsx`.

**Other versions:** `sona-1health-demo2.jsx`, `sona-1health-demo.jsx` — swap the import in `src/App.jsx` to preview locally.

## Deploy (Vercel)

1. [Import the GitHub repo](https://vercel.com/new) **neiltachin/1hSona-Image-Sharing** (or your fork).
2. Leave defaults: **Framework Preset Vite**, **Build** `npm run build`, **Output** `dist`.
3. Deploy — Vercel will give you a shareable `*.vercel.app` URL.

CLI (after `vercel login`): from this folder run `vercel --prod`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (default **http://localhost:5173**).

```bash
npm run build   # production bundle
npm run start   # preview built `dist/` (run build first)
```

_Last updated: 2026-04-18 (v3 + Vercel notes)._
