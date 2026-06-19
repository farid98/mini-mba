# Mini MBA — Claude Code Instructions

## What this is

A standalone educational site: a mini MBA delivered as long-form MDX documents with embedded interactive diagrams. Content is LLM-generated and human-fine-tuned. Each chapter is one MDX file. The site is fully static.



---

## Tech stack

- **Next.js** latest — App Router, TypeScript, static export (`output: 'export'`)
- **Tailwind CSS** v4 — no `tailwind.config.ts`, all theme config in `globals.css` via `@theme`
- **MDX** via `@next/mdx` — official Next.js integration, works cleanly with App Router and static export
- **`gray-matter`** — parse frontmatter from MDX files at build time
- **`@tabler/icons-react`** — named imports only
- **No other dependencies** — no component libraries, no markdown renderers beyond `@next/mdx`

### Bootstrap commands
```bash
npx create-next-app@latest mini-mba --typescript --tailwind --app --no-src-dir --eslint --import-alias "@/*"
cd mini-mba
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter @tabler/icons-react
npm install --save-dev @types/mdx
```

### `next.config.ts`
```ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withMDX(nextConfig)
```

---

## Project structure

```
mini-mba/
├── app/
│   ├── layout.tsx                  # root layout: ThemeProvider, no nav chrome
│   ├── page.tsx                    # home — subject grid
│   ├── globals.css                 # Tailwind v4 @theme + CSS vars
│   └── [subject]/
│       ├── page.tsx                # subject index — chapter list
│       └── [chapter]/
│           └── page.tsx            # chapter page
├── content/
│   ├── strategy/
│   │   ├── 01-what-is-strategy.mdx
│   │   ├── 02-five-forces.mdx
│   │   ├── 03-competitive-advantage.mdx
│   │   ├── 04-corporate-strategy.mdx
│   │   ├── 05-strategic-positioning.mdx
│   │   └── 06-strategy-in-practice.mdx
│   ├── finance/
│   │   ├── 01-financial-statements.mdx
│   │   ├── 02-time-value-of-money.mdx
│   │   ├── 03-valuation.mdx
│   │   ├── 04-capital-structure.mdx
│   │   ├── 05-investment-decisions.mdx
│   │   └── 06-financial-planning.mdx
│   ├── marketing/
│   │   ├── 01-segmentation-targeting-positioning.mdx
│   │   ├── 02-brand-equity.mdx
│   │   ├── 03-pricing.mdx
│   │   ├── 04-go-to-market.mdx
│   │   └── 05-growth.mdx
│   ├── leadership/
│   │   ├── 01-motivation.mdx
│   │   ├── 02-teams.mdx
│   │   ├── 03-leadership-styles.mdx
│   │   ├── 04-organizational-design.mdx
│   │   ├── 05-culture.mdx
│   │   └── 06-leading-change.mdx
│   ├── operations/
│   │   ├── 01-process-thinking.mdx
│   │   ├── 02-lean.mdx
│   │   ├── 03-supply-chain.mdx
│   │   ├── 04-quality.mdx
│   │   └── 05-operations-strategy.mdx
│   ├── economics/
│   │   ├── 01-markets.mdx
│   │   ├── 02-game-theory.mdx
│   │   ├── 03-behavioral-economics.mdx
│   │   └── 04-macro-essentials.mdx
│   └── entrepreneurship/
│       ├── 01-business-model-design.mdx
│       ├── 02-lean-startup.mdx
│       ├── 03-disruption.mdx
│       ├── 04-fundraising.mdx
│       └── 05-scaling.mdx
├── components/
│   ├── mdx/
│   │   ├── Callout.tsx             # insight / warning / definition blocks
│   │   ├── Diagram.tsx             # Mermaid wrapper (client component)
│   │   ├── FiveForces.tsx          # Porter's Five Forces visual
│   │   ├── Matrix2x2.tsx           # 2×2 positioning/strategy matrix
│   │   ├── Example.tsx             # real-world case study block
│   │   └── Takeaways.tsx           # end-of-chapter bullet list
│   ├── layout/
│   │   ├── ThemeProvider.tsx       # 'use client' — matchMedia → dark class on <html>
│   │   ├── PageShell.tsx           # max-w-[720px] reading width wrapper
│   │   └── Breadcrumb.tsx          # Home → Subject → Chapter
│   ├── home/
│   │   ├── SubjectGrid.tsx
│   │   └── SubjectCard.tsx
│   └── chapter/
│       ├── ChapterHeader.tsx       # title, meta row (difficulty, read time)
│       ├── ChapterSidebar.tsx      # subject chapter list, current highlighted
│       ├── ChapterPagination.tsx   # prev / next within subject
│       ├── PrerequisiteBanner.tsx  # "read this first" from frontmatter
│       └── RelatedLinks.tsx        # related chapters card row
├── lib/
│   ├── content.ts                  # fs-based MDX loader: getAllChapters, getChapter
│   └── subjects.ts                 # subject metadata (title, color, description, order)
├── types/
│   └── content.ts                  # ChapterFrontmatter, Subject, Chapter interfaces
├── mdx-components.tsx              # maps MDX component names → React components
└── CLAUDE.md                       # this file
```

