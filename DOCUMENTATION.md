# Secure Tech Consultancy — Website Build & Handover

Last updated: 10 August 2026

This document explains what the site is built with, how each part works, and
where to change things. It is written so somebody who has never opened this
repository can pick it up.

---

## 1. What this is

A five-page marketing site for **Secure Tech Consultancy (Pvt) Ltd** —
biometric verification, secure documentation and access control for
governments, telecom operators and banks.

| Route       | Page      | What it covers                                          |
| ----------- | --------- | ------------------------------------------------------- |
| `/`         | Home      | Positioning, capabilities, product suite, why choose us  |
| `/products` | Products  | The full catalogue — 15 products in two scroll rails     |
| `/about`    | About Us  | Who we are, vision, leadership, team, awards, partners   |
| `/company`  | Company   | Delivery record — metrics, timeline, recognition, sectors|
| `/careers`  | Careers   | Benefits, vacancies, hiring process, partners            |
| `/contact`  | Contact   | Enquiry form and offices                                 |

---

## 2. Stack

| Thing            | Choice                          | Why                                                        |
| ---------------- | ------------------------------- | ---------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router)     | Static export of every page; fast, no server needed         |
| Language         | **TypeScript**                  | Product/client data is typed, so a typo is a build error    |
| Styling          | **Tailwind CSS v4**             | Design tokens live in CSS, not in a JS config               |
| Scroll-driven UI | **GSAP + ScrollTrigger**        | Reveals, pinned sections, split-text headlines              |
| Component motion | **Framer Motion**               | Cards, buttons, enter/exit transitions                      |
| Smooth scroll    | **Lenis**                       | The weighted glide; driven by GSAP's ticker, not its own    |
| Icons            | **lucide-react**                | One consistent stroke weight                                |
| Deploy           | **Vercel**                      | `vercel.json` is committed                                  |

**Important:** GSAP and Lenis share **one** animation loop
(`src/components/providers/SmoothScrollProvider.tsx`). Two independent
`requestAnimationFrame` loops produce a frame of jitter, which is why Lenis runs
with `autoRaf: false` and is stepped by `gsap.ticker`.

---

## 3. Running it

```bash
npm install
```

```bash
npm run dev
```

Other scripts:

```bash
npm run build
```

```bash
npm run typecheck
```

```bash
npm run lint
```

Deploy is `vercel --prod` (or a push to the connected branch).

---

## 4. Project layout

```
src/
  app/                     One folder per route; page.tsx per page
    globals.css            Design tokens, utilities, keyframes  ← start here
    layout.tsx             Fonts, nav, footer, smooth scroll provider
  components/
    brand/                 ArrowButton, Eyebrow, Pip, RidgeMotif, Logo
    cards/                 ProductCard, RoleCard
    motion/                Reveal, SplitReveal, MaskedImage, Parallax, Counter
    products/              ProductSwitcher, ProductScroller  ← the two big ones
    sections/              One file per page section
    layout/                Navbar, Footer, MobileMenu
    providers/             SmoothScrollProvider (Lenis + GSAP)
  data/                    All copy and product/client records
  lib/                     gsap.ts (plugin registration), motion.ts (tokens)
public/images/             clients/ facility/ people/ products/ solutions/
```

**Rule of thumb:** text, product specs, client logos and awards are **data**,
not markup. Edit `src/data/*.ts`, not the components.

---

## 5. The design system

All tokens are in `src/app/globals.css` under `@theme`.

**Colour**

- White is the substrate.
- `--color-brand-500: #136CB3` (official blue) is the only interactive accent.
- `--color-verify-500: #6DAC50` (official green) means **one** thing —
  verification. It never competes with blue inside a component.
- `--color-ink-*` is a true navy-black neutral ramp; dark surfaces read as
  depth, not as more brand colour.

**Type**

- Display: `text-display-2xl` → `text-display-sm`, all fluid `clamp()`.
- `.label` is the mono eyebrow with the hairline rule — the machine-readable
  register that separates this from a generic landing page.

**Motion vocabulary** — `src/lib/motion.ts`

- One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint).
  It is registered with GSAP's CustomEase as `"quint"` so a scroll-driven tween
  and a CSS hover run **literally the same curve**.
- Durations: hover 0.24–0.36s, reveals 0.72s, display type up to 1.0s.
- Travel: 10 / 16 / 24px. Anything past ~24px reads as a slide-deck transition.

**Reduced motion** is handled everywhere: `prefersReducedMotion()` in
`src/lib/gsap.ts`, `useReducedMotion()` in Framer components, and a
`@media (prefers-reduced-motion: reduce)` block in `globals.css`.

---

## 6. The four animations that matter

### 6.1 Home — "What we do" cards (`sections/Services.tsx`)

Four capability cards in a 2×2 grid.

