# People Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/people/` as an "avatar roster" — a PI hero band, circular-avatar grids for current students, and a year-grouped compact alumni list — without changing the underlying `_projects` data model or the shared `projects.liquid` includes.

**Architecture:** `_pages/profiles.md` is rewritten to loop `site.projects` by category and dispatch to three new people-specific includes (`people_hero`, `people_avatar`, `people_alum`). A new `_sass/_people.scss` partial styles them using al-folio's theme CSS variables so light/dark mode both work. Member markdown gets two additive optional fields: `role` (short grid label) and `year` (alumni grouping).

**Tech Stack:** Jekyll (al-folio theme), Liquid templates, SCSS, jekyll-imagemagick responsive images, Bootstrap base.

---

## Verification Approach (read first)

This is a static site with **no unit-test framework** for templates. Each task's "test" is therefore concrete and runnable:

- **Build:** `bundle exec jekyll build` (same command as `bin/cibuild`). Generated output lands in `_site/`.
- **Structural assertion:** `grep` the generated `_site/people/index.html` (or compiled `_site/assets/css/main.css`) for expected markers. A failing grep is "red"; a passing grep is "green".
- **Visual check:** `bundle exec jekyll serve` then open `http://localhost:4000/people/`. Toggle the light/dark switch in the navbar and narrow the window to confirm responsiveness.

If a build fails on imagemagick, ensure imagemagick is installed and on PATH (al-folio `INSTALL.md`). Builds are full (non-incremental) and may take some time — that is expected.

> Throughout, `bundle exec jekyll build` writes to `_site/`. `_site/` is already git-ignored, so it never appears in commits.

---

## File Structure

**Create:**
- `_includes/people_hero.liquid` — PI hero band. Input: `project` (the PI entry) in scope. Output: photo + name + description + Scholar/email pills.
- `_includes/people_avatar.liquid` — one current-member grid cell. Input: `project` in scope. Output: linked circular avatar + name + role.
- `_includes/people_alum.liquid` — one compact alumni row. Input: `project` in scope. Output: linked mini avatar + name + one-line note.
- `_sass/_people.scss` — all styling for the above. One responsibility: the people page.

**Modify:**
- `_projects/*.md` — add `role` (current members), `year` (alumni); update the PI entry.
- `_pages/profiles.md` — new four-band rendering logic.
- `assets/css/main.scss` — add `"people"` to the `@import` list.

**Unchanged:** `_includes/projects.liquid`, `_includes/projects_horizontal.liquid`, `_includes/figure.liquid`, the `_projects` collection config.

**Locked class names** (used identically in includes and SCSS — keep them consistent):

```
.people                        page wrapper
.people-hero                   PI band
  .people-hero__photo / __img
  .people-hero__name / __role
  .people-hero__links / __pill
.people-section-title          "Graduate Students" / "Undergraduate Students" / "Alumni"
.people-grid                   avatar grid
.people-card                   one avatar cell (an <a>)
  .people-card__photo / __img / __name / __role
.people-alumni                 alumni container
  .people-alumni__year         year sub-heading
.people-alum                   one alumni row (an <a>)
  .people-alum__photo / __img / __name / __note
```

---

## Task 1: Add `role` and `year` data fields

Purely additive — the old page still renders identically after this task (these fields are unused until later tasks). The PI entry is intentionally **not** touched here; it changes in Task 2.

**Files:**
- Modify: `_projects/Zhangtao_Yi.md`, `_projects/Yuwei_Shi.md`, `_projects/Ruifeng_Jiang.md`, `_projects/Xinyan_Zhong.md`, `_projects/Yuqi_Wei.md`, `_projects/Yuxiang_Chen.md`, `_projects/Ziran_Wu.md`, `_projects/Morgan_Adams.md` (add `role`)
- Modify: `_projects/Chaoran_Sui.md`, `_projects/Haoqi_Lyu.md`, `_projects/Minghao_Deng.md`, `_projects/Weijian_Zhang.md`, `_projects/Xunhe_Liu.md`, `_projects/Yue_Song.md`, `_projects/Zhirui_Xiang.md` (add `year`)

- [ ] **Step 1: Add `role:` to each current-member file**

