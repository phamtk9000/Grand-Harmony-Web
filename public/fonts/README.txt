Claire Murphy font
==================
The site references the "Claire Murphy" script face for accent elements
(hero italic line + signatures). It is a licensed/downloadable font that
cannot be bundled automatically.

To activate it, place the font files here as:
  public/fonts/ClaireMurphy.woff2   (preferred)
  public/fonts/ClaireMurphy.ttf     (fallback)

The @font-face rule in src/styles.css already points to these paths.
Until the files are added, the design gracefully falls back to
Playfair Display. Note: script faces often lack Vietnamese diacritics,
which is why it is used only for accents, never for Vietnamese copy.
