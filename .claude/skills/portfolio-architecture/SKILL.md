---
name: portfolio-architecture
description: >
  Immersive artist portfolio architecture and structure for Ana Maidana, a Paraguayan creative producer,
  recording & mixing engineer, sound designer, and guitarist based in Abu Dhabi. Use this skill whenever
  building, structuring, or scaffolding the portfolio website, setting up routing, creating the chapter/
  section-based navigation, defining the component hierarchy, choosing the tech stack, or implementing
  bilingual (EN/ES) routing. Also trigger when the user asks about page structure, layout decisions,
  content organization, navigation patterns, animations, or how to present different project types
  (EP tracks, mixing work, sound design, post-production).
  Trigger on: "portfolio structure", "site architecture", "page layout", "navigation", "routing", "sections",
  "chapters", "project page", "tech stack", "scaffold", "setup project", "Next.js setup", "file structure",
  "i18n", "bilingual", "animations", "GSAP", "Lenis".
---

# Ana Maidana — Immersive Artist Portfolio Architecture

For who this is for, her full body of work, design direction (aesthetic, color palette, typography,
references), content tone, and project goals, see the project's `CLAUDE.md` — it's always loaded and
should be treated as the source of truth for content and design intent. This skill covers the technical
architecture: tech stack, file structure, routing, i18n, animations, and coding conventions.

## Tech Stack

Use this stack unless the user explicitly requests otherwise:

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **Scroll**: Lenis (smooth scroll) synced with GSAP ScrollTrigger
- **Animation**: GSAP (GreenSock) — ScrollTrigger, SplitText, Flip
- **Audio**: Howler.js for playback, Web Audio API for waveform visualizations
- **Images**: next/image with WebP/AVIF, blur placeholders
- **Deployment**: Vercel
- **i18n**: Bilingual from launch — English (default) and Spanish. Use next-intl or Next.js built-in i18n routing with `/en` and `/es` prefixes.

## Project File Structure

```
portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Root layout with Lenis provider, fonts, metadata
│   │   ├── page.tsx                # Home — the main scroll experience
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects archive/grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Individual project detail (chapter view)
│   │   ├── about/
│   │   │   └── page.tsx            # About / artist statement
│   │   └── contact/
│   │       └── page.tsx            # Contact with embedded form
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Minimal fixed nav (appears on scroll)
│   │   ├── Footer.tsx          # Credits, links, copyright
│   │   ├── Cursor.tsx          # Custom cursor component (desktop only)
│   │   ├── SmoothScroll.tsx    # Lenis wrapper provider
│   │   └── LanguageSwitcher.tsx # EN/ES toggle, preserves page + scroll position
│   ├── sections/
│   │   ├── Hero.tsx            # Landing section — name + role
│   │   ├── ArtistStatement.tsx # Scroll-triggered text reveal, typography only
│   │   ├── ProjectShowcase.tsx # Individual project within scroll
│   │   ├── Discography.tsx     # EP / "Entre dos orillas" chapter section
│   │   ├── Services.tsx        # Production, mixing, sound design, composition
│   │   └── About.tsx           # Photo + bio + tools + podcast
│   ├── audio/
│   │   ├── AudioPlayer.tsx     # Inline audio player with waveform
│   │   ├── WaveformVisualizer.tsx  # Canvas-based waveform display
│   │   ├── BeforeAfterToggle.tsx   # Seamless A/B switch at same playback position
│   │   └── AudioContext.tsx    # Global audio state — only one source plays at a time
│   ├── animations/
│   │   ├── TextReveal.tsx      # Scroll-triggered text animations
│   │   ├── ImageParallax.tsx   # Parallax image component
│   │   ├── FadeIn.tsx          # Intersection-based fade
│   │   └── SplitText.tsx       # Character/word split animations
│   └── ui/
│       ├── Badge.tsx           # Category/tag badges (monospace)
│       ├── ProjectCard.tsx     # Card for project grid view
│       └── Marquee.tsx         # Horizontal scrolling text
├── lib/
│   ├── animations.ts           # GSAP animation presets and utilities
│   ├── audioManager.ts         # Audio playback singleton
│   └── projects.ts             # Project data types and fetching
├── data/
│   └── projects.json           # Static project data (from CLAUDE.md body of work)
├── messages/
│   ├── en.json                 # All English UI text + project descriptions
│   └── es.json                 # All Spanish UI text + project descriptions
├── public/
│   ├── audio/
│   ├── images/
│   ├── fonts/
│   └── og/
├── styles/
│   ├── globals.css             # CSS variables (see CLAUDE.md color palette), resets
│   └── animations.css          # Keyframe animations, scroll-linked styles
└── types/
    └── index.ts                # TypeScript interfaces
```

## Content Architecture — Sections & Chapters

The homepage is ONE continuous scroll experience divided into chapters:

1. **HERO** — Full viewport. "ANA MAIDANA" in display type. Subtitle: role description. Archival decorative elements (waveform line, monospace date, cobalt accent dot). No auto-play audio. Language switcher (EN/ES) visible.

2. **ARTIST STATEMENT** — 2-3 sentences, scroll-triggered text reveal. Typography only, no images.

3. **SELECTED WORK** — 4-6 featured projects as immersive showcases. Each shows: project title, category badge (monospace), hero image, inline audio preview with waveform, 2-line description, link to full project page. Spans all categories (post-production, studio, composition).

4. **EP / ENTRE DOS ORILLAS** — Dedicated chapter. Each of the 4 tracks gets its own scroll "moment" with visual treatment. Integrated audio playback. Collaborator credits. Streaming links.

5. **SERVICES** — Clean grid, four categories: Music Production, Recording & Mixing Engineering, Sound Design & Post-Production, Composition.

