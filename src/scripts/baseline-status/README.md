# Baseline Status component assets

This folder contains the `baseline-status` custom element and its assets split by type.

- `baseline-status.js`: component logic and rendering
- `baseline-status.css`: component CSS injected at runtime
- `icons/`: SVG assets imported as raw strings
- `templates/`: HTML templates with `{{placeholders}}` interpolated in `baseline-status.js`

Build notes:

- Parcel inline string imports are enabled by `@parcel/transformer-inline-string` dev dependency. Use `import x from 'bundle-text:./file.ext'` to load as text.
- No Shadow DOM or `<template>` is used by design. The component renders plain HTML and injects a singleton `<style>`.

Usage in slides:

```html
<baseline-status feature-id="anchor-positioning"></baseline-status>
```

Provider options:

- By default the component fetches data from https://api.webstatus.dev.
- You can set `provider="mdn"` to use MDN Browser Compat Data (via CDN).
- Keep `provider="auto"` (default) to try webstatus first and fall back to MDN when webstatus has no data.

Examples:

```html
<!-- Force MDN and point to a BCD path (dot notation) -->
<baseline-status provider="mdn" mdn-path="javascript.classes.static_initialization_blocks"></baseline-status>

<!-- Auto provider tries webstatus then MDN; mdn-path can be provided as a hint -->
<baseline-status provider="auto" feature-id=":has()" mdn-path="css.selectors.has"></baseline-status>
```
