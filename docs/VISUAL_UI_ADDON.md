# VISUAL_UI_ADDON — Visual-First Requirements

## Purpose
GrammarPals must feel like a visual-first, puppy-led game. UI should lean on art and sticker assets, with minimal text.

## Requirements
- **Puppy coach bar is always visible** on gameplay screens.
- **Large sticker tiles** for answers (Duolingo-like energy).
- **Scene card** uses background + animals as primary clue (visual-first).
- **Soft motion** only: small bounces, gentle sparkles, short transitions.

## Accessibility
- High contrast between stickers and backgrounds.
- Tap targets large enough for small hands.
- Text is short and optional; audio is primary.

## Asset Pipeline
All visual components must resolve image sources through `content/assets.manifest.json`.
