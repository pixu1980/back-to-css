# CSS Standards & Conventions

This document collects CSS standards, patterns, and practical guidance for the Back to CSS project.

## Core Principles

1. **CSS as Logic Layer** - CSS handles reactivity via typed `attr()`, `if()`, and `@function`
2. **HTML as State** - Data attributes are the single source of truth
3. **Minimal Specificity** - Use `@layer`, `:where()`, and element selectors
4. **Zero Classes** - Prefer element and attribute selectors over class names

---

## CSS Layers (@layer)

All stylesheets must use `@layer` for cascade control. This prevents specificity wars and makes overrides predictable.

```css
@layer flux-capacitor {
  /* Component styles */
}

@layer btf-inputs {
  /* Input design system */
}

@layer time-circuits {
  /* Time circuits display */
}
```

### Layer Import Order

When importing multiple layers, declare order first:

```css
@layer reset, base, components, utilities;

@import url('./_reset.css') layer(reset);
@import url('./_base.css') layer(base);
@import url('./_flux-capacitor.css') layer(components);
```

---

## CSS Nesting

Use native CSS nesting with `&` for component scoping. This improves readability and keeps related styles together.

```css
flux-capacitor {
  --flux-color: #00f5ff;
  display: grid;

  .case {
    background: var(--flux-color);

    &:hover {
      box-shadow: 0 0 20px var(--flux-color);
    }
  }

  &[data-era='past'] {
    --flux-color: #ff9500;
  }

  &::before {
    content: '';
    /* pseudo element styles */
  }
}
```

### Nesting Depth

Keep nesting to a maximum of 3 levels. Beyond that, consider breaking into separate selectors or components.

---

## Low Specificity Selectors

### :where() for Zero Specificity

Use `:where()` when you want styles that can be easily overridden:

```css
/* Zero specificity wrapper */
:where(.demo-panel, .control-row) {
  :where(input, select, button) {
    font-family: inherit;
    color: var(--btf-input-text);
  }
}
```

### :is() for Grouped Selectors

Use `:is()` when you need the specificity but want cleaner code:

```css
:is(h1, h2, h3, h4) {
  font-family: 'Back to the Future', sans-serif;
}

button:is(:hover, :focus) {
  box-shadow: 0 0 15px var(--glow-color);
}
```

---

## Typed attr() Function

Read attribute values directly in CSS with type safety:

```css
/* Basic syntax */
.element {
  --speed: attr(data-speed type(<number>), 0);
  --energy: attr(data-energy type(<number>), 0.5);
  --era: attr(data-era type(<string>), 'present');
}

/* Use in calculations */
.speedometer {
  rotate: calc(attr(data-speed type(<number>), 0) * 1deg);
}

/* With clamp for bounds */
.gauge {
  --clamped: clamp(0, attr(data-value type(<number>), 0), 100);
  width: calc(var(--clamped) * 1%);
}
```

### Supported Types

- `type(<number>)` - Numeric values
- `type(<integer>)` - Integer values
- `type(<length>)` - Length values (px, rem, em)
- `type(<angle>)` - Angle values (deg, rad, turn)
- `type(<string>)` - String/token values

---

## Custom Properties (@property)

Register custom properties for animation and type safety:

```css
@property --flux-deg {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}

@property --flux-ratio {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

@property --flux-color {
  syntax: '<color>';
  inherits: true;
  initial-value: #00f5ff;
}
```

### Naming Convention

Use component prefix with double dash separator:

- `--flux-capacitor--deg`
- `--btf-input-border`
- `--time-circuits--display-color`

---

## CSS if() Function

Branch styles based on conditions:

```css
.flux-panel {
  /* Simple comparison */
  --status-color: if(attr(data-speed type(<number>), 0) >= 88, #00ff00, #ff0000);

  /* Nested conditions */
  --phase: if(attr(data-speed type(<number>), 0) >= 88, 2, if(attr(data-speed type(<number>), 0) >= 60, 1, 0));

  /* Token comparison */
  opacity: if(attr(data-era type(<string>)) = 'past', 0.85, 1);
}
```

### Always Include Fallbacks

Wrap experimental features with `@supports`:

```css
@supports (opacity: if(1 > 0, 1, 0)) {
  .flux-panel {
    opacity: if(attr(data-era type(<string>)) = 'past', 0.85, 1);
  }
}

@supports not (opacity: if(1 > 0, 1, 0)) {
  .flux-panel[data-era='past'] {
    opacity: 0.85;
  }
}
```

---

## CSS @function

Define reusable calculation logic:

```css
@function flux-glow($energy) {
  @return clamp(4px, $energy * 12px, 40px);
}

@function phase-color($speed) {
  @return if($speed >= 88, #ff0099, if($speed >= 60, #f5a623, #00f5ff));
}

/* Usage */
.flux-panel {
  box-shadow: 0 0 flux-glow(attr(data-energy type(<number>), 0.5)) currentcolor;
  border-color: phase-color(attr(data-speed type(<number>), 0));
}
```

---

## Container Queries

Use container queries for component scoped responsive design:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}

/* Using container query units */
.flux-gauge {
  font-size: clamp(0.75rem, 5cqi, 1.5rem);
}
```

---

## Design Tokens

Define tokens at `:root` within a layer:

```css
@layer btf-inputs {
  :root {
    /* Color Tokens */
    --btf-input-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    --btf-input-border: #00f5ff;
    --btf-input-border-glow: rgba(0, 245, 255, 0.4);
    --btf-input-text: #e0e6ed;
    --btf-input-accent: #ff9500;

    /* Sizing Tokens */
    --btf-input-radius: 0.4rem;
    --btf-input-padding-x: 0.75rem;
    --btf-input-padding-y: 0.5rem;
    --btf-input-font-size: 0.9rem;

    /* Motion Tokens */
    --btf-input-transition: all 0.2s ease;
  }
}
```

---

## Units

| Use Case           | Unit               | Example             |
| ------------------ | ------------------ | ------------------- |
| Layout dimensions  | rem                | `width: 15rem`      |
| Typography         | em, rem            | `font-size: 1.5em`  |
| Container relative | cqi, cqw           | `font-size: 7.5cqi` |
| Viewport relative  | vh, vw, vmin, vmax | `height: 100vh`     |
| Borders            | px                 | `border: 1px solid` |
| Rotations          | deg, turn          | `rotate: 45deg`     |
| Animations         | ms, s              | `transition: 200ms` |

---

## File Organization

Keep CSS files between 50-100 lines. Split larger files into partials:

```
src/styles/
├── index.css              # Main entry, imports all partials
├── _flux-capacitor.css    # Flux capacitor component
├── _btf-inputs.css        # Input design system
├── _time-circuits.css     # Time circuits display
└── fonts/                 # Font definitions
```

### Naming Convention

- Partials start with underscore: `_component.css`
- Use kebab case: `_flux-capacitor.css`
- Group by component or feature

---

## Accessibility in CSS

### Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

Provide visible focus indicators:

```css
button:focus-visible {
  outline: 2px solid var(--btf-input-focus);
  outline-offset: 2px;
}
```

### Color Contrast

Use `light-dark()` for theme aware colors:

```css
.element {
  background: light-dark(#eee, #333);
  color: light-dark(#222, #fff);
}
```

---

## Formatting

Run formatters before committing:

```bash
pnpm run format:prettier   # HTML, CSS, MD, JSON, YAML
pnpm run format:biome      # JS, TS
pnpm run format            # Both
```
