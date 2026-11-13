<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Book Nook

A small Next.js App Router storefront project (assignment), currently at the scaffolding stage: a root layout with navbar/footer and a placeholder home page.

## Stack

- **Next.js 16.4.6** (App Router, Turbopack) with **React 19.3**
- **TypeScript 5** in `strict` mode
- **Tailwind CSS 4.3** loaded through `@tailwindcss/turbopack` (see `next.config.ts`)
- **ESLint 9** via `eslint-config-next` (core-web-vitals + TypeScript rules)
- React Compiler enabled (`reactCompiler: true`); do not hand-write `useMemo`/`useCallback` for compiler-eligible code

## Commands

```bash
npm run dev    # start dev server (Turbopack)
npm run build  # production build
npm start      # serve production build
npm run lint   # eslint
```

There is no test runner configured yet. Verify changes with `npm run build` and `npm run lint`.

## Structure

```
src/
  app/
    layout.tsx    # root layout: fonts, metadata, Navber + Footer wrappers
    page.tsx      # "/" placeholder page
    globals.css   # Tailwind import + theme tokens
    favicon.ico
  component/
    nav&footer/
      navber.tsx  # navbar (note spelling: "Navber")
      footer.tsx
  assets/logo.png
```

- `@/*` maps to `./src/*` (see `tsconfig.json`). Import components as `@/component/nav&footer/navber`.
- The `nav&footer` folder contains `&`; quote paths in shell commands.
- Keep the navbar component name `Navber` unless renaming consistently across `layout.tsx` and the file.

## Conventions and notes

- Global chrome belongs in `src/app/layout.tsx`; page-level UI goes in route folders under `src/app/`.
- Use Tailwind utility classes for styling. There is **no** `tailwind.config.*`; extend the theme in `src/app/globals.css` with `@theme` blocks and CSS variables (`--background`, `--foreground`, `--font-sans`, `--font-mono`).
- `layout.tsx` sets `data-theme="light"` on `<html>` while `globals.css` also has a `prefers-color-scheme: dark` block — decide on one theming strategy before adding theme switching.
- Metadata in `src/app/layout.tsx` is still the create-next-app default; update it when adding real pages.
- No data layer, API routes, or state management exists yet. If adding one, prefer Server Components and route handlers in `src/app` before introducing client state libraries.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback`; check the bundled Next docs before changing these or using APIs they affect.
- Feature work should be developed on the current `main` branch; the initial commit history is `set up frontend` → `Initial commit from Create Next App`.
