# VOSC Activity-1 – Neon Tic-Tac-Toe Arena

> A visually polished, two-player Tic-Tac-Toe game with a neon arena aesthetic.
> Built with pure HTML, CSS, and JavaScript — no libraries, no frameworks, no external dependencies.

---

## Project Overview

**Neon Tic-Tac-Toe Arena** is a local two-player web game created as part of VOSC Activity-1.
Two players share the same device and take turns clicking cells on a glowing 3×3 board.
The game features a futuristic dark neon design, animated background particles, win/draw detection,
a live scoreboard, and smooth CSS animations — all without any external tools or libraries.

---

## Features

| Feature | Details |
|---------|---------|
| Two-player gameplay | Player X vs Player O on the same device |
| X always goes first | Each new round starts with Player X |
| Clickable 3×3 board | Glowing neon board with hover effects |
| Occupied-cell protection | Cannot overwrite a placed symbol |
| Win detection | All 8 combinations — 3 rows, 3 columns, 2 diagonals |
| Winning cell highlight | Animated neon pulse on the winning three cells |
| Draw detection | Detected when all 9 cells are filled with no winner |
| Result banner | Clear message — "Player X Wins!" / "Player O Wins!" / "It's a Draw!" |
| Scoreboard | Tracks X Wins, Draws, O Wins — persists across rounds |
| NEW ROUND button | Clears the board, keeps scores |
| RESET SCORE button | Zeroes all scores and starts fresh |
| CSS-only particles | Animated background particles — no JavaScript or images |
| Turn indicator | Colour-coded dot + text showing whose turn it is |
| Active player highlight | Current player's score card glows during their turn |
| Neon flicker animation | Winner banner subtly flickers after a win |
| Draw shake animation | Banner shakes on a draw result |
| Keyboard accessible | Tab to focus cells, Enter/Space to place symbol |
| Responsive design | Works on desktop, tablet, and mobile screens |

---

## Technologies Used

| Technology | Role |
|------------|------|
| **HTML5** | Page structure, semantic elements, ARIA labels |
| **CSS3** | Neon styling, animations, keyframes, responsive layout |
| **JavaScript (ES6+)** | Game logic, DOM manipulation, event handling |

No frameworks, no libraries, no external fonts, no external images, no APIs.

---

## Project Structure

```
VOSC Activity-1/
├── index.html    ← Game structure and layout
├── style.css     ← Neon styles, animations, responsive rules
├── script.js     ← Full game logic (modular, commented)
└── README.md     ← This file
```

---

## How to Run

1. **Download or clone** the project folder.
2. Open the folder in **File Explorer**.
3. **Double-click `index.html`** to open it in your web browser.
4. The game loads instantly — no installation, no internet required.

> **Tip:** Works in any modern browser — Chrome, Firefox, Edge, Safari.

---

## How to Play

1. The game opens with **Player X's turn**.
2. Click any empty cell to place your symbol.
3. Players alternate turns — X then O, O then X.
4. The first player to align **3 in a row** (horizontally, vertically, or diagonally) **wins**.
5. If all 9 cells are filled and no one has 3 in a row, the game ends in a **Draw**.
6. The scoreboard updates automatically after each game.

---

## Controls

| Action | How |
|--------|-----|
| Place symbol | Click an empty cell |
| Place via keyboard | Tab to focus a cell → press **Enter** or **Space** |
| Start a new round | Click **⟳ NEW ROUND** |
| Reset all scores | Click **✕ RESET SCORE** |

---

## Unique Design Features

- **Dark neon arena theme** — deep dark background with cyan (X) and pink (O) neon accents.
- **CSS-only animated particles** — 12 floating dots rise in the background using pure `@keyframes`.
- **Glowing game board** — the entire 3×3 grid has a soft neon outer glow.
- **Per-player colour identity** — X is cyan `#00e5ff`, O is pink `#ff3c78` throughout the UI.
- **Pop-in symbol animation** — each placed symbol bounces in with a spring effect.
- **Winning cell pulse** — the three winning cells pulse with a neon glow loop.
- **Neon flicker banner** — the winner message subtly flickers like a real neon sign.
- **Board dim on game over** — non-winning cells fade out to focus attention on the result.
- **Active score card glow** — the current player's score card glows during their turn.

---

*VOSC Activity-1 Submission — Built with HTML • CSS • JavaScript*
