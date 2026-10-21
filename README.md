<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/eb4ce6b2-5235-4f15-a4ae-4458ae2e89b7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Website publishing

Sign in through Console, edit your draft, then use **Review & Publish → Publish to Live Website**. Publishing updates the shared site content immediately for visitors loading or refreshing the site. Drafts are local to the device and never automatically shown to signed-out visitors.

- Preview Draft shows edits before they go live.
- Published version history keeps restore points. Load a version as a draft to review it, or Restore Live to publish it as a new version.
- If another editor published newer changes, export your draft backup and load the latest live version before applying your changes.
- Images uploaded through the console are saved in shared storage; each image must be under 900 KB after processing. SVG uploads are excluded.
- Editor names are self-reported history labels. Authentication uses the shared administrator password.

Runtime settings in Cloudflare Pages production: private `ADMIN_PASSWORD` secret and `SITE_DB` D1 binding to `pid-live-content`. Keep these settings when redeploying. Do not place the password in public content or a `VITE_*` variable.

Checks: `npm run lint`, `npm test`, and `npm run build`. Tests use Node's SQLite module and the actual publishing handlers.