---

## Content model

### Frontmatter schema (every MDX file)

```yaml
---
slug: five-forces                          # matches filename without numeric prefix
title: "Industry Analysis: Porter's Five Forces"
subject: strategy                          # matches content/ subdirectory name
order: 2                                   # matches numeric prefix
summary: "One sentence shown on subject index and related cards."
difficulty: foundational                   # foundational | intermediate | advanced
readTime: 12                               # minutes, shown in chapter header
prerequisites:                             # optional, cross-subject slugs
  - strategy/what-is-strategy
related:                                   # optional, cross-subject slugs
  - marketing/pricing
  - economics/game-theory
---
```

### TypeScript types (`types/content.ts`)

```ts
export interface ChapterFrontmatter {
  slug: string
  title: string
  subject: string
  order: number
  summary: string
  difficulty: 'foundational' | 'intermediate' | 'advanced'
  readTime: number
  prerequisites?: string[]   // "subject/slug" format
  related?: string[]         // "subject/slug" format
}

export interface Chapter extends ChapterFrontmatter {
  content: string            // raw MDX string
}

export interface Subject {
  slug: string
  title: string
  description: string
  color: string              // hex, used for left borders and active states
  colorBg: string            // light tint for hover/active backgrounds
  order: number
  chapters: ChapterFrontmatter[]
}
```

### Subject metadata (`lib/subjects.ts`)

Define all 7 subjects here with their display metadata. Chapters are loaded from the filesystem — this file only holds what can't be inferred from the MDX files.

```ts
export const SUBJECTS = [
  { slug: 'strategy',        title: 'Strategy',                   order: 1, color: '#1a4d8a', colorBg: '#eef3fb', description: '...' },
  { slug: 'finance',         title: 'Finance',                    order: 2, color: '#1a6b3a', colorBg: '#edf7f1', description: '...' },
  { slug: 'marketing',       title: 'Marketing',                  order: 3, color: '#7a2d8a', colorBg: '#f8eefb', description: '...' },
  { slug: 'leadership',      title: 'Leadership & Organizations', order: 4, color: '#8a4a1a', colorBg: '#fbf2ee', description: '...' },
  { slug: 'operations',      title: 'Operations',                 order: 5, color: '#1a6b6b', colorBg: '#edf7f7', description: '...' },
  { slug: 'economics',       title: 'Economics',                  order: 6, color: '#5a5a1a', colorBg: '#f7f7ee', description: '...' },
  { slug: 'entrepreneurship',title: 'Entrepreneurship',           order: 7, color: '#8a1a2d', colorBg: '#fbeeef', description: '...' },
]
```

### Content loader (`lib/content.ts`)

Use Node `fs` to read MDX files at build time. Use `gray-matter` to parse frontmatter. Return typed objects.

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ChapterFrontmatter, Chapter } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getAllChapters(subject: string): ChapterFrontmatter[] {
  // read content/{subject}/*.mdx, parse frontmatter, sort by order
}

export function getChapter(subject: string, slug: string): Chapter | null {
  // find the file where frontmatter.slug matches, return frontmatter + content
}

