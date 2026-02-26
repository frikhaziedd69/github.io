# Manga Art - Personalized Guidance Website

## Overview

A responsive business website for a Manga Art mentorship service. It features a landing page with sections for methodology, portfolio, services, and a contact form. Built with a full-stack Node.js/Express + React/Vite setup.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Radix UI, Framer Motion, Wouter (routing)
- **Backend**: Express.js (TypeScript via tsx), serves both API and Vite dev middleware
- **Database**: PostgreSQL via Drizzle ORM (Neon-backed Replit database)
- **Forms**: React Hook Form + Zod validation, EmailJS for email delivery

## Project Structure

```
client/         # React frontend (Vite root)
  src/
    components/ # UI components
    pages/      # Page components
    hooks/      # Custom hooks
    lib/        # Utilities
server/         # Express backend
  index.ts      # Entry point, listens on port 5000
  routes.ts     # API routes
  db.ts         # Drizzle/pg connection
  storage.ts    # Data access layer
  vite.ts       # Vite dev middleware setup
  static.ts     # Production static file serving
shared/         # Shared types/schema between client and server
  schema.ts     # Drizzle table definitions + Zod schemas
  routes.ts     # Shared API route definitions
```

## Running the App

- **Dev**: `npm run dev` — starts Express + Vite HMR on port 5000
- **Build**: `npm run build` — bundles client to `dist/public`, server to `dist/index.cjs`
- **Production**: `node dist/index.cjs`
- **DB schema**: `npm run db:push`

## Database

Uses Replit's built-in PostgreSQL. `DATABASE_URL` is set automatically.

Tables:
- `inquiries` — contact form submissions (id, name, email, phone, country, message, created_at)

## Deployment

Configured for **autoscale** deployment:
- Build: `npm run build`
- Run: `node dist/index.cjs`
