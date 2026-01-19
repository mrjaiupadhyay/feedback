# Feedback System

A modern, beautiful feedback collection system built with Next.js and ready to deploy on Vercel.

## Features

- ✨ Beautiful, modern UI with gradient design
- 📝 Easy-to-use feedback form
- ⭐ 5-star rating system with emoji indicators
- 📊 View all submitted feedbacks
- 🚀 Optimized for Vercel deployment
- 💾 Simple file-based storage (easily upgradeable to a database)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── feedback/
│   │       └── route.ts          # API endpoints for feedback
│   ├── feedbacks/
│   │   └── page.tsx              # Page to view all feedbacks
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page with feedback form
├── data/
│   └── feedbacks.json            # Storage file (created automatically)
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json                   # Vercel configuration
└── README.md
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will automatically detect Next.js and configure the project

6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "New Project"

3. Import your Git repository or upload the project folder

4. Vercel will auto-detect Next.js settings

5. Click "Deploy"

## Environment Variables

Currently, no environment variables are required. The app uses file-based storage by default.

**Note**: The current file-based storage works for local development and testing. For production on Vercel, consider upgrading to:
- **Vercel KV** (Redis) - Built-in key-value store
- **Vercel Postgres** - Built-in PostgreSQL database
- **MongoDB Atlas** - Free tier available
- **Supabase** - Open-source Firebase alternative

## Upgrading to a Database

To use a database instead of file storage, you can:

1. **Vercel Postgres**: Use Vercel's built-in Postgres database
2. **MongoDB Atlas**: Free tier available
3. **Supabase**: Open-source Firebase alternative
4. **PlanetScale**: MySQL-compatible serverless database

Update the API route (`app/api/feedback/route.ts`) to use your chosen database.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **CSS** - Custom styling with modern design

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
