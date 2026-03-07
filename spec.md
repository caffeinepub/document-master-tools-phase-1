# DocMasterTools — SEO Typing Test Pages

## Current State

The app uses a custom SPA routing system (App.tsx `useState`-based navigation). The Typing Test lives at `typing-test` page key in `TypingTestPage.tsx`. A `sitemap.xml` exists in `public/` covering all existing pages. Header and Footer components are already present.

## Requested Changes (Diff)

### Add

- `TypingTestSEOPage.tsx` — a shared wrapper component that accepts a `duration` prop (1 | 3 | 5) and renders:
  - SEO meta tags injected via `<Helmet>`-style `document.title` / `<meta>` updates in a `useEffect`
  - A short description section (above the test) tailored to the specific duration
  - A self-contained typing test with the correct duration pre-selected; user can change duration manually
  - A "Tips to Improve Typing Speed" section below the test
  - An internal links panel linking to `/typing-test`, `/typing-test-1-minute`, `/typing-test-3-minute`, `/typing-test-5-minute`
  - The same Header and Footer (inherited from App.tsx shell — no duplication needed)
- Three new page keys in App.tsx: `typing-test-1-minute`, `typing-test-3-minute`, `typing-test-5-minute`
- `sitemap.xml` updated to include the three new SEO pages and `/typing-test`

### Modify

- `App.tsx` — add three new entries to the `Page` type union and three new `case` blocks rendering `TypingTestSEOPage` with the appropriate `duration` prop
- `sitemap.xml` — append four new `<url>` entries: `/typing-test`, `/typing-test-1-minute`, `/typing-test-3-minute`, `/typing-test-5-minute`

### Remove

Nothing removed.

## Implementation Plan

1. Create `src/pages/TypingTestSEOPage.tsx`:
   - Props: `duration: 1 | 3 | 5`, `onNavigate: (page: string) => void`, `onBack: () => void`
   - Use `useEffect` to set `document.title` and update the `<meta name="description">` tag
   - Embed a full typing test (reusing logic from `TypingTestPage.tsx`) with `defaultDuration` pre-set
   - Sections: Hero/description → Typing Test → Tips → Internal Links nav panel
   - Keep same dark theme inline styles consistent with TypingTestPage

2. Update `App.tsx`:
   - Add `typing-test-1-minute | typing-test-3-minute | typing-test-5-minute` to `Page` type
   - Lazy-import `TypingTestSEOPage`
   - Add three `case` entries in `renderPage()`

3. Update `public/sitemap.xml`:
   - Add entries for `/typing-test`, `/typing-test-1-minute`, `/typing-test-3-minute`, `/typing-test-5-minute` with `priority 0.9`