6. **ABOUT** — Photo + expanded bio. Education, tools, podcast story, studio equipment.

7. **CONTACT / FOOTER** — Email, social links, Google Calendar booking link. Minimal.

### Project Detail Pages (`/[locale]/projects/[slug]`)
- Header: Title, client/director, role(s), year, category badge
- Hero media: Main image or video embed
- Context: 1-2 paragraphs
- Audio: Embedded player. For mixing work, use `BeforeAfterToggle` for before/after comparison
- Process images (optional): Session photos, DAW screenshots
- Credits
- Prev/next project navigation

### Other Pages
- `/[locale]/about` — Full bio, education, equipment, podcast, press
- `/[locale]/contact` — Contact form, social links, booking calendar embed

## Project Data Model

```typescript
interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  categories: ('production' | 'mixing' | 'sound-design' | 'post-production' | 'recording')[];
  description: string;
  heroImage: string;
  audioPreview?: string;
  audioBeforeAfter?: { before: string; after: string };
  audioWaveformData?: number[];
  images: string[];
  credits: { role: string; name: string }[];
  featured: boolean;
  order: number;
}

interface Release {
  slug: string;
  title: string;
  type: 'EP' | 'single' | 'album';
  year: number;
  tracks: {
    title: string;
    duration: string;
    audioPreview?: string;
    featuring?: string;
  }[];
  coverImage: string;
  description: string;
  streamingLinks: { platform: string; url: string }[];
}
```

## Bilingual Architecture (EN/ES)

Use `next-intl` with the App Router, or Next.js native i18n routing.

**URL structure:**
```
/en/                    → English homepage
/es/                    → Spanish homepage
/en/projects/pina       → English project page
/es/projects/pina       → Spanish project page
```

**Language switcher**: In the navigation bar. Preserves current page and scroll position on switch.

**What gets translated**: navigation labels, section titles, service descriptions, CTAs, project descriptions/context, artist statement, bio, contact form, footer.

**What stays the same in both languages**: project titles ("Entre dos orillas", "PINA", "Sari Sari"), track titles ("Movimiento", "Polka Arabia", "Desierto del Sahara"), proper nouns, collaborator/institution names, technical terms (Pro Tools, SSL Console), Guaraní terms ("Nambi Retã").

**SEO**: unique `<title>`/`<meta description>`/OG tags per language, `hreflang` tags EN↔ES, sitemap with both locales, default locale English (`/` redirects to `/en`).

## Navigation Pattern

- Hidden on initial load (hero speaks first)
- Appears as minimal fixed bar after scrolling past hero
- Contains: Name/logo (left), section anchors (center/right), Contact CTA
- Thin scroll progress line at very top of viewport (`--color-cobalt` accent)
- Mobile: hamburger/drawer menu

## Key Interactions & Animations

- **Smooth scroll**: Lenis with lerp 0.08-0.12 for a deliberate, cinematic pace
- **Text reveals**: Line-by-line or word-by-word on scroll (GSAP ScrollTrigger)
- **Image parallax**: Subtle (speed 0.3-0.5) on project hero images
- **Section transitions**: Background shifts between warm register (Paraguayan content) and cool register (Abu Dhabi/professional content) — the scroll itself enacts the "two shores" journey. See CLAUDE.md color palette.
- **Staggered entrances**: Project cards and grid items fade up with stagger
- **Custom cursor**: Circle follower with scale-up on interactive elements (desktop only)
- **Audio waveform**: Pre-computed peaks rendered on canvas, progress visualization on playback
- **Before/after audio toggle**: Seamless switch at same playback position for mixing showcases
- **Page transitions**: Fade + slight Y-offset between routes
- **Reduced motion**: All animations disabled via `prefers-reduced-motion` — content shown immediately

## Coding Guidelines

1. Use TypeScript strictly. Define interfaces for all data models (Project, Release, Track).
2. All audio components must be client components (`'use client'`). Server-render everything else.
3. Only one audio source plays at a time globally (use AudioContext provider).
4. Never autoplay audio. Always require user interaction.
5. Clean up all GSAP ScrollTrigger instances in useEffect return functions.
6. Use `next/image` for all images. Set explicit width/height or use `fill` with sized container.
7. Animate only `transform` and `opacity` (GPU-accelerated properties).
8. Lazy load heavy components (audio player, animations) with `next/dynamic` and `ssr: false`.
9. Mobile: disable pinning, horizontal scroll, and custom cursor. Simplify animations.
10. Accessibility: all buttons need `aria-label`, visible focus indicators, skip-nav link, semantic HTML.
11. SEO: unique title + description per page/locale, OG images, structured data (Person + MusicAlbum schemas), sitemap.
12. Keep total JS bundle under 250KB gzipped. Dynamic import GSAP, Howler, and heavy visualization code.

## File Naming Conventions

```
public/
├── audio/
│   ├── ep/entre-dos-orillas-movimiento-preview.mp3
│   ├── ep/entre-dos-orillas-abu-dhabi-preview.mp3
│   ├── projects/pina-before.mp3
│   ├── projects/pina-after.mp3
│   └── projects/sari-sari-preview.mp3
├── images/
│   ├── projects/pina-hero.jpg
│   ├── projects/sari-sari-hero.jpg
│   ├── ep/entre-dos-orillas-cover.jpg
│   ├── portraits/ana-studio.jpg
│   └── portraits/ana-guitar.jpg
├── fonts/
│   ├── ClashDisplay-Variable.woff2
│   ├── GeneralSans-Variable.woff2
│   └── JetBrainsMono-Variable.woff2
└── og/
    ├── default.jpg          (1200x630)
    └── projects/             (auto-generated per project)
```
