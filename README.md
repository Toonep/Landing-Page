# Bristol — Landing Page

Pre-launch marketing page for Bristol, an intelligence platform for small and mid-sized businesses. Captures email signups and communicates the brand story.

## Stack

- **Next.js 16** (App Router) — hosted on Vercel
- **Vanilla CSS** with Google Fonts (Cinzel, DM Sans, Cormorant Garamond)
- **Mailchimp** for email capture via `/api/subscribe`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Content

All copy lives in `content.js` — headings, paragraphs, and pillar card text. Edit there without touching any component code.

## Mailchimp Setup

Add these three environment variables in Vercel (or a local `.env.local` file):

```
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_LIST_ID=your-audience-id
MAILCHIMP_DC=us14
```

Find them in Mailchimp → Account → Extras → API Keys and Audience → Settings.

Until they're set, signups are accepted and logged server-side.

## Deploying to Vercel

Connect the GitHub repo at [vercel.com](https://vercel.com), select this branch, and Vercel will auto-detect Next.js. No additional configuration needed.
