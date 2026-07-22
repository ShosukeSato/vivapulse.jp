# CITY 01 — Release QA

Latest recorded run: [2026-07-23 release-candidate report](./QA_REPORT_2026-07-23.md)

## Release score

| Category | Points |
| --- | ---: |
| World and visual grammar | 20 |
| Asset construction precision | 20 |
| Authenticity of real content | 15 |
| Composition and typography | 15 |
| Facility individuality | 10 |
| UX clarity | 10 |
| Mobile, motion and accessibility | 10 |

Release requires at least 95/100, at least 80% in every category, and zero rejection conditions from `ART_DIRECTION.md`.

## Required screenshots

Capture every route at:

- `1440 × 900`
- `1280 × 800`
- `390 × 844`
- `320 × 568`

Also capture content-specific states: hover, keyboard focus, selected facility, directory, closed facility, search results, empty results and reduced motion.

## Visual checks

- The home explains person, purpose and next action within five seconds
- Map, rail and each building are recognizable without labels
- Pixel outline remains coherent at 100% and 200%
- Buildings remain distinguishable in grayscale
- One clear focal point exists in every viewport
- Body is at least 16px and auxiliary labels remain legible
- Meaning-unit line breaks remain intentional at normal width and 320px, then reflow without clipping at 200% text zoom
- No current facility page looks like a color-swapped version of another
- Real work appears before decorative metaphor
- No placeholder, fake data or unavailable LIVE state remains

## Interaction checks

- Every facility is reachable without using the map
- Every facility is reachable with keyboard only
- Visible focus follows visual reading order
- No wheel hijacking or whole-document horizontal scroll
- Map selection never dismisses essential copy unexpectedly
- Navigation has no artificial delay
- Returning to the map restores useful context
- External-link behavior is disclosed
- All primary controls are at least 44px

## Accessibility checks

- WCAG 2.2 AA contrast
- 320px reflow and 200% text zoom
- Reduced-motion behavior
- VoiceOver with Safari
- Keyboard-only navigation
- Forced-colors sanity check
- Meaning is not conveyed by color alone
- Real image alt text; decorative art hidden
- No hover-only information

## Human test

At least five people see the site without instructions.

- Four or more identify a game-like city, a personal portfolio and a place to enter within ten seconds
- Four or more spontaneously say one of: stylish, professional, crafted
- Any response of “AI-like,” “I do not know what to press,” or “all pages feel the same” triggers rework

## Technical checks

- `npm run lint`
- `npm run build`
- `git diff --check`
- no broken internal or external link in the sampled route audit
- no missing local media
- LCP target under 2.5 seconds
- CLS under 0.1
- Lighthouse accessibility at least 95

## Deployment rule

Do not deploy because a deadline, token budget or build result has been reached. Deploy only after the art director reviews final screenshots and all rejection conditions are absent.