In each file's front matter, add a `role:` line directly under the `category:` line. Use these exact values:

| File | `role:` value |
|------|---------------|
| `_projects/Zhangtao_Yi.md` | `PhD Student` |
| `_projects/Yuwei_Shi.md` | `Research Assistant` |
| `_projects/Ruifeng_Jiang.md` | `Visiting PhD Student` |
| `_projects/Xinyan_Zhong.md` | `Undergraduate` |
| `_projects/Yuqi_Wei.md` | `Undergraduate` |
| `_projects/Yuxiang_Chen.md` | `Undergraduate` |
| `_projects/Ziran_Wu.md` | `Undergraduate` |
| `_projects/Morgan_Adams.md` | `Summer Intern` |

Example — `_projects/Zhangtao_Yi.md` becomes:

```yaml
---
layout: page
title: Zhangtao Yi
description: PhD Student (Chemistry)<br>B.Sc, Nanjing University<br>
img: assets/img/zhangtao_yi.jpeg
redirect:
importance: 2
category: Graduate Students
role: PhD Student
horizontal: false
---
```

- [ ] **Step 2: Add `year:` to each alumni file and trim any trailing `<br>` in its `description`**

In each alumni file, add a `year:` line under `category:`, and remove a trailing `<br>` at the very end of the `description` value if present (so the later " · " join stays clean). Use these years:

| File | `year:` value |
|------|---------------|
| `_projects/Chaoran_Sui.md` | `2024` |
| `_projects/Haoqi_Lyu.md` | `2024` |
| `_projects/Minghao_Deng.md` | `2025` |
| `_projects/Weijian_Zhang.md` | `2025` |
| `_projects/Xunhe_Liu.md` | `2025` |
| `_projects/Yue_Song.md` | `2025` |
| `_projects/Zhirui_Xiang.md` | `2025` |

Example — `_projects/Minghao_Deng.md` becomes:

```yaml
---
layout: page
title: Minghao Deng
description: Master Student (Materials Science) 2025<br>B.Sc, Nanjing University of Posts and Telecommunications<br>⮕ China Mobile, Nanjing
img: assets/img/minghao_deng.jpg
redirect:
importance: 1
category: Alumni
year: 2025
horizontal: false
---

Email&#58; minghao.deng23@student.xjtlu.edu.cn
```

Example with trailing `<br>` removed — `_projects/Haoqi_Lyu.md`'s `description` changes from
`...Continue his UG at University of Liverpool, UK<br>` to `...Continue his UG at University of Liverpool, UK`:

```yaml
---
layout: page
title: Haoqi Lyu
description: Undergraduate Student (Chemistry)<br>SURF 2024<br>Continue his UG at University of Liverpool, UK
img: assets/img/haoqi_lyu.jpeg
redirect:
importance: 4
category: Alumni
year: 2024
horizontal: false
---
Email&#58; haoqi.lyu22@student.xjtlu.edu.cn
```

- [ ] **Step 3: Verify the fields are present**

Run:
```bash
grep -L "^role:" _projects/Zhangtao_Yi.md _projects/Yuwei_Shi.md _projects/Ruifeng_Jiang.md _projects/Xinyan_Zhong.md _projects/Yuqi_Wei.md _projects/Yuxiang_Chen.md _projects/Ziran_Wu.md _projects/Morgan_Adams.md
grep -L "^year:" _projects/Chaoran_Sui.md _projects/Haoqi_Lyu.md _projects/Minghao_Deng.md _projects/Weijian_Zhang.md _projects/Xunhe_Liu.md _projects/Yue_Song.md _projects/Zhirui_Xiang.md
```
Expected: **both commands print nothing** (`grep -L` lists files *missing* the pattern; empty output = all files have it).

- [ ] **Step 4: Commit**

