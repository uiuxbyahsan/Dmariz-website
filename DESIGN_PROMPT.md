# DžaMaris Restaurant Website — UI Build Prompt

Build a single-page restaurant website for **DžaMaris (Caffe & Restaurant, Aria Mall, Sarajevo)** using **Next.js 14 (App Router, JavaScript) + Tailwind CSS + Framer Motion**. The aesthetic is warm, editorial, and elegant — a maroon/gold/cream palette with serif headlines, tilted photo cards, hand-drawn gold decorations, and flat sharp-cornered buttons. Below is the complete design system and section-by-section spec.

## Tech & Project Structure
- Next.js 14 App Router, plain JavaScript (.js / .jsx), no TypeScript.
- Tailwind CSS + Framer Motion. Custom lightbox (no carousel/gallery libraries).
- `app/layout.js` (fonts + metadata), `app/page.js` (section assembly), `app/globals.css`.
- All sections as components in `/components`; reusable SVGs in `/components/decorations`.
- Images via `next/image`, lazy-loaded below the fold, descriptive alt text.
- Fonts via `next/font/google`: **Playfair Display** (serif headings, includes italic) as `--font-playfair`; **Inter** (sans body) as `--font-inter`.

## Design System

### Colors (Tailwind theme.extend.colors)
- cream: DEFAULT `#FAF6F0`, deep `#F3EADD`
- maroon: DEFAULT `#5C1A22`, dark `#3D1117`, light `#7A2731`
- gold: DEFAULT `#C9A769`, light `#E8C896`, dark `#B08E4F`
- Mirror these as CSS vars in `:root`: `--gold`, `--gold-light`, `--maroon`, `--maroon-dark`, `--cream`.
- Body: cream background, maroon-dark text, antialiased. `html { scroll-behavior: smooth }`. `::selection` = gold bg / maroon-dark text.

### Typography
- Headings: Playfair Display serif. Pattern: **one key word italicized in maroon/gold per heading** (e.g., "Our *menu*", "A taste of *DžaMaris*", "Visit us *today*").
- Body: Inter, color maroon-dark at ~70% opacity, relaxed leading.
- Avoid em-dashes in body copy — use commas.

### Texture
- `.dot-texture` utility: subtle gold dot-grid `radial-gradient(circle, rgba(201,167,105,0.16) 1px, transparent 1px)`, `background-size: 22px 22px`. Applied to cream sections.

### Buttons (`.btn` — flat, sharp corners, single solid layer, NO border-radius, NO offset/shadow)
- `.btn`: inline-flex, gap .5rem, padding .85rem 1.9rem, font-weight 600, letter-spacing .02em, transition background-color/color 0.3s.
- `.btn-primary`: maroon bg, cream text; hover → maroon-dark.
- `.btn-gold`: gold bg, maroon-dark text; hover → gold-light.
- Hover = background color transition only (no scale, no shadow).

### Pill badge (`.pill`)
- inline-block, padding .4rem 1.1rem, border-radius full, font-size .72rem, font-weight 600, letter-spacing .18em, uppercase. Used as `bg-gold/25 text-maroon`.

### Decorative SVG components (`/components/decorations`)
- `Squiggle` — hand-drawn wavy gold line (corner accents). Colorable via prop.
- `DotCluster` — scattered dot cluster, gold.
- `ArrowRight` — thin line arrow (currentColor) for "go to" links; nudges right on hover.
- `DrawnSquiggle` — single flowing corner line.
- Feature line-icons (`FeatureIcons.jsx`): `RecipeIcon`, `LoungeIcon`, `HeartIcon` (1.6 stroke, currentColor).

### Logo
- Gold "DžaMaris" wordmark, transparent-background PNG at `/public/images/logo.png`. Use as-is via next/image (h-12, w-auto, object-contain) in navbar and footer. Never recreate/redraw it.

