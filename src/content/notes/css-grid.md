---
title: "CSS Grid Layout"
tags: ["css", "layout", "frontend"]
date: "2024-01-14"
---

# CSS Grid Layout

## Grid Container Properties

- `display: grid` - Creates a grid container
- `grid-template-columns: repeat(3, 1fr)` - Defines column sizes
- `grid-template-rows: auto` - Defines row sizes
- `gap: 16px` - Sets gap between grid items

## Grid Item Properties

- `grid-column: span 2` - Item spans 2 columns
- `grid-row: 1 / 3` - Item spans from row 1 to 3
- `justify-self: center` - Horizontal alignment within cell
- `align-self: end` - Vertical alignment within cell

## Example

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-item {
  grid-column: span 2;
  justify-self: center;
}
```

## Common Patterns

### Auto-fit columns
```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

### Named grid lines
```css
grid-template-columns: [start] 1fr [middle] 1fr [end];
```
