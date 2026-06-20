# People Page Redesign — Design Spec

- **Date:** 2026-06-20
- **Page:** `/people/` (`_pages/profiles.md`)
- **Status:** Approved, ready for implementation planning

## Context

The `/people/` page reuses al-folio's generic `projects` collection. Each member is a
`_projects/*.md` file with `title`, an HTML `<br>`-delimited `description`, `img`, optional
`redirect`, `importance`, `category`, and `horizontal`. The page (`_pages/profiles.md`) loops
`site.projects` grouped by category — Principal Investigator, Graduate Students, Undergraduate
Students, Alumni — and renders Bootstrap cards in a uniform 3-column grid via the shared
`_includes/projects.liquid` / `projects_horizontal.liquid` includes.

Roster at time of writing (17 entries): 1 PI, 3 graduate, 5 undergraduate, 7 alumni.

## Goals

User-prioritized pain points to fix:

1. **Compact alumni** — alumni currently use the same large photo cards as current members; the
   list will keep growing and crowd out current people.
2. **Polished look with consistent photos** — plain Bootstrap cards; source photos vary in crop and
   aspect ratio, so the grid looks ragged.
3. **Stronger hierarchy** — the PI should clearly stand out; today it blends into the same grid.

## Non-Goals (YAGNI)

- Migrating people off the `_projects` collection.
- Rewriting/normalizing every bio's wording.
- Contact-icon rows (email/GitHub/Scholar) on every member card.
- Alumni search/filter, social-link backfilling.
- Any change to other pages or the shared `projects.liquid` includes.

## Chosen Design — "Avatar Roster" (Direction B)

A visual + layout refresh of `/people/` only. The `_projects` collection stays as the data source.
The shared `projects.liquid` / `projects_horizontal.liquid` includes are **not modified** (also used
by `_layouts/cv.liquid`). New people-specific includes and a people stylesheet are added instead.

### Page structure (`_pages/profiles.md`)

Four bands replace the uniform grid:

1. **PI hero** — full-width band: large circular photo, name, title lines, and link pills
   (Google Scholar, email).
2. **Graduate Students** — section heading + circular-avatar grid. Each cell: circular photo, name,
   one-line role.
3. **Undergraduate Students** — same avatar-grid treatment.
4. **Alumni** — compact rows (mini avatar + name + one-line note), **grouped under year
   sub-headings** (2025, 2024, …), most recent year first.

### New includes (`_includes/`)

- `people_hero.liquid` — PI band. Renders title lines from the entry and optional `scholar`/`email`
  link pills.
- `people_avatar.liquid` — one circular-avatar cell (name + role). Used by both grad and UG grids.
- `people_alum.liquid` — one compact alumni row (mini avatar + name + one-line note).

`profiles.md` loops `site.projects` filtered by `category`, sorts by `importance`, and dispatches to
the appropriate include. Alumni are additionally grouped by `year` (descending) before rendering
rows.

### Data model changes (additive, optional — no forced rewrites)

Existing fields are unchanged: `title`, `description`, `img`, `redirect`, `importance`, `category`.
`description` remains the full detail shown on each person's own profile page.

New optional fields:

| Field | Applies to | Purpose | Fallback |
|-------|-----------|---------|----------|
| `role` | any member | short label under the avatar (e.g., "PhD Student") | first `<br>` segment of `description` |
| `year` | alumni | graduation year, used for grouping | entry omitted from a year group / sorted last if absent |
| `email` | PI entry | hero email pill | not rendered if absent |
| `scholar` | PI entry | hero Scholar pill | `redirect` (already the Scholar URL) |

**Alumni `year` backfill** (from existing description text):

| Member | Year |
|--------|------|
| Chaoran Sui | 2024 |
| Haoqi Lyu | 2024 |
| Minghao Deng | 2025 |
| Weijian Zhang | 2025 |
| Xunhe Liu | 2025 |
| Yue Song | 2025 |
| Zhirui Xiang | 2025 |

### Behavior

- Click target is unchanged: an avatar links to `redirect` if set, otherwise to the member's own
  profile page.
- PI hero pills link to Scholar and (if present) email.

### Styling (`_sass/_people.scss`, imported via `assets/css/main.scss`)

- New partial `_sass/_people.scss`; add `"people",` to the `@import` list in `assets/css/main.scss`.
- **Circular avatars:** `aspect-ratio: 1/1; object-fit: cover; border-radius: 50%` so every photo is
  normalized to the same circle regardless of original crop — the fix for ragged photos. Reuses
  al-folio's `figure.liquid` responsive-image pipeline.
- **Responsive grid:** ~4–5 columns on desktop → 3 on tablet → 2 on mobile.
- **Theme-aware:** accents use al-folio's existing `--global-theme-color`; all colors use the theme's
  CSS variables so light and dark mode both work.
- **PI hero** is visually distinct (larger photo, heavier name, subtle card surface) to establish
  hierarchy.

## Files Touched

**Create:**
- `_includes/people_hero.liquid`
- `_includes/people_avatar.liquid`
- `_includes/people_alum.liquid`
- `_sass/_people.scss`

**Modify:**
- `_pages/profiles.md` — new four-band rendering logic.
- `assets/css/main.scss` — add `"people"` to the `@import` list.
- `_projects/*.md` (alumni) — add `year`; optionally add `role` to current members and
  `email`/`scholar` to the PI entry.

**Unchanged:** `_includes/projects.liquid`, `_includes/projects_horizontal.liquid`, the `_projects`
collection config.

## Verification

- `/people/` renders four bands: PI hero, Graduate grid, Undergraduate grid, year-grouped Alumni.
- All avatars are uniform circles regardless of source photo aspect ratio.
- Layout reflows cleanly at desktop / tablet / mobile widths.
- Page is legible in both light and dark mode.
- Other pages (notably anything using `cv.liquid`) are visually unaffected.