## Image Assets (`/public/images/gallery/`)
`aria-mall-exterior.jpg` (storefront, blue sky), `interior-lounge-1.jpg`, `interior-lounge-2.jpg`, `wok-chicken-plate-1.jpg`, `curry-chicken-plate.jpg`, `matcha-cocktail.jpg`, `curry-piletina-branded.jpg`, `wok-branded.jpg`, `chicken-stirfry-rice.jpg`, `chicken-mushroom-sauce.jpg`.

## SEO (metadata in layout.js)
- Title: "DžaMaris Restoran | Sarajevo"
- Description mentioning Aria Mall, Sarajevo, Bosnian comfort food, curry piletina, wok, café. lang="bs".

## Page Order (app/page.js)
Navbar → Hero → Menu → Features → ComfortFood → Gallery → ComeSayHello → Footer.

## Sections

### 1. Navbar
- Fixed top, transparent initially; on scroll > 24px → cream/85 backdrop-blur + subtle bottom shadow (state via scroll listener).
- Left: logo (h-12). Center links: Menu | Gallery | About | Location | Contact (anchor links). Right: "Reserve" `.btn-primary`.
- Mobile: hamburger toggling a cream dropdown; animated bar icon. Navbar slides/fades in on mount.

### 2. Hero (`#top`, dot-texture)
- Two columns, max-w-7xl.
- Left: gold pill "RESTORAN & CAFFE" → serif headline **"Real flavors served with *pride.*"** (text-5xl→7xl, "pride" italic maroon) → body paragraph about the family-run Aria Mall café and grilled/curry/wok specialties → "Find Us" `.btn-primary`. Left items stagger fade-up (container/fadeUp variants).
- Right: tilted photo card of `aria-mall-exterior.jpg` — inner white card `p-3` rotated to -3°, with a second white backing card (`absolute inset-0`, rotate 6°) behind it. Image box ~432×552 desktop / 320×412 mobile. Image fades in rotating from 0°→-3°, scale .94→1. Gold `Squiggle` top-left and `DotCluster` bottom-right, positioned slightly outside the card, delayed fade-in. Section `overflow-hidden`.

### 3. Menu (`#menu`, dot-texture)
- Serif heading "Our *menu*" + category nav row (text-lg/xl, maroon-dark/70, slash-separated): **Doručak / Glavna Jela / Salate / Sendviči / Pića / Kafa / Dezerti** — first item active (gold underline).
- Two columns:
  - Left: tilted photo card of `curry-piletina-branded.jpg` (white card p-3 tilted ~3°, white backing rotated -4° behind; aspect-[4/5]). Fades in settling 6°→3°. No dark frame.
  - Right: vertical price list of 9 items, each row = name (left) + price "X.00 KM" (right) with a thin `border-b border-maroon-dark/15` divider; rows stagger fade-up. Items: Curry Piletina 12.00, Wok Piletina 11.00, Sitni Ćevap 10.00, **Hadžijski Ćevap 13.00 (highlighted gold)**, Toscana Piletina 12.00, Bavarski Doručak 9.00, Mix Doručak 11.00, Crispy Chicken Salad 8.00, Fokača Sandwich 6.00.
  - Below list: gold "• SEE ALL MENU" link (small dot bullet + uppercase label + `ArrowRight` icon that nudges right on hover); hover gold→maroon color.

### 4. Features — "You'll Love Us" strip
- Full-width maroon-dark section. Centered serif heading "You'll *love* us" (love = gold italic).
- 3 columns, each: gold line-icon + serif title + cream/65 text. Items: **Authentic Recipes** (traditional Bosnian dishes made fresh daily), **Cozy Café Lounge** (warm seating in Aria Mall), **Made with Love** (family-run hospitality). Icons + text stagger fade-up.

### 5. ComfortFood (`#about`, dot-texture)
- Two columns.
- Left: tilted photo card of `wok-chicken-plate-1.jpg` (white card tilted ~3°, white backing rotated -5°), slides/rotates in from left; gold DotCluster accent.
- Right: serif heading "The best *comfort food* in Sarajevo" + paragraph naming signature dishes (Curry Piletina, Wok specials, Chicken in Mushroom Sauce, Ramstek, freshly grilled Ćevapi, each with rice, fries, salad) + "About Us" `.btn-primary`. Text fades up.

