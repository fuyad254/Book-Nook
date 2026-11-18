# Book Nook

Book Nook is a small book-sharing storefront built with the Next.js App Router. Members can browse the community library, add and manage their own books, borrow and return books, and sign in with an email/password or Google account.

This repository is the **frontend** (Next.js). The REST API it talks to lives in the sibling folder **`../book-nook-sever`** (Express + MongoDB). Both apps share the same MongoDB database (`bookNook`) but use different collections.

---

## Table of contents

- [What is included](#what-is-included)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and configuration](#installation-and-configuration)
- [Running locally](#running-locally)
- [Available scripts](#available-scripts)
- [Pages and access control](#pages-and-access-control)
- [Authentication and JWT flow](#authentication-and-jwt-flow)
- [Backend API endpoints](#backend-api-endpoints)
- [Toast notifications](#toast-notifications)
- [Images and performance](#images-and-performance)
- [Styling and theming](#styling-and-theming)
- [Next.js configuration](#nextjs-configuration)
- [Verification and troubleshooting](#verification-and-troubleshooting)
- [Deployment notes](#deployment-notes)

---

## What is included

- **Home page** (`/`): Swiper hero banner, latest books, reader reviews, and "why choose us" sections.
- **Library** (`/all-books`): full book grid fetched from the Express API.
- **Book details** (`/book/[sulg]`): cover, metadata, availability, and a borrow dialog. Login required.
- **Authentication**: email/password and Google sign-in through Better Auth; registration, login, profile, and sign-out.
- **Protected member areas**: add a book, my books (edit/delete), my borrows (return), profile.
- **JWT authorization**: the frontend requests a JWT from Better Auth and sends it as `Authorization: Bearer <token>` to private API endpoints; the API verifies it against the Better Auth JWKS.
- **Toast feedback**: `react-hot-toast` is mounted globally and used for every successful or failed user action.
- **Responsive Tailwind UI**: dark green/emerald theme, fixed navbar, footer, loading skeletons, and dialogs.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router, Turbopack) |
| UI | React 19.3, TypeScript 5 (strict), Tailwind CSS 4.3, React Icons, Swiper |
| Authentication | Better Auth 1.7 with email/password, Google provider, MongoDB adapter, JWT plugin |
| Database driver | MongoDB Node driver 7 |
| Toasts | react-hot-toast 2.6 |
| Linting | ESLint 9 with `eslint-config-next` |
| API server | Express 5, `jose` (JWT verification), MongoDB (separate project) |

React Compiler is enabled, so there is no need to hand-write `useMemo`/`useCallback` for compiler-eligible code.

## Architecture

```
Browser
   |
   v
Next.js app (http://localhost:3000)
   |-- Better Auth routes  /api/auth/[...all]
   |     |-- session + cookie cache (MongoDB)
   |     |-- JWT endpoint  /api/auth/token
   |     `-- JWKS endpoint /api/auth/jwks
   |
   |-- Proxy (src/proxy.ts)  -> optimistic route protection
   |-- Server Components     -> real session validation + data fetching
   |
   v
Express API (http://localhost:5000)
   |-- verifyToken middleware for private routes (jose + JWKS)
   `-- book / borrow collections in MongoDB
```

The Next.js app reads authentication data from MongoDB through Better Auth. The Express API reads/writes books and borrows in the same database. The API never reads the session cookie; it trusts only the JWT signed by Better Auth.

## Project structure

```
book-nook/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, navbar, footer, global toaster
│   │   ├── globals.css             # Tailwind import + base color tokens
│   │   ├── page.tsx                # Home page
│   │   ├── not-found.tsx           # Custom 404
│   │   ├── all-books/              # Public library
│   │   ├── book/[sulg]/            # Book details (protected, dynamic route)
│   │   ├── add-book/               # Add book form (protected)
│   │   ├── my-books/               # User's books + edit/delete (protected)
│   │   ├── my-borrows/             # User's borrows + return (protected)
│   │   ├── profile/                # Account page (protected by proxy)
│   │   ├── login/                  # Sign in
│   │   ├── registration/           # Sign up
│   │   └── api/auth/[...all]/      # Better Auth catch-all handler
│   ├── component/
│   │   ├── nav&footer/             # Navbar, footer, user dropdown/sign-out
│   │   ├── homePage/               # Banner, latest books, reviews, why-us
│   │   ├── cards/                  # Book/borrow cards
│   │   ├── Button/                 # Borrow, edit, return buttons
│   │   └── toast/toaster.tsx       # Global react-hot-toast host
│   ├── lib/
│   │   ├── auth.ts                 # Server-side Better Auth instance
│   │   └── auth-client.ts          # Browser-side auth client (JWT plugin)
│   ├── assets/logo.png             # Logo used in navbar and footer
│   ├── proxy.ts                    # Route protection (Next.js "middleware" replacement)
│   └── type/book.ts                # IBook / IBorrow types
├── next.config.ts                  # Turbopack/Tailwind, caching, React Compiler flags
├── tsconfig.json                   # "@/*" maps to "./src/*"
├── .env                            # Local secrets (never committed)
└── README.md                       # This file
```

> Note: the folder name `nav&footer` contains `&`; quote paths containing it in shell commands. The navbar component is intentionally named `Navber`.

## Prerequisites

- Node.js (20+) and npm
- A MongoDB connection (Atlas or local)
- Google OAuth client ID/secret (for Google sign-in)
- The Express API running on port 5000 (or a matching `NEXT_PUBLIC_API_URL`)
- If deploying, a publicly reachable URL for the Better Auth JWKS endpoint

## Installation and configuration

```bash
npm install
```

Create a `.env` file in the project root (there is already a local one; do not commit it):

```env
# Better Auth server
BETTER_AUTH_SECRET=replace-with-a-long-random-string
BETTER_AUTH_URL=http://localhost:3000

# MongoDB used by Better Auth (users, sessions, accounts, JWKS)
MONGODB_CONNECT_URI=mongodb+srv://user:password@host/dbname

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: override the auth base URL used by the browser client
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Optional: Express API base URL (defaults to http://localhost:5000)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable | Used in | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Better Auth | Signs/encrypts auth data; must be set in production |
| `BETTER_AUTH_URL` | Better Auth | Public base URL of this Next.js app |
| `MONGODB_CONNECT_URI` | `src/lib/auth.ts` | MongoDB connection for auth collections |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `src/lib/auth.ts` | Google OAuth credentials |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `src/lib/auth-client.ts` | Browser auth base URL; falls back to current origin |
| `NEXT_PUBLIC_API_URL` | `src/lib/api.ts` (used by all API call sites) | Express API base URL; defaults to `http://localhost:5000` |

All frontend fetches import `API_URL` from `src/lib/api.ts`. Use the `NEXT_PUBLIC_` prefix: Client Components cannot read server-only variables, which otherwise produces requests to `/undefined/...` on the frontend origin.

The API project (`../book-nook-sever`) has its own `.env` with `MONGODB_URI` pointing at the same database.

For Google sign-in, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in Google Cloud Console.

## Running locally

Open two terminals:

```bash
# Terminal 1 - Next.js frontend
cd book-nook
npm run dev
# http://localhost:3000
```

```bash
# Terminal 2 - Express API
cd ../book-nook-sever
npm install
npx nodemon index.js
# http://localhost:5000
```

The API uses ES module `import` syntax; if Node treats `index.js` as CommonJS, make sure the server package is configured for modules (`"type": "module"` in its `package.json`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Turbopack development server |
| `npm run build` | Production build (also runs TypeScript checks) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

There is no test runner configured yet.

## Pages and access control

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/all-books` | Browse all books | Public |
| `/book/[sulg]` | Book detail and borrow dialog | **Login required** |
| `/add-book` | Add a book | **Login required** |
| `/my-books` | Manage books you added | **Login required** |
| `/my-borrows` | Books you borrowed / return | **Login required** |
| `/profile` | Account information | **Login required** |
| `/login`, `/registration` | Sign in / sign up | Guests only (signed-in users are redirected home) |
| `/api/auth/[...all]` | Better Auth endpoints (`/token`, `/jwks`, sign-in, etc.) | Public/auth endpoints |

`src/proxy.ts` runs before page rendering on the protected paths. If no session cookie exists it redirects to `/login?next=<original-url>`; after login the user is returned to that URL. The proxy is only an optimistic cookie check, so protected data-loading code also calls `auth.api.getSession({ headers: await headers() })` and redirects if the session is invalid.

## Authentication and JWT flow

1. A user signs in or registers through `authClient` in `src/lib/auth-client.ts`. Better Auth creates a session and sets an HTTP-only cookie.
2. `src/lib/auth.ts` configures email/password + Google providers, the MongoDB adapter, the JWT plugin, and a JWT cookie cache (`session.cookieCache.strategy = "jwt"`, 24 h max age).
3. On every request to a protected page, the proxy checks for the session cookie and redirects guests to login.
4. Server Components call `auth.api.getSession({ headers: await headers() })` for real validation before loading private data.
5. Before calling a private API route, the frontend obtains a JWT:
   - Client Components: `const { data } = await authClient.token()`.
   - Server Components: `await auth.api.getToken({ headers: await headers() })`.
6. The JWT is sent in the `Authorization: Bearer <token>` header.
7. The Express API's `verifyToken` middleware verifies it with `jose.jwtVerify` using a remote JWKS set from `http://localhost:3000/api/auth/jwks`.

API routes using `verifyToken`: `GET /book/:id`, `GET /my-books/:email`, `GET /borrows/:email`, `POST /add-book`, and `PATCH /my-books/:id`. All other API routes are public.

> If the API returns 401/500 for a signed-in user, check that both servers are running, that `BETTER_AUTH_SECRET` is identical in the auth process, and that the API can reach the JWKS URL.

## Backend API endpoints

Base URL: `http://localhost:5000` (configurable with `NEXT_PUBLIC_API_URL`).

| Method | Endpoint | JWT | Used for |
| --- | --- | --- | --- |
| `GET` | `/books` | No | All books on the library page |
| `GET` | `/book/:id` | Yes | Book details |
| `GET` | `/latest-books` | No | Latest-books section on the home page |
| `GET` | `/my-books/:email` | Yes | Books added by a user |
| `GET` | `/borrows/:email` | Yes | Borrow history for a user |
| `POST` | `/add-book` | Yes | Add a book |
| `PATCH` | `/my-books/:id` | Yes | Edit a book |
| `DELETE` | `/my-books/:id` | No | Delete a book |
| `POST` | `/my-borrow` | No | Borrow a book (409 when duplicated) |
| `PATCH` | `/my-borrow/:id` | No | Decrease available copies |
| `DELETE` | `/my-borrow/:id` | No | Remove a borrow record |
| `PATCH` | `/my-borrow-return/:id` | No | Increase available copies on return |

## Toast notifications

`react-hot-toast` is mounted once in the root layout via `src/component/toast/toaster.tsx`. That client component configures the dark, emerald-styled toast appearance; all pages and components share it.

Toasts are shown for:

| Action | Success | Failure |
| --- | --- | --- |
| Email login / registration | Welcome message | Auth error message |
| Google sign-in | — (browser redirects) | OAuth error message |
| Sign out | Confirmation | Error message |
| Add book | Confirmation | Error message |
| Edit book | Confirmation / "No changes detected" | Error message |
| Delete book | Confirmation | Error message |
| Borrow book | Confirmation | Server/inline error message |
| Return book | Confirmation | Error message |

Use it anywhere in a Client Component:

```tsx
import toast from "react-hot-toast";

toast.success("Saved!");
toast.error("Something went wrong.");
```

Successful mutations use `router.refresh()` instead of `window.location.reload()` so the toast stays visible while the data updates.

## Images and performance

- All images use `next/image`, which generates responsive `srcset` values and optimizes remote images.
- The navbar logo is a static import (`src/assets/logo.png`) and is the first large paint on most pages. It uses `loading="eager"` so the browser starts downloading it immediately; this removes the LCP console warning that appears when Next.js detects a lazy-loaded LCP image. (`priority` is deprecated in Next.js 16.)
- The footer logo stays lazy-loaded because it is below the fold.
- Remote avatars from arbitrary HTTPS URLs are allowed by `images.remotePatterns` in `next.config.ts`; avatars use `unoptimized` and an `onError` fallback to initials.
- Book covers use `fill` or fixed dimensions with `sizes`, and the detail-page cover is eagerly loaded.

## Styling and theming

- Tailwind CSS 4 is loaded through `@tailwindcss/turbopack` in `next.config.ts`. There is **no** `tailwind.config.*`; extend the theme in `src/app/globals.css` with `@theme` and CSS variables.
- The palette is green/emerald with dark overlays; most styling lives in Tailwind utility classes.
- `layout.tsx` sets `data-theme="light"` on `<html>`. Pick one theming strategy before adding a theme switcher.
- The Geist and Geist Mono fonts are loaded with `next/font/google` and exposed as CSS variables.

## Next.js configuration

`next.config.ts` enables:

- `cacheComponents: true` — partial prerendering with streamed dynamic content; request-time APIs such as `headers()` must be used inside Suspense boundaries where applicable.
- `partialPrefetching: true` — smaller prefetch payloads.
- `reactCompiler: true` — automatic React memoization.
- `experimental.agentFeedback` — development feedback hook.
- `images.remotePatterns` for external HTTPS avatars.

Proxy is the Next.js 16 replacement for the deprecated `middleware` file convention; the export is named `proxy`.

## Verification and troubleshooting

```bash
npm run lint
npm run build
```

| Symptom | Likely cause / fix |
| --- | --- |
| "We couldn't load the books right now" | The Express API on port 5000 is not running, or `NEXT_PUBLIC_API_URL` is wrong |
| 401 / 500 on private API calls | Missing Bearer token, invalid JWT, or API cannot reach `/api/auth/jwks`; check both servers and `BETTER_AUTH_SECRET` |
| Redirected to login on a page you just signed in to | Session cookie expired or was cleared; sign in again |
| Google sign-in fails | Wrong client ID/secret or missing `http://localhost:3000/api/auth/callback/google` redirect URI |
| LCP warning about the logo image | Ensure the navbar logo uses `loading="eager"` (already configured) |
| Types like `IBook` not found | Use the `@/` path alias (`@/type/book`), mapped to `src/*` in `tsconfig.json` |

## Deployment notes

- Set all environment variables in the hosting provider; never commit `.env`.
- Deploy the Express API first and set `NEXT_PUBLIC_API_URL` to its public URL. `NEXT_PUBLIC_*` values are inlined at build time, so **redeploy after changing them**.
- The API also needs `CLIENT_URL` set to the deployed frontend origin so it can fetch `<CLIENT_URL>/api/auth/jwks` for JWT verification.
- The API's JWKS URL (`<BETTER_AUTH_URL>/api/auth/jwks`) must be publicly reachable and must match the frontend origin.
- Configure CORS on the API for the deployed frontend origin.
- Add the production Google OAuth callback URL in Google Cloud Console.
- Run `npm run build` and `npm start` (or deploy to a provider that runs the build automatically).
