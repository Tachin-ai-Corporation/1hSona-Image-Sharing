# 1hSona-Image-Sharing

**Live demo:** [1h-sona-image-sharing.vercel.app](https://1h-sona-image-sharing.vercel.app/)

**Repository:** [Tachin-ai-Corporation/1hSona-Image-Sharing](https://github.com/Tachin-ai-Corporation/1hSona-Image-Sharing)

Interactive **Sona × 1Health** demo (image sharing → provider network) built as a single React module plus a minimal Vite shell.

**Primary demo (shipped in the app):** `sona-1health-demo3.jsx` — latest multi-step flow wired in `src/App.jsx`.

**Other versions:** `sona-1health-demo2.jsx`, `sona-1health-demo.jsx` — swap the import in `src/App.jsx` to preview locally.

## Deploy (Vercel)

Production is deployed from this repo; the current production URL is linked at the top of this README.

To redeploy or add a preview: connect **[Tachin-ai-Corporation/1hSona-Image-Sharing](https://github.com/Tachin-ai-Corporation/1hSona-Image-Sharing)** in the [Vercel dashboard](https://vercel.com/new) (or use the linked Git integration). Use **Framework Preset Vite**, **Build** `npm run build`, **Output** `dist` (matches `vercel.json`).

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

## Product spec

See `sona-1health-demo-prd.md` for the internal PRD aligned to the demo screens.

_Last updated: 2026-04-18 (org repo + production URL + PRD)._
