# Weisiger Group — homepage redesign

A single-page redesign concept for [weisigergroup.com](https://www.weisigergroup.com), built
as a static [Astro](https://astro.build) site. All copy and company information come from
Weisiger Group's current website.

The page is content-managed: every piece of text and every link lives in
`src/content/home.json`. Wording changes are proposed in Slack, approved by Martina Lanzi,
and applied by an agent that edits only that file (see `CONTENT_GUIDELINES.md`).

## Run it

```bash
npm ci
npm run dev        # local preview at http://localhost:4321
npm run build      # content check + static build into dist/
```

## Structure

```
src/content/home.json        all copy and links (the only file content changes touch)
src/pages/index.astro        page layout
src/styles/global.css        base styles
public/                      logos and robots.txt
scripts/check-content.mjs    content gate: valid JSON, structure, character limits, links
scripts/content-shape.json   the expected structure of home.json
CONTENT_GUIDELINES.md        rules for anyone editing content
.github/workflows/ci.yml             job "build": content check + build on PRs and main
.github/workflows/deploy-staging.yml deploys main to https://weisiger-test.netlify.app
```

## Staging

`deploy-staging` deploys every push to `main` to Netlify (needs the repository secret
`NETLIFY_AUTH_TOKEN`). The page carries `noindex` and a `build-sha` meta tag with the
deployed commit, so checks can confirm which version is live.

## Notes

- Links are placeholders (`#`) and need real URLs.
- The LiftOne locations-by-state bar lengths are illustrative; replace with real counts.