export function getAllSubjectSlugs(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )
}
```

---

## MDX component vocabulary

These are the components available inside every MDX file. All are defined in `components/mdx/` and registered in `mdx-components.tsx`.

### `<Callout type="insight|warning|definition">`
Styled aside block. `insight` = blue tint, `warning` = amber tint, `definition` = neutral.
```mdx
<Callout type="insight">
  Five Forces analyses the industry, not the company.
</Callout>
```

### `<Diagram>`
Renders a Mermaid diagram. Must be a client component (Mermaid runs in the browser).
```mdx
<Diagram>
graph LR
  A[Barrier to Entry] --> B[Economies of Scale]
  A --> C[Brand Loyalty]
</Diagram>
```
Implementation: dynamically import `mermaid` (npm install mermaid), render in a `useEffect`, replace a `<pre>` with the SVG output.

### `<FiveForces />`
Custom visual for Porter's Five Forces (pentagon/radial layout). Accepts 5 props, each with `rating: 'low'|'medium'|'high'` and a `summary` string.
```mdx
<FiveForces
  threat_of_entry={{ rating: 'medium', summary: '...' }}
  supplier_power={{ rating: 'low', summary: '...' }}
  buyer_power={{ rating: 'high', summary: '...' }}
  substitutes={{ rating: 'medium', summary: '...' }}
  rivalry={{ rating: 'high', summary: '...' }}
/>
```

### `<Matrix2x2 />`
Renders a 2×2 grid with labelled axes and quadrant content. Used for BCG, Ansoff, etc.
```mdx
<Matrix2x2
  xAxis={{ label: 'Market Growth', low: 'Low', high: 'High' }}
  yAxis={{ label: 'Market Share', low: 'Low', high: 'High' }}
  quadrants={[
    { label: 'Cash Cows',     position: 'bottom-left',  description: '...' },
    { label: 'Stars',         position: 'top-left',     description: '...' },
    { label: 'Dogs',          position: 'bottom-right', description: '...' },
    { label: 'Question Marks',position: 'top-right',    description: '...' },
  ]}
/>
```

### `<Example title="...">`
A case study block. Title is company/situation name. Children are the body.
```mdx
<Example title="Walmart vs. Suppliers">
  Walmart's 20–30% share of a supplier's revenue creates structural power...
</Example>
```

### `<Takeaways>`
End-of-chapter bulleted summary. Children should be a markdown list.
```mdx
<Takeaways>
  - Analyse the industry before the company.
  - Each force represents a claim on value.
</Takeaways>
```

### Standard MDX (no component needed)
- `## Headings` render as section headers
- `**bold**`, `*italic*`, inline code
- Unordered lists, numbered lists
- `> blockquote` for pull quotes

---

## Routing

| URL | Page | Data source |
|---|---|---|
| `/` | Home — subject grid | `SUBJECTS` + chapter counts from fs |
| `/strategy` | Subject index — chapter list | `getAllChapters('strategy')` |
| `/strategy/five-forces` | Chapter | `getChapter('strategy', 'five-forces')` |

### `generateStaticParams` pattern

```ts
// app/[subject]/[chapter]/page.tsx
export async function generateStaticParams() {
  return getAllSubjectSlugs().flatMap(subject =>
    getAllChapters(subject).map(ch => ({ subject, chapter: ch.slug }))
  )
}
```

---

## Navigation and linking

**Automatic (no frontmatter needed):**
- Breadcrumb: derived from URL params
- Prev/next: derived from `order` field within the same subject
- Subject sidebar: all chapters in the current subject from `getAllChapters(subject)`

**Declared (frontmatter):**
- Prerequisites → `PrerequisiteBanner` at the top of the chapter
- Related → `RelatedLinks` card row at the bottom, after `<Takeaways>`

`PrerequisiteBanner` and `RelatedLinks` receive resolved `ChapterFrontmatter` objects (looked up at build time in the page Server Component), not raw slug strings. Never pass raw slugs to client components.

---

## Design system

### Reading-first layout

The chapter page is a two-column layout on desktop:
- **Left column**: `ChapterSidebar` — fixed subject chapter list, ~220px wide
- **Right column**: chapter content, max-width **720px** (optimal reading width)
- On mobile: sidebar collapses, show only breadcrumb + chapter title

