# Back to CSS - Roadmap

## Overview

- **Duration:** 45-50 minutes (45 slides)
- **Theme:** Back to the Future inspired UI where HTML attributes power CSS logic
- **Core APIs:** typed `attr()`, native `if()`, CSS `@function`
- **Goal:** Prove HTML can remain the single source of truth while CSS delivers branching logic and reusable math utilities

## Section Breakdown and Slide Inventory

### 1. Intro (Slides 1-3)

| Slide | File                                | Working title      | Focus                                 |
| ----- | ----------------------------------- | ------------------ | ------------------------------------- |
| 1     | `src/slides/intro/_pixu.html`       | Speaker intro      | Personal story, why HTML equals state |
| 2     | `src/slides/intro/_main-topic.html` | Back to CSS mantra | High level promise, movie references  |
| 3     | `src/slides/intro/_doodle.html`     | Time tunnel teaser | Visual hook, shows attribute toggles  |

**Milestones**

- **Theory:** Define the mantra “HTML is state, CSS is logic,” outline the typed `attr()` pipeline, and set expectations for zero JS toggles.
- **Examples:** Present minimal attribute driven toggle snippet plus the base CSS that reacts via custom properties.
- **Demos:**
  - Demo A: Intro timeline slider flipping `data-era` between 1985 and 2015.
  - Demo B: Flux readout card highlighting attribute sourced speed and energy values.

### 2. Foundations (Slides 4-10)

| Slide | File                                                   | Working title                | Focus                                   |
| ----- | ------------------------------------------------------ | ---------------------------- | --------------------------------------- |
| 4     | `src/slides/topics/foundations/_typed-attr-recap.html` | Typed attr recap             | Syntax, units, fallbacks                |
| 5     | `_attribute-bus.html`                                  | HTML data props as state bus | Naming conventions, validation          |
| 6     | `_attr-to-custom-properties.html`                      | Bridging attr to vars        | Copy attr values into custom properties |
| 7     | `_unit-safe-calculations.html`                         | Unit safe math               | Combine attr output with calc           |
| 8     | `_attr-accessibility.html`                             | Semantics and aria           | Mirror state for assistive tech         |
| 9     | `_attr-debugging.html`                                 | Debug tactics                | DevTools tips, log attributes           |
| 10    | `_foundations-demo-hub.html`                           | Mini lab                     | Summary of foundational patterns        |

**Milestones**

- **Theory:** Document typed `attr()` signatures, explain fallback values, and show how attributes map to CSS custom properties.
- **Examples:** Provide snippet sets for numeric, angle, and token attributes plus `@supports` guards.
- **Demos:**
  - Demo A: Flux capacitor gauge where `data-energy` drives glow and vibration.
  - Demo B: DeLorean dashboard where `data-speed` feeds a speedometer arc through `attr()` and `calc()`.

### 3. Branching with `if()` (Slides 11-18)

| Slide | File                       | Working title              | Focus                                     |
| ----- | -------------------------- | -------------------------- | ----------------------------------------- |
| 11    | `_if-intro.html`           | Native if primer           | Syntax, comparison operators              |
| 12    | `_if-vs-classes.html`      | Replacing class toggles    | Benefits over JS class flips              |
| 13    | `_multi-condition.html`    | Nested logic               | Compose multiple `if()` statements        |
| 14    | `_if-range-checks.html`    | Range checks               | Combine `if()` with `clamp()` and `min()` |
| 15    | `_if-accessibility.html`   | aria-sync logic            | Derive `aria-live` messaging              |
| 16    | `_if-performance.html`     | Performance considerations | When to memoize values                    |
| 17    | `_fallbacks.html`          | Progressive enhancement    | Feature queries and safe defaults         |
| 18    | `_branching-demo-hub.html` | Temporal states demo       | Summary slide                             |

**Milestones**

- **Theory:** Break down the `if()` syntax, truthy comparisons, and how to guard with `@supports` so older browsers see safe styles.
- **Examples:** Compare `if(attr(data-era token) = future, ...)` with equivalent `.future` class styles to highlight code reduction.
- **Demos:**
  - Demo A: Hoverboard picker with `if()` switching neon palettes when `data-era` hits future.
  - Demo B: Reactor safety card that flips layout and warnings when `data-energy` crosses thresholds.

### 4. Reusable Logic with `@function` (Slides 19-26)

| Slide | File                        | Working title          | Focus                             |
| ----- | --------------------------- | ---------------------- | --------------------------------- |
| 19    | `_function-intro.html`      | `@function` basics     | Signature, parameters, return     |
| 20    | `_function-math-chain.html` | Math chains            | Combine attr math inside helpers  |
| 21    | `_function-and-if.html`     | Mixing with `if()`     | Conditional returns               |
| 22    | `_timeline-helpers.html`    | Timeline utilities     | Convert seconds to offsets        |
| 23    | `_glow-function.html`       | Flux glow helper       | Reusable outputs                  |
| 24    | `_function-share.html`      | Sharing between slides | Partial imports                   |
| 25    | `_debugging-functions.html` | Debug strategy         | Use custom properties for tracing |
| 26    | `_function-demo-hub.html`   | Function playground    | Show interactive knobs            |