```bash
git add _projects/
git commit -m "$(cat <<'EOF'
Add role/year fields to people entries

Additive optional front matter: role (short grid label) for current
members, year for alumni grouping. No rendering change yet.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: PI hero include + new page skeleton

Creates the hero include, updates the PI entry, and rewrites `profiles.md` to the new structure rendering **only** the PI hero for now (grids/alumni come in Tasks 3–4).

**Files:**
- Modify: `_projects/Zhenghao_Wu.md`
- Create: `_includes/people_hero.liquid`
- Modify: `_pages/profiles.md`

- [ ] **Step 1: Confirm the marker is absent (red)**

Run:
```bash
bundle exec jekyll build && grep -c "people-hero" _site/people/index.html
```
Expected: `0` (the old page has no hero).

- [ ] **Step 2: Update the PI entry**

Replace the full contents of `_projects/Zhenghao_Wu.md` with (moves email into its own field, drops the now-unused `horizontal`, keeps `redirect` as the Scholar URL):

```yaml
---
layout: page
title: Dr. Zhenghao Wu
description: Assistant Professor<br>Department of Chemistry<br>Xi'an Jiaotong-Liverpool University
img: assets/img/zhenghao_wu.jpg
redirect: https://scholar.google.com/citations?hl=en&user=wo1zj5kAAAAJ&view_op=list_works&sortby=pubdate
email: zhenghao.wu@xjtlu.edu.cn
importance: 1
category: Principal Investigator
---
```

- [ ] **Step 3: Create the hero include**

Create `_includes/people_hero.liquid`:

```liquid
{% comment %} PI hero band. Expects `project` (the Principal Investigator entry) in scope. {% endcomment %}
<div class="people-hero">
  <div class="people-hero__photo">
    {% include figure.liquid loading="eager" path=project.img sizes="160px" alt=project.title class="people-hero__img" %}
  </div>
  <div class="people-hero__body">
    <h2 class="people-hero__name">{{ project.title }}</h2>
    <div class="people-hero__role">{{ project.description }}</div>
    <div class="people-hero__links">
      {% assign scholar = project.scholar | default: project.redirect %}
      {% if scholar and scholar != "" %}
        <a class="people-hero__pill" href="{{ scholar }}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-graduation-cap"></i> Google Scholar
        </a>
      {% endif %}
      {% if project.email and project.email != "" %}
        <a class="people-hero__pill" href="mailto:{{ project.email }}">
          <i class="fa-solid fa-envelope"></i> Email
        </a>
      {% endif %}
    </div>
  </div>
</div>
```

- [ ] **Step 4: Rewrite the page to the new skeleton (hero only)**

Replace the full contents of `_pages/profiles.md` with:

```liquid
---
layout: page
permalink: /people/
title: People
description: Great people
nav: true
nav_order: 4
---

<div class="people">

  {% assign pis = site.projects | where: "category", "Principal Investigator" | sort: "importance" %}
  {% for project in pis %}
    {% include people_hero.liquid %}
  {% endfor %}

</div>
```

- [ ] **Step 5: Build and verify the hero renders (green)**

Run:
```bash
bundle exec jekyll build && grep -c "people-hero__name" _site/people/index.html
```
Expected: `1`.

Also confirm the Scholar and email links exist:
```bash
grep -o "people-hero__pill" _site/people/index.html | wc -l
```
Expected: `2`.

- [ ] **Step 6: Commit**

```bash
git add _projects/Zhenghao_Wu.md _includes/people_hero.liquid _pages/profiles.md
git commit -m "$(cat <<'EOF'
Add PI hero band to people page

New people_hero.liquid include + people page skeleton. PI entry gains
an email field and drops the unused horizontal flag.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Current-member avatar grids

Adds the avatar include and the Graduate / Undergraduate grids.

**Files:**
- Create: `_includes/people_avatar.liquid`
- Modify: `_pages/profiles.md`

- [ ] **Step 1: Confirm the marker is absent (red)**

Run:
```bash
grep -c "people-card" _site/people/index.html
```
Expected: `0`.

- [ ] **Step 2: Create the avatar include**

Create `_includes/people_avatar.liquid`:

```liquid
{% comment %} One avatar cell for the current-member grids. Expects `project` in scope. {% endcomment %}
{% if project.redirect and project.redirect != "" %}
  {% assign href = project.redirect %}
{% else %}
  {% assign href = project.url | relative_url %}
{% endif %}
{% if project.role and project.role != "" %}
  {% assign role = project.role %}
{% else %}
  {% assign role = project.description | split: "<br>" | first %}
{% endif %}
<a class="people-card" href="{{ href }}">
  <div class="people-card__photo">
    {% include figure.liquid loading="eager" path=project.img sizes="120px" alt=project.title class="people-card__img" %}
  </div>
  <div class="people-card__name">{{ project.title }}</div>
  <div class="people-card__role">{{ role }}</div>
</a>
```