- **Entrance:** Framer Motion. Each card comes up from `scale 0.96 / y 18px` on
  the expo curve, 0.55s, staggered 0.06s, fired once when 15% of the grid is in
  view.
- **Hover:** three cheap composited changes at once — a 3px lift, the border
  warming to brand, and a wash fading up from the bottom edge. No scale, no
  shadow bloom, nothing that moves the text.
- The whole card is the click target; the "Discuss this capability" line is its
  label.

> This entrance is the exact animation the Products catalogue grid used to run.
> It was moved here when the Products page went over to scroll rails. The
> numbers were kept identical on purpose — two pages should not have two
> nearly-identical card entrances that differ by a hair.

### 6.2 Home — "Product Suite" pinned switcher (`products/ProductSwitcher.tsx`)

**This is the one from the reference video.** The section holds the viewport and
the *product* changes as you scroll — one device at a time, copy on the left,
render on the right.

How it works:

1. A tall runway sets how long the section lasts — `0.8 × viewport height` per
   product (`SEGMENT`). Six products → `100vh + 480vh`.
2. A `sticky top-0 h-screen` frame inside it.
3. A scroll listener maps progress through the runway to an **index**. Nothing
   else is scroll-driven — the swap itself is a normal enter/exit transition,
   which is what keeps it smooth on a trackpad that delivers scroll in lumps.
4. Direction matters: scrolling down brings the next device in from the right,
   scrolling back brings the previous one in from the left. The motion always
   agrees with the gesture.

Also on screen: a progress rule, and a clickable index row of all six product
names. Clicking one scrolls (through Lenis) to the centre of that product's
segment.

**Below 1024px, and under reduced motion, there is no pin at all** — it degrades
to a native swipe strip of cards. Pinning six screens on a phone is a trap; you
cannot leave the section without scrolling all of it.

Which products appear, and in what order, is `SHOWCASE_ORDER` in
`src/data/products.ts`. Entries must be landscape cut-out device renders and
must carry a `tagline`.

### 6.3 Products — horizontal scroll rails (`products/ProductScroller.tsx`)

The catalogue, as two pinned horizontal rails: **The TPS family** (8 terminals
and facial units) and **The platforms behind them** (7 software platforms).

Same shape as the switcher — runway, sticky frame, scroll-mapped progress — but
here progress maps to a shared **horizontal offset** and each card is
transformed individually:

- **Vertical stagger.** Cards sit on a repeating `[0, +100, 0, −120]px` pattern,
  so the row reads as a drifting wave rather than a rigid strip.
- **Approach scale.** A card enters at `0.7` and reaches `1.0` only once its
  centre crosses a focus line ~22% in from the left, so cards visibly grow as
  they travel toward you.
- **Lerp smoothing at 0.14.** The track chases the scroll-derived target rather
  than snapping to it. This is what produces the weight.

Below 992px and under reduced motion, every transform is dropped and the rail
becomes a plain native swipe strip.

### 6.4 Products — hero device on the ridge (`sections/ProductsHero.tsx`)

The device-on-a-ridge composition. It was taken off the home page because a
floating terminal reads as product marketing rather than consultancy — which is
exactly right on the page whose whole subject is the hardware.

Three things move, all cheap:

- the ridge rings draw outward and then rotate very slowly (`RidgeMotif`),
- the device unclips, settles, then floats on a long 3.4s yoyo,
- a single scan line sweeps the frame (`scan-frame` keyframe in `globals.css`).

The annotations beside the device (`TPS 470`, `Enrolment grade`) are read off the
product record, not typed into the component, so they cannot drift from the
catalogue.

> Only the *composition* was taken from the home page. The headline is the
> Products page's own copy — nothing about "Identity, verified at national
> scale" belongs on a second page.

---

## 7. Sections added in this round

| Component                    | Used on          | What it is                                                   |
| ---------------------------- | ---------------- | ------------------------------------------------------------ |
| `sections/ProductsHero.tsx`  | `/products`      | Device + ridge hero (replaces the generic `PageHeader`)       |
| `sections/ProductRails.tsx`  | `/products`      | The two pinned horizontal rails (replaces the filter grid)    |
| `products/ProductSwitcher.tsx`| `/` (Product Suite) | Pinned one-product-at-a-time switcher                     |
| `sections/Awards.tsx`        | `/about`         | The five awards, as a two-column ruled list                   |
| `sections/Partners.tsx`      | `/about`, `/careers` | Client/partner logo grid, copy passed as props           |

`Partners` takes its copy as props because it runs on two pages and the reason a
visitor is looking at it differs: on About it is the delivery record, on Careers
it is who you would be building for.

The awards now appear in three places, each doing a different job — home page
(supporting evidence inside "Why choose us"), Company page (paired with the
accreditations auditors check), About page (closing the leadership section).
They are rendered three different ways so the repetition does not read as
copy-paste.

---

## 8. Images

