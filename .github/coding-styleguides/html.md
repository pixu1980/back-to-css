# HTML Standards & Conventions

This document contains HTML standards, patterns, and practical guidance for the Back to CSS project.

## Core Principles

1. **HTML as State Layer** - Data attributes drive all UI state
2. **Semantic First** - Use appropriate HTML elements
3. **Attribute Contracts** - Document expected attributes and their values
4. **Accessibility Built In** - ARIA where native semantics are insufficient

---

## Data Attributes as State

HTML attributes are the single source of truth. CSS reads them via `attr()`.

### Naming Convention

Use `data-` prefix with kebab case:

```html
<!-- State attributes -->
<div data-era="future" data-speed="88" data-energy="1.21">
  <!-- Content -->
</div>

<!-- Boolean states -->
<button data-active>Active</button>
<string-note open></string-note>
<string-note mute></string-note>
```

### Common Attribute Patterns

| Pattern          | Example                    | Purpose                    |
| ---------------- | -------------------------- | -------------------------- |
| Numeric state    | `data-speed="88"`          | Drives calculations in CSS |
| Token state      | `data-era="past"`          | Switches style branches    |
| Boolean presence | `open`, `mute`, `disabled` | Simple on/off states       |
| Configuration    | `frets="4" strings="6"`    | Component setup            |

---

## Custom Elements

Use custom element names for complex components:

```html
<!-- Custom element with attributes -->
<flux-capacitor data-era="future" data-energy="1.21">
  <div class="case">
    <!-- Internal structure -->
  </div>
</flux-capacitor>

<!-- Nested custom elements -->
<fret-board frets="4" strings="6" chord="E Major">
  <string-note string="6" open></string-note>
  <string-note string="5" fret="2" finger="2"></string-note>
</fret-board>
```

### Naming Rules

- At least one hyphen required: `flux-capacitor`, `string-note`
- Lowercase letters only
- Descriptive and specific to function

---

## Slide Structure

Slides use reveal.js conventions with PostHTML includes:

```html
<!-- Section wrapper for slide group -->
<section>
  <!-- Individual slide -->
  <section data-topic="branching" data-menu-title="if() primer">
    <h4>Native <mark>if()</mark> brings logic to CSS</h4>
    <small balance>Description text here.</small>
  </section>

  <!-- Slide with comparison layout -->
  <section data-topic="branching">
    <comparison>
      <left>
        <article class="code-stack">
          <pre><code class="hljs css">/* Code example */</code></pre>
        </article>
      </left>
      <right>
        <article class="demo-panel flux-panel" id="demo-id" data-speed="60">
          <!-- Demo content -->
        </article>
      </right>
    </comparison>
  </section>
</section>
```

### Slide Attributes

- `data-topic` - Groups related slides for navigation
- `data-menu-title` - Display name in slide menu
- `data-transition` - Slide transition effect

---

## Interactive Controls

### Buttons with Attribute Binding

```html
<div class="control-row">
  <button type="button" data-attr-target="#demo-id" data-attr-name="data-speed" data-attr-value="60" data-attr-style-var="--flux-speed" data-attr-group="speed-buttons" aria-pressed="true">
    60 mph
  </button>
  <button type="button" data-attr-target="#demo-id" data-attr-name="data-speed" data-attr-value="88" data-attr-style-var="--flux-speed" data-attr-group="speed-buttons" aria-pressed="false">
    88 mph
  </button>
</div>
```

### Range Inputs

```html
<div class="control-row">
  <label>
    Energy
    <input type="range" min="0.5" max="1.8" step="0.01" value="1.0" data-attr-slider-target="#demo-id" data-attr-name="data-energy" data-attr-style-var="--flux-energy" />
  </label>
</div>
```

### Live Value Outputs

```html
<output data-live-value-target="#demo-id" data-live-value="data-speed" data-live-format="mph"></output>
```

---

## Demo Panels

Standard structure for interactive demos:

```html
<article class="demo-panel flux-panel" id="demo-unique-id" data-era="future" data-speed="60" data-energy="1.21" style="--flux-speed: 60; --flux-energy: 1.21">
  <header>
    <span>Panel Title</span>
    <output data-live-value-target="#demo-unique-id" data-live-value="data-speed" data-live-format="mph"></output>
  </header>
  <div class="flux-radial" data-label="demo"></div>
  <p class="status">Status description.</p>
</article>
```

### Required Attributes

- `id` - Unique identifier for targeting
- `data-*` - State attributes read by CSS
- `style` - Initial custom property values (for browsers without typed attr support)

---

## Semantic Elements

Use semantic HTML for accessibility and SEO:

```html
<!-- Sections and navigation -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

<!-- Content structure -->
<article>...</article>
<section>...</section>
<aside>...</aside>

<!-- Text semantics -->
<mark>highlighted text</mark>
<small>supporting text</small>
<code>inline code</code>

<!-- Lists -->
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

---

## PostHTML Includes

Use includes for modular slide composition:

```html
<!-- In index.html -->
<section>
  <include src="./slides/topics/attr/index.html"></include>
</section>

<!-- In attr/index.html -->
<section>
  <include src="./slides/topics/attr/_01-what-is-attr.html"></include>
  <include src="./slides/topics/attr/_02-typed-syntax.html"></include>
  <include src="./slides/topics/attr/_98-attr-in-depth.html"></include>
  <include src="./slides/topics/attr/_99-attr-demo-hub.html"></include>
</section>
```

### File Naming

- Partials start with underscore: `_01-what-is-attr.html`
- Number prefix for ordering: `_01-`, `_02-`, etc.
- `_98-` for in depth patterns
- `_99-` for demo hubs
- `index.html` for section containers

---

## Accessibility Markup

### ARIA for Interactive Elements

```html
<!-- Toggle buttons -->
<button aria-pressed="true">Active</button>
<button aria-pressed="false">Inactive</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">Status: Jump ready</div>

<!-- Accessible labels -->
<label for="speed-input">Speed</label>
<input id="speed-input" type="range" />
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

- Use `<button>` for clickable elements
- Use `<a href>` for navigation
- Add `tabindex="0"` only when necessary
- Never use `tabindex > 0`

---

## Language Rules

- English only for all content
- ASCII hyphen minus (`-`) only, no typographic dashes
- Avoid hyphenated compounds: use "scroll driven" not "scroll-driven"
- Use `balance` attribute for balanced text wrapping

```html
<h3 balance>Let's introduce the following <mark>new CSS features</mark>...</h3>
<small balance>Description with balanced line breaks.</small>
```

---

## Validation Checklist

- [ ] All custom elements have hyphens
- [ ] All interactive elements have accessible names
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] All `aria-pressed` buttons are keyboard focusable
- [ ] All data attributes have documented contracts
- [ ] No duplicate IDs on the page
