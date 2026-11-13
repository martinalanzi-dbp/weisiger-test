# Content guidelines (Weisiger Group homepage)

Rules for anyone, person or agent, changing the homepage copy. Read this before editing.

## What a content change is

A content change edits text, links, list items or news entries that already exist in
`src/content/home.json`. That file is the only file a content change touches.

Not a content change, so do not do it as one: new sections or fields, layout, colours,
fonts, spacing, images or logos, anything in `src/pages/`, `src/styles/`, `public/`,
`scripts/` or `.github/`. Those need a normal feature card.

## Approval

Anyone can propose a change. Martina Lanzi is the only approver. Nothing is published
before she approves the exact wording. If the approved wording and the change differ,
the change is not approved.

## How to edit `home.json`

- Change values only. Keep every field name and the overall structure. The build fails
  on a missing, renamed or extra field (see `scripts/content-shape.json`).
- Lists (states, offers, solutions, points, company cards, news items, footer links) can
  grow or shrink, but never be empty. A new item has the same fields as the others.
- Plain text only: no HTML, no Markdown. Arrows and symbols already in the text (`↗`,
  `⌄`, `·`) are part of the design; keep them.
- Find a field by its path, for example `careers.title`, `hero.body`,
  `news.items[0].title`.

## Tone

- Plain, warm and confident. Weisiger is a family business; the copy sounds like people,
  not a brochure.
- Sentence case for headings and buttons ("Build your career with us", not "Build Your
  Career With Us"). Proper names keep their capitals (Carolina Cat, LiftOne, SITECH).
- Short sentences, active voice, no exclamation marks, no superlatives that cannot be
  backed up ("best", "leading") unless they quote an award by name.
- Buttons say what happens: "See open roles", "Donate today".
- American English spelling.

## Facts

Never invent or guess numbers, dates, locations, awards, partner brands or quotes. If a
change needs a fact nobody has given, stop and ask the proposer. Current facts on the
page: founded 1926, headquarters Charlotte NC, five states (NC, SC, GA, TN, AL),
8 operating companies, LiftOne 20 locations and 500+ technicians.

## Character limits

Checked automatically by `npm run build` (`scripts/check-content.mjs`).

| Field | Limit |
|---|---|
| `careers.title` | 60 |
| `hero.title` | 70 (plus `hero.titleHighlight` 40) |
| `hero.body`, `careers.body` | 180 |
| `meta.title` / `meta.description` | 60 / 160 |
| `news.title` | 40 |
| Section titles (`companies.title`, `why.title` and their highlights) | 20 |
| Other `title` fields (news items, cards) | 100 |
| `body` (other) / `description` | 220 / 180 |
| `name` | 40 |
| Button and link `label` | 48 |
| `eyebrow` / `badge` / `tag` | 60 / 30 / 20 |
| Anything else | see `KEY_LIMITS` in the script (default 60) |

## Links

A `href` must be `#`, `#section`, `/path`, `https://…` or `mailto:…`. No `http://`, no
`javascript:`. Placeholder links are `#` until a real URL is given.

## Checking a change

```bash
npm ci
npm run check:content   # content rules only
npm run build           # content rules + full site build
```