- [ ] **Step 3: Add the two grids to the page**

Replace the full contents of `_pages/profiles.md` with (adds Graduate + Undergraduate blocks before `</div>`):

```liquid
---
layout: page
permalink: /people/
title: People
description: Great people
nav: true
nav_order: 4
---

<div class="people">

  {% assign pis = site.projects | where: "category", "Principal Investigator" | sort: "importance" %}
  {% for project in pis %}
    {% include people_hero.liquid %}
  {% endfor %}

  {% assign grads = site.projects | where: "category", "Graduate Students" | sort: "importance" %}
  {% if grads.size > 0 %}
    <h2 class="people-section-title">Graduate Students</h2>
    <div class="people-grid">
      {% for project in grads %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

  {% assign ugs = site.projects | where: "category", "Undergraduate Students" | sort: "importance" %}
  {% if ugs.size > 0 %}
    <h2 class="people-section-title">Undergraduate Students</h2>
    <div class="people-grid">
      {% for project in ugs %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

</div>
```

- [ ] **Step 4: Build and verify all current members render (green)**

Run:
```bash
bundle exec jekyll build && grep -c "people-card__name" _site/people/index.html
```
Expected: `8` (3 Graduate + 5 Undergraduate).

Confirm both section headings exist:
```bash
grep -c "people-section-title" _site/people/index.html
```
Expected: `2`.

- [ ] **Step 5: Commit**

```bash
git add _includes/people_avatar.liquid _pages/profiles.md
git commit -m "$(cat <<'EOF'
Add current-member avatar grids to people page

people_avatar.liquid renders a linked circular avatar with name and
role; Graduate and Undergraduate grids wired into the page.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Year-grouped alumni list

Adds the alumni row include and the year-grouped Alumni section.

**Files:**
- Create: `_includes/people_alum.liquid`
- Modify: `_pages/profiles.md`

- [ ] **Step 1: Confirm the marker is absent (red)**

Run:
```bash
grep -c "people-alum__name" _site/people/index.html
```
Expected: `0`.

- [ ] **Step 2: Create the alumni row include**

Create `_includes/people_alum.liquid`:

```liquid
{% comment %} One compact alumni row. Expects `project` in scope. {% endcomment %}
{% if project.redirect and project.redirect != "" %}
  {% assign href = project.redirect %}
{% else %}
  {% assign href = project.url | relative_url %}
{% endif %}
{% assign note = project.description | replace: "<br>", " · " | strip %}
<a class="people-alum" href="{{ href }}">
  <div class="people-alum__photo">
    {% include figure.liquid loading="lazy" path=project.img sizes="48px" alt=project.title class="people-alum__img" %}
  </div>
  <span class="people-alum__name">{{ project.title }}</span>
  <span class="people-alum__note">{{ note }}</span>
</a>
```

- [ ] **Step 3: Add the alumni section to the page**

Replace the full contents of `_pages/profiles.md` with (adds the Alumni block before `</div>`):

```liquid
---
layout: page
permalink: /people/
title: People
description: Great people
nav: true
nav_order: 4
---