### 6. Gallery (`#gallery`, dot-texture) — custom animated carousel
- Header row: gold pill "GALLERY" + serif heading "A taste of *DžaMaris*"; right side two flat maroon arrow buttons (h-12 w-12, cream chevrons, hover maroon-dark).
- Slider of 9 images, each slide = square image (rounded-sm, white bg, shadow) + caption below (serif title + gold-dark subtitle). Captions e.g. "Café Lounge / Aria Mall", "Matcha & Berries / Signature Drink", "DžaMaris / Aria Mall, Sarajevo", plus dish slides ("Wok Specials", "Curry Piletina", "Mushroom Sauce", "Come Together", "Stir-Fry & Rice", "Curry Plate" with subtitles like "Signature Dish" / "Glavna Jela").
- Responsive slides-per-view: 1 (mobile), 2 (≥640px), 3 (≥1024px) via resize listener.
- **3-up center emphasis**: center slide width 46%, side slides 38% each, with symmetric edge overhang (`EDGE = (2*38 + 46 - 100)/2 = 11`) so the center stays exactly centered. Track translateX = `-(active*38 + EDGE)%`; on 2-up/1-up use equal widths `-(active*(100/spv))%`. Flex track uses `items-center` so side slides are vertically centered with the center slide. Slide width animates 0.45s easeInOut.
- Center/active slide: scale 1, opacity 1. Side slides: scale 0.88, image opacity 0.65, caption opacity 0.6 — all animate 0.45s easeInOut. Image hover zoom (scale-110) + maroon overlay.
- Controls: prev/next arrows, drag/swipe via pointer events (>40px threshold), autoplay every 5s pausing on hover/touch, dot pagination below (active dot = wide maroon pill, others small maroon/30).
- Clicking any slide opens the **custom Lightbox**.

### 7. Lightbox (`/components/Lightbox.jsx`)
- Fade-in fullscreen modal, maroon-dark/92 backdrop-blur. Close (×) top-right, prev/next chevrons, caption under image. Keyboard support (Esc / ← / →), body-scroll lock, click-backdrop-to-close, image fades/scales in per change. Loops around.

### 8. ComeSayHello (`#location`, dot-texture)
- Large rounded-[2rem] maroon-dark card, `interior-lounge-1.jpg` as dimmed background (opacity ~25% + maroon overlay). Centered: serif "Come say *hello*" (hello = gold italic), "Aria Mall · Sarajevo", address "Caffe & Restaurant DžaMaris, Trebević, Miljevići bb", and a gold pill "07:00 – 22:00 (Mon–Sat)". Gold Squiggles in opposite corners. Card scales/fades in on scroll; squiggles draw in.

### 9. Footer (`#contact`, maroon-dark, cream text)
- CTA strip (top, border-b cream/10): serif "Visit us *today*" (today = gold italic) + "View Location & Hours" `.btn-gold` linking to `#location`.
- 4-column row: logo + tagline; **Location** (Aria Mall, Sarajevo / Trebević, Miljevići bb); **Hours** (Mon–Sat 07:00–22:00, Sun closed); **Contact** (phone, email) + Instagram (@dzammaris) and Facebook icon links (hover gold).
- Bottom bar (border-t cream/10): centered "© {year} DžaMaris Caffe & Restaurant. All rights reserved."

## Animation Summary
Navbar blur/opacity on scroll • Hero & section text staggered fade-up • Tilted photo cards rotate+scale settle in • Squiggles/dots delayed fade-in • Menu price rows stagger • Feature icons/text stagger • Gallery slides translateX + width/scale/opacity center-emphasis, autoplay, drag • Lightbox fade modal with keyboard nav • Buttons hover background-color only.

## Responsive
Mobile-first. Two-column sections stack vertically; tilted cards keep modest rotation; gallery shows one slide; images never overflow horizontally (sections use overflow-hidden where cards bleed).
