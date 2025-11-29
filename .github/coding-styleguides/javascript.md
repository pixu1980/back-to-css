# JavaScript Standards & Conventions

This document contains JavaScript standards and patterns for the Back to CSS project.

## Core Principles

1. **Minimal JavaScript** - JS only sets or syncs attributes, CSS handles the rest
2. **Attribute First** - All state lives in HTML data attributes
3. **Event Delegation** - Use document level handlers instead of per element
4. **No Frameworks** - Vanilla ES modules only

---

## Role of JavaScript

JavaScript in this project serves a specific, limited purpose:

| Allowed                                | Not Allowed                  |
| -------------------------------------- | ---------------------------- |
| Setting data attributes                | Direct style manipulation    |
| Syncing input values to attributes     | DOM class toggling for state |
| Event delegation for user interactions | Virtual DOM or frameworks    |
| Reading attribute values               | Complex UI logic in JS       |

```javascript
// ✅ Good: Set attribute, let CSS react
target.setAttribute('data-speed', 88);

// ❌ Bad: Direct style manipulation
target.style.backgroundColor = '#00f5ff';

// ❌ Bad: Class toggling for state
target.classList.add('is-active');
```

---

## Module Structure

Use ES modules with clear imports:

```javascript
// Entry point: src/scripts/index.js
import '@pixu-talks/core';

import './_css-attr-fallback.js';
import './baseline-status/baseline-status.js';
import './_time-circuits.js';

// Initialize controls
initAttributeControls();
```

### File Naming

- Partials start with underscore: `_time-circuits.js`
- Use kebab case: `baseline-status.js`
- One concern per file

---

## Event Delegation

Use document level event listeners instead of per element bindings:

```javascript
const BUTTON_SELECTOR = '[data-attr-target]';

const handleButtonPress = (event) => {
  const button = event.target.closest(BUTTON_SELECTOR);
  if (!button) {
    return;
  }

  event.preventDefault();

  const { attrTarget, attrName, attrValue, attrStyleVar, attrGroup } = button.dataset;

  setAttributeValue(attrTarget, attrName, attrValue, attrStyleVar);

  // Update aria-pressed for button groups
  if (attrGroup) {
    document.querySelectorAll(`${BUTTON_SELECTOR}[data-attr-group='${attrGroup}']`).forEach((peer) => {
      peer.setAttribute('aria-pressed', String(peer === button));
    });
  }
};

// Single listener for all buttons
document.addEventListener('click', handleButtonPress);
```

---

## Attribute Syncing

### Setting Attributes

```javascript
const setAttributeValue = (targetSelector, attrName, value, styleVar) => {
  const target = document.querySelector(targetSelector);
  if (!target) {
    return;
  }

  // Set the data attribute
  target.setAttribute(attrName, value);

  // Also set style var for fallback support
  if (styleVar) {
    target.style.setProperty(styleVar, value);
  }

  // Update any live outputs
  updateLiveOutput(targetSelector, attrName);
};
```

### Slider/Input Binding

```javascript
const initSliders = () => {
  document.querySelectorAll(SLIDER_SELECTOR).forEach((slider) => {
    slider.addEventListener('input', () => {
      const { attrSliderTarget: targetSelector, attrName, attrStyleVar } = slider.dataset;

      setAttributeValue(targetSelector, attrName, slider.value, attrStyleVar);
    });
  });
};
```

### Live Value Updates

```javascript
const formatValue = (value, format) => {
  if (!format) {
    return value;
  }

  switch (format) {
    case 'mph':
      return `${value} mph`;
    case 'gw':
      return `${value} GW`;
    case 'percent':
      return `${value}%`;
    default:
      return value;
  }
};

const updateLiveOutput = (targetSelector, attrName) => {
  const target = document.querySelector(targetSelector);
  if (!target) {
    return;
  }

  liveOutputs
    .filter((output) => output.dataset.liveValueTarget === targetSelector && output.dataset.liveValue === attrName)
    .forEach((output) => {
      const format = output.dataset.liveFormat;
      const value = target.getAttribute(attrName) ?? '';
      output.textContent = formatValue(value, format);
    });
};
```

---

## Initialization Pattern

Wait for DOM ready before initializing:

```javascript
const initAttributeControls = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initButtons();
      initSliders();
      initFields();
      initLiveOutputs();
    });
    return;
  }

  initButtons();
  initSliders();
  initFields();
  initLiveOutputs();
};

initAttributeControls();
```

---

## Data Attribute Contracts

Document the expected attributes in your components:

```javascript
/**
 * Button attribute contract:
 * - data-attr-target: CSS selector for target element
 * - data-attr-name: Attribute name to set (e.g., "data-speed")
 * - data-attr-value: Value to set
 * - data-attr-style-var: Optional CSS custom property to sync
 * - data-attr-group: Optional group name for mutual exclusion
 */

/**
 * Slider attribute contract:
 * - data-attr-slider-target: CSS selector for target element
 * - data-attr-name: Attribute name to set
 * - data-attr-style-var: Optional CSS custom property to sync
 */

/**
 * Live output contract:
 * - data-live-value-target: CSS selector for source element
 * - data-live-value: Attribute name to read
 * - data-live-format: Optional format (mph, gw, percent, year)
 */
```

---

## Naming Conventions

### Variables and Functions

Use camelCase for all identifiers:

```javascript
const targetSelector = "#demo-id";
const attrName = "data-speed";

const handleButtonPress = (event) => { ... };
const setAttributeValue = (...) => { ... };
const initSliders = () => { ... };
```

### Constants

Use UPPER_SNAKE_CASE for true constants:

```javascript
const BUTTON_SELECTOR = '[data-attr-target]';
const SLIDER_SELECTOR = '[data-attr-slider-target]';
const LIVE_VALUE_SELECTOR = '[data-live-value-target]';
```

---

## Modern JavaScript Features

### Use const by Default

```javascript
// ✅ Prefer const
const target = document.querySelector(selector);
const { attrName, attrValue } = button.dataset;

// Use let only when reassignment is needed
let liveOutputs = [];
```

### Arrow Functions

```javascript
// ✅ Arrow functions for callbacks
document.querySelectorAll(selector).forEach((el) => {
  el.addEventListener("input", () => {
    // handler
  });
});

// Named function expressions for event handlers
const handleButtonPress = (event) => { ... };
```

### Destructuring

```javascript
// ✅ Destructure dataset
const { attrTarget, attrName, attrValue, attrStyleVar, attrGroup } = button.dataset;

// ✅ Destructure with rename
const { attrSliderTarget: targetSelector } = slider.dataset;
```

### Optional Chaining and Nullish Coalescing

```javascript
const value = target.getAttribute(attrName) ?? '';
const format = output.dataset?.liveFormat;
```

---

## Error Handling

Fail silently for missing elements:

```javascript
const target = document.querySelector(targetSelector);
if (!target) {
  return; // Silent return, don't throw
}
```

---

## Formatting

Run Biome before committing:

```bash
pnpm run format:biome    # Format JS/TS
pnpm run lint            # Lint check
```

Biome configuration is in `biome.json` at project root.