### CSS variables (in `globals.css`)

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f7f7f7;
  --text-primary: #111111;
  --text-secondary: #444444;
  --text-tertiary: #888888;
  --border-color: #e5e5e5;
  --reading-width: 720px;
}
.dark {
  --bg-primary: #141414;
  --bg-secondary: #1e1e1e;
  --text-primary: #f0f0f0;
  --text-secondary: #aaaaaa;
  --text-tertiary: #666666;
  --border-color: #2e2e2e;
}
```

Subject accent colors are injected as inline `style` on the chapter wrapper (same pattern as `mgmt-next`). Each subject has `color` and `colorBg` in `lib/subjects.ts`.

### Typography

- Body: 16px, 1.75 line-height (reading-optimised, not the 13px reference density of mgmt-next)
- Headings: `##` = 20px 600 weight, `###` = 16px 600 weight
- Font stack: system sans (same as mgmt-next, no Google Fonts)

### Difficulty badge colours

- `foundational` → green tint
- `intermediate` → amber tint
- `advanced` → red tint

---

## Build order

1. **Scaffold** — `create-next-app`, install deps, configure `next.config.ts` for MDX + static export
2. **Types and lib** — `types/content.ts`, `lib/subjects.ts`, `lib/content.ts` (fs loader)
3. **MDX setup** — `mdx-components.tsx` with stub components, confirm a sample MDX file renders
4. **MDX components** — `Callout`, `Example`, `Takeaways` first (simple); then `Diagram` (needs mermaid); then `FiveForces` and `Matrix2x2` (custom visuals)
5. **Home page** — `SubjectCard`, `SubjectGrid`, `app/page.tsx`
6. **Subject index page** — `app/[subject]/page.tsx`, `ChapterList`, chapter cards
7. **Chapter page shell** — layout, `ChapterHeader`, `ChapterSidebar`, breadcrumb, pagination
8. **Chapter page content** — wire MDX rendering with `next/dynamic` for the chapter body
9. **Linking** — `PrerequisiteBanner`, `RelatedLinks` (resolve slugs at build time)
10. **Content** — generate all 35 chapters as MDX files with real content
11. **Polish** — dark mode, mobile layout, `generateMetadata`, 404

---

## Content generation instructions

When generating MDX chapter files:

- Use the exact frontmatter schema defined above. Every field is required except `prerequisites` and `related`.
- `slug` must match the filename without the numeric prefix (e.g. file `02-five-forces.mdx` → `slug: five-forces`)
- Body should be 1200–2000 words of real content, not placeholder text
- Every chapter must include at least one `<Callout>`, one `<Diagram>` or framework component, and end with `<Takeaways>`
- `<Diagram>` code must be valid Mermaid syntax — test mentally before writing
- `<FiveForces>` is used only in strategy/five-forces. `<Matrix2x2>` can be used in any chapter where a 2×2 framework applies
- `related` slugs must point to real files that exist in the content directory
- Write as a teacher explaining to a smart non-expert — clear, opinionated, concrete examples

---

## Key implementation notes

**MDX + static export**: `@next/mdx` with App Router works with `output: 'export'` without special config. Do not use `next-mdx-remote` — it requires server-side rendering.

**Mermaid in static export**: Mermaid must run client-side. The `<Diagram>` component must be `'use client'`, dynamically import `mermaid`, and run `mermaid.initialize()` + `mermaid.run()` in a `useEffect`. Wrap it in a `<Suspense>` boundary in the MDX component registry.

**`fs` in App Router**: `lib/content.ts` uses Node `fs`. This works in Server Components and in `generateStaticParams` but must never be imported into a Client Component.

**MDX component registration**: All components used in MDX files must be in `mdx-components.tsx` (the file Next.js looks for automatically). They don't need to be imported in individual MDX files.

**Numeric prefix in filenames**: The `01-` prefix controls sort order but is not part of the URL. The URL slug comes from the frontmatter `slug` field, not the filename. `getAllChapters` should sort by the numeric prefix, then expose `slug` for URL generation.

**`gray-matter` with MDX**: `gray-matter` strips the frontmatter and returns the body. Pass the body (not the full file) to `@next/mdx` for rendering. The frontmatter is available as a plain object for use in Server Components.
