# Back to CSS - Roadmap

## Overview

- **Duration:** 45-50 minutes (45 slides)
- **Theme:** Back to the Future inspired UI where HTML attributes power CSS logic
- **Core APIs:** typed `attr()`, native `if()`, CSS `@function`
- **Goal:** Prove HTML can remain the single source of truth while CSS delivers branching logic and reusable math utilities

## Current Slide Structure

All slide files follow a numbered convention: `_XX-name.html`. Theory slides use `_01` through `_06`, in depth patterns use `_98`, and demo hubs use `_99`.

```
src/slides/
├── intro/
│   ├── _pixu.html
│   ├── _main-topic.html
│   └── _doodle.html
├── summary/
│   ├── _topics.html
│   └── _dive-in.html
├── outro/
│   ├── _wrap-up.html
│   ├── _thanks.html
│   ├── _links.html
│   └── _taf.html
└── topics/
    ├── attr/
    │   ├── _01-what-is-attr.html
    │   ├── _02-typed-syntax.html
    │   ├── _03-supported-types.html
    │   ├── _04-attr-in-calc.html
    │   ├── _05-html-as-state.html
    │   ├── _06-attr-to-vars.html
    │   ├── _98-attr-in-depth.html
    │   └── _99-attr-demo-hub.html
    ├── if/
    │   ├── _01-what-is-if.html
    │   ├── _02-comparisons.html
    │   ├── _03-if-with-attr.html
    │   ├── _04-nested-if.html
    │   ├── _05-if-vs-classes.html
    │   ├── _06-use-cases.html
    │   ├── _98-if-in-depth.html
    │   └── _99-if-demo-hub.html
    ├── functions/
    │   ├── _01-what-is-function.html
    │   ├── _02-parameters.html
    │   ├── _03-math-functions.html
    │   ├── _04-functions-with-if.html
    │   ├── _05-composing.html
    │   ├── _06-use-cases.html
    │   ├── _98-functions-in-depth.html
    │   └── _99-function-demo-hub.html
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
    │   └── _99-systems-demo-hub.html
    └── case-studies/
        ├── _01-case-flux-capacitor.html
        ├── _02-case-flux-dashboard.html
        ├── _03-case-88mph.html
        ├── _04-case-past-future.html
        ├── _05-case-device-hand-off.html
        ├── _06-case-fretboard.html
        └── _99-case-lessons.html
```

## Section Breakdown

### 1. Intro (Slides 1-3)

| Slide | File                                | Status      | Focus                                 |
| ----- | ----------------------------------- | ----------- | ------------------------------------- |
| 1     | `src/slides/intro/_pixu.html`       | ✅ Complete | Personal story, why HTML equals state |
| 2     | `src/slides/intro/_main-topic.html` | ✅ Complete | High level promise, movie references  |
| 3     | `src/slides/intro/_doodle.html`     | ✅ Complete | Visual hook, shows attribute toggles  |

### 2. Foundations: Typed attr() (Slides 4-10)

| Slide | File                                              | Status      | Focus                                   |
| ----- | ------------------------------------------------- | ----------- | --------------------------------------- |
| 4     | `src/slides/topics/attr/_01-what-is-attr.html`    | ✅ Complete | What is typed attr and why it matters   |
| 5     | `src/slides/topics/attr/_02-typed-syntax.html`    | ✅ Complete | Syntax, units, fallbacks                |
| 6     | `src/slides/topics/attr/_03-supported-types.html` | ✅ Complete | Number, angle, length, token types      |
| 7     | `src/slides/topics/attr/_04-attr-in-calc.html`    | ✅ Complete | Combine attr output with calc           |
| 8     | `src/slides/topics/attr/_05-html-as-state.html`   | ✅ Complete | HTML data props as state bus            |
| 9     | `src/slides/topics/attr/_06-attr-to-vars.html`    | ✅ Complete | Bridge attr values to custom properties |
| 10    | `src/slides/topics/attr/_98-attr-in-depth.html`   | ✅ Complete | Consolidated practical patterns         |
| Hub   | `src/slides/topics/attr/_99-attr-demo-hub.html`   | ✅ Complete | Interactive playground                  |

### 3. Branching with if() (Slides 11-18)

| Slide | File                                          | Status      | Focus                           |
| ----- | --------------------------------------------- | ----------- | ------------------------------- |
| 11    | `src/slides/topics/if/_01-what-is-if.html`    | ✅ Complete | Native if primer, syntax        |
| 12    | `src/slides/topics/if/_02-comparisons.html`   | ✅ Complete | Comparison operators            |
| 13    | `src/slides/topics/if/_03-if-with-attr.html`  | ✅ Complete | Combining if with typed attr    |
| 14    | `src/slides/topics/if/_04-nested-if.html`     | ✅ Complete | Multi condition, nested logic   |
| 15    | `src/slides/topics/if/_05-if-vs-classes.html` | ✅ Complete | Replacing class toggles with if |
| 16    | `src/slides/topics/if/_06-use-cases.html`     | ✅ Complete | Practical use cases             |
| 17    | `src/slides/topics/if/_98-if-in-depth.html`   | ✅ Complete | Consolidated practical patterns |
| Hub   | `src/slides/topics/if/_99-if-demo-hub.html`   | ✅ Complete | Interactive playground          |

### 4. Reusable Logic with @function (Slides 19-26)

