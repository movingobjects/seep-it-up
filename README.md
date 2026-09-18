# Seepover

A flood-fill puzzle. The flood starts in the top-left corner; click any cell to
repaint the flood that color, absorbing every touching cell of the same color.
Fill the whole board in as few moves as you can. Par is an estimate from a
greedy solver.

- **New game** deals a fresh board.
- Click a **swatch** to cycle it through the palette, or **shuffle** for a new
  set of colors. Colors are cosmetic and don't change the board.

## Development

```sh
npm install
npm run dev     # start the dev server
npm run build   # production build to dist/
npm run lint
```

Game settings (board size, number of colors, flood origin) live in
`src/config.js`.
