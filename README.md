# Secure Tech Consultancy — Website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · GSAP + ScrollTrigger + SplitText · Lenis · Lucide ·
shadcn/ui-shaped primitives.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # all routes prerender static
npm run typecheck
```

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero → CTA → trust rail → What We Do → Products (3D) → Facility → Why Secure Tech |
| `/products` | Filterable catalogue (15 products) + Card Factory Solution |
| `/about` | About Us — who we are, vision, leadership, team |
| `/company` | The delivery record — metrics, positioning, timeline, recognition, sectors |
| `/careers` | Why here, disciplines, hiring process, open application |
| `/contact` | Enquiry form + all seven offices |

---

## Motion architecture

Two libraries, split by what they are actually good at, with Lenis underneath.

**Lenis** (`components/providers/SmoothScrollProvider.tsx`) owns scrolling. It
runs in `lerp` mode with `autoRaf: false` and is driven from GSAP's ticker, so
Lenis and ScrollTrigger advance in the *same* frame — two independent RAF loops
is what produces a frame of jitter between the scroll position and anything
pinned to it. `lagSmoothing(0)` stops GSAP catching up after a long frame and
lurching.

**GSAP + ScrollTrigger** — anything driven by scroll position: reveals,
scrubbed 3D rotation, parallax, the pinned timeline, counters.

**Framer Motion** — anything driven by interaction or route: hover states,
button internals, the filter pill's shared `layoutId`, the mobile sheet, page
transitions.

**SplitText** does the type reveals. `autoSplit: true` re-splits after webfonts
land and on resize — the fix for lines measured against the fallback font and
then masked at the wrong height.

### Signature moments

- **Product cinema** (`components/products/ProductCinema.tsx`) — the set-piece.
  The section pins for 3105px and one master timeline is scrubbed against
  scroll: each device flies out of depth (`translateZ -900`), holds focus, then
  passes the camera and exits behind it as the next arrives. Notes worth
  keeping in mind before editing it:
  - **One timeline, not one trigger per product.** Overlapping segments on a
    single scrubbed timeline is what lets the outgoing product still be
    leaving while the next is arriving; separate triggers would restart each
    transition from a dead stop.
  - **Three nested transform layers**, so nothing fights over one matrix:
    stage does the camera drift (±4°), slide does the scroll-driven flight,
    innermost does the Framer pointer tilt.
  - **`translateZ` does the depth, not `scale`** — perspective foreshortening
    is then real, and the object grows the way something approaching a lens
    actually does.
  - **Copy travels less far than its device.** That differential is the
    parallax.
  - Transform and opacity only, `force3D`, `will-change` scoped to slides.
    Nothing reads layout during scroll.
  - Below `lg` and under reduced-motion the pin is dropped entirely and the
    products render as a plain stacked list.
- **Pinned horizontal timeline** (`/company`) — pins for exactly the distance
  the rail travels, with a scrub-linked progress line. `pinType: "transform"`
  because the tree renders inside an animated route wrapper.
- **Card hover** — 3px lift, border warming to brand, and a wash rising from
  the bottom edge. Three composited properties; no scale, no shadow bloom.
- **Role cards** (`/careers`) — navy panel wipes in from the left, type
  inverts. Driven by `group-hover` in CSS, so a grid costs zero React
  re-renders per pointer move.

### Calibration — one loud room, quiet everywhere else

Ambient motion was deliberately turned **down**: durations `reveal` 1.05s →
0.72s, travel 26px → 16px, staggers 0.085 → 0.05, magnetic buttons off by
default, blur-in and the hero scan-line removed. Tokens live in
`lib/motion.ts` — change them there and the whole site follows.

The product cinema is the deliberate exception, and it only reads as
extraordinary *because* the rest is restrained. If ambient motion is dialled
back up to match it, the set-piece stops being a set-piece and the page just
reads as busy. Keep the contrast.

Everything is disabled under `prefers-reduced-motion`, and elements GSAP fades
in are hidden only once JS confirms it is running (`.js-ready`), so a failed
bundle can never leave a blank page.

---

## Design system

`app/globals.css` — Tailwind v4 `@theme` tokens.

**Colour.** White is the substrate. `brand` (#136CB3) is the only interactive
accent. `verify` (#6DAC50) means exactly one thing — verification — and appears
as the pip beside a certification, the tick on a proof point, and the underline
under *verified* in the H1. Never a button, never a second accent beside blue.

Dark surfaces use `.surface-navy`: `ink-950` (#040A13) with two barely-visible
radials. The mid-blue panel this replaced read like a banner ad; at near-black
the section registers as a change of gear.

**Type.** Instrument Sans + IBM Plex Mono. The display scale was pulled back
from the first pass (max 100px → 68px, line-heights loosened, tracking eased) —
an agency site can shout, an enterprise consultancy shouldn't.

> ⚠️ `lib/utils.ts` extends `tailwind-merge` with the custom `text-display-*`
> sizes. Without it, twMerge classifies an unknown `text-*` as a colour and
> silently drops the size — headlines then render at body size. Add any new
> custom font size to that list.

---

## Verified

Checked in-browser at 390 / 1440 across all six routes:

- **Contrast** — 803 text elements, 0 WCAG AA failures. Translucent scrims are
  resolved against white as the worst case. The checker resolves colours
  through a canvas, because Tailwind v4 emits `oklab()` for opacity modifiers
  and string-parsing those reports white text as near-black.
- **Layout** — no horizontal overflow at any width; hero fits the fold
  (751px at 1440×900).
- **Assets** — no broken images. Sources downscaled to 2200px max;
  `public/` is 3.4 MB total.
- **Build** — `next build` clean, 10 pages prerendered static, ~231 kB First
  Load JS on the heaviest route.

**Not verified: the animations have not been watched running.** The preview
surface in this environment cannot composite frames, which freezes the
animation clock and prevents scrolling, so ScrollTrigger and RAF never fire.
Start/end states, easings and durations were each asserted directly in the DOM
— that is not the same as seeing it. Open it in a browser before sign-off and
look hardest at the 3D product rotation and the pinned timeline; those are the
two most likely to need a nudge.

---

## Deploying (Vercel)

The repo is committed and Vercel-ready: `vercel.json` sets the framework,
security headers and cache policy, and `.vercelignore` keeps the 112 MB video
source out of the upload. Next 15 needs no other configuration.

You have to run these yourself — the login step opens a browser and cannot be
driven from here.

```bash
npx vercel login
```

Then, from `D:\work\securetech-next`, a **preview** deploy:

```bash
npx vercel
```

That gives a private URL to review. Only once the blockers below are cleared:

```bash
npx vercel --prod
```

Alternatively, push the repo to GitHub and import it at vercel.com/new — every
branch then gets its own preview URL automatically.

**Do not point the live domain at this yet.** The contact and careers forms
validate and show a success message but post nowhere; on a production domain
real enquiries would silently vanish. Wire an endpoint first — see item 2.

---

## Before launch

1. **Transcode the facility film.** The source is 112 MB and is deliberately
   *not* in `public/` — it sits in `_source-assets/` (gitignored) and the
   player streams from securetech-cards.com in the meantime:
   ```bash
   ffmpeg -i _source-assets/factory-source.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart -c:a aac -b:a 128k public/video/factory.mp4
   ```
   then point `VIDEO_SRC` in `FactoryShowcase.tsx` at `/video/factory.mp4`.
2. **Wire the forms.** `EnquiryForm` validates and shows the success state but
   posts nowhere. See the `NOTE` in `components/forms/EnquiryForm.tsx`.
3. **Confirm the email addresses.** `info@` and `careers@` are inferred — the
   live site renders its addresses as images. Marked `TODO` in `data/site.ts`.
4. **Host the brochures locally.** The eight PDF links in `data/products.ts`
   point at the old domain.
5. **Replace the logo with vector.** `public/brand/logo.png` is the current
   site's low-res PNG; the footer knocks it to white with a filter.
6. **Careers lists disciplines, not vacancies.** The live site has no open
   roles, and inventing named postings for a real employer would send real
   applicants after jobs that do not exist. `DISCIPLINES` in `data/company.ts`
   describes the standing team shape; drop real postings into `VACANCIES` and
   the section switches over automatically.
7. **Confirm the derived figures.** "17 years", "20+ clients" and "4 countries"
   are counted from the current site rather than quoted. Everything else —
   Top 50 Auto-ID, the awards, the timeline, GSMA SAS-UP, ISO 27001:2022, the
   offices — is quoted directly.
8. **Confirm opening hours.** `Mon–Sat 09:00–18:00 PKT` comes from
   securetech-cards.com; the consultancy site does not publish hours.

---

## Content & imagery

Copy is derived from securetech-consultancy.com, with card-production and
certification material from securetech-cards.com. Product shots and client
logos come from the consultancy site. Nothing about the business was invented;
the writing is new, the facts are theirs.

**Photography — check the picture before you write the caption.** The files
downloaded from the Cards site are named misleadingly at source, and captions
were written from the filenames before the images were actually opened. Three
were wrong: `Cards/25.jpg` and `Cards/26.jpg` are the head office exterior and
its entrance, not a production line and a cleanroom; `Cards/1DSC_0289.JPG` is
a portrait of an unidentified person, which had been captioned as a card
personalisation line on two pages.

The two building shots are now `head-office.jpg` and `hq-entrance.jpg` and are
captioned as what they are. The portrait has been deleted — the individual
could not be identified, and an unidentified person's photograph should not be
used as decorative facility imagery.

There is currently **no photograph of the production floor itself**. If the
client can supply plant interiors, `FactoryShowcase` and `CardFactorySolution`
are where they belong.