| Slide | File                                                      | Status      | Focus                           |
| ----- | --------------------------------------------------------- | ----------- | ------------------------------- |
| 19    | `src/slides/topics/functions/_01-what-is-function.html`   | ✅ Complete | @function basics                |
| 20    | `src/slides/topics/functions/_02-parameters.html`         | ✅ Complete | Parameters and arguments        |
| 21    | `src/slides/topics/functions/_03-math-functions.html`     | ✅ Complete | Math chains inside helpers      |
| 22    | `src/slides/topics/functions/_04-functions-with-if.html`  | ✅ Complete | Mixing with if                  |
| 23    | `src/slides/topics/functions/_05-composing.html`          | ✅ Complete | Composing multiple functions    |
| 24    | `src/slides/topics/functions/_06-use-cases.html`          | ✅ Complete | Practical use cases             |
| 25    | `src/slides/topics/functions/_98-functions-in-depth.html` | ✅ Complete | Consolidated practical patterns |
| Hub   | `src/slides/topics/functions/_99-function-demo-hub.html`  | ✅ Complete | Interactive playground          |

### 5. Attribute Driven UI Systems (Slides 27-36)

| Slide | File                                                      | Status      | Focus                              |
| ----- | --------------------------------------------------------- | ----------- | ---------------------------------- |
| 27    | `src/slides/topics/systems/_01-component-contracts.html`  | ✅ Complete | Document attribute contracts       |
| 28    | `src/slides/topics/systems/_02-theme-engine.html`         | ✅ Complete | Attribute themes                   |
| 29    | `src/slides/topics/systems/_03-multi-element-sync.html`   | ✅ Complete | Parent attributes feeding children |
| 30    | `src/slides/topics/systems/_04-timeline-controls.html`    | ✅ Complete | Zero JS toggles                    |
| 31    | `src/slides/topics/systems/_05-js-sync.html`              | ✅ Complete | Optional JS helpers                |
| 32    | `src/slides/topics/systems/_06-forms-and-attr.html`       | ✅ Complete | Map inputs to attributes           |
| 33    | `src/slides/topics/systems/_07-dashboard-layout.html`     | ✅ Complete | Layout orchestration               |
| 34    | `src/slides/topics/systems/_08-token-pipeline.html`       | ✅ Complete | Design tokens                      |
| 35    | `src/slides/topics/systems/_09-system-accessibility.html` | ✅ Complete | Live regions                       |
| Hub   | `src/slides/topics/systems/_99-systems-demo-hub.html`     | ✅ Complete | Full dashboard                     |

### 6. Temporal Case Studies (Slides 37-42)

| Slide | File                                                           | Status      | Focus                            |
| ----- | -------------------------------------------------------------- | ----------- | -------------------------------- |
| 37    | `src/slides/topics/case-studies/_01-case-flux-capacitor.html`  | ✅ Complete | Flux capacitor component         |
| 38    | `src/slides/topics/case-studies/_02-case-flux-dashboard.html`  | ✅ Complete | Multi widget overview            |
| 39    | `src/slides/topics/case-studies/_03-case-88mph.html`           | ✅ Complete | Speed threshold storytelling     |
| 40    | `src/slides/topics/case-studies/_04-case-past-future.html`     | ✅ Complete | Dual timeline comparison         |
| 41    | `src/slides/topics/case-studies/_05-case-device-hand-off.html` | ✅ Complete | Attribute updates via JS signals |
| 42    | `src/slides/topics/case-studies/_06-case-fretboard.html`       | ✅ Complete | Guitar chord diagrams via attr() |
| Wrap  | `src/slides/topics/case-studies/_99-case-lessons.html`         | ✅ Complete | Lessons learned                  |

### 7. Wrap Up and CTA (Slides 43-46)

| Slide | File                               | Status      | Focus                          |
| ----- | ---------------------------------- | ----------- | ------------------------------ |
| 43    | `src/slides/summary/_topics.html`  | ✅ Complete | Summary of learnings           |
| 44    | `src/slides/summary/_dive-in.html` | ✅ Complete | Checklist and links            |
| 45    | `src/slides/outro/_wrap-up.html`   | ✅ Complete | CTA with pros/cons/conclusions |
| 46    | `src/slides/outro/_thanks.html`    | ✅ Complete | Thanks and QR                  |

## Styling Architecture

### CSS Layers

The project uses `@layer` for cascade control:

- `flux-capacitor` - Flux capacitor component styles
- `btf-inputs` - Input design system (buttons, ranges, selects, etc.)
- `time-circuits` - Time circuits display styles

### Key CSS Patterns

1. **Typed attr()** - Reading attribute values with type safety
2. **CSS Nesting** - Native nesting with `&` for component scoping
3. **:where()/:is()** - Low specificity selectors for flexible overrides
4. **Custom Properties** - Design tokens and component state
5. **@property** - Registered custom properties for animations
6. **Container Queries** - Component scoped responsive design

### JavaScript Architecture

Minimal JS following the attribute first pattern:

- Event delegation for button clicks
- Slider/input syncing to data attributes
- Live output updates via MutationObserver pattern
- No frameworks, vanilla modules only

## Execution Checklist

1. ✅ Build slides per section using numbered file convention
2. ✅ Theory explanation, reference examples, and demos for each topic
3. ✅ Attribute contracts documented in README
4. ✅ Baseline status noted in slides where relevant
5. ✅ Format with `pnpm run format` before committing
6. ✅ Accessible demos: keyboard focusable buttons, aria-pressed states
7. ✅ Close each demo with "The UI jumps at 88 mph"

## Resources

- [Coding Styleguides](./.github/coding-styleguides/) - Project specific CSS, HTML, JS, and a11y conventions
- [MDN attr() typed syntax](https://developer.mozilla.org/docs/Web/CSS/attr)
- [MDN if() CSS function](https://developer.mozilla.org/docs/Web/CSS/if)
- [CSS @function proposal](https://drafts.csswg.org/css-values-5/#funcdef-function)
- [Baseline](https://web.dev/baseline)
