# CITY 01 — Art Direction 1.0

## North Star

CITY 01 is a 32-bit-style urban exploration RPG portfolio set in an original Japanese waterfront city at 18:42. The city is clean, cultured, hopeful and quietly adventurous. It is not cyberpunk, fantasy, a municipal diagram, or a collection of facility-shaped icons.

## Geography

```text
NORTH
01 YARD —— TRIPVLOG —— STOCKA
                   │ TERMINAL RAIL
HAKU —— CITY 01 CENTRAL / B2 —— THE ARCHIVE
VOYAGE CINEMA —— WATERFRONT PROMENADE —— ROUTE TERMINAL → SEA
SOUTH
```

The railway arrives from the north and terminates at Central. It must show two rails, sleepers, platforms, station architecture and a train together. A pair of vertical lines with repeated crossbars is forbidden.

## Pixel construction

- Base tile: `24 × 24` source px
- Projection: three-quarter top-down orthographic; roof plus south/east elevations
- Roads: orthogonal, no diamond-isometric street grid
- Floor height: `16` source px
- Outline: `1` source px, identical across all assets
- Door: one tile wide
- Character: `16 × 24` source px, four directions, four frames each
- Light: north-west
- Cast shadow: south-east at 45 degrees
- Texture: deterministic clusters only; no random noise
- Map surfaces: no gradients, blur or CSS drop shadows
- Coordinates and animation frames: integers only

The production map is composed from deterministic tiles and building primitives. An AI-generated single background may be used for composition studies but never as the final map.

## Palette

| Role | Hex |
| --- | --- |
| Black depth | `#081923` |
| Outline / night navy | `#102B3B` |
| Deep water | `#14536A` |
| Water | `#1F748A` |
| Water highlight | `#5CB3BF` |
| Sky | `#7FAEC3` |
| Distant haze | `#C5D9D8` |
| Light stone | `#E5E1D4` |
| Mid stone | `#B8BCB2` |
| Stone shadow | `#7B8887` |
| Light glass | `#ABD1D2` |
| Glass | `#6FA1AD` |
| Glass shadow | `#366B78` |
| Foliage | `#3F705A` |
| Foliage light | `#75A06D` |
| Warm light | `#F3C85E` |
| Light core | `#FFE5A3` |
| Selection / journey | `#ED6A55` |
| Brick | `#A75543` |
| Asphalt | `#334A52` |

Each facility may add at most two local colors. The city map stays within 20–24 colors.

## Materials

- Glass: two or three rectangular reflection tones
- Stone: fixed one-pixel clusters
- Metal: a single-direction highlight
- Brick: `2×2` or `4×2` repeating bond
- Water: three horizontal-wave frames
- Foliage: three value clusters
- Warm emission: windows, entrances, train and vessel lights only

## Typography

- Body and UI: native Japanese sans (`Hiragino Sans`, `Yu Gothic UI`, `Yu Gothic`, `Meiryo`)
- Codes, time and coordinates: locally served IBM Plex Mono (Latin 400/600 only)
- Map dialogue and signs: native Japanese gothic (`Hiragino Kaku Gothic ProN`, `Yu Gothic`)
- Archive and HAKU editorial/exhibition display text: native Japanese serif (`Hiragino Mincho ProN`, `Yu Mincho`)
- CITY 01 mark: dedicated geometric symbol plus a live-text wordmark

Rules:

- Body `16–18px`, line height `1.75–1.9`
- UI label at least `13px`
- Map facility name at least `13px`
- Code at least `12px`
- Primary button at least `14px`
- Japanese body measure `28–38` characters
- Uppercase tracking no more than `0.08em`
- Text below `9px` is forbidden
- Display type maximum: desktop `96px`, mobile `52px`
- The maximum applies to semantic text. Architectural section signs such as the aria-hidden `01` and `B2` may exceed it.
- Japanese copy uses `line-break: strict`. Body copy prefers `word-break: auto-phrase`, `overflow-wrap: normal` and `text-wrap: pretty`; headings may use `text-wrap: balance`. Authored `semanticUnit` spans are reserved for short meaning units that fit at 320px and 200% text zoom, with adjacent units separated by `wbr`. `overflow-wrap: anywhere` is limited to unavoidable long identifiers or URLs.

## Interface

The city has one 16×16 source-pixel icon family: map, back, enter, close, play, pause, search, filter, external link, current location, route, audio and directory. Emoji, Unicode arrows, general-purpose icon libraries and custom pixel icons must not mix.

Touch targets are at least `44 × 44` CSS px. A visible keyboard focus state is mandatory.

## Motion

- Water: three frames, one change per `600ms`
- Train: one arrival every `16s`, lasting `4s`
- Ship or flag: choose one, never both at once
- Character walk: `8fps`
- Selection: static three-pixel warm outline; no pulse
- Entry: optional door, two steps and facility-color wipe, total `480–650ms`, never a navigation delay
- Maximum three environmental motions at once
- No universal fade/reveal, floating, pulse or rotation
- Audio starts off and can be enabled only after user action
- Reduced-motion mode stops environmental loops and entry movement

## Landmark architecture

- Central: vaulted glass station roof, visible platforms and train
- Cinema: low dark volume, coral canopy and one abstract illuminated poster box drawn in the city palette; real thumbnails appear only inside the facility
- Archive: brick cultural building, vertical windows, rooftop reading terrace
- Harbor: pier, glass canopy and white/yellow ferry
- TripVlog: converted warehouse studio, blue light band and loading entrance
- HAKU: white low pavilion, courtyard and three skylights
- Stocka: green-glass learning building and compact courtyard
- B2: stairs descending below grade and a ventilation tower; the interior uses one real podcast thumbnail as its illuminated monitor, never an ON AIR prop
- 01 Yard: fence, containers, crane and one in-progress module