**Milestones**

- **Theory:** Describe the current CSSWG proposal status, syntax for defining functions, and best practices for naming and return units.
- **Examples:** Publish two helper samples (`flux-glow()`, `timeline-offset()`) that show parameter validation and `if()` branching inside the function body.
- **Demos:**
  - Demo A: Attribute driven light trail where `@function` computes blur radii per timeline step.
  - Demo B: Mission clock that converts `data-departure` minutes into dash offsets through a reusable function.

### 5. Attribute Driven UI Systems (Slides 27-36)

| Slide | File                         | Working title               | Focus                               |
| ----- | ---------------------------- | --------------------------- | ----------------------------------- |
| 27    | `_component-contracts.html`  | Component prop schema       | Document attribute contracts        |
| 28    | `_theme-engine.html`         | Attribute themes            | Light vs dark vs neon               |
| 29    | `_multi-element-sync.html`   | Propagation                 | Parent attributes feeding children  |
| 30    | `_timeline-controls.html`    | Zero JS toggles             | Buttons flipping `data-era`         |
| 31    | `_js-sync.html`              | Optional JS helpers         | When to use script for syncing      |
| 32    | `_forms-and-attr.html`       | Form integration            | Map inputs to attributes            |
| 33    | `_dashboard-layout.html`     | Layout orchestration        | Grid and attr interplay             |
| 34    | `_token-pipeline.html`       | Design tokens               | Bridge attr to design system values |
| 35    | `_system-accessibility.html` | Accessibility and narration | Live regions                        |
| 36    | `_systems-demo-hub.html`     | System level showcase       | Full dashboard                      |

**Milestones**

- **Theory:** Define attribute schemas, discuss validation, and explain how cascading attributes feed nested components through custom properties.
- **Examples:** Provide markup templates for cards, gauges, and buttons where each attribute is annotated with acceptable ranges.
- **Demos:**
  - Demo A: Control deck with three widgets sharing the same `data-era`, `data-speed`, and `data-energy` attributes.
  - Demo B: Attribute driven theme switcher where toggling `data-mode` recolors the entire layout via cascade layers.

### 6. Temporal Case Studies (Slides 37-41)

| Slide | File                               | Working title        | Focus                            |
| ----- | ---------------------------------- | -------------------- | -------------------------------- |
| 37    | `_case-study-flux-dashboard.html`  | Flux dashboard       | Multi widget overview            |
| 38    | `_case-study-88mph.html`           | 88 mph trigger       | Speed threshold storytelling     |
| 39    | `_case-study-past-future.html`     | Past vs future skins | Dual timeline comparison         |
| 40    | `_case-study-device-hand-off.html` | Device sync          | Attribute updates via JS signals |
| 41    | `_case-study-lessons.html`         | Lessons learned      | Takeaways from case studies      |

**Milestones**

- **Theory:** Explain how the three APIs combine at scale, including layering logic, timeline narration, and accessibility notes.
- **Examples:** Provide annotated screenshots or code blocks for each case study, showing which attributes feed which CSS outputs.
- **Demos:**
  - Demo A: Interactive timeline stage that animates between past and future scenes solely through attribute tweaks.
  - Demo B: Safety override scenario where `data-energy` spikes above safe levels and triggers automatic mode shifts.

### 7. Wrap Up and CTA (Slides 42-45)

| Slide | File                               | Working title   | Focus                                    |
| ----- | ---------------------------------- | --------------- | ---------------------------------------- |
| 42    | `src/slides/summary/_topics.html`  | Recap           | Summary of learnings                     |
| 43    | `src/slides/summary/_dive-in.html` | Technical recap | Checklist and links                      |
| 44    | `src/slides/outro/_wrap-up.html`   | CTA             | Invite to build attribute driven systems |
| 45    | `src/slides/outro/_thanks.html`    | Thanks and QR   | Resources, contact                       |

**Milestones**

- **Theory:** Reiterate the benefits of using HTML as state and CSS as logic, plus Baseline readiness for each API.
- **Examples:** Link to code sandboxes and highlight the minimal JS helpers used.
- **Demos:**
  - Demo A: Final deck wide attribute flip that changes the entire scene in one click.
  - Demo B: QR code triggered attribute preset that sets the experience to either past or future mode during the Q&A.

## Execution Checklist

1. Build slides per section using the listed files; keep each slide focused on a single concept.
2. For every topic, deliver the milestones in order: theory explanation, reference examples, and at least two demos.
3. Ensure attribute contracts are documented in both slide notes and `README.md`.
4. Record Baseline status and feature flags in presenter notes for transparency.
5. Run `pnpm run format:prettier` and `pnpm run format:biome` after editing HTML, CSS, or JS files.
6. Keep demos accessible: buttons must be keyboard focusable, state changes announced when relevant.
7. Close each live demo reminding the audience “The UI jumps at 88 mph.”
