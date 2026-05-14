# Vikash Kumar Singh - Portfolio

Personal portfolio site built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Redux Toolkit and iron-session.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui primitives |
| State | Redux Toolkit + RTK Query |
| Session | iron-session (encrypted cookie, no DB) |
| Cookies | cookies-next (theme, consent) |
| Animations | Framer Motion |
| Icons | lucide-react |
| Email | Resend |
| Deploy | Vercel |

## Local setup

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Copy env file and fill in values
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write .
```


## Project structure

```
src/
  app/                    # App Router pages and API routes
    api/github/           # GitHub proxy route (keeps token server-side)
    api/contact/          # Contact form handler (rate-limited via iron-session)
    api/session/          # Visitor session CRUD
    projects/[slug]/      # Dynamic project detail pages
    upcoming/             # Roadmap page
    open-source/          # GitHub contribution feed
    contact/              # Contact form page
  components/
    sections/             # Hero, About, Highlights, Competencies, Experience, Education
    projects/             # ProjectCard, ProjectFilters, ProjectGrid
  lib/
    session.ts            # iron-session config and SessionData type
    github.ts             # Server-side GitHub API client
    projects.ts           # Curated project metadata
    cn.ts                 # clsx + tailwind-merge helper
  store/
    index.ts              # configureStore
    hooks.ts              # useAppDispatch / useAppSelector
    slices/               # uiSlice, themeSlice, projectsSlice
    api/githubApi.ts      # RTK Query endpoint
  types/index.ts          # Shared TypeScript types
```
