# Copilot Instructions - Back to CSS

## Project Context

Back to CSS is a reveal.js-based talk that explores how HTML attributes can act as the state layer while CSS delivers the logic. The presentation focuses on three modern CSS building blocks working together:

- Typed `attr()` to read unit-safe values from markup
- Native `if()` expressions for branching styles with no JavaScript
- Reusable `@function` definitions to encapsulate logic

All demos must feel like scenes from _Back to the Future_: neon palette, timeline metaphors, and references to flux capacitors, 88 mph jumps, and temporal shifts between "past" and "future" UI states.

## Talk Objectives

1. Prove that HTML attributes can drive entire interfaces.
2. Showcase how CSS typed attributes, `if()`, and `@function` compose a logic layer.
3. Deliver mostly zero-JS interaction; JS is allowed only to set or sync attributes.
4. Highlight practical component patterns (toggles, timelines, gauges, dashboards) themed around time travel.
5. Inspire teams to architect attribute-driven systems today.

## Narrative & Section Flow (45-50 min / ~45 slides)

1. **Intro (Slides 1-3)**
   - Speaker intro, Back to the Future hook, explain "HTML = state, CSS = logic" mantra.
2. **Foundations (Slides 4-10)**
   - Typed `attr()` recap, attribute typing syntax, HTML data props as state bus.
3. **Branching in CSS (Slides 11-18)**
   - Native `if()` demos, fallbacks, comparison with `:has()` or classes.
4. **Reusable Logic (Slides 19-26)**
   - `@function` authoring, chaining math + if(), timeline utilities.
5. **Attribute-Driven UI Systems (Slides 27-36)**
   - Component props, theming, multi-element coordination, zero-JS toggles, JS-enhanced attribute syncing.
6. **Temporal Case Studies (Slides 37-41)**
   - Past vs future modes, flux dashboards, "88 mph" trigger scenes.
7. **Wrap-up & CTA (Slides 42-45)**
   - Recap, resources, Q&A, invite to push CSS logic.

Every technical slide must include:

- A short explanation tying the API to the story.
- A code sample showing HTML attributes feeding CSS logic.
- A live demo flipping states by editing attributes only.

## Visual & Thematic Direction