Buildings are recognizable through architecture and use, not giant play, book, camera or alphabet symbols.

## Facility interiors

Only the 56px City Bar, map return, typography accessibility and focus language are shared. Each facility owns its information architecture.

### Central

An open, urban station concourse: white ground, cool glass-canopy band, hanging concourse signage and a horizontal platform edge. The departure board is the protagonist and is navigation to real facilities, not decoration. The traveler's note board links to the profile page and Route Terminal as a message left by the person, never as a facility row. The person's biography lives on the profile page (`/shosuke`), not here; warm stone, coral and station-sign plates belong to the profile page and distinguish it from Central's cool concourse.

### Voyage Cinema

Open on one real 16:9 film. Use real thumbnails and direct play links. Palette: `#0B0A0D`, `#F2EEE6`, `#E25545`, `#D0A557`.

### The Archive

Open on a real featured story. Default to a horizontal, searchable catalogue with year and theme filters. Decorative spines are secondary. Palette: `#EFE7D7`, `#23332E`, `#A65A43`, `#477365`.

### Route Terminal

Visualize the real itinerary as a schematic route-line diagram in harbor-sign language: horizontal, vertical and 45-degree segments on an integer grid only, square berth markers, and one rect-built pixel ferry at the current stop. Encode state by line style — solid traveled, dashed next, dotted planned — never by invented geography. The current stop carries the static three-pixel warm outline. No world-map land shapes, invented coordinates, port codes, boarding passes or arbitrary Bézier route. Real itinerary and real travel content only. Cool sea palette and berth-marker language distinguish it from the warm vertical railway timeline on the profile page. Palette: `#0E4054`, `#2A7C91`, `#CEE8E5`, `#F0C85A`.

The terminal is the only door to the ports of call. Opened stops on the diagram are links; the ports index below it is the keyboard and screen-reader path to the same pages.

## Ports of call

Ports (`/ports/[slug]`) are not facilities. They sit outside the city, carry no facility code, never appear on the map or in the directory, and are reached only from the Route Terminal diagram and index. A port opens only where a real stay was recorded; unvisited stops get no page and stay unlinked, and the diagram's existing dashed and dotted markers are the whole "not yet" statement.

Every port uses one shared harbor-ledger format: arrival header (order, real period, state, stay note), the real films and articles made there, and route links to the neighbouring ports and back to the terminal. Country character comes from the record, never from decoration:

- Real content carries the page. The films shot in a country are the strongest possible statement of that country.
- At most two local colors per port, **sampled from that port's own real thumbnails** and contrast-checked before use. Never taken from a flag.
- At most one pixel vignette, and only of a place actually visited.
- The home port (Tokyo) adds no local color; it wears the city's own stone and lamp, because the city was built from the place it departed from.
- A port with no footage yet keeps the base sea palette. Absence is shown, not decorated.

Forbidden: flag color fields, clip-art traditional patterns or costume, motifs from places that were not visited, and layouts that fill space with a giant country name.

Arrival uses the entry wipe rule — a single accent-colored overlay clearing in 480–650ms over already-rendered content, never a navigation delay, dropped entirely under reduced motion. The return trip is silent.

### TripVlog Studio

Show real input clips, generated cards and exported vlog in one production sequence. No CSS phone or fake timeline. Palette: `#071E2B`, `#17658A`, `#5FC4CC`, `#ED6958`.

### HAKU Gallery

Give real photographs near one-work-per-screen density. Show real before/after only where the source exists. No empty frames. Palette: `#F6F2EA`, `#2D2828`, `#B87783`, `#9FBABD`.

### Stocka Lab

Use real screens and only interactions supported by the actual product. Demonstrate translation, explanation, saved card and review as a real sequence. Palette: `#E4EFE8`, `#153F31`, `#38A56D`, `#E8CD62`.

### B2 Studio

Present the real video podcast “一笑瓶のにわか哲学” as a featured conversation plus a compact episode ledger. Preserve official titles, dates and durations. The hosts are friends who enjoy the humanities and philosophy, not experts; the writing must never imply otherwise. Use one uncropped, unrecolored real thumbnail as the only bright monitor in the underground room. No fake waveform, ON AIR, invented timestamp or three-card cinema layout. Palette: `#0B0B1D`, `#3A315B`, `#D64B76`, `#E4B95C`.

### 01 Yard

Show ten real projects with real icon or honest text identity, status, role and date where known. Never generate fictional objects. Palette: `#E6DDCE`, `#262C2C`, `#E37334`, `#79927D`.

## Rejection conditions

Any of the following blocks release:

- inconsistent projection, light, floor height, line or shadow
- a facility represented primarily by a literal giant icon
- invented UI, waveform, time, coordinate or data
- identical hero/card/CTA templates with color changes
- meaningless micro English or code labels
- decorative blur, glass cards, aurora, particles or mesh gradients
- forced START, loading or entry delay
- substitute AI imagery for a real work or journey
- placeholder asset or copy
- direct imitation of another game IP

## Art-director authority

- This specification outranks implementation convenience
- Milestones are reviewed as screenshots, not code
- New color, typeface, projection or motion requires review
- Passing lint and build is not visual approval
- Release requires both individual-page review and nine-page side-by-side review
- Any rejection condition blocks deployment
