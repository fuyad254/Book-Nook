/**
 * Shared base URL for the Express API.
 *
 * `NEXT_PUBLIC_*` is required because Client Components ("use client") can only
 * read environment variables with that prefix. It is also available to Server
 * Components, so every fetch in the app uses the same value.
 *
 * Set `NEXT_PUBLIC_API_URL` in `.env` locally and in Vercel project settings
 * for production. The local default keeps `npm run dev` working without env.
 */
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/+$/, "");