- Palette: neon orange (#ff9500), teal (#00f5ff), deep space gray. Use gradients, scanlines, CRT glow sparingly.
- Typography: use provided `@pixu-talks/fonts`. Headings may mimic "Back to the Future" vibe but keep accessibility.
- Iconography: lightning bolts, timelines, speedometers, flux capacitor silhouettes.
- Callouts reference "past" vs "future" states, e.g., `data-era="1985"` vs `data-era="2015"`.

## Technical Standards

### HTML / Structure

- Slides live under `src/slides/` and follow PostHTML include patterns.
- Use semantic markup; prefer `<section>` wrappers with descriptive headings.
- Provide `aria-live`, `role`, and alt text for any dynamic widgets.
- HTML attributes should be the single source of truth (e.g., `data-speed="88mph"`, `data-energy="1.21GW"`).

### CSS

- Demonstrate typed `attr()` syntax: `attr(data-speed number, 0) * 1deg`.
- Encapsulate logic inside `@function` definitions placed in dedicated CSS partials if needed.
- Use `if()` for branching (`if(attr(data-era token) = past, ...)`). Always include fallbacks for browsers lacking support.
- Favor custom properties for sharing attribute-derived values across components.
- For Back to the Future callbacks, include timeline-themed animations (light trails, glitches) handled with CSS only.
- Organize new feature-specific styles inside `src/styles/` subfiles and import them from `index.css`.

### JavaScript

- Place scripts in `src/scripts/`. Keep JS minimal: only hydrate attributes, sync UI state, or respond to user input by setting `data-*` props.
- No virtual DOM or frameworks. Vanilla modules only, documented with concise comments.
- If JS mutates attributes, mirror the attribute schema in README so future contributors know the contract.

### Language & Formatting

- English only, ASCII punctuation (use standard hyphen-minus).
- Avoid hyphenated compound adjectives; prefer spaced phrases ("time travel ready").
- Format HTML/CSS/MD/JSON/YAML with Prettier, JS/TS with Biome.
- After editing files run:
  - `pnpm run format:prettier`
  - `pnpm run format:biome`

## Slide Requirements

- One core concept per slide.
- Always pair explanation + code + demo.
- Demo interactions should be attribute-first. Example:

```html
<section data-era="2015" data-speed="88">
  <h2>Typed attr() as Flux Readout</h2>
  <div class="flux-panel" data-energy="1.21">
    <button data-mode="past">1985</button>
    <button data-mode="future">2015</button>
  </div>
</section>
```

```css
@property --era-hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 30;
}

@function flux-glow($energy) {
  @return clamp(0px, $energy * 8px, 32px);
}

.slide[data-era='2015'] {
  --era-hue: if(attr(data-speed number, 0) >= 88, 200, 30);
  box-shadow: 0 0 flux-glow(attr(data-energy number, 1)) hsl(var(--era-hue) 90% 60%);
}
```

- Attribute flipping should instantly change visuals with no JS besides optional helpers to toggle attributes on click.
- Provide Baseline notes per feature (typed `attr()` + `if()` currently experimental). Mention polyfills or `@supports` guards.

## Assets & Performance

- Store themed images/icons under `src/assets/`. Optimize via `svgo` or `sharp` before committing.
- Respect reduced motion preferences. Offer `prefers-reduced-motion` fallbacks that disable aggressive effects.
- Keep bundle lean: lazy-load heavy demos or guard them behind progressive enhancement checks.

## Tooling & Workflow

- Dev server: `pnpm start`
- Production build: `pnpm build` (warn that it amends the last commit and force-pushes)
- Cleaning cache/dist: `pnpm run clear`
- Releases: `pnpm run rel:<major|minor|patch>` (triggers build + tag push)

When adding slides:

1. Create the slide partial under `src/slides/<section>/` with `_XX-name.html` naming.
2. Include it in `src/slides/topics/topics.html` (or relevant section file).
3. Add any CSS/JS assets, import them from `src/styles/index.css` or `src/scripts/index.js`.
4. Add demos/media to `src/assets/` and reference relatively.
5. Update README with new sections or instructions if necessary.
6. Run format commands before committing.

### File Numbering Convention

- `_01` to `_06`: Theory slides (one concept per slide)
- `_07` to `_97`: Additional topic slides
- `_98`: In depth patterns (consolidated practical demos)
- `_99`: Demo hub (interactive playground)

### Current Slide Structure

```
src/slides/topics/
├── attr/           # Typed attr() foundations
├── if/             # Native if() branching
├── functions/      # Reusable @function logic
├── systems/        # Attribute driven UI systems
└── case-studies/   # Temporal themed demos
```

## Accessibility & QA Checklist

- Provide keyboard access for attribute toggles (use `<button>` and `aria-pressed`).
- Ensure contrast ratios meet WCAG AA even with neon palette.
- Announce state changes (e.g., visually hidden text describing current era).
- Test on latest Chrome, Firefox, Safari; document gaps for experimental CSS.
- For features behind flags, wrap styles in `@supports` and explain fallbacks in slide notes.

## Coding Styleguides

Detailed coding standards and patterns are documented in `.github/coding-styleguides/`:

- **[css.md](./coding-styleguides/css.md)** - CSS patterns: @layer, nesting, :where/:is, typed attr(), if(), @function, container queries
- **[html.md](./coding-styleguides/html.md)** - HTML standards: data attributes as state, custom elements, slide structure
- **[javascript.md](./coding-styleguides/javascript.md)** - JS patterns: event delegation, attribute syncing, minimal JS philosophy
- **[a11y.md](./coding-styleguides/a11y.md)** - Accessibility: keyboard navigation, ARIA, reduced motion, contrast

Always consult these styleguides when adding or modifying code.

## Reference Sources

- [MDN attr() typed syntax](https://developer.mozilla.org/docs/Web/CSS/attr)
- [MDN if() CSS function](https://developer.mozilla.org/docs/Web/CSS/if)
- [CSS @function proposal](https://drafts.csswg.org/css-values-5/#funcdef-function)
- [Baseline](https://web.dev/baseline)
- [Can I Use](https://caniuse.com)

Keep the excitement high: "The UI jumps at 88 mph" is the closing reminder for every live demo.
