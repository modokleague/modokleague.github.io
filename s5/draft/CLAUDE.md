# MODOK League Draft Bot — Claude Code Memory

## This Is the Only Active Edit Location

```
C:\Users\jives\Documents\modokleague.github.io\s5\draft\
```

Edit here → test by opening `index.html` in browser → commit and push to deploy to GitHub Pages.

The Dropbox `draft-bot\` directory is **archive only**. Its `js-defunct\`, `css-defunct\`, and `deploy-V5.0.0-alpha.10-defunct\` folders are superseded by this directory.

---

## Project Structure

```
js\
  ├── config.js      # Version, pairing mode constants, aspect colors
  ├── globals.js     # Runtime state variables (draft simulator state)
  ├── data.js        # SINGLE SOURCE OF TRUTH for hero/aspect static data
  ├── utils.js       # Utility functions (seeded random, etc.)
  ├── helpers.js     # Helper functions
  ├── tiers.js       # Hero tier definitions for pairing logic
  ├── pairing.js     # Hero and aspect pairing logic
  ├── pool.js        # Pool generation logic
  └── legacy.js      # Main application logic (UI, draft simulator, bot AI)
index.html           # Main app
validator.html       # Developer tool: statistical validation of draft pool generation
```

---

## Data Architecture Rule

`data.js` is the **only** file that defines:
- `draftOrder` — hero tier list (65 heroes as of alpha.10)
- `REQUIRED_HEROES` — heroes forced into pool when feature enabled
- `teamNamePools` — team name pools by letter group

`legacy.js` must **not** re-declare these variables. It reads them as globals set by `data.js` (which loads first per `index.html` script order).

**To add a new hero:** edit `data.js` only — add to `draftOrder` and `REQUIRED_HEROES` if applicable.

---

## Current Hero List State (alpha.11)

- 65 heroes in `draftOrder`
- `REQUIRED_HEROES`: `['Wonder Man', 'Hercules', 'Tigra', 'Hulkling', 'Falcon', 'Winter Soldier']`
- Banned heroes (in `legacy.js`): `[]` (none)

---

## Script Load Order (index.html)

Scripts load in this order — later scripts use globals set by earlier ones:
1. `config.js`
2. `globals.js`
3. `data.js` ← sets `draftOrder`, `REQUIRED_HEROES`, `teamNamePools`
4. `utils.js`
5. `helpers.js`
6. `tiers.js`
7. `pairing.js`
8. `pool.js`
9. `legacy.js` ← reads data.js globals; must NOT re-declare them

---

## validator.html — Design Notes

Standalone developer tool. Loads `config.js → globals.js → data.js → utils.js → tiers.js → pairing.js`. Does **not** load `legacy.js`, `pool.js`, or `helpers.js` (DOM dependencies not needed).

**DOM bridge:** `pairing.js` reads `document.getElementById('adjacentProbability')` and `document.getElementById('doubleAspectWeight')` to get settings. `validator.html` declares these as `<input type="hidden">` elements and sets their values before each run. No changes to `pairing.js` were needed.

**Hero selection:** Implemented inline as `selectHeroes(n, rng, requireHeroesEnabled)` using `shuffleArray` from `utils.js` (already loaded). Does not depend on `legacy.js`.

**Correct aspect pair probability formula (derived, not from plan spec):**
- `P(double) = w/16`
- `P(mixed unordered pair) = (4−w)/24`
- where `w` = doubleWeight (0–1). Verified: 4×(w/16) + 6×((4−w)/24) = 1 ✓
- The re-roll logic also preserves marginal uniformity: each aspect appears in exactly 25% of all slots regardless of `w`.

**Sortable tables:** All four result tables (`hero-table`, `tier-table`, `aspect-pair-table`, `aspect-bal-table`) are sortable. Architecture:
- `sortState` object keyed by table ID stores `{ col, dir }` — persists across re-renders
- `COLS` object defines columns per table (key, label, num, default sort dir)
- `tableHead(tableId)` builds `<thead>` with sort-indicator classes
- All sort clicks call `renderResults(lastRunData)` which rebuilds everything from stored run data
- Aspect pair subtotal rows (All Doubles / All Mixed) are appended after sorted body rows so they always stay at the bottom
- Aspect balance table has 3 sortable columns + 1 non-sortable "Expected %" column (thead built manually)

---

## Recent Session Work (commit 501c005)

- Created `validator.html` — statistical draft pool validator
- 1000-iteration batch runner with configurable settings (teams, mode, adjacent prob, double weight, require heroes)
- Five result sections: Run Summary, Hero Appearance Frequency, Tier Pairing Distribution, Aspect Pair Distribution, Aspect Balance
- All tables sortable by any column header (click to sort, click again to reverse)
