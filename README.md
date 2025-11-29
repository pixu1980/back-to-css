# Back to CSS

Back to CSS is a reveal.js presentation that proves HTML attributes can be the entire state layer while CSS provides the logic. The talk celebrates typed `attr()`, native `if()`, and the experimental `@function` rule to build reactive interfaces that feel ripped from Back to the Future.

## Abstract

A time bending tour of tomorrow's CSS where HTML is the state and CSS is the logic. Wiring typed `attr()` to read real, unit safe values straight from HTML attributes, branch styles with native `if()`, and compose reusable logic with `@function`. Expect mostly zero JS UI toggles, attribute driven themes, and component props that cascade through styles like data.

Showing temporal UIs and flipping between past and future states by changing only attributes, proving how far you can push interaction and architecture with CSS alone. (features: typed `attr()`, `if()`, and the at rule `@function`)

The UI jumps at 88 mph.

## Talk Objectives

1. Show that HTML attributes can drive complex UI states without extra scripting.
2. Demonstrate how typed `attr()`, `if()`, and `@function` combine into a CSS logic layer.
3. Deliver mostly zero JS interactions, using JavaScript only to sync attributes when needed.
4. Present time travel themed components (flux gauges, timeline toggles, dashboard panels) that rely on attribute data.
5. Provide practical recipes so teams can architect attribute driven systems today.

## Narrative Flow

- **Intro (Slides 1-3):** Speaker hook, HTML equals state mantra, Back to the Future references.
- **Foundations (Slides 4-10):** Typed `attr()` syntax, attribute typing, data driven layout tokens.
- **Branching in CSS (Slides 11-18):** Native `if()` usage, fallbacks, comparison with selector tricks.
- **Reusable Logic (Slides 19-26):** Crafting `@function`, chaining math and conditionals, timeline helpers.
- **Attribute Driven Systems (Slides 27-36):** Component props, theming, zero JS toggles, JS attribute syncing strategies.
- **Temporal Case Studies (Slides 37-41):** Flux dashboards, past and future skins, the 88 mph trigger moment.
- **Wrap Up (Slides 42-45):** Recap, resources, Q&A, call to action.

## Visual Direction

- Neon orange (#ff9500), teal (#00f5ff), and deep space gray as the base palette.
- Retro gradients, CRT glow, and timeline metaphors to echo the movie aesthetic.
- Icons and motifs: lightning bolts, flux capacitors, speedometers, time rails.
- Prefer attribute toggles such as `data-era="1985"` and `data-era="2015"` for past versus future states.

## Tech Stack

- **Presentation:** reveal.js powered deck assembled with PostHTML includes.
- **Styling:** CSS custom properties, typed `attr()`, `if()`, `@function`, and timeline animations.
- **Tooling:** Parcel dev server and build pipeline, pnpm workspace, Prettier and Biome for formatting.
- **Assets:** Neon themed artwork inside `src/assets/` plus brand references in `src/brand/`.

## Scripts

```bash
pnpm start           # Parcel dev server on port 6001
pnpm build           # Production build (amends previous commit and force pushes)
pnpm run clear       # Remove dist and cache folders
pnpm run format      # Run Prettier then Biome
pnpm run lint        # Biome lint rules
pnpm run rel:major   # Build, bump version, push tag
pnpm run rel:minor
pnpm run rel:patch
```

## Development Workflow

1. Create or edit slide partials under `src/slides/` using `_name.html` files grouped by section.
2. Wire new slides inside `src/slides/topics/topics.html` or the relevant section container.
3. Add slide specific CSS to `src/styles/` (imported from `index.css`) and minimal JS helpers under `src/scripts/`.
4. Keep demos attribute first; JavaScript may only set or sync `data-*` props.
5. Document new attribute contracts inside this README if they affect other contributors.
6. Run `pnpm run format:prettier` and `pnpm run format:biome` before committing.

## Slide Structure

All slide files follow a numbered convention: `_XX-name.html`. Theory slides use `_01` through `_06`, in depth patterns use `_98`, and demo hubs use `_99`.

```
src/slides/topics/
├── attr/
│   ├── _01-what-is-attr.html
│   ├── _02-typed-syntax.html
│   ├── _03-supported-types.html
│   ├── _04-attr-in-calc.html
│   ├── _05-html-as-state.html
│   ├── _06-attr-to-vars.html
│   ├── _98-attr-in-depth.html
│   ├── _99-attr-demo-hub.html
│   └── index.html
├── if/
│   ├── _01-what-is-if.html
│   ├── _02-comparisons.html
│   ├── _03-if-with-attr.html
│   ├── _04-nested-if.html
│   ├── _05-if-vs-classes.html
│   ├── _06-use-cases.html
│   ├── _98-if-in-depth.html
│   ├── _99-if-demo-hub.html
│   └── index.html
├── functions/
│   ├── _01-what-is-function.html
│   ├── _02-parameters.html
│   ├── _03-math-functions.html
│   ├── _04-functions-with-if.html
│   ├── _05-composing.html
│   ├── _06-use-cases.html
│   ├── _98-functions-in-depth.html
│   ├── _99-function-demo-hub.html
│   └── index.html
├── systems/
│   ├── _01-component-contracts.html
│   ├── _02-theme-engine.html
│   ├── _03-multi-element-sync.html
│   ├── _04-timeline-controls.html
│   ├── _05-js-sync.html
│   ├── _06-forms-and-attr.html
│   ├── _07-dashboard-layout.html
│   ├── _08-token-pipeline.html
│   ├── _09-system-accessibility.html
│   ├── _99-systems-demo-hub.html
│   └── index.html
└── case-studies/
    ├── _01-case-flux-capacitor.html
    ├── _02-case-flux-dashboard.html
    ├── _03-case-88mph.html
    ├── _04-case-past-future.html
    ├── _05-case-device-hand-off.html
    ├── _99-case-lessons.html
    └── index.html
```

## Resources

- [MDN: attr() typed syntax](https://developer.mozilla.org/docs/Web/CSS/attr)
- [MDN: if() CSS function](https://developer.mozilla.org/docs/Web/CSS/if)
- [CSS Values and Units Level 5 (`@function` proposal)](https://drafts.csswg.org/css-values-5/#funcdef-function)
- [Baseline](https://web.dev/baseline)

Keep the excitement high: every live demo ends with “The UI jumps at 88 mph.”