<div class="people">

  {% assign pis = site.projects | where: "category", "Principal Investigator" | sort: "importance" %}
  {% for project in pis %}
    {% include people_hero.liquid %}
  {% endfor %}

  {% assign grads = site.projects | where: "category", "Graduate Students" | sort: "importance" %}
  {% if grads.size > 0 %}
    <h2 class="people-section-title">Graduate Students</h2>
    <div class="people-grid">
      {% for project in grads %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

  {% assign ugs = site.projects | where: "category", "Undergraduate Students" | sort: "importance" %}
  {% if ugs.size > 0 %}
    <h2 class="people-section-title">Undergraduate Students</h2>
    <div class="people-grid">
      {% for project in ugs %}{% include people_avatar.liquid %}{% endfor %}
    </div>
  {% endif %}

  {% assign alumni = site.projects | where: "category", "Alumni" %}
  {% if alumni.size > 0 %}
    <h2 class="people-section-title">Alumni</h2>
    <div class="people-alumni">
      {% assign years = alumni | map: "year" | compact | uniq | sort | reverse %}
      {% for y in years %}
        <h3 class="people-alumni__year">{{ y }}</h3>
        {% assign group = alumni | where: "year", y | sort: "importance" %}
        {% for project in group %}{% include people_alum.liquid %}{% endfor %}
      {% endfor %}
    </div>
  {% endif %}

</div>
```

- [ ] **Step 4: Build and verify alumni render, grouped by year (green)**

Run:
```bash
bundle exec jekyll build && grep -c "people-alum__name" _site/people/index.html
```
Expected: `7`.

Confirm two year headings (2025, 2024) render in descending order:
```bash
grep -o "people-alumni__year\">[0-9]*" _site/people/index.html
```
Expected, in this order:
```
people-alumni__year">2025
people-alumni__year">2024
```

- [ ] **Step 5: Commit**

```bash
git add _includes/people_alum.liquid _pages/profiles.md
git commit -m "$(cat <<'EOF'
Add year-grouped alumni list to people page

people_alum.liquid renders a compact row; alumni grouped under year
sub-headings, most recent first.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Styling (`_sass/_people.scss`)

All visual treatment: circular avatars, responsive grid, PI hierarchy, theme-variable colors for light/dark.

**Files:**
- Create: `_sass/_people.scss`
- Modify: `assets/css/main.scss`

- [ ] **Step 1: Confirm the styles are absent (red)**

Run:
```bash
grep -c "people-hero" _site/assets/css/main.css
```
Expected: `0`.

- [ ] **Step 2: Create the stylesheet**

Create `_sass/_people.scss`:

```scss
/* People page (/people/) */

.people {
  margin-top: 1rem;

  a {
    text-decoration: none;
  }

  // figure.liquid wraps images in <figure><picture><img>; keep wrappers layout-neutral
  figure {
    margin: 0;
  }
  picture {
    display: block;
  }

  .people-section-title {
    color: var(--global-divider-color);
    border-bottom: 1px solid var(--global-divider-color);
    padding-top: 0.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: right;
    font-size: 1.5rem;
  }
}

/* PI hero */
.people-hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 12px;
  background-color: var(--global-card-bg-color);

  &__photo {
    flex: 0 0 auto;
    width: 132px;
  }
  &__img {
    width: 132px;
    height: 132px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
  }
  &__name {
    margin: 0 0 0.25rem;
    font-size: 1.6rem;
    color: var(--global-text-color);
  }
  &__role {
    color: var(--global-text-color-light);
    line-height: 1.5;
    margin-bottom: 0.75rem;
  }
  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
    border: 1px solid var(--global-theme-color);
    border-radius: 16px;
    color: var(--global-theme-color);
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: var(--global-theme-color);
      color: var(--global-bg-color);
    }
  }
}

/* Current-member avatar grid */
.people-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.people-card {
  display: block;
  text-align: center;
  color: var(--global-text-color);

  &__img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
  &__name {
    font-weight: 600;
    font-size: 0.95rem;
    margin-top: 0.6rem;
  }
  &__role {
    font-size: 0.8rem;
    color: var(--global-text-color-light);
  }

  &:hover &__img {
    transform: scale(1.04);
  }
  &:hover &__name {
    color: var(--global-theme-color);
  }
}

/* Alumni compact list */
.people-alumni {
  &__year {
    font-size: 1rem;
    font-weight: 700;
    color: var(--global-text-color-light);
    margin: 1.5rem 0 0.5rem;
  }
}

.people-alum {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--global-divider-color);
  color: var(--global-text-color);

  &__img {
    width: 40px;
    height: 40px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
    flex: 0 0 auto;
  }
  &__name {
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
  }
  &__note {
    font-size: 0.82rem;
    color: var(--global-text-color-light);
  }

  &:hover &__name {
    color: var(--global-theme-color);
  }
}

/* Small screens: stack the hero, let alumni notes wrap */
@media (max-width: 576px) {
  .people-hero {
    flex-direction: column;
    text-align: center;

    &__links {
      justify-content: center;
    }
  }
  .people-alum {
    flex-wrap: wrap;

    &__note {
      flex-basis: 100%;
      padding-left: calc(40px + 0.75rem);
    }
  }
}
```

- [ ] **Step 3: Register the partial in the main stylesheet**

In `assets/css/main.scss`, add `"people",` to the `@import` list (place it right after `"base",`). The list becomes:

```scss
@import
  "variables",
  "themes",
  "layout",
  "base",
  "people",
  "distill",
  "cv",
  "tabs",
  "typograms",
  "font-awesome/fontawesome",
  "font-awesome/brands",
  "font-awesome/solid",
  "font-awesome/regular",
  "tabler-icons/tabler-icons.scss",
  "tabler-icons/tabler-icons-filled.scss",
  "tabler-icons/tabler-icons-outline.scss"
;
```

- [ ] **Step 4: Build and verify the compiled CSS contains the styles (green)**

Run:
```bash
bundle exec jekyll build && grep -c "people-hero" _site/assets/css/main.css
```
Expected: a number `>= 1` (the class compiled into the bundle).

- [ ] **Step 5: Visual check**

Run:
```bash
bundle exec jekyll serve
```
Open `http://localhost:4000/people/` and confirm:
- PI hero band sits at the top with a large circular photo, name, role lines, and two pills.
- Graduate and Undergraduate sections show circular avatars in a multi-column grid; all avatars are uniform circles regardless of source photo shape.
- Alumni appear as compact rows under "2025" and "2024" headings.
- Toggle dark mode (navbar switch): text and surfaces stay legible, accents use the site theme color.
- Narrow the window: grid drops to 3 then 2 columns; the hero stacks vertically on phone widths.

Stop the server with Ctrl+C when done.

- [ ] **Step 6: Commit**

```bash
git add _sass/_people.scss assets/css/main.scss
git commit -m "$(cat <<'EOF'
Style the people page (avatar roster)

New _sass/_people.scss: circular avatars, responsive grid, PI hero
hierarchy, compact alumni rows. Colors use al-folio theme variables
so light and dark mode both work.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Regression & final verification

Confirm nothing else broke and the page holds up across modes/widths. No new files; only a verification pass (plus any small visual fix you discover).

**Files:**
- (verification only; touch `_sass/_people.scss` or includes if a fix is needed)

- [ ] **Step 1: Confirm the shared project includes are untouched**

Run (compares this branch against `main`, robust to commit count):
```bash
git diff --name-only main -- _includes/projects.liquid _includes/projects_horizontal.liquid _includes/figure.liquid || true
```
Expected: **no output** (none of the shared includes changed).

- [ ] **Step 2: Confirm any page using `cv.liquid` still builds and renders**

`cv.liquid` also includes `projects.liquid`. Build the whole site and confirm it completes without error:
```bash
bundle exec jekyll build
echo "exit: $?"
```
Expected: `exit: 0` and no Liquid errors in the output.

- [ ] **Step 3: Full visual sweep**

Run `bundle exec jekyll serve` and verify on `http://localhost:4000/people/`:
- Light mode and dark mode both legible.
- Desktop (5 cols), tablet (~768px → 3 cols), phone (~420px → 2 cols, hero stacked).
- Every member avatar is a clean circle (no stretched/squished photos).
- Clicking the PI hero pills opens Scholar / mail; clicking an avatar goes to that member's `redirect` or profile page.
- Spot-check one other page (e.g. `/` home or `/publications/`) still looks normal.

- [ ] **Step 4: Commit any fixes**

If Step 3 surfaced a tweak, make it in `_sass/_people.scss` (or the relevant include), rebuild, and commit:

```bash
git add -A
git commit -m "$(cat <<'EOF'
Polish people page after visual review

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no fixes were needed, this task is complete with nothing to commit.

---

## Done

The `/people/` page now renders as: PI hero band → Graduate avatar grid → Undergraduate avatar grid → year-grouped alumni list, with uniform circular photos, theme-aware light/dark styling, and responsive columns. The `_projects` data model and shared `projects.liquid` includes are unchanged.