```
public/images/
  clients/     20 customer and partner logos
  facility/    head-office.jpg, hq-entrance.jpg
  people/      chairman.jpg, team.jpg
  products/    8 TPS device renders (cut-outs, transparent PNG)
  solutions/   7 platform tiles
```

**Photographic tiles get a brand duotone.** The platform products are
illustrated with library photography, and six unrelated blue-tinted stock shots
side by side read as exactly what they are. `ProductCard` now renders them
greyscale under a single `mix-blend-color` wash in brand blue, which collapses
them into one deliberate treatment — still photographs, but unmistakably this
site's photographs. Device renders are excluded; cut-outs must keep their true
colour.

### Known gap — please read

Both reference sites the client shared (`securetech-cards.com` and
`securetech-consultancy.com`) were checked for better imagery. **They use the
same stock photographs that are already in this repository**, so there was
nothing new to pull. The only genuine photographs available anywhere are:

- the head office at dusk (already `facility/head-office.jpg`),
- the entrance at dusk (already `facility/hq-entrance.jpg`),
- the team photo (already `people/team.jpg`),
- the Chairman's portrait (already `people/chairman.jpg`).

Those two building shots are currently reused three times each across the site.
**To fix the "everything looks the same" problem properly, the client needs to
supply real photographs** — production floor, enrolment in the field, a terminal
in a retailer's hands, the office interior. Drop them in
`public/images/facility/` (or `solutions/`) and point the relevant `src` at them.

### Deliberate omissions

- **No CEO photograph.** The only portrait supplied is captioned "Chairman" at
  source. Reusing it for a second named individual would misattribute a real
  person's photograph. There is a placeholder monogram until one is supplied.
- **The CEO's message is paraphrased, not quoted.** Attributing invented direct
  speech to a real, named executive would misrepresent what he has actually
  said.

---

## 9. Editing content

| To change…                        | Edit                              |
| --------------------------------- | --------------------------------- |
| Company name, phone, address, email | `src/data/site.ts`              |
| Navigation links                  | `src/data/site.ts` → `NAV_LINKS`  |
| Certifications, awards, hero stats| `src/data/site.ts`                |
| Products, specs, brochure PDFs    | `src/data/products.ts`            |
| Which products are in the home switcher | `src/data/products.ts` → `SHOWCASE_ORDER` |
| Client / partner logos            | `src/data/clients.ts`             |
| The four capabilities             | `src/data/services.ts`            |
| Timeline, metrics, sectors, offices, vacancies | `src/data/company.ts` |

Adding a product: add the record to `PRODUCTS`, drop the image in
`public/images/products/`, and set `width`/`height` to the file's **true**
intrinsic size. That last part matters — the images range from 528×374 to
996×2011, and a wrong ratio makes `next/image` reserve the wrong box, which
shifts the layout on load.

---

## 10. Things worth knowing before you change something

**Never put `overflow-hidden` on an ancestor of a rail or the switcher.** An
overflow ancestor becomes the sticky containing block, and the pinned frame will
scroll away instead of pinning. Horizontal clipping happens on the frame itself.

**Anchors into a pinned rail do not work.** A card inside a transformed track
cannot be reliably scrolled to. That is why the "Also in the catalogue" pills on
the home page point at `/products#platforms` (the rail) rather than at the
individual product.

**The GSAP `.js-ready` guard.** Anything GSAP fades in starts at `opacity: 0` —
but only once JavaScript has confirmed it is running (`html.js-ready`, set in
`SmoothScrollProvider`). A failed bundle can therefore never leave a blank page.

**Rails re-measure when the fonts land.** The first measurement happens during
commit, which on a cold load can be before the card text has its final metrics.
`ProductScroller` measures again on `document.fonts.ready`.

**The old filterable catalogue grid** (`sections/ProductCatalogue.tsx`) was
removed when the Products page went to rails. If the filter chips are ever
wanted back:

```bash
git show 7be8642:src/components/sections/ProductCatalogue.tsx > src/components/sections/ProductCatalogue.tsx
```

---

## 11. Accessibility & performance

- Every decorative layer is `aria-hidden` and `pointer-events-none`.
- Focus rings are a 2px brand outline with 3px offset, never removed.
- Reduced motion is honoured by every animated component.
- Logo grids carry real `alt` text; the marquee's second copy is `aria-hidden`
  so screen readers do not read twenty logos twice.
- All seven pages are statically prerendered. Shared JS is ~103 kB; the heaviest
  page (home) is ~241 kB first load.

---

## 12. Verified before handover

- `npm run typecheck` — clean
- `npm run lint` — clean (`src/`)
- `npm run build` — all 7 routes prerendered
- Home, Products, About and Careers checked in the browser: no console errors,
  no broken images, no horizontal overflow at 1280px
- The home switcher was stepped through all six products and the index row
  tracks correctly
