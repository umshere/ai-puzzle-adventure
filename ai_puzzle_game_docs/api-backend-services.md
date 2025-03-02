# AI-Assisted Creative Puzzle Adventure – API & Backend Services

## 1. Next.js API Routes Overview

The backend is built with **Next.js API Routes**, serving as the central hub for procedural level generation, score submissions, and AI integration via **OpenRouter**. This approach leverages Vercel's serverless functions (Free Tier) for cost-effective deployment.

## 2. API Endpoints

### 2.1. Health Check

**GET /api/health** – Returns `{ "status": "ok" }`.

### 2.2. Generate AI-Powered Level

**POST /api/generate** – Calls OpenRouter API for puzzle layout with local fallback.

- Uses environment variables for API authentication
- Returns JSON structure with level layout

### 2.3. Submit Score

**POST /api/score** – Saves user score to SQLite (dev) or Vercel Postgres (production).

## 3. Data Storage

- Local Development: SQLite
- Production: Vercel Postgres (Free Tier) via Prisma ORM
